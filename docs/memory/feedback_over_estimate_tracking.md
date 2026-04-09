---
name: Track over-estimate tasks week-over-week for growth
description: When reporting over-estimate tasks, track if actual hours are still increasing — flag tasks that are over budget AND still accumulating hours
type: feedback
---

When reporting tasks that are over estimate, don't just show the current overage — also check if hours are **still growing** compared to previous report.
**Why:** User wants to catch tasks that are over budget AND still bleeding hours (e.g., 2595 at 168h vs 120h est — if next week it's 180h, that's a growing problem). A task that's over but stopped is less concerning than one still accumulating.
**How to apply:** Compare current week's actual hours with previous report. If actual increased since last check, flag as "OVER + STILL GROWING (+Xh this week)". Store previous actuals in the report or a tracking file to enable week-over-week comparison.
