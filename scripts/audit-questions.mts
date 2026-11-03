import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

import { allQuestions, curriculumModules } from "../src/curriculum/index.ts";

/**
 * Print a question next to the passage it cites, so a human can judge the two
 * together. `npm run curriculum:check` proves a quote exists; only reading
 * settles whether the quote proves the answer.
 *
 *   npm run curriculum:audit sy-016 hi-045
 *   npm run curriculum:audit -- --random 12
 */

const ROOT = resolve(import.meta.dirname, "..");
const CORPUS = join(ROOT, "data", "corpus");

const norm = (v: string) =>
  v
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
const corpus = readdirSync(CORPUS)
  .filter((f) => f.endsWith(".txt"))
  .map((f) => ({ name: f, raw: readFileSync(join(CORPUS, f), "utf8") }));

if (process.argv[2] === "--random") {
  const count = Number(process.argv[3] ?? 10);
  const picked = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, count);
  process.argv.push(...picked.map((question) => question.id));
}

const wanted = process.argv.slice(2).filter((arg) => /^[a-z]{2}-\d{3}$/.test(arg));
for (const id of wanted) {
  const question = allQuestions.find((q) => q.id === id);
  if (!question) {
    console.log(`!! ${id} not found`);
    continue;
  }
  const module = curriculumModules.find((m) =>
    m.sessions.some((s) => s.test.some((q) => q.id === id)),
  )!;
  console.log(`\n### ${id}  [${module.title}]`);
  console.log(`Q: ${question.prompt}`);
  question.options.forEach((option, index) =>
    console.log(`   ${index === question.correctIndex ? ">" : " "}${option}`),
  );
  console.log(`why: ${question.rationale}`);
  if (question.caveat) console.log(`caveat: ${question.caveat}`);
  const needle = norm(question.evidence);
  for (const chapter of corpus) {
    if (!module.corpus.includes(chapter.name.replace(".txt", ""))) continue;
    const lines = chapter.raw.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (
        norm(lines[i]).includes(needle) ||
        (i + 1 < lines.length && norm(lines[i] + " " + lines[i + 1]).includes(needle))
      ) {
        console.log(`--- ${chapter.name}:${i + 1} context`);
        console.log(
          lines
            .slice(Math.max(0, i - 1), i + 3)
            .map((l) => "    " + l.slice(0, 400))
            .join("\n"),
        );
        i = lines.length;
      }
    }
  }
}
