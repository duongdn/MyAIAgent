---
name: feedback-matrix-daily-summary
description: Matrix daily report section format — stats + link + action items + key updates (NOT a 29-room table)
metadata:
  type: feedback
---

Matrix room scan in daily report uses this EXACT format. Confirmed from Jun 9 + Jun 10 reports. NEVER list all rooms in a table. NEVER dump raw messages.

**Why:** User corrected multiple times (very frustrated Jun 10). Any deviation = wrong.

**How to apply:**

```
## Matrix rooms — HH:MM (+07:00)

**Active rooms: X / Y | Messages: Z**
Full details: `reports/YYYY-MM-DD/matrix-rooms-HHMM.md`

### ⚠️ Action items for DuongDN (N)

| Room | Time | Message |
|------|------|---------|
| Room name | HH:MM | person: "quote" → action taken / needed |

### Key updates

**🚨 Most important thing** (timestamp):
- bullet points

**Other important room** (timestamp):
- bullet points
```

Rules:
- Stats line + link to full details file — do NOT inline all 29 rooms
- Action items table = only rooms where DuongDN must act/respond
- Key updates = 4–6 most important rooms only, bullet format
- Section header: `## Matrix rooms — HH:MM (+07:00)` (NOT `## Matrix —`)
