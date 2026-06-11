---
name: feedback-matrix-daily-summary
description: Matrix daily report section format — stats + link + action items + key updates (NOT a 29-room table)
metadata:
  type: feedback
---

Matrix room scan in daily report uses this EXACT format. Confirmed from Jun 9 + Jun 10 reports. NEVER list all rooms in a table. NEVER dump raw messages.

**Why:** User corrected multiple times (very frustrated Jun 10 + Jun 11). Any deviation = wrong.

**Two-step process (BOTH steps are mandatory):**

**Step 1** — run `fetch-matrix-daily.js` → writes raw dump to `matrix-rooms-HHMM.md`
**Step 2** — Claude reads raw file and **OVERWRITES it** with per-room bullet summaries (2–5 bullets per active room). Do NOT leave the raw message dump in the file.

**Daily report section format:**
```
## Matrix — HH:MM (+07:00)

**Active rooms: X / Y | Messages: Z** *(since date HH:MM)*
Full details: reports/YYYY-MM-DD/matrix-rooms-HHMM.md

### ⚠️ Action items for DuongDN (N)

| Room | Time | Message |
|------|------|---------|
| Room name | HH:MM | person: "exact quote" — context ⚠️ |

### Key updates

**ProjectName — one-line summary**:
- bullet — what happened, who, outcome ✅/⚠️
```

Rules:
- Section header: `## Matrix — HH:MM (+07:00)` (confirmed from command)
- Stats line + link to full details file — do NOT inline all 29 rooms
- Action items table = exact quotes, rooms where DuongDN must act/respond
- Key updates = one bold header per project with bullets — NOT a room-by-room table
- matrix-rooms-HHMM.md must be rewritten as per-room summaries, never left as raw dump
