const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '17vER_Nljh9ZkoHTX5xqLs1rJZYYCZDgpP3Xs0NmQ1Bw';

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  console.log('=== ALL TABS ===');
  meta.data.sheets.forEach(s => console.log(s.properties.sheetId, s.properties.title, s.properties.gridProperties.rowCount));

  const target = meta.data.sheets.find(s => s.properties.sheetId === 2046958201);
  console.log('\nTarget gid=2046958201 tab:', target ? target.properties.title : 'NOT FOUND');
}

main().catch(e => console.error(e));
