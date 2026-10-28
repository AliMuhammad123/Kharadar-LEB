# Clinical brief

Condensed from the original TAT-1 project notes (`reference/TAT-1-project-notes.pdf`).
This is the reasoning behind every design decision in the app. Read it before changing
any activity content.

## Target population

Geriatric and older adult patients following stroke.

After a stroke, older adults often experience cognitive difficulties that interfere with
everyday occupations: managing routines, shopping, travelling in the community,
organising the home, and making appropriate decisions.

The project therefore practises **functional cognition** rather than isolated cognitive
exercises. Activities are built around familiar situations so that cognitive skills
connect to real occupational performance.

## Cognitive domains targeted

- **Attention** — maintaining focus and responding to relevant information
- **Memory** — remembering information, objects, instructions and routines
- **Time orientation** — understanding daily routines, time and sequence
- **Problem solving** — identifying problems and selecting appropriate solutions
- **Executive function** — planning, organising and making decisions
- **Praxis** — arranging activities or steps in the correct order
- **Visual-spatial skills** — understanding routes, locations and spatial information
- **Observation and error detection** — identifying mistakes in familiar situations

## Design principles

| Principle | What it means in the build |
|---|---|
| Functional | Every task maps to a real-life activity and to independence |
| Familiar | Pakistani settings, objects and routines — chai, paratha, atta, daal, the bazaar, the masjid, rupees |
| Accessible | Simple navigation, clear instructions, large text, large tap targets |
| Graded | Difficulty adjusts to cognitive ability across three levels |
| Engaging | Interactive and game-like enough to sustain participation |
| Bilingual | Urdu and English. **Currently English only** — see roadmap |

## Grading principle

This is the most important rule in the project, stated in the original notes:

> Difficulty should increase through **cognitive demand**, not visual complexity.

The ladder: more items → longer sequences → more distractions → greater memory load →
more decisions → more planning.

- **Level 1, Basic** — fewer items, simple instructions, minimal distractions, shorter sequences, more support
- **Level 2, Moderate** — more information, longer sequences, more choices, mild distractions, greater memory demand
- **Level 3, Complex** — multiple steps, more distractors, prioritisation, planning and problem solving

Do not make a level harder by making it visually busier, smaller, or faster.

## The four activities and their functional connections

**1. Aaj Ka Din** — time orientation, attention, memory, sequencing, planning.
Users arrange familiar daily activities in the correct order or match them with
appropriate times. *Connects to:* daily routine management, time awareness, self-management.

**2. Bazaar Challenge** — attention, working memory, calculation, decision making,
problem solving. Users select necessary items while staying within a fixed budget.
*Connects to:* shopping, budgeting, prioritisation, IADL performance.

**3. Rasta Yaad Rakho** — spatial memory, visual attention, orientation, sequencing,
planning. Users remember and follow a route on a familiar neighbourhood map.
*Connects to:* way-finding, planning outings, community mobility.

**4. Find the Mistake** — visual attention, observation, error detection, executive
function, planning, problem solving. Users identify misplaced, incorrect or potentially
unsafe objects in a familiar home environment. Task flow: SCAN → FIND → DECIDE → CORRECT.
*Connects to:* home organisation, safety awareness, self-monitoring, task completion.

## Accessibility decisions and why they are not negotiable

- **Tap-to-place, never drag-and-drop.** Dragging requires sustained fine motor control
  and is unreliable for a patient with hemiparesis. This is the single most important
  usability decision in the app.
- **Atkinson-grade legibility and a text-size toggle.** Many users have low vision or
  post-stroke visual field loss.
- **No countdown timers.** Time is recorded silently for the therapist but is never used
  to pressure the patient. Processing speed is commonly affected after stroke and
  penalising it would make the app distressing rather than therapeutic.
- **Error-tolerant feedback.** Wrong answers mark each position individually so the
  patient self-corrects. Self-correction is the therapeutic goal; being told "wrong" is not.
- **Large targets.** 70px rows, 58px buttons, generous spacing.

## Therapist-facing output

Every result screen ends with a note that interprets independence rather than just score,
and recommends grading up or down based on cues used and attempts taken. The Progress
screen aggregates cognitive domains across the session. This is what makes Roshan read as
a clinical tool rather than a game, and it is the part examiners will look at.
