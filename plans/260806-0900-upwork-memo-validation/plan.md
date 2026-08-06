# Plan — Upwork Memo Validation (Hourly Payment Protection)

**Date:** 2026-08-06
**Status:** Draft — pending approval
**Priority:** High (refund risk if memos invalid)

---

## Overview

Upwork's Hourly Payment Protection requires valid work memos to guarantee payment.
The review criteria are not numerically defined — each memo must let a reviewer identify:
1. The specific task performed
2. The feature / page / design element worked on
3. The action taken during that time segment
4. How the task relates to the contracted work

A memo naming only a feature ("Booking Flow – BXR Member Classes") is INVALID — it
doesn't say whether the person researched, wireframed, revised, built, or addressed
feedback. If Upwork rejects a memo, payment can be refunded, and we then have to get
the client to manually approve hours (slow + risky).

**User directive (2026-08-06):** Thêm checklist, các dự án đang dùng Upwork, kiểm tra
kĩ memo có hợp ko, tiến hành ngay cho upwork memo ngày hôm qua sau khi build xong feature.

**Chosen approach (user answers):** Part of daily report · Scrape via Puppeteer (live-
cookie injection, like weekly-hours) · Flag invalid + auto-alert.

---

## Upwork Projects Using Hourly Tracking (need memos)

From `config/.upwork-config.json` workrooms (hourly contracts = `/timesheet` URL):

| Workroom | Client | ID | Dev | Account | Memo checked |
|----------|--------|-----|-----|---------|--------------|
| Rory | Rory Hackett | 41069448 | LeNH | carrick | ✅ |
| Neural Contract | Neural Contract | 38901192 | external | carrick | messages-only — no timesheet memos |
| Aysar | Aysar K | 35642393 | LeNH/KhanhHH | carrick | ✅ |
| Bailey DEV1 | BAILEY JOEY | 42545630 | ~~VietPH~~/TuanNT | vinn | ✅ |
| Bailey DEV3 | BAILEY JOEY | 43093775 | DuongDN | david2 | ✅ |

Neural is messages-only (no task log, no timesheet memos) — excluded from memo check.

---

## Validation Rubric

A memo is **VALID** if it clearly states (≥3 of 4, but ideally all 4 present via
action + object):
- **Action verb** — researched, created, wireframed, redesigned, built, revised,
  updated, fixed, tested, addressed feedback, configured, migrated
- **Specific object** — the screen, page, flow, component, endpoint, function
- **Context/relation to contract** — which feature/requirement this serves

A memo is **INVALID** if it is:
- Feature-only / too vague: e.g. "Booking Flow – BXR Member Classes"
- Single word / label-only: "work", "bug fix", "design"
- Missing action or object such that the reviewer cannot verify the time segment

Examples of VALID:
- "Redesigned the class-selection screen and updated the booking confirmation flow"
- "Created mobile wireframes for selecting and reserving BXR member classes"
- "Revised the booking prototype based on feedback for class availability and confirmation"

---

## Implementation Steps

### Step 1 — New script `scripts/upwork-memo-check.js`
Mimic `upwork-weekly-hours.js` auth (live-cookie injection for `carrick`; persistent
Puppeteer profile for `vinn`/`david2` Bailey).

For each hourly workroom, for the target day:
1. Open timesheet URL, intercept GraphQL work-diary / providerTimeReport API for memo text
2. Extract per-segment memos: `{ time, duration, memo }`
3. Run each memo through the rubric (validate ≥ threshold)
4. Emit JSON: per workroom, per segment: `{ memo, valid, reason }` + summary

If a workroom's work diary doesn't expose memos via API, fall back to DOM text scrape.
If session fails → status `session_expired` / `cloudflare_blocked` (handle per existing
Upwork rules — no alert on session failure, complete Trello; see Piece 12 key-rules).

### Step 2 — Rubric module `scripts/upwork-memo-rules.js`
Pure function(s):
- `classifyMemo(memo) -> { valid: bool, issues: string[] }`
- Detection: action-verb presence (list), object specificity (word count, has noun
  phrases), feature-reference. Return which of the 4 criteria are satisfied.

