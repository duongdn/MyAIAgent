---
name: Never hardcode secrets in scripts
description: GitHub Push Protection blocks pushes with hardcoded tokens/passwords — always load from gitignored config files
type: feedback
---

NEVER hardcode API tokens, passwords, or secrets directly in Python scripts. GitHub Push Protection will block the push.

**Why:** This has happened multiple times — scripts like slack-scan.py and check-emails.py were created with hardcoded Slack xoxp/xoxc tokens and email passwords, causing `GH013: Repository rule violations` on push. Fixing requires rewriting git history (soft reset + recommit), which is disruptive.

**How to apply:** Always load secrets from the existing gitignored config files:
- Slack tokens/cookies: `config/.slack-accounts.json` (key: `token`, `cookie`, workspace by `workspace` field)
- Email passwords: `config/.email-accounts.json` (key: `app_password`, account by `email` field)
- Other configs: `config/.discord-accounts.json`, `config/.trello-config.json`, etc.

Pattern: `Path(__file__).resolve().parent.parent / "config" / ".slack-accounts.json"`
