# Phase 02 — Skill command + supporting scripts

## Context Links

- Frozen data contract: [phase-01](phase-01-research-and-design-lock.md) → `reports/research-data-sources.md`
- Command-file convention: `.claude/commands/me/finance-report-detail.md` (frontmatter `description:` only)
- Command discovery: `web/server.js:65-103` (`scanSkills()` maps every `.claude/commands/me/*.md` → `me:<slug>`)
- Patterns to copy: `scripts/finance-report-detail-fetch-cafef.js`, `scripts/finance-report-detail-fetch-liquidity.js`,
  `scripts/finance-report-detail-build-raw-sheet.js:40-73`, `scripts/finance-report-detail-build-dinh-luong.js:58-109`
- Secret/config conventions: `.gitignore:11-18`, `scripts/encrypt-secrets.sh`, `scripts/lib/save-secret-config.js`

## Overview

- **Priority:** P1
- **Status:** pending
- **Effort:** 3h
- Build the deterministic core (fetch → validate → write one tab) plus the thin `/me:finance-quantification`
  command that wraps it and owns the judgment/QA layer.

## Key Insights

- The command must be **one flat file** `.claude/commands/me/finance-quantification.md`. `scanSkills()`
  (`web/server.js:65-84`) enumerates files, so a subcommand syntax like `finance-report quantification`
  is undiscoverable. The new file auto-appears in the existing dashboard as `me:finance-quantification`
  — a side effect, not a change to `web/`.
- The old builder hardcodes `A1:K202`, `A204`, and B..K columns
  (`finance-report-detail-build-dinh-luong.js:35,38,113`). All three must become computed.
- Ratio block stays **100% formula-driven** referencing rows in the same tab — no computed numbers
  written as literals, so a reader can audit every figure back to a raw BCTC row.
- Live market values are the only literals; each gets its own labelled cell + source/date note, and
  `sharesOutstanding` is written as a formula `=mcapCell/priceCell` so the derivation is visible.
- `addSheet` only. Never the rename-first-sheet path of
  `finance-report-detail-build-raw-sheet.js:84-92`.
- Overwrite of an existing tab is expected (rebuild), but `values.clear` must be scoped to the tab's
  own range and must never touch other tabs.

## Requirements

### Functional
- FR1 `node scripts/finance-quantification-build.js <TICKER> [--years=15] [--dry-run]`:
  fetch, validate, write tab `Định lượng - <TICKER>` in the shared spreadsheet, print a JSON result
  (`{success, ticker, spreadsheetId, sheetName, sheetGid, tabUrl, years, rawRows, blockRows, warnings[]}`).
- FR2 `node scripts/finance-quantification-fetch-market.js <TICKER>` → JSON
  `{ticker, tradingDate, closePrice, marketCapVnd, sharesOutstanding, exchange, source}`.
- FR3 Abort non-zero with a precise message on: unresolved required code, `270 != 440` for any year,
  `closePrice<=0`, `marketCap<=0`, zero audited years, `years.length>25`.
- FR4 Emit progress markers `[QUANT-STEP] n/5 <label>` on **stderr** at each stage boundary.
- FR5 `--dry-run` performs every fetch + validation and prints the row/formula plan without any
  Sheets write (used by phase-03 smoke tests and CI-free verification).
- FR6 `/me:finance-quantification <TICKER>` runs the script, interprets the output, appends a short
  human read of the ratios, and stops-and-asks on any abort — never patches numbers by hand.

### Non-functional
- Each new file < 200 lines. No new npm dependency.
- Idempotent: two consecutive runs on the same ticker produce an identical tab (modulo price/date).
- Total runtime of the script path < 30s.

## Architecture

```
finance-quantification-build.js  (orchestrator, ~170 lines)
 ├─ lib/vietstock-price-history.js   POST helper + /Date(ms)/ parser      [NEW, shared]
 ├─ finance-quantification-fetch-market.js  → price/mcap/shares          [NEW]
 ├─ finance-report-detail-fetch-cafef.js    → BCTC annual (execSync, as   [REUSED, unmodified]
 │                                            finance-report-detail-build-raw-sheet.js:58 does)
 ├─ lib/cafef-quarterly-eps.js       → last 4 quarters EPS (code 70)      [NEW]
 └─ lib/quantification-sheet-blocks.js → raw rows + ratio block builders  [NEW]
```

Data flow, step by step (also the 5 progress steps):

| Step | In | Transform | Out |
|------|----|-----------|-----|
| 1/5 fetch-bctc | ticker | cafef 3 endpoints, keep `type==="HK"` | templates + annual values |
| 2/5 validate | annual values | `270==440` per year; resolve `REQUIRED_CODES`; count years | `codeRowMap` or ABORT |
| 3/5 fetch-market | ticker | vietstock `getpricehistory` PageSize=1; cafef `TypeTime=QUY` | price, mcap, shares, ttmEps? |
| 4/5 write-sheet | rows + block | `addSheet` if absent → scoped `clear` → 2 `values.update` calls | tab + gid |
| 5/5 verify | tab | read back A1 + 3 spot cells; grep for `#REF!/#NAME?/#N/A/#DIV/0!` | warnings[] or ABORT |

