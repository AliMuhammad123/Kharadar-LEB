# Roadmap

Ordered by value to the project, not by effort. Items 1–3 are what a final-examination
version should have. Everything below that is optional.

Nothing here is required to ship. If the goal is simply to publish, go straight to
`03-build-and-release.md`.

## 1. Urdu, with a language toggle

The original brief specifies bilingual Urdu and English, and this is the gap an examiner
is most likely to notice.

Every user-visible string currently sits inside the `ACT` content object or in the HTML.
The cleanest route is to convert each string into `{ en, ur }` and add a `lang` setting
read by a single `t()` helper, rather than duplicating the content tree.

Also needed:

- `dir="rtl"` on the document when Urdu is active, and a check that the flex rows,
  the sticky wallet and the number badges survive the flip
- an Urdu-capable font — Noto Nastaliq Urdu reads best for older users but is tall, so
  line-height will need adjusting; Noto Sans Arabic is a safer fallback
- a toggle beside the existing "Aa" button in the header
- the activity names are already Urdu transliterations, so keep those as they are

Budget a full day for the RTL layout alone. Do not assume it works because the strings
swapped.

## 2. Persistence and patient profiles

Scores currently vanish on close, which makes the progress screen a demo rather than a
record. For a therapist to use this between sessions it needs:

- device-local storage via the Capacitor Preferences plugin — **not** `localStorage`,
  which is unreliable inside a WebView
- a simple patient selector on the home screen, so one tablet can serve several patients
- a history view showing score trend per activity over time, which is the thing a
  therapist actually wants to see

If you add this, update the Data safety declaration: it is still "no data collected or
shared" because nothing leaves the device, but the privacy policy text about session
memory being erased on close becomes untrue and must be rewritten.

## 3. Export the therapist note

A share button on the result and progress screens that produces a plain text or PDF
summary, handed to the OS share sheet via the Capacitor Share plugin. This is what turns
Roshan from a game into something that generates a clinical record, and it is cheap to
build.

## 4. Replace emoji with custom SVG icons

Emoji render differently across Android versions and vendor skins, and some of the
objects in Find the Mistake are ambiguous at small sizes. A consistent icon set would
look markedly more professional in screenshots. Roughly 50 icons.

## 5. Audio instructions

Reading is itself effortful after a stroke, and aphasia is common. A speaker button that
reads the prompt aloud would widen who can use the app without help. Needs recorded
Urdu and English audio rather than text-to-speech, which handles Urdu poorly.

## 6. More levels and more content

The architecture takes new levels without code changes — see "Adding a level" in
`02-app-spec.md`. Content ideas consistent with the clinical brief:

- **Aaj Ka Din:** a Ramadan day, a wedding day, a day with two appointments
- **Bazaar Challenge:** comparing unit prices, a vendor giving wrong change to detect
- **Rasta Yaad Rakho:** following spoken directions, recognising a wrong turn
- **Find the Mistake:** a bathroom scene, a bedroom scene, medication sorting

Each new level needs an entry in `tests/smoke.js`.

## 7. Difficulty adaptation

Grade automatically from recent performance: three clean runs unlock the next level,
repeated cueing drops the item count. Keep it visible and overridable — a therapist must
be able to set the level manually, and the app should never silently move a patient down
in a way they notice.

## Deliberately not doing

- **Accounts, cloud sync, a backend.** The privacy story is one of the app's strengths
  and a server would cost money the project does not have.
- **Leaderboards or competitive scoring.** Inappropriate for this population.
- **Streaks and daily-engagement mechanics.** Missing a day should not make a stroke
  patient feel they have failed at something.
- **Ads or in-app purchases.** Would undermine the clinical framing and complicate review.
