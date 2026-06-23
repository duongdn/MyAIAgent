---
description: Personal tax YTD check — payslip emails vs tax-summary sheet vs Vietnam PIT (old 7-bracket law)
---

## Utils

| Util | When | Params |
|------|------|--------|
| `/util:read-memory` | First — before anything | `tax-check` (no dedicated section yet — Global only) |
| `/util:report` | Write output | `reports/{YYYY-MM-DD}/tax-check.md` |

---

# Tax Check (`/tax-check [year]`)

Annual personal tax reconciliation for **duongdn (Đoàn Nguyên Dương)** across three sources:

1. **Annual TNCN settlement sheet** — file `QT_TNCN_{YEAR}_NIK - DuongDN.xls`, Drive ID `1_9jB6hLIpTUfaZ0hImRCbRxLlXKEYgY7` (replace next year with new file ID). Vietnamese tax form `BANGLUONG` tab. One row per person with year totals.
2. **Payslip emails** — Zoho IMAP, `duongdn@nustechnology.com`, subject contains "payslip" (format: `[HR] Payslip - MM/YYYY` or combined `[HR] Payslip - MM/YYYY-1 & 01/YYYY`). Search **all folders** (INBOX, important, etc.).
3. **Vietnam PIT — OLD 7-bracket law** (recompute independently from gross).

**Default year:** current year minus 1 (e.g. running in 2026 → settles 2025).
**Output:** `./reports/{YYYY-MM-DD}/tax-check.md`

---

## Run

```bash
python3 scripts/tax-check-fetch.py > tmp/tax-check-data.json
python3 scripts/tax-check-extract-monthly.py {YEAR} > tmp/tax-check-recon.json
```

`tax-check-fetch.py` — downloads sheet (XLSX/XLS), saves all payslip .ods attachments to `tmp/payslips/`, extracts password from each email body, lists every `MM/YYYY` token in subject.

`tax-check-extract-monthly.py {YEAR}` — decrypts each payslip, extracts per-month figures using the **Personal-Deduction (11M) landmark** (survives cell-merge variations), aggregates, compares against sheet annual totals.

If `sheet.error == "drive_access_failed"`:
- Tell user to share the file with `daily-agent@daily-agent-490610.iam.gserviceaccount.com` (Viewer)
- Stop. Do not invent numbers.

If `payslips.error == "auth_fail"` → flag, do not silently skip.

---

## Vietnam PIT — OLD 7-bracket law (Law 04/2007/QH12)

Use this for ALL years regardless of date — user explicitly chose old law only.

### Monthly schedule (used by employer for withholding)

| Bracket | Monthly taxable income (VND) | Rate | Quick deduction |
|---|---|---|---|
| 1 | 0 – 5,000,000 | 5% | 0 |
| 2 | 5,000,001 – 10,000,000 | 10% | 250,000 |
| 3 | 10,000,001 – 18,000,000 | 15% | 750,000 |
| 4 | 18,000,001 – 32,000,000 | 20% | 1,650,000 |
| 5 | 32,000,001 – 52,000,000 | 25% | 3,250,000 |
| 6 | 52,000,001 – 80,000,000 | 30% | 5,850,000 |
| 7 | 80,000,001+ | 35% | 9,850,000 |

### Annual schedule (used at year-end settlement = monthly × 12)

| Bracket | Annual taxable income (VND) | Rate | Quick deduction (annual) |
|---|---|---|---|
| 1 | 0 – 60,000,000 | 5% | 0 |
| 2 | 60,000,001 – 120,000,000 | 10% | 3,000,000 |
| 3 | 120,000,001 – 216,000,000 | 15% | 9,000,000 |
| 4 | 216,000,001 – 384,000,000 | 20% | 19,800,000 |
| 5 | 384,000,001 – 624,000,000 | 25% | 39,000,000 |
| 6 | 624,000,001 – 960,000,000 | 30% | 70,200,000 |
| 7 | 960,000,001+ | 35% | 118,200,000 |

**PIT = TaxableIncome × rate − quick_deduction**

### Deductions (per Law 04/2007/QH12, applies for all years before reform)

