/**
 * Household sync check.
 *
 *   pnpm sync:check
 *
 * Runs the real sync Worker in memory and two simulated devices against it, a
 * laptop and a phone, to prove the promises the app makes: the first device
 * seeds the household, a new device takes the shared copy instead of wiping it,
 * edits travel both ways, the newer save wins a conflict, application dates
 * never leave the device, and every write keeps the version it replaced.
 */

import worker, { Household, type Env } from "../worker/index.ts";
import { connect, type SyncStatus } from "../src/sync.ts";
import { normalizeRelayState, type RelayState } from "../src/state.ts";
import { allSessions } from "../src/curriculum/index.ts";

const URL_BASE = "https://sync.test";
const KEY = "household-key-for-the-check-only";

const failures: string[] = [];
function expect(label: string, condition: boolean, detail = "") {
  if (condition) console.log(`  ok  ${label}`);
  else failures.push(`${label}${detail ? ` (${detail})` : ""}`);
}

function memoryStorage(): Storage {
  const items = new Map<string, string>();
  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (index) => [...items.keys()][index] ?? null,
    removeItem: (key) => void items.delete(key),
    setItem: (key, value) => void items.set(key, value),
  };
}

// The Durable Object's storage, as a plain map.
const saved = new Map<string, unknown>();
const household = new Household({
  storage: {
    get: async <T,>(key: string) => saved.get(key) as T | undefined,
    put: async (key, value) => void saved.set(key, structuredClone(value)),
    delete: async (key) => saved.delete(key),
  },
});
const env: Env = {
  HOUSEHOLD_KEY: KEY,
  HOUSEHOLD: { idFromName: (name) => name, get: () => ({ fetch: (r) => household.fetch(r) }) },
};

Object.assign(globalThis, {
  window: globalThis,
  document: { visibilityState: "hidden", addEventListener() {}, removeEventListener() {} },
  fetch: (input: string, init?: RequestInit) => worker.fetch(new Request(input, init), env),
});

function device(key = KEY) {
  const store = memoryStorage();
  const self = {
    state: normalizeRelayState({}),
    status: null as SyncStatus | null,
    edit(change: (state: RelayState) => RelayState) {
      self.state = change(self.state);
      connection.changed();
    },
  };
  const connection = connect(
    URL_BASE,
    key,
    store,
    () => self.state,
    (next) => {
      self.state = next;
      connection.changed();
    },
    (status) => {
      self.status = status;
    },
  );
  return { self, sync: connection.pull, stop: connection.stop };
}

const tick = () => new Promise((resolve) => setTimeout(resolve, 5));
const [first, second] = allSessions;
const readBy = (state: RelayState, profile: "you" | "partner", id: string) =>
  state.completedSessions[profile].includes(id);

console.log("Household sync check");

const laptop = device();
laptop.self.edit((state) => ({
  ...state,
  completedSessions: { ...state.completedSessions, you: [first.id] },
  applications: {
    ...state.applications,
    you: { ...state.applications.you, birthDate: "1985-01-01" },
  },
}));
await laptop.sync();
const seeded = saved.get("current") as { rev: number; state: RelayState } | undefined;
expect("the first device seeds an empty household", seeded?.rev === 1);
expect("its progress is in the household copy", !!seeded && readBy(seeded.state, "you", first.id));
expect("application dates never reach the server", !!seeded && !("applications" in seeded.state));

const phone = device();
await phone.sync();
expect("a new device takes the shared copy", readBy(phone.self.state, "you", first.id));
expect("and keeps its own empty application", phone.self.state.applications.you.birthDate === "");
expect("joining does not write a new version", (saved.get("current") as { rev: number }).rev === 1);

phone.self.edit((state) => ({
  ...state,
  completedSessions: { ...state.completedSessions, partner: [second.id] },
}));
await phone.sync();
await laptop.sync();
expect("an edit on the phone reaches the laptop", readBy(laptop.self.state, "partner", second.id));
expect(
  "the laptop keeps its own birth date",
  laptop.self.state.applications.you.birthDate === "1985-01-01",
);

laptop.self.edit((state) => ({ ...state, targetDate: "2027-01-15" }));
await tick();
phone.self.edit((state) => ({ ...state, targetDate: "2027-02-20" }));
await laptop.sync();
await phone.sync();
await laptop.sync();
expect("the newer save wins a conflict", laptop.self.state.targetDate === "2027-02-20");
expect("both devices agree after it", phone.self.state.targetDate === "2027-02-20");

const versions = [...saved.keys()].filter((key) => key.startsWith("history:"));
const rev = (saved.get("current") as { rev: number }).rev;
expect(
  "every write keeps the version it replaced",
  versions.length === rev - 1,
  versions.join(", "),
);

const stranger = device("a guessed key");
await stranger.sync();
expect("a wrong key is refused", stranger.self.status?.kind === "wrong-key");

for (const each of [laptop, phone, stranger]) each.stop();

if (failures.length) {
  console.error(`\n${failures.length} failed:\n${failures.map((f) => `  - ${f}`).join("\n")}`);
  process.exit(1);
}
console.log("\nHousehold sync holds.");
