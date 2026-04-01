---
name: Trello progress must reuse existing daily-report pieces
description: /daily-report trello progress X should run the mapped source piece (e.g. /daily-report slack xtreme) instead of duplicating logic
type: feedback
---

When running `/daily-report trello progress {item}`, do NOT duplicate the monitoring logic. Instead, run the existing daily-report piece for the mapped source.

**Why:** User corrected — duplicating Slack search logic in the Trello command creates inconsistency and misses rules embedded in the piece (e.g. search terms, session token handling, timestamp updates).

**How to apply:**
- Map each Trello progress item to its source piece(s)
- Run that piece first (e.g. `/daily-report slack xtreme` for Maddy)
- Use the piece's findings to decide complete/skip
- The piece handles its own timestamp updates
- Then update Trello item based on findings
- This applies to ALL trello progress items, not just Maddy

**Examples:**
- `trello progress maddy` → run `/daily-report slack xtreme` first
- `trello progress bailey` → run `/daily-report slack ggs` first  
- `trello progress elliott` → run `/daily-report slack generator` first
- `trello progress elena` → run `/daily-report slack samguard` first
