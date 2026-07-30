# Phase 01 — Research & design lock

## Context Links

- Existing 6-sheet skill: `.claude/commands/me/finance-report-detail.md`
- Existing ratio builder (to be superseded, NOT modified): `scripts/finance-report-detail-build-dinh-luong.js`
- cafef fetch pattern: `scripts/finance-report-detail-fetch-cafef.js:42-84`
- vietstock POST pattern: `scripts/finance-report-detail-fetch-liquidity.js:21-61`
- Raw-sheet row layout: `scripts/finance-report-detail-build-raw-sheet.js:40-73`
- Memory: `docs/memory/finance-report/reference_cafef_data_source.md`, `reference_raw_sheet_formatting_spec.md`
- Report output → `plans/reports/researcher-260730-*-quantification-data-sources.md`

## Overview

- **Priority:** P1 (blocks 02 and the data contract of 03)
- **Status:** pending
- **Effort:** 1.5h
- Lock the data contract: which cafef row `code`s map to which ratio input, how live market data is
  obtained, whether P/E TTM is computable, and the exact tab layout in the shared spreadsheet.
  No production code written in this phase — output is a report + a committed code-map constant.

## Key Insights (already verified — do not re-derive)

1. **Live market data is already solved by an endpoint in this repo.**
   `https://finance.vietstock.vn/data/getpricehistory` (POST form-encoded, `Cols=TKLGD,TGTGD,VHTT`)
   returns per trading day: `ClosePrice`, `MarketCapital`, `TotalVol`, `TotalVal`, `Exchange`,
   `TradingDate` (`/Date(ms)/`). Probed 2026-07-30:

   | Ticker | ClosePrice | MarketCapital | mcap/price | frac. part |
   |--------|-----------|---------------|-----------|-----------|
   | FPT | 67,000 | 114,134,977,107,000 | 1,703,507,121 | 0.0000 |
   | VEA | 34,000 | 45,179,200,000,000 | 1,328,800,000 | 0.0000 |
   | SAB | 43,600 | 55,919,719,419,200 | 1,282,562,372 | 0.0000 |
   | VCB | 56,500 | 472,095,642,811,000 | 8,355,675,094 | 0.0000 |

   → **shares outstanding = MarketCapital / ClosePrice**, derived not fetched, exact. Replaces the
   hand-typed `MARKET.sharesNow` at `finance-report-detail-build-dinh-luong.js:27`.

2. **P/E and P/B are NOT available from that endpoint** and must not be scraped from a rendered page
   (unverifiable methodology, and `feedback_finance_report_never_construct_urls_and_more_ticker_collisions`
   forbids fabricated/constructed sources). Design: compute them as **sheet formulas**:
   - `P/B = price / BVPS_latestFY`, BVPS already a formula row (VCSH / shares).
   - `P/E (annual) = price / EPS_latestAuditedFY` — labelled with the FY used.
   - `P/E TTM = price / Σ(EPS of last 4 quarters)` — cafef quarterly verified working:
     `GET https://apiweb.cafef.vn/api/v1/BCTC/GetReportDetail?symbol=FPT&pageIndex=1&pageSize=5&reportType=KQKD&TypeTime=QUY`
     → `isSuccess:true`, EPS template code **`70`** = "19. Lãi cơ bản trên cổ phiếu (Đồng/1 cổ phiếu)",
     latest quarter value `1507`. Period objects expose `year`, **`quater`** (sic — misspelled),
     `type` (`"QH"`), `content`, `time`, `data[]`.

3. **Chart-of-accounts divergence is real and breaks row-number addressing.** Probed templates:
   - FPT: `TN` 79 rows (first `100` = A. TÀI SẢN NGẮN HẠN), `NV` 54 rows, code `270` present.
   - VCB: `TN` **47 rows** (first `110` = I. Tiền mặt, vàng bạc, đá quý), `NV` 43 rows,
     code `270` **ABSENT**.
   → Row numbers 80/115/139/157/159/83/2/34/84 hardcoded at
   `finance-report-detail-build-dinh-luong.js:68-99` are FPT/VEA/SAB-shaped only.

