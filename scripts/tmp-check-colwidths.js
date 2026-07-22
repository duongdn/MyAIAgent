const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const meta = await sheets.spreadsheets.get({ spreadsheetId, ranges: ["'Báo cáo 2'!A1:F1"], fields: 'sheets.data.columnMetadata' });
  console.log('ColMeta Báo cáo 2:', JSON.stringify(meta.data.sheets[0].data[0].columnMetadata));
}
main().catch(e => { console.error(e); process.exit(1); });
