# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript, using shadcn/ui with the Base UI primitive layer. The first version should remain local-first and avoid a backend or account service.

## Users

Two adult spouses preparing together for the Canadian citizenship test. They will use the tool on the same device or browser, with separate learner profiles and a shared practice mode.

## Product Purpose

Help the couple move from uncertainty to citizenship-test readiness: understand the application path, learn the official _Discover Canada_ material, practise retrieval, explain ideas to each other, and see what still needs work. Success means each learner can consistently pass mixed practice sets with room to spare and knows the next real-world application step.

## Positioning

A two-person, local-first study command centre that turns the official guide into a paced curriculum and makes teaching each other part of the practice loop. It is not an immigration representative, an official IRCC test, or a substitute for the Government of Canada guide.

## Operating Context

The couple may be starting before the application or while waiting for an invitation, often months before a test date is set. The tool should therefore support a flexible runway, an eventual intensive sprint, and separate readiness for each learner. Each learner brings a different background; neither one's interests are assumptions about the other. History is an approachable topic, not a special advantage or required route.

## Capabilities and Constraints

- Explain the official adult eligibility and application journey with links to Canada.ca, and compute the physical-presence arithmetic from the learner's own dates: 1,095 days in the five years before signing, at least 730 as a permanent resident, temporary or protected time at half a day up to 365 credited days, and three tax-filing years inside the period.
- Keep the estimate conservative. An unknown arrival date credits nothing, days in prison, parole, probation or a pending refugee claim are subtracted, and the screen says IRCC's calculator decides.
- Cover the whole official guide: one module per chapter of _Discover Canada_, split into sessions of a few minutes each, each session with its own test. Coverage is stated in the product, not implied: the Study view lists every chapter against the sessions and questions written for it.
- Layer the tests so difficulty matches reading: session test, then a module test that mixes one chapter, then a mixed check across everything read, then a mock exam in the real format (20 questions, 45 minutes, 15 to pass, forward-only, marked at the end).
- Keep the order fixed: read a session before any question from it can be asked, and never quiz on material that has not been studied.
- Ground every claim in the captured guide text. Each study bite and each question carries a verbatim `evidence` quote, and `npm run curriculum:check` fails when the quote is not in `data/corpus/`. Nothing in the curriculum may rest on a model's memory of Canada.
- Where the 2012 guide has aged, keep the guide's answer as the marked one and show a caveat naming what to confirm. The guide still defines the test; the learner still needs the current fact.
- Schedule retrieval practice instead of leaving it to memory. A missed question is re-asked once inside the same test, then returns at widening gaps, and each miss links back to the bite that teaches it.
- Save progress locally in the browser; do not imply cross-device sync, identity verification, or official scoring.
- Make the study language selectable between English and French in the plan, while the initial interface and authored content are English.
- Treat the current IRCC rules as time-sensitive. Link to official sources and show a last-reviewed date instead of hard-coding changing processing times or fees.
- The official guide, _Discover Canada: The Rights and Responsibilities of Citizenship_, is the primary study source. Third-party questions are optional practice and may be inaccurate.

## Evidence on Hand

- Government of Canada citizenship eligibility, study-guide, test-format, invitation, and online-test pages are the authoritative sources, captured under `data/corpus/` with a refresh script.
- The guide's own Study Questions page is folded into the modules and marked as official.
- No user-provided test invitation, application number, UCI, travel history, province, language-proof details, or exact test date is available yet.
- No real learner performance data is available; the first version must make assumptions editable and clearly label them.

## Product Principles

1. Start with one useful study action, not a wall of immigration information.
2. Let people learn a small session before asking them to prove what they know, and bring the misses back on a schedule they do not have to keep in their head.
3. Make the couple a study advantage without exposing one learner's private notes by default.
4. Prefer official, dated sources and surface uncertainty when facts can change. Verify a claim against the captured guide text or do not ship it.
5. Turn a broad national story into a small, visible set of sessions and next steps.
6. Practise the real format before the real day: timed, forward-only, and marked at the end.
7. Make coming back feel good. A daily goal, a streak and quick wins keep two busy adults returning; they never replace the schedule or the source.
8. Keep every screen to the one thing it is for. A test screen is the question, its answers and the feedback in one column; details open on demand.

## Accessibility & Inclusion

Use semantic HTML and accessible shadcn components, keyboard-operable controls, visible focus, sufficient contrast, reduced-motion support, responsive layouts, and clear plain language. Do not treat English or French as a second language as a deficit, or assume one learner shares the other's interests. Support screen readers and allow study without relying on colour alone.
