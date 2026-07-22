const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  async function getRow(row) {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'Báo cáo 2'!A${row}:F${row}`, valueRenderOption: 'FORMATTED_VALUE' });
    const vals = res.data.values ? res.data.values[0] : [];
    while (vals.length < 6) vals.push('');
    return vals;
  }
  async function setRow(row, vals) {
    await sheets.spreadsheets.values.update({
      spreadsheetId, range: `'Báo cáo 2'!A${row}:F${row}`, valueInputOption: 'USER_ENTERED',
      requestBody: { values: [vals] },
    });
  }

  // Row 72 (Phân bổ tài sản): first occurrence of "Capex" gets a gloss, rest stay short
  {
    const cells = await getRow(72);
    const out = cells.map(c => c
      .replace(/Capex 2025 nhảy vọt/, 'Chi mua sắm TSCĐ (Capex) 2025 nhảy vọt')
      .replace(/dòng 211 \(capex\)/, "dòng 211 (chi mua sắm TSCĐ)")
    );
    await setRow(72, out);
    console.log('Row 72 capex gloss done.');
  }

  // Row 148 (FCF criterion, already mentions Capex): gloss there too since first real technical intro
  {
    const cells = await getRow(148);
    const out = cells.map(c => c.replace(/CFO trừ Capex/, 'CFO trừ Capex (chi mua sắm TSCĐ)'));
    await setRow(148, out);
    console.log('Row 148 capex gloss done.');
  }

  console.log('Capex jargon reduced.');
}
main().catch(e => { console.error(e); process.exit(1); });
