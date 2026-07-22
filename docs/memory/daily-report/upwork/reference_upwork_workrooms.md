---
name: upwork-workroom-tracking-setup
description: "Upwork account, workroom URLs, and scripts for weekly hour comparison with task logs. 2026-07-22: live-cookie-injection fix (from Neural) now also applied to Rory/Aysar in upwork-weekly-hours.js — don't leave a documented 'same fix applies elsewhere' note unpropagated."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

## Account
- carrick@nustechnology.com (config: `.upwork-config.json`)
- ~~Browser profile saved at `tmp/upwork-profile-carrick/`~~ — deleted 2026-07-21, no longer used for ANY carrick workroom (Neural, Rory, Aysar).

🔴 **FIXED PROPERLY 2026-07-22 — the "same fix applies" note below used to be just a suggestion; it is now actually wired into the script, not dead advice.** On 2026-07-22, a daily-report recheck found Rory/Aysar STILL reported "session expired, needs human CAPTCHA login" despite the 2026-07-21 Neural fix — user reaction: "lại lock Upwork, hôm qua mới nói có fix hết rồi mà, check lại memory coi" (locked again, said it was all fixed yesterday, check memory). Root cause: the 2026-07-21 fix only touched `upwork-neural-check.js`; nobody propagated it into `upwork-weekly-hours.js` (used for Rory/Aysar/Bailey), which still had the old broken `injectStoredCookies()` (stale config snapshot) → `headlessLogin()` (Puppeteer credential login, soft-rejected by Upwork's fraud engine every time) fallback chain — PLUS a separate bug where the top-level per-account loop `continue`'d past carrick entirely if `tmp/upwork-profile-carrick` didn't exist, before any recovery step could run. **Both fixed:** `upwork-weekly-hours.js` now has its own `extractLiveCookies()`/`injectLiveCookies()` (same pattern as `upwork-neural-check.js`) as the FIRST recovery step for the `carrick` account, and the profile-dir gate only skips non-carrick accounts. Verified live: Rory 0:00, Aysar 1:30 (cross-validated against Workstream's own Baamboozle 1.5h figure for the same day).

**Lesson for next time a "the fix is X, apply it if this happens elsewhere" note is written:** if a fix is documented as generalizable to sibling scripts/workrooms sharing the same underlying account/auth mechanism, go verify each sibling actually got the fix applied — don't leave it as a note to rediscover only when the user complains it "locked again."

## Workrooms
| Project | Client | Workroom ID | Developer | Note |
|---------|--------|-------------|-----------|------|
| Rory | Rory Hackett | 41069448 | LeNH | — |
| Neural Contract | Neural Contract | 38901192 | external | Messages only, no task log. **Auth fixed 2026-07-21** — uses `scripts/upwork-neural-check.js` (real-session cookie injection), NOT `upwork-login.js`. See [[feedback_neural_consolidated]]. |
| Aysar | Aysar K | 35642393 | LeNH (tracker) / KhanhHH (actual work) | Active. Sub-contract pattern — KhanhHH does the work, LeNH's Upwork tracker bills it. See `feedback_khanhhh_aysar_consolidated.md`. |
| Bailey DEV1 | BAILEY JOEY | 42545630 | ~~VietPH~~ — resigned 2026-06-30, TuanNT covers Bailey generally now (see [[project_php_team]]); this specific workroom's reassignment not re-verified live | Account: vinn |
| Bailey DEV3 | BAILEY JOEY | 43093775 | DuongDN | Account: david2 |

## Scripts
- `scripts/upwork-login.js --login` — First-time Puppeteer login (visible browser). Since 2026-07-22, needed ONLY for Bailey DEV1/DEV3 (vinn/david2 accounts) — carrick (Rory/Aysar/Neural) never needs this anymore, all live-cookie-injected.
- `scripts/upwork-weekly-hours.js` — Fetch weekly hours from Rory/Aysar/Bailey workrooms (not Neural — that's messages-only, see `upwork-neural-check.js`). For the `carrick` account (Rory/Aysar) it now injects live cookies first (2026-07-22 fix, see Account section above); vinn/david2 (Bailey) still use the old persistent-profile Puppeteer session.
- `scripts/upwork-neural-check.js` — Neural Contract messages, via real-session cookie injection (see [[feedback_neural_consolidated]])
- `scripts/get-carrick-upwork-cookies.py` — extracts fresh Upwork cookies from carrick's real Chrome Profile 1 (used by both `upwork-neural-check.js` and, since 2026-07-22, `upwork-weekly-hours.js` for the carrick account)

## Weekly Report Comparison
- Upwork hours = total tracked time (official + part-time from task log)
- Task log: sum ALL rows for employee (both "Task dự án" + "Part-time" in col A)
- Upwork week = Mon-Sun; task log = Mon-Fri
- Flag discrepancies > 1h between Upwork and task log