Ratio block sections (same as the proven layout at `finance-report-detail-build-dinh-luong.js:63-109`,
row refs swapped for `codeRowMap` lookups): I. Quy mô · II. Sinh lợi · III. Tăng trưởng YoY ·
IV. Đòn bẩy · V. Thanh khoản & cơ cấu tài sản · VI. Định giá (EPS, BVPS, P/E FY, P/E TTM?, P/B, giá, số CP).

## Related Code Files

**Create:**
- `scripts/finance-quantification-build.js`
- `scripts/finance-quantification-fetch-market.js`
- `scripts/lib/vietstock-price-history.js`
- `scripts/lib/cafef-quarterly-eps.js`
- `scripts/lib/quantification-sheet-blocks.js`
- `.claude/commands/me/finance-quantification.md`
- `config/finance-quantification.json` (tracked, non-secret)

**Modify:**
- `.gitignore` — add `!config/finance-quantification.json` next to the existing allowlist
  (`.gitignore:13-18`). Without this the file is ignored by `config/*.json` at `.gitignore:12`,
  never reaches mpfc, and the deployed skill fails at runtime with a missing-config error.

**Do not touch:** any `scripts/finance-report-detail-*.js`, `config/finance-watchlist.json`, `web/`.

**Delete:** none.

## Implementation Steps

1. `scripts/lib/vietstock-price-history.js` — export `fetchPriceHistory(code, pageSize)` and
   `parseVsDate(s)`; body copied from `finance-report-detail-fetch-liquidity.js:21-66` verbatim in
   behaviour. Do **not** refactor the existing liquidity script in this phase (it is load-bearing for
   the 6-sheet flow); log the migration as backlog.
2. `scripts/finance-quantification-fetch-market.js` — PageSize=1, assert `Array.isArray && length>0`,
   `ClosePrice>0`, `MarketCapital>0`; compute `sharesOutstanding = MarketCapital/ClosePrice`; if
   `Math.abs(s-Math.round(s)) > 1` abort (`SHARE_DERIVATION_NOT_INTEGER`), else round. Print JSON.
3. `scripts/lib/cafef-quarterly-eps.js` — `TypeTime=QUY`, `pageSize=8`; sort by `(year, quater)` desc;
   take 4; assert consecutive; return `{ttmEps, quarters:[...]}` or `{ttmEps:null, reason}`. Never
   interpolate a missing quarter.
4. `scripts/lib/quantification-sheet-blocks.js` — `buildRawRows(cafefJson)` returning
   `{rows, codeRowMap, years}` where `codeRowMap[section][code] = 1-based output row`, built while
   pushing rows (single source of truth, no second pass). Reuse the `fmt`/`fmtPerShare`/`PER_SHARE_NAME_RE`
   logic from `finance-report-detail-build-raw-sheet.js:24-38` so formatting matches existing sheets.
   Then `buildRatioBlock({codeRowMap, years, market, ttm, startRow})` returning formula rows.
5. `scripts/finance-quantification-build.js` — orchestrate the 5 steps; read
   `config/finance-quantification.json`; `spreadsheets.get` → find tab by title → `addSheet` when
   absent (never rename); `values.clear` on `'<tab>'!A1:Z<startRow+blockRows+50>`; two
   `values.update` calls (`USER_ENTERED`); read back for `#REF!/#NAME?/#N/A/#DIV/0!`; print result JSON
   including `tabUrl = https://docs.google.com/spreadsheets/d/<id>/edit#gid=<gid>`.
6. Ticker sanitation in both scripts: `/^[A-Z0-9]{3,10}$/` after `toUpperCase()`, else abort.
   Prevents a malformed symbol from silently producing an empty tab.
7. `.claude/commands/me/finance-quantification.md` — frontmatter `description:` (Vietnamese, matching
   the style of `finance-report-detail.md:2`), then: purpose, the single bash command, how to read the
   output JSON, the QA checklist, the abort/escalation rules, and the explicit **KHÔNG BỊA SỐ LIỆU**
   rule copied in spirit from `finance-report-detail.md:93`. State that the tab lives in the shared
   spreadsheet and that this command must not create per-ticker spreadsheets.
8. `config/finance-quantification.json` + the `.gitignore` allowlist line; verify with
   `git check-ignore -v config/finance-quantification.json` returning exit 1 (not ignored).
9. Manual verification runs: `--dry-run` for FPT, VEA, SAB, then a real write for one ticker; then VCB
   and SSI expecting `UNSUPPORTED_CHART_OF_ACCOUNTS` exit 1 with zero tabs created.
10. `node --check` every new file; run `code-reviewer` agent per `.claude/rules/development-rules.md`.

## Todo List

