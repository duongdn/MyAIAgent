const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'Benjamin Graham - FPT'!A1:F10`],
    includeGridData: true,
  });
  const sheet = res.data.sheets[0];
  console.log('Sheet props:', JSON.stringify(sheet.properties, null, 2));
  const gridData = sheet.data[0];
  console.log('Column metadata:', JSON.stringify(gridData.columnMetadata, null, 2));
  console.log('Merges:', JSON.stringify(sheet.merges, null, 2));
  gridData.rowData.forEach((row, i) => {
    console.log(`\nRow ${i + 1}:`);
    (row.values || []).forEach((cell, j) => {
      if (cell.userEnteredFormat) {
        console.log(`  Col ${j}:`, JSON.stringify(cell.userEnteredFormat));
      }
    });
  });
}

main().catch(e => console.error(e));
