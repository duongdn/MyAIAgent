#!/usr/bin/env node
// Run structure checks over daily reports.
// Usage: node evals/daily-report/run-structure-eval.js [YYYY-MM-DD ...] [--days N]
//   default: last 14 report days (incl. reports/backup). Exit 1 if latest report fails any check.
const fs = require('fs');
const path = require('path');
const { checks } = require('./structure-checks');

const ROOT = path.join(__dirname, '..', '..');
const args = process.argv.slice(2);
const daysIdx = args.indexOf('--days');
const days = daysIdx >= 0 ? +args[daysIdx + 1] : 14;

// Reports live in reports/{date}/ or, once archived, reports/backup/{date}/
const reportPath = d => [path.join(ROOT, 'reports', d), path.join(ROOT, 'reports', 'backup', d)]
  .map(dir => path.join(dir, 'daily-report.md')).find(f => fs.existsSync(f));
const isDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d);

let dates = args.filter(isDate);
if (!dates.length) {
  const all = [...fs.readdirSync(path.join(ROOT, 'reports')), ...fs.readdirSync(path.join(ROOT, 'reports', 'backup'))];
  dates = [...new Set(all.filter(d => isDate(d) && reportPath(d)))].sort().slice(-days);
}
if (!dates.length) { console.error('No daily reports found'); process.exit(2); }

let timelines = {};
try { timelines = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/.monitoring-timelines.json'), 'utf8')); }
catch (e) { console.error('timelines unreadable:', e.message); }

const latest = dates[dates.length - 1];
const perCheck = {};
let latestFailed = 0;

for (const date of dates) {
  const md = fs.readFileSync(reportPath(date), 'utf8');
  const fails = [];
  for (const c of checks) {
    if (c.onlyLatest && date !== latest) continue;
    let r;
    try { r = c.check(md, { date, timelines }); } catch (e) { r = `check crashed: ${e.message}`; }
    perCheck[c.id] = perCheck[c.id] || { pass: 0, total: 0, source: c.source };
    perCheck[c.id].total++;
    if (r === true) perCheck[c.id].pass++; else fails.push(`${c.id}: ${r}`);
  }
  if (date === latest) latestFailed = fails.length;
  console.log(`${fails.length ? '❌' : '✅'} ${date}${fails.length ? '\n   - ' + fails.join('\n   - ') : ''}`);
}

console.log('\nPer-check pass rate:');
let pass = 0, total = 0;
for (const [id, s] of Object.entries(perCheck)) {
  pass += s.pass; total += s.total;
  console.log(`  ${s.pass === s.total ? '✅' : '⚠️ '} ${id.padEnd(34)} ${s.pass}/${s.total}  (${s.source})`);
}
console.log(`\nOverall: ${pass}/${total} = ${(100 * pass / total).toFixed(1)}%  | latest ${latest}: ${latestFailed ? latestFailed + ' fail' : 'clean'}`);
process.exit(latestFailed ? 1 : 0);
