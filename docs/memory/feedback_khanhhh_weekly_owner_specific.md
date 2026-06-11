---
name: feedback_khanhhh_weekly_owner_specific
description: Any dev weekly total must filter by owner col G across ALL sheets — never use project Summary tab total (gives all-dev sum, caused 80h bug)
metadata:
  type: feedback
---

Never use a project's Summary tab total as a single dev's weekly hours. The Summary tab includes ALL developers on the project — using it gave KhanhHH 80h which is physically impossible for one person.

**Why:** 2026-06-09 daily report showed KhanhHH 80h weekly. User: "totally wrong, how can a dev work more than 40h." Root cause: `getWeeklySummary()` returned full Generator project total, not owner-filtered.

**How to apply:**
- Any dev's weekly total = scan ALL rows in the week tab across **ALL** project sheets, filter by owner col G = dev name, sum hours
- Never hardcode which sheets a dev works on — devs move between projects freely
- See [[feedback_dev_project_mapping_flexible]] — complete sheet list to scan every run
