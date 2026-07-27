const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Báo cáo 2'!A1:F210`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const rows = res.data.values || [];
  rows.forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 1}:`, JSON.stringify(row));
  });
}

main().catch(e => console.error(e));
