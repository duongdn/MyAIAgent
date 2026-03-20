const {google} = require('googleapis');

const KEY_FILE = '/home/nus/projects/My-AI-Agent/daily-agent-490610-7eb7985b33e3.json';

const SHEETS = [
  { employee: 'LongVV', project: 'Xtreme Soft', id: '1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58', tab: 'W50', minH: 8 },
  { employee: 'PhucVT', project: 'James Diamond', id: '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', tab: 'W17', minH: 8 },
  { employee: 'VietPH', project: 'Paturevision', id: '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', tab: 'W19', minH: 8 },
  { employee: 'TuanNT', project: 'Paturevision', id: '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', tab: 'W19', minH: 8, multi: true },
  { employee: 'TuanNT', project: 'William Bills', id: '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', tab: 'W16', minH: 8, multi: true },
  { employee: 'TuanNT', project: 'John Yi / Amazing Meds', id: '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', tab: 'W15', minH: 8, multi: true },
  { employee: 'KhanhHH', project: 'Generator App', id: '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', tab: 'W32', minH: 8 },
  { employee: 'LeNH', project: 'BXR App', id: '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', tab: 'W3', minH: 8, multi: true },
  { employee: 'LeNH', project: 'Radio Data Center', id: '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', tab: 'W16', minH: 8, multi: true },
  { employee: 'LeNH', project: 'Baamboozle', id: '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', tab: 'W16', minH: 8, multi: true },
  { employee: 'ViTHT', project: 'Fountain', id: '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', tab: 'W18', minH: 8 },
  { employee: 'ThinhT', project: 'Fountain', id: '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', tab: 'W18', minH: 8 },
  { employee: 'VuTQ', project: 'Fountain', id: '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', tab: 'W18', minH: 8 },
  { employee: 'PhatDLT', project: 'Fountain', id: '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', tab: 'W18', minH: 8 },
  { employee: 'HungPN', project: 'Fountain', id: '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', tab: 'W18', minH: 8 },
];

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({version: 'v4', auth});
  
  // Track unique spreadsheet+tab combos to avoid re-fetching
  const cache = {};
  const results = {};
  
  for (const s of SHEETS) {
    const cacheKey = `${s.id}|${s.tab}`;
    try {
      let rows;
      if (cache[cacheKey]) {
        rows = cache[cacheKey];
      } else {
        const range = `'${s.tab}'!A1:P100`;
        const res = await sheets.spreadsheets.values.get({
          spreadsheetId: s.id,
          range: range,
        });
        rows = res.data.values || [];
        cache[cacheKey] = rows;
      }
      
      if (rows.length === 0) {
        console.log(`EMPTY: ${s.employee} - ${s.project} (${s.tab})`);
        continue;
      }
      
      console.log(`\n=== ${s.employee} - ${s.project} (${s.tab}) ===`);
      // Print first 5 rows for structure
      for (let i = 0; i < Math.min(5, rows.length); i++) {
        console.log(`Row${i+1}: ${JSON.stringify(rows[i]?.slice(0,12))}`);
      }
      
      // Row 4 col A date verification
      if (rows.length > 3) {
        console.log(`Row4[A] date check: "${rows[3]?.[0]}"`);
      }
      
      // Find header row - scan for Owner/Assignee
      let headerRow = -1, ownerCol = -1, notesCol = -1;
      for (let i = 0; i < Math.min(6, rows.length); i++) {
        const row = rows[i] || [];
        for (let j = 0; j < row.length; j++) {
          const cell = (row[j] || '').toString().toLowerCase().trim();
          if (cell === 'owner' || cell.includes('người thực hiện') || cell === 'assignee' || cell === 'dev') {
            if (headerRow === -1) { headerRow = i; ownerCol = j; }
          }
          if (cell === 'notes' || cell === 'note' || cell.includes('ghi chú')) {
            notesCol = j;
          }
        }
      }
      
      // Find day columns from header or nearby rows
      let monCol=-1, tueCol=-1, wedCol=-1, thuCol=-1, friCol=-1;
      for (let i = 0; i < Math.min(5, rows.length); i++) {
        const r = rows[i] || [];
        for (let j = 0; j < r.length; j++) {
          const cell = (r[j]||'').toString().trim();
          const cl = cell.toLowerCase();
          // Match day names or dates for this week
          if (cl==='mon'||cl==='t2'||cl==='thứ 2'||cell==='16'||cell.includes('16/3')||cell.includes('3/16')||cl==='monday') { if(monCol===-1) monCol=j; }
          if (cl==='tue'||cl==='t3'||cl==='thứ 3'||cell==='17'||cell.includes('17/3')||cell.includes('3/17')||cl==='tuesday') { if(tueCol===-1) tueCol=j; }
          if (cl==='wed'||cl==='t4'||cl==='thứ 4'||cell==='18'||cell.includes('18/3')||cell.includes('3/18')||cl==='wednesday') { if(wedCol===-1) wedCol=j; }
          if (cl==='thu'||cl==='t5'||cl==='thứ 5'||cell==='19'||cell.includes('19/3')||cell.includes('3/19')||cl==='thursday') { if(thuCol===-1) thuCol=j; }
          if (cl==='fri'||cl==='t6'||cl==='thứ 6'||cell==='20'||cell.includes('20/3')||cell.includes('3/20')||cl==='friday') { if(friCol===-1) friCol=j; }
        }
      }
      
      console.log(`Header:${headerRow} Owner:${ownerCol} Notes:${notesCol} Days:Mon=${monCol},Tue=${tueCol},Wed=${wedCol},Thu=${thuCol},Fri=${friCol}`);
      
      // Default columns if not found
      if (ownerCol === -1) ownerCol = 6;
      if (notesCol === -1) notesCol = 10;
      
      // Filter by employee
      const empName = s.employee;
      const empRows = [];
      const startRow = headerRow >= 0 ? headerRow + 1 : 5;
      
      for (let i = startRow; i < rows.length; i++) {
        const row = rows[i] || [];
        const owner = (row[ownerCol] || '').toString().trim();
        if (owner && (
          owner === empName ||
          owner.toLowerCase() === empName.toLowerCase() ||
          owner.includes(empName) || empName.includes(owner) ||
          // Also handle "Nick" for TuanNT
          (empName === 'TuanNT' && (owner.toLowerCase().includes('tuan') || owner.toLowerCase().includes('nick'))) ||
          (empName === 'LeNH' && (owner.toLowerCase().includes('le') || owner.toLowerCase() === 'lenh')) ||
          (empName === 'LongVV' && owner.toLowerCase().includes('long')) ||
          (empName === 'PhucVT' && owner.toLowerCase().includes('phuc')) ||
          (empName === 'VietPH' && owner.toLowerCase().includes('viet')) ||
          (empName === 'KhanhHH' && owner.toLowerCase().includes('khanh')) ||
          (empName === 'ViTHT' && owner.toLowerCase().includes('vi')) ||
          (empName === 'ThinhT' && owner.toLowerCase().includes('thinh')) ||
          (empName === 'VuTQ' && owner.toLowerCase().includes('vu')) ||
          (empName === 'PhatDLT' && owner.toLowerCase().includes('phat')) ||
          (empName === 'HungPN' && owner.toLowerCase().includes('hung'))
        )) {
          empRows.push({ rowIdx: i, data: row });
        }
      }
      
      console.log(`Matched ${empRows.length} task rows for ${empName}`);
      
      // Collect daily hours
      const dayHours = { mon: 0, tue: 0, wed: 0, thu: 0 };
      let offInfo = null;
      
      for (const er of empRows) {
        const row = er.data;
        const taskName = (row[1] || row[0] || '').toString();
        const notes = (row[notesCol] || '').toString();
        const allText = taskName + ' ' + notes;
        
        if (allText.includes('Nghỉ cả ngày')) {
          offInfo = { type: 'full', reason: notes.trim() || 'use paid leave' };
        }
        if (allText.includes('Nghỉ nửa ngày')) {
          offInfo = { type: 'half', reason: notes.trim() || 'use paid leave' };
        }
        
        if (monCol >= 0) dayHours.mon += parseFloat(row[monCol]) || 0;
        if (tueCol >= 0) dayHours.tue += parseFloat(row[tueCol]) || 0;
        if (wedCol >= 0) dayHours.wed += parseFloat(row[wedCol]) || 0;
        if (thuCol >= 0) dayHours.thu += parseFloat(row[thuCol]) || 0;
        
        // Print each matched row for debugging
        console.log(`  [${er.rowIdx+1}] Owner="${row[ownerCol]}" Task="${(row[1]||'').toString().substring(0,40)}" Mon=${row[monCol]||0} Tue=${row[tueCol]||0} Wed=${row[wedCol]||0} Thu=${row[thuCol]||0}`);
      }
      
      const key = s.multi ? s.employee : `${s.employee}|${s.project}`;
      if (!results[key]) {
        results[key] = { 
          employee: s.employee, projects: [],
          dayHours: { mon: 0, tue: 0, wed: 0, thu: 0 },
          minH: s.minH, offInfo: null, hasDayCols: false
        };
      }
      results[key].projects.push(s.project);
      results[key].dayHours.mon += dayHours.mon;
      results[key].dayHours.tue += dayHours.tue;
      results[key].dayHours.wed += dayHours.wed;
      results[key].dayHours.thu += dayHours.thu;
      if (offInfo) results[key].offInfo = offInfo;
      results[key].hasDayCols = results[key].hasDayCols || (monCol >= 0);
      
    } catch (err) {
      console.log(`ERROR ${s.employee} - ${s.project}: ${err.message.substring(0,200)}`);
    }
  }
  
  console.log('\n\n=== FINAL RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => console.error(e));
