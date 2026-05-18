# Daily Report — 2026-05-18 (Monday)

**Run started:** 08:28 +07  
**Window:** 2026-05-16 08:00 +07 → now (Mon start = last Fri 8AM)  
**Last daily report:** 2026-05-15T08:50 +07 (Thu)

---

## Summary

**Run completed:** 08:58 +07 | **Window:** 2026-05-16 08:00 → 2026-05-18 08:58 +07 | **Note:** May 16-17 = weekend; last workday = Fri May 15

### Alerts

| Severity | Item | Action |
|----------|------|--------|
| ⚠️ HIGH | **VuTQ leave request** — submitted duongdn inbox 07:55 today | Review & approve |
| ⚠️ HIGH | **Fountain LamLQ W26: 9.25h vs plan 20h (-10.75h)** — no leave note | Follow up |
| ⚠️ MED | **carrick GitLab PAT expires ≤7 days** | Rotate token |
| ⚠️ MED | **LeNH W26 shortfall** — Wed -1.67h, Thu -0.50h, Fri -0.50h | Reminder sent ✓ |
| ⚠️ MED | **Fountain #2735 still growing** — ~136.50h vs 120h Est+CR (+14%) | Monitor |
| ⚠️ MED | **Fountain confirmation email bug** — multiple customers (May 12+15) | Rick/team |
| ℹ️ INFO | Fountain W27 Matrix plan not posted (08:53 check) | Re-check after 09:30 |
| ℹ️ INFO | Fountain runway +4.4 wks (new task volume added) | Normal expansion |
| ℹ️ INFO | Generator batch 2 may slip to May 18 | Elliott/Violet monitoring |
| ℹ️ INFO | Swift iOS BXR released ✓; UAE work + staff access pending | Carrick to respond |
| ℹ️ INFO | Precognize NPE fix PRs #4927/4928/4929 (SR-7198) by majdhajjo08 | ken@ tracking |

### Trello

| Card | Result |
|------|--------|
| Check Mail | ✓ All 6 items complete |
| Check Progress | ✓ 16/17 complete, 1 skipped (Fountain) |

### Elena

PR #302 (DP-667) merged + deployed to MayBanServer ✓. samguard.co clean ✓.

### Reminders

LeNH: ✓ sent (W26 shortfall 3 days). All others: not needed.

---

<!-- PIECES BELOW — appended as results come in -->

---

## Email — 08:34 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 1 | VuTQ leave request ("Xin nghỉ phép") |
| carrick | 2 | GitLab PAT expiring ≤7 days |
| nick | 8 | No John Yi emails |
| rick | 6 | Rollbar daily digests: InfinityRoses (Sat+Sun), FountainGifts (Sun+Mon) — routine |
| kai | 8 | 5 Jira + 3 Bitbucket from Madhuraka — LIFM2-409/432/437/438, PR#490 |
| ken | 5 | Precognize PR #4927/4928/4929 — NPE fix SR-7198 by majdhajjo08 |

**Details:**
- duongdn: VuTQ — "Xin nghỉ phép" leave request at 07:55 +07 (2026-05-18). Action needed.
- carrick: GitLab "personal access tokens expire in ≤7 days" (May 17). Rotate before expiry.
- nick: No John Yi emails. 8 other emails, unrelated.
- rick: 4 Rollbar daily digest emails (routine summaries, no individual error spikes flagged).
- kai: Madhuraka active Sunday — Jira mentions on LIFM2-409, 432, 437, 438; Bitbucket PR#490 (LIFM2-430, xtreme-web/rms).
- ken: majdhajjo08 opened PRs #4927, #4928, #4929 (NPE fix, SR-7198) within ~10 min on May 17 21:00. Active PR cluster.

**Alerts:**
- ⚠️ [HIGH] VuTQ leave request — needs review/approval (duongdn inbox)
- ⚠️ [MED] carrick GitLab PAT expires ≤7 days — rotate token
- ℹ️ [INFO] rick Rollbar digests — routine, no error spike detected
- ℹ️ [INFO] kai Jira/Bitbucket active (Sunday Madhuraka activity)
- ℹ️ [INFO] ken Precognize NPE fix PR cluster (SR-7198)

