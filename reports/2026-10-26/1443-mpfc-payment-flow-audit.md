# MPFC payment flow audit: findings + proposed solutions (READ-ONLY, nothing applied)

Date: 2026-10-26 | Server: live 159.65.213.246 (live-php83) | Scope: MemberMouse local billing (Stripe, payment_id=7)

## 0. Already done earlier today (with approval)
- MemberMouse patch: resolve user from order when `user_id=0` (commit `952a0156d`, pushed).
- Data: 11 `user_id=0` schedules repaired. 2+8 trial members charged: 4 OK, 6 declined (now in dunning).
- Fixer: stale-alert dedupe (once per set / 24h), user join via `mm_orders`.
- An integrity-check version of the fixer was deployed at 14:40 and then **rolled back** at 14:43 per instruction. Live now runs the pre-integrity version. Backup: `~/backup-202610260712/`.

## 1. Findings (ranked)

| # | Severity | Finding | Evidence | Impact |
|---|---|---|---|---|
| F1 | ✅ False alarm | Failed rebills (billing_status 2/3/4) sit with `batch_id` set and never progress through dunning retries 2/3. | 35 events, oldest 2025-07-16. Checked each user's **paid bundle**: 28 overdue (no paid access); 1 test account; 1 (teamamorette) manually re-activated by an admin on 2026-02-19 07:40 (no purchase) and given a comp Next Gen Club at 08:47, so this was intentional. There is no card-update feature, so retries 2/3 could not succeed anyway. | No impact: access is correctly blocked after the 1st failure, and nobody has unpaid access. Cosmetic only: these stay "overdue" instead of "cancelled". |
| F2 | ✅ False alarm | Oct 2025 extra charges on items 1482/7017 came from a manual catch-up run. Payment numbers are consecutive, 1 charge each; no double charge. | DB tx log | None. Ignore. |
| F3 | ✅ False alarm | 14 events marked rebilled OK with no transaction near `processed_date`. | 13/14: the charge exists on the **due date**; `processed_date` was only stamped later by the Oct 2025 manual catch-up (the query matched the wrong date). 1/14 (event 15536, item 12084, Jan 2026): subscription was refunded and cancelled in Dec 2025, so the pending event was closed without charging. Correct. | None. |
| F4 | 🟢 Handled | Free-trial checkout still saves the schedule with `user_id=0` (~17% of trials, timing race). | Patched at charge time (commit 952a0156d). Reminders use the order's user. Stripe reads `user_id` only at the patched spot. 0 rows now. | None while the patch exists. Monitor `user_id=0` rows in case a MemberMouse update overwrites the patch. |
| F5 | ✅ Not a bug | MemberMouse disables billing if a restore from backup is suspected (no sweep for 24h + gateway confirms). This is a safety feature. | Billing enabled, sweep current. | None. |
| F6 | ✅ Fixed | Billing safeguards were not in git. | Committed + pushed to live-php83 `afe3ba48e`: db-config srtm_ttl hunk, adonly fixer, mu-plugin cron bridge (force-added). | None. |
| F7 | 🟡 Low | Junk rows: 3 pending `event_type=0` events for cancelled item 10244, 2 orphan 2018/2019 events with no payment row, 2 legacy active Stripe items (2017/2019) with no schedule. | Audit #1–#3. | Harmless to billing. The legacy items need a Stripe check (free access?). |
| OK | ✅ | No double charges since May 2026. 10-23 catch-up had no same-period duplicates. No pending jobs >1h. No owner mismatch. Dunning code logic itself is correct (3 retries → cancel). | Audit #5/#7/#8 | |

## 1b. Additional checks (2026-10-26 15:15, read-only)
| Check | Result | Verdict |
|---|---|---|
| PayPal IPN alive | last IPN 2026-10-25 11:36, 9,704 total | ✅ OK |
| PayPal active monthly items, no payment 45d | 3 (items 25860, 26937, 27250): order status 0 = **abandoned PayPal checkout**, never paid, no paid access (bundle none or cancelled) | ✅ False alarm (orphan pending orders) |
| Resque jobs last 30d | 196 complete, 0 failed; WP cron runs every minute, `mm_resque_jobs_worker` OK | ✅ OK |
| MM diagnostic log errors 14d | none | ✅ OK |
| Cancelled/overdue items whose paid bundle is still active (no other active item) | 25 rows / ~17 users: test account (vuongtrancr+mpfc), comp grants (comp log events), manual admin re-activations (teamamorette), legacy "Coach's Pass" rows | 🟡 Info: admin-managed access, not a billing bug. Optional: Saul reviews the list |
| Annual/other-frequency Stripe subs without upcoming rebill | covered by check #1: only 2 legacy (2017/2019) + 1 test | ✅ OK |

