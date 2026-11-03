# Curriculum authoring contract

You are writing one module of the Discover Canada curriculum. Read this whole
file, then read `src/curriculum/types.ts`, then
`src/curriculum/modules/02-rights-and-responsibilities.ts` (the reference
module), then your assigned corpus file(s).

The learner using this is an adult permanent resident who has to pass a real
test: 20 questions, 45 minutes, 15 right to pass, three chances. The only
official source is _Discover Canada_, and IRCC says every test question comes
from that guide. So the bar is:

> If the guide does not say it, it is not in your module. If the guide says it,
> it probably belongs in your module.

## What you write

Exactly one file: `src/curriculum/modules/NN-<slug>.ts`, default-exporting a
`Module`. Nothing else. Do not touch `index.ts`, `types.ts`, other modules, or
the app.

## The verification, which you must run yourself

```bash
npm run curriculum:check src/curriculum/modules/NN-<slug>.ts
```

It fails if any `evidence` string is not found **verbatim** in your corpus file.
Keep iterating until it prints `curriculum checks passed` with zero problems and
zero warnings that name your own ids. Warnings about other modules are not
yours to fix.

### Evidence rules

- `evidence` on a bite or a question must be an exact contiguous substring of
  one `data/corpus/*.txt` file listed in your module's `corpus` array.
- Copy and paste it from the corpus file. Do not retype it, do not "tidy" it, do
  not change capitalization, spelling, hyphens or spacing. The guide contains
  typos and odd spacing ("800- year"); they stay.
- Curly quotes and em dashes were already converted to ASCII `"` `'` and `-`.
  Match what is in the file.
- 8 to 25 words is the sweet spot: long enough to prove the claim, short enough
  to read in the UI.
- Never write an answer you cannot quote. If you cannot find the sentence, the
  fact is not in your chapter, and it does not go in your module.

## Coverage, not vibes

Your corpus file has `###` and `####` headings. Every one of them must be
taught, and the checker enforces it: a section with real prose that no bite or
question quotes fails the whole run. The only escape is `CAPTION_ONLY` in
`scripts/check-curriculum.mts`, for headings that are a diagram or a picture
label with nothing to learn from. Work through the file top to bottom and list its testable facts before
you write sessions: names, dates, places, numbers, definitions, lists,
cause-and-effect. Dense chapters deserve more sessions; do not skip the boring
middle.

Aim for **one bite per distinct testable idea**, 3 to 5 bites per session, and
**5 to 7 questions per session**, with every question tied to the bite that
teaches it. If a paragraph yields three facts, it earns three bites.

## Question craft

- One fact per question. Ask the thing the test would ask.
- Vary the phrasing: "What did X do?", "Which is NOT...", "Who is responsible
  for...", "What does the term mean?". The real test is multiple choice or true
  / false.
- `kind: "truefalse"` takes exactly two options, `"True"` and `"False"`. Use a
  few per module, mainly on dates, definitions and who-does-what.
- Distractors must be plausible and clearly wrong from the guide. Wrong answers
  must not be answers to a different question in the same chapter, or the learner
  learns to distrust the guide. The checker warns when a distractor is also guide
  text.
- `correctIndex`: spread it around. If every answer in a session is option 1, the
  learner is being tested on a pattern, not on Canada.
- `rationale` says why the answer is right in the guide's terms, and names the
  trap when there is one. One or two sentences.
- Prompts and options are plain language for an adult learner whose first
  language may not be English. Short sentences. No joke answers.

## Time-sensitive facts

The guide is from 2012 and still defines the test. Do not ask "who is the
current X". When a guide fact has visibly aged (the named Sovereign, the number
of ridings, seat counts, officeholders, population figures, party leaders, dates
of "today"), keep the guide's answer and add a `caveat` telling the learner what
to confirm. Never invent a fresher number than the guide's.

## Identity rules

- `module.id`, `module.order`, `module.corpus`, `module.source`, session ids and
  question id prefixes are assigned in the table below. Use them exactly.
- Session id: `<moduleId>.<short-slug>`, e.g. `history.confederation`.
- Bite id: `<sessionId>.<n>` starting at 1.
- Question id: `<prefix>-<NNN>` with the three-letter prefix given for your
  module, numbered up from 001, zero padded. These ids outlive you: the memory
  queue keys on them, so never reuse an id for a different question.
- `moduleId` on each session must match the module.

