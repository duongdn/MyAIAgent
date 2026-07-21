---
name: feedback_davidztv_github_always_configured
description: davidztv GitHub account is configured in gh CLI — always check it before reporting unavailable
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 19379dbd-2cde-48be-8f3e-3148e41aa1b9
  modified: 2026-07-21T01:29:56.780Z
---

Multiple consecutive daily reports (07-15, 07-17, 07-21 morning) claimed "davidztv account not configured anywhere in this environment" for the Arthur/Meta-Stamp GitHub check. On recheck at 07-21 08:00, `gh auth status` showed davidztv **was** present in `~/.config/gh/hosts.yml`, just not the active account. `GH_TOKEN=$(gh auth token -h github.com -u davidztv)` works fine and can access `Christebob/Meta_Stamp_V3` (private).

**Why:** The earlier diagnosis jumped from "gh auth status didn't mention it" to "it doesn't exist" without checking `~/.config/gh/hosts.yml` or trying `gh auth token -u davidztv`.

**How to apply:**
- If you need a GitHub account that isn't the current `gh` active, do `gh auth token -h github.com -u <account>` — don't conclude it doesn't exist
- Check `~/.config/gh/hosts.yml` for all registered accounts before claiming "not configured"
- This has been wrong 3 times in a row (07-15, 07-17, 07-21) — don't repeat
