# Upwork Piece — 2026-05-06

Reporting day: Tue 2026-05-05 (Upwork week May 4 - May 10 2026)
Source: `node scripts/upwork-weekly-hours.js` + `scripts/upwork-tasklog-week-may4-10.py` + `scripts/upwork-neural-messages.js`

## Weekly Hours vs Task Log

| Workroom | Hours (week) | Task log (week) | Status | URL |
|---|---|---|---|---|
| Rory (LeNH) | 4:30 | 0.00h | DISCREPANCY -4.5h | https://www.upwork.com/nx/wm/workroom/41069448/messages |
| Aysar (LeNH) | 6:30 | 6.50h | OK | https://www.upwork.com/nx/wm/workroom/35642393/messages |
| Bailey-VietPH | 13:50 | 16.00h | OVER-LOG +2.17h (Mon) | https://www.upwork.com/nx/wm/workroom/42545630/messages |
| Bailey-DuongDN | 0:00 | 0.00h | inactive expected, OK | https://www.upwork.com/nx/wm/workroom/43093775/messages |
| Neural Contract | 0:00 (msg) | n/a | OK no new client msg | https://www.upwork.com/nx/wm/workroom/38901192/messages |

### Daily breakdown (Upwork tracked)
- Rory: Mon 0, Tue 4.5, Wed 0
- Aysar: Mon 3.83, Tue 2.67
- Bailey-VietPH: Mon 5.5, Tue 8.0, Wed 0.33
- Bailey-DuongDN: 0 all days (inactive contract — expected, NOT alert)
- Neural Contract: 0 all days (Carrick external dev, messages-only; no recent activity needed)

### Daily breakdown (Task log)
- Rory: ALL DAYS 0h (entire week empty in W10 sheet)
- Aysar: Mon 3.83, Tue 2.67 (matches Upwork exactly)
- Bailey-VietPH: Mon 8.0, Tue 8.0 (Mon over-logs Upwork by 2.5h)
- Bailey-DuongDN: 0 all days (matches)

## Neural Contract messages (in current week May 4-10)
- NONE. No new messages in this week.
- Last activity: Carrick sent Apr 29 09:33 ICT ("holiday reminder for tomorrow").
- Last client message: Apr 24 11:29 ICT Michael ("Enjoy your holiday on Monday").
- Apr 23 Compare-module fix never explicitly confirmed by client. Mid-week ping suggested per memory but not yet sent.

## Alerts

| Sev | Workroom | Item | Notes |
|---|---|---|---|
| MED | Rory (LeNH) | Task log missing 4.5h | Upwork shows Tue 05/05 4:30 tracked but W10 sheet completely empty. LeNH must back-fill task log for Rory work. |
| MED | Bailey-VietPH | Mon 05/04 over-log +2.5h | Upwork tracked 5.5h Mon but task log shows 8.0h. Either VietPH worked offline (acceptable if non-billable) or charged client more than tracked. Verify with VietPH whether the extra 2.5h was off-Upwork or needs adjustment. |
| LOW | Neural Contract | Mid-week ping not sent | Per memory, suggested mid-week check-in to Michael. No new messages from him since Apr 24. Carrick's last outgoing Apr 29. Consider sending status update today (Wed 05/06). |
| INFO | Bailey-DuongDN | 0h tracked | Expected — contract inactive. Not an alert. |
| INFO | Aysar | LeNH active 6.5h | Memory noted "inactive ~Mar 9" but workroom is now actively logging. Verify status — may need memory update. |

## Unresolved Questions
- Aysar workroom: memory said "inactive ~Mar 9" but LeNH logged 6.5h this week + 4.1h last week. Should monitoring memory be updated to mark Aysar as active again?
- Bailey-VietPH Mon over-log: is VietPH allowed to log non-Upwork-tracked offline work to the task sheet? If yes, no action; if no, the 2.5h needs reconciling.
- Neural Contract mid-week ping: should Carrick proactively send today, or wait for Michael's response from Apr 24?

**Status:** DONE_WITH_CONCERNS
**Summary:** Upwork weekly hours fetched from all 5 workrooms (Rory 4:30, Aysar 6:30, Bailey-VietPH 13:50, Bailey-DuongDN 0:00, Neural Contract 0:00). Neural Contract has zero new client messages this week (last Apr 24). Two task-log discrepancies flagged: Rory has 4.5h Upwork tracked but 0h in task log (LeNH back-fill needed), and Bailey-VietPH Mon over-logs Upwork by 2.5h (verify offline work). Aysar/Bailey-DuongDN match Upwork.
**Alerts:** MED Rory back-fill | MED Bailey-VietPH Mon +2.5h reconcile | LOW Neural Contract mid-week ping | INFO Aysar marked inactive in memory but actively logging.
