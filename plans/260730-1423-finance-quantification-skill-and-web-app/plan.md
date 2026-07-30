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
| 03 | [Web app (Express + SSE)](phase-03-web-app.md) | 2h | pending | 02 |
| 04 | [Deploy to mpfc](phase-04-deploy-mpfc.md) | 1.5h | pending | 02, 03 |
| 05 | [Docs + dual memory](phase-05-docs-and-memory.md) | 0.5h | pending | 04 |

Phase 03 can be scaffolded in parallel with 02 (disjoint file ownership: 02 owns `scripts/**`,
`.claude/commands/me/**`, `config/**`, `.gitignore`; 03 owns `web-quantification/**` + `package.json`),
but its stream parser can only be tested against the real `PROGRESS:`/`DONE:`/`ERROR:` output once 02
lands — so 03 is listed as blocked by 02.

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
  account, locale `en_US`, one tab `Sheet1`, title `Định tính` — **left exactly as-is** (no rename, no
  `Sheet1` repurposing); runs only add/overwrite `Định lượng - <TICKER>` tabs.
- mpfc: port **3335 free** (3333/3334 taken), `certbot` apache authenticator proven (dailyagent cert
  renewed 2026-07-29), sudo NOPASSWD, `htpasswd` present, express+googleapis already resolvable in
  `/var/www/MyDailyAgent`.
- `quantification.youragentstore.net` is **Cloudflare-proxied** (104.21.23.236 / 172.67.214.40), zone
  NS = cloudflare, apex same IPs. HTTP :80 reaches the origin unmodified (current 301 is emitted by
  Apache's default vhost `admin.conf`, not Cloudflare) → ACME HTTP-01 will work.

## Locked decisions (2026-07-30)

- **One script is the product.** `scripts/finance-quantification-build.js` does all fetching, validating
  and sheet-writing. `/me:finance-quantification <TICKER>` shells out to it; the web app spawns it
  directly. Nothing calls the command programmatically, and no logic is duplicated.
- **No agent in the web path.** The web app does **not** run `claude -p` / `stream-json`. SSE events are
  parsed from the script's own `PROGRESS: n/5 …` / `WARN:` / `DONE: <url>` / `ERROR: <CODE> …` stdout
  lines. Runs take seconds, cost nothing, and have zero prompt-injection surface.
- **Free-form ticker**, gated only by `^[A-Z0-9]{3,10}$`. No watchlist allowlist; unknown tickers are
  fetched fresh.
- **Hands off the shared spreadsheet's shell.** Title and `Sheet1` untouched, forever.
- **Valuation:** annual P/E + P/B always; P/E TTM only when 4 consecutive quarters exist, else a `WARN:`
  and the row is omitted. Never interpolated.

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

None. All decisions are locked (see above and the "Decisions (locked)" section at the end of each phase
file). Ready for implementation.

One conditional stop remains, by design: if `certbot` demands an email address in phase 04 step 6, stop
and ask the user rather than inventing one.
