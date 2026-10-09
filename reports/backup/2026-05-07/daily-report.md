# Daily Report — 2026-05-07 (Thu) 08:35 (+07:00)

**Window:** 2026-05-06T08:30:00+07:00 → 2026-05-07T08:22:00+07:00 (~24h)
**Reporting day:** Wed 2026-05-06

## Critical Alerts

| Sev | Source | Item | Notes |
|---|---|---|---|
| HIGH | rick@ Rollbar | **NEW: FountainGifts Redis::TimeoutError burst** | #32 10-in-5min @ 07:05 + #265 NEW @ 07:08 — Redis infra/connection issue, immediate triage. Rick mail SKIPPED. |
| HIGH | rick@ Rollbar | **FirstProject #875 `e?.credit` null bursts** | 10-in-5min @ 00:46 and 07:20 — recurring null-deref. (Yesterday's #878 'amount' improving — only 1 burst today vs 5.) |
| HIGH | Sheets/Scrin | **TuanNT 0h Wed 06/05 — but Scrin shows 5.57h** | Scrin tracked 5h 34m on Authorize.net work (project untagged); task log empty across JohnYi+Rebecca+Paturevision. Reminder sent. John Yi + Rebecca items SKIPPED. |
| MEDIUM | Slack williambills | **Oliver escalating client friction** | Lucas invoice "vague/wild", recurring bugs needing Quan after-hours, **prod payment Order #355152 fail**. Rebecca SKIPPED. |
| MEDIUM | Slack swift | **Twilio mitigation NOT yet deployed** | Carrick plan ready (rate-limit, UK/US/EU whitelist, BXR signup confirmed not source); code fix not deployed within window. Rory + Swift SKIPPED. |
| ~~MEDIUM~~ | ~~Slack baamboozle + Upwork~~ | ~~Aysar idle + LeNH Aysar 3.83h Upwork unlogged~~ | **CORRECTED 09:08:** KhanhHH logged Aysar 3.83h Wed (W23 R36, "Change Team Ownership #533"). Sheets agent missed it (looked at W25 — Aysar uses different week numbering). Aysar Trello item now ✓ COMPLETED. |
| LOW | Slack generator | Generator prod Laravel error assigned Carrick | MobileEventResource:38 null-property in prod logs (open) — informational, Carrick handling. ~~KhanhHH 4h~~ corrected to 7.83h (Generator 4 + Aysar 3.83). Elliott Trello item now ✓ COMPLETED. |
| MEDIUM | Fountain | **Bugs +5 + customer comments +12 + ViTHT/QC behind** | Bugs +5 overnight (HOT); kunal 7 + tmmckay 4 + mike 1 customer comments incl confirmation-email bug pinged twice; ViTHT Wed 0h (no log), QC −9.7h pace. Hard-to-release 4 cards (clSdoRlL 33.7d). Fountain SKIPPED. |
| LOW | Slack aigile | Colin frustrated by ETZ delays | Hendrix again "by tomorrow" — risk if slips. Colin completed (warning logged not blocking). |
| LOW | kai@ | Madhuraka Quote Tool MVP NEW | LIFM2-409 + LIFM2-434 — informational. |
| MEDIUM | Sheets | **KhanhHH 7.83h Wed (−0.17h short)** | Generator 4h + Aysar 3.83h = 7.83h, no leave. Per memory rule, any sub-8h shortfall triggers reminder. Reminder sent (event `$w9Aa3_UKSg2m3QnjFKylndHckTt-bfFfPrrzvWv-in8`). KhanhHH's 2nd project confirmed = **Aysar**. |
| LOW | Upwork | Bailey-VietPH +2:50h offline Wed | 8h Sheets vs 5:10 Upwork — same pattern as Mon (+2.5h). Verify offline work. |

---

## 1. Email — see [_piece-email.md](./_piece-email.md)

