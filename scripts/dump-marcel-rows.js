const {google} = require('googleapis');

const KEY_FILE = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const SPREADSHEET_ID = '1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI';
const TAB = 'W1'; // W1 = Mar 16 2026

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({version: 'v4', auth});

  // First, list all sheet tabs to confirm which ones exist
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const tabNames = meta.data.sheets.map(s => s.properties.title);
  console.log('Available tabs:', tabNames.join(', '));

  // Try W1 first, fall back to first available tab
  let tab = TAB;
  if (!tabNames.includes(tab)) {
    // Try W12 as mentioned in daily report
    if (tabNames.includes('W12')) tab = 'W12';
    else tab = tabNames[0];
    console.log(`W1 not found, using tab: ${tab}`);
  }

  const range = `'${tab}'!A1:H100`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
  });

  const rows = res.data.values || [];
  console.log(`\n=== Tab: ${tab} | Total rows: ${rows.length} ===\n`);

  const highlightRows = [7, 23, 39];

  for (let i = 0; i < rows.length; i++) {
    const rowNum = i + 1;
    const row = rows[i] || [];
    const prefix = highlightRows.includes(rowNum) ? '>>> ' : '    ';
    const cells = [];
    for (let j = 0; j < 8; j++) {
      cells.push(String(row[j] || '').padEnd(20));
    }
    console.log(`${prefix}Row ${String(rowNum).padStart(3)}: ${cells.join(' | ')}`);
  }

  // Also dump rows around the highlighted ones with extra detail
  console.log('\n=== DETAIL: Rows 5-10 ===');
  for (let i = 4; i < Math.min(10, rows.length); i++) {
    console.log(`Row ${i+1}: ${JSON.stringify(rows[i])}`);
  }
  console.log('\n=== DETAIL: Rows 21-26 ===');
  for (let i = 20; i < Math.min(26, rows.length); i++) {
    console.log(`Row ${i+1}: ${JSON.stringify(rows[i])}`);
  }
  console.log('\n=== DETAIL: Rows 37-42 ===');
  for (let i = 36; i < Math.min(42, rows.length); i++) {
    console.log(`Row ${i+1}: ${JSON.stringify(rows[i])}`);
  }
}

main().then(async () => {
  // Also dump Summary tab
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({version: 'v4', auth});

  console.log('\n\n=== SUMMARY TAB ===');
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'Summary'!A1:Z30",
    });
    const rows = res.data.values || [];
    for (let i = 0; i < rows.length; i++) {
      console.log(`Row ${i+1}: ${JSON.stringify(rows[i])}`);
    }
  } catch(e) {
    console.log('Error reading Summary:', e.message);
  }
}).catch(e => console.error('ERROR:', e.message));
