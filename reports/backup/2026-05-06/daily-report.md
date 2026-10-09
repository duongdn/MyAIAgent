# Daily Report — 2026-05-06 (Wed) 08:30 (+07:00)

**Window:** 2026-05-05T09:30:00+07:00 → 2026-05-06T08:28:55+07:00 (~23h)
**Reporting day:** Tue 2026-05-05

## Critical Alerts

| Sev | Source | Item | Notes |
|---|---|---|---|
| HIGH | rick@ Rollbar | **Fountain Gifts (FirstProject) #878 'amount' TypeError persistent** | 5× 10-in-5min bursts (02:52 / 14:32 / 17:14 / 21:15 / 22:10). Day-2 of yesterday's spike — likely deploy regression. Rick mail item LEFT INCOMPLETE. |
| HIGH | rick@ Rollbar | **4 new prod errors FirstProject** | #1001/#1002 null `gift_main` (04:54), #1003/#1004 null `title` (16:04). Single deploy/data-shape change suspected. |
| MEDIUM | Sheets | **LeNH Tue 05/05 — 4h logged + 7.17h Upwork unlogged** | RE-SCAN 11:14: LeNH actually has 4h logged on **Franc W23** (Turkish-version master device — matches Carrick's RDC Slack). Upwork still shows additional 4.5h Rory + 2.67h Aysar tracked but unlogged. Net: ~4h missing in Rory/Aysar sheets. Severity downgraded from HIGH. Reminder still valid. |
| MEDIUM | Slack swift | bxr__app Twilio compromise active | Carrick mitigated (Fraud Guard, Geo UK-only, app bypass); Rory escalated late: invalid phone numbers, "thorough investigation at no cost"+ how to unblock. Rory + swift items SKIPPED. |
| ~~MEDIUM~~ | ~~Sheets~~ | ~~LongVV Tue 4h (-4h short, no leave)~~ | **CORRECTED 09:18:** User confirmed LongVV is on PARTIAL schedule W25 — sub-8h is expected. Maddy Trello item now COMPLETED. Reminder already sent (cannot unsend). |
| MEDIUM | Fountain | Day 2 W25 — multiple concerns | ViTHT 0h Tue (no log), VuTQ still 0h, QC −6.3h behind pace, customer comments +8 overnight, backlog +190h broader (#2869 80h, #2870 40h, #2871 30h NEW), hard-to-release pool 2→3 cards. Fountain item SKIPPED. |
| ~~LOW~~ | ~~Sheets~~ | ~~KhanhHH Tue 6.5h (-1.5h short, no leave)~~ | **CORRECTED 09:18:** User said "KhanhHH works multiple projects now". Scan of all known sheets found Generator W39 only (5 distinct tasks = 6.5h). Additional sheet TBD. Elliott Trello item now COMPLETED. Reminder already sent. |
| LOW | carrick@ | 4 new Redmine bugs Generator/Elliott | All "Tested on Internal Staging" — normal QA queue. |
| LOW | Upwork | Bailey-VietPH Mon over-log +2.5h | 5.5h Upwork vs 8h log Mon — verify offline work. |
| LOW | Upwork | Neural Contract mid-week ping pending | No new client msgs since Apr 24. Suggested ping today. |

---

## 1. Email — see [_piece-email.md](./_piece-email.md)

| Account | Count (window) | Filtered | Key |
|---|---:|---:|---|
| duongdn | 5 | 0 | No leave, no New Relic |
| carrick | 6 | 4 | 4 Redmine Generator/Elliott (staging) |
| nick | 23 | 0 | 0 John Yi mail; Azure DevOps + candasurveyors digests |
| rick | 22 | 11 | **HIGH** 11 prod Rollbar (Fountain Gifts/FirstProject) |
| kai | 3 | 3 | LIFM2-438 assigned, LIFM2-431 perf ticket |
| ken | 201 | 29 | 29 Precognize PR threads (newsletter) |

**Trello "Check mail" card:** https://trello.com/c/7PhgAuT9/777-check-mail
- ✓ completed: DuongDn, Carrick, Nick, Kai, Ken (5)
- ⚠️ skipped: **Rick** (FirstProject prod regression Day 2)

## 2. Slack — see [_piece-slack.md](./_piece-slack.md)

14/14 workspaces healthy. 100 msgs total. Tokens all valid (no refresh).

| Workspace | Msgs | Key |
|---|---:|---|
| Baamboozle | 2 | Off-topic only; Aysar idle. GH web-app 49 open (0 new in window), bbzl-web-client 0 |
| RDC | 6 | Carrick branched `latest-template`, İzmir + Turkish-version master plan |
| Swift | 23 | **MEDIUM** Twilio compromise — Carrick mitigated; Rory escalated late |
| Xtreme | 4 | Madhuraka urgent LIFM2-438; **Kai daily progress post missing** (16h/wk, flag-only) |
| SamGuard | 1 | Michelle: BE import fix working; FE/autoscan pending Kfir |
| GGS | 29 | Joey+Nick AWS→Scaleway/OVH brainstorm; Order 37525 sync fix tomorrow |
| AmazingMeds | 7 | Nick advising John Yi on WooCommerce Subscriptions; Nick posted today |
| Generator | 5 | Violet daily update posted (Bookables mobile, 816 Event Cal, 824 Invoices) |
| LegalAtoms | 15 | Alpha-server outage their internal team (Talha+Raymond) — RESOLVED 02:43 |
| MPFC | 1 | Freelancer confirmed APIs ready |
| WilliamBills | 2 | Oliver/Lucas MWMX CMS payment Q&A |
| Equanimity | 2 | xidtech validation rule confirm; Marcel idle, CloudWatch reminder pending |
| SoCal | 0 | Silent (normal) |
| Aigile | 3 | Bot/automation only |

**WordPress samguard.co:** clean (0 JS errors / 0 CSP violations).

## 3. Discord — see [_piece-discord.md](./_piece-discord.md)

Both tokens (nusvinn, nuscarrick) verified.

| Server | Msgs | Key |
|---|---:|---|
| AirAgri | 267 (webapp 218 + flutter 49) | **Vinn daily report ✓** ("Just report my process today:" 17:15 — PR reviews, S3 uploads, hazard cron deployed prod); **Jeff daily report ✓** (17:30 — 8h Visitor app fix, map areas-only, MyView API; iOS TF 1.0.3) |
| Bizurk | 6 (DM @animeworld) | Upwork contract chat WordPress + Angular mockup; Carrick active, Andrew silent (low-activity normal) |

## 4. Sheets — see [_piece-sheets.md](./_piece-sheets.md) — for Tue 05/05

| Dev | Tue 05/05 | Status |
|---|---|---|
| LongVV | Maddy 0h + JD 4h = **4.00h** | OK (partial schedule W25 — user 09:18) |
| PhucVT | 8.00h JD | OK |
| TuanNT | JY 6.5h + Rebecca 1.5h = **8.00h** | OK |
| VietPH | 8.00h Paturevision | OK |
| **KhanhHH** | **Generator 5.33h + Aysar 2.67h = 8.00h** | **OK** (cross-project — initial scan missed Aysar) |
| **LeNH** | **Franc 4.00h = 4.00h logged** (+ 7.17h Upwork tracked Rory/Aysar unlogged) | ⚠️ MED — back-fill Rory/Aysar |

> **Note (RE-SCAN 11:14):** Cross-project aggregation via `scripts/sheets-all-employees-cross-project-tue-may5.py`. Static dev→sheet mapping no longer holds (per user — dev assignments now flexible week-to-week). Previous Sheets piece findings revised: KhanhHH +Aysar 2.67h, LeNH +Franc 4.00h were missed. Other devs unchanged. New rule saved to memory: scan all sheets every run, aggregate by Owner col G.

### Other devs found in cross-scan (not target list):

| Dev | Total | Where |
|---|---:|---|
| AnhNH2 | 8.00h | JamesDiamond |
| NamNN | 8.00h | Generator |
| DatNT | 7.00h | Fountain |
| ThinhT | 4.00h | Fountain |
| NghiepNQ | 3.00h | Generator |
| PhatDLT | 2.00h | Fountain (QC) |
| ViTHT | 0.00h | Fountain (no Tue log — flagged) |
| HungPN | 0.00h | Fountain (covered by PhatDLT) |
| VuTQ | 0.00h | Fountain (no rows — flagged) |

Direct verification confirmed via `scripts/sheets-tue-may5.py` + `sheets-tue-may5-deep-verify.py`. No "Nghỉ" leave markers.

## 5. Scrin.io — see [_piece-scrin.md](./_piece-scrin.md)

- Tue 05/05: TuanNT/John Yi Scrin = 6h 29m (6.48h) | Task log JY = 6.5h | **Status OK** (≈match, ~1min rounding artifact).

## 6. Fountain (5-part) — see [_piece-fountain.md](./_piece-fountain.md) — DONE_WITH_CONCERNS

| Part | Status |
|---|---|
| 1. Matrix Plan | ✓ W25 plan UNCHANGED since 05-04 11:56 by @trinhmtt — ViTHT 40h, VuTQ 8h, ThinhT 20h, DatNT 40h, QC 27h. Token refreshed via `scripts/matrix-token-refresh.js`. |
| 2. Task Log Actuals (W25 D1+D2) | ViTHT 8h (no Tue log), DatNT 14.5h, ThinhT 8h, **VuTQ 0h Day 2**, PhatDLT 4h, HungPN 0.5h. Mon 22.5h, Tue 14h. Total 36.5h Task dự án. |
| 3. Plan vs Actual | ViTHT −8h behind (no Tue log), VuTQ still 0h (8h plan), QC **−6.3h behind** pace. DatNT/ThinhT on pace. |
| 4. Capacity & Runway | NS+IP remaining = **250.75h** (+70.5h). Broader = **450.50h** (+190.5h). Runway **5.22 wk** @48h/wk. New tasks added: #2869 80h NEW, #2870 40h NEW, #2871 30h, #2587 Pending 36.5h, #2854 expanded 40→60h. |
| 5. Over-estimate | All 6 tracked tasks STABLE. #2816 +1.5h (109% over), #2837 +2h (59% over) — minor cleanup band. **No STILL GROWING flags.** |

**Fountain Trello board** ([UDrSWage](https://trello.com/b/UDrSWage)): 71 active (+1). Customer comments **+8 overnight** (kunal +4, tmmckay +2, mike +2 NEW Shipstation [BYu5iwQM](https://trello.com/c/BYu5iwQM)). Stuck −2 (50). Hard-to-release **+1**: [clSdoRlL](https://trello.com/c/clSdoRlL) 32.7d, [WGsYqu5h](https://trello.com/c/WGsYqu5h) 20.9d, [g5SK007L](https://trello.com/c/g5SK007L) 14.5d NEW. Bugs +1, Not Passed +1.
[NoMethodError pro_cart_items](https://trello.com/c/aVOTR4WR): ViTHT fix Dev Done — customer not yet notified.

## 7. Elena — see [_piece-elena.md](./_piece-elena.md)

- **Elena (duongdn):** 0 open / 0 merged. Last deploy was PR #299 on 2026-04-07. No deploy executed today.
- **Precognize (nusken):** 0 nusken-authored open PRs. 7 team-PRs visible. Since 05-05: #4870 merged (SR-7277 nusdavid), #4876 newly opened (mahkris develop-9.3 merge). 6 of yesterday's 7 still open.
- **WordPress samguard.co:** clean (0 errors / 0 CSP violations / 0 page errors via headless Chrome).

## 8. Upwork — see [_piece-upwork.md](./_piece-upwork.md) — DONE_WITH_CONCERNS

| Workroom | Hours (week May 4-10) | Task log | Status | URL |
|---|---|---|---|---|
| Rory (LeNH) | 4:30 (Tue 4.5) | 0.00h | **DISCREPANCY** -4.5h, back-fill | [link](https://www.upwork.com/nx/wm/workroom/41069448/messages) |
| Aysar (LeNH) | 6:30 (Mon 3.83 + Tue 2.67) | 6.50h | OK matches | [link](https://www.upwork.com/nx/wm/workroom/35642393/messages) |
| Bailey-VietPH | 13:50 (Mon 5.5 + Tue 8 + Wed 0.33) | 16.0h | **OVER-LOG** Mon +2.5h | [link](https://www.upwork.com/nx/wm/workroom/42545630/messages) |
| Bailey-DuongDN | 0:00 | 0h | inactive expected | [link](https://www.upwork.com/nx/wm/workroom/43093775/messages) |
| Neural Contract | 0:00 (msg) | n/a | NO new client msg | [link](https://www.upwork.com/nx/wm/workroom/38901192/messages) |

Neural Contract: last client msg Apr 24 ("Enjoy your holiday"); Apr 23 Compare-module fix never confirmed. Mid-week ping pending. Memory note: Aysar marked "inactive ~Mar 9" but actively logging — memory needs update.

## 9. Trello — see [_piece-trello.md](./_piece-trello.md)

**Check progress card:** https://trello.com/c/MXVnzsQX/776-check-progress

- ✓ completed (17 after corrections): Blake, John Yi, James Diamond, Aysar, Franc, MPFC, Marcel, Elena SamGuard, Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Elena WordPress, **Maddy** (LongVV partial schedule W25 — corrected 09:18), **Elliott** (KhanhHH multi-project — corrected 09:18).
- ⚠️ skipped (2): **Rory** (Swift Twilio + LeNH unlogged), **Fountain** (5-part concerns).

**Check mail card:** https://trello.com/c/7PhgAuT9/777-check-mail
- ✓ completed (5): DuongDn, Carrick, Nick, Kai, Ken
- ⚠️ skipped (1): **Rick** (FirstProject prod regression)

## 10. Reminders Sent

- **LeNH** → `!OIrgPraJWrcDTnRVLQ:nustechnology.com` (event `$zDDBLczMnR-zoHufC2JjRT3hvReagVnC-ajcLQ2yCmE`) — Tue 05/05 4h Franc logged but 7.17h Upwork tracked on Rory/Aysar still unlogged. Reminder body claimed 0h sheets — **slightly inaccurate** (4h Franc was logged) but back-fill still warranted.
- **LongVV** → `!mYZBGNoLFVpMVIJtPu:nustechnology.com` (event `$Z0fvrCPhGatpj9pyuaiKJ7b7szvNfWoaZxJgRDm6UaE`) — **WRONGLY SENT.** User clarified at 09:18 that LongVV is on partial schedule W25; sub-8h is expected. Cannot unsend. Memory updated to suppress for the rest of W25.
- **KhanhHH** → `!rwLbvLBnrRAYMaOPaD:nustechnology.com` (event `$ki9wxCroi0LQSLoytJwrEDE1S9LIb48lzNSQFtn0n6I`) — **WRONGLY SENT.** User clarified at 09:18 that KhanhHH works multiple projects; scan found Generator W39 only (additional sheet TBD). Cannot unsend. Memory updated.

---

## Unresolved Questions

1. **Fountain Gifts #878 'amount' TypeError** — was a fix deployed yesterday? If yes, regression. If no, this is Day 2 of same client-blocking issue. Needs Rick/Kunal triage.
2. **VuTQ 0h Day 2** — small W25 plan (8h) so not yet alert; if still 0h Wed close → escalate.
3. **ViTHT 0h Tuesday** — delayed log entry, sick day, or genuine off-day? Worth pinging team.
4. **Swift bxr__app Twilio** — does Carrick have a Twilio support ticket open to lift suspension? Rory's "how to get unblocked" remained unanswered.
5. **#2869 (80h) + #2870 (40h) Fountain new tasks** — status empty, need triage to NS or scope confirmation.
6. **Bailey-VietPH Mon over-log** — is offline (non-Upwork) work allowed in the task sheet, or does the +2.5h need reconciling?
7. **NoMethodError pro_cart_items** — ViTHT fix Dev Done, recommend QC fast-track + notify kunalsheth.
8. **Memory update** — Aysar contract no longer "inactive Mar 9" (actively logging); update `reference_upwork_workrooms.md`.
9. **Microsoft account OTP to nick@** at 06-May 01:14 — unsolicited? Verify with Nick.
10. **KhanhHH additional project sheet** — what sheet ID is the second project on? Currently mapped to Generator only (`1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM`). Needed to compute KhanhHH's full daily total going forward.
11. **LongVV W25 schedule** — duration of partial-schedule? Just W25 or ongoing? Memory currently scoped to W25 only.
12. **Should I send a follow-up Matrix correction** to LongVV / KhanhHH rooms apologizing for the wrong reminder? (Doing nothing is also fine — just wanted to confirm.)
