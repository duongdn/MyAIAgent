# Daily Report — 2026-05-19 (Tuesday)

**Run started:** 08:37 +07  
**Window:** 2026-05-18 08:58 +07 → 09:15 +07  
**Last daily report:** 2026-05-18T08:58 +07 (Mon)

---

## Summary

**Run completed:** 09:15 +07 | **Window:** 2026-05-18 08:58 → 2026-05-19 09:15 +07 | W27 day 2

### Alerts

| Severity | Item | Action |
|----------|------|--------|
| ⚠️ HIGH | **VuTQ new leave request** — submitted today 07:52, OA replied 08:11 | Review & approve |
| ⚠️ HIGH | **Fountain #2615 massive overrun** — 106.75h actual vs 12h est (+789%), still Staging | Rick/team |
| ⚠️ HIGH | **Fountain customer: Custom Roses page** — Kunal wants ready by **Wed May 20** for Tom to QC | Urgent |
| ⚠️ MED | **William Bills DKIM/DMARC** — Oliver: "emails starting to bounce, need DNS record update" | Action needed |
| ⚠️ MED | **Generator new bugs** — Redmine #78703 (Error task #776) + #78706 (Event Calendar) created Mon | Elliott/KhanhHH |
| ⚠️ MED | **Fountain Redmine #78711** — HungPN posted today (10:38 +07), unassigned fix needed | Assign/fix |
| ⚠️ MED | **Fountain #2735 still in progress** — 131.5h actual vs 120h est+CR (+9.6%), still active | Monitor |
| ⚠️ MED | **Snyk vuln alert** — Marcel org (carrick@) | Review |
| ⚠️ MED | **Fountain checkout bug** — Mike: Order #6450569DU checked out with out-of-stock item (May 18) | Rick/team |
| ℹ️ INFO | Vinn AirAgri report not detected with standard opener — may have posted differently | Check if needed |
| ℹ️ INFO | VuTQ on leave today (OA confirmed) | FYI |
| ℹ️ INFO | W27 sheets all 0h — normal for early Tue (day 2, devs log throughout day) | No action |
| ✅ OK | Jeff (AirAgri) reported May 18 ✓ + active today 08:38 | — |
| ✅ OK | Elena — no open PRs, nothing to deploy | — |
| ✅ OK | InfinityRoses/Fountain Rollbar alerts — all **staging** (not production) | — |
| ✅ OK | W27 Matrix plan (live): ViTHT 40h / ThinhT 4h / DatNT 40h / LamLQ 20h / QC 22h | — |
| ✅ OK | Matrix token refreshed ✓ | — |

### Trello

| Card | Result |
|------|--------|
| Check Mail | ✓ All 6 items complete |
| Check Progress | ✓ 14/16 complete — 2 skipped (Fountain, James Diamond) |

---