4. **`finance-report-detail-build-raw-sheet.js:84-92` is destructive against a shared spreadsheet**:
   when the named tab is absent it renames `meta.data.sheets[0]` and then clears `A1:Z500`. In a
   spreadsheet holding many tickers' tabs that silently wipes another ticker. Must not be reused.

5. **Existing Định lượng output is already self-contained** — `finance-report-detail-build-dinh-luong.js:51-56`
   copies all raw rows into the target tab, then appends the ratio block at `A204` referencing rows in
   the *same* sheet. → **No companion/hidden raw tab is needed** in the shared spreadsheet (revises the
   original suggestion; simpler, YAGNI). One tab per ticker = raw block on top + ratio block below.

6. Shared spreadsheet `1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo`: readable/writable by the service
   account, `locale: en_US`, tabs = `[Sheet1 (id 0, 1000 rows)]`, title `Định tính`.
   `en_US` matters: `fmt()` at `finance-report-detail-build-raw-sheet.js:24-29` emits `"(123.45)"` for
   negatives and `"1,234.56"` with separators — parsed as numbers under `USER_ENTERED` + `en_US`.
   A locale change would silently turn these into text and break every ratio formula.

## Requirements

### Functional
- FR1 Enumerate exact cafef `code` values for every ratio input, from the live API templates (not from
  memory, not from the old script's row numbers), for a non-financial VAS company.
- FR2 Decide + document the abort rule for unsupported charts of accounts (banks/insurers/securities).
- FR3 Confirm whether 4 consecutive most-recent quarters are retrievable for TTM EPS, including the
  `quater` field's value domain and how to detect a gap.
- FR4 Lock the target-tab layout (row ranges, header rows, where the ratio block starts).
- FR5 Decide config file shape + location for the shared spreadsheet ID.
- FR6 Confirm the shared spreadsheet is writable by the service account — **and change nothing else about
  it**: the file title (`Định tính`) and the empty `Sheet1` are left exactly as-is (user decision
  2026-07-30). Each run only adds/overwrites its own `Định lượng - <TICKER>` tab.

### Non-functional
- Every number in the final design traces to a named endpoint + field. No estimates.
- Design must keep each future code file < 200 lines (`.claude/rules/development-rules.md`).
- No new npm dependency may be required by the design.

## Architecture

```
                 ┌─────────────────────────────────────────┐
  TICKER ───────►│ 1. cafef GetReportCDKT / GetReportDetail│──► templates[] + years[]
                 │    (TypeTime=NAM, keep type==="HK")     │
                 └─────────────────────────────────────────┘
                 ┌─────────────────────────────────────────┐
         └──────►│ 2. cafef GetReportDetail TypeTime=QUY   │──► last 4 quarters EPS (code 70)
                 └─────────────────────────────────────────┘
                 ┌─────────────────────────────────────────┐
         └──────►│ 3. vietstock getpricehistory (PageSize=1)│──► ClosePrice, MarketCapital, date
                 └─────────────────────────────────────────┘
                                     │
                                     ▼
                   code→outputRow map (built while emitting rows)
                                     │
                                     ▼
        Tab "Định lượng - <TICKER>" in ONE shared spreadsheet
        rows 1..N   raw BCTC (Tài sản / Nguồn vốn / KQKD / LCTT groups)
        rows N+2..  ratio block, formulas referencing rows 1..N of the SAME tab
```

Data flow contract to be frozen in this phase (input → transform → output per box above), written as a
literal JS object in the phase-02 script:

```js
const REQUIRED_CODES = {
  totalAssets: { section: 'TN', code: '270' },   // verify
  currentAssets:{ section: 'TN', code: '100' },  // verify
  longTermAssets:{section: 'TN', code: '200' },  // verify
  liabilities: { section: 'NV', code: '300' },   // verify
  currentLiab: { section: 'NV', code: '310' },   // verify
  equity:      { section: 'NV', code: '400' },   // verify
  paidInCapital:{section: 'NV', code: '411' },   // verify
  totalCapital:{ section: 'NV', code: '440' },   // verify (balance check vs 270)
  revenue:     { section: 'KQKD', code: '10' },  // verify
  grossProfit: { section: 'KQKD', code: '20' },  // verify
  npatParent:  { section: 'KQKD', code: '62' },  // verify (61 vs 62)
  eps:         { section: 'KQKD', code: '70' },  // VERIFIED
};
```

## Related Code Files

**To read (no edits):**
- `scripts/finance-report-detail-fetch-cafef.js`
- `scripts/finance-report-detail-fetch-liquidity.js`
- `scripts/finance-report-detail-build-raw-sheet.js`
- `scripts/finance-report-detail-build-dinh-luong.js`

**To create:**
- `plans/260730-1423-finance-quantification-skill-and-web-app/reports/research-data-sources.md`
  (the frozen code map + endpoint contract + abort rules)

**To modify:** none in this phase.

## Implementation Steps

1. Probe `GetReportCDKT?symbol=FPT&...TypeTime=NAM` and dump `value.templace` for `TN` and `NV`
   (`code`, `name`) — record the exact codes for the 8 balance-sheet inputs. Repeat for VEA and SAB;
   the code set must be identical across all three or the design is wrong.
2. Probe `GetReportDetail?reportType=KQKD&TypeTime=NAM` template — record codes for DTT, LN gộp,
   LNST, LNST của cổ đông công ty mẹ (distinguish `61`/`62` by name, do not guess), EPS.
3. Probe the same for a bank (VCB) and a securities firm (SSI): record which required codes are
   missing. Write the abort rule: *if any `REQUIRED_CODES` entry is unresolvable → exit non-zero with
   `UNSUPPORTED_CHART_OF_ACCOUNTS: <ticker> thiếu code <x> — cần mapping riêng`*. No partial output.
4. Probe `TypeTime=QUY` with `pageSize=8` for FPT + one UPCOM ticker. Record `quater` values, ordering,
   and whether `type` is always `QH`. Define "4 consecutive quarters" and the gap-detection rule
   (missing quarter → omit P/E TTM row entirely + emit a warning line; never interpolate).
5. Verify the accounting identity per year: `code 270 == code 440` (mirrors
   `finance-report-detail.md:45`). Record diff for FPT/VEA/SAB — must be 0.
6. Cross-check derived shares vs `paidInCapital / 10,000` for FPT/VEA/SAB and record the delta.
   Where they disagree (treasury shares, ESOP, pending bonus issues), the **derived** figure is
   authoritative for P/E–P/B and the discrepancy must be printed as a note row, not hidden
   (the old script asserted equality by hand — `finance-report-detail-build-dinh-luong.js:27,97`).
7. Freeze the tab layout: `rows 1..N` raw (N = computed, not 202), ratio block at `N+2`, column span
   `B..` + `String.fromCharCode(66+i)` is safe only to 25 years — cap `--years` at 15 (matches
   `finance-report-detail-fetch-cafef.js:18`) and assert `years.length <= 25`.
8. Decide config: new tracked non-secret file `config/finance-quantification.json`
   `{ shared_spreadsheet_id, tab_prefix: "Định lượng - ", years: 15 }`.
   **Note the gitignore trap:** `.gitignore:12` ignores `config/*.json`; the file will be invisible to
   git and absent on mpfc after `git pull` unless `!config/finance-quantification.json` is added to the
   allowlist (`.gitignore:13-18`). Record this as a mandatory step in phase 02.
9. Confirm write access to the shared spreadsheet with a throwaway `addSheet` + `deleteSheet` on a
   temp tab name. **Do not** rename the file, touch its title, or modify/repurpose `Sheet1`
   (user decision 2026-07-30 — leave the spreadsheet as-is).
10. Write the report; get the code map reviewed before phase 02 starts.

## Todo List

- [ ] 1. Dump + record CDKT `TN`/`NV` template codes for FPT, VEA, SAB
- [ ] 2. Dump + record KQKD template codes (incl. `61` vs `62` disambiguation)
- [ ] 3. Probe VCB + SSI; write the UNSUPPORTED_CHART_OF_ACCOUNTS abort rule
- [ ] 4. Probe `TypeTime=QUY`; define TTM-EPS quarter selection + gap rule
- [ ] 5. Verify `270 == 440` per year for 3 tickers (diff must be 0)
- [ ] 6. Compare derived shares vs paid-in-capital/10,000; define the note row
- [ ] 7. Freeze tab layout + year-count cap
- [ ] 8. Decide config shape; record the `.gitignore` allowlist requirement
- [ ] 9. Confirm write access via temp addSheet/deleteSheet (title + `Sheet1` untouched)
- [ ] 10. Write `reports/research-data-sources.md`

## Success Criteria

- `REQUIRED_CODES` is fully resolved with a verified `code` + human label for each of the 12 inputs,
  identical across FPT/VEA/SAB.
- The report names, for every figure the skill will output, the endpoint + field it comes from.
- Bank/securities behaviour is a documented hard abort with an exact error string.
- TTM-EPS rule is written as pseudocode with the gap case handled.
- `270 == 440` diff recorded as 0 for three tickers.
- No open "TBD" left in the frozen code map.

## Risk Assessment

| Risk | L×I | Mitigation |
|------|-----|-----------|
| cafef `code` values differ across exchanges/tickers | M×H | Verify on 3 tickers across HOSE+UPCOM; abort on unresolvable code rather than falling back to row numbers |
| `quater` semantics unclear → wrong TTM EPS | M×H | If the 4-consecutive-quarter rule cannot be proven, drop the TTM row and ship annual P/E only (labelled). Never sum non-adjacent quarters |
| Undocumented endpoints change/disappear | M×M | Fail loudly with the URL in the error; both endpoints are already load-bearing elsewhere in the repo so breakage is detected by existing flows too |
| Vietstock `ExchangeID:1` hardcoded (`fetch-liquidity.js:32`) may not cover HNX/UPCOM | M×M | VEA (UPCOM) returned correct data in the probe; still assert `Exchange` field is non-empty and `ClosePrice>0`, abort otherwise |
| Spreadsheet title stays misleading (`Định tính` for a Định lượng file) | — | Accepted by user decision; scripts address the file by ID only, so the title is cosmetic. Recorded in phase-05 memory so nobody "fixes" it later |

## Security Considerations

- Read-only public endpoints; no credentials transmitted to cafef/vietstock.
- Service-account key stays at `config/daily-agent-490610-7eb7985b33e3.json`, never logged, never
  echoed into a report.
- Probe scripts live in the scratchpad, not committed — no throwaway dated scripts in `scripts/`
  (`docs/memory/daily-report/sheets/feedback_no_dated_scan_scripts.md`).

## Next Steps

- Unblocks phase 02 (needs `REQUIRED_CODES` + tab layout) and phase 03's result-link contract.
- Follow-up (backlog, not this plan): migrate `finance-report-detail-build-dinh-luong.js` onto the
  code-resolved map so the 6-sheet flow stops being bank-unsafe too.

## Decisions (locked — no open questions remain)

1. **P/E definition** — ship **annual P/E (latest audited FY EPS) + P/E TTM**, with the TTM row omitted
   entirely (plus a warning) when the 4 most recent quarters are not consecutive/complete. Never interpolate.
2. **Web app run mode** — the web app spawns **`node scripts/finance-quantification-build.js <TICKER>`
   directly**, not `claude -p`. SSE progress comes from the script's own `PROGRESS:` / `DONE:` /
   `ERROR:` lines. The `/me:finance-quantification` command exists for interactive use and also just
   shells out to the same script. One script, two callers. (User decision 2026-07-30.)
3. **Shared spreadsheet** — leave the file title (`Định tính`) and the empty `Sheet1` untouched. Runs
   only add/overwrite `Định lượng - <TICKER>` tabs. (User decision 2026-07-30.)
4. **Ticker input** — **free-form**, validated by `^[A-Z0-9]{3,10}$` only. No `finance-watchlist.json`
   gate; an unknown ticker is fetched fresh. (User decision 2026-07-30.)
5. **Cloudflare proxy** — stays enabled for the new hostname.
6. **certbot email** — reuse the existing LE account (`02c1fed6…`); certbot does not prompt for `-m`
   when an account is already registered. If it does demand an address, phase 04 stops and asks rather
   than inventing one.
7. **Missing docs files** — `docs/system-architecture.md` and `docs/project-changelog.md` are created,
   scoped narrowly (phase 05). `docs/development-roadmap.md` stays out of scope.
