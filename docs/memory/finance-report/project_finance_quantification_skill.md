---
name: project_finance_quantification_skill
description: /me:finance-quantification skill + web app — standalone ratio analysis to shared spreadsheet, built 2026-07-30
metadata:
  type: project
---

New skill `/me:finance-quantification <TICKER>` (2026-07-30): fetches BCTC from cafef.vn API + live price/market-cap from vietstock.vn, writes a self-contained `Định lượng - <TICKER>` tab to shared spreadsheet `1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo` (currently titled "Định tính" — intentionally left as-is). All ratio formulas reference same-sheet cells via code-resolved row indices (not hardcoded row numbers). Banks and securities explicitly unsupported (different chart of accounts).

**Key files:**
- Core script: `scripts/finance-quantification-build.js`
- Skill command: `.claude/commands/me/finance-quantification.md`
- Web app: `web-quantification/server.js` (port 3335) + `web-quantification/public/index.html`
- Config: `config/finance-quantification.json` (tracked, non-secret — gitignored but allowlisted)

**Deployment:** Deployed to mpfc server as a separate systemd service (`quantification-web`) proxied by Apache2 at `quantification.youragentstore.net` with Let's Encrypt SSL + Basic Auth (separate htpasswd file: `/etc/apache2/.htpasswd-quantification`). No Claude agent in the web path — spawns the script directly. See [[project_mpfc_cron_server]] for server context.

**Why:** Decoupled from the full 6-sheet `/me:finance-report-detail` workflow. User can quickly add a ratio-analysis tab for any ticker without going through the full report build.

**How to apply:** Invoke `/me:finance-quantification FPT` from CLI, or POST to `https://quantification.youragentstore.net/api/run` with Basic Auth. Script emits structured PROGRESS/DONE/ERROR lines on stdout (6-step progress, code-resolved row map, abort on unsupported charts-of-accounts or balance mismatch).

**Configuration:** 
- Shared spreadsheet ID in `config/finance-quantification.json`
- `.gitignore` has `!config/finance-quantification.json` allowlist — file reaches mpfc via `git pull`
- Basic auth creds in `config/.quantification-auth.json` (encrypted, NOT in git)
- Service account key: `config/daily-agent-490610-7eb7985b33e3.json`
