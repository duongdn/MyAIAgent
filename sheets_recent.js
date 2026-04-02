const {google} = require('googleapis');
const fs = require('fs');

const SA = JSON.parse(fs.readFileSync('/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json','utf8'));
const auth = new google.auth.GoogleAuth({
  credentials: SA,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});
const sheets = google.sheets({version:'v4', auth});

// Check Summary for PhucVT - find last non-zero week
async function run() {
  const devs = [
    {name:'PhucVT', id:'1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', col:'H'},
    {name:'VietPH', id:'1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', col:'T'},
    {name:'KhanhHH', id:'1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM'},
    {name:'TuanNT-JohnYi', id:'1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'},
    {name:'LeNH-Rory', id:'1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8'},
  ];
  
  for (const dev of devs) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: dev.id,
      range: "'Summary'!A1:Z60",
      valueRenderOption: 'UNFORMATTED_VALUE'
    });
    const rows = res.data.values || [];
    // Print all W rows with total > 0 (col D = index 3)
    console.log(`\n=== ${dev.name} non-zero weeks ===`);
    for (const row of rows) {
      if (row && row[0] && String(row[0]).startsWith('W') && row[3] > 0) {
        console.log(`${row[0]}: total=${row[3]}h`);
      }
    }
    // Find last row
    const lastRow = rows.filter(r => r && r[0] && String(r[0]).startsWith('W')).pop();
    if (lastRow) console.log('Last week entry:', lastRow[0]);
  }
}

run().catch(e => console.error(e));
