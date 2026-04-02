const {google} = require('googleapis');
const fs = require('fs');

const SA = JSON.parse(fs.readFileSync('/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json','utf8'));
const auth = new google.auth.GoogleAuth({
  credentials: SA,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});
const sheets = google.sheets({version:'v4', auth});

const devs = [
  {name:'LongVV', id:'1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58', owner:'LongVV'},
  {name:'PhucVT', id:'1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', owner:'PhucVT'},
  {name:'TuanNT-JohnYi', id:'1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', owner:'TuanNT'},
  {name:'TuanNT-Rebecca', id:'1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', owner:'TuanNT'},
  {name:'VietPH', id:'1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', owner:'VietPH'},
  {name:'KhanhHH', id:'1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', owner:'KhanhHH'},
  {name:'LeNH-Rory', id:'1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', owner:'LeNH'},
  {name:'LeNH-Franc', id:'1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', owner:'LeNH'},
  {name:'LeNH-Aysar', id:'1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', owner:'LeNH'},
];

// W52 week: Mon Mar 30 - Sun Apr 5, 2026
// Day indices: 0=Mon(Mar30), 1=Tue(Mar31), 2=Wed(Apr1), 3=Thu(Apr2)
// Apr 1 = day index 2, Apr 2 = day index 3

function parseDays(rows) {
  // Each day block: starts with row having numeric ID in col A and hours in col H (index 7)
  // Then task rows, then "Please insert above this line"
  const days = [];
  let currentDay = null;
  
  for (const row of rows) {
    if (typeof row[0] === 'number' && row[0] > 40000) {
      // Day header row
      if (currentDay) days.push(currentDay);
      currentDay = { 
        id: row[0], 
        totalHours: row[7] || 0, 
        tasks: [],
        hasLeave: false,
        hasHalfLeave: false
      };
    } else if (currentDay && row[0]) {
      const colA = String(row[0]);
      if (colA === 'Nghỉ cả ngày') {
        currentDay.hasLeave = true;
      } else if (colA === 'Nghỉ nửa ngày') {
        currentDay.hasHalfLeave = true;
      } else if (colA === 'Task dự án' && row[7]) {
        currentDay.tasks.push({
          desc: row[2] || '',
          owner: row[6] || '',
          hours: Number(row[7]) || 0
        });
      }
    }
  }
  if (currentDay) days.push(currentDay);
  return days;
}

function filterByOwner(days, ownerName) {
  return days.map(d => {
    const filtered = d.tasks.filter(t => {
      const o = String(t.owner).toLowerCase();
      return o.includes(ownerName.toLowerCase()) || o.includes('nick');
    });
    const hours = filtered.reduce((s, t) => s + t.hours, 0);
    return { ...d, filteredHours: hours, tasks: filtered };
  });
}

