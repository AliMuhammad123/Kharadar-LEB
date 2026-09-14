# LEB Kharadar — Board Workspace (v1.9)

One file, no build step. `index.html` + Supabase + GitHub Pages.

## Getting around

Press **Ctrl+K** (⌘K on Mac) anywhere to open the jump bar. Type a few letters and press
Enter — it reaches every tab and the common actions directly, so "record a receipt" or
"new permission form" is two keystrokes from anywhere.

On a phone the sidebar folds away behind the menu button, and there's a "Go to…" button in
the top bar for the same jump bar.

A dark theme sits under your name in the sidebar. It follows your phone or laptop setting
the first time, then remembers your choice.

## Working faster

**Typing down a fee sheet** — press Enter or the down arrow to drop to the same column in
the next row. No mouse needed to work down a column of amounts.

**Searching** — the student register, both funds tables and the programme list have a
search box that filters as you type. Click any underlined column heading to sort by it.

**Long sheets** — once a table passes about a dozen rows the headings stay pinned while
you scroll, so you always know which column you're in.

**Undo** — deleting anything shows an Undo button for a few seconds. The confirmation
box is gone; undo is faster and less annoying.

**Saving** — a small marker appears bottom right while a change is being written, and
turns green when it lands. If a save fails you'll know immediately.

## Importing from Excel

Both the **Fee sheets** and the **Student register** have an *Import from Excel* button.
Pick a workbook, and the app finds the header row on its own — your three sheets put it on
rows 4, 3 and 7 respectively, and all three are detected correctly. It then guesses which
column is which, shows you the mapping and a preview of the first few rows, and only writes
once you press *Import rows*.

You can override the worksheet, the header row and every column mapping before importing.
Rows with a blank name are skipped, as is any `Total` row. Amounts written as text
(`"2,500"`, `Rs 3,200`) are read as numbers.

On a fee sheet, imported rows are added to the end of whichever tab you have open, and
get fresh serial numbers. Tick *Replace the rows already on this sheet* to clear it first.
On the student register, names already present are skipped by default.

Old `.xls` files aren't readable — open in Excel and save as `.xlsx` first.

## What changed from v1.0

- **No sample data.** The app starts completely empty.
- **Deletes stick.** Before Supabase is connected, records are saved in your browser's
  own storage, so adding and deleting behave the way they will on the real database.
  "Clear local records" sits under your name in the sidebar when you want a clean slate.
- **Sign-up and sign-in.** Anyone can create an account. The first account created
  becomes the board admin; everyone after that lands on a waiting screen until an
  admin approves them under **Board members**. Nobody unapproved can read a single record —
  that rule is enforced in the database, not just in the interface.
- **Quarterly report** no longer pulls in programmes from other quarters.

## Setup

1. **Supabase** — create a project, open the SQL editor, paste `schema.sql`, run it.
2. **Credentials** — Settings → API. Paste into the top of `index.html`:
   ```js
   const SUPABASE_URL = 'https://xxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJ...';
   ```
   Filling these in switches off local mode and brings up the login screen.
3. **Email confirmation** — Supabase asks new accounts to confirm by email by default,
   and its built-in mail service is rate-limited and unreliable. Either turn confirmation
   off (Authentication → Providers → Email → "Confirm email") so the board can register
   straight away, or connect Brevo or Resend as SMTP first, the same as you did for KSG.
4. **Create your account first.** Whoever signs up first becomes admin, so do it before
   sharing the link. If you get the order wrong:
   ```sql
   update profiles set role='admin' where id = '<your-user-uuid>';
   ```
5. **Host it** — push `index.html` to a GitHub Pages repo.

## Access levels

| Level | Can do |
|---|---|
| Waiting | Nothing. Sees the holding screen until approved. |
| Member | Read and edit every record. |
| Admin | Everything, plus delete records and set other people's access. |
| Blocked | Same as waiting — use this instead of deleting someone. |

You cannot change your own access from inside the app, so an admin can't accidentally
lock the board out of its own records.

## The screens

**Fee sheets** — pick a month, work across the three tabs, download the workbook.
The download rebuilds your exact layout: sheet names truncated the same way, the same
merged title rows, the same column widths, the same `SUM` formulas. "Carry forward last
month's names" copies the previous month's rows with amounts intact and the result column
cleared.

A sheet moves draft → finalised → submitted. Submitted sheets go read-only; reopening is
one click but the change is visible to everyone.

**Student register** — add someone once, then pull them onto any sheet.

**Tuesday cases** — grouped by sitting date, with a Word export of the minutes.

**Programmes** — set *Where it came from* to "Given by parent body" and the
permission-form column stops asking for a PRF.

**Permission forms** — every field from your template, with repeatable structure sections,
aims and budget lines. Lead time turns red inside 15 days, and marking a form "submitted"
inside that window asks you to confirm.

**Quarterly report** — disbursements by month and sheet, the case tally, and the
programme list, as a Word document.

## Still worth deciding

New rows on the Pak Progressive sheet default to `Paid`, matching your current file.
If that column is meant to track real payment status rather than describe the
disbursement, change the default in `addEntry()`.

Your September file has a stray `45800` in `F22`, below the totals row, which the `SUM`
in `E21` doesn't pick up. It isn't carried over. Tell me what it represents and I'll give
it a proper field.
