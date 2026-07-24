const { google } = require('googleapis');
const path = require('path');
async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const resK = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!K1:K210`, valueRenderOption: 'FORMATTED_VALUE' });
  const resU = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!U1:U210`, valueRenderOption: 'FORMATTED_VALUE' });
  const resA = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!A1:A210`, valueRenderOption: 'FORMATTED_VALUE' });
  const labels = (resA.data.values||[]).map(r=>r[0]||'');
  const kvals = (resK.data.values||[]).map(r=>r[0]||'');
  const uvals = (resU.data.values||[]).map(r=>r[0]||'');
  for (let i=0;i<210;i++) {
    if (kvals[i] || uvals[i]) console.log(i+1, '|', labels[i], '| K:', kvals[i], '| U:', uvals[i]);
  }
}
main().catch(console.error);
