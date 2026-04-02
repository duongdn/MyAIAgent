const {google} = require('googleapis');
const fs = require('fs');

const SA = JSON.parse(fs.readFileSync('/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json','utf8'));
const auth = new google.auth.GoogleAuth({
  credentials: SA,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});
const sheets = google.sheets({version:'v4', auth});

const devs = [
  {name:'LongVV', id:'1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58'},
  {name:'PhucVT', id:'1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI'},
  {name:'TuanNT-JohnYi', id:'1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'},
  {name:'TuanNT-Rebecca', id:'1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4'},
  {name:'VietPH', id:'1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg'},
  {name:'KhanhHH', id:'1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM'},
  {name:'LeNH-Rory', id:'1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8'},
  {name:'LeNH-Franc', id:'1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ'},
  {name:'LeNH-Aysar', id:'1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8'},
];

async function readSheet(dev) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: dev.id,
      range: "'W52'!A1:H100",
      valueRenderOption: 'UNFORMATTED_VALUE'
    });
    return {name: dev.name, data: res.data.values, error: null};
  } catch(e) {
    return {name: dev.name, data: null, error: e.message.slice(0,200)};
  }
}

async function readSummary(dev) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: dev.id,
      range: "'Summary'!A1:Z60",
      valueRenderOption: 'UNFORMATTED_VALUE'
    });
    return {name: dev.name, summary: res.data.values, error: null};
  } catch(e) {
    return {name: dev.name, summary: null, error: e.message.slice(0,200)};
  }
}

async function run() {
  const [results, summaries] = await Promise.all([
    Promise.all(devs.map(d => readSheet(d))),
    Promise.all(devs.map(d => readSummary(d)))
  ]);
  
  for (const r of results) {
    console.log('\n=== ' + r.name + ' W52 ===');
    if (r.error) { console.log('ERROR:', r.error); continue; }
    if (!r.data) { console.log('NO DATA'); continue; }
    r.data.forEach((row, i) => {
      console.log(i + '|' + JSON.stringify(row));
    });
  }
  
  console.log('\n\n======= SUMMARIES =======');
  for (const s of summaries) {
    console.log('\n=== ' + s.name + ' Summary ===');
    if (s.error) { console.log('ERROR:', s.error); continue; }
    if (!s.summary) { console.log('NO DATA'); continue; }
    for (const row of s.summary) {
      if (row && row[0] && String(row[0]).includes('W52')) {
        console.log('W52:', JSON.stringify(row));
      }
    }
    // Print rows 3-4 for column headers
    if (s.summary.length > 4) {
      console.log('Row3:', JSON.stringify(s.summary[3]));
      console.log('Row4:', JSON.stringify(s.summary[4]));
    }
  }
}

run().catch(e => console.error(e));
