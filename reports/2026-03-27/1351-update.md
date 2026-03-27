# Update Report — 2026-03-27 13:51

**Window:** 2026-03-27 08:23 → 13:51 (+07:00)

---

## Alerts

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | HIGH | Slack/Equanimity | **Face scan still failing — new root cause found.** Carrick investigating new user registration failures (existing users OK). Not resolved. |
| 2 | INFO | Slack/Generator | Carrick OFF today (Fri). Rudi flagged new Trello issue (ip6taGLA) — Violet handling. |
| 3 | INFO | Slack/Xtreme Soft | Kai taking afternoon off sick (fever). LIFM2-428 in progress only. |

---

## Resolved / Cleared From Morning Alerts

| Morning Alert | Status Now |
|---------------|------------|
| LongVV 0h Thu | ✅ Logged **8h** (after reminder) |
| TuanNT 0h Thu | ✅ Logged **4.83h** Thu — matches Scrin 4h53m |
| LeNH 0h Wed+Thu | ✅ Thu logged **12.83h** across Rory+Franc+Aysar |
| Fountain VuTQ 0h Thu | ✅ Logged **8h** Thu |
| Fountain ViTHT 0h entire week | ✅ Logged **8h** Thu |

**Remaining open from morning:** HaVS 0h entire week, HungPN minimal (4h Fri only), ThinhT 4h Tue only.

---

## Source Summary

| Source | Status | New Since 08:23 |
|--------|--------|-----------------|
| Slack (14 ws) | OK | 40 msgs across 7 ws |
| Discord/AirAgri | ACTIVE | 21 msgs — PHP8 upgrade, incident fix live |
| Email | OK | 0 new filtered emails |
| Matrix/Fountain | ACTIVE | 27 msgs — staging deploy, live push, bug reports |
| Google Sheets | ✅ Mostly resolved | Thu gaps filled; Fri in progress |
| Fountain Trello | OK | 1 new customer comment |
| GitHub | OK | Elena 0 open PRs; Precognize 404 (unchanged) |
| Upwork | ⚠️ | Script returning empty — skip |

---

## Slack Details

**Equanimity** (17 msgs — HIGH):
- Mani [09:15–09:18]: Face scan still failing, client deleted & re-uploaded user, same result
- Carrick [09:17]: "Potential issue is not the root cause, let me check again"
- Carrick [09:28]: Found new root cause — NOT a face template issue
- Carrick [09:53]: "We found out another potential issue and fix. Let check again @Mani"
- Still **UNRESOLVED** as of 09:53. No update since.

**Swift Studio** (4 msgs):
- Carrick [11:20–12:13]: Root cause found — phone number deleted from MB, hook subscription sync issue. Fixed on both dev + booking. Asking Roryh to reverify.
- Status: fix pushed, awaiting client retest.

