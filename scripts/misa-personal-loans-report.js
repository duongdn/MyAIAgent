#!/usr/bin/env node
/**
 * Personal loans (cho vay / đi vay cá nhân) per person, from MISA transactions.
 * Usage: node scripts/misa-personal-loans-report.js [tmp/misa-out.json]
 *
 * Reads Cho vay / Thu nợ / Đi vay / Trả nợ in LIVING wallets only (investment wallets'
 * Cho vay/Thu nợ = buying/redeeming funds, not personal loans). Person name is parsed
 * from the description ("Vay chị Ky", "Cho a Dũng vay", "a Dũng trả nợ").
 * History starts 2024-01-01 (API limit), so a negative balance = settling a pre-2024
 * debt; the balance is then reset to 0 at that point ("settled") and only later
 * movements count as currently open.
 */
const fs = require('fs');
const file = process.argv[2] || 'tmp/misa-out.json';
const { apiData } = JSON.parse(fs.readFileSync(file, 'utf8'));
const INVEST = /FPTS|VCBS|VCBF|Finhay|Larion|vàng|tikop|tikcop/i;
const CATS = ['Cho vay', 'Thu nợ', 'Đi vay', 'Trả nợ'];
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const personOf = (d) => (d || '(không ghi)')
  .replace(/^(Cho|Vay|Trả nợ)\s+/i, '')
  .replace(/\s*(vay|trả nợ|tiên bảo hiểm|sn)\s*$/i, '')
  .replace(/\s+/g, ' ').trim().toLowerCase();

const txns = apiData.transactions
  .filter((t) => CATS.includes(t.categoryName) && !INVEST.test(t.walletName))
  .sort((a, b) => a.transactionDate.localeCompare(b.transactionDate));

const people = {};
for (const t of txns) {
  const p = (people[personOf(t.description)] ||= { recv: 0, owe: 0, last: '', rows: [] });
  const v = Math.abs(t.currentAmount);
  if (t.categoryName === 'Cho vay') p.recv += v;
  if (t.categoryName === 'Thu nợ') p.recv = Math.max(0, p.recv - v); // <0 = pre-2024 debt settled
  if (t.categoryName === 'Đi vay') p.owe += v;
  if (t.categoryName === 'Trả nợ') p.owe = Math.max(0, p.owe - v);
  if (p.recv < 100000) p.recv = 0; // ignore rounding residue (e.g. 49.5M borrowed, 49.49M repaid)
  if (p.owe < 100000) p.owe = 0;
  p.last = t.transactionDate.slice(0, 10);
  p.rows.push(`${p.last} ${t.categoryName} ${fmt(v)}`);
}

const open = Object.entries(people).filter(([, p]) => p.recv || p.owe);
const totRecv = open.reduce((s, [, p]) => s + p.recv, 0);
const totOwe = open.reduce((s, [, p]) => s + p.owe, 0);
const out = ['## Khoản vay cá nhân (cho vay / đi vay)', '',
  '| Người | Họ nợ mình (₫) | Mình nợ họ (₫) | Giao dịch gần nhất | Lịch sử mở |',
  '|-------|---------------|---------------|-------------------|-----------|'];
for (const [n, p] of open) out.push(`| ${n} | ${fmt(p.recv)} | ${fmt(p.owe)} | ${p.last} | ${p.rows.slice(-3).join(' · ')} |`);
if (!open.length) out.push('| — | 0 | 0 | — | không có khoản mở |');
out.push(`| **Tổng** | **${fmt(totRecv)}** | **${fmt(totOwe)}** | | |`, '',
  `Đã tất toán: ${Object.entries(people).filter(([, p]) => !p.recv && !p.owe).map(([n, p]) => `${n} (${p.last})`).join(', ')}.`,
  '', 'MISA không trừ "Đi vay" vào Net Worth / không cộng "Cho vay" cá nhân → NW lệch đúng bằng (mình nợ − họ nợ). Lịch sử từ 2024-01; khoản trước đó chỉ thấy khi tất toán.');
console.log(out.join('\n'));