- **Personal deduction:** 11,000,000 / month (132M / year)
- **Dependent deduction:** 4,400,000 / month / dependent (52.8M / year / dep)
- **Compulsory insurance** (employee side): BHXH 8% + BHYT 1.5% + BHTN 1% = **10.5% of salary base** capped at the official ceiling. Most months → 945,000 (= 720k+135k+90k on 9M base).

---

## Cash-basis rules (Vietnam)

1. **13th-month bonus paid in following year** belongs to that following year's tax. Example: subject `[HR] Payslip - 13/2024` paid in Feb 2025 → counts for **2025** tax year, NOT 2024.

2. **Combined emails** like `[HR] Payslip - 12/YYYY-1 & 01/YYYY`: the .ods file is named `Finance_Payslip_{YYYY}{01}_DuongDN.ods` — it represents the **January YYYY payslip** which includes both:
   - 13th-month bonus from year YYYY-1 (paid in January YYYY)
   - January YYYY monthly salary

   In `tax-check-extract-monthly.py`, the combined email is tagged to the LATER month (e.g. 01/2025), so Mo 01 of year YYYY contains the merged data.

3. **Mo 13/YYYY payslip** (subject `[HR] Payslip - 13/YYYY`, sent in Feb of YYYY+1) = year-end summary for the bonus paid in Feb YYYY+1. **Excluded from year YYYY settlement** (cash basis → goes to YYYY+1). Layout differs from monthly payslips and the extractor returns `layout: "special"` for it.

4. **Subject parser MUST extract ALL `MM/YYYY` tokens** (not just first), or combined emails get mis-tagged.

5. **Multi-folder search**: HR sometimes archives payslips to the `important` folder (or other custom folders). The fetch script scans all selectable folders excluding system ones (Drafts/Sent/Spam/Trash/Junk/Notes).

---

## Reconciliation expectations

After the scripts run, **all five comparisons should match within ±2 VND** (rounding only):

| Δ | Sheet field | Σ Payslips Mo 01-12 | Expected |
|---|---|---|---|
| `delta.gross`     | `Tổng TNCT`              | `Σ gross_for_pit`  | ≈ 0 |
| `delta.insurance` | `Bảo hiểm bắt buộc`      | `Σ total_ins`       | ≈ 0 |
| `delta.taxable`   | `Thu nhập tính thuế`     | `Σ taxable`         | ≈ 0 |
| `delta.withheld`  | `Số thuế đã khấu trừ`    | `Σ pit`             | ≈ 0 |
| `delta.dep_ded`   | `Số tiền giảm trừ NPT`   | `Σ dep_ded`         | ≈ 0 |

Independently recompute **annual PIT** from sheet's `Thu nhập tính thuế`:
- Apply annual schedule above → should equal `Tổng số thuế phải nộp` (tax_due) on sheet.

**Refund** = `withheld` − `tax_due`. Negative on sheet's "Số thuế còn lại phải nộp" = refund (you get money back).

---

## Why a refund typically happens (educational)

Monthly withholding uses the **monthly bracket**; annual settlement uses the **annual bracket**. When 13th-month bonuses bunch into one calendar month (combined Mo 01), that month's taxable income spikes and is withheld at a higher monthly bracket. Spread over the year, total taxable income lands in a lower annual bracket → over-withheld → refund.

Example (2025):
- Mo 01 taxable = 102,765,417 → monthly bracket 7 (35%) → withhold 26,117,896
- Mo 02-12 taxable ≈ 37.6M each → monthly bracket 5 (25%) → withhold ~6.15M each
- Σ withheld = 93,829,839
- Annual taxable 516,613,167 → annual bracket 5 (25%) → due 90,153,292
- **Refund = 3,676,547**

---

## Insurance breakdown (sanity check)

Default ceiling-based monthly:
- BHXH (employee): 8% of capped base — typically 720,000
- BHYT (employee): 1.5% of capped base — typically 135,000
- BHTN (employee): 1% of capped base — typically 90,000
- Occupational: 0
- **Total: 945,000 / month → 11,340,000 / year**

If the sheet's `Bảo hiểm bắt buộc` ≠ 12 × 945,000, the salary base or cap changed mid-year. Check.

