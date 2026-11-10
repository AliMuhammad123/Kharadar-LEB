-- Korangi fee sheets: the extra columns its College fees, QES and QES list 2
-- sheets keep. Safe to run more than once. Paste into the Supabase SQL editor
-- and press Run.
alter table fee_entries
  add column if not exists dob            text,
  add column if not exists b_form         text,
  add column if not exists cnic           text,
  add column if not exists father_name    text,
  add column if not exists father_cnic    text,
  add column if not exists contact        text,
  add column if not exists prev_school    text,
  add column if not exists unit           text,
  add column if not exists tuition_fee    numeric,
  add column if not exists swb_assistance numeric,
  add column if not exists fee_dues       numeric;

notify pgrst, 'reload schema';
