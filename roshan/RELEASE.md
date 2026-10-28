# Launch checklist — Roshan on Google Play

Package ID: **`pk.roshan.app`** (permanent). Target/compile SDK 36, min SDK 24.

Everything in the repo is done: Android project, icons, splash, portrait lock, signing
config, CI build, store screenshots, store copy. What's left needs your Google account,
your money or your keystore, so only you can do it.

## 1. Get the APK now (no account needed)

GitHub → Actions → **Roshan Android build** → latest run → download `roshan-debug-apk`.
Install on any phone (allow "unknown sources"). Good for the midterm demo / WhatsApp.

## 2. Create the signing key (once, on your own machine)

```bash
keytool -genkey -v -keystore roshan.keystore -alias roshan -keyalg RSA -keysize 2048 -validity 10000
```

Back up `roshan.keystore` + both passwords in three places. Lose it and the app can never
be updated. Never commit it.

Then add four repository secrets (GitHub → Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `ROSHAN_KEYSTORE_BASE64` | output of `base64 -w0 roshan.keystore` |
| `ROSHAN_KEYSTORE_PASSWORD` | keystore password |
| `ROSHAN_KEY_ALIAS` | `roshan` |
| `ROSHAN_KEY_PASSWORD` | key password |

Re-run the workflow → it now also produces `roshan-release` with `app-release.aab`
(for Play) and a signed `app-release.apk`.

Local alternative: copy `android/keystore.properties.example` to `keystore.properties`,
fill it in, then `npm run aab` (needs Android Studio / SDK 36).

## 3. Privacy policy URL

1. Replace `CONTACT_EMAIL_HERE` in `privacy/index.html` with a real address.
2. Host it publicly. Easiest: GitHub Pages on this repo (Settings → Pages → main / root)
   → `https://<user>.github.io/<repo>/roshan/privacy/`. Check it loads logged-out.

## 4. Play Console

1. Register at play.google.com/console — $25 one-time, card with international
   transactions enabled, CNIC verification takes a few days. (If the university registers
   an **organization** account with a D-U-N-S number, step 5 is skipped.)
2. Create app → name `Roshan — Daily Living Activities`, App, Free.
3. Store listing → text from `docs/04-play-store-listing.md`; graphics from `store/`:
   `icon-512.png`, `feature-graphic-1024x500.png`, `screenshots/1-…8-*.png` in order.
4. App content — answers are in `docs/04-play-store-listing.md`:
   privacy policy URL · App access: no login needed · Ads: none · Content rating
   questionnaire · Target audience: 18+ · Data safety: no data collected or shared ·
   **Health apps declaration** (general wellbeing, not a medical device) · Government app: no.
5. Testing → Closed testing → upload `app-release.aab`, add **15–18 testers** (Google
   accounts, real phones). They must stay opted in and use the app for **14 days**.
6. Dashboard → Apply for production access → review 1–7 days → roll out to Production.

For every later update: bump `versionCode` (+1) and `versionName` in
`android/app/build.gradle`, push, upload the new AAB.

## Do not

- Add medical claims (treats / improves / rehabilitation / recovery) anywhere.
- Lower `targetSdk` below 36.
- Add network calls, analytics or ads.
