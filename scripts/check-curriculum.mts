/**
 * Curriculum integrity check.
 *
 *   npm run curriculum:check                     # every module
 *   npm run curriculum:check src/curriculum/modules/04-history.ts
 *                                                # one module file, for authors
 *
 * The whole point of this app is that a learner can trust an answer. That trust
 * is only worth what the verification behind it is worth, so this script refuses
 * to let a claim ride on nothing:
 *
 *   - every `evidence` string must appear verbatim in the official guide text
 *     captured under data/corpus/ (see data/README.md for how it was taken)
 *   - every question must point at a bite that exists in its own session
 *   - ids must be unique, options well-formed, sources on canada.ca
 *   - coverage is reported per chapter, so gaps stay visible
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

import { chapterFile, officialSources } from "../src/curriculum/sources.ts";
import { guideAnsweredQuestions, guideOpenQuestions } from "../src/curriculum/open-questions.ts";
import type { Module } from "../src/curriculum/types.ts";
import { biteVisuals } from "../src/curriculum/visuals.ts";

const ROOT = resolve(import.meta.dirname, "..");
const CORPUS_DIR = join(ROOT, "data", "corpus");

function normalize(value: string) {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

type Corpus = { name: string; raw: string; text: string };

function loadCorpus(): Corpus[] {
  if (!existsSync(CORPUS_DIR)) return [];
  return readdirSync(CORPUS_DIR)
    .filter((file) => file.endsWith(".txt"))
    .map((file) => ({
      name: file.replace(/\.txt$/, ""),
      raw: readFileSync(join(CORPUS_DIR, file), "utf8"),
      text: normalize(readFileSync(join(CORPUS_DIR, file), "utf8")),
    }));
}

const corpus = loadCorpus();
const taughtSections = new Map<string, string[]>();

const STOPWORDS = new Set([
  "which",
  "what",
  "where",
  "when",
  "who",
  "whose",
  "why",
  "how",
  "does",
  "did",
  "done",
  "the",
  "they",
  "their",
  "there",
  "this",
  "that",
  "with",
  "from",
  "have",
  "has",
  "had",
  "are",
  "was",
  "were",
  "been",
  "being",
  "would",
  "could",
  "should",
  "about",
  "into",
  "onto",
  "while",
  "which",
  "according",
  "guide",
  "named",
  "names",
  "listed",
  "listed",
  "phrase",
  "sent",
  "says",
  "said",
  "true",
  "false",
  "correct",
  "correctly",
  "answer",
  "option",
]);

const allowedHosts = ["canada.ca", "citapply-citdemande.apps.cic.gc.ca"];

/**
 * Guide sections that are a diagram or a picture label with no prose of their
 * own. Adding to this list is a claim about the source, so it is written down
 * here rather than skipped silently.
 */
const CAPTION_ONLY = ["how-canadians-govern-themselves#Canada's System of Government"];

function evidenceHit(evidence: string) {
  const needle = normalize(evidence);
  if (needle.length < 12) return { needle, closest: null };
  const hit = corpus.find((chapter) => chapter.text.includes(needle));
  if (hit) return hit.name;
  return { needle, closest: closestMatch(needle) };
}

/**
 * A quote that is off by one character is a transcription error, not a false
 * claim, so point at the line the author probably meant.
 */
function closestMatch(needle: string) {
  let best: { name: string; line: string; score: number } | null = null;
  for (const chapter of corpus) {
    for (const line of chapter.text.split("\n")) {
      if (!line.trim()) continue;
      const score = longestSharedPhrase(needle, line);
      if (!best || score > best.score) best = { name: chapter.name, line, score };
    }
  }
  return best;
}

function longestSharedPhrase(needle: string, line: string) {
  const haystack = ` ${line} `;
  let score = 0;
  for (let start = 0; start < needle.length; start++) {
    let end = start + 12;
    while (end <= needle.length && haystack.includes(` ${needle.slice(start, end)} `)) {
      score = Math.max(score, end - start);
      end += 1;
    }
  }
  return score;
}

