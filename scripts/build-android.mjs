import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

// Builds the signed release APK for arm64 phones: `pnpm build:android`. Needs JAVA_HOME, the
// Android SDK with an NDK (ANDROID_HOME, default ~/Android/Sdk) and the signing key in
// $DATA/secrets/citizenship (see its README.md).
const root = path.resolve(import.meta.dirname, "..");
const sdk = process.env.ANDROID_HOME ?? path.join(homedir(), "Android", "Sdk");
const ndk =
  process.env.NDK_HOME ?? path.join(sdk, "ndk", readdirSync(path.join(sdk, "ndk")).sort().at(-1));
const buildTools = path.join(
  sdk,
  "build-tools",
  readdirSync(path.join(sdk, "build-tools")).sort().at(-1),
);
const signing = path.join(
  process.env.DATA ?? path.join(homedir(), "data"),
  "secrets/citizenship/android.properties",
);
const apk = path.join(
  root,
  "src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk",
);
if (!process.env.JAVA_HOME) throw new Error("Set JAVA_HOME to a JDK 17 or later.");
if (!existsSync(signing)) throw new Error(`No signing key at ${signing}.`);

execFileSync("pnpm", ["tauri", "android", "build", "--apk", "-t", "aarch64"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, ANDROID_HOME: sdk, NDK_HOME: ndk, CITIZENSHIP_ANDROID_SIGNING: signing },
});
execFileSync(path.join(buildTools, "apksigner"), ["verify", apk], { stdio: "inherit" });
console.log(`Signed APK: ${apk}`);
