## Fountain — 08:30 (+07:00) — W24

Day 3 of W24 (April 27 → May 3, 2026). Mon 27/04 was Hùng Kings holiday. Matrix token expired at start; refreshed via `scripts/matrix-token-refresh.js` (browser SSO).

### Part 1 — Matrix Plan (W24)

Source: room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. No new "Em update plan" message since yesterday — latest:

@trinhmtt — **2026-04-28T01:20Z (08:20 +07)**:
> Em gui plan tuan nay ạ
> VuTQ 16h
> ViTHY 16h  ← typo for ViTHT
> DatNT 16h
> => QC 10,5h

Clarification thread: ThinhT confirmed 0h this week.

**Plan totals W24:** VuTQ 16h + ViTHT 16h + DatNT 16h = **48h dev** + **QC 10.5h** = 58.5h.

### Part 2 — Task Log Actuals (W24, week-to-date)

Source: `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`. Summary R29 col D = **18.00h** (vs 0.50h yesterday — +17.5h logged Tue 28/04).

| Dev | Role | W24 Actual | Plan | Status |
|-----|------|-----------|------|--------|
| VuTQ | Dev | **0.50h** | 16h | Mon hotfix #2861 only; nothing Tue ⚠ |
| ViTHT | Dev | **8.00h** | 16h | Tue full day: #2815, #2702, #2853, #2380 |
| DatNT | Dev | **8.00h** | 16h | Tue full day: 9 bug-fix rows incl #2816, #2835, #2834, #74614 |
| ThinhT | Dev | 0.00h | 0h | Off-plan (confirmed) |
| HaVS | Dev | 0.00h | 0h | Not on plan |
| LamLQ | Dev | 0.00h | 0h | Not on plan |
| PhatDLT | QC | **1.50h** | (split) | Tue: bug check 0.5h + #2816 live test 1.0h |
| HungPN | QC | 0.00h | (split) | No hours yet |

Dev W24 to date: **16.50h / 48h** (34.4%). QC: **1.50h / 10.5h** (14.3%).

### Part 3 — Plan vs Actual

| Dev | Plan | Actual (Day 3) | Expected pace (~40%) | Delta |
|-----|------|----------------|----------------------|-------|
| VuTQ | 16h | 0.50h | ~6.4h | **−5.9h** ⚠ behind |
| ViTHT | 16h | 8.00h | ~6.4h | +1.6h on track |
| DatNT | 16h | 8.00h | ~6.4h | +1.6h on track |
| PhatDLT (QC) | (split 10.5h) | 1.50h | ~2.1h | −0.6h close |
| HungPN (QC) | (split 10.5h) | 0.00h | ~2.1h | −2.1h ⚠ |

⚠ **VuTQ behind by ~6h** — only Mon's 0.5h hotfix; nothing Tue 28/04. Re-check Wed evening.

### Part 4 — Capacity & Runway

| Metric | 04-28 prev | 04-29 today | Δ |
|--------|-----------|-------------|---|
| Not Started count | 12 | 11 | −1 |
| Not Started remaining | 139.50h | 139.50h | 0h |
| In-progress count | 14 | 14 | 0 |
| In-progress remaining | 11.25h | 11.25h | 0h |
| **NS+IP remaining** | **150.75h** | **150.75h** | **0h** |
| **Runway @ 90h/wk** | **1.68 wk** | **1.68 wk** | **flat** |

⚠ Backlog still thin: pipeline at **1.68 weeks** of dev capacity. New estimates urgently needed.

### Part 5 — Over-Estimate Tracking