---

## Report template

```markdown
# Tax Check — {YYYY-MM-DD} (settlement year {YEAR})

## Sources
- Sheet: {meta.name} — BANGLUONG tab, row for **Đoàn Nguyên Dương**
- Payslips: {n_year} of {n_total} payslip emails decrypted (folders: {folder_counts})
- Tax rule: Vietnam PIT — OLD 7-bracket (11M personal / 4.4M dependent / 10.5% insurance default)

## Per-month payslips ({YEAR}) — DECRYPTED
| Mo | Gross for PIT | Insurance | Taxable | PIT (withheld) | Net | Dep |
| --- |
| 01 | … (note if includes prior-year 13th-month bonus) |
| ... |
| **SUM** | | | | | | |

Mo 13/{YEAR} (year-end bonus paid Feb {YEAR}+1) excluded — 2026 tax-year income.

## Annual reconciliation
| Item | Sheet | Σ Payslips | Δ |
|---|---:|---:|---:|
| Gross subject to PIT | … | … | … |
| Compulsory insurance | … | 12 × 945,000 = … | … |
| Personal deduction | … | 12 × 11,000,000 = 132,000,000 | … |
| Dependent deduction | … | 12 × 4.4M × {N_dep} = … | … |
| Taxable income | … | … | … |
| Tax withheld | … | … | … |
| Annual PIT due (recomputed annual bracket {N}) | … | … | … |
| Refund / payable | … | withheld − due | … |

All Δ should be ±1 VND (rounding). Flag any larger.

## Discrepancies
- …

## Missing data
- Months without payslip in {YEAR}: …
- Payslips outside year (other-year): {YYYY-1}: {n}, {YYYY+1}: {n}, …

## Unresolved questions
- …
```

Sacrifice grammar for concision. Numbers MUST come from JSON — never invent. List unresolved questions at end.

---

## First-run setup

If `python3 scripts/tax-check-fetch.py` reports `drive_access_failed`, instruct the user:

> Share the tax sheet with **`daily-agent@daily-agent-490610.iam.gserviceaccount.com`** as **Viewer**.
> Drive → Open the file → Share → paste email → Viewer → Send.

Dependencies: `pip3 install --user --break-system-packages openpyxl xlrd cryptography google-api-python-client google-auth` (already installed locally).

---

## Files

- `scripts/tax-check-fetch.py` — sheet + email fetcher (multi-folder, multi-month, password extractor)
- `scripts/tax-check-decrypt-payslip.py` — ODF 1.2 §4.5 decryptor (PBKDF2 → AES-256-CBC → raw deflate). Standalone usage: `python3 tax-check-decrypt-payslip.py file.ods PASSWORD`
- `scripts/tax-check-extract-monthly.py` — orchestrator: decrypt all + extract via 11M landmark + reconcile against sheet

---

## Known structural quirks (don't re-discover next year)

- Payslip .ods file has a single table named `Content`. Data row first cell = `DuongDN`.
- Cell positions shift ±1 column between months because some months omit a `<table:covered-table-cell>` early in the row. **Anchor on Personal Deduction = 11,000,000** in DETAILS section — that's the only stable landmark.
- After Personal Deduction, the next 10 numeric cells are: `n_dep, dep_ded, bhxh, bhyt, bhtn, occ, total_ins, taxable, pit, net`.
- 2 numeric cells BEFORE Personal Deduction: `gross_for_ins` (typically 9M cap), `gross_for_pit` (= Total Gross − non-taxable allowances like lunch + uniform).
- HR password formats observed: `password is NNNNNN`, `Code mở file: NNNN`, `Code để mở file: NNNN`, `Mã mở: NNNN`. Add new patterns to `PASSWORD_PATTERNS` in `tax-check-fetch.py` if HR changes template.
- Sheet may be `.xls` (legacy OLE) not `.xlsx` — fetcher detects via magic bytes and uses `xlrd<2.0` for .xls, `openpyxl` for .xlsx.
- Sheet's Drive file changes ID each year (HR uploads new file). Update `SHEET_FILE_ID` in `tax-check-fetch.py` at start of each settlement.
