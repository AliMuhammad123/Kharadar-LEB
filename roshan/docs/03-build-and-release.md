# Build and release

From `www/index.html` to a live Play Store listing.

Requirements verified October 2026. Check the Play Console for anything that has moved.

## Why Capacitor and not a PWA wrapper

The app must work offline in clinics and homes with poor signal. Capacitor bundles the
HTML inside the APK, so there is nothing to host and nothing to fetch. PWABuilder and
Bubblewrap need a live URL, and their templates have shipped `targetSdkVersion 35`, which
Google Play rejects for new apps and updates since 31 August 2026.

## Prerequisites

- Node.js 20+
- JDK 17
- Android Studio with the Android 16 (API 36) SDK and build tools
- A Google Play Console account — one-time $25. From Pakistan this needs a card enabled
  for international transactions. Identity verification with CNIC and address takes a few
  days, so start it before you need it.

## 1. Scaffold

```bash
npm create @capacitor/app roshan-android
cd roshan-android
npm install
```

Replace the generated `www/` with this repo's `www/`, then:

```bash
npx cap add android
npx cap sync
```

Set in `capacitor.config.json`:

```json
{
  "appId": "pk.edu.yourinstitute.roshan",
  "appName": "Roshan",
  "webDir": "www",
  "android": { "allowMixedContent": false },
  "server": { "androidScheme": "https" }
}
```

The `appId` can never be changed after publishing. Decide it with the group now.

## 2. API levels

In `android/app/build.gradle`:

```gradle
android {
  compileSdk 36
  defaultConfig {
    minSdk 24
    targetSdk 36
    versionCode 1
    versionName "1.0.0"
  }
}
```

**Do not accept a scaffold default of 35.** Since 31 August 2026, new apps and updates
must target Android 16 (API 36) or higher. Extensions to 1 November 2026 were available
on request but that window has closed.

Bump `versionCode` by one for every upload to Play. It can never go down.

## 3. Lock the orientation and keep the font offline-safe

The layout is designed for portrait on a phone. In `AndroidManifest.xml`, on the main
activity:

```xml
android:screenOrientation="portrait"
```

Optional but recommended: download Plus Jakarta Sans, drop the woff2 files in
`www/fonts/`, replace the Google Fonts `<link>` with an inline `@font-face` block.
This removes the only external reference in the app and makes typography identical
offline. The current fallback stack is acceptable if you skip this.

## 4. Icon and splash

`assets/icon-512.png` and `assets/feature-graphic-1024x500.png` are in this repo.

Generate the launcher icons through Android Studio: right-click `res` →
New → Image Asset → Launcher Icons (Adaptive and Legacy), using `icon-512.png` as the
foreground and `#5B3DF5` as the background.

Set the splash background to `#5B3DF5` in `res/values/styles.xml`.

## 5. Signing key

```bash
keytool -genkey -v -keystore roshan.keystore \
  -alias roshan -keyalg RSA -keysize 2048 -validity 10000
```

**Back up `roshan.keystore` and both passwords somewhere you will still have in two
years.** Google Drive, email to yourself, a USB stick, all three. If this file is lost
the app can never be updated and would have to be republished as a brand new listing
with a new package ID and zero installs.

Store the credentials in `android/keystore.properties`, and add that file to
`.gitignore` — never commit it:

```properties
storeFile=../../roshan.keystore
storePassword=…
keyAlias=roshan
keyPassword=…
```

Wire it into `android/app/build.gradle` as a `signingConfigs.release` block referenced
by `buildTypes.release`.

## 6. Build

```bash
npx cap sync android
cd android && ./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab` — this is what Play
takes.

For the midterm demo, also produce a shareable APK:

```bash
./gradlew assembleRelease
```

That file can go straight onto WhatsApp. Recipients need to allow installing from
unknown sources. **This path needs no Play account, no $25 and no waiting**, and it is
the right choice for any deadline inside the next month.

## 7. Play Console setup

Create the app, then work through the dashboard tasks. `docs/04-play-store-listing.md`
has the copy and the exact answers for the policy forms. In short you need:

- store listing text and graphics
- a privacy policy at a public URL — `docs/05-privacy-policy.md`, hosted on GitHub Pages
- Data safety: no data collected, no data shared
- content rating questionnaire
- target audience: adults
- **Health apps declaration** — required, because the listing describes cognitive
  practice for people recovering from stroke
- ads: none
- government app: no

## 8. Closed testing

Personal developer accounts created after 13 November 2023 must run a closed test with
**at least 12 testers opted in continuously for 14 days** before applying for production
access. Organization accounts registered with a D-U-N-S number are exempt — if the
university will register the account, this whole step disappears. Worth asking the
department.

Practical notes:

- Recruit 15–18, not 12. Anyone dropping out can reset the clock.
- Google checks that testers genuinely *used* the app, not just that they opted in.
  Ask them to open it several times across the two weeks.
- Each tester needs a distinct Google account on a real device. Emulators do not count.
- The five group members, their families, and the OT department cover this easily.

After 14 continuous days, apply for production access on the dashboard. Review is
typically one to seven days.

## Realistic timeline

| | |
|---|---|
| Account creation and verification | 2–5 days |
| Capacitor wrap, icons, signed build | 1 day |
| Store listing and policy forms | half a day |
| Closed test | 14 days minimum |
| Production review | 1–7 days |
| **Total** | **3–4 weeks** |

Plan the midterm around the direct APK and treat the Play listing as a final-examination
deliverable.
