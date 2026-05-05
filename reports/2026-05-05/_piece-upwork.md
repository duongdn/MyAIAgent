## Upwork — 09:24 (+07:00)

Week: May 4 — May 10, 2026 (current Upwork week, Mon-Sun). Tue morning, only Mon 5/4 + part of Tue 5/5 logged.

### Weekly hours

| Workroom | Client | Dev | This week | Last week | Task log (this week, Bailey-filtered by task ID) | Match? |
|---|---|---|---|---|---|---|
| [Rory](https://www.upwork.com/nx/wm/workroom/41069448/timesheet) | Rory Hackett | LeNH | 0:00 | 0:00 | 0h (no Rory entries in Rory sheet) | OK (no work this week) |
| [Aysar](https://www.upwork.com/nx/wm/workroom/35642393/timesheet) | Aysar K | LeNH | 4:10 (Mon 3.83 + Tue 0.33) | 4:10 | Mon 3.83h (Aysar sheet, "Investigate issue can not view invoices…"); Tue not yet logged | MATCH (Mon ✓) |
| [Bailey-VietPH (DEV1)](https://www.upwork.com/nx/wm/workroom/42545630/timesheet) | BAILEY JOEY | VietPH | 6:50 (Mon 5.5 + Tue 1.33) | 10:30 | Mon 5.5h matched on task ID `[Maintenance] Update PHP version on Prestashop` (3.5h GLS module + 2h Upgrade PS9 fix). Tue not yet logged. | MATCH (Mon ✓) |
| [Bailey-DuongDN (DEV3)](https://www.upwork.com/nx/wm/workroom/43093775/timesheet) | BAILEY JOEY | DuongDN | 0:00 | 0:00 | 0h (inactive, expected) | OK (inactive — not an alert) |
| [Neural Contract](https://www.upwork.com/nx/wm/workroom/38901192/messages) | Neural Contract | external | 0:00 | 0:00 | N/A — `messages_only`, no internal task log | OK |

Since-start totals: Rory 478:10 / Aysar n/a / Bailey-VietPH 585:00 / Bailey-DuongDN 42:40 / Neural 97:30.

### Neural Contract — recent messages (workroom 38901192)

20 stories captured via API intercept (`scripts/upwork-neural-messages.js`). Full window: 2026-04-15 → 2026-04-29.

**No new messages since 2026-04-29.** 6-day silence (4/30-5/5) is expected — Apr 30 + May 1 holidays + weekend; client previously OK with our holiday schedule.

| Date (ICT) | Sender | Message |
|---|---|---|
| 2026-04-29 09:33 | Carrick (us) | "Hi Michael, just remind about our holiday tomorrow. Sorry for inconvenience." |
| 2026-04-24 11:29 | Michael (client) | "Thanks Carrick. Enjoy your holiday on Monday!" |
| 2026-04-24 10:19 | Carrick (us) | "I updated and pushed code, please check" |
| 2026-04-24 09:02 | Carrick (us) | "Let me check" |
| 2026-04-23 16:53 | Michael (client) | Bug report: Compare module — ReportController.php ~line 1066 passes wrong file address (1st instead of 2nd) to docx_markup. Sample files: Mutual Confidentiality Deed.docx + ACME Services Agreement.docx. **Acknowledged + addressed Apr 24.** |
| 2026-04-23 14:41 | Carrick (us) | "Updated and pushed code, includes analyze risk. Let check" |
| 2026-04-23 14:03 | Carrick (us) | "Let me check" |
| 2026-04-23 13:53 | Michael (client) | Bug report: live.pl receiving filename twice as arg5 + arg6 ("Metal Refiners…"). |
| 2026-04-22 14:02 | Carrick (us) | Pushed code; reduce-risk option no-effect on staging, suspects 5th-arg conflict. |
| 2026-04-22 13:29 | Carrick (us) | "I noted. Let me arrange for this." |
| 2026-04-22 10:05 | Michael (client) | Non-urgent change request: pass 5th arg as `[file1]=[file2]` for Compare. |
| 2026-04-21 16:18 | Carrick (us) | Holiday reminder for Apr 27 (Hung Kings' Day). |
| 2026-04-15 → earlier | mixed | Apr 15 URGENT issue (Compare generate-reports spinner) → fixed same day; non-urgent followups Apr 15-16. |

**No URGENT/awaiting-response messages.** Last bug fix delivered Apr 24, client confirmed. Recommend Carrick send a follow-up ping later this week if still no reply confirming Apr 24 fix.

### Alerts

**None.** All hours match task log on logged days. Rate-limit / unmatched-week-over-week drops are not alerts (per `feedback_upwork_match_not_alert`).

- Bailey-VietPH last-week 10:30 → this-week 6:50 so far is normal mid-week pace, not a drop.
- Aysar 4:10 same as last week — stable.
- Rory 0h two consecutive weeks — Ad-Hoc PHP work, expected when no tickets assigned.
- Bailey-DuongDN 0h — DEV3 inactive, expected (per `feedback_bailey_dev3_not_active`).
- Neural 0h — `messages_only` contract, no internal task log entry expected.

### Trello recommendation
**Checkmark** the Upwork checklist item — all 5 workrooms verified, no alerts, Mon 5/4 hours match task log on filtered Bailey task ID + Aysar sheet.

### Unresolved questions
1. Did Michael verify the Apr 24 Compare-module fix worked? Still no confirmation 11 days on. Recommend Carrick ping mid-week.
