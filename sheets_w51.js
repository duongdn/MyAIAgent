const {google} = require('googleapis');
const fs = require('fs');

const SA = JSON.parse(fs.readFileSync('/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json','utf8'));
const auth = new google.auth.GoogleAuth({
  credentials: SA,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});
const sheets = google.sheets({version:'v4', auth});

// Check PhucVT and VietPH W51 to verify data exists there
const check = [
  {name:'PhucVT', id:'1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI'},
  {name:'VietPH', id:'1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg'},
  {name:'KhanhHH', id:'1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM'},
  {name:'TuanNT-JohnYi', id:'1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'},
  {name:'LeNH-Rory', id:'1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8'},
];

async function run() {
  for (const dev of check) {
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: dev.id,
        range: "'W51'!A1:H20",
        valueRenderOption: 'UNFORMATTED_VALUE'
      });
      const rows = res.data.values || [];
      console.log(`\n=== ${dev.name} W51 (first 20 rows) ===`);
      rows.forEach((r,i) => console.log(i + '|' + JSON.stringify(r)));
    } catch(e) {
      console.log(`${dev.name} W51 error:`, e.message.slice(0,200));
    }
  }
  
  // Also check Summary W51 row for PhucVT
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI',
      range: "'Summary'!A1:Z60",
      valueRenderOption: 'UNFORMATTED_VALUE'
    });
    for (const row of res.data.values || []) {
      if (row && row[0] && (String(row[0]).includes('W51') || String(row[0]).includes('W50'))) {
        console.log('\nPhucVT Summary ' + row[0] + ':', JSON.stringify(row.slice(0,10)));
      }
    }
  } catch(e) {}
}

run().catch(e => console.error(e));
