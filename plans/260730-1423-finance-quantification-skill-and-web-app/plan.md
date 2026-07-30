---
title: "Standalone Định lượng skill + dedicated web UI on mpfc"
description: "Repeatable /me:finance-quantification <TICKER> skill writing to one shared spreadsheet, plus its own Express+SSE web app deployed at quantification.youragentstore.net"
status: pending
priority: P2
effort: 8.5h
branch: master
tags: [finance, skill, web, deployment, google-sheets, sse]
created: 2026-07-30
---

# Định lượng standalone skill + web UI

Decouple ratio analysis from the 6-sheet `/me:finance-report-detail` flow. One command, one shared
spreadsheet, one button on its own authenticated domain. Zero hand-typed market data.

## Phases

| # | Phase | Effort | Status | Blocked by |
|---|-------|--------|--------|-----------|
| 01 | [Research & design lock](phase-01-research-and-design-lock.md) | 1.5h | pending | — |
| 02 | [Skill + scripts](phase-02-skill-and-scripts.md) | 3h | pending | 01 |
| 03 | [Web app (Express + SSE)](phase-03-web-app.md) | 2h | pending | 01 (spec only) |
| 04 | [Deploy to mpfc](phase-04-deploy-mpfc.md) | 1.5h | pending | 02, 03 |
| 05 | [Docs + dual memory](phase-05-docs-and-memory.md) | 0.5h | pending | 04 |

Phase 03 may run in parallel with 02 (disjoint file ownership); its smoke test needs 02 merged.

## Verified facts driving the design

- Vietstock `getpricehistory` **already returns `ClosePrice` + `MarketCapital`** → shares outstanding
  = mcap/price, exact integers on FPT/VEA/SAB/VCB (diff 0.0000). Kills the hand-typed `MARKET` block
  at `scripts/finance-report-detail-build-dinh-luong.js:22-29`.
- P/E and P/B are **not fetched** — computed as sheet formulas from real EPS/BVPS rows. Never copied
  from a website's displayed number.
- Banks break the existing design: VCB's cafef CDKT template has 47 asset rows starting at code `110`
  and **no code `270`** (TỔNG CỘNG TÀI SẢN). Hardcoded row refs (`80/115/139/157`) must become
  code-resolved indices + hard abort for unsupported charts of accounts.
- `scripts/finance-report-detail-build-raw-sheet.js:84-92` **renames + wipes sheet[0]** when the target
  tab is missing → destructive in a shared spreadsheet. Must not be reused as-is.
- Target spreadsheet `1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo` is reachable by the service
  account, locale `en_US`, one tab `Sheet1`, title `Định tính` (to be renamed).
- mpfc: port **3335 free** (3333/3334 taken), `certbot` apache authenticator proven (dailyagent cert
  renewed 2026-07-29), sudo NOPASSWD, `htpasswd` present, `claude` 2.1.205 at `/usr/bin/claude`,
  express+googleapis already resolvable in `/var/www/MyDailyAgent`.
- `quantification.youragentstore.net` is **Cloudflare-proxied** (104.21.23.236 / 172.67.214.40), zone
  NS = cloudflare, apex same IPs. HTTP :80 reaches the origin unmodified (current 301 is emitted by
  Apache's default vhost `admin.conf`, not Cloudflare) → ACME HTTP-01 will work.

## Key dependencies

- Google service account `config/daily-agent-490610-7eb7985b33e3.json` (write scope) — present locally and on mpfc.
- cafef JSON API (`apiweb.cafef.vn`) + vietstock `finance.vietstock.vn/data/getpricehistory`.
- No new npm packages (shared `node_modules` with the live dailyagent app — hard constraint).

## Hard constraints

- Do not touch `web/`, `web/public/`, the `mydailyagent-web.service` unit, or `dailyagent*.conf`.
- Do not touch `watchlist[]` in `config/finance-watchlist.json` or any `finance-report-detail-*` script.
- Never fabricate a financial figure. Missing/contradictory source → abort + report (KHÔNG BỊA SỐ LIỆU).
- Secrets only via `config/.*.json` + `scripts/encrypt-secrets.sh`; never inline in code.

## Open questions

See end of each phase file; consolidated list in phase-01.
