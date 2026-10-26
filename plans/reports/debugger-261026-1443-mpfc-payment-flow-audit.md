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
| F1 | 🔴 High | **Dunning retries stuck.** Failed rebills (billing_status 2/3/4) got `batch_id` set but were never processed. This is the same replica-read bug as the 10-23 incident, but at the retry stage. Neither the fixer nor the stale alert looks at them, because both only check `processed_date IS NULL`. | 35 events stuck >7 days, oldest 2025-07-16. 30 users have account status 1, but that is only the free "MPFC Membership" level. Their **paid bundle**: 28 overdue (no paid access), 2 active (1 test account, 1 teamamorette re-activated 2026-02-19, likely a re-purchase). | Correct part: access was blocked on the 1st failure. Lost: retries 2/3 never ran, so members who later fixed their card were never re-charged or restored. The 3rd-failure cancel never ran either, so they sit in "overdue" forever instead of "cancelled" (wrong reports, stuck state). Not a free-access leak. |
| F2 | 🔴 High | **Fixer can double-charge.** It re-queues a stuck event without checking whether that period was already charged. | Oct 2025 catch-up: order item 1482 charged twice for Sep 2025 (09-13 and 10-11, £6.50); item 7017 charged twice for Sep (09-12 and 10-11, £9.99). Duplicate event chains: 1482, 7017, 8100. | 2 members overcharged (refund candidates, £16.49 total; confirm in Stripe). Could happen again on any future catch-up. |
| F3 | 🟠 Med | **14 events marked "rebilled OK" (billing_status 1) with no transaction**, Jun–Oct 2025, mostly from the duplicate chains (e.g. item 8100/10133). | Audit query #6. | Either a ghost success (member not charged) or a missing log. Needs Stripe reconciliation. |
| F4 | 🟠 Med | **Root cause of `user_id=0` still exists at checkout.** Free-trial orders are created before the user. It is patched only at charge time. | Order 06:23:48 < user 06:23:51. | Covered by the patch, but any other code that reads `sp.user_id` (reports, reminder emails) still sees 0 until the first charge. |
| F5 | 🟠 Med | **MemberMouse silently disables billing on "backup restore detected"** (last sweep too old, e.g. after a server move or restore). It only emails the WP admin. | `LocalBillingEngine::backupRestoreDetected()` → `disableBilling()`. Currently enabled=1, sweep is current. | One migration or restore can stop all rebills with nobody on our side noticing. |
| F6 | 🟡 Low | Live fixes live outside git: the fixer (`adonly/`, untracked), the mu-plugin (gitignored), and `db-config.php` (srtm_ttl, uncommitted with other people's changes). | `git status` | A deploy or rsync can silently revert the 10-23 fixes and re-create the incident. |
| F7 | 🟡 Low | Junk rows: 3 pending `event_type=0` events for cancelled item 10244, 2 orphan 2018/2019 events with no payment row, 2 legacy active Stripe items (2017/2019) with no schedule. | Audit #1–#3. | Harmless to billing. The legacy items need a Stripe check (free access?). |
| OK | ✅ | No double charges since May 2026. 10-23 catch-up had no same-period duplicates. No pending jobs >1h. No owner mismatch. Dunning code logic itself is correct (3 retries → cancel). | Audit #5/#7/#8 | |

## 2. Proposed solutions (need approval per item)
1. **F1 (stuck dunning).** Extend the fixer's stuck query to dunning states: `processed_date IS NOT NULL AND billing_status IN (2,3,4)`. For the 35 existing ones, clear `batch_id` so MemberMouse's own sweep retries them. **This charges up to 35 cards (or cancels after the 3rd fail), so decide per batch.** Alternative: cancel all >90 days old and only retry recent ones.
2. **F2 (double-charge guard).** Before re-queueing, the fixer skips (and alerts) if `mm_transaction_log` already has a rebill for that order item since `scheduled_date - 1 day`. Refund 1482 and 7017 after verifying in Stripe.
3. **Root fix for stuck batches (all stages).** In `assignScheduledPaymentsToBatchAndRetrieve`, force the SELECT to master (`$wpdb->send_reads_to_masters()`, HyperDB). One line, removes the bug class instead of relying on srtm_ttl + fixer.
4. **F3.** Reconcile those 14 events against Stripe charges (read-only API) before any action.
5. **F5.** Covered by monitoring (below). Add a step to the migration runbook: check `mm-option-scheduled-billing-enabled` after any move.
6. **F6.** Commit `db-config.php` (only the srtm_ttl hunk) and move fixer + mu-plugin into git.

## 3. Monitoring: catch issues before members do
Must be **independent of the fixer** (the fixer died silently once). Run it from our alert cron via SSH, read-only SQL plus the Stripe API. Every 30 min. Alert via email + WhatsApp/Slack to us. Each distinct problem alerts once, then repeats daily until resolved.

| Check | Rule | Would have caught |
|---|---|---|
| Billing alive | `scheduled-billing-enabled=1` AND last sweep < 30 min AND fixer heartbeat < 30 min | F5, fixer death (May 2026) |
| Stuck any stage | `status=0 AND batch_id NOT NULL` older than 1h, **including dunning states** | 10-23 incident (in May), F1 |
| Due vs charged (daily) | rebills due yesterday = succeeded + failed + still pending; gap > 0 → alert | Any silent skip, `user_id=0` case |
| Volume anomaly | daily rebill count > 3× 30-day median or = 0 while due > 0 | 10-23 spike (90 vs ~3/day) **before** Saul saw it |
| Double charge | 2 rebills for the same monthly item within 20 days | F2 |
| Unbilled active sub | active Stripe item (2024+) with no upcoming event and not in dunning | Free-access trials |
| Owner integrity | `sp.user_id` = 0 or ≠ order owner on pending events | `user_id=0` bug |
| Failure rate | Stripe failed charges in 24h > X% of attempts (Stripe API) | Card/gateway problems |
| Stripe reconciliation (daily) | Stripe succeeded charges vs `mm_transaction_log` rebills; mismatch → alert | F3, ghost successes |
| Worker | `wp_mm_jobs` pending > 1h | Resque/cron down |

Also add these as a section in `/me:mpfc-monitor` (daily report) so they're reviewed every morning.

## Unresolved questions
1. F1: the 35 stuck dunning events: retry all, retry only recent (<90 days), or cancel the old ones? (Retrying charges real cards.)
2. F2: refund 1482 (£6.50) and 7017 (£9.99) after Stripe confirmation? Tell Saul?
3. Monitor: OK to build it on our side (My-AI-Agent cron, read-only), with alert channel = email + WhatsApp to you?
4. Is a Stripe API key available to us read-only (restricted key) for reconciliation, or should we read it from the MM settings?
5. Send Saul the result of the 8-member charge (3 OK / 5 declined)?
