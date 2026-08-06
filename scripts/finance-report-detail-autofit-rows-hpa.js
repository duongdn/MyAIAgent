#!/usr/bin/env node
/**
 * Auto-fit row heights on the 4 narrative HPA sheets (Định tính, Định giá,
 * Benjamin Graham, Báo cáo 2) so wrapped long-form text isn't visually
 * clipped — uses the Sheets API's own autoResizeDimensions rather than a
 * manual char-count heuristic, since it accounts for actual rendered font
 * metrics per column width.
 */
const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = process.argv[2] || '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const ticker = process.argv[3] || 'HPA';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const sheetNames = [`Định tính - ${ticker}`, `Định giá - ${ticker}`, `Benjamin Graham - ${ticker}`, `Báo cáo 2 - ${ticker}`];

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });

  const requests = [];
  for (const name of sheetNames) {
    const s = meta.data.sheets.find((x) => x.properties.title === name);
    if (!s) continue;
    const sheetId = s.properties.sheetId;
    const rowCount = s.properties.gridProperties.rowCount;
    requests.push({ autoResizeDimensions: { dimensions: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: rowCount } } });
  }

  if (requests.length) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  }
  console.log(JSON.stringify({ success: true, autofitted: sheetNames.filter((n) => meta.data.sheets.some((x) => x.properties.title === n)) }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
