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
| F2 | 🟢 Low (not a double charge) | Oct 2025 manual catch-up (run by DuongDN) of stuck events for items 1482 and 7017. | Payment numbers are consecutive with exactly 1 charge each (1482: #99 13/08, #100 13/09, #101 11/10, #102 13/10…). The stuck events that had already been charged (15066, 15070) were re-run but produced **no new transaction** (the Stripe idempotency key per event returned the original charge). The 2 October charges are #101 and #102, so the schedule was pulled forward by one cycle. No refund in DB (type 5 = 0). | 1482 is still active: prepaid 1 month ahead, no loss. 7017 cancelled after the 12/11/2025 charge: may have paid 1 cycle earlier than needed (£9.99), minor. No refund needed. |
| F3 | 🟠 Med | **14 events marked "rebilled OK" (billing_status 1) with no transaction**, Jun–Oct 2025, mostly from the duplicate chains (e.g. item 8100/10133). | Audit query #6. | Either a ghost success (member not charged) or a missing log. Needs Stripe reconciliation. |
| F4 | 🟠 Med | **Root cause of `user_id=0` still exists at checkout.** Free-trial orders are created before the user. It is patched only at charge time. | Order 06:23:48 < user 06:23:51. | Covered by the patch, but any other code that reads `sp.user_id` (reports, reminder emails) still sees 0 until the first charge. |
| F5 | 🟠 Med | **MemberMouse silently disables billing on "backup restore detected"** (last sweep too old, e.g. after a server move or restore). It only emails the WP admin. | `LocalBillingEngine::backupRestoreDetected()` → `disableBilling()`. Currently enabled=1, sweep is current. | One migration or restore can stop all rebills with nobody on our side noticing. |
| F6 | 🟡 Low | Live fixes live outside git: the fixer (`adonly/`, untracked), the mu-plugin (gitignored), and `db-config.php` (srtm_ttl, uncommitted with other people's changes). | `git status` | A deploy or rsync can silently revert the 10-23 fixes and re-create the incident. |
| F7 | 🟡 Low | Junk rows: 3 pending `event_type=0` events for cancelled item 10244, 2 orphan 2018/2019 events with no payment row, 2 legacy active Stripe items (2017/2019) with no schedule. | Audit #1–#3. | Harmless to billing. The legacy items need a Stripe check (free access?). |
| OK | ✅ | No double charges since May 2026. 10-23 catch-up had no same-period duplicates. No pending jobs >1h. No owner mismatch. Dunning code logic itself is correct (3 retries → cancel). | Audit #5/#7/#8 | |

## 2. Proposed solutions (need approval per item)
1. **F1.** No action needed (false alarm). Optional: exclude dunning-state events from future stuck alerts so they don't create noise.
2. **F2.** No refund. Optional: when catching up a stuck event manually, re-run only the stuck event (Stripe idempotency makes it safe) and do not also run the next-period event on the same day.
3. **Root fix for stuck batches (all stages).** In `assignScheduledPaymentsToBatchAndRetrieve`, force the SELECT to master (`$wpdb->send_reads_to_masters()`, HyperDB). One line, removes the bug class instead of relying on srtm_ttl + fixer.
4. **F3.** Reconcile those 14 events against Stripe charges (read-only API) before any action.
5. **F5.** Covered by monitoring (below). Add a step to the migration runbook: check `mm-option-scheduled-billing-enabled` after any move.
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
2. ~~F2~~ resolved: not a double charge (manual catch-up, schedule shifted one cycle), no refund.
3. Monitor: OK to build it on our side (My-AI-Agent cron, read-only), with alert channel = email + WhatsApp to you?
4. Is a Stripe API key available to us read-only (restricted key) for reconciliation, or should we read it from the MM settings?
5. Send Saul the result of the 8-member charge (3 OK / 5 declined)?
