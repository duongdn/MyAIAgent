---
name: feedback_khanhhh_weekly_owner_specific
description: "Any dev weekly total must filter by owner col G — never use project Summary tab total (gives all-dev sum)"
metadata: 
  type: feedback
---

Never use a project's Summary tab total as a single dev's weekly hours. The Summary tab includes ALL developers on the project — using it gave KhanhHH 80h which is physically impossible for one person.

**Why:** 2026-06-09 daily report showed KhanhHH 80h weekly. User: "totally wrong, how can a dev work more than 40h." Root cause: `getWeeklySummary()` returned full Generator project total, not owner-filtered.

**How to apply:**
- Any dev's weekly total = scan ALL rows in the week tab across ALL project sheets they appear in, filter by owner col G = dev name, sum hours
- Use `getOwnerWeeklyTotal()` pattern from `scripts/daily-sheets-scan-260609-tue.js`
- Do NOT hardcode which sheets a dev works on — devs move between projects. Scan all known project sheets and filter by owner.
- [[feedback_dev_project_mapping_flexible]] — scan ALL sheets, aggregate by Owner col G
