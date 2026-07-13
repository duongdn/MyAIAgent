---
name: ripgrep_execute_permission_fix
description: "macOS only: Claude Code's bundled rg binary loses execute permission after npm update/reinstall, causing all .claude/commands/ skills to vanish with Unknown skill error"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

After any `npm install -g @anthropic-ai/claude-code` update **on macOS**, the bundled ripgrep binary loses its execute bit. Claude Code uses this binary to scan `.claude/commands/` directories for `.md` skill files — without it, ALL project skills return "Unknown skill" at runtime.

**Why:** npm reinstall strips the execute bit from vendored binaries on macOS.

**Fix (macOS path):**
```bash
chmod +x /Users/duongdn/.nvm/versions/node/*/lib/node_modules/@anthropic-ai/claude-code/vendor/ripgrep/x64-darwin/rg
```

**How to apply:** The `SessionStart` hook in this project's `.claude/settings.json` auto-runs this fix, but it is **hardcoded to the macOS path above** — on a Linux machine (e.g. `/home/nus/...`) the `find` matches nothing and the hook is a silent no-op. If skills go missing on Linux with "Unknown skill", check `rg` execute bit manually (`which rg`, or the bundled vendor path under the npm global install) — the hook will not auto-fix it there until made cross-platform. If the node version path changes (nvm upgrade) on macOS, update the hook accordingly.