Trello Check Mail: pending (will complete after all pieces done)

---

## Discord — 08:32 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | 2 (webapp), 0 (flutter) | Vinn report: **NO** (last 2026-05-15). Jeff report: **NO** (last 2026-05-15). Vinn online 08:32 asking questions but no formal daily report yet. |
| Bizurk | nuscarrick | 0 | Andrew DM (animeworld): no msgs since May 11. Silence = normal (adhoc). |

**Analysis (corrected):**
- May 16 = **Saturday** (W26 = May 11–17; last workday = Fri May 15). Not a workday.
- Vinn reported on May 15 (last workday) ✓; Jeff reported May 15 ✓
- May 18 (Mon) 08:32 = early morning, no report yet = normal (not an alert)
- Andrew silence = adhoc/normal per memory rule → no alert

**Alerts:** None.
- ℹ️ [INFO] Vinn online at 08:32 May 18 asking questions — active but no formal daily report yet (early AM)
- ℹ️ [INFO] Andrew Taraba — no DM since May 11 (adhoc, silence = normal)

Trello "James Diamond - Vinn task": ✓ complete (Vinn + Jeff reported May 15, PhucVT ✓)
Trello "Andrew Taraba": ✓ complete (silence = normal)

---

## Upwork — 08:33 (+07:00)

Current week (May 18–24) = 0h across all contracts (Monday, week just started — expected).

| Contract | This Wk | Last Wk (May 11–17) | Status |
|----------|---------|---------------------|--------|
| Bailey DEV1 (VietPH) | 0h | 14h | ✓ Mon |
| Bailey DEV3 (DuongDN) | 0h | 0h | ✓ inactive |
| Aysar (KhanhHH+LeNH) | 0h | 20h | ✓ Mon |
| Rory (LeNH) | 0h | 34h | ✓ Mon |
| Neural | 0h | 0h | ✓ silence normal |

**Neural:** Last Michael msg 2026-04-23 (bug report — addressed by Carrick 2026-04-24). ~3.5 wks silence, all requests resolved. No alert.

## Scrin — 08:33 (+07:00)

Monday limitation: `isYesterday:true` returns Sunday 2026-05-17. Fri 2026-05-16 comparison: N/A.
Sunday data (informational): TuanNT 0h tracked — expected (weekend).

No alerts.

Trello "Neural Contract": ✓ complete (silence normal, no unaddressed client msgs)

---

## Elena — 08:38 (+07:00)

### Elena PRs (nustechnology/Elena-SamGuard-Digital-Plant)

| PR | Branch | Review | Action |
|----|--------|--------|--------|
| #302 | DP-667-fix-import-remaining-bugs | CodeRabbit safe | Merged ✓ → Deploy ✓ |

Build on MayBanServer: OK (node v22.14.0, 22s). Branch not `fix/redmine/` → no Redmine update. Matrix room `!kyArBadvcbfPIpIxpD` announced ✓.

### Precognize (nusken)

No open PRs.

### WordPress samguard.co

JS errors: 0. Warnings only (Tailwind CDN, WebGL fallback, HubSpot stub) — non-blocking. No CSP violations.

No alerts.

Trello "Elena - SamGuard": ✓ complete

---

