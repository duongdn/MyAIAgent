## Fountain — 08:35 (+07:00)

**Today:** 2026-04-28 Tue. **Current week:** W24 (April 27 → May 3, 2026). **Day 2 of W24** (Mon was Hung Kings' holiday).

Matrix token expired at start. Auto-refresh via `node scripts/matrix-token-refresh.js` initially failed (puppeteer headless captured 0 token). Recovered by manual headless capture from `tmp/matrix-browser-profile/` request headers — fresh `mat_Nhg0pswk5HGF0...` saved to `config/.matrix-config.json`. Verified with `whoami` → `@duongdn:nustechnology.com`.

---

### Part 1 — Matrix Plan (W24)

**Source:** room `!EWnVDAxbTGsBxPkaaI:nustechnology.com` (Fountain).

**Latest weekly plan** — @trinhmtt:nustechnology.com, **2026-04-28T01:20:13 UTC** (08:20 +07, today, message edited at 01:20:29Z):

> Em gui plan tuan nay ạ
> VuTQ 16h
> ViTHY 16h        ← typo for ViTHT
> DatNT 16h
> => QC 10,5h

Follow-up clarification: @thinht (01:18:29Z) asked "tuần này a có bn giờ bên này vậy Trinh Mai" (how many hours this week?) → @trinhmtt confirmed (01:22:46Z) "Dạ đúng roi" — meaning **ThinhT = 0h** this week. ThinhT then asked "vậy là tuần này a k có time bên này ?" (so no time this week?) — Trinh confirmed yes.

**Plan totals W24:**
- Devs: VuTQ 16h + ViTHT 16h + DatNT 16h + ThinhT 0h + LamLQ 0h (not on plan) + HaVS 0h (not on plan) = **48h dev**
- QC: **10.5h** (PhatDLT + HungPN combined)
- Grand total: **58.5h** — significantly reduced vs W23 plan (142h dev + 30.5h QC = 172.5h)

This reduction is consistent with the holiday-shortened week (Mon 27/04 = Hung Kings' Festival) AND ThinhT/DatNT having reduced commitments per Trinh's clarification.

---

### Part 2 — Task Log Actuals (W24)

**Source:** Google Sheet [`1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`](https://docs.google.com/spreadsheets/d/1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o), Summary R29 (W24) + W24 tab.

| Dev | Role | W24 Actual | Notes |
|-----|------|-----------|-------|
| VuTQ | Dev | **0.50h** | Mon 27/04 hotfix on #2861 (brand name not populating in what's included) |
| ThinhT | Dev | **0.00h** | Off plan this week (confirmed in Matrix) |
| ViTHT | Dev | **0.00h** | No log yet (Tue morning) |
| DatNT | Dev | **0.00h** | 2 task rows pre-filled (#78399 Dev Done, #78400) but no hours logged yet |
| HaVS | Dev | **0.00h** | Not on plan (absent 5+ wks) |
| LamLQ | Dev | **0.00h** | Not on plan |
| PhatDLT | QC | **0.00h** | No log yet (Tue morning) |
| HungPN | QC | **0.00h** | No log yet |

**Dev total W24:** 0.50h / plan 48h (1.0%)
**QC total W24:** 0.00h / plan 10.5h (0%)
**Grand total W24:** 0.50h (Summary R29 col D)

Note: Mon 27/04 was Hung Kings' holiday — most devs off. Logging starts Tue 28/04 EOD onward.

---

### Part 3 — Plan vs Actual

| Dev | Plan W24 | Actual W24 (day 2) | Expected pace (Tue, ~20%) | Delta |
|-----|----------|---------------------|---------------------------|-------|
| VuTQ | 16h | 0.50h | ~3.2h | -2.7h (only 0.5h logged Mon hotfix) |
| ThinhT | 0h | 0.00h | 0h | 0h (matches — off plan) |
| ViTHT | 16h | 0.00h | ~3.2h | -3.2h (no log yet) |
| DatNT | 16h | 0.00h | ~3.2h | -3.2h (no log yet, tasks pre-staged) |
| LamLQ | 0h (not on plan) | 0.00h | — | n/a |
| HaVS | 0h (not on plan) | 0.00h | — | n/a |
| PhatDLT (QC) | (split 10.5h) | 0.00h | ~2.1h | -2.1h |
| HungPN (QC) | (split 10.5h) | 0.00h | — | n/a if PhatDLT covers |

**Note:** Mon was holiday so the "expected pace" should really be measured from Tue. As of 08:35 Tue 28/04, no devs except VuTQ have logged. Pattern from prior weeks: devs typically fill Mon/Tue logs by Wed morning. Re-check Wed 29/04 morning.

---

### Part 4 — Capacity & Runway

**Source:** "Est vs Charged" tab (excluding Deployed on Live + Cancelled).

| Metric | 04-22 | 04-28 | Δ |
|--------|-------|-------|---|
| Not Started count | — | 12 | — |
| Not Started remaining | — | 139.50h | — |
| In-progress count | — | 14 | — |
| In-progress remaining | — | 11.25h | — |
| **NS+IP remaining** | **351.00h** | **150.75h** | **−200.25h** |
| Runway @ 90h/wk | 3.90 wk | **1.68 wk** | **−2.22 wk** |
| Runway @ 142h/wk | 2.47 wk | 1.06 wk | −1.41 wk |

**Significant decrease:** Runway dropped from 3.90 → 1.68 weeks (NS+IP) over 6 days. Several In-progress tasks moved to Dev Done / Deployed on Staging during W23 (devs logged 152h actual that week). Top remaining NS items now: #2775 (60h, 12h actual), [#1178 reviews](https://trello.com/c/AdUlQD3t) (40h, 0h), [#2524 duplicate charge](https://trello.com/c/VXxyO8IW) (24h, 0h).

**Pipeline thinning:** With dev plan reduced to 48h and runway only 1.68 wk, **backlog is at risk of running dry** in ~7 days unless new estimates are added. Watch #2697 (Next.js 16 upgrade, 0h est, 10.5h actual) and #2836/#2761 (no estimates assigned).

---

### Part 5 — Over-Estimate Tracking

Mandatory check: #2595, #2615, #2735.

| Task | Est | Actual 04-22 | Actual 04-28 | Over% | Status | Trend vs prior |
|------|-----|-------------|-------------|-------|--------|-------|
| [#2735 Pro Send Smart Link](https://trello.com/c/yrbbFhf9) | 90h | 115.00h | **126.00h** | +40% | In-progress (>50%) | ⚠️ STILL GROWING (+11h) |
| [#2615 Gift of Choice](https://trello.com/c/NBzXZigw) | 12h | 106.75h | **106.75h** | +790% | Deployed on Staging | Stable |
| [#2595 GiftDrop Redemption](https://trello.com/c/) | 120h | 168.25h | **168.25h** | +40% | Deployed on Staging | Stable |
| #2702 Accessibility | 8h | 20.50h | **24.00h** | +200% | In-progress (>50%) | ⚠️ STILL GROWING (+3.5h) |
| #2742 GoC select/payment | 12h | 20.25h | **20.25h** | +69% | Not Started | Stable (status anomaly persists) |
| #2640 | 12h | 16.75h | **16.75h** | +40% | In-progress (<50%) | Stable |
| #2695 | 20h | 26.00h | **26.00h** | +30% | In-progress (<50%) | Stable |
| #2639 Active/Inactive cats | 2h | 16.50h | **16.50h** | +725% | Deployed on Staging | Stable |
| #2501 | 4h | 25.50h | **25.50h** | +538% | Deployed on Staging | Stable |
| #2380 checkout date | 4h | 25.25h | **25.25h** | +531% | Deployed on Staging | Stable |
| #2627 | 0.5h | 8.25h | **8.25h** | +1550% | Has Bug on Live | Stable |
| #2624 order complete | 12h | 31.25h | **31.25h** | +160% | Dev Done | Stable |
| #2629 | 8h | 18.25h | **18.25h** | +128% | Dev Done | Stable |
| #2816 | 20h | 24.50h | **32.00h** | +60% | Deployed on Staging | ⚠️ GROWING (+7.5h) |
| #2604 | 1h | 3.50h | **3.50h** | +250% | Deployed on Staging | Stable |
| #2666 | 2h | 5.00h | **5.00h** | +150% | Deployed on Staging | Stable |
| #2815 | 6h | 9.00h | **9.00h** | +50% | Not Started | Stable |
| #2837 | 16h | 17.50h | **17.50h** | +9% | In-progress (>50%) | Stable (under 20% threshold) |

**Active growing tasks (vs 04-22):**
- **#2735** Pro Send Smart Link: +11h (115 → 126), still 40% over 90h est
- **#2702** Accessibility: +3.5h (20.5 → 24), 200% over 8h est
- **#2816**: +7.5h (24.5 → 32), 60% over 20h est (new growth)

**#2742 anomaly persists** — status "Not Started" but 20.25h logged. Lead update needed.

---

### Trello Board (Web Development)

Board: [Web Development (Fountain)](https://trello.com/b/UDrSWage) — id `5475eaf923a9a1309357eb51`. Auth as @rick570.

**Customer comments since 2026-04-22 00:00 UTC** (kunalsheth, tmmckay, mike62798179, iris63293413) — **29 total**:

Apr 22:
1. **2026-04-22T02:47Z** @kunalsheth on [Mother's Day orders not sync](https://trello.com/c/y8lM8Alq) — asking Rick for the 9 order numbers
2. **2026-04-22T02:50Z** @kunalsheth on same — Infinity ground shipping showing today's date in custom field 3
3. **2026-04-22T02:50Z** @kunalsheth on same — example 7538074UV
4. **2026-04-22T02:54Z** @kunalsheth on [Order confirmation email](https://trello.com/c/Zh47TgEt) — only applied to infinity not fountain
5. **2026-04-22T03:03Z** @kunalsheth on Mother's Day — clarifying 7 vs 9 orders
6. **2026-04-22T03:07Z** @kunalsheth on Mother's Day — request 4 orders for fountain
7. **2026-04-22T13:39Z** @tmmckay on [Update to breakpoints](https://trello.com/c/0xVWmSqK) — minor changes posted
8. **2026-04-22T16:51Z** @tmmckay on [Infinity - Product page update](https://trello.com/c/rRU4Qk4n) — ready to pick up

Apr 23:
9. **2026-04-23T04:26Z** @kunalsheth on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — confirming new assets emailed
10. **2026-04-23T04:27Z** @kunalsheth on [Free branded packaging](https://trello.com/c/c1uHuBWW) — push live while waiting for Tom
11. **2026-04-23T04:27Z** @kunalsheth on [What's Included section](https://trello.com/c/ixGA5FuX) — push live while waiting for Tom
12. **2026-04-23T06:40Z** @tmmckay on [Update to breakpoints](https://trello.com/c/0xVWmSqK) — description repopulated
13. **2026-04-23T06:41Z** @tmmckay on [Infinity Cart/Checkout/Order Received](https://trello.com/c/TAopocTs) — ready to pick up
14. **2026-04-23T08:54Z** @tmmckay on Infinity Product page — directing to Kunal
15. **2026-04-23T12:18Z** @tmmckay on [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr) — Dropbox link request
16. **2026-04-23T12:54Z** @kunalsheth on Custom Roses — Dropbox link provided
17. **2026-04-23T12:55Z** @kunalsheth on Update homepage — Dropbox link provided
18. **2026-04-23T12:56Z** @kunalsheth on Product page update — placeholder ok
19. **2026-04-23T14:14Z** @mike62798179 on [Shipstation duplicate shipments](https://trello.com/c/BYu5iwQM) — order **2116900OR** also affected; pattern: claim/giftdrop triggers double
20. **2026-04-23T14:52Z** @kunalsheth on Shipstation — order #2766949BC partially synced; Emily Sarre item missed entirely

Apr 24:
21. **2026-04-24T01:57Z** @kunalsheth on Update homepage — phone (646) 506-3443 + push live timing
22. **2026-04-24T02:19Z** @kunalsheth on same — hero image needs update + mobile scroll bug
23. **2026-04-24T03:48Z** @kunalsheth on Infinity Product page update — added FAQ to description

Apr 25:
24. **2026-04-25T16:23Z** @kunalsheth on [Brand name not populating in what's included](https://trello.com/c/iEKolIxX) — fix and push live; affects ALL boxes ⚠️

Apr 27:
25. **2026-04-27T00:59Z** @kunalsheth on Update homepage — **"Can we push this live tonight? Very important week for us with mother's day."** ⚠️
26. **2026-04-27T01:35Z** @kunalsheth on [GA4 event for new account](https://trello.com/c/VWNJOeoB) — new conversion event request
27. **2026-04-27T14:20Z** @kunalsheth on [Brand name](https://trello.com/c/iEKolIxX) — description fixed but brand name still missing ⚠️
28. **2026-04-27T14:21Z** @kunalsheth on [Open Graph Image](https://trello.com/c/EQDBNvRe) — image attached; make global default
29. **2026-04-27T17:30Z** @tmmckay on [Free branded packaging](https://trello.com/c/c1uHuBWW) — one comment from his side

**Active card counts per list:**

| List | Count | Yesterday (04-22) | Δ |
|------|-------|-------------------|---|
| To-Do | 32 | 32 | 0 |
| Bugs | 10 | 12 | -2 |
| Doing | 6 | 7 | -1 |
| QC Internal | 6 | 6 | 0 |
| QA Backlog | 3 | 2 | +1 |
| In QA | 2 | 2 | 0 |
| Not Passed | 1 | 0 | +1 |
| Done (live) | 932 | — | — |

**Stuck cards (>5 days inactive): 41 total** (vs 44 on 04-22, **−3**). Top:
- 189d [todo] [Platform switcher fix](https://trello.com/c/JVLMbyYO)
- 152d [bugs] [PayPalHttp::HttpError in paypals#generate_order](https://trello.com/c/6MTnv0Cc)
- 145d [todo] [Fountain Pro - Backend Updates](https://trello.com/c/kUkibmUS)
- 123d × 4 [todo] (URL case sensitive, Pro roles, Unit Test, Duplicate Charge)
- 113d × 10 [todo] old backlog items
- 111d [todo] [Implement reviews](https://trello.com/c/AdUlQD3t)
- 87d [qc_internal] [Solution to incorrect delivery dates](https://trello.com/c/oHJ5YO8y)
- 25d [todo] [Performance of website](https://trello.com/c/bUhZxZRE)
- 20d [bugs] [Fountain Pro not uploading to shipstation](https://trello.com/c/5KcDOKx0)
- 19d [todo] [Patch vulnerabilities and delete data](https://trello.com/c/ItHdgsNc)

**Hard-to-release (Doing >=14d): 1 card** (vs 2 prior):
- 24d [States need to be updated + scrolling to bottom](https://trello.com/c/clSdoRlL)

---

**Alerts:**

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Trello/Kunal | **"Push Update homepage live tonight — very important week for mother's day"** (Apr 27) — request unanswered, [Update homepage](https://trello.com/c/S0M1pEOs) | HIGH |
| 2 | Trello/Kunal | **Brand name still missing** in what's included after partial fix (Apr 27 14:20Z) — [card](https://trello.com/c/iEKolIxX) — affects all boxes during Mother's Day week | HIGH |
| 3 | Trello/Mike | Shipstation duplicate shipments **expanded** — #2116900OR added (Apr 23); Kunal: #2766949BC partially synced (Emily Sarre item missing) — [card](https://trello.com/c/BYu5iwQM) | HIGH |
| 4 | Trello/Kunal | Mother's Day orders not syncing — multiple discrepancies in order counts; ground shipping date display bug — [card](https://trello.com/c/y8lM8Alq) | HIGH |
| 5 | Over-est | #2735 Pro Send Smart Link still growing: 115 → 126h (+11h) at +40% over 90h est | MEDIUM |
| 6 | Over-est | #2702 Accessibility still growing: 20.5 → 24h (+3.5h) at +200% over 8h est | MEDIUM |
| 7 | Over-est | #2816 newly growing: 24.5 → 32h (+7.5h) at +60% over 20h est | MEDIUM |
| 8 | Capacity | Runway dropped 3.90 → 1.68 wk (NS+IP); pipeline thinning. Devs logged 152h W23 burning through backlog | MEDIUM |
| 9 | Plan/Matrix | W24 dev plan reduced to 48h (vs 142h W23); ThinhT off-plan; LamLQ off-plan; HaVS still absent | INFO |
| 10 | Task log | All devs except VuTQ at 0h on day 2 of W24 — re-check EOD Tue 28/04 | INFO |
| 11 | Matrix | Token expired at start; recovered via headless puppeteer header capture from saved profile | INFO |
| 12 | Trello/Hard-to-release | #clSdoRlL States update — 24d in Doing, no movement | LOW |