function verify(modules: Module[]) {
  const problems: string[] = [];
  const warnings: string[] = [];
  const check = (condition: boolean, where: string, message: string) => {
    if (!condition) problems.push(`${where}: ${message}`);
  };
  const warn = (message: string) => warnings.push(message);

  if (!corpus.length)
    problems.push("data/corpus/*.txt is missing or empty; no evidence can be verified");

  const moduleIds = new Set<string>();
  const sessionIds = new Set<string>();
  const questionIds = new Set<string>();
  const usedChapters = new Set<string>();

  let sessionCount = 0;
  let biteCount = 0;
  let questionCount = 0;
  let caveatCount = 0;
  let officialCount = 0;

  for (const module of modules) {
    const where = `module ${module.id}`;
    check(!moduleIds.has(module.id), where, "duplicate module id");
    moduleIds.add(module.id);
    check(module.order > 0, where, "order must be positive");
    check(module.corpus.length > 0, where, "no corpus chapters declared");
    check(module.sessions.length >= 3, where, `only ${module.sessions.length} sessions (want 3+)`);
    check(module.testSize >= 8, where, "module test smaller than 8 questions");
    check(
      allowedHosts.some((host) => module.source.includes(host)),
      where,
      `source is not an official page: ${module.source}`,
    );
    for (const chapter of module.corpus) {
      if (!corpus.some((entry) => entry.name === chapter)) {
        problems.push(`${where}: corpus chapter "${chapter}" has no data/corpus/${chapter}.txt`);
      }
      usedChapters.add(chapter);
    }

    const moduleQuestions: string[] = [];
    for (const session of module.sessions) {
      const sWhere = `session ${session.id}`;
      sessionCount += 1;
      check(!sessionIds.has(session.id), sWhere, "duplicate session id");
      sessionIds.add(session.id);
      check(
        session.moduleId === module.id,
        sWhere,
        `moduleId "${session.moduleId}" does not match ${module.id}`,
      );
      check(session.bites.length >= 2, sWhere, `only ${session.bites.length} bites (want 2+)`);
      check(
        session.test.length >= 4,
        sWhere,
        `only ${session.test.length} test questions (want 4+)`,
      );
      check(
        session.minutes >= 2 && session.minutes <= 15,
        sWhere,
        `minutes ${session.minutes} outside 2-15`,
      );
      check(
        allowedHosts.some((host) => session.source.includes(host)),
        sWhere,
        `source is not an official page: ${session.source}`,
      );
      check(session.teach.checklist.length >= 3, sWhere, "teach checklist needs 3 items");

      const biteIds = new Set<string>();
      for (const bite of session.bites) {
        const bWhere = `${sWhere} bite ${bite.id}`;
        biteCount += 1;
        check(!biteIds.has(bite.id), bWhere, "duplicate bite id in session");
        biteIds.add(bite.id);
        check(bite.body.length > 80, bWhere, "body too short to teach anything");
        check(bite.title.length > 3, bWhere, "missing title");
        const hit = evidenceHit(bite.evidence);
        if (typeof hit !== "string")
          problems.push(`${bWhere}: ${describeMiss(hit.needle, hit.closest)}`);
        else if (!module.corpus.includes(hit)) {
          warn(`${bWhere}: evidence comes from ${hit}, outside this module's chapters`);
        }
      }

      for (const question of session.test) {
        const qWhere = `question ${question.id}`;
        questionCount += 1;
        moduleQuestions.push(question.id);
        check(!questionIds.has(question.id), qWhere, "duplicate question id");
        questionIds.add(question.id);
        check(
          biteIds.has(question.biteId),
          qWhere,
          `biteId "${question.biteId}" is not a bite in ${session.id}`,
        );
        check(question.options.length >= 2, qWhere, "needs at least two options");
        check(
          question.kind === "truefalse" || question.options.length >= 3,
          qWhere,
          "multiple choice needs 3+ options",
        );
        check(
          question.kind !== "truefalse" || question.options.length === 2,
          qWhere,
          "true/false needs exactly two options",
        );
        check(
          new Set(question.options.map(normalize)).size === question.options.length,
          qWhere,
          "duplicate options",
        );
        check(
          question.correctIndex >= 0 && question.correctIndex < question.options.length,
          qWhere,
          "correctIndex out of range",
        );
        check(question.prompt.length > 12, qWhere, "prompt too short");
        check(question.rationale.length > 25, qWhere, "rationale too short");
        if (question.caveat) caveatCount += 1;
        if (question.official) officialCount += 1;

        const hit = evidenceHit(question.evidence);
        if (typeof hit !== "string")
          problems.push(`${qWhere}: ${describeMiss(hit.needle, hit.closest)}`);
        else if (!module.corpus.includes(hit)) {
          warn(`${qWhere}: evidence found in ${hit}, outside this module's chapters`);
        }

        const answer = question.options[question.correctIndex] ?? "";
        // A question copied from the guide carries the guide's own wrong
        // options, and reproducing them faithfully is the point.
        if (
          question.kind !== "truefalse" &&
          !question.official &&
          typeof hit === "string" &&
          answer.length > 6
        ) {
          const chapter = corpus.find((entry) => entry.name === hit);
          if (chapter && chapter.text.includes(normalize(answer))) {
            const leaked = question.options.some(
              (option, index) =>
                index !== question.correctIndex &&
                option.length > 10 &&
                chapter.text.includes(normalize(option)),
            );
            if (leaked) warn(`${qWhere}: a distractor also appears in the guide text`);
          }
        }
      }
    }
    check(
      moduleQuestions.length >= module.testSize,
      where,
      `module test asks ${module.testSize} but module only has ${moduleQuestions.length} questions`,
    );
  }

  /* Quality distribution, not correctness: a test where every answer is option
   * A, or where the same question appears twice, teaches pattern matching. */
  const answerByQuestion = new Map<string, string>();
  for (const module of modules) {
    for (const session of module.sessions) {
      for (const question of session.test)
        answerByQuestion.set(question.id, question.options[question.correctIndex] ?? "");
    }
  }

  const contentWords = (value: string) =>
    new Set(
      normalize(value)
        .replace(/[^a-z0-9 ]/g, " ")
        .split(" ")
        .filter((word) => word.length > 4 && !STOPWORDS.has(word)),
    );

  for (const module of modules) {
    for (const session of module.sessions) {
      for (const question of session.test) {
        const where = `question ${question.id}`;
        const answer = question.options[question.correctIndex] ?? "";

        // 1. A rationale that states another question's answer hands out answers
        //    in the middle of the same test.
        const leaked = session.test
          .filter((other) => other.id !== question.id)
          .map((other) => other.options[other.correctIndex] ?? "")
          .filter(
            (otherAnswer) =>
              otherAnswer.length > 8 &&
              normalize(question.rationale).includes(normalize(otherAnswer)),
          );
        if (leaked.length)
          warn(
            `${where}: rationale states another question's answer (${leaked.map((item) => `"${item.slice(0, 24)}..."`).join(", ")})`,
          );

        // 2. A prompt word that appears only in the marked option can be matched
        //    without knowing anything.
        if (question.kind !== "truefalse" && answer.length > 4) {
          const promptWords = contentWords(question.prompt);
          const answerWords = contentWords(answer);
          const distractorWords = new Set(
            question.options
              .filter((_, index) => index !== question.correctIndex)
              .flatMap((option) => [...contentWords(option)]),
          );
          const unique = [...promptWords].filter(
            (word) => answerWords.has(word) && !distractorWords.has(word),
          );
          if (unique.length)
            warn(
              `${where}: prompt word${unique.length > 1 ? "s" : ""} ${unique.map((word) => `"${word}"`).join(", ")} appear${unique.length > 1 ? "" : "s"} only in the marked option`,
            );

          // 3. The longest option is the right one, over and over, is a tell.
          const lengths = question.options.map((option) => option.length);
          const shortest = Math.min(...lengths.filter((length) => length > 0));
          if (answer.length > 2.4 * shortest && answer.length > 28) {
            warn(
              `${where}: marked option is ${Math.round((answer.length / shortest) * 10) / 10}x the shortest option`,
            );
          }
        }
      }
    }
  }

  const promptSeen = new Map<string, string>();
  for (const module of modules) {
    const quotes = module.sessions.flatMap((session) => [
      ...session.bites.map((bite) => bite.evidence),
      ...session.test.map((question) => question.evidence),
    ]);
    for (const chapter of module.corpus) {
      taughtSections.set(chapter, [...(taughtSections.get(chapter) ?? []), ...quotes]);
    }
    const choice = module.sessions
      .flatMap((session) => session.test)
      .filter((question) => question.kind !== "truefalse");
    const spread = [0, 0, 0, 0];
    for (const question of choice)
      spread[question.correctIndex] = (spread[question.correctIndex] ?? 0) + 1;
    const top = Math.max(...spread);
    if (choice.length >= 8 && top / choice.length > 0.5) {
      warn(
        `module ${module.id}: ${top} of ${choice.length} multiple-choice answers sit in the same position (${spread.join("/")})`,
      );
    }
    for (const session of module.sessions) {
      if (session.test.length > 8)
        warn(`session ${session.id}: ${session.test.length} questions in one session test`);
      for (const question of session.test) {
        const key = normalize(question.prompt).replace(/[^a-z0-9 ]/g, "");
        const seen = promptSeen.get(key);
        if (seen && seen !== question.id) warn(`question ${question.id}: same prompt as ${seen}`);
        promptSeen.set(key, question.id);
      }
    }
  }

  if (modules.length > 1) {
    const biteIds = new Set(
      modules.flatMap((module) =>
        module.sessions.flatMap((session) => session.bites.map((bite) => bite.id)),
      ),
    );
    for (const [biteId, visual] of Object.entries(biteVisuals)) {
      check(biteIds.has(biteId), `visual ${biteId}`, "no bite has this id");
      if ("image" in visual)
        check(
          existsSync(join(ROOT, "public/images", `${biteId}.webp`)),
          `visual ${biteId}`,
          "image file is missing from public/images",
        );
    }
    for (const biteId of biteIds)
      check(biteId in biteVisuals, `bite ${biteId}`, "has no picture or map");
  }

  if (modules.length > 1) {
    /* The guide's own open questions, mapped to the module that teaches the
     * answer. They belong to the whole curriculum, so they are only checked
     * when every module is loaded. */
    const studyText = corpus.find((entry) => entry.name === "study-questions")?.text ?? "";
    const knownModules = new Set(modules.map((module) => module.id));
    const openIds = new Set<string>();
    for (const item of guideOpenQuestions) {
      const where = `open question ${item.id}`;
      check(!openIds.has(item.id), where, "duplicate id");
      openIds.add(item.id);
      check(knownModules.has(item.moduleId), where, `moduleId "${item.moduleId}" is not a module`);
      check(
        studyText.includes(normalize(item.evidence)),
        where,
        "not printed in the guide's Study Questions chapter",
      );
      check(item.prompt.length > 12, where, "missing prompt");
    }
    check(
      guideOpenQuestions.length === 28,
      "open questions",
      `${guideOpenQuestions.length} found, the guide prints 28`,
    );
    for (const item of guideAnsweredQuestions) {
      check(
        knownModules.has(item.module),
        `answered question ${item.id}`,
        `unknown module ${item.module}`,
      );
      check(
        studyText.includes(normalize(item.answer)),
        `answered question ${item.id}`,
        "answer is not the guide's wording",
      );
    }

    /* The guide's open questions are the coverage of its own Study Questions
     * section, so they count as taught there. */
    taughtSections.set("study-questions", [
      ...(taughtSections.get("study-questions") ?? []),
      ...guideOpenQuestions.map((item) => item.evidence),
      ...guideAnsweredQuestions.map((item) => item.answer),
    ]);

    /* Coverage, measured against the source rather than asserted. The product
     * claim is "the whole guide", so the guide's own section headings decide
     * whether that is true: every section with real prose must be quoted by at
     * least one bite or question in this curriculum. */
    for (const [chapter, quotes] of taughtSections) {
      const file = corpus.find((entry) => entry.name === chapter);
      if (!file) continue;
      const lines = file.raw.split("\n");
      const headings = lines
        .map((line, index) => ({ line, index }))
        .filter((entry) => /^#{3,4} /.test(entry.line));
      headings.forEach((heading, position) => {
        const title = heading.line.replace(/^#+ /, "").trim();
        const key = `${chapter}#${title}`;
        if (CAPTION_ONLY.includes(key)) return;
        const stop = headings[position + 1]?.index ?? lines.length;
        const prose = normalize(lines.slice(heading.index + 1, stop).join(" "));
        if (prose.length < 120) return;
        if (!quotes.some((quote) => prose.includes(normalize(quote)))) {
          problems.push(`${key}: no study bite or question quotes this section of the guide`);
        }
      });
    }

    const declared = Object.values(chapterFile);
    for (const chapter of declared) {
      if (chapter === "studyQuestions") continue;
      if (!usedChapters.has(chapter)) warn(`guide chapter not covered by any module: ${chapter}`);
    }
    const known = [
      ...declared,
      "notice",
      "authorities",
      "memorable-quotes",
      "message-readers",
      "more-information",
    ];
    for (const entry of corpus) {
      if (!entry.name.startsWith("irc-") && !known.includes(entry.name)) {
        warn(`corpus file not referenced by chapterFile: ${entry.name}`);
      }
    }
  }

  const rows = modules
    .map((module) => ({
      order: module.order,
      title: module.title,
      sessions: module.sessions.length,
      questions: module.sessions.reduce((sum, session) => sum + session.test.length, 0),
    }))
    .sort((a, b) => a.order - b.order);

  console.log(`modules   ${modules.length}`);
  console.log(`sessions  ${sessionCount}`);
  console.log(`bites     ${biteCount}`);
  console.log(
    `questions ${questionCount} (${caveatCount} caveated, ${officialCount} from the guide's own study questions)`,
  );
  console.log("");
  for (const row of rows) {
    console.log(
      `  ${String(row.order).padStart(2)}. ${row.title.padEnd(34)} ${String(row.sessions).padStart(2)} sessions  ${String(row.questions).padStart(3)} questions`,
    );
  }
  console.log("");
  if (warnings.length) {
    console.log(`warnings (${warnings.length})`);
    for (const warning of warnings) console.log(`  ~ ${warning}`);
    console.log("");
  }
  if (problems.length) {
    console.log(`problems (${problems.length})`);
    for (const problem of problems) console.log(`  x ${problem}`);
    return false;
  }
  console.log("curriculum checks passed");
  return true;
}

function describeMiss(
  needle: string,
  closest: { name: string; line: string; score: number } | null,
) {
  if (needle.length < 12) return `evidence is too short to verify: "${needle}"`;
  if (!closest || closest.score < 12)
    return `evidence is not in the guide text at all: "${needle.slice(0, 80)}"`;
  const heard = needle.slice(0, closest.score);
  return (
    `evidence is not verbatim. Quoted "${heard}..." but the guide says "${closest.line.slice(0, closest.score + 40)}..." ` +
    `in data/corpus/${closest.name}.txt. Copy the guide text exactly, keeping its spelling, spacing and punctuation.`
  );
}

const target = process.argv[2];
let modules: Module[];

if (target) {
  const loaded = (await import(resolve(ROOT, target))).default;
  if (!loaded) throw new Error(`${target} has no default export`);
  modules = [loaded as Module];
} else {
  modules = (await import("../src/curriculum/index.ts")).curriculumModules as Module[];
}

process.exitCode = verify(modules) ? 0 : 1;
console.log(`\nsources: ${officialSources.study.href}`);
