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
    range: "'Báo cáo 2'!A1:F230",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const rows = res.data.values || [];
  const fs = require('fs');
  let out = '';
  rows.forEach((row, i) => {
    const text = row.filter(c=>c&&c.trim()).join(' | ');
    if (text.trim()) out += `Row ${i+1}: ${text}\n`;
  });
  fs.writeFileSync('/tmp/claude-1000/-home-nus-projects-My-AI-Agent/c78e5c21-4b56-40f9-af93-31596f04b1e0/scratchpad/full-report.txt', out);
  console.log('Written, total rows with content:', out.split('\n').length);
}
main().catch(e => { console.error(e); process.exit(1); });
