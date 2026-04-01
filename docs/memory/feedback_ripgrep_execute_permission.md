---
name: ripgrep execute permission fix
description: Claude Code's bundled rg binary loses execute permission after npm update/reinstall, causing all .claude/commands/ skills to silently vanish with "Unknown skill" error
type: feedback
---

After any `npm install -g @anthropic-ai/claude-code` update, the bundled ripgrep binary loses its execute bit. Claude Code uses this binary to scan `.claude/commands/` directories for `.md` skill files — without it, ALL project skills return "Unknown skill" at runtime.

**Why:** npm reinstall strips the execute bit from vendored binaries on macOS.

**Fix:**
```bash
chmod +x /Users/duongdn/.nvm/versions/node/v22.15.0/lib/node_modules/@anthropic-ai/claude-code/vendor/ripgrep/x64-darwin/rg
```

Note: the node version in the path may change after nvm upgrades — adjust accordingly.

**How to apply:** A startup hook runs this automatically. If skills go missing again after a Claude Code update, check if the node version path changed and update the hook/settings.json accordingly.
