const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  console.log('=== FPT sheet rows 238-250 (shares/price/EPS/PE block) ===');
  let res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'FPT'!A238:K250`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values || []).forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 238}:`, JSON.stringify(row));
  });

  console.log('\n=== Báo cáo 2 rows 100-125 (GIÁ CẢ section) ===');
  res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Báo cáo 2'!A100:F135`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values || []).forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 100}:`, JSON.stringify(row));
  });

  console.log('\n=== Báo cáo 2 total row count check (A1:F250) ===');
  res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Báo cáo 2'!A1:F250`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const rows = res.data.values || [];
  console.log('Last non-empty row index:', rows.length);
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i] && rows[i].some(c => c && c.toString().trim() !== '')) {
      console.log('Last content row:', i + 1, JSON.stringify(rows[i]));
      break;
    }
  }
}

main().catch(e => console.error(e));
