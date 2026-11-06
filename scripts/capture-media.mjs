// Records the README loop and the hero from the production build in a fresh browser: the home screen,
// the first session's opening bite, then both of its quick checks answered right.
// The hero is the first answer with its feedback. Run `pnpm build` first.
// Needs agent-browser (with its browser installed) and FFmpeg on the PATH.
import { execFile, spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { record } from "@soleone/showcase-capture";

const exec = promisify(execFile);
const media = path.resolve("docs/media");
const port = String(4400 + (process.pid % 500));
const url = `http://127.0.0.1:${port}/`;
const shows = (text) => `document.body.innerText.includes(${JSON.stringify(text)})`;
const click = (label) =>
  `[...document.querySelectorAll("button")].find((button) => button.textContent.includes(${JSON.stringify(label)})).click()`;

const server = spawn(
  "node_modules/.bin/vp",
  ["preview", "--host", "127.0.0.1", "--port", port, "--strictPort"],
  { stdio: "ignore" },
);
const out = await mkdtemp(path.join(os.tmpdir(), "citizenship-capture-"));
const heroShot = path.join(out, "hero.png");
try {
  for (let tries = 0; ; tries++) {
    try {
      if ((await fetch(url)).ok) break;
    } catch {}
    if (tries > 60) throw new Error("vp preview did not answer");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const { frames, durationMs, grid } = await record({
    url,
    out: path.join(media, "demo.webp"),
    viewport: { width: 1280, height: 800 },
    attempts: 3,
    async start(page) {
      await page.waitFor(shows("Up next"), { timeoutMs: 30_000 });
      await page.sleep(1500);
    },
    async drive(page) {
      await page.run("eval", click("Up next"));
      await page.waitFor(shows("Who has to take the test"), { timeoutMs: 10_000 });
      await page.sleep(3000);
      await page.run("eval", click("Quick check"));
      await page.waitFor(shows("Quick check 1 of 2"), { timeoutMs: 10_000 });
      await page.sleep(1500);
      await page.run("eval", click("Applicants who are 18 to 54"));
      await page.waitFor(shows("Next question"), { timeoutMs: 10_000 });
      await page.sleep(800);
      await page.run("screenshot", heroShot);
      await page.sleep(1700);
      await page.run("eval", click("Next question"));
      await page.waitFor(shows("Quick check 2 of 2"), { timeoutMs: 10_000 });
      await page.sleep(1500);
      await page.run("eval", click("False"));
      await page.sleep(2500);
    },
    async verify(page) {
      const right = `document.querySelector('button[aria-pressed="true"]')?.className.includes("border-success") ?? false`;
      if (!(await page.eval(right))) return "the last check was not marked right";
    },
  });
  await exec("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    heroShot,
    "-vf",
    "scale=960:-1",
    path.join(media, "hero.png"),
  ]);
  console.log(
    `Wrote docs/media/demo.webp (${frames} frames, ${(durationMs / 1000).toFixed(1)} s) and docs/media/hero.png. Check the frames in ${grid}.`,
  );
} finally {
  server.kill();
  await rm(out, { recursive: true, force: true });
}
