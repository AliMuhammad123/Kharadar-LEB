# Roshan — working brief for Claude Code

Read this first. It tells you what Roshan is, what state it is in, what to build,
and the rules that must not be broken. `docs/` has the detail.

## What this is

Roshan is a cognitive rehabilitation app for **older adults recovering from stroke**,
built for a Pakistani clinical context. It is a university group project (TAT-1, Group 03)
produced with occupational therapy students, and it is intended to demonstrate
occupation-based rehabilitation: practising thinking skills through familiar everyday
tasks rather than abstract puzzles.

Four activities, three graded levels each, twelve levels in total.

| Activity | Urdu meaning | Engine | Practises |
|---|---|---|---|
| Aaj Ka Din | "Today's day" | sequencing | time orientation, sequencing, planning |
| Bazaar Challenge | market shopping | budgeting | calculation, inhibition, prioritisation |
| Rasta Yaad Rakho | "remember the route" | spatial recall | spatial memory, orientation |
| Find the Mistake | — | error detection | visual attention, safety awareness |

## Current state

`www/index.html` is a **complete, working, self-contained single HTML file**. No build
step, no dependencies, no network calls. Open it in a browser and all twelve levels play.
It has a home dashboard, bottom navigation, a progress screen, animated score rings and a
therapist note on every result screen.

This is **not a prototype to be replaced**. It is the product. Your job is to ship it,
not to rewrite it.

## Your mission

1. Wrap `www/index.html` into an Android app with **Capacitor**.
2. Get it through Google Play review and into production.

`docs/03-build-and-release.md` is the step-by-step. `docs/04-play-store-listing.md`
has the store copy. `docs/06-roadmap.md` lists optional features, in priority order,
if the user asks for more than shipping.

## Rules that must not be broken

**Never make medical claims.** Not in the app, not in the store listing, not in
screenshots. Never say Roshan diagnoses, treats, cures, rehabilitates or improves any
condition. Say it offers *cognitive practice activities*. This is the single commonest
reason health-adjacent apps get rejected. The in-app disclaimer on the home screen must
stay, and the Play Console **Health apps declaration** must be submitted.

**Target API level 36 or higher.** Since 31 August 2026 Google Play rejects new apps and
updates that target below Android 16 (API 36). Set `compileSdk 36`, `targetSdk 36`,
`minSdk 24`. Do not accept a scaffold default of 35.

**Keep it offline.** The app must work with no internet. Capacitor bundles the HTML
inside the APK, which is why it was chosen over a PWA/TWA wrapper. Do not introduce a
hosted URL, a CDN font fetch that blocks rendering, analytics, or any network call.
The Google Fonts `<link>` in the file degrades gracefully to a system font stack when
offline — leave it that way, or self-host the font, but never make rendering depend on it.

**Keep accessibility intact.** This is for stroke patients, many with hemiparesis and
low vision. Do not replace tap-to-place with drag-and-drop. Do not shrink the 70px row
heights or the 58px buttons. Do not remove the "Aa" text-size toggle. Do not add
countdown timers or any mechanic that penalises slowness. `prefers-reduced-motion` must
keep disabling all animation.

**No data collection.** The app stores nothing and transmits nothing. Session scores live
in memory and are deliberately lost on close. If you add persistence, it must be
device-local only, and the Data safety form must be updated to match.

**Do not break the content.** The twelve levels were designed with the OT students and
each one is clinically reasoned. Prices, routes, hazards and step orders are not
placeholders. Run the test before and after any change to `www/index.html`.

## Testing

```bash
cd tests && npm install && node smoke.js
```

Drives all twelve levels headlessly and asserts a perfect playthrough scores 100 on each.
If a level cannot be completed or scores anything other than 100, you broke something.

## Working style

The user is a freelance developer in Karachi. He wants complete, production-ready output
rather than incremental patches, and concise direct explanations rather than long
commentary. When you finish something, say what changed in a few lines and move on.
If you hit a decision that costs money or cannot be undone — buying the developer
account, choosing the package ID, generating the signing key — stop and ask.
