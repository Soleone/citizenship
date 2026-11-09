/**
 * Copy the spoken clips to the sync Worker's R2 bucket, so the phones can play them.
 *
 *   pnpm audio:upload          Phonon Miles
 *   pnpm audio:upload breeze   Breeze radio-man
 *
 * Only clips of the current curriculum that the bucket doesn't have yet are sent,
 * so run it again whenever the generator has made more. Clips of edited lines stay
 * behind on disk and are never uploaded.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { curriculumLines } from "../src/audio.ts";
import { SYNC_URL } from "../src/sync.ts";
const PARALLEL = 8;

const data = process.env.DATA;
if (!data)
  throw new Error("Set DATA to the data folder (clips are in $DATA/apps/citizenship/audio).");

const folders = { phonon: "phonon-miles", breeze: "breeze-radio-man" };
const name = process.argv[2] ?? "phonon";
if (!(name in folders))
  throw new Error(`Unknown voice "${name}". Use one of: ${Object.keys(folders).join(", ")}.`);
const folder = folders[name as keyof typeof folders];

const local = join(data, "apps/citizenship/audio", folder);
const key = readFileSync(join(data, "secrets/citizenship/household-key"), "utf8").trim();

const made = (await curriculumLines()).filter(({ id }) => existsSync(join(local, `${id}.mp3`)));
let sent = 0;

async function upload(id: string) {
  const url = `${SYNC_URL}/audio/${folder}/${id}.mp3`;
  if ((await fetch(url, { method: "HEAD" })).ok) return;
  const response = await fetch(url, {
    method: "PUT",
    headers: { authorization: `Bearer ${key}`, "content-type": "audio/mpeg" },
    body: readFileSync(join(local, `${id}.mp3`)),
  });
  if (!response.ok) throw new Error(`Upload of ${id} failed: ${response.status}`);
  sent++;
}

const queue = made.map((line) => line.id);
await Promise.all(
  Array.from({ length: PARALLEL }, async () => {
    for (let id = queue.shift(); id; id = queue.shift()) await upload(id);
  }),
);
console.log(`${sent} clips uploaded, ${made.length - sent} were already there.`);