## 2. Proposed solutions (need approval per item)
1. **F1.** No action needed (false alarm). Optional: exclude dunning-state events from future stuck alerts so they don't create noise.
2. **F2.** No action (false alarm).
3. **Root fix for stuck batches (all stages).** In `assignScheduledPaymentsToBatchAndRetrieve`, force the SELECT to master (`$wpdb->send_reads_to_masters()`, HyperDB). One line, removes the bug class instead of relying on srtm_ttl + fixer.
4. **F3.** No action (false alarm).
5. **F5.** No action.
6. **F6.** Commit `db-config.php` (only the srtm_ttl hunk) and move fixer + mu-plugin into git.

## 3. Monitoring: catch issues before members do
Must be **independent of the fixer** (the fixer died silently once). Run it from our alert cron via SSH, read-only SQL plus the Stripe API. Every 30 min. Alert via email + WhatsApp/Slack to us. Each distinct problem alerts once, then repeats daily until resolved.

| Check | Rule | Would have caught |
|---|---|---|
| Billing alive | `scheduled-billing-enabled=1` AND last sweep < 30 min AND fixer heartbeat < 30 min | F5, fixer death (May 2026) |
| Stuck any stage | `status=0 AND batch_id NOT NULL` older than 1h | 10-23 incident (in May) |
| Due vs charged (daily) | rebills due yesterday = succeeded + failed + still pending; gap > 0 → alert | Any silent skip, `user_id=0` case |
| Volume anomaly | daily rebill count > 3× 30-day median or = 0 while due > 0 | 10-23 spike (90 vs ~3/day) **before** Saul saw it |
| Double charge | 2 rebills for the same monthly item within 20 days | Safety net |
| Unbilled active sub | active Stripe item (2024+) with no upcoming event and not in dunning | Free-access trials |
| Owner integrity | `sp.user_id` = 0 or ≠ order owner on pending events | `user_id=0` bug |
| Failure rate | Stripe failed charges in 24h > X% of attempts (Stripe API) | Card/gateway problems |
| Stripe reconciliation (daily) | Stripe succeeded charges vs `mm_transaction_log` rebills; mismatch → alert | F3, ghost successes |
| Worker | `wp_mm_jobs` pending > 1h | Resque/cron down |

Also add these as a section in `/me:mpfc-monitor` (daily report) so they're reviewed every morning.

## Unresolved questions
1. ~~F1~~ resolved: false alarm, no action.
2. ~~F2~~ false alarm, ignore.
3. Monitor: OK to build it on our side (My-AI-Agent cron, read-only), with alert channel = email + WhatsApp to you?
4. Is a Stripe API key available to us read-only (restricted key) for reconciliation, or should we read it from the MM settings?
5. Send Saul the result of the 8-member charge (3 OK / 5 declined)?

## 4. Re-review 2026-10-27 11:00 (read-only)
| Area | Result | Verdict |
|---|---|---|
| Billing monitor | server 78 runs, PC 18 runs, 0 alerts, state empty, dedupe OK | ✅ |
| Rebills | 10-24: 4, 10-25: 5, 10-26: 6 (normal ~4-6/day); fixer heartbeat current | ✅ |
| Jobs per event since 10-23 | 18 events have 2 jobs: 10-23 decline + 10-25 dunning retry (2nd fail = 16). The job skips events already processing/processed, and the Stripe idempotency key is per event | ✅ Normal dunning |
| Dunning-stage stuck since fix | 0 | ✅ |
| `user_id=0` on new schedules since 10-23 | 0, but there have been 0 new trials, so the fix is **not yet proven on a real trial** | 🟡 Watch (monitor `owner` check covers it) |
| Charged 10-26 members | next payment scheduled 26/11 with the correct user | ✅ |
| DB timezone | UTC = UTC_TIMESTAMP, so the NOW() comparisons are correct | ✅ |
| PayPal IPN | arrives daily, 15/15 `subscr_payment` IPNs (14d) have a matching transaction | ✅ |
| Correction (1b) | PayPal orders always have order status 0, so "status 0 = abandoned" was the wrong reason. Corrected reason: items 25860/26937/27250 only have the "Order created" row, never an IPN, and no Coach access | ✅ Still a false alarm |

