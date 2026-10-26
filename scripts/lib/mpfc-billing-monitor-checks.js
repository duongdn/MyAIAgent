/**
 * Read-only billing invariants for scripts/mpfc-billing-monitor.js (MemberMouse local billing, Stripe = payment_id 7).
 * Each check: { key, title, why, sql, evaluate? }. Rows returned (after evaluate) = problems.
 * Column 1 of every problem row must be a STABLE identifier (event id, item id, check name):
 * the alert id is hashed from it, so the same problem is not re-alerted on every run.
 * Tuned after the 2026-10-26 audit: dunning-state events, manual catch-ups and admin comps are NOT problems.
 */
const CHECKS = [
  {
    key: 'billing-off', title: 'Billing disabled or sweep not running',
    why: 'MemberMouse is not running rebills (billing switched off, or no sweep for 30+ min). No member gets charged.',
    sql: `SELECT option_name, option_value FROM wp_options WHERE option_name IN ('mm-option-scheduled-billing-enabled','mm-option-last-billing-sweep');`,
    evaluate: rows => {
      const o = Object.fromEntries(rows);
      const out = [];
      if (o['mm-option-scheduled-billing-enabled'] === '0') out.push(['billing-enabled', '0']);
      const age = Date.now() / 1000 - Number(o['mm-option-last-billing-sweep'] || 0);
      if (age > 1800) out.push(['last-sweep', `${Math.round(age / 60)} min ago`]);
      return out;
    },
  },
  {
    key: 'fixer-dead', title: 'Stuck-rebill fixer not running',
    why: 'The 15-min safety net (mu-plugin -> adonly fixer) has no heartbeat for 45+ min. This is how rebills went stuck May-Oct 2026 unnoticed.',
    sql: `SELECT option_value FROM wp_options WHERE option_name='mpfc_stuck_fixer_last_run';`,
    evaluate: rows => {
      const age = Date.now() / 1000 - Number(rows[0]?.[0] || 0);
      return age > 2700 ? [['fixer-heartbeat', rows[0] ? `${Math.round(age / 60)} min ago` : 'missing']] : [];
    },
  },
  {
    key: 'stuck', title: 'Rebills stuck (not charged)',
    why: 'Due rebill picked into a batch but never queued (HyperDB replica bug class). The fixer should clear these within 15 min.',
    sql: `SELECT se.id, se.scheduled_date, sp.order_item_id, sp.user_id FROM mm_scheduled_events se JOIN mm_scheduled_payments sp ON sp.id=se.id
      WHERE se.event_type=1 AND se.status=0 AND se.processed_date IS NULL AND se.batch_id IS NOT NULL AND se.batch_id<>''
        AND se.scheduled_date < NOW() - INTERVAL 1 HOUR;`,
  },
  {
    key: 'not-picked', title: 'Due rebills not picked up',
    why: 'Rebill due 2h+ ago, still pending without a batch: the billing sweep is not picking them up.',
    sql: `SELECT se.id, se.scheduled_date, sp.order_item_id FROM mm_scheduled_events se JOIN mm_scheduled_payments sp ON sp.id=se.id
      WHERE se.event_type=1 AND se.status=0 AND se.processed_date IS NULL AND se.batch_id IS NULL
        AND sp.billing_status IN (0,9) AND se.scheduled_date BETWEEN '2024-01-01' AND NOW() - INTERVAL 2 HOUR;`,
  },
  {
    key: 'owner', title: 'Scheduled payment with wrong/missing member',
    why: 'user_id=0 or different from the order owner. Charge-time patch (commit 952a0156d) should fix these; if they fail, the patch may have been overwritten.',
    sql: `SELECT sp.id, sp.user_id, o.user_id FROM mm_scheduled_payments sp JOIN mm_scheduled_events se ON se.id=sp.id
      JOIN mm_order_items oi ON oi.id=sp.order_item_id JOIN mm_orders o ON o.id=oi.order_id
      WHERE se.status=0 AND se.processed_date IS NULL AND sp.user_id<>o.user_id AND se.scheduled_date < NOW();`,
  },
  {
    key: 'jobs', title: 'Billing jobs not processed',
    why: 'Charge jobs waiting 1h+: the resque worker (WP cron mm_resque_jobs_worker) is not running.',
    sql: `SELECT id, created_at FROM wp_mm_jobs WHERE status='pending' AND created_at < UTC_TIMESTAMP() - INTERVAL 1 HOUR;`,
  },
  {
    key: 'spike', title: 'Unusual number of rebill charges',
    why: 'Charges in the last 24h far above normal: a backlog release or duplicate run (2026-10-23: 90 in 4 minutes).',
    sql: `SELECT (SELECT COUNT(*) FROM mm_transaction_log WHERE transaction_type=3 AND transaction_date > NOW() - INTERVAL 1 DAY),
      (SELECT COUNT(*)/30 FROM mm_transaction_log WHERE transaction_type=3 AND transaction_date BETWEEN NOW() - INTERVAL 31 DAY AND NOW() - INTERVAL 1 DAY);`,
    evaluate: ([[n, avg]]) => (Number(n) > Math.max(15, 3 * Number(avg)) ? [['rebills-24h', `${n} (30-day avg ${Number(avg).toFixed(1)}/day)`]] : []),
  },
  {
    key: 'declines', title: 'Unusual number of declined rebills',
    why: 'Many first-attempt declines in 24h: possible Stripe/gateway or card-data problem.',
    sql: `SELECT COUNT(*) FROM mm_scheduled_events se JOIN mm_scheduled_payments sp ON sp.id=se.id
      WHERE se.event_type=1 AND sp.billing_status=2 AND se.processed_date > NOW() - INTERVAL 1 DAY;`,
    evaluate: ([[n]]) => (Number(n) >= 8 ? [['declines-24h', n]] : []),
  },
  {
    key: 'double', title: 'Possible double charge',
    why: 'Two rebills on one monthly subscription within 20 days (new in last 2 days). Check whether it was a manual catch-up before refunding.',
    sql: `SELECT b.id, a.order_item_id, a.transaction_date, b.transaction_date, b.amount FROM mm_transaction_log a
      JOIN mm_transaction_log b ON b.order_item_id=a.order_item_id AND b.id>a.id AND b.transaction_type=3
        AND b.transaction_date < a.transaction_date + INTERVAL 20 DAY
      JOIN mm_order_items oi ON oi.id=a.order_item_id AND oi.rebill_frequency='months' AND oi.rebill_period=1
      WHERE a.transaction_type=3 AND a.is_test=0 AND b.transaction_date >= NOW() - INTERVAL 2 DAY;`,
  },
  {
    key: 'unbilled', title: 'Active Stripe subscription with no upcoming rebill',
    why: 'Paid subscription active but nothing scheduled and not in dunning: member keeps access without being billed.',
    // 12042 = test account (vuongtrancr+testpay)
    sql: `SELECT oi.id, o.user_id, oi.description FROM mm_order_items oi JOIN mm_orders o ON o.id=oi.order_id
      JOIN mm_user_data ud ON ud.wp_user_id=o.user_id
      WHERE o.payment_id=7 AND o.status<>0 AND oi.is_recurring=1 AND oi.status=1 AND oi.is_test=0 AND ud.status IN (1,9)
        AND o.date_added >= '2024-01-01' AND oi.id NOT IN (12042)
        AND NOT EXISTS (SELECT 1 FROM mm_scheduled_payments sp JOIN mm_scheduled_events se ON se.id=sp.id
                        WHERE sp.order_item_id=oi.id AND se.status=0);`,
  },
];

module.exports = { CHECKS };
