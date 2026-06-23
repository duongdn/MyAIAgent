---
name: feedback-scrin-consolidated
description: Scrin.io tracks Nick (nick@nustechnology.com) not TuanNT — never attribute hours; scrin-fetch-yesterday.js on Monday returns Sunday not Friday
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Wrong attribution:** Scrin.io company 266977 / employee 453601 tracks **Nick** (nick@nustechnology.com) at the John Yi company — NOT TuanNT. Never use Scrin data as evidence of TuanNT's hours; label the section "Nick at John Yi". TuanNT's 0h task-log issues are independent, checked via Google Sheets only — don't dismiss TuanNT 0h because Scrin shows Nick's activity. *Corrected 2026-06-09.*

**Monday date bug:** `scripts/scrin-fetch-yesterday.js` hardcodes `isYesterday:true`. Run Tue→returns Mon (correct). Run **Mon→returns Sunday** (weekend, ~0h), NOT Friday. Run Sat→returns Fri. On Monday reports, do NOT compare this output against Friday's sheet data — caused a false "Fri 6h vs Scrin 1h23m over-inflated" alert that wrongly skipped a Trello item. *Corrected 2026-05-12.*

**How to apply:**
- Tue-Fri cadence: `isYesterday:true` is valid as-is.
- Mon mornings: either skip Scrin entirely (note "Fri data not retrieved — script limitation") or recheck Saturday for Friday data.
- To fetch a specific date, extend the script to pass explicit `From`/`To` ISO fields to Scrin's `GetReport` API instead of `isYesterday`.