## Slack — 08:38 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| baamboozle | 12 | Aysar deploy hold (May 17 17:57) → cleared (23:29). GitHub CI active. Resolved. |
| rdc | 20 | All automated (#user-access-logs, #rpi-reboot-logs). No Franc/dmetiner human msgs. System OK. |
| swift | 7 | iOS BXR App Store review → **released May 18 01:35**. Carrick/Rory UAE work approved. Staff access question pending. |
| xtreme | 1 | No Kai msgs since May 15 ("back Monday"). No daily report yet at 08:38 (early). Kai 16h/wk — daily report NOT required. |
| samguard | 2 | HubSpot MQL leads only. No Elena/DP human activity. |
| ggs | 0 | No Nick #maintenance post since May 14. Silence = normal (per memory, GGS Nick absence ≠ alert). |
| amazingmeds | 0 | Nick idle since May 13 (waiting for John Yi tasks). Client-side dependency — not a Nick status alert. |
| generator | 7 | Elliott/Violet: batch 2 release may slip to May 18. Carrick tagged for MR #349 (pen-test). Coordination ongoing. |
| legalatoms | 1 | Broadcast only (no Nick content). |
| mpfc | 0 | Dormant. |
| williambills | 0 | Quiet since Apr 23. Normal. |
| equanimity | 0 | Quiet since May 14. Marcel adhoc — normal. |
| aigile | 1 | Colin active May 17 (replied to Hendrix). |

**Alerts:**
- ℹ️ [INFO] generator: Batch 2 release may slip to May 18; Carrick tagged for MR #349 review (pen-test)
- ℹ️ [INFO] swift: iOS BXR released ✓; UAE + staff access pending Carrick response
- ℹ️ [INFO] amazingmeds: Nick waiting for John Yi tasks since May 13 (client-side, not a status block)
- ℹ️ [INFO] baamboozle: Deploy hold/clear resolved May 17

**Trello decisions (slack-only pieces):**
- raymond (LegalAtoms): ✓ complete (no Nick-specific issues)
- marcel (Equanimity): ✓ complete (adhoc, silence normal)
- colin (Aigile): ✓ complete (active)
- mpfc: ✓ complete (dormant = adhoc normal)
- andrew (Bizurk): ✓ (already from Discord)
- ggs/bailey piece: ✓ (Nick absence = normal per memory) — needs sheets vietph to finalize
- All others: pending sheets results

---

## Fountain — 08:34 (+07:00)

### Part 1 — Matrix Plan
W27 plan: **not yet posted as of 08:34 +07** (expected 08:30–09:30 Mon). Re-checking at 09:30 before flagging as alert.

Last posted: W26 plan (2026-05-11 09:03 +07) by @trinhmtt: ViTHT 40h | ThinhT 20h | DatNT 40h | LamLQ 20h | QC 26h

### Part 2 — Task Log Actuals W26 (May 11–17)

| Dev | W26 Total | Notes |
|-----|-----------|-------|
| ViTHT | 40.00h | ✓ |
| ThinhT | 20.00h | ✓ |
| DatNT | 40.00h | ✓ |
| LamLQ | 9.25h | ⚠️ -10.75h vs plan |
| VuTQ | 0.00h | ✓ expected (moved to Bailey) |
| HaVS | 0.00h | ✓ not on W26 plan |
| PhatDLT | 10.00h | QC |
| HungPN | 13.00h | QC |
| TrinhMTT | 0.00h | not QC |

### Part 3 — Plan vs Actual W26

| Dev | Plan | Actual | Delta |
|-----|------|--------|-------|
| ViTHT | 40h | 40h | 0 ✓ |
| ThinhT | 20h | 20h | 0 ✓ |
| DatNT | 40h | 40h | 0 ✓ |
| LamLQ | 20h | 9.25h | **−10.75h** ⚠️ |
| QC total | 26h | 23h | −3h |

### Part 4 — Runway

Remaining est (Not Started + In-Progress): **627h** (incl. Est + CR col J)
Capacity: 90h/wk → Runway: **7.0 weeks**
Delta vs 2026-05-13: **+4.4 wks** (+392.75h — new tasks #2854 80h, #2869 80h, #1178 40h, #2871 32h, #2872 32h added)

### Part 5 — Over-Estimates

| Task | Est+CR | Actual | Status |
|------|--------|--------|--------|
| #2595 GiftDrop | 120h | 168.25h | Deployed staging — stable |
| #2615 Gift of Choice | 12h | 106.75h | Deployed staging — stable |
| #2735 Pro Smart Link | 120h | ~136.50h | In-progress — **still growing** (+5h W26) |

**Alerts:**
- ⚠️ [HIGH] LamLQ W26 shortfall: 9.25h vs plan 20h (−10.75h), no leave entry
- ℹ️ HaVS W26: 0h — not on W26 plan, expected
- ⚠️ [MED] #2735 still growing: ~136.50h vs 120h Est+CR (+14%)
- ℹ️ [INFO] Runway +4.4 wks (new task volume added to pipeline)
- ⏳ W27 plan: re-check after 09:30

Trello "Fountain": ⚠️ SKIP (LamLQ + HaVS issues; also W27 plan pending)

---

## Sheets — 08:33 (+07:00)

**Note:** Sheets use Mon–Sun weeks. W26 = May 11–17. Last workday = **Fri May 15**. May 16 = Saturday.

| Developer | Fri 15/05 | W26 Total | Status |
|-----------|-----------|-----------|--------|
| LongVV (Maddy) | 0h | 16h | ✓ 16/16h part-time |
| LongVV (JD, info) | 0h | 8h | informational (backfill) |
| PhucVT | 8h | 32h + Wed leave | ✓ |
| TuanNT (JohnYi+Rebecca) | 8h | 40h | ✓ |
| VietPH (Bailey) | 8h | 40h | ✓ |
| VuTQ (Bailey) | 8h | 40h | ✓ (leave request today — W26 OK) |
| KhanhHH | 7.66h | 40h | ⚠️ Fri -0.34h (borderline, noted) |
| LeNH (Rory+Franc) | 7.50h | 40h | ⚠️ Wed 6.33h, Thu 7.50h, Fri 7.50h — all <8h, no leave |

**LeNH daily detail (combined Rory+Franc):**
Mon 9.50h ✓ | Tue 9.17h ✓ | Wed 6.33h ⚠️(-1.67h) | Thu 7.50h ⚠️(-0.50h) | Fri 7.50h ⚠️(-0.50h)
Weekly total 40h ✓ but 3 days below 8h threshold.

**Alerts:**
- ⚠️ [MED] LeNH: Wed −1.67h, Thu −0.50h, Fri −0.50h without leave notes
- ℹ️ [INFO] KhanhHH: Fri −0.34h (borderline, weekly 40h ✓)

**Reminders needed:** LeNH (3 days under 8h, no leave)

**Trello decisions (with sheets):**
- maddy: ✓ (LongVV 16h Maddy ✓, Xtreme Kai not required)
- johnyi: ✓ (TuanNT 40h ✓, Nick waiting on client)
- james: ✓ (PhucVT 40h ✓, PhucVT Wed leave OK)
- franc: ✓ (RDC operational, LeNH weekly 40h ✓ — reminder sent)
- rory: ✓ (Swift active/iOS released, LeNH 34h on Rory ✓ — reminder sent)
- aysar: ✓ (Baamboozle resolved, KhanhHH+LeNH 40h ✓)
- elliott: ✓ (Generator active, KhanhHH 40h ✓)
- bailey: ✓ (VietPH 40h ✓, VuTQ 40h ✓)
- rebecca: ✓ (TuanNT 40h ✓, WilliamBills quiet = normal)

---

## Fountain Trello Board (Web Development) — 08:56 (+07:00)

| List | Cards | Stuck >5d |
|------|-------|-----------|
| To-Do | 28 | 24 |
| Bugs | 27 | 17 |
| Doing | 10 | 8 |
| QC Internal Backlog | 8 | 4 |
| QA Backlog | 2 | 1 |
| In QA | 2 | 1 |

**Doing list cards stuck >14 days:**
- ⚠️ Infinity - Cart, Checkout, Order Received Update (18d)
- ⚠️ Fountain - Business (Homepage) - Updates (32d)
- ⚠️ Fountain & Infinity - Add Subtle Scroll Animations (26d)
- ⚠️ ActiveRecord::RecordNotFound in admin/users#show (25d)
- ⚠️ Finding solution to customers receiving incorrect delivery dates (19d)

**Customer comments (May 12-15):**
- [2026-05-15] @mike62798179: Order #5912013BQ did not receive confirmation email (ongoing issue)
- [2026-05-15] @kunalsheth: Remove fountain pro branding — grey out box band/tag option (⚠️ pending)
- [2026-05-13] @tmmckay: Several cards ready to push live / needs QC review
- [2026-05-12] @kunalsheth: Confirmation email issue + scroll bug (#states) flagged as "fix right away"
- [2026-05-12] @mike62798179: Multiple customers reporting missed confirmation emails

**Notable:** Confirmation email bug is an ongoing production issue (multiple customer reports May 12+15).

---

## Trello — 08:54 (+07:00)

### Check Mail (created fresh — Butler not yet run)

All 6 items ✓ complete: DuongDn, Carrick, Nick, Rick, Kai, Ken

### Check Progress (16/17 complete)

| Checklist | Item | Status | Reason |
|-----------|------|--------|--------|
| Normal | Maddy - Carrick/Kai/Luis | ✓ | LongVV 16h ✓, Kai not required |
| Normal | Fountain | ⚠️ SKIP | LamLQ -10.75h, HaVS 0h, W27 plan pending |
| Should do | James Diamond - Vinn task | ✓ | Vinn+Jeff reported May 15 ✓, PhucVT 40h ✓ |
| Should do | Elliott - Generator | ✓ | Generator active, KhanhHH 40h ✓ |
| closely montor | Rory | ✓ | iOS BXR released, LeNH 34h Rory ✓ |
| closely montor | Franc | ✓ | RDC automated/OK, LeNH 40h ✓ |
| closely montor | Aysar | ✓ | Deploy resolved, KhanhHH+LeNH 40h ✓ |
| closely montor | John Yi - Amazing Meds | ✓ | Nick available (waiting client), TuanNT 40h ✓ |
| Work | MPFC | ✓ | Adhoc, silence normal |
| Work | Marcel | ✓ | Adhoc, silence normal |
| Work | Elena - SamGuard Digital Plant | ✓ | PR #302 deployed ✓ |
| Work | Raymond - LegalAtoms | ✓ | No Nick-specific issues |
| Work | Neural Contract - Contract Probe | ✓ | Silence normal, no urgent msgs |
| Work | Bailey | ✓ | VietPH 40h ✓, VuTQ 40h ✓, GGS silence normal |
| Work | Andrew Taraba | ✓ | Bizurk silence normal |
| Work | Rebecca - William Bills | ✓ | TuanNT 40h ✓, WilliamBills quiet normal |
| Work | Colin | ✓ | Active May 17 ✓ |

---

## Reminders — 08:44 (+07:00)

| Developer | Room | Status | Reason |
|-----------|------|--------|--------|
| LeNH | `!OIrgPraJWrcDTnRVLQ` | ✓ Sent | W26 Wed 6.33h (-1.67h), Thu 7.50h, Fri 7.50h — all <8h |
| LongVV | — | Skipped | Part-time 16h/wk ✓, 0h/day normal |
| PhucVT | — | Skipped | 40h W26 ✓ |
| TuanNT | — | Skipped | 40h W26 ✓ |
| VietPH | — | Skipped | 40h W26 ✓ |
| VuTQ | — | Skipped | 40h W26 ✓; leave request submitted today |
| KhanhHH | — | Skipped | 40h W26 ✓ (Fri -0.34h borderline, weekly target met) |

---

## Fountain Matrix W27 Plan — Re-checked 08:53 (+07:00)

Plan still not posted as of 08:53 +07. Expected up to 09:30. No alert until then.
Dev activity visible: LamLQ requesting task (08:41), TrinhMTT assigning bugs/cards (08:42-08:44).
**Action:** Re-check after 09:30 via `/daily-report fountain matrix`.

---

## Unresolved Questions

1. **LamLQ W26 -10.75h**: Was there leave or a project split? Needs explanation from team.
2. ~~HaVS W26 0h~~ — not on W26 plan, resolved (not an alert).
3. **Fountain W27 Matrix plan**: Not posted by 08:53. Re-check at 09:30+ via `/daily-report fountain matrix`.
4. **VuTQ leave request**: Submitted 07:55 (duongdn inbox) — needs approval/acknowledgement.
5. **carrick GitLab PAT**: Expires ≤7 days — rotate before it expires.
6. **Trello daily cards**: Created manually today (Butler automation didn't run before 08:54). Monitor if Butler creates duplicates later.
7. **Fountain confirmation email bug** (mike62798179 reports May 12+15): Status with team?

---

*Timelines updated: daily_report.last_run + alert.last_run → 2026-05-18T08:58:00+07:00*
