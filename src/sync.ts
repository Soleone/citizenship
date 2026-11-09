/**
 * Household sync: every device that opened the household link shares one study
 * state, so A and B see the same progress on any phone or laptop.
 *
 * The server holds one record with a revision number. A device pulls when it
 * opens or comes back into view, pushes a moment after a change, and when both
 * sides changed since they last agreed, the newer save wins whole. Application
 * dates and the sound switch stay on the device and never leave it.
 */

import { useEffect, useRef, useState } from "react";
import { normalizeRelayState, SYNC_STORAGE_KEY, type RelayState } from "./state.ts";

/** The household sync Worker. A public address, not a credential: the key lives only on joined devices. */
export const SYNC_URL = "https://civic-relay-sync.login-ccf.workers.dev";
const KEY_STORAGE_KEY = "civic-relay-household";
const JOIN_HASH = "#join=";
const PUSH_DELAY_MS = 1500;
const PULL_EVERY_MS = 60_000;

type Shared = Omit<RelayState, "applications" | "sound">;
type Remote = { rev: number; savedAt: number; state: unknown };
/** The last state this device and the server agreed on, and when this device last changed it. */
type Position = { rev: number; synced: string; changedAt: number };

export type SyncStatus =
  | { kind: "local" }
  | { kind: "syncing" }
  | { kind: "synced"; at: number }
  | { kind: "offline" }
  | { kind: "wrong-key" };

function shared({ applications: _applications, sound: _sound, ...rest }: RelayState): Shared {
  return rest;
}

function readPosition(store: Storage): Position {
  const stored = store.getItem(SYNC_STORAGE_KEY);
  return stored ? (JSON.parse(stored) as Position) : { rev: 0, synced: "", changedAt: 0 };
}

function writePosition(store: Storage, position: Position) {
  store.setItem(SYNC_STORAGE_KEY, JSON.stringify(position));
}

