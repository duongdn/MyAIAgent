---
name: Storage monitoring must explain WHY and alert at 75%
description: Server monitor reports must explain storage causes (not just say "high"), trigger alert at 75% threshold
type: feedback
---

When server storage is high, don't just report "disk X% WARNING" — investigate and explain what's consuming space (e.g., old kernel headers, journal logs, npm cache, snap packages).

**Why:** User needs actionable info, not just a number. Saying "high" without explanation is useless.

**How to apply:**
- In every server monitor report, when disk >= 75%, SSH in and check top consumers (`du -sh` on /usr, /var, /home, /snap, journalctl --disk-usage)
- Include a breakdown table showing what's eating space and recommended cleanup actions
- 75% is the trigger threshold for storage alerts (not 80% or 85%)
- This applies to ALL servers in the report, not just ones explicitly asked about
