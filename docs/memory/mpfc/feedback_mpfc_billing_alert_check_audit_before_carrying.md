---
name: feedback_mpfc_billing_alert_check_audit_before_carrying
description: "35 failed rebills not retried" was a false alarm closed by audit 10-26 14:43 (F1) — daily report carried it 2 days
metadata:
  type: feedback
---
2026-10-28: user "lấy từ đâu vậy, nó resolve rồi mà?" — daily report 10-27 + 10-28 kept alerting the 10-26 14:42 `[MPFC] ALERT billing integrity` (35 failed rebills) though `reports/2026-10-26/1443-mpfc-payment-flow-audit.md` F1 = false alarm.

**Why:** carried a prior report's alert forward without checking later resolution.
**How to apply:** before repeating any MPFC billing alert, grep `reports/*/*mpfc-payment*` audits + [[project_mpfc_missed_rebills_caught_up_after_server_move]]. Billing monitor liveness: `tail tmp/alert-logs/mpfc-billing-monitor.log` (15m, "0 alert(s)" = quiet OK). NR on MPFC disabled on purpose — no NR daily report is expected.
