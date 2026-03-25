# Daily Report — Wed 25 Mar 2026

**Window:** 2026-03-24 08:49 → 2026-03-25 09:15 (Saigon)
**Generated:** 2026-03-25 09:15

---

## Alerts

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | **HIGH** | Discord/AirAgri | James Diamond: "huge issues" with stop alarm logic today — requesting urgent PHP8 + DB fix from Vinn |
| 2 | MEDIUM | Fountain/Trello | 8 customer comments from @kunalsheth today on GiftDrop + build-a-box |
| 3 | MEDIUM | Google Docs | LongVV Tue 24/03: 0h logged, no leave record found |
| 4 | MEDIUM | GitHub/Elena | PR#291 CodeRabbit 3× 🟠 Major — NOT merged, team notified via Matrix |
| 5 | LOW | Email/Carrick | Snyk vulnerability alert for marcel organization |
| 6 | LOW | Email/Rick | Rollbar production error #857 ChunkLoadError (Fountain, deployment-related) |
| 7 | INFO | Slack/GGS | Nick-GG daily report submitted today (Mar 25) for yesterday (Mar 24) — late |

---

## Source Summary

| Source | Status | Key Findings |
|--------|--------|--------------|
| Email (6) | ✓ OK | Leave requests, Snyk alert, Redmine bugs (Generator), Rollbar |
| Slack (12 xoxp) | ✓ OK | Active across 10 ws, no critical alerts |
| Slack (Amazing Meds) | ✓ OK | 4 msgs — IT/email-marketing, no alerts |
| Slack (Equanimity) | ✓ OK | 0 msgs |
| Discord | ✓ OK | nusvinn: AirAgri HIGH alert found. nuscarrick: Bizurk 0 msgs (channels role-restricted) |
| Google Docs | ⚠️ PARTIAL | All devs OK except LongVV Tue 0h |
| Scrin.io | ✓ OK | TuanNT on leave Mon+Tue — empty data expected |
| Daily checks | ✓ OK | Kai ✓, Nick-GG late but submitted |
| Matrix/Fountain | ✓ OK | Weekly plan fetched (W19) |
| GitHub/Elena | ⚠️ FLAG | PR#291 CodeRabbit issues — held, team notified |
| GitHub/Precognize | ❌ ERROR | nusken token 404 — cannot access |
| Redmine | ✓ OK | No new deploys this window |
| Trello | ✓ 17/20 | Elena + Andrew Taraba + Fountain skipped |

---

## Developer Hours

| Dev | Project | Mon 23/03 | Tue 24/03 | Notes |
|-----|---------|-----------|-----------|-------|
| LongVV | Xtreme Soft | 8h ✓ | **0h ⚠️** | No leave record Tue |
| PhucVT | James Diamond | 8h ✓ | 8h ✓ | OK |
| VietPH | Paturevision | 0h ✓ | 4h ✓ | Mon: full-day off, Tue: half-day (confirmed) |
| KhanhHH | Generator App | 8h ✓ | 8h ✓ | + NamNN/NghiepNQ/ToanNT each 8h |
| TuanNT | John Yi / Rebecca | 0h ✓ | 0h ✓ | Both days confirmed leave (Nghỉ cả ngày) |
| LeNH | Rory+Franc+Aysar | 8h ✓ | 7.83h ✓ | Combined OK (Rory+Aysar carry) |

---

## Fountain (W19)

**Weekly plan** (from @trinhmtt, Mon 23/03 08:32):
ViTHT: 22h · ThinhT: 4h · HaVS: 24h · VuTQ: 40h · QC: 22.5h

**Plan vs Actual (Mon+Tue):**

