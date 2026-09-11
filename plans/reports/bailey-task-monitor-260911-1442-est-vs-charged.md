# Bailey Task Monitor — 2026-09-11 14:42

Source: https://docs.google.com/spreadsheets/d/1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg/edit?gid=920993260#gid=920993260

Note: script's Task-ID-WS join is broken for most rows (col C empty or non-matching for older tasks), so it reported "no WS data" for most active items. Re-joined manually by normalized task name against fresh Workstream fetch — filled in below.

## Section 1: Released but Not Paid (3)

| Task | Dev | Actual (WS) | Status | Link |
|---|---|---|---|---|
| [Prestashop] Sync queue issue | TuanNT | 5.25h | Deployed on Live | [Slack](https://globalgrazingservices.slack.com/archives/D01C1253PFB/p1785399292074149) |
| [Console] Console Pallet Barcode Uniqueness | VietPH | 3.5h | Tested on Live | [Trello](https://trello.com/b/l6s36zki) |
| [Console] [Maintenance] Incorrect Total Purchase Price on PO | VuTQ | 1h | Tested on Live | [Slack](https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1781703064177529) |

⚠️ No release-date info in sheet to compute age — flag for follow-up if needed.

## Section 2: Tasks with Bugs (2)

| Task | Dev | Type | Est (buffer) | Actual | Overbudget? | Link |
|---|---|---|---|---|---|---|
| [Console] PO - Purchase Price Change Logging & Notification | VietPH | Fixed (base 10h) | 12.4h | 5.5h | No — under budget | [Trello](https://trello.com/c/inki7bWV) |
| [Console] [Maintenance] Console Platform Upgrade | VuTQ | Hourly | — | 205.25h | N/A (hourly, no budget cap) | [Slack](https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1776417235335789) |

## Section 3: Hourly Tasks In Progress, by Actual Hours (unpaid)

| Task | Dev | Actual (WS) | Status |
|---|---|---|---|
| [Console] [Maintenance] Console Platform Upgrade | VuTQ | 205.25h | Has Bug on Staging |
| [Console] [Maintenance] Console Platform Upgrade Rail 7 | VuTQ | 92.5h | In-progress (>50%) |
| [Mobile] [Maintenance] Mobile Platform Upgrade | LuHX | 64h | Testing |
| [Prestashop] Sync queue issue | TuanNT | 5.25h | Deployed on Live |
| [Console] [Maintenance] Incorrect Total Purchase Price on PO | VuTQ | 1h | Tested on Live |
| [Maintenance] Apply AWS Glacier for backup on Prestashop | — | no WS data | Pending (task marked "stopped, not doing" in sheet notes) |
| Grazing Software - CR08 | — | no WS data | Pending (sheet notes: investigated, no solution found) |
| [Maintenance] Console resources maintenance Feb 2026 | HaVS | no WS data | Dev Done |

Top candidates for partial-payment request (highest unpaid hourly hours): Console Platform Upgrade (205.25h) and Console Platform Upgrade Rail 7 (92.5h) — both VuTQ, both large ongoing efforts.

## Unresolved questions
- No Matrix room referenced this run — skipped step 4.
- Release dates unavailable in sheet for Section 1 aging calc.
- Script's WS-actuals join (by Task ID WS column) is broken for ~most rows — worth fixing scripts/bailey-task-monitor.py to fall back to name-normalized matching.
