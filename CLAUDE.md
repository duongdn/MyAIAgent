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

## Key Config Files

- Monitoring timelines: `config/.monitoring-timelines.json` (NOT a secret, tracked in git)
- All other configs in `config/` are encrypted secrets
- Memory indexes: `docs/memory/MEMORY.md` (project) + Claude memory `MEMORY.md`
