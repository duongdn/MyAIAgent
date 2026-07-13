---
name: feedback_workstream_config_not_gitignored
description: "🔴 SUPERSEDED 2026-07-13 by a structural fix — see feedback_new_config_file_gitignore_gap. .gitignore is now pattern-based (config/*.json auto-ignored), so the manual 'check before adding any new config/.* file' step below is no longer necessary. Kept as historical incident record. config/.workstream-config.json (live Keycloak bearer token) was missing from .gitignore and got committed/pushed to GitHub repeatedly — fixed 2026-06-19, check before adding any new config/.* file"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f3f109c8-a37f-4fea-b3a5-822c4dbc59c4
---

`config/.workstream-config.json` contains a live Keycloak Bearer access token (auto-refreshed by `workstream-login.js`) but was **never added to `.gitignore`** when Workstream integration was built. It got committed and pushed to `duongdn/MyAIAgent` on GitHub across multiple auto-commits (confirmed present since at least 2026-06-18, likely longer).

**Why this matters:** Violates the project's NON-NEGOTIABLE "never hardcode secrets" rule in CLAUDE.md. Every refresh of the token re-committed a new live credential to git history.

**Fixed 2026-06-19:** Added `config/.workstream-config.json` to `.gitignore`, ran `git rm --cached` to untrack it (file kept on disk), committed + pushed the fix. Token itself was NOT rotated — consider rotating since it was exposed in repo history (even if the repo is private).

**How to apply:**
1. Whenever a new `config/.*-config.json` file is created (new integration, new service), immediately verify it's listed in `.gitignore` — don't assume the pattern was followed.
2. Quick check command: `git check-ignore -v config/.foo-config.json` — exit code 1 = NOT ignored = leak risk.
3. Before any commit in this repo, glance at `git status --short` for any `config/.*.json` (non-`.enc`) file showing as modified/new — that's a red flag, those should never be tracked.
4. See [[reference_workstream]] for the Workstream integration this affected.
