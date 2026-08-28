---
name: reference_fpts_vcbs_broker_portfolio_scripts
description: FPTS EzTrade portfolio auto-fetch is live (scripts/fpts-portfolio-report.js); VCBS still pending — where to find the scripts and the key gotchas
metadata: 
  node_type: memory
  type: reference
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T03:46:00.746Z
---

FPTS stock holdings are fetched automatically via `scripts/fpts-portfolio-report.js` (headless, persistent Chrome profile `tmp/fpts-chrome-profile/`). Credentials auto-fill from `config/.broker-accounts.json` (`.fpts.accountNumber`/`.fpts.password`, encrypted `.enc` via `scripts/lib/save-secret-config.js` — never hardcode). OTP still needs the user manually on first login or session expiry (run with `--headed`); headless works fine afterward since the session cookie persists.

Data source is `https://eztrade.fpts.com.vn/report/AssetReport2` — a server-rendered HTML page, not a JSON API (confirmed via extensive WebSocket/HTTP capture — EZTrade's only realtime channel is market-wide ticker data via SignalR, irrelevant to personal holdings). The script scrapes the DOM table.

VCBS equivalent not yet built — same discovery approach needed (`scripts/broker-portfolio-discover.js vcbs`).

Full details, known gotchas (colspan column-collapse in the FPTS table, discovery-tool usage, auth persistence caveats) are in `.claude/commands/me/money-report.md` under "Piece 8 — Broker Portfolios" — read that before touching these scripts.
