---
name: mpfc-account-delete-and-paypal-cancel
description: MPFC app user/delete orphaned subscriptions (fixed f867e03b2); PayPal NVP CAN cancel I- subs though it can't read them — test, don't infer
metadata:
  type: feedback
---
MemberMouse only purges a member's data on WP user delete if NO active subscriptions; old json-api `user/delete` called wp_delete_user() directly → bundles/rebills orphaned (Jonathan Holliday, 2026-10-15). Fixed 2026-10-20 (commit f867e03b2 on `live`): cancel bundles+membership via MM engine first, abort on failure. Tested live with Stripe + PayPal test accounts: both fully cancelled (PayPal sent `subscr_cancel` IPN).

PayPal NVP `GetRecurringPaymentsProfileDetails` fails for `I-` subscriptions ("Subscription Profiles not supported"), but MM's NVP cancel DOES work. Verify PayPal cancel via `mm_paypal_ipn_log.txn_type='subscr_cancel'` (by subscr_id).

**Why:** I inferred "PayPal can't cancel" from the read-API error and nearly told the customer something false; the user insisted on a real test, which disproved it.
**How to apply:** never claim payment-provider behavior from a related API's error — run a real test (test account) before reporting to customer. Customer refunds/PayPal cancels are Saul's job, not ours.
