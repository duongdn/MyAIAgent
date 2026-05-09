# Tax Check — 2026-05-09 (settlement year 2025)

## Sources
- Sheet: `QT_TNCN_2025_NIK - DuongDN.xls` — BANGLUONG tab, row for **Đoàn Nguyên Dương**
- Payslips: 12 emails for 2025 (of 52 total across all folders in `duongdn@nustechnology.com`; INBOX: 50, important: 2)
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

## Per-month payslips (2025)
Per-month figures were NOT extracted — attachments are password-protected .ods files (passwords are embedded in each email body, e.g. `174318` for 04/2025). The fetch script only reads email body text.

| Month | Folder | Attachment | Status |
|---|---|---|---|
| 01/2025 | — | — | **MISSING** |
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
- None at the annual level. Sheet, deductions, taxable income, and PIT all reconcile exactly with the 7-bracket law.

## Missing data
- **Months without payslip in 2025 (any folder):** **01/2025 only** (1 of 13 months including 13th-month bonus)
- 08/2025 + 09/2025 found in `important` folder after re-scan across all 41 selectable folders
- **Other-year payslips found:** 2022: 10, 2023: 12, 2024: 13, 2026: 5
- **Per-month figures unavailable** — payslip .ods attachments are password-protected; passwords are in each email body (e.g. 04/2025 = `174318`)

## Unresolved questions
- 01/2025 payslip not in any folder — was it ever sent by HR? (12/2024 has 2 copies; 01/2026 also has 2 copies — possible HR sometimes resends a month and labels overlap.)
- Should the skill decrypt .ods attachments (libreoffice headless or `odfpy` with the per-email password) and reconcile per-month gross / insurance / tax-withheld against the sheet annual totals?
- Sheet's "Từ tháng / Đến tháng" cells are empty — confirm settlement period covers full Jan–Dec 2025.
- Insurance 11,340,000 VND ≈ 945k/month — verify against your BHXH/BHYT/BHTN ceiling (cap base typically 36M/month → ~3.78M/month employee-side, much higher than 945k). Worth checking whether sheet captures only one insurance category.
