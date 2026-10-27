#!/usr/bin/env node
/**
 * MPFC Stripe <-> MemberMouse reconciliation (READ-ONLY, runs ON the mpfc server only).
 * Finds Stripe charges that SUCCEEDED but have no matching payment in mm_transaction_log, i.e. the member
 * paid but MemberMouse did not record it (gateway timeout etc.). Those need recovering for the customer
 * (restore access / avoid a dunning re-charge).
 *
 * The Stripe secret key is read in-process from MemberMouse settings (mm_payment_services id 7). It is never
 * printed or written anywhere. Only GET requests are made.
 * Result is cached for 24h (daily check) in data/mpfc-stripe-reconcile.json; window = last 3 days.
 *
 * Output (stdout): JSON array of problem rows [chargeId, createdUtc, amount, email, product, reason]
 *   node scripts/mpfc-stripe-reconcile.js           (cached daily)
 *   node scripts/mpfc-stripe-reconcile.js --fresh   (ignore cache)
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execFileSync } = require('child_process');

const WP = ['--path=/var/www/mypersonalfootballcoach.com', '--skip-plugins', '--skip-themes'];
const CACHE = path.join(__dirname, '..', 'data', 'mpfc-stripe-reconcile.json');
const WINDOW_S = 3 * 86400, SETTLE_S = 1800, MATCH_S = 2 * 3600;

const sql = (q) => execFileSync('wp', [...WP, 'db', 'query', '--skip-column-names'], { input: q, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] })
  .split('\n').filter(Boolean).map(l => l.split('\t'));

function stripeKey() {
  const [[settings]] = sql('SELECT settings FROM mm_payment_services WHERE id=7;');
  const m = settings.match(/"liveAPIKey";s:\d+:"(sk_live_[A-Za-z0-9]+)"/);
  if (!m) throw new Error('Stripe live key not found in MemberMouse settings');
  return m[1];
}

function stripeGet(key, urlPath) {
  return new Promise((resolve, reject) => {
    https.get({ hostname: 'api.stripe.com', path: urlPath, timeout: 30000, headers: { Authorization: `Bearer ${key}` } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { const j = JSON.parse(d); j.error ? reject(new Error(`stripe: ${j.error.message}`)) : resolve(j); });
    }).on('error', reject);
  });
}

async function succeededCharges(key, from, to) {
  const out = [];
  let after = '';
  for (;;) {
    const page = await stripeGet(key, `/v1/charges?limit=100&created[gte]=${from}&created[lte]=${to}${after}`);
    out.push(...page.data.filter(c => c.status === 'succeeded' && c.amount_refunded < c.amount
      && String(c.metadata?.platform || '').includes('MemberMouse')));
    if (!page.has_more) return out;
    after = `&starting_after=${page.data[page.data.length - 1].id}`;
  }
}

async function reconcile() {
  const now = Math.floor(Date.now() / 1000), from = now - WINDOW_S, to = now - SETTLE_S;
  const charges = await succeededCharges(stripeKey(), from, to);
  // MM payments (initial=1, rebill=3) around the window, with the order owner's email
  const tx = sql(`SELECT t.order_item_id, UNIX_TIMESTAMP(t.transaction_date), LOWER(u.user_email) FROM mm_transaction_log t
    JOIN mm_orders o ON o.id=t.order_id LEFT JOIN wp_users u ON u.ID=o.user_id
    WHERE t.transaction_type IN (1,3) AND t.transaction_date > FROM_UNIXTIME(${from - MATCH_S});`)
    .map(([item, ts, email]) => ({ item, ts: Number(ts), email }));
  const spIds = charges.map(c => Number(c.metadata.scheduledPaymentId)).filter(Boolean);
  const spItem = Object.fromEntries(spIds.length ? sql(`SELECT id, order_item_id FROM mm_scheduled_payments WHERE id IN (${spIds.join(',')});`) : []);

  const problems = [];
  for (const c of charges) {
    const email = String(c.billing_details?.email || c.receipt_email || '').toLowerCase();
    const near = t => Math.abs(t.ts - c.created) <= MATCH_S;
    const spId = c.metadata.scheduledPaymentId;
    // a successful dunning retry deletes its scheduled payment row, so fall back to the member's email
    const ok = (spItem[spId] && tx.some(t => t.item === spItem[spId] && near(t))) || tx.some(t => t.email === email && near(t));
    if (!ok) problems.push([c.id, new Date(c.created * 1000).toISOString(), `${(c.amount / 100).toFixed(2)} ${c.currency.toUpperCase()}`,
      email, c.metadata.membermouse_product || '', spId ? `rebill (scheduled payment ${spId}) not logged in MemberMouse` : 'payment not logged in MemberMouse']);
  }
  return { checkedAt: now, charges: charges.length, problems };
}

(async () => {
  let cache = null;
  try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch {}
  if (process.argv.includes('--fresh') || !cache || Date.now() / 1000 - cache.checkedAt > 86400) {
    cache = await reconcile();
    fs.mkdirSync(path.dirname(CACHE), { recursive: true });
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));
  }
  process.stdout.write(JSON.stringify(cache.problems));
})().catch(e => { process.stdout.write(JSON.stringify([['stripe-reconcile', `check failed: ${e.message}`]])); });
