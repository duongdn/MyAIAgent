---
description: Personal tax YTD check — payslip emails vs tax-summary sheet vs Vietnam PIT (old 7-bracket law)
---

# ⚠️ MANDATORY FIRST STEP — READ MEMORY

Before doing ANYTHING else:
1. Read `docs/memory/MEMORY.md`
2. Read every `## Feedback` file listed there
3. Memory OVERRIDES anything below.

---

# Tax Check (`/tax-check`)

Annual personal tax reconciliation for **duongdn** across three sources:

1. **Annual TNCN settlement sheet** (`QT_TNCN_2025_NIK - DuongDN.xls`, Drive ID `1_9jB6hLIpTUfaZ0hImRCbRxLlXKEYgY7`) — Vietnamese tax form `BANGLUONG` tab. One row per person with year totals.
2. **Payslip emails** — Zoho IMAP, `duongdn@nustechnology.com`, subject contains "payslip" (format: `[HR] Payslip - MM/YYYY`). Filter to the year on the sheet.
3. **Vietnam PIT — OLD 7-bracket law** (recompute independently)

**Output:** `./reports/{YYYY-MM-DD}/tax-check.md`

---

## Run

```bash
python3 scripts/tax-check-fetch.py > tmp/tax-check-data.json
```

Single JSON with `sheet` + `payslips`. If `sheet.error == "drive_access_failed"`:
- Tell user to share the file with `daily-agent@daily-agent-490610.iam.gserviceaccount.com` (Viewer)
- Stop. Do not invent numbers.

If `payslips.error == "auth_fail"` → flag, do not silently skip.

---

## Vietnam PIT — OLD 7-bracket law (Law 04/2007/QH12)

Use this for ALL months regardless of date — user explicitly chose old law only.

**Monthly taxable income = Gross − Compulsory Insurance − Personal deduction (11,000,000) − Dependents × 4,400,000**

Compulsory insurance (employee side, default if not on payslip): **10.5% of gross capped at salary cap**.

| Bracket | Monthly taxable income (VND) | Rate | Quick deduction (cumulative) |
|---|---|---|---|
| 1 | 0 – 5,000,000 | 5% | 0 |
| 2 | 5,000,001 – 10,000,000 | 10% | 250,000 |
| 3 | 10,000,001 – 18,000,000 | 15% | 750,000 |
| 4 | 18,000,001 – 32,000,000 | 20% | 1,650,000 |
| 5 | 32,000,001 – 52,000,000 | 25% | 3,250,000 |
| 6 | 52,000,001 – 80,000,000 | 30% | 5,850,000 |
| 7 | 80,000,001+ | 35% | 9,850,000 |

Quick formula: **PIT = TaxableIncome × rate − quick_deduction**.

If a payslip already shows `PIT` and `Insurance` numbers, recompute from the **gross** they list — verify the employer math.

---

## Reconciliation rules

The sheet has **annual totals**; payslips are **per-month**. Sum payslips for the matching year first.

Map sheet columns from the BANGLUONG header row to:
- `Tổng TNCT` → annual gross taxable income
- `Số tiền giảm trừ bản thân` → personal deduction (annual: 11M × 12)
- `Số người phụ thuộc` → number of dependents
- `Số tiền giảm trừ người phụ thuộc` → dependent deduction (annual)
- `Bảo hiểm bắt buộc` → compulsory insurance (annual)
- `Thu nhập tính thuế` → annual taxable income
- `Số thuế đã khấu trừ trong năm` → tax withheld during year

Comparisons:

| Side A | Side B | Check |
|---|---|---|
| Sheet `Tổng TNCT` | Σ payslip gross (matching year) | Δ in VND |
| Sheet `Bảo hiểm bắt buộc` | Σ payslip insurance | Δ in VND |
| Sheet `Số thuế đã khấu trừ trong năm` | Σ payslip tax withheld | Δ in VND |
| Sheet `Thu nhập tính thuế` | Recomputed taxable (gross − insurance − 11M×12 − 4.4M×N×12) | Δ in VND |
| Sheet tax | Recomputed annual PIT (apply 7-bracket per-month, sum) | Δ in VND. Flag >1,000 VND |

If a payslip month is missing for the year → flag in "Missing data".
If multiple years of payslips → focus on the year matching the sheet (default 2025); list other years separately.

---

## Report template

```markdown
# Tax Check — {YYYY-MM-DD} (settlement year {YYYY})

## Sources
- Sheet: {meta.name} — BANGLUONG tab, row for DuongDN
- Payslips: {n_year} emails for {YYYY} (of {n_total} total in inbox)
- Tax rule: Vietnam PIT — OLD 7-bracket (11M personal / 4.4M dependent / 10.5% insurance default)

## Annual totals
| Item | Sheet | Σ Payslips ({YYYY}) | Recomputed | Δ sheet vs payslip | Δ sheet vs recomp |
|---|---|---|---|---|---|
| Gross (Tổng TNCT) | … | … | — | … | — |
| Compulsory insurance | … | … | — | … | — |
| Personal deduction | … | 11M × 12 = 132M | 132M | — | — |
| Dependents | {N} | — | — | — | — |
| Dependent deduction | … | 4.4M × {N} × 12 | … | — | — |
| Taxable income | … | — | … | — | … |
| PIT | … | … | … | … | … |

## Per-month payslips ({YYYY})
| Month | Gross | Insurance | Tax withheld | Recomputed PIT (monthly) | Δ |
|---|---|---|---|---|---|

## Discrepancies
- …

## Missing data
- Months without payslip in {YYYY}: …
- Other-year payslips found: {YYYY-1}: {n}, {YYYY-2}: {n}, …

## Unresolved questions
- …
```

Sacrifice grammar for concision. Numbers MUST come from JSON — never invent. List unresolved questions at end.

---

## First-run setup

If `python3 scripts/tax-check-fetch.py` reports `drive_access_failed`, instruct the user:

> Share the tax sheet with **`daily-agent@daily-agent-490610.iam.gserviceaccount.com`** as **Viewer**.
> Drive → Open the file → Share → paste email → Viewer → Send.
