const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Định tính'!C21",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  console.log(res.data.values[0][0]);
}
main().catch(e => { console.error(e); process.exit(1); });
