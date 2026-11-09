/**
 * Household sync: the one saved study state for A and B, behind one secret key.
 * Also serves the spoken clips from R2 (see `clip`).
 *
 * A Durable Object holds it because it answers every request in order, so the
 * revision check below cannot race the way an eventually consistent store would.
 * Each write keeps the record it replaced, so a bad sync can be rolled back by hand.
 */

type Storage = {
  get<T>(key: string): Promise<T | undefined>;
  put(key: string, value: unknown): Promise<void>;
  delete(key: string): Promise<boolean>;
};
type ObjectState = { storage: Storage };
type Namespace = {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(request: Request): Promise<Response> };
};
type Bucket = {
  get(key: string): Promise<{ body: ReadableStream } | null>;
  head(key: string): Promise<{ size: number } | null>;
  put(key: string, body: ReadableStream | null): Promise<unknown>;
};
export type Env = { HOUSEHOLD: Namespace; HOUSEHOLD_KEY: string; AUDIO: Bucket };

type SyncRecord = { rev: number; savedAt: number; state: unknown };
type SyncPush = { baseRev: number; savedAt: number; state: unknown };

const MAX_BYTES = 1_000_000;
const KEPT_VERSIONS = 30;

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, HEAD, PUT, OPTIONS",
  "access-control-allow-headers": "authorization, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });
}

const CLIP_PATH = /^\/audio\/[a-z-]+\/[0-9a-f]{16}\.mp3$/;

/**
 * Clips are public to read, so an <audio> tag can play them, and only the household
 * key can upload. A clip is named by the hash of its text, so it never changes.
 */
async function clip(request: Request, env: Env, path: string, authorized: boolean) {
  const name = path.slice(1);
  if (request.method === "PUT") {
    if (!authorized) return json({ error: "wrong key" }, 403);
    await env.AUDIO.put(name, request.body);
    return json({ saved: name });
  }
  const found = request.method === "HEAD" ? await env.AUDIO.head(name) : await env.AUDIO.get(name);
  if (!found) return json({ error: "no clip" }, 404);
  return new Response("body" in found ? found.body : null, {
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "public, max-age=31536000, immutable",
      ...cors,
    },
  });
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const path = new URL(request.url).pathname;
    const key = request.headers.get("authorization")?.replace(/^Bearer /, "");
    const authorized = Boolean(env.HOUSEHOLD_KEY) && key === env.HOUSEHOLD_KEY;
    if (CLIP_PATH.test(path)) return clip(request, env, path, authorized);
    if (path !== "/state") return json({ error: "not found" }, 404);
    if (!authorized) return json({ error: "wrong key" }, 403);
    return env.HOUSEHOLD.get(env.HOUSEHOLD.idFromName("household")).fetch(request);
  },
};

export class Household {
  private readonly state: ObjectState;

  constructor(state: ObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    const storage = this.state.storage;
    const current = (await storage.get<SyncRecord>("current")) ?? null;
    if (request.method === "GET") return current ? json(current) : json({ error: "empty" }, 404);
    if (request.method !== "PUT") return json({ error: "method" }, 405);

    const body = await request.text();
    if (body.length > MAX_BYTES) return json({ error: "too large" }, 413);
    const push = JSON.parse(body) as SyncPush;
    if ((current?.rev ?? 0) !== push.baseRev) return json(current, 409);

    const next: SyncRecord = { rev: push.baseRev + 1, savedAt: push.savedAt, state: push.state };
    if (current) {
      await storage.put(`history:${current.rev}`, current);
      await storage.delete(`history:${current.rev - KEPT_VERSIONS}`);
    }
    await storage.put("current", next);
    return json({ rev: next.rev, savedAt: next.savedAt });
  }
}
