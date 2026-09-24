---
name: feedback_prestashop2_php72_composer_chronic_error
description: "New Relic Console LIVE RuntimeException (Composer requires PHP>=8.1, staging prestashop2-new running 7.2.24) first appeared 2026-09-18 as a spike, now CONFIRMED CHRONIC as of 2026-09-25 - flat constant ~351/hr for a full 24h window, still unfixed a week later. Needs direct dev notification, not just report-flagging."
metadata:
  type: feedback
---

New Relic Console LIVE `TransactionError` shows `RuntimeException`: "Composer detected issues in your platform: Your Composer dependencies require a PHP version \">= 8.1.0\". You are running 7.2.24-0ubuntu0.18.04.17" at `/var/www/prestashop2-new/vendor/composer/platform_check.php`.

- **2026-09-18 run:** first seen, looked like a NEW spike — 4789x occurrences concentrated in a 3h window (15:07-18:07 UTC).
- **2026-09-25 run:** re-checked hourly breakdown over a full 24h window — count is flat and constant at ~351/hour every single hour, no variation. This means it's not an intermittent spike but a continuously running broken poller/health-check hitting a staging Prestashop path with a PHP 7.2 runtime against Composer deps that now require 8.1+. It has been running unfixed for at least a week (09-18 → 09-25).

**Why this matters:** [[feedback_warning_needs_explanation]] and [[feedback_customer_facing_messages]] mean this gets sanitized into a generic "staging issue, dev aware" WARNING line in the customer Slack post every week — but nothing in that pipeline actually notifies the dev team directly. Report-only flagging isn't fixing it.

**How to apply:**
- Every `bailey-monitor` run: re-check `SELECT count(*) FROM TransactionError WHERE error.class='RuntimeException' SINCE 24 hours ago TIMESERIES 1 hour` — if still flat/constant, note "still unresolved, N days now" in the timeline note (see `config/.monitoring-timelines.json` → `bailey_monitor`).
- Consider escalating directly (Slack `#change-requests` mention to Amy/dev, not just the passive `#maintenance` status line) if it's still present after another run or two — this needs an actual PHP upgrade or disabling the broken staging poller, not perpetual monitoring.
- Not production-impacting (live Console `Controller/*` transactions show no errors, normal DB times) — this is isolated to a staging/secondary path.

[[reference_bailey_monitor_skill_file]]
