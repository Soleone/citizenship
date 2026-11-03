# Citizenship design

## Direction

Calm and minimal, in the spirit of Tasks: one centered column, the title on the left and a few icon controls on the right, and the list as the main thing. Show the one next step; everything else opens on demand. No sidebar, breadcrumbs, card stacks or repeated boilerplate.

## Theme

Colours come from the shared `@soleone/theme` kit and its picker (press `T`). Components use tokens only (`primary`, `muted`, `success`, `destructive`), so every theme works. `primary` marks the next step, progress and reward; `success` a right answer or a pass; `destructive` a miss or low time. The app's default theme and storage key live in `src/theme/config.ts`. The default is the app's own Maple theme (`src/theme/maple.ts`), flag red on snow, with a Maple Dark variant on warm charcoal. Misses take a different crimson or rose so they don't read as the next step.

## Components

shadcn base-nova on Base UI, kept byte-for-byte upstream in `src/components/ui` (`kit check` verifies it). The one restyled primitive is the list row, wrapped in `src/components/variants/row.tsx`. Lint forbids raw colours, arbitrary values and restyling primitives anywhere else.

## Screens

- **Home** is a list: a one-line status, a highlighted "up next" row, a small practice toolbar (Review, Blitz, Mixed, Mock), then the chapters as rows with a status circle and a count. A chapter opens to its sessions and its chapter test. "Who's who today" is the last row.
- **Play screens** (session, test, blitz) drop the header for a close button, a thin progress bar and one number on the right (XP, combo, time). Below it is a single column: the bite or question, the answers, the feedback directly under them, and one Continue button that Enter also presses. Keys 1 to 4 answer.
- **Pictures** anchor every bite: a generated scene (or a wordless pictogram for abstract ideas), or the study map for anything geographic, drawn from real boundaries and zoomed to the highlighted provinces with the capital marked. They show under the bite title and after a test answer, never with a question (they would give it away) and never in the mock test. `src/curriculum/visuals.ts` says which bite gets what; images live in `public/images/<bite id>.webp`.
- **Results** are a heading with the score, the misses as rows with the right answer, and two or three buttons.
- **Together and Application** use the header layout with plain sections and checkbox rows; long details sit behind a click.

## Learning loop

Each bite is followed by its quick checks, and those checks are the session test. XP, a combo, a daily goal and a day streak reward showing up; sound and confetti are reserved for finishing a session, passing a test, a level or the daily goal. Misses enter a Leitner queue and come back at widening gaps. The mock test keeps the real rules: 20 questions, 45 minutes, forward only, nothing marked until it is handed in.
