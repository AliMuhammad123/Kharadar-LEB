# Play Store listing

Copy below is written to pass review. The framing is **cognitive practice activities**,
never treatment. Do not add "rehabilitation of", "improves memory", "helps stroke
patients recover", "therapy" as a claim about what the app does, or any before/after
outcome language. Describing *who it was designed with* and *what the activities are*
is fine. Describing *what it will do to you* is not.

## App name

```
Roshan — Daily Living Activities
```

Alternatives if taken: `Roshan: Everyday Thinking Activities`, `Roshan Daily Skills`.
30 characters maximum.

## Short description (80 characters max)

```
Everyday activities that practise routine, shopping, routes and home safety.
```

## Full description (4000 characters max)

```
Roshan offers four simple, familiar activities that give your thinking skills a gentle
daily workout — built around ordinary life at home rather than abstract puzzles.

Designed with occupational therapy students for a Pakistani setting, the activities use
everyday things: a morning routine with chai and paratha, a shopping trip to the bazaar
with a fixed budget in rupees, a walk through the neighbourhood, and a check around the
house for things left out of place.

FOUR ACTIVITIES

Aaj Ka Din — Put the steps of an ordinary day back in the right order, from waking up
to dinner, and match them to the time you would normally do them.

Bazaar Challenge — Shop for what the house needs while staying inside your budget.
Read the prices, add them up, and work out your change.

Rasta Yaad Rakho — Study a route through the neighbourhood, then walk it again from
memory, stop by stop.

Find the Mistake — Scan a room and spot the things that are out of place or unsafe,
from an iron left switched on to a loose wire across the floor.

THREE LEVELS EACH

Every activity has three levels. Later levels add more steps, more to remember and more
to plan, never smaller text or faster timing.

BUILT TO BE EASY TO USE

• Large text, with a one-tap switch to make it larger still
• Large buttons and generous spacing
• Tap to choose — no dragging, no swiping, no fiddly gestures
• No countdown timers and no time pressure of any kind
• Gentle feedback that shows you what to look at again rather than just marking
  you wrong
• Hints whenever you want one
• Works completely offline, with no account and no sign-up

PRIVACY

Roshan collects nothing. There are no accounts, no adverts, no trackers and no internet
connection required. Your session stays on your device.

PLEASE NOTE

Roshan offers cognitive practice activities for general wellbeing. It does not diagnose,
treat or cure any condition, and it is not a substitute for assessment and treatment by
a qualified occupational therapist or doctor. Always follow the advice of your own
healthcare professional.
```

## Graphics

| Asset | Size | Where |
|---|---|---|
| App icon | 512×512 PNG, 32-bit | `assets/icon-512.png` |
| Feature graphic | 1024×500 PNG | `assets/feature-graphic-1024x500.png` |
| Phone screenshots | 2 minimum, 8 recommended, 16:9 or 9:16, min 320px | capture these |

Screenshots to take, in this order — the store shows the first two most often, so lead
with the clearest:

1. Home screen with the four activity cards
2. Aaj Ka Din mid-task, a few steps placed
3. Bazaar Challenge with the wallet bar partly filled
4. Rasta Yaad Rakho in the study phase with the route numbered
5. Find the Mistake with two hazards marked
6. A results screen with the score ring
7. The progress screen
8. The home screen with the text-size toggle switched on, showing large text

Captured: `store/screenshots/` (1080×2160, regenerate with `node tests/screenshots.js`).
Do not use 1080×2340: Play rejects screenshots whose long side is over twice the short side.
Do not add marketing text over the screenshots that makes a medical claim.

## Policy form answers

**Data safety** — Does your app collect or share any required user data types? **No.**
Is all user data encrypted in transit? Not applicable, no data leaves the device.
Do you provide a way for users to request data deletion? Not applicable.

**Content rating** — answer the questionnaire honestly; the app has no violence, no
sexual content, no profanity, no gambling, no user interaction, no location sharing.
Expect Everyone / PEGI 3.

**Target audience and content** — target age group **18 and over**. The app is not
designed for children, so the Families policy does not apply.

**Health apps declaration** — required. Declare it as a health app. It is **not** a
medical device app, does **not** provide diagnosis or treatment, does **not** handle
health records, and does **not** conduct clinical trials or research on users. It
provides general wellbeing activities.

**Ads** — contains no ads.

**Government app** — no.

**App access** — all functionality is available with no special access, no login
credentials required. Say so explicitly, otherwise reviewers may flag it.

## Rejection risks, in order of likelihood

1. **Medical claims.** The commonest one. Scrub "rehabilitation", "therapy", "treatment",
   "recovery" as verbs describing what the app does to the user.
2. **Missing or unreachable privacy policy URL.** It must be live, public, and on a page
   that loads without a login.
3. **Health declaration not submitted.** Health-adjacent apps that skip it get held.
4. **Target API below 36.** Automatic rejection at upload.
5. **Screenshots that do not match the app.** Use real captures, not mockups.