**Generator** (7 msgs, #triage):
- Rudi [08:28]: Asking Carrick to investigate Trello issue `ip6taGLA`
- Violet [08:54]: Carrick is off today — will look at weekend
- Violet [08:57 + 09:41]: Tested another fix, confirmed working on demo ✓
- Ryan [11:01]: Approved a PR with minor improvement comments

**LegalAtoms** (5 msgs):
- Raymond [10:58]: **Release done** ✓
- Raymond [13:07–13:43]: Production issues — Snohomish AHPO routing fixed. Receipt not showing on clerk side (Cowlitz). Customer created with no name/email attached. Investigating.

**Global Grazing** (2 msgs):
- Nick [10:09]: Investigating PrestaShop 9 — promo codes core behavior changed. Not same as stock sync issue.

**Xtreme Soft** (2 msgs):
- Kai [08:46]: Sick (fever), taking afternoon off. LIFM2-428 in progress this morning.
- Kai [12:01]: Update posted before leaving — still in progress.

**Amazing Meds** (5 msgs):
- Nick [09:04–09:41]: Button style + questionnaire button fixes done ✓. Gil confirmed.

**William Bills** (4 msgs):
- Oliver + Lucas: Normal morning check-in. Upsell screen WP deployment discussed.

---

## Discord — AirAgri (21 msgs)

- **Jeff** [08:48]: Continuing Approve Incident + device icon updates today
- **Incident fix LIVE** ✓ (James confirmed at 12:55–12:56)
- **Vinn** [13:18]: Starting to build **new production server** (PHP 8 upgrade)
- **Jon (new dev)** [13:06]: Pushed layers feature changes to branch, waiting for review
- **James** [13:53]: Asking Vinn about Leon's hotfix for new sensor type (in staging) — needs production push

---

## Matrix/Fountain (27 msgs)

**Active development:**
- **ViTHT** [09:22]: Bug on BETA — admin can't approve pro order with `pay_later` payment option. HungPN checking [09:25]
- **HaVS** [10:34]: Deployed ticket **#2639** (card categories active/inactive) to staging. VuTQ: ignore URL access edge case (not blocking)
- **TrinhMTT** [10:58]: Asking team to fix Redmine bugs
- **ViTHT** [10:56]: Task **#2735** blocked — waiting on design confirmation
- **VuTQ** [13:37]: Pushed fix to **LIVE** ✓ (HungPN confirmed on staging at 11:55)

---

## Developer Hours (Fri 27/03 at 13:51)

| Developer | Today (Fri) | Thu (retro) | Note |
|-----------|-------------|-------------|------|
| LongVV | 4h (half-day leave) | 8h ✓ | OK |
| PhucVT | 0h (—) | 8h ✓ | Not yet logged |
| VietPH | 1h (in progress) | 9h ✓ | Normal |
| KhanhHH | Full-day leave | 8h ✓ | OK |
| TuanNT | 2.75h (in progress) | 4.83h ✓ | Matches Scrin |
| LeNH | 0h (—) | 12.83h ✓ | Not yet logged today |

### Fountain (Fri 27/03)

| Dev | Fri | Week Total (Mon–Thu) | Status |
|-----|-----|----------------------|--------|
| ViTHT | 0h | 8h | Week still well below 22h plan |
| VuTQ | 0h | 24h | Ongoing |
| ThinhT | 0h | 4h | Plan was 4h — done |
| HaVS | 0h | **0h** | ⚠️ 0h entire week |
| PhatDLT | 0h | 12h | Consistent pace |
| HungPN | 4h | 4h (Fri only) | ⚠️ 0h Mon–Thu, first hours today |

---

## Fountain Trello

**1 new customer comment:**
- **@kunalsheth** [11:34] on 'GiftDrop - New redemption flow': "I will work on getting this uploaded" — replying to Rick/Tmmckay

---

## Trello Checklist Updates

The following morning-report items can now be **completed** (alerts resolved):

| Item | Reason |
|------|--------|
| **John Yi** | TuanNT logged 4.83h Thu ✓ (matches Scrin) |
| **Rebecca / William Bills** | TuanNT logged Thu hours |
| **Rory** | LeNH logged 12.83h Thu ✓ |

Still **blocked** (alerts remain):
| Item | Reason |
|------|--------|
| **Fountain** | HaVS 0h entire week; HungPN near-zero |
| **Equanimity (Marcel)** | Face scan still being investigated |

---

## Open Items

1. **Equanimity face scan** — Carrick on a new root cause investigation as of 09:53. No update since. Watch for resolution.
2. **AirAgri new sensor hotfix** — Leon's fix in staging, James asking Vinn to push to prod.
3. **Fountain HaVS 0h** — Still 0h entire week. Only 1h last week on Bailey borrow. Needs attention.
4. **LegalAtoms post-release issues** — Raymond flagging Cowlitz receipt + customer with no name/email. Minor but post-release.
5. **Generator Trello ip6taGLA** — Carrick off today. Deferred to weekend.
