# Refresh Update — 2026-03-26 10:48

**Window:** 08:21 → 10:56 (+07:00)

## New Alerts

| Severity | Source | Summary | Link |
|----------|--------|---------|------|
| HIGH | Discord | Guild channel access 403 on all 3 servers (AirAgri, HOMIEAPP, Bizurk). Tokens authenticate but lack guild permissions | — |
| MEDIUM | Email/rick | FountainGifts prod PG::AmbiguousColumn error #254 (new, different from DB connection refused) | Rollbar |
| MEDIUM | Google Sheets | Fountain team — ViTHT, HungPN, TrinhMTT all **0h entire week**. ThinhT only 4h | |
| MEDIUM | Scrin.io | TuanNT Scrin tracker active (1h 25m today) despite being on full-day leave in task log | |

## Source Summary

| Source | Status | New Since 08:21 |
|--------|--------|-----------------|
| Slack (14 ws) | OK | 77 msgs across 9 ws — Generator busy (Rudi issues), WilliamBills ticket complaints, Equanimity fix pushed |
| Discord (2 acct) | **403** | Tokens valid but guild channels forbidden — permission issue |
| Email (6) | OK | rick@: Fountain PG error; nick@: Azure DevOps PRs; ken@: 7 GitHub PRs; duongdn@: remote work requests |
| Google Sheets | OK | Most devs 0h today (normal at 10AM). Fountain team concern below |
| Scrin.io | OK | TuanNT 1h 25m tracked despite leave |
| Upwork (5) | OK | Rory/LeNH 18h (+1h since morning), Bailey-VietPH 14:50h, rest unchanged |
| GitHub | No change | Elena PRs already deployed, Precognize no new activity |
| Redmine | 1 new | #77874 — Maddy bulk update price button blocking |
| Matrix | OK | Weekly plan confirmed, HaVS borrowed ~1h for Bailey |

## Slack Details

**Generator** (16 msgs) — Rudi raising incident management visibility bug, doctrine/dbal error, MR review requests. Carrick responding + fixing. New Trello issues assigned.

**William Bills** (20 msgs) — Oliver & Lucas active. **Users complaining about broken ticket visibility in backend again.** Subscription page updates, NextJS deployment discussion.

**Equanimity** (14 msgs) — Face scan fix pushed by Carrick, awaiting client retest.

**Amazing Meds** (7 msgs) — Nick back at work, John assigning bio update + button color widget task.

**SAM GUARD** (6 msgs) — 4 new HubSpot MQL leads, Lena asking Michelle for feedback.

**Xtreme Soft** (5 msgs) — Kai/Anomawasala discussing Shopify SKU + template issues on rms4.

**Global Grazing** (3 msgs) — Stock correction in progress, Amy compiling report.

**Swift Studio** (3 msgs) — Rory asking Jeff about Google Play release.

**Baamboozle** (3 msgs) — GitHub notifications only.

## Google Sheets — Developer Hours (Thu Mar 26, ~10:49 AM)

| Developer | Project | Mon–Wed Total | Today | Note |
|-----------|---------|---------------|-------|------|
| LongVV | Maddy | 24h | — | On track |
| PhucVT | Maddy | 24h | — | On track |
| VuTQ | Fountain | 24h | — | On track |
| VietPH | Bailey/Paturevision | 14.5h | partial | On track |
| KhanhHH | Generator | 16h | — | Recovered (was 0h Tue, now 16h Mon+Wed) |
| LeNH | Rory+Francesca+Aysar | 15.83h | — | Below 8h/day avg (~5.3h/day) |
| ViTHT | Fountain | **0h** | — | Entire week zero |
| HungPN | Fountain | **0h** | — | Entire week zero |
| TrinhMTT | Fountain | **0h** | — | Entire week zero |
| ThinhT | Fountain | 4h | — | Only Tue |
| TuanNT | All | 0h | — | On leave Mon–Wed confirmed |
| DuongDN | Marcel | 0.83h | — | Adhoc, expected |

## Upwork Weekly Hours (Mar 23–29, updated)

| Workroom | Developer | This Week | Change |
|----------|-----------|-----------|--------|
| Rory | LeNH | 18:00 | +1h since morning |
| Aysar | LeNH | 4:00 | No change |
| Bailey DEV1 | VietPH | 14:50 | +0:50 since morning |
| Bailey DEV3 | DuongDN | 0:00 | No change |
| Neural Contract | external | 0:00 | No change |

## Redmine

- **#77874** (NEW) — "Cần chặn click nhiều lần vào Bulk update price button" — Maddy, assigned LongVV. [Link](https://redmine.nustechnology.com/issues/77874)
- **#77793** — Deployed (Elena Digital Plant) — already tracked

## Matrix / Fountain

- **@duongdn** (09:18) — Trinh Mai borrowing HaVS ~1.5h for urgent Bailey task
- **@trinhmtt** (09:31) — Weekly plan: ViTHT 22h, ThinhT 4h, HaVS 22.5h, VuQT 40h, QC 22h (total 110.5h)
- **@havs** (10:25) — Bailey task done (1h used), ~23h remaining for Fountain
- **@hungpn/@vutq** — Status check exchange, confirmed working

## Unresolved Questions

1. **Discord 403** — guild channel access forbidden despite valid tokens. Permissions changed? Needs manual check.
2. **Fountain team 0h** — ViTHT, HungPN, TrinhMTT all 0h entire week in task log. Different logging system? Or not yet filled?
3. **TuanNT Scrin active on leave** — 1h 25m tracked today while marked full-day off.
4. **LeNH below target** — task log 15.83h in 3 days (~5.3h/day) vs Upwork 22h. Discrepancy.
5. **WilliamBills ticket visibility** — users complaining again. Same issue or new?
