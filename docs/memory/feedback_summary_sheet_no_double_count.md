---
name: Summary sheet col D is already the grand total — never sum per-employee columns on top of it
description: Each Monday-report Summary tab has col D = "Actual" total weekly hours (already aggregated across all employees). DO NOT also sum the per-employee "Actual" columns (col I, N, S, …) — that double-counts.
type: feedback
---

For Monday report (and any weekly hours lookup), the Summary sheet's **column D ("Actual") is already the grand total across all employees for that week**. It is NOT a single employee's hours and it is NOT a header.

**Pattern:**
- Col A = week label (W1, W2…)
- Col B = start date
- Col C = end date
- **Col D = Actual hours (TOTAL across all employees, already summed)**
- Col I, N, S, X, … = per-employee "Actual" columns (one per dev)

**Correct method:** read col D directly. Done.

**Wrong method:** sum col D + col I + col N + … — this double-counts (col D + each individual that's already in D).

**Why:** User caught the bug on 2026-05-11 — Marcel reported as 7.00h but actual was 3.50h (DuongDN Mon 1.50 + Wed 2.00). Script was summing col D total AND col I (DuongDN's column), producing exactly 2x the real hours. ALL 8 Monday-report submissions on 2026-05-11 went to TEST form with doubled hours and had to be re-submitted with corrected values:
- Maddy 32.00 → 16.00
- Aysar Baamboozle 47.66 → 23.83
- James Diamond 136.00 → 68.00
- Bailey 162.50 → 81.25
- Marcel 7.00 → 3.50

Marcel was easiest to spot because only one dev (DuongDN) had hours that week, making the 2x ratio obvious.

**How to apply:**
1. **Single API call:** `Summary!A6:D60`. Read col D for the row where col B matches reporting week's Monday. That's the answer.
2. **Verification:** cross-check against `W{n}!H2` (the W-tab's "Total Hours" header cell) — they should match exactly. If they differ, something is wrong with the sheet, not your code.
3. **Never** re-sum per-employee cols on top of col D. Per-employee cols are useful for owner-level breakdown (e.g. who worked which day) but not for the project total.
4. Pair with `feedback_tasklog_summary_sheet` (the original "use Summary tab" rule). This memory adds: "and read col D ONLY, do not also sum the per-employee Actual columns".
