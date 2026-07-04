/**
 * Fountain Summary tab — per-dev actual hours for the week matching target Monday (by date, not max W).
 * Usage: node scripts/fountain-w33-dev-actuals.js
 */
const { google } = require('googleapis');
const SVC = require('path').join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');
const FOUNTAIN_ID = '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o';
const TARGET_MONDAY = new Date('2026-06-29T00:00:00');

function parseDateCell(s) {
  s = String(s || '').trim();
  s = s.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*/, '');
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function parseHours(v) {
  if (v === undefined || v === null) return 0;
  const s = String(v).trim();
  if (['', '-', '—', '#DIV/0!', 'N/A'].includes(s)) return 0;
  const n = parseFloat(s.replace(',', '.'));
  return isNaN(n) ? 0 : n;
}

(async () => {
  const auth = new google.auth.GoogleAuth({ keyFile: SVC, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.values.get({ spreadsheetId: FOUNTAIN_ID, range: 'Summary!A:AM' });
  const rows = res.data.values || [];

  const DEVS = ['ViTHT', 'ThinhT', 'VuTQ', 'PhatDLT', 'HungPN', 'HaVS', 'DatNT', 'LamLQ'];
  let namesRowData = null;
  let targetRowIdx = -1;
  let targetLabel = null;
  let prevRowIdx = -1;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row.length) continue;
    const rowStr = row.join(' ');
    if (!namesRowData && DEVS.some(d => rowStr.includes(d))) namesRowData = row;

    const cell0 = String(row[0] || '').trim();
    if (/^W\d+$/.test(cell0)) {
      const start = parseDateCell(row[1]);
      const end = parseDateCell(row[2]);
      if (start && end && start <= TARGET_MONDAY && TARGET_MONDAY <= end) {
        targetRowIdx = i;
        targetLabel = cell0;
      }
    }
  }
  if (targetRowIdx === -1) { console.error('Target week not found'); process.exit(1); }

  // find previous week row = targetRowIdx - 1 (rows are sequential in this sheet)
  const targetNum = parseInt(targetLabel.slice(1));
  for (let i = 0; i < rows.length; i++) {
    const cell0 = String(rows[i][0] || '').trim();
    if (cell0 === `W${targetNum - 1}`) prevRowIdx = i;
  }

  const colMap = {};
  if (namesRowData) {
    namesRowData.forEach((cell, ci) => {
      const name = String(cell).trim();
      if (DEVS.includes(name) && !(name in colMap)) colMap[name] = ci;
    });
  }

  const curr = {};
  const prev = {};
  for (const [dev, col] of Object.entries(colMap)) {
    curr[dev] = parseHours(rows[targetRowIdx][col]);
    prev[dev] = prevRowIdx >= 0 ? parseHours(rows[prevRowIdx][col]) : null;
  }

  console.log(JSON.stringify({
    targetLabel, targetRowIdx, colMap,
    targetDateRange: [rows[targetRowIdx][1], rows[targetRowIdx][2]],
    currActuals: curr,
    prevLabel: `W${targetNum - 1}`,
    prevActuals: prev,
  }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
