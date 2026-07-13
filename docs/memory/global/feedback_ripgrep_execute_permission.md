---
name: ripgrep_execute_permission_fix
description: Claude Code's bundled rg binary loses execute permission after npm update/reinstall (seen on macOS), causing all .claude/commands/ skills to vanish with Unknown skill error
metadata:
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

After any `npm install -g @anthropic-ai/claude-code` update, the bundled ripgrep binary can lose its execute bit (observed on macOS). Claude Code uses this binary to scan `.claude/commands/` directories for `.md` skill files — without it, ALL project skills return "Unknown skill" at runtime.

**Why:** npm reinstall strips the execute bit from vendored binaries.

**Fix (cross-platform, resolves the npm global root dynamically instead of hardcoding a user/OS path):**
```bash
find "$(npm root -g 2>/dev/null)"/@anthropic-ai/claude-code/vendor/ripgrep/*/rg -not -executable 2>/dev/null | xargs -r chmod +x
```

**How to apply:** The `SessionStart` hook in this project's `.claude/settings.json` auto-runs this fix on every session start, on any machine (Mac or Linux, any nvm/node version) — no per-machine editing needed. Prior version was hardcoded to `/Users/duongdn/.nvm/.../x64-darwin/rg` and was a silent no-op on Linux; fixed 2026-07-13 since this app runs on multiple machines.
