#!/usr/bin/env node
// Injects the "Chi tiêu & Dòng tiền" section (charts + detail table) into a money-dashboard.html.
// Input: JSON from `misa-expense-category-breakdown.js <this-month> <prev-month> --json`.
// Usage: node scripts/money-dashboard-inject-spending-section.js <dashboard.html> <breakdown.json>
// Idempotent: replaces a previously injected section (between SPENDING markers).
const fs = require('fs');

const [htmlPath, jsonPath] = process.argv.slice(2);
if (!htmlPath || !jsonPath) { console.error('Usage: <dashboard.html> <breakdown.json>'); process.exit(1); }
const [cur, prev] = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let html = fs.readFileSync(htmlPath, 'utf8');

const M = (n) => (n / 1e6).toFixed(1) + 'M';
const fmt = (n) => Math.round(n).toLocaleString('en-US');
const label = (m) => m.split('-').reverse().join('/');
const sorted = Object.entries(cur.groups).sort((a, b) => b[1] - a[1]);
// Flow buckets shown side by side for current vs previous month.
const flow = (r) => [r.living, r.investOut, Math.max(r.toSaving, 0), r.lend, r.repay].map((v) => +(v / 1e6).toFixed(1));
const FLOW_LABELS = ['🧾 Sinh hoạt', '📈 Đầu tư', '🏦 Tiết kiệm (ròng)', '🤝 Cho vay CN', '💳 Trả nợ'];
const invDetail = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${M(v)}`).join(' · ') || '—';

const rows = [];
for (const [g] of sorted)
  for (const [c, v] of Object.entries(cur.subs[g]).sort((a, b) => b[1] - a[1]))
    rows.push(`<tr><td>${g}</td><td>${c}</td><td class="right">${fmt(v)}</td><td class="right">${((v / cur.living) * 100).toFixed(1)}%</td></tr>`);

const section = `<!-- SPENDING:START -->
<div class="grid">
  <div class="card">
    <h3>🧾 Chi tiêu sinh hoạt theo nhóm — ${label(cur.month)} (${M(cur.living)})</h3>
    <div class="chart-wrap h280"><canvas id="chartSpendGroups"></canvas></div>
  </div>
  <div class="card">
    <h3>💸 Tiền đã dùng vào đâu — ${label(cur.month)} vs ${label(prev.month)} (triệu ₫)</h3>
    <div class="chart-wrap h280"><canvas id="chartMoneyFlow"></canvas></div>
    <div style="font-size:12px;color:#94a3b8;margin-top:8px;line-height:1.6">
      ${label(cur.month)}: Đầu tư ${M(cur.investOut)} (${invDetail(cur.investTo)}) · Rút từ đầu tư ${M(cur.investIn)} (${invDetail(cur.investFrom)}) → ròng ${M(cur.investOut - cur.investIn)}<br>
      Thu nhập ${M(cur.income)} · Chi sinh hoạt ${M(cur.living)} · Để dành được ${M(cur.income - cur.living)} (${((1 - cur.living / cur.income) * 100).toFixed(0)}% thu nhập)
    </div>
  </div>
</div>
<div class="grid full">
  <div class="card">
    <h3>📋 Chi tiết chi tiêu từng mục — ${label(cur.month)}</h3>
    <table><thead><tr><th>Nhóm</th><th>Mục</th><th class="right">Số tiền (₫)</th><th class="right">%</th></tr></thead>
    <tbody>${rows.join('\n')}
    <tr><td><b>Tổng</b></td><td></td><td class="right"><b>${fmt(cur.living)}</b></td><td class="right"><b>100%</b></td></tr></tbody></table>
  </div>
</div>
<script>
new Chart(document.getElementById('chartSpendGroups'), {
  type: 'doughnut',
  data: { labels: ${JSON.stringify(sorted.map(([g, v]) => `${g} ${((v / cur.living) * 100).toFixed(1)}%`))},
    datasets: [{ data: ${JSON.stringify(sorted.map(([, v]) => +(v / 1e6).toFixed(2)))},
      backgroundColor: ['#f59e0b','#3b82f6','#ec4899','#22c55e','#8b5cf6','#06b6d4','#ef4444','#84cc16','#f97316','#64748b','#a855f7'], borderColor: '#0f1117', borderWidth: 2 }] },
  options: { maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 11 }, boxWidth: 12 } },
    tooltip: { callbacks: { label: (c) => ' ' + c.label + ': ' + c.raw.toFixed(2) + 'M' } } } }
});
new Chart(document.getElementById('chartMoneyFlow'), {
  type: 'bar',
  data: { labels: ${JSON.stringify(FLOW_LABELS)},
    datasets: [
      { label: '${label(cur.month)}', data: ${JSON.stringify(flow(cur))}, backgroundColor: '#3b82f6', borderRadius: 3 },
      { label: '${label(prev.month)}', data: ${JSON.stringify(flow(prev))}, backgroundColor: '#475569', borderRadius: 3 } ] },
  options: { maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: { x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } }, y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } } } }
});
</script>
<!-- SPENDING:END -->
`;

const existing = /<!-- SPENDING:START -->[\s\S]*?<!-- SPENDING:END -->\n?/;
if (existing.test(html)) html = html.replace(existing, section);
else {
  // Insert before the account-detail table card (first "grid full" after the charts).
  const anchor = html.indexOf('<div class="grid full" style="padding-bottom:8px">');
  if (anchor < 0) { console.error('Anchor not found — insert before </body>'); html = html.replace('</body>', section + '</body>'); }
  else html = html.slice(0, anchor) + section + html.slice(anchor);
}
fs.writeFileSync(htmlPath, html);
console.log('Spending section injected into ' + htmlPath);
