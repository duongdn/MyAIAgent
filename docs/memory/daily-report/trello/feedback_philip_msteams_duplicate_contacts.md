---
name: feedback_philip_msteams_duplicate_contacts
description: MS Teams search for "Philip Briggs" returns 8 duplicate contacts, script clicks wrong one
metadata:
  type: feedback
---

`node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` search returns 8 duplicate "Philip Briggs" contact entries. Only one is correct: **"Philip Briggs (External) — Six Star Rentals"**. The script's generic `[aria-label*="Philip Briggs"]` click grabs the first match, which is usually a wrong/stale duplicate contact, not the real customer thread — resulting screenshot shows the search-results panel, not the actual chat.

**Why:** confirmed 2026-07-03 — script reported "Messages found: 1" but the screenshot was still the People-search list, not an opened thread.

**How to apply:** when verifying Philip via screenshot, look for the "(External) Six Star Rentals" label specifically, not just any "Philip Briggs" match. If the script can't be made to target that one reliably, treat MS Teams Philip as unverified for that run (leave Trello item incomplete) rather than trusting the wrong-contact screenshot. Fixing the script to filter by the "(External)" badge would resolve this long-term.

**🔴 FIXED PERMANENTLY 2026-07-14 — no longer a per-run manual workaround.** `scripts/fetch-msteams-customer-messages.js` now disambiguates automatically: `searchAndExtractMessages()` takes a `disambiguateHint` param, and the click logic prefers any search-result element whose text contains "External" or the hint. The hint is read from `config/.msteams-accounts.json` → new `customerHints` map (`{"Philip Briggs": "Six Star Rentals"}`) — no env var or manual flag needed on future runs, it Just Works. Verified: re-ran the script with no special args, landed on the correct contact (header confirmed `pbriggs@sixstarrentals.com.au`), extracted 55 real messages. **If a NEW customer ever hits this same duplicate-contact ambiguity, add their name → a distinguishing hint (company name, or any unique substring in their real contact card) to `customerHints` in the config — don't re-diagnose from scratch.**

**🔴🔴 REGRESSED 2026-08-13** — the "permanent" fix isn't actually permanent: `config/.msteams-accounts.json` was found with the `customerHints` key entirely missing (only `accounts.will` present), silently reverting to the old wrong-contact-click bug (script picked a stale duplicate, "Messages found: 1" with placeholder text, not a real thread). Root cause of the drop itself wasn't identified (possibly a manual edit or a script that regenerates this file without preserving extra keys) — but the fix is a **one-line config re-add**, not a script rewrite: `{"customerHints": {"Philip Briggs": "Six Star Rentals"}}`, then `bash scripts/encrypt-secrets.sh config/.msteams-accounts.json` to persist it past the next decrypt. **Any time Philip's MS Teams check lands on the wrong contact again, check this key exists before re-diagnosing the click logic.**
