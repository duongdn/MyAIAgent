#!/usr/bin/env node
/**
 * Append 3 quarterly columns (Q4/2025, Q1/2026, Q2/2026) to HPA raw sheet
 * columns C:E, alongside the existing annual column B (2025). Reuses the same
 * row template order already written by finance-report-detail-build-raw-sheet.js
 * (202 rows), so quarter values are matched by BCTC code and placed in the
 * exact same row index.
 */
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const spreadsheetId = '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const sheetName = 'HPA';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const SP = '/tmp/claude-1000/-home-nus-projects-My-AI-Agent/a4cc0cc0-3294-48dc-ad40-4c9cb08ee305/scratchpad';

function fmt(rawVnd) {
  const v = rawVnd / 1e9;
  if (v === 0) return ' - ';
  const abs = Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return v < 0 ? `(${abs})` : abs;
}
function fmtPerShare(rawVnd) {
  if (rawVnd === 0) return ' - ';
  const abs = Math.abs(rawVnd).toLocaleString('en-US', { maximumFractionDigits: 0 });
  return rawVnd < 0 ? `(${abs})` : abs;
}
const PER_SHARE_NAME_RE = /trên cổ phiếu/i;

const cdkt = JSON.parse(fs.readFileSync(`${SP}/hpa-q-cdkt.json`));
const kqkd = JSON.parse(fs.readFileSync(`${SP}/hpa-q-kqkd.json`));
const lctt = JSON.parse(fs.readFileSync(`${SP}/hpa-q-lctt.json`));

const tn = cdkt.value.data.find((d) => d.code === 'TN');
const nv = cdkt.value.data.find((d) => d.code === 'NV');
const tnTemplate = cdkt.value.templace.find((t) => t.code === 'TN').data;
const nvTemplate = cdkt.value.templace.find((t) => t.code === 'NV').data;
const kqkdTemplate = kqkd.value.templace;
const lcttGroups = lctt.value.data.map((g) => ({
  code: g.code,
  name: g.name,
  template: lctt.value.templace.find((t) => t.code === g.code).data,
  years: g.data,
}));

// Order quarters oldest->newest: Q4-2025, Q1-2026, Q2-2026
const quarterOrder = [
  { year: 2025, quater: 4, label: 'Q4/2025' },
  { year: 2026, quater: 1, label: 'Q1/2026' },
  { year: 2026, quater: 2, label: 'Q2/2026' },
];

function findQ(yearsData, q) {
  return yearsData.find((d) => d.year === q.year && d.quater === q.quater);
}

function buildSectionRows(template, yearsData) {
  return template.map((row) => {
    const isPerShare = PER_SHARE_NAME_RE.test(row.name);
    return quarterOrder.map((q) => {
      const yearEntry = findQ(yearsData, q);
      const cell = yearEntry ? yearEntry.data.find((d) => d.code === row.code) : null;
      if (!cell) return ' - ';
      return isPerShare ? fmtPerShare(cell.value) : fmt(cell.value);
    });
  });
}

const rows = [];
rows.push(quarterOrder.map((q) => q.label)); // header row for "Tài sản" row
rows.push(...buildSectionRows(tnTemplate, tn.data));
rows.push(quarterOrder.map((q) => q.label)); // "Nguồn vốn" header row
rows.push(...buildSectionRows(nvTemplate, nv.data));
rows.push(quarterOrder.map((q) => q.label)); // "Kết quả kinh doanh" header row
rows.push(...buildSectionRows(kqkdTemplate, kqkd.value.data));
for (const group of lcttGroups) {
  rows.push(quarterOrder.map((q) => q.label)); // group header row
  rows.push(...buildSectionRows(group.template, group.years));
}

console.error(`Total quarter rows built: ${rows.length}`);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });

  // Sanity check: row count must equal the 202-row annual sheet.
  const annualRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${sheetName}'!A1:A210` });
  const annualRowCount = annualRes.data.values.length;
  if (annualRowCount !== rows.length) {
    console.error(`MISMATCH: annual sheet has ${annualRowCount} rows, quarter build has ${rows.length} rows. Aborting.`);
    process.exit(1);
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${sheetName}'!C1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });

  console.log(JSON.stringify({ success: true, rowsWritten: rows.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
