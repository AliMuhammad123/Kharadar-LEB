# Roshan

Cognitive rehabilitation activities for older adults recovering from stroke, designed for
a Pakistani clinical context. Four everyday activities, three graded levels each.

Built for the TAT-1 group project, Group 03, with occupational therapy students.

## Run it right now

Open `www/index.html` in any browser. That is the whole app — one file, no install,
no server, works offline.

On a phone: send yourself the file and open it, or serve the folder:

```bash
npx serve www
```

## What is in here

```
CLAUDE.md                        brief for Claude Code — read this first
www/index.html                   the app (self-contained, font bundled in www/fonts/)
docs/01-clinical-brief.md        target population, cognitive domains, OT rationale
docs/02-app-spec.md              architecture, the four engines, scoring, screens
docs/03-build-and-release.md     Capacitor wrapping and the Play Store release path
docs/04-play-store-listing.md    store copy, graphics specs, policy declarations
docs/05-privacy-policy.md        ready to host, required by Play
docs/06-roadmap.md               what to build next, in priority order
assets/                          app icon and feature graphic
tests/smoke.js                   headless playthrough of all twelve levels
tests/screenshots.js             regenerates the Play Store screenshots
android/                         Capacitor Android project
store/                           icon, feature graphic, 8 phone screenshots
RELEASE.md                       launch checklist
```

## Test

```bash
cd tests
npm install
node smoke.js
```

Expected: twelve passing lines and `EVERY LEVEL COMPLETABLE`.

## Android

Capacitor project in `android/` (`pk.roshan.app`, target SDK 36). CI builds it on every
push: `.github/workflows/roshan-android.yml` at the repo root.

```bash
npm install
npm run apk:debug     # needs Android SDK 36 locally
npm run aab           # signed Play bundle; needs android/keystore.properties
```

Store graphics and screenshots are in `store/`. **What remains to go live is in
`RELEASE.md`.**

## A note on claims

Roshan offers cognitive practice activities. It does not diagnose, treat or cure any
condition and does not replace a qualified occupational therapist. Keep that framing
everywhere, including the store listing.