- [ ] 1. `scripts/lib/vietstock-price-history.js`
- [ ] 2. `scripts/finance-quantification-fetch-market.js` + probe 4 tickers
- [ ] 3. `scripts/lib/cafef-quarterly-eps.js` + consecutive-quarter assertion
- [ ] 4. `scripts/lib/quantification-sheet-blocks.js` (codeRowMap built inline)
- [ ] 5. `scripts/finance-quantification-build.js` (addSheet-only, read-back QA)
- [ ] 6. Ticker regex guard in both entry scripts
- [ ] 7. `.claude/commands/me/finance-quantification.md`
- [ ] 8. `config/finance-quantification.json` + `.gitignore` allowlist + `git check-ignore` proof
- [ ] 9. Verification matrix run (FPT/VEA/SAB pass, VCB/SSI abort)
- [ ] 10. `node --check` + code review

## Success Criteria

- `node scripts/finance-quantification-build.js FPT` exits 0 in < 30s and prints JSON with a working
  `tabUrl`; the tab shows the raw block on top and a ratio block below with **zero** error cells.
- Spot check: `Tổng tài sản` latest year in the ratio block equals the raw row value exactly;
  `P/B` equals `price / BVPS` recomputed by hand to 2dp.
- Re-running the same ticker produces the same tab (no duplicate tab, no extra rows, other tabs
  untouched — verify tab list before/after).
- `VCB` and `SSI` exit 1 with `UNSUPPORTED_CHART_OF_ACCOUNTS` and create no tab.
- `git check-ignore config/finance-quantification.json` → exit 1.
- `grep -rn "MARKET = {" scripts/finance-quantification-*.js` → no match (no hand-typed market data).
- Every new file < 200 lines; `node --check` clean on all.

### Test matrix

| Level | What | How |
|-------|------|-----|
| Unit (manual, no framework in repo) | `parseVsDate`, `fmt`, `fmtPerShare`, share derivation, quarter-consecutive check | `node -e` on each lib with fixture values |
| Integration | each fetch script standalone on FPT/VEA/SAB/VCB | run + inspect JSON |
| E2E happy | build FPT (real write) then re-run | tab diff + tab-count check |
| E2E abort | VCB, SSI, `FPTX9` (bad symbol), `fpt` (lowercase → normalised) | expect exit 1 / normalisation |
| Regression | 6-sheet flow untouched | `git diff --stat` shows no `finance-report-detail-*` change |

## Risk Assessment

| Risk | L×I | Mitigation |
|------|-----|-----------|
| Wrong `code` chosen for "LNST của cổ đông công ty mẹ" (`61` vs `62`) → every profitability ratio wrong | M×H | Phase-01 disambiguates by label; step 5 spot-check compares the ratio-block value against the raw row for the latest year |
| Destructive write into the shared spreadsheet (other tickers' tabs) | L×H | `addSheet` only; `clear` range always prefixed with the target tab name; capture the tab list before/after in the E2E test; spreadsheet has full Google revision history for rollback |
| `USER_ENTERED` misparses `"(123.45)"` / `" - "` under a non-`en_US` locale | L×H | Spreadsheet verified `en_US`; assert locale at runtime and abort if it changed |
| cafef returns fewer audited years than expected → thin ratio table | M×M | Report `years` in the result JSON; warn (not abort) when `< 5` years, mirroring the "tối thiểu 5 năm" bar in `finance-report-detail.md:23` |
| Sheets API quota / transient 5xx | L×M | Single-ticker runs are ~4 API calls; wrap writes in one retry with backoff, then abort with the API message |
| Column letters break past 25 years | L×M | Assert `years.length <= 25`; `--years` capped at 15 |

## Security Considerations

- No secrets in code; the service-account path is read from the existing constant pattern
  (`finance-report-detail-build-raw-sheet.js:22`), never from an env var supplied by the web layer.
- Ticker input sanitised (`^[A-Z0-9]{3,10}$`) before it reaches a URL or a sheet title — blocks
  path/parameter smuggling into cafef/vietstock URLs and formula/sheet-name injection.
- Config file `config/finance-quantification.json` holds only a spreadsheet ID (non-secret) → tracked
  in git deliberately, matching `config/finance-watchlist.json`'s stance (`finance-watchlist.json:2`).
- Scripts print no credentials; error paths print the failing URL only.

## Rollback

- Revert the commit (all files are new except the one `.gitignore` line) — the 6-sheet flow is
  untouched by construction.
- Generated tabs: delete the `Định lượng - <TICKER>` tab, or restore via the spreadsheet's version
  history. No other data is mutated.

## Next Steps

- Unblocks phase 03's smoke test and phase 04's deployment verification.
- Backlog: migrate `finance-report-detail-build-dinh-luong.js` + `-fetch-liquidity.js` onto the new libs.

## Open Questions

1. Should `--dry-run` also render the block to a local file for eyeballing, or is stdout enough?
2. Warn-vs-abort threshold when audited years `< 5` — plan says warn. Confirm.
