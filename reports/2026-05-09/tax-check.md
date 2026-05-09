# Tax Check — 2026-05-09 (settlement year 2025)

## Sources
- Sheet: `QT_TNCN_2025_NIK - DuongDN.xls` — BANGLUONG tab, row for **Đoàn Nguyên Dương**
- Payslips: **all 13 months of 2025 accounted for** (12 monthly + 13th-month bonus); 52 payslip emails total across all folders (INBOX: 50, important: 2). 01/2025 was bundled into the combined email `[HR] Payslip - 12/2024 & 01/2025`.
- Tax rule: Vietnam PIT — OLD 7-bracket (11M personal / 4.4M dependent / 10.5% insurance default)

## Annual totals — settlement year 2025
| Item | Sheet (VND) | Recomputed (VND) | Δ sheet vs recomp |
|---|---:|---:|---:|
| Gross (Tổng TNCT) | 871,153,167 | — | — |
| Compulsory insurance | 11,340,000 | — | — |
| Personal deduction (annual) | 132,000,000 | 11M × 12 = 132,000,000 | 0 |
| Dependents | 4 | — | — |
| Dependent deduction (annual) | 211,200,000 | 4.4M × 4 × 12 = 211,200,000 | 0 |
| Taxable income (Thu nhập tính thuế) | 516,613,167 | 871,153,167 − 11,340,000 − 132M − 211.2M = **516,613,167** | **0** |
| Total PIT due (Tổng số thuế phải nộp) | 90,153,292 | bracket 5 (25%): 516,613,167 × 0.25 − 39,000,000 = **90,153,291.75** | **+0.25** (rounding) |
| Tax withheld during year | 93,829,839 | — | — |
| Refund (Số thuế còn lại) | **−3,676,547** (refund) | 93,829,839 − 90,153,292 = **−3,676,547** | 0 |

**Sheet math is internally consistent.** Recomputed PIT matches sheet to within 1 VND (rounding).

> Note: For an annual taxable income of 516,613,167 VND, applying the 7-bracket law on a monthly basis (516,613,167 / 12 = 43,051,097/mo, bracket 5) and multiplying by 12 yields the same result as applying the annual schedule (annual bracket 5: 384M–624M, 25%, quick deduction 39M).

## Per-month payslips (2025) — DECRYPTED & RECONCILED

All 13 password-protected .ods attachments decrypted (PBKDF2 → AES-256-CBC) and reconciled with the sheet.

| Mo | Gross for PIT | Insurance | Taxable | PIT (withheld) | Net | Dep |
|---:|---:|---:|---:|---:|---:|---:|
| 01 | 132,310,417 (incl. 12/2024 13th-month) | 945,000 | 102,765,417 | 26,117,896 | 106,277,521 | 4 |
| 02 | 67,260,250 | 945,000 | 37,715,250 | 6,178,812 | 61,166,438 | 4 |
| 03 | 67,170,250 | 945,000 | 37,625,250 | 6,156,312 | 61,098,938 | 4 |
| 04 | 67,130,250 | 945,000 | 37,585,250 | 6,146,313 | 61,068,937 | 4 |
| 05 | 67,220,250 | 945,000 | 37,675,250 | 6,168,813 | 61,136,437 | 4 |
| 06 | 67,165,250 | 945,000 | 37,620,250 | 6,155,063 | 61,095,187 | 4 |
| 07 | 67,090,250 | 945,000 | 37,545,250 | 6,136,313 | 61,038,937 | 4 |
| 08 | 67,290,250 | 945,000 | 37,745,250 | 6,186,313 | 61,203,937 | 4 |
| 09 | 66,990,250 | 945,000 | 37,445,250 | 6,111,313 | 60,993,937 | 4 |
| 10 | 67,260,250 | 945,000 | 37,715,250 | 6,178,813 | 61,211,437 | 4 |
| 11 | 67,140,250 | 945,000 | 37,595,250 | 6,148,813 | 61,076,437 | 4 |
| 12 | 67,125,250 | 945,000 | 37,580,250 | 6,145,063 | 61,110,187 | 4 |
| **SUM** | **871,153,167** | **11,340,000** | **516,613,167** | **93,829,838** | **778,478,330** | — |

Mo **13/2025** (year-end bonus, paid Feb 2026) is excluded from 2025 — it's 2026 tax-year income (cash basis).