## Style

Write like a good teacher, not like a brochure. No "rich tapestry", no "journey
of discovery", no exclamation marks, no em dashes in your prose. Every bite
should survive the reader forgetting everything else: the `takeaway` is the
sentence they will actually say out loud.

## Before you finish

1. `npm run curriculum:check <your file>` clean.
2. Re-read your module's coverage against the corpus headings and fill gaps.
3. Report: sessions written, questions written, headings covered, anything you
   could not ground in the guide, and any fact you believe the 2012 guide has
   wrong or out of date.

## Assignments

`chapterUrl("key")` and `chapterTitle["key"]` come from
`src/curriculum/sources.ts`.

| file                       | order | module id            | prefix | corpus (`data/corpus/*.txt`)               | chapter key    | sessions to write                                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ----- | -------------------- | ------ | ------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `01-becoming-a-citizen.ts` | 1     | `becoming-a-citizen` | `bc`   | `applying-citizenship`, `oath-citizenship` | `applying`     | 3: the test and how to apply; after the test (interview, hearing, proof, ceremony); the Oath of Citizenship                                                                                                                                                                                                                                              |
| `03-who-we-are.ts`         | 3     | `who-we-are`         | `ww`   | `who-are-canadians`                        | `whoWeAre`     | 4: Indigenous peoples then and now; English and French founding peoples; immigration and diversity; official languages and bilingualism                                                                                                                                                                                                                  |
| `04-history.ts`            | 4     | `history`            | `hi`   | `canadas-history`                          | `history`      | 8, split along the chapter's own headings: first peoples and European arrival; New France and the Conquest; Loyalists, slavery and a growing economy; the Rebellions of 1837-38 and responsible government; Confederation; the West, the railway and the Klondike; the First World War and women's suffrage; the interwar years and the Second World War |
| `05-modern-canada.ts`      | 5     | `modern-canada`      | `mc`   | `modern-canada`                            | `modernCanada` | 5: trade and economic growth; international engagement (UN, NATO, peacekeeping); Canada and Quebec; a changing society; arts, culture, discoveries and inventions                                                                                                                                                                                        |
| `06-government.ts`         | 6     | `government`         | `gv`   | `how-canadians-govern-themselves`          | `government`   | 4: three key facts about the system; federalism and who is responsible for what; Parliament and how a bill becomes law; the Crown, Governor General and Lieutenant Governors                                                                                                                                                                             |
| `07-elections.ts`          | 7     | `elections`          | `el`   | `federal-elections`                        | `elections`    | 5: ridings and MPs; who is entitled to vote and how a polling day works; the secret ballot and voting procedures; after an election (majority, minority, forming government); the other levels of government and what they do                                                                                                                            |
| `08-justice.ts`            | 8     | `justice`            | `ju`   | `justice-system`                           | `justice`      | 3: the rule of law and due process; courts and how they are organized; police, lawyers and legal aid                                                                                                                                                                                                                                                     |
| `09-symbols.ts`            | 9     | `symbols`            | `sy`   | `canadian-symbols`                         | `symbols`      | 6: the Canadian Crown and flags; the maple leaf and the fleur-de-lys; coat of arms, motto and Parliament Buildings; sports and the beaver; the national and royal anthems; the Order of Canada, the Victoria Cross and national holidays                                                                                                                 |
| `10-economy.ts`            | 10    | `economy`            | `ec`   | `canadas-economy`                          | `economy`      | 3: a trading nation; the three types of industry; work, employers, unions and wages (whatever the chapter actually covers)                                                                                                                                                                                                                               |
| `11-regions.ts`            | 11    | `regions`            | `rg`   | `canadas-regions`                          | `regions`      | 6: the regions of Canada, the national capital and population; the Atlantic provinces; Central Canada (Quebec and Ontario); the Prairie provinces; the West Coast; the northern territories and the Canadian Rangers                                                                                                                                     |

Notes:

- `02-rights-and-responsibilities.ts` already exists. It is the reference; do not
  rewrite it.
- Where the chapter's own headings do not match the suggested split, follow the
  headings and say so in your report.
- Module `testSize`: 10 for dense modules, 8 for `justice` and `economy`.
- Icon keys must already exist in the app's icon map. Use: `passport` (module 1),
  `users`, `history`, `waypoints`, `landmark`, `vote`, `scale`, `flag`,
  `factory`, `mountain`.
