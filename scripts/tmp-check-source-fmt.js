const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: ["'Benjamin Graham - FPT'!A1:H30"],
    includeGridData: true,
  });
  const sheet = res.data.sheets[0];
  console.log('sheetId (Benjamin Graham - FPT):', sheet.properties.sheetId);
  console.log('colWidths (defaultColumnMetadata not shown per cell) - check gridProperties:', JSON.stringify(sheet.properties.gridProperties));
  const merges = sheet.merges || [];
  console.log('Merges:', JSON.stringify(merges));

  const gridRows = sheet.data[0].rowData;
  gridRows.forEach((r, idx) => {
    const rowNum = idx + 1;
    const cells = r.values || [];
    cells.forEach((c, cidx) => {
      if (c.userEnteredFormat && (c.userEnteredFormat.backgroundColor || (c.userEnteredFormat.textFormat && c.userEnteredFormat.textFormat.bold))) {
        const fmt = c.userEnteredFormat;
        console.log(`R${rowNum}C${cidx+1}:`, JSON.stringify({
          bg: fmt.backgroundColor, bold: fmt.textFormat && fmt.textFormat.bold,
          color: fmt.textFormat && fmt.textFormat.foregroundColor,
          borders: fmt.borders ? Object.keys(fmt.borders) : undefined,
          val: (c.formattedValue||'').slice(0,30)
        }));
      }
    });
  });
}
main().catch(e => { console.error(e); process.exit(1); });