| Task# | Est | Actual 04-29 | Over% | Status | vs prev |
|-------|-----|--------------|-------|--------|---------|
| [#2595 GiftDrop redemption](https://trello.com/c/) | 120h | 168.25h | +40% | Deployed on Staging | Stable |
| [#2615 Gift of Choice](https://trello.com/c/NBzXZigw) | 12h | 106.75h | +790% | Deployed on Staging | Stable |
| [#2735 Pro Send Smart Link](https://trello.com/c/yrbbFhf9) | 90h | 126.00h | +40% | In-progress (>50%) | Stable (paused) |
| **#2702 Accessibility** | 8h | 25.00h | +212% | In-progress | **+1.0h STILL GROWING** ⚠ |
| **#2816 Infinity homepage** | 20h | 35.00h | +75% | Deployed on Staging | **+3.0h STILL GROWING** ⚠ |
| **#2815 Branded packaging modal** | 6h | 10.25h | +71% | Not Started | **+1.25h GROWING** + status anomaly ⚠ |
| #2742 GoC select/payment | 12h | 20.25h | +69% | Not Started | Stable (status anomaly persists) |
| #2640 | 12h | 16.75h | +40% | In-progress (<50%) | Stable |
| #2695 | 20h | 26.00h | +30% | In-progress (<50%) | Stable |
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live | Stable |
| #2639 active/inactive cats | 2h | 16.50h | +725% | Deployed on Staging | Stable |
| #2501 | 4h | 25.50h | +538% | Deployed on Staging | Stable |
| #2380 checkout date | 4h | 25.25h | +531% | Deployed on Staging | Stable |
| #2624 order complete | 12h | 31.25h | +160% | Dev Done | Stable |
| #2629 | 8h | 18.25h | +128% | Dev Done | Stable |
| #2604 | 1h | 3.50h | +250% | Deployed on Staging | Stable |
| #2666 | 2h | 5.00h | +150% | Deployed on Staging | Stable |

**Growing tasks vs 04-28:** #2702 (+1h), #2816 (+3h), #2815 (+1.25h with status anomaly). #2742 anomaly persists (NS but 20.25h logged) — needs lead update.

### Trello Board — Web Development

Board `5475eaf923a9a1309357eb51` (Rick's account).

**List counts (vs 04-28):**

| List | 04-29 | 04-28 | Δ |
|------|-------|-------|---|
| To-Do | 32 | 32 | 0 |
| Bugs | 11 | 10 | +1 |
| Doing | 7 | 6 | +1 |
| QC Internal | 3 | 6 | −3 |
| QA Backlog | 4 | 3 | +1 |
| In QA | 2 | 2 | 0 |
| Not Passed | 2 | 1 | +1 |
| Done (live) | 933 | 932 | +1 |

QC Internal drained 3 cards into next stages.

**Customer comments since 28/04 01:30Z:**

1. 28/04 13:30Z **@mike62798179** on [Editing the Address during checkout is not saving changes](https://trello.com/c/hbDunrDF) — attached screen recording reproducing the bug
2. 28/04 13:49Z **@kunalsheth** on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — list of issues (corporate gifting routing, hover behaviour…)
3. 28/04 13:59Z **@kunalsheth** on [Infinity - Cart, Checkout, Order Received Update](https://trello.com/c/TAopocTs) — ⚠ **"Please prioritize this over anything Fountain related"** (priority directive)
4. 28/04 17:48Z **@tmmckay** on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — Figma comment link + design clarifications
5. 28/04 18:10Z **@tmmckay** on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — web-ready assets attached
6. 28/04 18:22Z **@tmmckay** on [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr) — web-ready assets attached
7. 28/04 21:17Z **@tmmckay** on [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr) — variable rollout plan

**Stuck cards (>5d):** 39 total (−2 from 04-28). Top: Platform switcher fix (190d), PayPalHttp::HttpError (153d), Fountain Pro Backend Updates (146d), 124d×4 cluster, 114d×9 cluster, [Solution to incorrect delivery dates](https://trello.com/c/oHJ5YO8y) (88d).

**Hard-to-release (Doing >=14d):** 1 card unchanged — [Fountain - States/scrolling on login](https://trello.com/c/clSdoRlL) (25d).

### Fountain — Alerts summary
- ⚠ **VuTQ −5.9h vs pace** (only Mon 0.5h hotfix; no Tue log) — recheck Wed evening
- ⚠ **#2702 +1h, #2816 +3h, #2815 +1.25h** STILL GROWING vs 04-28
- ⚠ **#2815, #2742** still "Not Started" but actuals logged — status anomaly
- ⚠ **Runway 1.68 wk** (flat) — backlog still thin
- ⚠ **Kunal priority directive** 28/04 13:59Z: prioritize Infinity Cart/Checkout over Fountain
- ⚠ **Production Rollbar #874** (FirstProject `Cannot read properties of undefined (reading 'amount')`) — see Email section