/** A household link puts its key on this device once and leaves the address bar clean. */
function householdKey(): string | null {
  if (window.location.hash.startsWith(JOIN_HASH)) {
    const key = window.location.hash.slice(JOIN_HASH.length);
    window.localStorage.setItem(KEY_STORAGE_KEY, key);
    // A new key is a new household: start from its copy, not from this device's old position.
    window.localStorage.removeItem(SYNC_STORAGE_KEY);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  return window.localStorage.getItem(KEY_STORAGE_KEY);
}

/** Joins with a pasted household link, through the same reload opening it would do; false when it isn't one. */
export function joinHousehold(link: string): boolean {
  const at = link.indexOf(JOIN_HASH);
  const hash = link.slice(at).trim();
  if (at < 0 || hash === JOIN_HASH) return false;
  window.location.hash = hash;
  window.location.reload();
  return true;
}

/** The link that adds another phone or laptop to this household. */
export function householdLink(): string | null {
  const key = window.localStorage.getItem(KEY_STORAGE_KEY);
  return key ? `${window.location.origin}/${JOIN_HASH}${key}` : null;
}

class WrongKey extends Error {}

type Connection = { pull: () => Promise<void>; changed: () => void; stop: () => void };

/** One device's link to the household. Plain code: React only hands it the state and shows its status. */
export function connect(
  url: string,
  key: string,
  store: Storage,
  getState: () => RelayState,
  setState: (state: RelayState) => void,
  setStatus: (status: SyncStatus) => void,
): Connection {
  const headers = { authorization: `Bearer ${key}`, "content-type": "application/json" };
  let busy = false;
  let pushTimer = 0;

  function adopt(remote: Remote) {
    const local = getState();
    const next = {
      ...normalizeRelayState(remote.state),
      applications: local.applications,
      sound: local.sound,
    };
    writePosition(store, { rev: remote.rev, synced: JSON.stringify(shared(next)), changedAt: 0 });
    setState(next);
  }

  /** Push from `position`; when the server moved on in the meantime, reconcile with its copy. */
  async function push(position: Position): Promise<void> {
    const body = shared(getState());
    const response = await fetch(`${url}/state`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ baseRev: position.rev, savedAt: position.changedAt, state: body }),
    });
    if (response.status === 409) return reconcile((await response.json()) as Remote | null);
    if (!response.ok) throw new Error(`Sync push answered ${response.status}`);
    const saved = (await response.json()) as { rev: number };
    // An edit made while the request was out keeps its time, so it still counts as newer.
    writePosition(store, {
      rev: saved.rev,
      synced: JSON.stringify(body),
      changedAt: readPosition(store).changedAt,
    });
  }

  /** Bring this device and the server to the same state, whichever side moved. */
  async function reconcile(remote: Remote | null): Promise<void> {
    const position = readPosition(store);
    const dirty = JSON.stringify(shared(getState())) !== position.synced;
    // An empty household takes this device's progress as its first copy.
    if (!remote) return push({ ...position, rev: 0, changedAt: position.changedAt || Date.now() });
    if (remote.rev === position.rev) return dirty ? push(position) : undefined;
    // Joining, or the other side saved last: the newer save wins whole.
    if (!dirty || position.rev === 0 || remote.savedAt >= position.changedAt) return adopt(remote);
    return push({ ...position, rev: remote.rev });
  }

  /** One request chain at a time; a step asked for meanwhile runs right after. */
  let queued: (() => Promise<void>) | null = null;
  async function run(step: () => Promise<void>) {
    if (busy) {
      queued = step;
      return;
    }
    busy = true;
    try {
      await step();
      setStatus({ kind: "synced", at: Date.now() });
    } catch (error) {
      console.error(error);
      setStatus(error instanceof WrongKey ? { kind: "wrong-key" } : { kind: "offline" });
    } finally {
      busy = false;
    }
    const next = queued;
    queued = null;
    if (next) await run(next);
  }

  /** Push only what still differs: a pull may already have settled it. */
  const pushChanges = () =>
    run(async () => {
      const position = readPosition(store);
      if (JSON.stringify(shared(getState())) !== position.synced) await push(position);
    });

  const pull = () =>
    run(async () => {
      const response = await fetch(`${url}/state`, { headers });
      if (response.status === 403) throw new WrongKey();
      if (response.status === 404) return reconcile(null);
      if (!response.ok) throw new Error(`Sync pull answered ${response.status}`);
      return reconcile((await response.json()) as Remote);
    });

  const onVisible = () => {
    if (document.visibilityState === "visible") void pull();
  };
  document.addEventListener("visibilitychange", onVisible);
  const pullTimer = window.setInterval(onVisible, PULL_EVERY_MS);

  return {
    pull,
    changed() {
      const position = readPosition(store);
      if (JSON.stringify(shared(getState())) === position.synced) return;
      writePosition(store, { ...position, changedAt: Date.now() });
      window.clearTimeout(pushTimer);
      pushTimer = window.setTimeout(() => void pushChanges(), PUSH_DELAY_MS);
    },
    stop() {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(pullTimer);
      window.clearTimeout(pushTimer);
    },
  };
}

export function useHouseholdSync(
  state: RelayState,
  setState: (state: RelayState) => void,
): SyncStatus {
  const [key] = useState(householdKey);
  const [status, setStatus] = useState<SyncStatus>(key ? { kind: "syncing" } : { kind: "local" });
  const latest = useRef(state);
  const connection = useRef<Connection | null>(null);

  useEffect(() => {
    if (!key) return;
    const current = connect(
      SYNC_URL,
      key,
      window.localStorage,
      () => latest.current,
      setState,
      setStatus,
    );
    connection.current = current;
    void current.pull();
    return () => current.stop();
  }, [key, setState]);

  useEffect(() => {
    latest.current = state;
    connection.current?.changed();
  }, [state]);

  return status;
}
