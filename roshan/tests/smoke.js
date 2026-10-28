/**
 * Roshan smoke test.
 *
 * Loads www/index.html in jsdom and plays every one of the twelve levels
 * perfectly. A perfect playthrough with no hints and no retries must score
 * exactly 100. Anything else means a level is unreachable, unwinnable, or
 * the scoring has drifted.
 *
 *   npm install && node smoke.js
 */

const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

/* jsdom has no layout engine, so window.scrollTo throws "not implemented".
   The app guards it; we just keep the noise out of the report. */
const quiet = new VirtualConsole();
quiet.sendTo(console, { omitJSDOMErrors: true });

const APP = path.join(__dirname, '..', 'www', 'index.html');
const dom = new JSDOM(fs.readFileSync(APP, 'utf8'), {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole: quiet
});
const D = dom.window.document;
const $  = s => D.querySelector(s);
const $$ = s => Array.from(D.querySelectorAll(s));
const click = el => {
  if (!el) throw new Error('tried to click an element that is not there');
  el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
};
const screen = () => $('.screen.on').id;
const wait = ms => new Promise(r => setTimeout(r, ms));

let failures = 0;
const pass = m => console.log('  ok   ' + m);
const fail = m => { console.error('  FAIL ' + m); failures++; };

/* The correct answer for every level. */
const PLAYTHROUGH = {
  day: [
    { seq: ['wake', 'wash', 'break', 'tablet'] },
    { seq: ['wake', 'break', 'tablet', 'shop', 'rest', 'dinner'],
      match: ['6:30 am', '8:30 am', '8:00 pm'] },
    { seq: ['wake', 'dress', 'break', 'tablet', 'papers', 'leave'] }
  ],
  bazaar: [
    { buy: ['bread', 'eggs', 'milk'] },
    { buy: ['atta', 'daal', 'tea', 'soap'] },
    { buy: ['med', 'atta', 'daal', 'milk', 'soap'], change: 'Rs 70' }
  ],
  route: [
    { path: ['home', 'pharm', 'home'] },
    { path: ['home', 'hosp', 'pharm', 'home'] },
    { path: ['home', 'bank', 'bazaar', 'hosp', 'pharm', 'home'] }
  ],
  mistake: [
    { flags: ['iron', 'pills'] },
    { flags: ['stove', 'knife', 'pills'] },
    { flags: ['wire', 'water', 'slip', 'heater'] }
  ]
};

(async () => {

  for (const activity of Object.keys(PLAYTHROUGH)) {
    for (let level = 0; level < PLAYTHROUGH[activity].length; level++) {

      const plan = PLAYTHROUGH[activity][level];
      const label = `${activity} L${level + 1}`;

      click($('#navbar button[data-nav="s-home"]'));
      click($(`.act[data-act="${activity}"]`));
      click($(`#lvList .tile[data-lv="${level}"]`));

      if (plan.seq) {
        plan.seq.forEach(id => click($(`.chip[data-step="${id}"]`)));
        click($('#checkBtn'));
        if (plan.match) {
          click($('#checkBtn'));                       // continue to part two
          plan.match.forEach((time, i) => {
            const row = $$('#playBody .match')[i];
            click(Array.from(row.querySelectorAll('.time'))
              .find(b => b.textContent === time));
          });
          click($('#checkBtn'));                       // check the times
          click($('#checkBtn'));                       // see results
        }
      }

      if (plan.buy) {
        plan.buy.forEach(id => click($(`.good[data-item="${id}"]`)));
        click($('#checkBtn'));
        if (plan.change) {
          click($('#checkBtn'));                       // continue to change
          click(Array.from($$('#playBody .time'))
            .find(b => b.textContent === plan.change));
          click($('#checkBtn'));                       // check the change
          click($('#checkBtn'));                       // see results
        }
      }

      if (plan.path) {
        click($('#checkBtn'));                         // finished memorising
        plan.path.forEach(id => click($(`.spotb[data-place="${id}"]`)));
        click($('#checkBtn'));
      }

      if (plan.flags) {
        plan.flags.forEach(id => click($(`.thing[data-thing="${id}"]`)));
        click($('#checkBtn'));
        click($('#checkBtn'));                         // see results
      }

      await wait(1000);                                // results transition

      if (screen() !== 's-results') {
        fail(`${label} never reached the results screen (stuck on ${screen()})`);
        continue;
      }
      const score = Number($('#scoreN').textContent);
      if (score !== 100) fail(`${label} perfect play scored ${score}, expected 100`);
      else pass(`${label} completable, perfect play scores 100`);
    }
  }

  /* The progress screen should know about all four activities by now. */
  click($('#navbar button[data-nav="s-progress"]'));
  if ($$('#progList .prog').length !== 4) fail('progress screen is missing activities');
  else if ($$('#progList .sc.none').length !== 0) fail('an activity has no recorded score');
  else pass('progress screen records all four activities');

  /* Accessibility affordance that must never be removed. */
  click($('#textToggle'));
  if (D.documentElement.getAttribute('data-text') !== 'large') fail('text-size toggle is broken');
  else pass('text-size toggle works');

  console.log(failures ? `\n${failures} FAILED` : '\nEVERY LEVEL COMPLETABLE');
  process.exitCode = failures ? 1 : 0;

})().catch(err => {
  console.error('CRASH: ' + err.message);
  process.exitCode = 1;
});
