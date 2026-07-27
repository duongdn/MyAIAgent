const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1nibEv1txioxz7rCpVQZviu5sz5a-aA00qX_d0yZfVHQ';

  // Get spreadsheet metadata to find tab name for gid=613825861
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const targetSheet = meta.data.sheets.find(s => s.properties.sheetId === 613825861);
  console.log('=== ALL TABS ===');
  meta.data.sheets.forEach(s => console.log(s.properties.sheetId, s.properties.title, s.properties.gridProperties.rowCount, s.properties.gridProperties.columnCount));

  if (!targetSheet) {
    console.log('Target gid not found!');
    return;
  }
  const title = targetSheet.properties.title;
  console.log('\n=== TARGET TAB:', title, '===');

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${title}'!A1:Z200`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const rows = res.data.values || [];
  rows.forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) {
      console.log(`Row ${i + 1}:`, JSON.stringify(row));
    }
  });
}

main().catch(e => console.error(e));
