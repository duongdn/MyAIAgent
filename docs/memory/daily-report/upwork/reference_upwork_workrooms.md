---
name: upwork-workroom-tracking-setup
description: "Upwork account, workroom URLs, and scripts for weekly hour comparison with task logs"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

## Account
- carrick@nustechnology.com (config: `.upwork-config.json`)
- ~~Browser profile saved at `tmp/upwork-profile-carrick/`~~ — that Puppeteer-managed profile dir was deleted 2026-07-21 and is no longer used for Neural Contract (see below). Still used by `upwork-login.js`/`upwork-weekly-hours.js` for Rory/Aysar/Bailey, which remains the fragile Puppeteer-login pattern — if it starts hitting Upwork's "technical difficulties" soft-block (see [[feedback_neural_consolidated]] PERMANENT FIX section), the fix is the same: extract cookies from a real, already-logged-in Chrome profile instead of driving a login.

## Workrooms
| Project | Client | Workroom ID | Developer | Note |
|---------|--------|-------------|-----------|------|
| Rory | Rory Hackett | 41069448 | LeNH | — |
| Neural Contract | Neural Contract | 38901192 | external | Messages only, no task log. **Auth fixed 2026-07-21** — uses `scripts/upwork-neural-check.js` (real-session cookie injection), NOT `upwork-login.js`. See [[feedback_neural_consolidated]]. |
| Aysar | Aysar K | 35642393 | LeNH (tracker) / KhanhHH (actual work) | Active. Sub-contract pattern — KhanhHH does the work, LeNH's Upwork tracker bills it. See `feedback_khanhhh_aysar_consolidated.md`. |
| Bailey DEV1 | BAILEY JOEY | 42545630 | ~~VietPH~~ — resigned 2026-06-30, TuanNT covers Bailey generally now (see [[project_php_team]]); this specific workroom's reassignment not re-verified live | Account: vinn |
| Bailey DEV3 | BAILEY JOEY | 43093775 | DuongDN | Account: david2 |

## Scripts
- `scripts/upwork-login.js --login` — First-time Puppeteer login (visible browser) — used for Rory/Aysar/Bailey workrooms only. Do NOT use for Neural.
- `scripts/upwork-weekly-hours.js` — Fetch weekly hours from Rory/Aysar/Bailey workrooms (not Neural — that's messages-only, see `upwork-neural-check.js`)
- `scripts/upwork-neural-check.js` — Neural Contract messages, via real-session cookie injection (see [[feedback_neural_consolidated]])
- `scripts/get-carrick-upwork-cookies.py` — extracts fresh Upwork cookies from carrick's real Chrome Profile 1 (used by `upwork-neural-check.js`)

## Weekly Report Comparison
- Upwork hours = total tracked time (official + part-time from task log)
- Task log: sum ALL rows for employee (both "Task dự án" + "Part-time" in col A)
- Upwork week = Mon-Sun; task log = Mon-Fri
- Flag discrepancies > 1h between Upwork and task log
