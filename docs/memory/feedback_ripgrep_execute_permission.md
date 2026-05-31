---
name: ripgrep execute permission fix
description: Claude Code's bundled rg binary loses execute permission after npm update/reinstall, causing all .claude/commands/ skills to vanish with "Unknown skill" error
type: feedback
---

After any `npm install -g @anthropic-ai/claude-code` update, the bundled ripgrep binary loses its execute bit. Claude Code uses this binary to scan `.claude/commands/` directories for `.md` skill files — without it, ALL project skills return "Unknown skill" at runtime.

**Why:** npm reinstall strips the execute bit from vendored binaries on macOS.

**Fix:**
```bash
chmod +x /Users/duongdn/.nvm/versions/node/*/lib/node_modules/@anthropic-ai/claude-code/vendor/ripgrep/x64-darwin/rg
```

**How to apply:** A `SessionStart` hook in `.claude/settings.json` auto-runs this fix. If skills go missing after a Claude Code update, the next session restart will fix it. If the node version path changes (nvm upgrade), update the hook accordingly.