| Account | Count | Filtered | Key |
|---|---:|---:|---|
| duongdn | 0 | 0 | Anomalously quiet (no leave, no New Relic) |
| carrick | 3 | 2 | 2 Redmine Generator/Elliott (#78232, #78143) staging |
| nick | 19 | 0 | **0 John Yi mail**, candasurveyors digests + Shopify/Slack noise |
| rick | 23 | 10 prod | **HIGH** Redis::TimeoutError NEW + #875 null bursts; #878 improving |
| kai | 13 | 4 | LIFM2-409 + LIFM2-434 NEW (Quote Tool AI MVP) |
| ken | 211 | 24 | 24 Precognize PR threads across 6 PRs (4879, 4881-83 new, 4876, 4859) |

**Trello "Check mail" card:** https://trello.com/c/vYMJ64dn/780-check-mail
- ✓ completed (5): DuongDn, Carrick, Nick, Kai, Ken
- ⚠️ skipped (1): **Rick** (Redis NEW + #875 null bursts)

## 2. Slack — see [_piece-slack.md](./_piece-slack.md)

14/14 workspaces healthy. ~204 msgs total. Tokens all OK on first verify.

| Workspace | Msgs | Key |
|---|---:|---|
| Baamboozle | 0 | **Aysar idle.** GH baamboozle-web-app 49 open (0 new in window), bbzl-web-client 0 |
| RDC | — | Normal (LeNH Franc work continued) |
| Swift | — | **MEDIUM** Carrick Twilio mitigation plan (rate-limit + UK/US/EU); BXR signup not source; code fix NOT deployed yet |
| Xtreme | — | Madhuraka pinged Kai 4 tickets unanswered (Kai 16h/wk — flag-only, not strict alert) |
| SamGuard | 1 | Michelle BE import fix; FE/autoscan still pending Kfir |
| GGS | — | Joey/Nick AWS→OVH brainstorm continued |
| AmazingMeds | — | Nick advising John Yi (TuanNT 0h log though) |
| Generator | — | **MEDIUM** Laravel MobileEventResource:38 prod null-property assigned Carrick (open); Violet daily continued |
| LegalAtoms | 0 | Silent (alpha-server outage from yesterday RESOLVED) |
| MPFC | — | Freelancer APIs ready |
| WilliamBills | — | **MEDIUM** Oliver escalating Lucas invoice + recurring bugs + Order #355152 prod payment fail |
| Equanimity | — | Marcel idle CloudWatch (adhoc — normal) |
| SoCal | 0 | Silent (normal) |
| Aigile | — | **LOW** Colin frustrated ETZ; Hendrix "by tomorrow" again |

**WordPress samguard.co:** clean (0 JS errors / 0 CSP violations).

## 3. Discord — see [_piece-discord.md](./_piece-discord.md)

Both tokens (nusvinn, nuscarrick) verified.

| Server | Msgs | Key |
|---|---:|---|
| AirAgri | 147 (webapp 111 + flutter 36) | **Vinn daily report ✓** ("Just report my process today:" 10:17 — form upgrade/clone, PRs 376/378/380/381, Mary tasks, Jeff support, Brett escalation, Task 1 UI/validation); **Jeff daily report ✓** (10:20 — 4h Primary Area Filter + Asset Filter + map show/hide; next: Manage Views, Block Filter, deep link) |
| Bizurk | 0 | DM @animeworld silent (low-activity normal — last activity 2026-05-05) |

## 4. Sheets — see [_piece-sheets.md](./_piece-sheets.md) — for Wed 06/05

| Dev | Wed 06/05 | Per-sheet | Status |
|---|---|---|---|
| LongVV | **0.00h** | Maddy 0 + JD 0 | OK (PARTIAL W25) |
| PhucVT | 8.00h | JD 8 | OK |
| **TuanNT** | **0.00h** | JohnYi 0 + Rebecca 0 + Paturevision 0 | **HIGH ALERT** (Scrin 5.57h vs 0h log — reminder sent) |
| VietPH | 8.00h | Paturevision 0.5+2.5+5 | OK (Upwork +2:50 offline noted) |
| KhanhHH | **7.83h** | Generator 4 (2+1+1) + **Aysar 3.83** (KhanhHH "Change Team Ownership #533") | ⚠️ −0.17h short (reminder sent) |
| LeNH | 8.00h | Rory 4 + Franc 4 + Aysar 0 + Rebecca 0 | OK ✓ (Aysar Upwork 3.83h was actually KhanhHH's work) |

Other devs found in cross-scan: AnhNH2 4h JD, NamNN 8h Generator, ViTHT 0h Fountain, PhatDLT 2h Fountain, HungPN 0h Fountain, ThinhT 4h Fountain, DatNT 7.5h Fountain, LamLQ 2h Fountain, HaVS 1.75h. No "Nghỉ" markers.

## 5. Scrin.io — see [_piece-scrin.md](./_piece-scrin.md)

- Wed 06/05: TuanNT/John Yi Scrin = **5h 34m (5.57h)** — 3 sessions on Authorize.net payment work (project untagged "No project" — not tagged to John Yi).
- Task log JohnYi = 0h. **Discrepancy: 5.57h tracked but unlogged.** Reminder sent.

## 6. Fountain (5-part) — see [_piece-fountain.md](./_piece-fountain.md) — DONE_WITH_CONCERNS

| Part | Status |
|---|---|
| 1. Matrix Plan | ✓ W25 plan **UNCHANGED** since 05-04 11:56 by @trinhmtt — ViTHT 40h, VuTQ 8h, ThinhT 20h, DatNT 40h, QC 27h. Token refreshed via `scripts/matrix-token-refresh.js`. |
| 2. Task Log Actuals (W25 D1+D2+D3) | ViTHT 14.5h, DatNT 24h, ThinhT 12h, **VuTQ 5h** (8h plan), LamLQ 8h, PhatDLT 6h, HungPN 0.5h. **Wed: ViTHT 0h, VuTQ 0h still.** |
| 3. Plan vs Actual | DatNT/ThinhT/VuTQ on pace; **ViTHT −9.5h BEHIND** (no Wed log); **QC −9.7h BEHIND** (HungPN silent, PhatDLT carries). |
| 4. Capacity & Runway | **CORRECTED 09:13 (CR included).** NS+IP (24 tasks) total_est+CR = 483h, actual = 294.75h → **remaining 188.25h** (CR 30h on #2735 included). Broader (57 tasks incl Dev Done + Deployed Staging) total_est+CR = 1046h, actual 952.25h → **remaining 93.75h** (CR 43.5h total). Runway NS+IP **3.92 wk** @48h/wk; Broader **1.95 wk** @48h/wk. |
| 5. Over-estimate | **CORRECTED 09:13 (CR included).** Tasks where actual > (est+CR) by 20%+: #2615 +790% ($800h cap, 12h est, deployed staging), **#2595 GiftDrop +40%** (120h est, 168.25h actual, no CR), #2816 +119% (20h, 43.75h), #2501 +538%, #2380 +531%, #2639 +725%, #2624 +160%, #2702 +213% IP. **CR transformed:** #2735 (was +42%, now **+6%** with CR 30h — within margin), **#2837** (was +59%, now **0%** with CR 10.5h — exact), **#2815** (was +79%, now **+19%** with CR 3h — under 20% threshold). **No STILL GROWING flags.** |

**Fountain Trello board** ([UDrSWage](https://trello.com/b/UDrSWage)): 74 active (+3). **Bugs +5 overnight** (HOT). **Customer comments +12** since 05-06 08:30 (kunal 7, tmmckay 4, mike 1; 3 NEW threads incl confirmation-email bug pinged by both kunal and mike within 1h). Stuck 49 (−1). Hard-to-release **+1**: clSdoRlL 33.7d, WGsYqu5h 21.9d, g5SK007L 15.5d, admin/users#show 14.7d NEW. **Fountain item SKIPPED.**

## 7. Elena — see [_piece-elena.md](./_piece-elena.md)

- **Elena (duongdn):** 0 open / 0 merged. No deploy executed today. Last merge #300 on 2026-04-21.
- **Precognize (nusken):** 0 nusken-authored open PRs. 6 team PRs visible (down from 7). Diff vs yesterday: **#4876 merged**, **#4880 NEW** (SR-7232 recommendations new tag alerts, mahkris, opened 05-06). #4859 dropped off.
- **WordPress samguard.co:** clean (0 errors / 0 CSP violations / 0 page errors via headless Chrome).

## 8. Upwork — see [_piece-upwork.md](./_piece-upwork.md)

| Workroom | Hours (week May 4-10, Mon-Wed) | Wed | URL |
|---|---|---|---|
| Rory (LeNH) | 8:30 | 4.00 | https://www.upwork.com/nx/wm/workroom/41069448/messages |
| Aysar (LeNH) | 10:20 | 3.83 | https://www.upwork.com/nx/wm/workroom/35642393/messages |
| Bailey-VietPH | 18:40 | 5.17 | https://www.upwork.com/nx/wm/workroom/42545630/messages |
| Bailey-DuongDN | 0 | 0 | inactive expected |
| Neural Contract | 0 (msgs) | 0 | https://www.upwork.com/nx/wm/workroom/38901192/messages |

**Cross-check:**
- LeNH Wed Sheets 8h (Rory 4 + Franc 4) vs Upwork 7.83h (Rory 4 + Aysar 3.83). Rory matches. Aysar 3.83h Upwork tracked under LeNH's account but KhanhHH did the actual work (Aysar W23 R36) — sub-contract pattern.
- VietPH Wed Sheets 8h vs Upwork 5.17h → +2.83h offline (similar Mon +2.5h).
- Neural Contract: last client msg Apr 24 ("Enjoy your holiday"). No new since. Memory note: Aysar contract should be "active" (currently says "inactive ~Mar 9").

## 9. Trello — see [_piece-trello.md](./_piece-trello.md) for full breakdown

**Check progress card:** https://trello.com/c/c2i0AFj0/779-check-progress

- ✓ completed (15 after corrections): Maddy, Blake, James Diamond, Franc, MPFC, Marcel, Elena SamGuard, Raymond, Neural Contract, Bailey, Andrew Taraba, Colin, Elena WordPress, **Aysar** (KhanhHH logged 3.83h — corrected 09:08), **Elliott** (KhanhHH 7.83h — corrected 09:08)
- ⚠️ skipped (4): **John Yi** (TuanNT 0h vs Scrin 5.57h), **Rory** (Twilio code not deployed), **Rebecca** (TuanNT 0h + William Bills client friction), **Fountain** (Bugs +5 / customer +12 / hard-to-release 4)

**Check mail card:** https://trello.com/c/vYMJ64dn/780-check-mail
- ✓ completed (5): DuongDn, Carrick, Nick, Kai, Ken
- ⚠️ skipped (1): **Rick** (Redis::TimeoutError NEW + #875 null bursts)

## 10. Reminders Sent

- **TuanNT** → `!knbJbIKzXRJNGVFQNg:nustechnology.com` (event `$1BLJQ5NXSHzhZae8wLKn7qovQZopzWI60Xkr_z_A5WM`) — Wed 06/05 task log 0h despite Scrin tracking 5h 34m on Authorize.net work.
- **KhanhHH** → `!rwLbvLBnrRAYMaOPaD:nustechnology.com` (event `$w9Aa3_UKSg2m3QnjFKylndHckTt-bfFfPrrzvWv-in8`) — sent 09:09: Wed 06/05 7.83h (Generator 4 + Aysar 3.83), 0.17h short of 8h target, no leave note.

Skipped (per memory rules):
- **LongVV** — partial schedule W25, sub-8h expected
- **LeNH** — total 8h target met (Aysar Upwork hours actually KhanhHH's work)

---

## Unresolved Questions

1. **TuanNT Scrin "No project" tag** — the 5.57h tracked Wed was untagged rather than tagged to John Yi. Is this a tagging gap on TuanNT's side, or a project-config issue?
2. **FountainGifts Redis::TimeoutError NEW** — Redis infra outage or connection-pool exhaustion? Needs Rick/Kunal triage immediately.
3. **FirstProject #875 `e?.credit` null** — recurring (00:46 + 07:20 bursts). Same root cause as #878 'amount'? Coordinate with FE deploy.
4. **William Bills Order #355152 prod payment fail** — confirm Lucas/Quan diagnosis status; client (Oliver) escalating tone.
5. **Swift Twilio code fix deployment** — Carrick has plan, when does code ship? Customer-impact pending.
6. **Generator MobileEventResource:38** — prod assigned Carrick; ETA?
7. ~~ViTHT Wed 0h~~ — RESOLVED: don't speculate on individual Fountain dev 0h days; team/PM handles this internally.
8. ~~VuTQ Day 3 still 0h~~ — RESOLVED: VuTQ 5h Mon already covers most of 8h W25 plan; Wed 0h is normal.
9. **Confirmation-email bug** (Fountain) — kunal + mike pinged within 1h; severity? (production order flow)
10. **#2869 (80h) + #2870 (40h) Fountain** — status empty 2 days, triage owner needed.
11. ~~KhanhHH additional project sheet ID~~ — RESOLVED 09:08: KhanhHH 2nd project = **Aysar** (sheet 1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8). Memory updated.
12. **duongdn@ 0 emails** — anomalous quiet day; verify nothing missed (auth checked OK).
13. ~~Aysar memory update~~ — RESOLVED 09:18: `reference_upwork_workrooms.md` updated in both memory locations to reflect active status + KhanhHH sub-contract pattern.
14. **Microsoft account OTP nick@ 06-May 01:14** (carry from yesterday) — still unverified.