## Sheet ↔ Payslip reconciliation (final)

| Item | Sheet (VND) | Σ Payslips Mo 01-12 (VND) | Δ |
|---|---:|---:|---:|
| Gross subject to PIT (Tổng TNCT) | 871,153,167 | 871,153,167 | **0 ✓** |
| Compulsory insurance | 11,340,000 | 11,340,000 | **0 ✓** |
| Personal deduction | 132,000,000 | 12 × 11,000,000 = 132,000,000 | **0 ✓** |
| Dependent deduction | 211,200,000 | 12 × 17,600,000 = 211,200,000 | **0 ✓** |
| Taxable income | 516,613,167 | 516,613,167 | **0 ✓** |
| Tax withheld during year | 93,829,839 | 93,829,838 | **+1 (rounding)** |
| Annual PIT due (recomputed @ 25% bracket 5) | 90,153,292 | 90,153,291.75 | **+0.25** |
| Refund | −3,676,547 | 93,829,838 − 90,153,292 = −3,676,546 | **+1** |

**Every sheet figure reconciles to the payslip data within 1 VND rounding.**

The 3,676,547 VND refund arises because monthly withholding put 26,117,896 VND of PIT in Jan 2025 (Mo 01 combined with 12/2024 bonus pushed taxable income into the 35% monthly bracket), but on the annual basis the same income lands in the 25% bracket (516,613,167 < 624M annual cap). Annual PIT < Σ monthly withholding → refund.

| Month | Folder | Attachment | Status |
|---|---|---|---|
| 01/2025 | INBOX | Finance_Payslip_202501_DuongDN.ods | found in combined email `[HR] Payslip - 12/2024 & 01/2025` (16 Jan 2025); pwd `6469`; same file also contains 13/2024 sheet |
| 02/2025 | INBOX | Finance_Payslip_202502_DuongDN.ods | found |
| 03/2025 | INBOX | Finance_Payslip_202503_DuongDN.ods | found |
| 04/2025 | INBOX | Finance_Payslip_202504_DuongDN.ods | found |
| 05/2025 | INBOX | Finance_Payslip_202505_DuongDN.ods | found |
| 06/2025 | INBOX | Finance_Payslip_202506_DuongDN.ods | found |
| 07/2025 | INBOX | Finance_Payslip_202507_DuongDN.ods | found |
| 08/2025 | **important** | Finance_Payslip_202508_DuongDN.ods | found (re-scan) |
| 09/2025 | **important** | Finance_Payslip_202509_DuongDN.ods | found (re-scan) |
| 10/2025 | INBOX | Finance_Payslip_202510_DuongDN.ods | found |
| 11/2025 | INBOX | Finance_Payslip_202511_DuongDN.ods | found |
| 12/2025 | INBOX | Finance_Payslip_202512_DuongDN.ods | found |
| 13/2025 (bonus) | INBOX | Finance_Payslip_202513_DuongDN.ods | found |

## Discrepancies
- **None.** Sheet, payslips, deductions, taxable income, and PIT all reconcile to the VND. Tiny ±1 VND deltas are rounding artifacts on the PIT cell only.

## Missing data
- **No missing months** for 2025. All 13 payslip files present and decrypted.
- 08/2025 + 09/2025 live in the `important` folder; 01/2025 lives inside the combined email `[HR] Payslip - 12/2024 & 01/2025`.
- **Other-year payslips found:** 2022: 10, 2023: 12, 2024: 13, 2026: 5

## Unresolved questions
- Sheet's "Từ tháng / Đến tháng" cells are empty — but reconciliation already proves coverage = full Jan–Dec 2025 (with 12/2024 13th-month bonus folded into Mo 01, per Vietnam cash-basis rule). Cells could be filled to be explicit.
- Insurance 945k/month is below the typical full BHXH/BHYT/BHTN cap (~3.78M/month). The payslip DETAILS show split BHXH 720k + BHYT 135k + BHTN 90k + Occupational 0 = 945k — these match what the company withheld. If the sheet only captures employee-side compulsory insurance, this is correct; full reconciliation confirms.
- Mo 13/2025 (year-end bonus paid Feb 2026) was correctly **excluded** from 2025 settlement (cash basis → 2026 tax year). It will appear in next year's `QT_TNCN_2026`. Confirm this matches HR's intent.