| Dev | Plan | Mon | Tue | Total so far | Status |
|-----|------|-----|-----|-------------|--------|
| ViTHT | 22h | Nghỉ cả ngày | Việc công ty khác | 0h logged | On hold — need rest-of-week to hit 22h |
| ThinhT | 4h | 0h | 4h | 4h | ✓ Plan met |
| HaVS | 24h | 0h | 0h | 0h | ⚠️ Not in task log (assigned to #2639) |
| VuTQ | 40h | 8h | 0h | 8h | 8/40h — needs 32h over Wed–Fri |
| PhatDLT (QC) | 22.5h | 3h | 3h | 6h | On pace |
| HungPN (QC) | — | 0h | 0h | 0h | Not logged |

**Active Trello board (Fountain):**
- To-Do: 37 cards (33 stuck >5d)
- Bugs: 11 cards (7 stuck >5d)
- Doing: 4 cards (2 stuck >5d)
- QC Internal: 5 cards (3 stuck >5d)
- In QA: 0 · Not Passed: 1

**Customer comments (since 24/03 08:49):** 8 from @kunalsheth
- GiftDrop - New redemption flow (2× today at 09:11 Saigon)
- Fountain - build a box/product catalog modal issue (today at 08:13 Saigon)
- + 5 more in window

**Over-estimate tracking:**
- #2595 (GiftDrop new redemption flow): Est 120h · Deployed on Staging · PhatDLT logging 3h/day — monitor if growing
- #2615 (Gift of Choice): Est 12h · VuTQ 7.5h Mon · Deployed on Staging — watch total actual

**Capacity & runway:** ~88h active/not-started scope (excl. On Hold). Dev capacity ~86h/week → ~1 week runway.

**Fountain Trello → NOT completed** (customer comments require review before closing)

---

## Elena — SamGuard Digital Plant

**PR#291** (DP-648 · Tag list performance improvements)
- Branch: DP-648 | Author: nusteam | Created: 2026-03-24
- CodeRabbit: 3× 🟠 Major issues
  - `availableTags` not populated in AVAILABLE branch → `AvailableTagsListComponent.formData` will be empty
  - 2 additional potential issues in `new-tag-form.component.ts`
- **Action: NOT merged. Team notified in Elena - Digital Plant Matrix room.**

---

## Slack Highlights

- **Xtreme Soft**: Kai daily report ✓ (17:11 Tue). anomawasala on leave today (Wed 25/03).
- **Generator**: 22 msgs — merge conflicts during release (Carrick resolving), release delayed to tomorrow. Redmine bugs #77838 (Bug [625]) + #77841 (Bug [635]) filed — normal dev activity.
- **Global Grazing**: Very active (53 msgs). Nick-GG late daily report. Joey/Amy discussing PO sync issue in Prestashop console — client-managed.
- **William Bills**: 16 msgs — duongdn + Oliver active on MX features. Normal dev progress.
- **SAM GUARD**: 27 msgs — all automated HubSpot MQL notifications. No dev alerts.
- **RDC FM Monitoring**: 12 msgs — client (dmetiner) reviewing deployed features, requesting domain changes.
- **LegalAtoms**: Raymond: release delayed 1 week due to holidays, will release Thursday.
- **Baamboozle**: Aysar apologized for being unavailable Tuesday (personal schedule).

---

## Trello Status

**Check Mail:** 6/6 ✓ (all accounts completed)

**Check Progress (17/20 completed):**
- ✅ Maddy/Kai/Luis · Blake · John Yi/Amazing Meds
- ⚠️ **James Diamond/Vinn** — un-completed: active production issue (stop alarm logic, James requesting urgent fix)
- ✅ Rory · Aysar · Franc · Elliott
- ✅ MPFC · Marcel · Raymond/LegalAtoms · Neural Contract
- ✅ Bailey · Rebecca/William Bills · Colin · Elena WordPress
- ⏭️ **Elena/SamGuard Digital Plant** — PR#291 CodeRabbit issues, not merged
- ✅ **Andrew Taraba** — Bizurk checked (0 msgs in accessible channels; most channels role-restricted)
- ⏭️ **Fountain** — 8 customer comments, needs review

---

## Task Log Reminders Sent

- **LongVV**: 0h on Tue 24/03 (no leave record) → reminder sent to `!bvdwOOxprsKJBTjSeQ:nustechnology.com`

---

## Notes

- Discord tokens returning 403 (Cloudflare error 1010) — this is a bot-detection block on IP, not necessarily expired tokens. Verify manually if needed.
- Precognize GitHub: nusken token returning 404 on `Precognize/development` — may need token refresh or repo URL change.
- HaVS appears in Fountain weekly plan (24h) and Est vs Charged (#2639) but has no task log entries yet this week.
