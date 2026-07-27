const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1nibEv1txioxz7rCpVQZviu5sz5a-aA00qX_d0yZfVHQ';
  const title = 'FPT';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${title}'!A1:Z100`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const rows = res.data.values || [];
  rows.forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) {
      console.log(`Row ${i + 1}:`, JSON.stringify(row));
    }
  });

  // also formulas to see if live-linked
  const res2 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${title}'!A1:Z40`,
    valueRenderOption: 'FORMULA',
  });
  console.log('\n=== FORMULAS ===');
  (res2.data.values || []).forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) {
      console.log(`Row ${i + 1}:`, JSON.stringify(row));
    }
  });
}

main().catch(e => console.error(e));