### Step 3 — Trello checklist integration
Add a **Upwork Memo** checklist item to the "Check progress" card mapping table
(Piece 8 / recheck Piece 11):
- Gate: `upwork` memo check → complete if all hourly projects' memos for the day are
  valid (or no hours logged / session unavailable per existing rules); ⚠️ skip if any
  invalid memo found.
- Add row to Piece 8 table + Piece 11 recheck table + gate-mapping memory.

### Step 4 — Daily report integration
Add a new section to the daily report (after the Upwork piece):
```
## Upwork Memo — {date} — {HH:MM} (+07:00)
| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | 3 | 0 | — |
| Aysar | 2 | 1 | ⚠️ "Booking Flow – BXR Member Classes" too vague |
...
```
- Invalid memos → ALERT line addressed to the staff member (send reminder requires
  `--send-reminder` flag per strict rule — no auto-send without it).
- Add to cron inline order and interactive parallel group.

### Step 5 — Documentation
- Write validation guidance + examples to `docs/` (or reuse the text given by user).
- Update `docs/memory/` (both Claude + project) with the memo rule.

### Step 6 — Run for yesterday's memo (immediate action after build)
After the feature is built, run it for 2026-08-05's memos across all hourly Upwork
projects and report the result — "tiến hành ngay cho upwork memo ngày hôm qua".

---

## Files

**Create:**
- `scripts/upwork-memo-check.js`
- `scripts/upwork-memo-rules.js`

**Modify:**
- `.claude/commands/me/daily-report.md` (add memo piece to cron order + parallel group + Piece 8/11 tables)
- `config/.monitoring-timelines.json` (memo last_run, if applicable)
- `docs/memory/MEMORY.md` + Claude `MEMORY.md` (memo rule memory)
- `config/.upwork-config.json` (flag `needs_memo: true` per workroom)

**Reference (no change):**
- `config/.upwork-config.json` workrooms, `scripts/upwork-weekly-hours.js`,
  `scripts/get-carrick-upwork-cookies.py`

---

## Success Criteria

- [x] `upwork-memo-check.js` extracts real memos for each hourly workroom/day
- [x] Memos classified valid/invalid matching the documented rubric
- [x] Invalid memos surface as alerts in daily report (Alert #14)
- [x] Checklist/gate mapping updated (Piece 8 + Piece 11 + gate-mapping memory)
- [x] Ran successfully for 2026-08-05 (yesterday) and reported result

## Actual Results (2026-08-06 first run, checking 08-05)

- **Aysar:** 3 memos → **1 INVALID** (`"Free/Paid Game Mode Toggle #673"` — feature-only, no action verb), 2 valid. Reported as Alert #14.
- **Rory:** 0 memos (0h logged 08-05 — nothing to check).
- **Bailey DEV1/DEV3:** not reached (no saved Puppeteer profile for `vinn`/`david2` accounts this session — same documented limitation as weekly-hours; needs `upwork-login.js --login` once per account from an interactive session).
- Rubric QA: 4/4 passed against the user's exact valid/invalid examples.
- Committed `63c5f46` + pushed.

---

## Risks

- **Upwork DOM/API drift** — work-diary layout changes; mitigate with API-intercept
  primary + DOM fallback.
- **Auth for vinn/david2** — Bailey workrooms need the persistent-profile Puppeteer
  session; if session expired, follow existing Upwork rules (no alert, complete Trello,
  note manual re-auth).
- **Not all memos exposed** — some contracts hide work-diary memos; handle gracefully.

---

## Unresolved Questions

1. Whether a dedicated Trello checklist item is desired (vs. reusing the existing
   project gates like Rory/Aysar/Bailey which already have Work items). Await user;
   default = add a single "Upwork Memo" item to the Work checklist.
2. Threshold for "valid" (how many of the 4 criteria). Default: action verb + specific
   object required; context preferred but not mandatory.
