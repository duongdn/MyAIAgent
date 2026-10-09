# Daily Report Refresh — 2026-04-17 16:48 (+07:00)
**Window:** 2026-04-17 08:50 → 16:48 (+07:00) — full refresh

---

## Email Refresh — 16:48 (+07:00)

| Account | New | Key items |
|---------|----:|-----------|
| duongdn | 3 | NUS birthday note DatNT; 2× Slack confirmation codes |
| carrick | 0 | — |
| nick | 0 | — |
| rick | 3 | **BugSnag: Fountain staging NoMethodError pro_cart_items#destroy** (14:17); 2× Rollbar InfinityRoses daily |
| kai | 0 | — |
| ken | 4 | All GitHub notifs on PR #4837 (staging→develop merge) |

Alerts: INFO — Fountain staging BugSnag error, dev to triage.

---

## Slack Refresh — 16:48 (+07:00)

| Workspace | New | Key content |
|-----------|----:|-------------|
| Baamboozle | 2 | Carrick reminder to Aysar; typeform cancel auto-msg |
| RDC (FM) | 9 | Carrick branch strategy (main-en/main-tr), routine tuner logs |
| Swift | 0 | — |
| Xtreme | 4 | Kai/Madhuraka DM on email templates ("no budget") |
| SAM GUARD | 0 | — |
| GGS | 9 | Nick urgent-upgrade proposal (Ruby 2.7 EOL, Android AGP 4.2.2→8.x); Amy deployed Live fixes; Bailey daily report ✓ |
| Amazing Meds | 3 | #email-marketing-dept: celeenerae requesting access to 4th+5th blog drafts (no images yet); john "Done"; celeenerae "Thank you" — relates to blog AI issue flagged in AM |
| Generator | 17 | Release coord Violet vs Elliott; OTP sign-in bug; Rudi MR reviews (API#378, CMS#332) |
| LegalAtoms | 0 | — |
| MPFC | 0 | — |
| William Bills | 57 | Lucas+Oliver Privateer Fund (staging verified); jotform iframe, T&Cs doc; **Oliver requests full security+malware scan + backup cadence** (#mx) |
| Equanimity | 2 | #xid-technologies 17:03 Marcel tagged @NUS Carrick about final client-data review + 60/90 day push validation — needs Carrick response |
| SoCal | 0 | — |
| Aigile | 0 | — |

Alerts (new): None. All routine dev discussion.

---

## Discord Refresh — 16:48 (+07:00)

| Server | Acct | New | Key |
|--------|------|----:|-----|
| AirAgri | nusvinn | 7 | Jeff daily report ✓ (Weather tab); **James Diamond pinged Vinn 6× 16:13–16:19 in #airagri_webapp for training-module status — Vinn no reply yet** |
| Bizurk | nuscarrick | 0 | Silence, animeworld DM 0. Normal (low-activity). |

Tokens: both verified OK via `/users/@me` + `/guilds`.

Alerts: WATCH — James Diamond pinging Vinn, unreplied (17 min, still recent). Re-check next refresh.

---

## Sheets Refresh — 16:48 (+07:00)

| Developer | Today (Apr 17) | W3 total | Δ vs AM | Status |
|-----------|---------------|----------|---------|--------|
| LongVV (Maddy) | 0h, no note | 16h | 0 | OK — 16h/wk target met Mon+Thu |
| PhucVT (James Diamond) | 0h, no leave | 24h | 0 | **Concern — 0h Fri, no leave** |
| TuanNT (JY+Rebecca) | 0h, Nghỉ cả ngày ✓ | 28h | 0 | OFF — expected |
| VietPH (Bailey) | 0h, no leave (1 WIP row) | 24h | 0 | **Concern — 0h Fri, no leave** |
| KhanhHH (Generator) | **8h** (Rudi PR, Asset Linking, DST, 78248, OTP, 78278) | **40h** | **+8h** | OK — full 40h week |
| LeNH (Rory+Franc+Aysar+RB) | 0h, Nghỉ cả ngày ✓ Rebecca | 32h | 0 | OFF — expected |

---

## Scrin.io Refresh — 16:48 (+07:00)

TuanNT today: 0h (Nghỉ cả ngày — consistent). Week: 20h22m. No delta vs morning. No inflation vs John Yi task log.

---

## Fountain Refresh — 16:48 (+07:00)

### Part 1 — Matrix Plan
Token was actually still expired at start of refresh — re-refreshed successfully via `scripts/matrix-token-refresh.js`. Verified as `@duongdn:nustechnology.com`.

**New plan msg from @trinhmtt 16:08 today (W3/W22):**
> ViTHT: 38h | ThinhT: 20h | VuTQ: 32h ⇒ QC: 22.5h

Changes vs morning baseline (Apr 13 plan):
- ViTHT 30 → **38h** (+8, matches actual)
- VuTQ 40 → **32h** (-8, matches actual)
- QC 25 → **22.5h** (-2.5)
- **LamLQ dropped** (trinhmtt told LamLQ 15:26 to watch group plans; LamLQ confirmed 14:55 "dạ chưa lun" for Fountain this week)
- trinhmtt reminder 15:57: "mn tasklog đầy đủ giúp em ạ"

### Part 2+3 — Task Log Actuals (W22 / Apr 13–17)

| Dev | Plan (revised) | Actual | Δ vs AM | Status |
|-----|----------------|--------|---------|--------|
| VuTQ | 32h | **32.0h** | +12 | **ON TARGET** |
| ViTHT | 38h | **38.0h** | +8 | **ON TARGET** |
| ThinhT | 20h | 8.0h | 0 | BEHIND -12h (40%) |
| LamLQ | dropped | — | — | n/a |
| PhatDLT (QC) | 22.5h | 17.5h | +4 | Behind -5h |
| HungPN (QC) | — | 0h | 0 | PhatDLT covers (per feedback) |

Team W3 total: **95.5h** (AM 71.5 → +24h).

### Part 4 — Capacity & Runway
- Remaining est (capped): ~213.75h (24h added today hit already-over tasks, so capped remaining unchanged)
- Runway ~2.4 weeks at 90h/wk (no material change)
- Morning's 167.5h figure appears inconsistent — see Unresolved Q

### Part 5 — Over-Estimate (trend since AM)

| Task | Est | AM | PM | Δ | Trend |
|------|----:|---:|---:|---:|------|
| #2595 | 120 | 168.25 | 168.25 | 0 | Stable |
| #2615 | 12 | 102.25 | 102.75 | +0.5 | Slight |
| #2735 | 90 | 106.25 | **111.50** | **+5.25** | **STILL GROWING** |
| #2742 | 12 | 19.25 | 20.25 | +1.0 | Growing + status mismatch |

Others stable: #2639, #2613, #2501, #2380, #2702, #2815.

**#2615 pushed LIVE today** (VuTQ → @hungpn 14:29: "GiftOfChoice này lên LIVE hết rồi"). Status tab may lag.

### Trello
0 new customer comments since 08:50. 3 outbound from rick570 (GoC LIVE, ShipStation on hold, Pro/Send Smart Link edge case).

---

## Elena Refresh — 16:48 (+07:00)

- **Elena PRs (duongdn):** no open, no new merges (latest #299 Apr 7, already deployed).
- **Precognize (nusken):** no new PRs today. Latest: welligence WellStack #10334 merged Apr 16.
- **samguard.co:** HTTP 301 → 200, CSP intact, HSTS present, X-Content-Type-Options + X-Frame-Options OK. Apache/2.4.58.
- **Pending deploys:** zero. All 11 entries DONE.

Alerts: None.

---

## Upwork Refresh — 16:48 (+07:00)

| Workroom | Dev | W3 now | W3 AM | Δ |
|----------|-----|-------:|------:|--:|
| Rory | LeNH | 0:00 | 0:00 | 0 |
| Neural Contract | external | 0:00 | 0:00 | 0 |
| Aysar | LeNH | 4:50 | 4:50 | 0 |
| Bailey-VietPH | VietPH | **23:40** | 16:40 | **+7:00** |
| Bailey-DuongDN | DuongDN | 0:00 | 0:00 | 0 |

Bailey-VietPH daily: Mon 3, Tue 5, Wed 0, Thu 8, Fri 7:40 = 23:40.

**Note:** VietPH IS logging to Upwork today (7:40h) even though task log sheet shows 0h. Task log has 1 WIP row — likely to be filled EOD. Reduces VietPH "concern" status → **OK (Upwork cross-checks Fri work)**.

Neural Contract messages: no intercept script exists (see Unresolved Q).

Alerts: None new.

---

## Trello — 16:48 (+07:00)

Morning run completed 13/18 Progress items + all 6 Mail items. No re-evaluation needed — no alerts resolved or newly surfaced that change Trello state.

---

## Reminders — 16:48 (+07:00)

- **LeNH:** AM reminder already sent ✓
- **PhucVT:** 0h Fri no leave — recommend Matrix reminder to `!kzyLVmJxcRESoTkfnY:nustechnology.com`. Not auto-sent (see Unresolved Q).
- **VietPH:** 0h on sheet but +7:40 on Upwork today → downgrade to WIP-entry issue, no reminder needed.
- **LongVV / TuanNT:** targets met or on leave.

---

## Summary of Alerts (new since morning)

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Fountain | **#2735 STILL GROWING** (+5.25h, now 111.5h / 90h est) | **MEDIUM** |
| 2 | Fountain | Plan revised 16:08 (ViTHT+8, VuTQ-8, QC-2.5, LamLQ dropped) — now aligned to actuals | INFO |
| 3 | Fountain | #2615 pushed LIVE, Trello status may lag | INFO |
| 4 | Email/rick | BugSnag Fountain staging NoMethodError (pro_cart_items#destroy) | INFO |
| 5 | Discord | James Diamond pinging Vinn 6× unreplied 16:13–16:19 | WATCH |
| 6 | Sheets | PhucVT 0h Fri, no leave | MEDIUM |
| 7 | Slack/Equanimity | Marcel tagged @NUS Carrick 17:03 on client-data review + validation push | MEDIUM (needs reply) |
| 8 | Slack/WB | Oliver requests full security+malware scan + backup cadence | INFO (action request) |

**Resolved this refresh:**
- Matrix token (re-verified working)
- ViTHT / VuTQ plan-vs-actual alignment
- VietPH concern downgraded (Upwork confirms +7:40 today)
- KhanhHH full 40h week complete (+8h logged)

---

## Unresolved Questions

1. **#2735 newly growing** (+5.25h today, now +23.9% over est) — scope creep cause? Track next week.
2. **Morning runway 167.5h vs current 213.75h** — formula inconsistency. Clarify with PM which is correct.
3. **LamLQ dropped from plan mid-week** — misassignment or rescheduled to later week?
4. **#2742 status "Not Started" with 20.25h** — ask @trinhmtt to reconcile.
5. **PhucVT EOD reminder** — user wants auto-send? Morning LeNH reminder was sent; PhucVT room known but not auto-fired this run. Confirm policy.
6. ~~Amazing Meds + Equanimity xoxc auto-refresh~~ — RESOLVED: tokens were valid, agent skipped Cookie header. Building reusable `scripts/slack-verify-tokens.js` to prevent false alarms.
7. **Neural Contract messages** — no intercept script; `feedback_neural_upwork.md` requires one. Create follow-up.
8. **James Diamond pinging Vinn** — was there a follow-up reply after 16:19? Check next refresh.
