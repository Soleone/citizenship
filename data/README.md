# Source corpus

Plain-text captures of the only official study source for the Canadian
citizenship test, plus the IRCC pages that define the application path.

`npm run curriculum:check` verifies that every `evidence` string in
`src/curriculum/modules/*.ts` appears verbatim in these files. Nothing in the
curriculum is allowed to rest on a model's memory of Canada.

## What is here

| file                                                                                                   | origin                                                                                                                            |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `oath-citizenship.txt`                                                                                 | Discover Canada, The Oath of Citizenship                                                                                          |
| `applying-citizenship.txt`                                                                             | Discover Canada, Applying for Citizenship                                                                                         |
| `rights-resonsibilities-citizenship.txt`                                                               | Discover Canada, Rights and Responsibilities of Citizenship (canada.ca slug has the typo)                                         |
| `who-are-canadians.txt`                                                                                | Discover Canada, Who We Are                                                                                                       |
| `canadas-history.txt`                                                                                  | Discover Canada, Canada's History                                                                                                 |
| `modern-canada.txt`                                                                                    | Discover Canada, Modern Canada                                                                                                    |
| `how-canadians-govern-themselves.txt`                                                                  | Discover Canada, How Canadians Govern Themselves                                                                                  |
| `federal-elections.txt`                                                                                | Discover Canada, Federal Elections                                                                                                |
| `justice-system.txt`                                                                                   | Discover Canada, The Justice System                                                                                               |
| `canadian-symbols.txt`                                                                                 | Discover Canada, Canadian Symbols                                                                                                 |
| `canadas-economy.txt`                                                                                  | Discover Canada, Canada's Economy                                                                                                 |
| `canadas-regions.txt`                                                                                  | Discover Canada, Canada's Regions                                                                                                 |
| `study-questions.txt`                                                                                  | Discover Canada, Study Questions (the guide's own practice questions)                                                             |
| `notice.txt`, `authorities.txt`, `memorable-quotes.txt`, `message-readers.txt`, `more-information.txt` | front/back matter                                                                                                                 |
| `irc-*.txt`                                                                                            | canada.ca citizenship test and application pages (test format, passing score, invitation, online test, eligibility, how to apply) |

Base URL for guide chapters:
`https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/<slug>.html`

## How to refresh

```bash
python3 scripts/fetch-corpus.py        # re-download every page listed in the script
```

The extractor keeps the `<main>` region only and turns it into headings,
paragraphs and list items. Captured 2026-09-03; refresh before trusting dates.

## Rights

Content is Government of Canada material reproduced for study purposes under
Crown copyright; the guide itself is free and IRCC publishes it for learners.
The app links to the live page for every chapter and labels its own questions as
unofficial practice.
