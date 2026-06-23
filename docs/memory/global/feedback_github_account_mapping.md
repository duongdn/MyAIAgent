---
name: GitHub account mapping for repo access
description: Must use correct GitHub account per repo — nuscarrick (default) cannot access Elena or Precognize repos
type: feedback
---

Never use default `gh` account (nuscarrick) for Elena or Precognize repos — it returns 404.

**Required account mapping:**
- `nustechnology/Elena-SamGuard-Digital-Plant` → `duongdn` account
- `Precognize/development` → `nusken` account
- Everything else → `nuscarrick` (default)

**How to use correct account in commands:**
```bash
GH_TOKEN=$(gh auth token -h github.com -u duongdn) gh api repos/nustechnology/Elena-SamGuard-Digital-Plant/...
GH_TOKEN=$(gh auth token -h github.com -u nusken) gh api repos/Precognize/development/...
```

**Why:** Refresh on Mar 23 used nuscarrick for all repos, got 404, incorrectly flagged as "auth expired". Wasted user's time investigating a non-issue.

**How to apply:** In daily report and refresh workflows, always set GH_TOKEN per repo before any GitHub API call. Never assume default account has access.
