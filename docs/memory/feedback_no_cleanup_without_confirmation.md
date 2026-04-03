---
name: Never run server cleanup without explicit confirmation
description: Investigate and report storage issues, but never execute cleanup/destructive commands on servers without user approval
type: feedback
---

When storage is high on servers, only investigate and report findings. Do NOT run cleanup commands (apt autoremove, rm -rf, journalctl --vacuum, npm cache clean, etc.) without explicit user confirmation.

**Why:** User wants to review findings before any destructive action is taken on production/dev servers. Running cleanup autonomously is risky.

**How to apply:**
- When disk >= 75%, SSH in and investigate (du, ls, journalctl --disk-usage)
- Present breakdown table + recommended actions with exact commands
- WAIT for user to say "yes" / "go ahead" / "run it" before executing any cleanup
- This applies to ALL servers, prod and dev alike
