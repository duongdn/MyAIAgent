---
name: mpfc-payment-changes-report-only-no-fix
description: MPFC payment/billing audits are report-plus-solution only; never deploy fixes on live without explicit approval
metadata:
  type: feedback
---
When asked to investigate the MPFC payment flow ("investigate lại hết payment flow"), only report findings and propose solutions. Do NOT edit or deploy anything on live, including monitoring code inside the billing fixer.

**Why:** On 2026-10-26 the user stopped a deploy mid-way: "từ từ, ko có fix gì nha, chỉ report và đưa solution thôi, payment cực kì nhạy cảm". The deployed change had to be rolled back.

**How to apply:** Do read-only queries freely. Every live change (code, data, cron, charges) needs an explicit OK for that specific change, even if an earlier fix in the same session was approved. See [[mpfc-missed-rebills-caught-up-after-server-move]].
