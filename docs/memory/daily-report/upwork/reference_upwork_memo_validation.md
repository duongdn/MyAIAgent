---
name: reference_upwork_memo_validation
description: "Upwork Hourly Payment Protection — work memos must be detailed enough to verify. Rubric, script, and Trello gate for memo validation (Piece 15)."
metadata:
  type: reference
---

# Upwork Memo Validation — Hourly Payment Protection

Upwork's Hourly Payment Protection requires work memos that let a reviewer verify the work. There is **no numeric activity metric** — each memo must identify:
1. The specific task performed
2. The feature / page / design element worked on
3. The action taken during that time segment
4. How the task relates to the contracted work

If Upwork judges a memo invalid, payment can be refunded → we then must get the client to manually approve hours (slow + risky).

## What makes a memo INVALID

- **Feature-only / label:** names a section but not the work done — e.g. `"Booking Flow – BXR Member Classes"` (doesn't say whether researched, wireframed, revised, built, or addressed feedback)
- Single word / placeholder: `"work"`, `"bug fix"`, `"done"`, `"n/a"`
- Too vague to verify the time segment

## What makes a memo VALID

Action verb + specific object + context. Examples (from user, 2026-08-06):
- `"Redesigned the class-selection screen and updated the booking confirmation flow"`
- `"Created mobile wireframes for selecting and reserving BXR member classes"`
- `"Revised the booking prototype based on feedback for class availability and confirmation"`

## Script

```bash
node scripts/upwork-memo-check.js [--date=YYYY-MM-DD] [--workroom=NAME]
node scripts/upwork-memo-rules.js "memo text"   # classify a single memo
```

- `upwork-memo-check.js` opens each hourly workroom timesheet for the day, intercepts GraphQL work-diary memos (DOM fallback), classifies each via `upwork-memo-rules.js`.
- Auth: live-cookie injection for carrick (Rory/Aysar). venv python3's `browser_cookie3` can be broken (`lz4._version`) — script falls back to system python3. (Bailey vinn/david2 accounts removed 2026-08-10 — no longer checked.)
- **NEVER** Puppeteer credential login first (Upwork fraud-engine soft-reject).

## Workrooms checked (hourly = need memos)

| Workroom | Dev | needs_memo |
|----------|-----|-----------|
| Rory | LeNH | ✅ |
| Aysar | LeNH/KhanhHH | ✅ |
| ~~Bailey-VietPH~~ | — | **REMOVED 2026-08-10** (vinn account gone) |
| ~~Bailey-DuongDN~~ | — | **REMOVED 2026-08-10** (david2 account gone) |
| Neural Contract | external | ⬜ messages-only, no memos |

## Trello gate

- Any **invalid memo** across hourly workrooms → ⚠️ skip the Upwork Memo checklist item (alert addressed to that workroom's developer).
- Session failure / Cloudflare → NOT a memo status: complete the item per existing Upwork session rules (no alert, note manual re-auth).
- Existing project gates (Rory/Aysar/Bailey) unchanged — memo validity is reported (Piece 15) but does not alter their Slack/hour gates unless user says otherwise.

## First live result (2026-08-06, checking 08-05)

- Aysar: 3 memos — **1 INVALID** (`"Free/Paid Game Mode Toggle #673"` — feature-only, no action), 2 valid.
- Rory: 0 memos (no segments / 0h that day). (Bailey no longer checked — vinn/david2 accounts removed 2026-08-10.)
