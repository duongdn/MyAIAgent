---
name: feedback_savings_already_matured_check
description: "money-report Portfolio/Allocation/Dashboard must flag savings books whose endDate is already in the past, not just list future maturities"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 040507ea-9dd2-4276-9187-4991241ed16e
---

When building the "Upcoming Maturities" section, also scan for savings books where `endDate < today` AND `currentAmount > 0` AND `inActive === false` — these are already-matured deposits still sitting idle, not future maturities. Report them in a separate "Already Matured — Needs Action" section, don't just silently drop them from the maturities list because their date is in the past.

**Why:** Confirmed 2026-07-06 — "nam á 6m" (8% rate, endDate 2024-06-01, balance 2,005,479 ₫) is `inActive: false` with a live balance but matured over 2 years ago. First pass excluded it entirely from Upcoming Maturities (correctly not "upcoming") but never surfaced it anywhere else either, so the user caught the omission ("mấy cái đáo hạn rồi ko có hiện ra" — the already-matured ones aren't showing).

**How to apply:** In the Portfolio report, Allocation report's "Upcoming decisions", and the dashboard's account table, always partition savings into three buckets: (1) active with future endDate → Upcoming Maturities, (2) active with past endDate + balance → Already Matured, flag with a warn-style badge, note it's likely earning no/reduced (non-term) interest rate and needs closing+redeposit, (3) inactive/zero balance → ignore. See [[feedback_money_report_html_dashboard]] and [[feedback_misa_money_report_net_worth_bugs]] for related conventions.
