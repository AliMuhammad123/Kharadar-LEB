/**
 * Captures the eight Play Store phone screenshots listed in
 * docs/04-play-store-listing.md, from the real app, into ../store/screenshots/.
 *
 * 1080×2160 (360×720 CSS px at 3x). Play rejects screenshots whose long side
 * is more than twice the short side, so 1080×2340 is not usable.
 *
 *   node screenshots.js        (uses the pre-installed Chromium via playwright)
 */

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const APP = 'file://' + path.join(__dirname, '..', 'www', 'index.html');
const OUT = path.join(__dirname, '..', 'store', 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 360, height: 720 }, deviceScaleFactor: 3,
    isMobile: true, hasTouch: true, reducedMotion: 'reduce'
  });
  const shot = async name => {
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('  saved ' + name);
  };
  // dispatch like the smoke test does: the navbar is hidden during play
  const tap = sel => page.$eval(sel, el => el.click());
  const open = async (act, lv) => {
    await tap('#navbar button[data-nav="s-home"]');
    await tap(`.act[data-act="${act}"]`);
    await tap(`#lvList .tile[data-lv="${lv}"]`);
    await page.evaluate(() => window.scrollTo(0, 0));
  };

  await page.goto(APP);
  await page.evaluate(() => document.fonts.ready);
  await shot('1-home');

  await open('day', 2);
  for (const s of ['wake', 'dress', 'break']) await tap(`.chip[data-step="${s}"]`);
  await shot('2-aaj-ka-din');

  await open('bazaar', 1);
  for (const s of ['atta', 'daal']) await tap(`.good[data-item="${s}"]`);
  await shot('3-bazaar');

  await open('route', 2);
  await shot('4-rasta-yaad-rakho');

  await open('mistake', 2);
  for (const s of ['wire', 'heater']) await tap(`.thing[data-thing="${s}"]`);
  await shot('5-find-the-mistake');

  // finish the room to reach a results screen
  for (const s of ['water', 'slip']) await tap(`.thing[data-thing="${s}"]`);
  await tap('#checkBtn'); await tap('#checkBtn');
  await page.waitForSelector('#s-results.on');
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot('6-results');

  // a couple more scores so the progress screen is not mostly empty
  await open('day', 0);
  for (const s of ['wake', 'wash', 'break', 'tablet']) await tap(`.chip[data-step="${s}"]`);
  await tap('#checkBtn'); await page.waitForSelector('#s-results.on');
  await open('route', 0);
  await tap('#checkBtn');
  for (const s of ['home', 'pharm', 'home']) await tap(`.spotb[data-place="${s}"]`);
  await tap('#checkBtn'); await page.waitForSelector('#s-results.on');
  await tap('#navbar button[data-nav="s-progress"]');
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot('7-progress');

  await tap('#navbar button[data-nav="s-home"]');
  await tap('#textToggle');
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot('8-large-text');

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