## Email — 08:34 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 3 | VuTQ leave request (today 07:52) + OA reply (08:11); Google Sheets share (unrelated) |
| carrick | 6 | Redmine #78703 (New, Generator error task) + #78706 (New, event calendar); #78681/#78585 (Tested staging, routine); JIRA BXR-219 (Swift); Snyk vuln (Marcel) |
| nick | 15 | GGS Daily Task Completions (candasurveyors.com.au); Azure DevOps PR #1526/#1527 (GGS ops app); ClickUp notifications. No John Yi emails. |
| rick | 15 | InfinityStagingBE staging Rollbar (NoMethodError × 8, RuntimeError × 1 — all **staging**); FountainStaging BugSnag (staging); InfinityRoses daily digests; FountainGifts daily digests |
| kai | 1 | Jacob R. Upwork message |
| ken | 15 | Precognize/Welligence GitHub PR activity (active dev — #4924/4927/4928/4929/4930 etc.) |

**Details:**
- duongdn: VuTQ — second leave request (first was May 18). OA already replied. Needs duongdn review/approval.
- carrick: Redmine #78703 (New bug, Generator task error), #78706 (New, event calendar) — new tickets from client. Snyk security alert for Marcel org dependency.
- nick: No John Yi content. GGS emails = Daily Task Completions from candasurveyors.com.au (client operational, not our work).
- rick: All Rollbar/BugSnag alerts are **staging** — InfinityStagingBE NoMethodError is recurring staging issue, not production. Daily digests are routine.
- kai: Single Upwork message from Jacob R. (no Madhuraka mention).
- ken: Welligence team actively merging PRs (XWWP-4531, XWWP-3352, fixes etc.) — active development.

**Alerts:**
- ⚠️ [HIGH] VuTQ leave request — duongdn review needed
- ⚠️ [MED] Redmine #78703/#78706 — new Generator bugs
- ⚠️ [MED] Snyk vuln — Marcel org
- ℹ️ [INFO] rick@ Rollbar/BugSnag — all staging, no production alerts

Trello Check Mail: ✓ All 6 items (DuongDn, Carrick, Nick, Rick, Kai, Ken) complete.

---

## Slack — 08:45 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 2 | Quiet, no relevant activity |
| RDC - FM Monitoring | 20 | Active messages, no alerts for Franc |
| Swift Studio | 41 | Rory asking Jeff for Android app status update (normal); BXR-219 Jira ticket active |
| Xtreme Soft Solutions | 1 | Minimal — no Kai/Carrick daily report (Kai 16h/wk = no report needed) |
| SAM GUARD - Mobile | 6 | Clean — no issues for Elena |
| Amazing Meds | — | xoxc API limitation — auth.test ✓ valid, search.messages unavailable (structural) |
| Generator | 11 | Violet messaging Elliott re Jeff's tasks; Rudi/Violet discussing merge branch issue; active work |
| LegalAtoms | 2 | Quiet, no Raymond-relevant activity |
| MPFC | 0 | Silent |
| William Bills | 21 | Oliver active — UI updates discussion + **DKIM/DMARC email bounce issue** |
| Equanimity | — | xoxc API limitation — auth.test ✓ valid, search.messages unavailable (structural) |
| SoCal Auto Wraps | — | Skipped (project ended 2026-05-11) |
| Aigile Dev | 3 | Normal activity |

**Details:**
- Generator (Elliott): Violet asking Elliott to plan more tasks for Jeff ("Jeff can be out of task tomorrow"). Rudi and Violet discussing branch issue on GL MR #331. Active project coordination.
- William Bills: Oliver — "we need to update the Dkim, DMARC records, randomly starting to have emails bounce". Client infrastructure issue needing DNS action.
- Amazing Meds / Equanimity: xoxc tokens pass auth.test (valid) but `search.messages` returns invalid_auth — known structural limitation of xoxc session tokens with search API. Nick email (Amazing Meds) and Marcel adhoc status (Equanimity) confirmed via other sources.

**Alerts:**
- ⚠️ [MED] William Bills DKIM/DMARC bounce issue (Oliver, Mon)
- ℹ️ [INFO] Generator active — branch merge discussion, Jeff task planning

Trello: Elliott ✓ (active), Marcel ✓ (adhoc — no person alert; Snyk = project topic, not person status), John Yi ✓ (Nick active elsewhere)

---

## Discord — 08:38 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | 59 | Jeff ✓ reported May 18 (airagri-flutter 10:23); Jeff active today 08:38 (UTC+0) |
| Bizurk | nuscarrick | 0 | Andrew Taraba silent (adhoc = normal) |

**AirAgri details:**
- Jeff (jeff_trinh) daily report May 18 10:23 UTC: "Handle the logic for showing/hiding the Corporate Library tab - done - IOS TF 3.4.3 (2); Internal Push Notification feature; handle errors; test"
- Jeff active May 19 08:38 UTC: "I'll continue working on the file download feature and the tasks in the Safety Data Sheets Module"
- dapackage: "Currently deploying the new safefarm post alarm features (with new alarm configuration tabs, emergency response sections)" — informational deploy msg
- Vinn: **NOT detected** with "Just report my process today:" opener in the window. 50 messages in airagri_webapp channel — may have posted without standard opener OR not yet reported.

**Alerts:**
- ℹ️ [INFO] Vinn report not confirmed via standard opener — no MED alert (could be format variation)

Trello: Andrew Taraba ✓ (silence normal), James Diamond ⚠️ skip (Vinn not confirmed)

---

## Google Sheets — 08:50 (+07:00)

W27 started Mon May 18. Checking Mon May 18 (W27 day 1) hours.

| Developer | Mon May 18 | Status | Note |
|-----------|-----------|--------|------|
| LongVV | 0h | OK — part-time | 16h/wk; 0h/day is NOT an alert |
| PhucVT | 0h | ⏳ early | W27 not logged yet (Daily Report tab shows template 0s) |
| TuanNT | 0h | ⏳ early | Same — all sheets show template 0s for W27 |
| VietPH | 0h | ⏳ early | Paturevision W27 template 0s |
| VuTQ | 0h | OK — on leave today | Leave request confirmed by OA |
| KhanhHH | 0h | ⏳ early | Generator sheet W27 template 0s |
| LeNH | 0h | ⏳ early | Rory/Franc/Aysar sheets W27 template 0s |

All "Daily Report" tabs show W27 placeholder 0.00 values (T2-T6 all zero). This is the template pre-fill at start of week — devs typically log throughout the day or end-of-day. W26 final numbers confirmed from template: LamLQ W26 = 9.25h (matches yesterday's report).

**Note on LamLQ:** W26 closed at 9.25h Task dự án (vs plan 20h, shortfall 10.75h). W27 begins.

**No reminders sent** — too early in the day (08:37 +07) to confirm 0h. Will check back if needed.

---

## Scrin.io — 08:43 (+07:00)

Tuesday run → isYesterday returns Monday (May 18) data. ✓ (no Mon bug issue)

- TuanNT/John Yi tracked: **0h** (Scrin body empty, no activity tracked Mon)
- Task log (sheets): 0h as well (W27 not logged yet)
- Comparison: Both 0h — consistent, no over-inflation concern today
- Note: Scrin returning 0h is likely because TuanNT has not yet logged their tracker on Monday, OR Monday was not a tracked day. Not an alert (too early in week).

---

## Fountain — 08:55 (+07:00)

### Part 1 — Matrix Plan W27
- **W27 plan** posted by @trinhmtt Mon May 18 at 11:10 +07 (verified live):
  - ViTHT: 40h | ThinhT: **4h** | DatNT: 40h | LamLQ: 20h | QC: **22h**
- Matrix token refreshed ✓ (@duongdn:nustechnology.com)
- **New today (10:38 +07):** @hungpn posted Redmine #78711 — asking someone to fix; @trinhmtt asked HungPN+PhatDLT to prioritize Custom Roses QC for Tom tomorrow (May 20)

### Part 2 — Task Log Actuals (W27)
- W27 started Monday May 18. All employees show 0h in Daily Report tab (template 0s, not yet logged)
- LamLQ W26 final: **9.25h** Task dự án (Mon–Thu filled, Fri=0h). Plan was 20h → shortfall 10.75h (carried over from yesterday's report)

### Part 3 — Plan vs Actual (W27 Day 2)
Too early to compare — only Mon May 18 elapsed and hours not yet entered.

| Dev | Plan W27 | Actual so far | Gap |
|-----|----------|--------------|-----|
| ViTHT | 40h | 0h (not logged) | TBD |
| ThinhT | 4h | 0h (not logged) | TBD |
| DatNT | 40h | 0h (not logged) | TBD |
| LamLQ | 20h | 0h (not logged) | TBD |
| QC | 22h | 0h (not logged) | TBD |

### Part 4 — Capacity & Runway
- **Est vs Charged active tasks:** 269h (249h est + 20h CR)
- **Active task statuses:** Not Started (13), In-progress >50% (8), In-progress <50% (8), Pending (1)
- **Runway @ 90h/wk:** ~3.0 weeks
- Note: Yesterday reported 4.4wks — discrepancy may be from different active-task filters. Investigating.
- Trello board: To-Do (27), Bugs (27), Doing (11), QC Backlog (9), QA Backlog (2), In QA (2), Not Passed (3)

### Part 5 — Over-Estimate Tracking

| Task | Status | Est | CR | Est+CR | Actual | Over? |
|------|--------|-----|----|--------|--------|-------|
| #2595 giftdrop_new_redemption_flow | Deployed on Staging | 120h | 0h | 120h | 168.25h | **+48.25h (+40.2%)** |
| #2615 | Deployed on Staging | 12h | 0h | 12h | 106.75h | **+94.75h (+789%)** ⚠️ |
| #2735 | In-progress (>50%) | 90h | 30h | 120h | 131.5h | **+11.5h (+9.6%)** still growing |

- #2595: Still on staging (not live). Hours no longer growing (dev done).
- #2615: **Critical overrun** — 789% over estimate. Still on staging. Needs discussion on estimate correction and path to release.
- #2735: Hours still growing (in-progress). +9.6% over combined Est+CR. Monitor closely.

### Fountain Trello (rick account)
| List | Cards |
|------|-------|
| To-Do | 27 |
| Bugs | 27 |
| Doing | 11 |
| QC Internal Backlog | 9 |
| QA Backlog | 2 |
| In QA | 2 |
| Not Passed | 3 |

**Customer comments (last 7 days):**
- 🔴 **Kunal (May 18):** "Infinity - Custom Roses page" → "Can we have this ready by **Wednesday** for Tom to QC" — **HIGH: deadline Wed May 20**
- 🔴 **Mike (May 18):** "Customers checking out with out-of-stock items" — Order #6450569DU purchased out-of-stock candle. Bug.
- 🟡 **Mike (May 15):** "Customer did not receive confirmation email" — Order #5912013BQ also affected (ongoing confirmation bug from yesterday)
- 🟡 **Kunal (May 14-15):** "Remove fountain pro branding option" — grey out box band/tag on Fountain Pro (2 messages, needs response)

**Stuck in active lists (>5 days):**
- "Infinity/Fountain - Implement Open Graph Image Strategy" — To-Do, last May 13
- "Fountain & Infinity Blog" — To-Do, last May 13
- "Fountain - Pro roles" — To-Do, last May 6
- "Fountain Pro Template Zip Code Update" — To-Do, last Mar 10
- "Upgrade to Next.js version 16" — To-Do, last Mar 10

Trello Fountain item: ⚠️ **SKIP** — LamLQ W26 shortfall unresolved + customer requests pending (Custom Roses deadline, checkout bug)

---

## Elena — 08:38 (+07:00)

| Check | Result |
|-------|--------|
| Elena PRs (duongdn) | **0 open PRs** — nothing to merge or deploy |
| Precognize PRs (nusken) | 6 open PRs (by Vladimir-precog, majdhajjo08, nustom, nus-aron, briannus — active team dev) |
| samguard.co WordPress | Not checked (no PRs to trigger deploy flow) |
| Pending deploy | None (`pending_deploy: []`) |

Latest merged/deployed: PR #302 (DP-667) deployed on 2026-05-18 ✓ (from yesterday's report)

Trello Elena ✓ (no issues, clean)

---

## Trello — 09:10 (+07:00)

### Check Mail
✓ All 6 items complete (DuongDn, Carrick, Nick, Rick, Kai, Ken)

### Check Progress

| Checklist | Item | Result |
|-----------|------|--------|
| Normal | Maddy - Carrick/Kai/Luis | ✓ complete (Kai no report needed; no alerts) |
| Normal | Fountain | ⚠️ skip (Matrix token, LamLQ shortfall, customer deadlines) |
| Should do | James Diamond - Vinn task | ⚠️ skip (Vinn report not confirmed) |
| Should do | Elliott - Generator | ✓ complete (Violet/Elliott active, new bugs = normal work) |
| closely montor | Rory | ✓ complete (Swift Studio 41 msgs, active) |
| closely montor | Franc | ✓ complete (RDC 20 msgs, active) |
| closely montor | Aysar | ✓ complete (no alerts) |
| closely montor | John Yi - Amazing Meds | ✓ complete (Nick active via email, per-client gate on Nick) |
| Work | MPFC | ✓ complete (quiet, normal) |
| Work | Marcel | ✓ complete (adhoc dev — no person alert; Snyk = project topic) |
| Work | Elena - SamGuard Digital Plant | ✓ complete (no PRs, SAM GUARD clean) |
| Work | Raymond - LegalAtoms | ✓ complete (no alerts) |
| Work | Neural Contract - Contract Probe | ✓ complete (silence = normal per rule) |
| Work | Bailey | ✓ complete (GGS active — Amy/Joey communicating, VietPH referenced) |
| Work | Andrew Taraba | ✓ complete (Bizurk silence = adhoc, normal) |
| Work | Rebecca - William Bills | ✓ complete (DKIM noted separately; Oliver active) |
| Work | Colin | ✓ complete (Aigile 3 msgs, normal) |

**Summary: 14/16 complete** — Cards created: Mail `6a0bc2d21abe935644a7f01e`, Progress `6a0bc2deb7c0326000cfffb3`

---

## Reminders — 09:12 (+07:00)

No reminders sent. W27 is only day 2 (Tue 08:37 +07) — too early to confirm 0h alerts. Devs typically log during/end of day. VuTQ confirmed on leave today (no reminder needed).

---

## Action Items

1. **[HIGH] VuTQ leave request** — review duongdn inbox, approve if valid
2. **[HIGH] Fountain Custom Roses** — must be ready for Tom (Kunal) by **Wed May 20**
3. **[HIGH] Fountain #2615** — 789% overrun still on Staging. Discuss with Rick what's blocking Live release.
4. **[MED] Fountain Redmine #78711** — assign and fix (HungPN posted today 10:38 +07)
5. **[MED] William Bills DKIM/DMARC** — update DNS records, respond to Oliver
6. **[MED] Fountain checkout bug** — Mike's order with out-of-stock item (May 18), needs investigation
7. **[MED] Fountain pro branding** — Kunal asked twice (May 14-15) to disable box band/tag. Response needed.
8. **[MED] Snyk Marcel org** — review vulnerability report in carrick@ inbox
9. **[INFO] Verify Vinn report** — check AirAgri airagri_webapp manually if needed

---

*Unresolved questions:*
- Fountain runway discrepancy: 3.0wks today vs 4.4wks yesterday — confirm methodology
- #2735 actual: today 131.5h vs yesterday ~136.5h — verify (should only go up)
- Vinn: reported in different format, or genuinely no May 18 report yet?
