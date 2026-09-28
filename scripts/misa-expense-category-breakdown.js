#!/usr/bin/env node
// Breaks down MISA spending by parent group (like MISA app's "Báo cáo" screen).
// Input: stdout JSON of misa-money-report.js (default tmp/misa-out.json).
// Usage: node scripts/misa-expense-category-breakdown.js [YYYY-MM ...] [--file path]
// Prints a markdown section per month: living expenses by group (+ % share),
// sub-category detail, plus investment flow (Cho vay/Thu nợ) and debt repayment shown separately.
const fs = require('fs');

// MISA sub-category → parent group. Unknown sub-categories fall into "Khác".
const GROUPS = {
  '🍜 Ăn uống': ['Ăn uống', 'Cafe', 'Ăn sáng', 'Ăn tối', 'Ăn trưa', 'Ăn tiệm', 'Đi chợ/siêu thị'],
  '👶 Con cái': ['Con cái', 'Học phí', 'Học hành', 'Sữa', 'Đồ chơi', 'Tiền tiêu vặt'],
  '🛵 Xe cộ / Đi lại': ['Xăng xe', 'Đi lại', 'Sửa chữa, bảo dưỡng xe', 'Gửi xe', 'Rửa xe', 'Taxi', 'Bảo hiểm xe'],
  '🏠 Nhà cửa & Dịch vụ': ['Nhà cửa', 'Điện', 'Nước', 'Internet', 'Truyền hình', 'Điện thoại di động', 'Sửa chữa', 'Thú Cưng', 'Gas'],
  '🎁 Hiếu hỉ / Biếu tặng': ['Hiếu hỉ', 'Biếu tặng', 'Từ thiện'],
  '💊 Sức khỏe': ['Sức khỏe', 'Thuốc men', 'Khám chữa bệnh', 'Thể thao'],
  '🛍️ Mua sắm': ['Trang phục', 'Giầy dép', 'Máy tính', 'Phụ kiện khác', 'Đồ gia dụng', 'Làm đẹp'],
  '🏖️ Hưởng thụ': ['Du lịch', 'Vui chơi giải trí', 'Phim ảnh ca nhạc'],
  '💼 Công việc / Phí': ['Công việc', 'Phí chuyển khoản', 'Phí ngân hàng'],
  '❓ Linh tinh': ['Linh tinh'],
};
const norm = (s) => String(s || '(không có)').replace(/\s+/g, ' ').trim();
const LOOKUP = {};
for (const [g, subs] of Object.entries(GROUPS)) for (const s of subs) LOOKUP[norm(s).toLowerCase()] = g;
const groupOf = (cat) => LOOKUP[norm(cat).toLowerCase()] || '📦 Khác';

const INVEST_OUT = 'Cho vay', INVEST_IN = 'Thu nợ', BORROW = 'Đi vay', REPAY = 'Trả nợ';
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const pct = (n, d) => (d ? ((n / d) * 100).toFixed(1) : '0.0') + '%';
// FX-aware amount: Paypal/USD rows must use the VND-converted value.
const amountOf = (x) =>
  x.currencyCode && x.currencyCode !== 'VND' && x.convertCurrentAmount ? x.convertCurrentAmount : x.currentAmount || 0;

function breakdown(transactions, month) {
  const rows = transactions.filter((x) => String(x.transactionDate || '').startsWith(month));
  const groups = {}, subs = {};
  let living = 0, income = 0, investOut = 0, investIn = 0, repay = 0;
  for (const x of rows) {
    const cat = norm(x.categoryName), a = amountOf(x);
    if (cat === INVEST_OUT) { investOut -= a; continue; }
    if (cat === INVEST_IN) { investIn += a; continue; }
    if (cat === REPAY) { repay -= a; continue; }
    if (cat === BORROW) continue;
    if (a > 0) { income += a; continue; }
    const g = groupOf(cat);
    groups[g] = (groups[g] || 0) - a;
    subs[g] = subs[g] || {};
    subs[g][cat] = (subs[g][cat] || 0) - a;
    living -= a;
  }
  return { month, groups, subs, living, income, investOut, investIn, repay };
}

function render(r) {
  const [y, m] = r.month.split('-');
  const out = [`## Chi tiêu theo nhóm — ${m}/${y}`, '', '| Nhóm | Số tiền (₫) | % chi tiêu |', '|------|-----------|-----------|'];
  const sorted = Object.entries(r.groups).sort((a, b) => b[1] - a[1]);
  for (const [g, v] of sorted) out.push(`| ${g} | ${fmt(v)} | ${pct(v, r.living)} |`);
  out.push(`| **Tổng chi tiêu sinh hoạt** | **${fmt(r.living)}** | **100%** |`, '');
  out.push('### Chi tiết từng mục', '', '| Nhóm | Mục | Số tiền (₫) | % chi tiêu |', '|------|-----|-----------|-----------|');
  for (const [g] of sorted)
    for (const [c, v] of Object.entries(r.subs[g]).sort((a, b) => b[1] - a[1]))
      out.push(`| ${g} | ${c} | ${fmt(v)} | ${pct(v, r.living)} |`);
  const investNet = r.investOut - r.investIn;
  const used = r.living + r.investOut + r.repay;
  out.push('', '### Dòng tiền sử dụng (sinh hoạt + đầu tư + trả nợ)', '', '| Khoản | Số tiền (₫) | % tổng tiền đã dùng | % thu nhập |', '|-------|-----------|------------|-----------|');
  out.push(`| 🧾 Chi tiêu sinh hoạt | ${fmt(r.living)} | ${pct(r.living, used)} | ${pct(r.living, r.income)} |`);
  out.push(`| 📈 Đầu tư (Cho vay — mua CP/ETF/Fund) | ${fmt(r.investOut)} | ${pct(r.investOut, used)} | ${pct(r.investOut, r.income)} |`);
  out.push(`| 💳 Trả nợ | ${fmt(r.repay)} | ${pct(r.repay, used)} | ${pct(r.repay, r.income)} |`);
  out.push(`| **Tổng đã dùng** | **${fmt(used)}** | **100%** | **${pct(used, r.income)}** |`, '');
  out.push(`Thu nhập thực: ${fmt(r.income)} ₫ · Thu hồi đầu tư (Thu nợ): ${fmt(r.investIn)} ₫ · Đầu tư ròng: ${fmt(investNet)} ₫ · Tiết kiệm được (thu − chi sinh hoạt): ${fmt(r.income - r.living)} ₫ (${pct(r.income - r.living, r.income)})`, '');
  return out.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const fi = args.indexOf('--file');
  const file = fi >= 0 ? args.splice(fi, 2)[1] : 'tmp/misa-out.json';
  const now = new Date();
  const months = args.length ? args : [`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`];
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(`Cannot read ${file}: ${e.message}. Run misa-money-report.js > ${file} first.`);
    process.exit(1);
  }
  const tx = data?.apiData?.transactions || [];
  if (!tx.length) { console.error('No transactions in input.'); process.exit(1); }
  console.log(months.map((m) => render(breakdown(tx, m))).join('\n---\n\n'));
}

main();
