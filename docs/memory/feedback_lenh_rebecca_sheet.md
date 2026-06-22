---
name: LeNH also logs hours in Rebecca (William Bills) sheet
description: LeNH works on Rory+Franc+Rebecca ONLY — NOT Aysar (Aysar owner = KhanhHH, confirmed 2026-06-09). Hours found via col G (Owner=LeNH), NOT special Q-T cols.
type: feedback
---

LeNH logs hours across 3 sheets (NOT 4 — Aysar belongs to KhanhHH):
1. Rory: 1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8
2. Franc: 1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ
3. **Rebecca (William Bills): 1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4**

**⚠️ CORRECTED 2026-06-22:** The old claim "LeNH is in columns Q-T" was **wrong**. Inspecting the Rebecca sheet W29 tab (A1:T80) revealed that columns M-Q contain sign-off confirmation headers ("Xác nhận hoàn thành task log ngày"): DuongDN=col M, TriNM=col N, LeNH=col O, TuanNT=col P, LongVV=col Q. These are approval checkboxes, NOT task log hours. LeNH's actual task hours are in col G (Owner="LeNH") rows, col H (Actual), same as every other developer.

**Why:** User confirmed 2026-06-09: "LeNH is Franc and Rory." Aysar sheet owner = KhanhHH per [[feedback_aysar_sheet_owner_is_khanhhh]]. Old memory incorrectly listed Aysar as a LeNH sheet. Q-T column claim was never verified against actual sheet structure.

**How to apply:** When computing LeNH combined daily hours, scan Rory + Franc + Rebecca sheets and filter each by col G (Owner) = "LeNH", sum col H (Actual hours). Never include Aysar. Alert if total across all 3 is 0h with no leave.