### Potential risks (not bugs today), proposals only
| # | Risk | Likelihood / impact | Proposal |
|---|---|---|---|
| R1 | Stripe charges OK, but MM records a failure (gateway timeout). The dunning retry runs 2+ days later, after the 24h Stripe idempotency key has expired, so it makes a **real 2nd charge** | Low / high | Only visible on the Stripe side: daily Stripe↔`mm_transaction_log` reconciliation in the monitor (needs a read-only restricted Stripe key) |
| R2 | Retry stuck at dunning stage | Low | ✅ Added to monitor (`dunning-stuck`) 2026-10-27 |
| R3 | PayPal IPN silence | Low / high | ✅ Added to monitor (`paypal-ipn`) 2026-10-27 |
| R4 | Fixer may double-queue a just-batched event | Very low | ✅ Detected by monitor (`double-job`); fixer unchanged |
| R5 | MemberMouse update overwrites the custom `user_id` patch (commit 952a0156d) | Medium / medium | Monitor `owner` check already alerts. Note it in the MPFC plugin-update checklist |

## 5. Stripe ↔ MemberMouse reconciliation (2026-10-27)
Implemented `scripts/mpfc-stripe-reconcile.js`. It runs on the mpfc server only, uses the MM Stripe key in-process, makes GET calls only, runs daily in the billing monitor (check `stripe-unlogged`), and has a `--days N` backfill.
Backfill of 90 days: 352 succeeded MemberMouse charges, **2 paid but not recorded, so the customer has no access**:

| Stripe charge | Date (UTC) | Amount | Email | Product | Finding |
|---|---|---|---|---|---|
| ch_3UKJziIf7uao2WA20h9efdcu | 2026-09-27 15:29 | £39.99 | merdy45@gmail.com | In-App Purchase - DMB 12-16 | No WP user with this email, no order/transaction. Similar accounts (Merdy.finessesport@, merdyk@eastsideperformance) have only the membership bundle, not DMB 12-16 |
| ch_3UK1OSIf7uao2WA22yZcVmuE | 2026-09-26 19:36 | £39.00 | stukelly80@hotmail.com | Developing the Game Changer Masterclass | User 43481 exists, but no Masterclass order, transaction or bundle (only a 2022 Level 1 bundle). Masterclass has sold normally since 2026-05-25 (193 orders), so this is a single failed order creation |

Recovery options (need decision; no action taken): grant access/create order manually, or refund in Stripe. Either way, contact the customer (via Saul).
First-run false positives fixed: a successful dunning retry deletes its scheduled-payment row, so matching falls back to the member's email.

## 6. Deep review 2026-10-28 (read-only)
| Check | Result | Verdict |
|---|---|---|
| Monitor log since 10-27 | 0 alerts, state empty | ✅ |
| MM Stripe payments (non-IAP, 90d) without a Stripe charge | 0 / 359 | ✅ |
| Stripe failed charges that MM recorded as paid | 0 / 85 | ✅ |
| Stripe refunds not reflected | Chad Moran £49.99 (10-23 catch-up): refund row logged in MM, user cancelled, next annual event 2027-06-25 will fail harmlessly. Gerard Kilmartin £39.99: admin refunded and removed bundle 2 within 3 min, then he bought another product | ✅ handled |
| **IAP renewal cron** (theme `plan_service.php` → `updateIAPPurchases`, hourly) | **Real design gap**: it only re-verifies receipts that expired **1-7 days ago**. If the cron is not running in that window (CLI die 05-20 → 10-23) or Apple/Google returns no data (`continue`), the receipt is never re-checked. Live store check (read-only) of 12 receipts since 2025: | 🔴 |

IAP store verification results (no DB writes):
| Store status | Users | Effect |
|---|---|---|
| Stopped paying, still has access | romaz007 (since 2025-10-19), ferrianileonardo (07-26), hillcn98 coach_pass (08-21), kmistrypb (09-20), rupindersharma420 coach_pass (05-20) + Next Gen (10-20) | Free access, 5 users / 6 bundles |
| Still paying, DB stale | livia.puxley_gibbs (store exp 11-19), simonm (11-22) | Access correct; their renewals since May are not recorded as MM orders (reporting gap) |
| Legit other source | lirim (comp after expiry), rohannitin (active Stripe web sub) | ✅ |
| Unverifiable (Apple 21003) | mswcoach, matt.taiwanlife (identical expiry time, likely test receipts) | ? |

Proposals (not applied, live payment code):
1. `updateIAPPurchases`: re-verify every receipt that has an active bundle and expired more than 1 day ago (no 7-day floor), cap per run, and log verify failures instead of a silent `continue`.
2. Run the existing renewal logic once for the 10 receipts above. It extends the 2 still paying, cancels the 6 lapsed bundles, and leaves the 2 unverifiable ones for a manual look.
Monitor: added check `iap-stale` (receipt expired 8+ days, bundle active, excludes web-sub/comp). Currently lists these 10.
