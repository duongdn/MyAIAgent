/**
 * Daily MPFC payment summary for scripts/mpfc-billing-monitor.js (read-only).
 * Sent once per day per channel after 08:00 UTC+7 through the same claim/dedupe as alerts
 * (alert id `daily-digest-YYYY-MM-DD`), so a normal day still produces one "all OK" report.
 */
const DIGEST_HOUR_VN = 8;

/** YYYY-MM-DD in UTC+7, or null before the digest hour. */
function digestDay(now = Date.now()) {
  const vn = new Date(now + 7 * 3600 * 1000);
  return vn.getUTCHours() >= DIGEST_HOUR_VN ? vn.toISOString().slice(0, 10) : null;
}

const STATUS = { 1: 'charged OK', 2: 'declined (1st)', 3: 'declined (2nd)', 4: 'declined (3rd)', 5: 'cancelled after 3 declines' };

/**
 * @param query read-only SQL runner (rows of strings)
 * @param stripe { charges, problems } from scripts/mpfc-stripe-reconcile.js
 * @param openAlerts titles of today's open alerts
 */
function buildDigest(day, query, stripe, openAlerts) {
  const rebills = query(`SELECT COUNT(*), IFNULL(SUM(amount),0) FROM mm_transaction_log WHERE transaction_type=3 AND transaction_date > NOW() - INTERVAL 1 DAY;`)[0];
  const firstPay = query(`SELECT COUNT(*), IFNULL(SUM(amount),0) FROM mm_transaction_log WHERE transaction_type=1 AND amount>0 AND transaction_date > NOW() - INTERVAL 1 DAY;`)[0];
  const byStatus = query(`SELECT sp.billing_status, COUNT(*) FROM mm_scheduled_events se JOIN mm_scheduled_payments sp ON sp.id=se.id
    WHERE se.event_type=1 AND se.processed_date > NOW() - INTERVAL 1 DAY GROUP BY 1;`);
  const due = query(`SELECT COUNT(*), SUM(se.processed_date IS NULL AND se.status=0) FROM mm_scheduled_events se
    WHERE se.event_type=1 AND se.scheduled_date BETWEEN NOW() - INTERVAL 25 HOUR AND NOW() - INTERVAL 1 HOUR;`)[0];
  const refunds = query(`SELECT COUNT(*), IFNULL(SUM(-amount),0) FROM mm_transaction_log WHERE transaction_type=5 AND transaction_date > NOW() - INTERVAL 1 DAY;`)[0];
  const next7 = query(`SELECT COUNT(*) FROM mm_scheduled_events WHERE event_type=1 AND status=0 AND processed_date IS NULL
    AND scheduled_date BETWEEN NOW() AND NOW() + INTERVAL 7 DAY;`)[0][0];
  const fixer = query(`SELECT ROUND((UNIX_TIMESTAMP() - option_value)/60) FROM wp_options WHERE option_name='mpfc_stuck_fixer_last_run';`)[0]?.[0];

  const lines = [
    `Last 24h:`,
    `- Rebills charged: ${rebills[0]} (£${Number(rebills[1]).toFixed(2)})`,
    `- New purchases: ${firstPay[0]} (£${Number(firstPay[1]).toFixed(2)})`,
    `- Refunds: ${refunds[0]}${Number(refunds[0]) ? ` (£${Number(refunds[1]).toFixed(2)})` : ''}`,
    `- Rebill attempts by result: ${byStatus.length ? byStatus.map(([s, n]) => `${STATUS[s] || 'status ' + s} ${n}`).join(', ') : 'none'}`,
    `- Due in the last 24h: ${due[0]}, still not processed: ${due[1] || 0}`,
    `Stripe vs site (last 3 days): ${stripe ? `${stripe.charges} charges, ${stripe.problems.length} not recorded` : 'not available'}`,
    `Stuck-rebill fixer: last run ${fixer ?? '?'} min ago`,
    `Rebills due in the next 7 days: ${next7}`,
    `Open alerts: ${openAlerts.length ? openAlerts.join('; ') : 'none'}`,
  ];
  const ok = !openAlerts.length && !(Number(due[1]) > 0);
  return { id: `daily-digest-${day}`, title: `[MPFC billing] Daily payment summary ${day}: ${ok ? 'all OK' : 'ATTENTION'}`, body: lines.join('\n') };
}

module.exports = { digestDay, buildDigest };
