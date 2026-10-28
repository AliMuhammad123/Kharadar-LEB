# App specification

Everything here describes `www/index.html` as it currently stands.

## Architecture

One file. HTML, CSS and JavaScript inline. No framework, no build step, no dependencies,
no network calls. The only external reference is a Google Fonts `<link>` for Plus Jakarta
Sans, which falls back to a system stack when offline.

The whole script is wrapped in an IIFE in strict mode. There are no globals.

```
ACT        content for all four activities and twelve levels
ORDER      ["day","bazaar","route","mistake"] — display order
S          mutable state for the level currently being played
SESSION    { results: [] } — everything completed this session
```

### Screens

Sections with class `.screen`; `show(id)` toggles `.on`. Bottom nav appears only on
`s-home` and `s-progress`; the back chevron appears everywhere else.

| id | Purpose |
|---|---|
| `s-home` | Hero with session stats, 2×2 activity grid, disclaimer |
| `s-levels` | Three level tiles for the chosen activity, with best scores |
| `s-play` | Shared chrome: title, level pill, prompt, `#playBody`, feedback, sticky action bar |
| `s-results` | Animated score ring, readout, cognitive areas, therapist note |
| `s-progress` | Best score per activity, aggregated domains, session log, summary |

There is **one** play screen. Each engine renders into `#playBody` and takes over the
primary button through `setPrimary(label, enabled, handler)`.

### Engines

`act().engine` dispatches to one of four render/check pairs.

**`seq` — sequencing (Aaj Ka Din).** A pool of step cards and an ordered list the user
builds by tapping. Tapping a placed row removes it. `checkSeq` compares `S.placed`
against `L.answer` position by position and paints each row green or red individually.
Level 2 has a second `match` phase mapping activities to clock times. Level 3 includes
`distractors` that must be left out; using one produces a specific message.

**`budget` — budgeting (Bazaar Challenge).** A sticky wallet shows running spend against
`L.budget` and turns red when over. Items toggle in and out of `S.basket`. `checkBudget`
validates in a deliberate order: over budget first, then wrong items, then missing items.
Level 3 adds a `change` phase asking the user to compute change from Rs 800.

**`route` — spatial recall (Rasta Yaad Rakho).** Two phases held in `S.phase`.
In `study` the map shows numbered badges on the route and tiles are disabled; the user
taps "I have memorised it" with no time limit. In `recall` the badges disappear and the
user taps places in order. "Start over" returns to `study`, so the route can be
re-studied rather than guessed.

**`spot` — error detection (Find the Mistake).** A grid of objects; tapping flags one.
The user cannot flag more than the number of real hazards. `checkSpot` separates hits
from false alarms and marks them differently. On a perfect answer the app appends a `.why`
list explaining each hazard, which is the teaching moment.

### Scoring

```js
base = (firstTryCorrect / total) * 100
if (bonus !== null) base = base * 0.7 + bonus * 100 * 0.3   // time match or change question
score = max(0, round(base - hints * 5))
```

`firstTryCorrect` is captured on the **first** check only, so self-correction still
produces a correct answer but an honest score. For `budget` and `spot` it is
`max(0, hits - falseAlarms)`, which penalises guessing without going negative.

### Therapist note

Generated in `finish()` from attempts and hints, not from score:

| Condition | Recommendation |
|---|---|
| 1 attempt, 0 hints | Independent — move to the next level |
| 0 hints, multiple attempts | Error monitoring intact — stay at this level |
| 1–2 hints | Grade down the number of items before grading down the level |
| 3+ hints | Consider the previous level or fewer items |

## Design system

- **Type:** Plus Jakarta Sans, weights 500–800, tight letter-spacing
- **Palette:** violet `#5B3DF5` primary, mint `#00A87E` correct, amber `#E58200` warning,
  rose `#E5484D` error, canvas `#F1F2F6`, ink `#0D1117` — all CSS custom properties
  on `:root`, so the whole theme can be reskinned by editing one block
- **Shape:** 20–28px radii, 999px pill buttons, layered soft shadows
- **Chrome:** frosted-glass sticky header and action bar via `backdrop-filter`
- **Motion:** `cubic-bezier(.2,.8,.3,1)` throughout, entry and pop keyframes,
  animated score ring using `stroke-dashoffset`; all of it disabled under
  `prefers-reduced-motion`

Text scale is driven by `--base` on `:root`, switched between 17px and 21px by the "Aa"
toggle setting `data-text="large"` on `<html>`. Every size in the file is in `rem`, so
one variable scales the entire interface.

## Known limitations

- **No persistence.** `SESSION` is in memory and is lost when the app closes. Deliberate
  for a demo build; see roadmap.
- **English only.** The data model has no translation layer yet.
- **Single patient.** No profiles, no login, no way to separate two users' sessions.
- **No export.** The therapist note can be read on screen but not saved or shared.
- **Emoji as iconography.** Renders differently across Android versions. Acceptable, but
  custom SVG icons would look more professional and render identically everywhere.

## Adding a level

Push an object onto `ACT.<id>.levels`. Required on every level regardless of engine:
`title`, `short`, `load`, `prompt {strong, body, rules[]}`, `areas[{name, why}]`.
Then the engine-specific fields: `steps`/`answer`/`hints` for `seq`,
`budget`/`items` for `budget`, `places`/`path`/`cols` for `route`, `items` for `spot`.
Add the expected perfect playthrough to `tests/smoke.js`.