async function run() {
  const results = {};
  
  for (const dev of devs) {
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: dev.id,
        range: "'W52'!A1:H120",
        valueRenderOption: 'UNFORMATTED_VALUE'
      });
      const days = parseDays(res.data.values || []);
      results[dev.name] = days;
    } catch(e) {
      results[dev.name] = {error: e.message.slice(0,200)};
    }
  }
  
  // Also read Rebecca col P for "Chưa" status
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4',
      range: "'W52'!A1:P120",
      valueRenderOption: 'UNFORMATTED_VALUE'
    });
    // Find rows with col P data
    const rows = res.data.values || [];
    const pData = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][15]) pData.push({row: i, colP: rows[i][15]});
    }
    console.log('Rebecca col P data:', JSON.stringify(pData));
  } catch(e) {
    console.log('Rebecca col P error:', e.message.slice(0,200));
  }
  
  // Now compile report
  console.log('\n=== DAILY HOURS ANALYSIS ===');
  console.log('Week: W52 (Mar 30 - Apr 5, 2026)');
  console.log('Apr 1 = Day 3 (index 2), Apr 2 = Day 4 (index 3)\n');
  
  // LongVV
  const longDays = results['LongVV'];
  if (Array.isArray(longDays)) {
    const apr1 = longDays[2]; // index 2 = Apr 1
    const apr2 = longDays[3]; // index 3 = Apr 2
    const weekTotal = longDays.reduce((s,d) => s + (d.totalHours || 0), 0);
    console.log('LongVV:');
    console.log('  Apr 1:', apr1 ? `${apr1.totalHours}h, leave=${apr1.hasLeave}, halfLeave=${apr1.hasHalfLeave}` : 'N/A');
    console.log('  Apr 2:', apr2 ? `${apr2.totalHours}h, leave=${apr2.hasLeave}, halfLeave=${apr2.hasHalfLeave}` : 'N/A');
    console.log('  Week total:', weekTotal + 'h');
  }
  
  // PhucVT
  const phucDays = results['PhucVT'];
  if (Array.isArray(phucDays)) {
    const apr1 = phucDays[2];
    const apr2 = phucDays[3];
    const weekTotal = phucDays.reduce((s,d) => s + (d.totalHours || 0), 0);
    console.log('PhucVT:');
    console.log('  Apr 1:', apr1 ? `${apr1.totalHours}h, leave=${apr1.hasLeave}, halfLeave=${apr1.hasHalfLeave}` : 'N/A');
    console.log('  Apr 2:', apr2 ? `${apr2.totalHours}h, leave=${apr2.hasLeave}, halfLeave=${apr2.hasHalfLeave}` : 'N/A');
    console.log('  Week total:', weekTotal + 'h');
  }
  
  // TuanNT - sum across JohnYi + Rebecca (filter by owner TuanNT/Nick)
  const tuanJY = results['TuanNT-JohnYi'];
  const tuanReb = results['TuanNT-Rebecca'];
  if (Array.isArray(tuanJY) && Array.isArray(tuanReb)) {
    const jyFiltered = filterByOwner(tuanJY, 'TuanNT');
    const rebFiltered = filterByOwner(tuanReb, 'TuanNT');
    
    console.log('TuanNT (combined):');
    for (const dayIdx of [2, 3]) {
      const date = dayIdx === 2 ? 'Apr 1' : 'Apr 2';
      const jyH = jyFiltered[dayIdx] ? jyFiltered[dayIdx].filteredHours : 0;
      const rebH = rebFiltered[dayIdx] ? rebFiltered[dayIdx].filteredHours : 0;
      console.log(`  ${date}: JohnYi=${jyH}h, Rebecca=${rebH}h, total=${jyH+rebH}h`);
    }
    const jyWeek = jyFiltered.reduce((s,d) => s + d.filteredHours, 0);
    const rebWeek = rebFiltered.reduce((s,d) => s + d.filteredHours, 0);
    console.log(`  Week total: JohnYi=${jyWeek}h + Rebecca=${rebWeek}h = ${jyWeek+rebWeek}h`);
    console.log(`  JohnYi only (for Scrin compare): Apr1=${jyFiltered[2]?.filteredHours || 0}h`);
  }
  
  // VietPH
  const vietDays = results['VietPH'];
  if (Array.isArray(vietDays)) {
    const apr1 = vietDays[2];
    const apr2 = vietDays[3];
    const weekTotal = vietDays.reduce((s,d) => s + (d.totalHours || 0), 0);
    console.log('VietPH:');
    console.log('  Apr 1:', apr1 ? `${apr1.totalHours}h, leave=${apr1.hasLeave}, halfLeave=${apr1.hasHalfLeave}` : 'N/A');
    console.log('  Apr 2:', apr2 ? `${apr2.totalHours}h, leave=${apr2.hasLeave}, halfLeave=${apr2.hasHalfLeave}` : 'N/A');
    console.log('  Week total:', weekTotal + 'h');
  }
  
  // KhanhHH
  const khanhDays = results['KhanhHH'];
  if (Array.isArray(khanhDays)) {
    const apr1 = khanhDays[2];
    const apr2 = khanhDays[3];
    const weekTotal = khanhDays.reduce((s,d) => s + (d.totalHours || 0), 0);
    console.log('KhanhHH:');
    console.log('  Apr 1:', apr1 ? `${apr1.totalHours}h, leave=${apr1.hasLeave}, halfLeave=${apr1.hasHalfLeave}` : 'N/A');
    console.log('  Apr 2:', apr2 ? `${apr2.totalHours}h, leave=${apr2.hasLeave}, halfLeave=${apr2.hasHalfLeave}` : 'N/A');
    console.log('  Week total:', weekTotal + 'h');
  }
  
  // LeNH - sum across Rory + Franc + Aysar (filter by owner LeNH)
  const leRory = results['LeNH-Rory'];
  const leFranc = results['LeNH-Franc'];
  const leAysar = results['LeNH-Aysar'];
  if (Array.isArray(leRory) && Array.isArray(leFranc) && Array.isArray(leAysar)) {
    const roryF = filterByOwner(leRory, 'LeNH');
    const francF = filterByOwner(leFranc, 'LeNH');
    const aysarF = filterByOwner(leAysar, 'LeNH');
    
    console.log('LeNH (combined):');
    for (const dayIdx of [2, 3]) {
      const date = dayIdx === 2 ? 'Apr 1' : 'Apr 2';
      const rH = roryF[dayIdx] ? roryF[dayIdx].filteredHours : 0;
      const fH = francF[dayIdx] ? francF[dayIdx].filteredHours : 0;
      const aH = aysarF[dayIdx] ? aysarF[dayIdx].filteredHours : 0;
      console.log(`  ${date}: Rory=${rH}h, Franc=${fH}h, Aysar=${aH}h, total=${rH+fH+aH}h`);
    }
    const rW = roryF.reduce((s,d) => s + d.filteredHours, 0);
    const fW = francF.reduce((s,d) => s + d.filteredHours, 0);
    const aW = aysarF.reduce((s,d) => s + d.filteredHours, 0);
    console.log(`  Week total: Rory=${rW}h + Franc=${fW}h + Aysar=${aW}h = ${rW+fW+aW}h`);
  }
  
  // Also check: for devs with totalHours from the day header (not filtered)
  console.log('\n=== RAW DAY TOTALS (from sheet formula) ===');
  for (const [name, days] of Object.entries(results)) {
    if (!Array.isArray(days)) { console.log(name, ': ERROR'); continue; }
    const apr1 = days[2];
    const apr2 = days[3];
    const weekTotal = days.reduce((s,d) => s + (d.totalHours || 0), 0);
    console.log(`${name}: Apr1=${apr1?.totalHours||0}h Apr2=${apr2?.totalHours||0}h Week=${weekTotal}h leave_apr1=${apr1?.hasLeave} leave_apr2=${apr2?.hasLeave} halfLeave_apr1=${apr1?.hasHalfLeave} halfLeave_apr2=${apr2?.hasHalfLeave}`);
  }
}

run().catch(e => console.error(e));
