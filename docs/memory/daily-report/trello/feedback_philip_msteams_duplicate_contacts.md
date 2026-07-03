---
name: feedback_philip_msteams_duplicate_contacts
description: MS Teams search for "Philip Briggs" returns 8 duplicate contacts, script clicks wrong one
metadata:
  type: feedback
---

`node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` search returns 8 duplicate "Philip Briggs" contact entries. Only one is correct: **"Philip Briggs (External) — Six Star Rentals"**. The script's generic `[aria-label*="Philip Briggs"]` click grabs the first match, which is usually a wrong/stale duplicate contact, not the real customer thread — resulting screenshot shows the search-results panel, not the actual chat.

**Why:** confirmed 2026-07-03 — script reported "Messages found: 1" but the screenshot was still the People-search list, not an opened thread.

**How to apply:** when verifying Philip via screenshot, look for the "(External) Six Star Rentals" label specifically, not just any "Philip Briggs" match. If the script can't be made to target that one reliably, treat MS Teams Philip as unverified for that run (leave Trello item incomplete) rather than trusting the wrong-contact screenshot. Fixing the script to filter by the "(External)" badge would resolve this long-term.
