---
name: mpfc-billing-monitor-dual-machine
description: MPFC read-only billing monitor runs on the mpfc server and the office PC every 15 min, deduped through one server-side state file
metadata:
  type: project
---
Script `scripts/mpfc-billing-monitor.js` was built 2026-10-26. Checks live in `scripts/lib/mpfc-billing-monitor-checks.js`, senders in `scripts/lib/mpfc-billing-alert-channels.js`.
- **Schedule:** cron runs `scripts/mpfc-billing-monitor-cron.sh` on the mpfc server (`*/15`, mpfc user, /var/www/MyDailyAgent) and on the office PC (`7-59/15`).
- **Dedupe:** each run claims (alert, channel) pairs from `/var/www/MyDailyAgent/data/mpfc-billing-monitor-state.json` on the server, under flock. Each alert goes to each channel exactly once, with NO reminders: the user only wants the two machines deduped, not repeated alerts. The PC is on only 08:00-17:00 UTC+7; outside that the server runs alone. Resolved alerts are dropped, so a recurrence alerts again. The PC also flags the server monitor if it has not run for 1h+.
- **Channels:** the server sends email + Slack, so it covers the PC being off at night. The PC adds Telegram, the assistant inbox (source `mpfc-billing`), desktop, and WhatsApp (only when `config/.mpfc-billing-monitor.json` has `whatsappChat`).
- **Email:** sent from and to freelancer@mypersonalfootballcoach.com (user requirement), via the site's wp_mail (`wp eval-file scripts/lib/mpfc-billing-alert-wp-mail.php`). The Gmail service account is read-only, and the site mailer rewrites From to info@.
- **Slack:** self-DM in the MPFC workspace.
- **Testing:** `--dry-run` and `--test-alert`.

**Why:** the client must never find a billing problem before we do (2026-10-23 £1.2k catch-up incident).
**How to apply:** checks are tuned to skip the audit's false alarms (dunning-state events, manual catch-ups, admin comps). Do not add checks that flag those. See [[mpfc-missed-rebills-caught-up-after-server-move]], [[mpfc-payment-changes-report-only-no-fix]].
- WhatsApp channel is PENDING (2026-10-26): user will discuss it with Saul first. Do not configure `whatsappChat` until the user says so.
- 2026-10-27: added checks `dunning-stuck` (only events processed after 2026-10-23), `double-job` (2 jobs for one event within 60 min), `paypal-ipn` (no IPN for 4+ days). Stripe reconciliation (R1) is pending a read-only restricted Stripe key.
- 2026-10-27: Stripe reconciliation `scripts/mpfc-stripe-reconcile.js` (server only, MM live key read in-process, GET only, cached daily, `--days N` backfill) is wired into the monitor as `stripe-unlogged`. The 90-day backfill found 2 paid-but-unrecorded charges (merdy45 £39.99 IAP, stukelly80 £39 Masterclass), decision pending. Gotcha: a successful dunning retry deletes its scheduled_payments row, so match by email as a fallback.
