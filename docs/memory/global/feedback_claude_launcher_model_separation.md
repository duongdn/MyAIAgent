---
name: feedback_claude_launcher_model_separation
description: Default `claude` = Claude subscription (sonnet); claude-nus/claude-duongdn (+ -prod) = intentional DeepSeek launchers, keep them, never merge into default claude.
metadata:
  type: feedback
---

**Why:** Default `claude` ended up running DeepSeek because a global `"model": "deepseek-v4-flash"` in `~/.claude/settings.json` plus the bashrc NUS-fallback wrapper (`claude()` / `_claude_use_nus`) forced the model. User wants default `claude` to stay pure Claude subscription (sonnet), DeepSeek only via explicit launchers.

**How to apply:**
- Default `claude` = Claude subscription (sonnet). If a session shows deepseek, check: (1) `model` key in `~/.claude/settings.json` (should be absent), (2) `ANTHROPIC_BASE_URL` / `ANTHROPIC_API_KEY` in shell env — `unset ANTHROPIC_BASE_URL ANTHROPIC_API_KEY` before running `claude`; fresh terminal is clean.
- DeepSeek launchers to keep intact: `~/.local/bin/claude-nus`, `claude-nus-prod` (NUS, env `~/.config/nus-llm/env`), `claude-duongdn`, `claude-duongdn-prod` (personal, env `~/.config/duongdn-llm/env`). They force `--model` + own env via `exec env -u ...` — never remove them, never fold their config into default `claude`.
- `~/.claude.json` `clientDataCacheSlots` model entries are harmless telemetry caches — do not edit.
- Cleanup backups from 2026-08-05: `~/.claude/settings.json.bak-260805`, `~/.bashrc.bak-260805`.
