---
name: feedback_elena_report_detailed_for_general_reviewer
description: Elena PR review report must explain each PR/issue in detail in Vietnamese (what/why/fix) for a general reviewer; chat = path + short summary only
metadata:
  type: feedback
---

2026-10-07: the user said "don't bother with the extraneous stuff, focus on the skill, write it clearly in the report file and I'll read it. Explain in more detail, I'm a general reviewer and can't follow from just a few lines."

**Why:** DuongDN reviews across BE, FE and spec without deep knowledge of each module. Terse findings (e.g. "cap 0 ambiguity") don't let him act on them.

**How to apply:** in `/me:elena-monitor`, write the report in Vietnamese. For each PR, explain what it does in business terms. For each issue, give Problem → Why it matters (a concrete scenario) → How to fix → Severity. The chat reply is only the report path plus 2–3 lines. Drop side questions and process proposals. Format is in the "Report Format" section of `.claude/commands/me/elena-monitor.md`. Related: [[project_elena_op_restart_duongdn_code_reviewer]].
