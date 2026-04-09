# CLAUDE.md — My-AI-Agent Project

## Dual Memory System (MANDATORY)

This project has TWO memory locations. **ALWAYS save to BOTH** when creating or updating any feedback/memory:

1. **Claude memory:** `~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/` + update its `MEMORY.md`
2. **Project local memory:** `docs/memory/` + update its `MEMORY.md`

**NON-NEGOTIABLE. NO EXCEPTIONS.**

## Monitoring Rules (Critical)

- **Timeline update:** MUST update `config/.monitoring-timelines.json` at end of EVERY monitoring run (daily report, refresh, alert). Verify by reading back.
- **Discord tokens:** MUST verify with 3-step curl check (`/users/@me`, `/guilds`, `/channels`) before reporting any token issue. False 403 is a recurring problem.
- **Checklist item names:** NEVER interpret Trello checklist item text as status. Completion based ONLY on monitoring alerts found.
- **Project dev topics ≠ alerts:** Slack dev discussions (bugs, features) do NOT block Trello checklist completion. Only person-status issues (0h, absent, auth failure) block.
- **Matrix rooms:** If M_FORBIDDEN, try POST /join first. Public rooms don't need invites.
- **Upwork:** Must be included in daily report. Run `node scripts/upwork-weekly-hours.js`.
- **Fountain 5-part check:** MANDATORY in every daily report. Assign ONE dedicated agent. Validate ALL 5 parts exist before finalizing: (1) Matrix plan, (2) Task log actuals, (3) Plan vs Actual table, (4) Capacity & Runway, (5) Over-estimate tracking + Trello board. This has been missed multiple days — NEVER skip.
- **Discord:** Only monitor AirAgri + Bizurk. NOT HOMIEAPP.

## NEVER Hardcode Secrets (MANDATORY)

**NEVER put tokens, passwords, API keys, or any secrets directly in scripts or source code.**
GitHub Push Protection WILL block the push. A pre-commit hook (`.githooks/pre-commit`) also enforces this.

Always load from gitignored config files:
- Slack tokens/cookies: `config/.slack-accounts.json`
- Email passwords: `config/.email-accounts.json`
- Discord tokens: `config/.discord-accounts.json`
- Trello: `config/.trello-config.json`
- Other: see `config/` directory

**This rule has been violated multiple times. It is NON-NEGOTIABLE.**

## Key Config Files

- Monitoring timelines: `config/.monitoring-timelines.json` (NOT a secret, tracked in git)
- All other configs in `config/` are encrypted secrets
- Memory indexes: `docs/memory/MEMORY.md` (project) + Claude memory `MEMORY.md`
