const {google} = require('googleapis');
const KEY_FILE = '/home/nus/projects/My-AI-Agent/daily-agent-490610-7eb7985b33e3.json';

// The sheet structure: tasks grouped by day sections
// Row 1: "Task Log"
// Row 2: total hours summary
// Row 3: header (Item, Project, Description, ..., Owner, Actual, ...)
// Row 4: "Mon, 16/03/26" - day header with day total in col H
// Row 5+: task rows for Monday
// Then another day header "Tue, 17/03/26" ...
// Need to parse day sections and sum Actual (col H=7) per Owner per day

const SHEETS_CONFIG = [
  { employee: 'LongVV', project: 'Xtreme Soft', id: '1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58', tab: 'W50', minH: 8 },
  { employee: 'PhucVT', project: 'James Diamond', id: '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', tab: 'W17', minH: 8 },
  { employee: 'VietPH', project: 'Paturevision', id: '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', tab: 'W19', minH: 8 },
  { employee: 'TuanNT', project: 'Paturevision', id: '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', tab: 'W19', minH: 8, multi: true },
  { employee: 'TuanNT', project: 'William Bills', id: '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', tab: 'W16', minH: 8, multi: true },
  { employee: 'TuanNT', project: 'John Yi', id: '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', tab: 'W15', minH: 8, multi: true },
  { employee: 'KhanhHH', project: 'Generator App', id: '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', tab: 'W32', minH: 8 },
  { employee: 'LeNH', project: 'BXR App', id: '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', tab: 'W3', minH: 8, multi: true },
  { employee: 'LeNH', project: 'Radio Data Center', id: '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', tab: 'W16', minH: 8, multi: true },
  { employee: 'LeNH', project: 'Baamboozle', id: '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', tab: 'W16', minH: 8, multi: true },
];

// Fountain is separate - it uses day columns in Actual col per day
const FOUNTAIN = { id: '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', tab: 'W18' };
const FOUNTAIN_EMPLOYEES = ['ViTHT','ThinhT','VuTQ','PhatDLT','HungPN'];

function matchEmployee(owner, empName) {
  if (!owner) return false;
  const o = owner.toLowerCase().trim();
  const e = empName.toLowerCase();
  if (o === e) return true;
  if (o.includes(e) || e.includes(o)) return true;
  // Aliases
  const aliases = {
    'tuannt': ['tuan', 'nick', 'tuannt'],
    'lenh': ['lenh', 'le nh'],
    'longvv': ['longvv', 'long'],
    'phucvt': ['phucvt', 'phuc'],
    'vietph': ['vietph', 'viet'],
    'khanhhh': ['khanhhh', 'khanh'],
  };
  const al = aliases[e] || [];
  return al.some(a => o.includes(a));
}

function detectDay(cellA) {
  if (!cellA) return null;
  const s = cellA.toString().toLowerCase().trim();
  if (s.includes('mon') || s.includes('16/03') || s.includes('16/3/')) return 'mon';
  if (s.includes('tue') || s.includes('17/03') || s.includes('17/3/')) return 'tue';
  if (s.includes('wed') || s.includes('18/03') || s.includes('18/3/')) return 'wed';
  if (s.includes('thu') || s.includes('19/03') || s.includes('19/3/')) return 'thu';
  if (s.includes('fri') || s.includes('20/03') || s.includes('20/3/')) return 'fri';
  return null;
}

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_FILE, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({version: 'v4', auth});
  const cache = {};
  const results = {};

  async function getRows(id, tab) {
    const key = `${id}|${tab}`;
    if (cache[key]) return cache[key];
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: id, range: `'${tab}'!A1:P100` });
    cache[key] = res.data.values || [];
    return cache[key];
  }

  // Process day-section sheets (non-Fountain)
  for (const s of SHEETS_CONFIG) {
    try {
      const rows = await getRows(s.id, s.tab);
      if (rows.length < 4) { console.log(`SKIP ${s.employee}/${s.project}: too few rows`); continue; }
      
      // Find header row (with Owner col)
      let headerRow = -1, ownerCol = 6, actualCol = 7, notesCol = 10;
      for (let i = 0; i < Math.min(5, rows.length); i++) {
        const r = rows[i] || [];
        for (let j = 0; j < r.length; j++) {
          const c = (r[j]||'').toString().toLowerCase().trim();
          if (c === 'owner' || c === 'assignee') { headerRow = i; ownerCol = j; }
          if (c === 'actual' || c === 'actual (h)') actualCol = j;
          if (c === 'notes' || c === 'note') notesCol = j;
        }
      }
      
      // Parse day sections
      let currentDay = null;
      const empDayHours = { mon: 0, tue: 0, wed: 0, thu: 0 };
      let offInfo = {};
      const startIdx = headerRow >= 0 ? headerRow + 1 : 3;
      
      for (let i = startIdx; i < rows.length; i++) {
        const row = rows[i] || [];
        const colA = (row[0] || '').toString().trim();
        
        // Check if this is a day header row
        const day = detectDay(colA);
        if (day) { currentDay = day; continue; }
        
        if (!currentDay) continue;
        if (['mon','tue','wed','thu'].indexOf(currentDay) < 0) continue; // skip fri for now
        
        const owner = (row[ownerCol] || '').toString().trim();
        if (!matchEmployee(owner, s.employee)) continue;
        
        const hours = parseFloat(row[actualCol]) || 0;
        empDayHours[currentDay] += hours;
        
        // Check off patterns
        const taskDesc = (row[2] || row[1] || row[0] || '').toString();
        const notes = (row[notesCol] || '').toString();
        const allText = taskDesc + ' ' + notes;
        
        if (allText.includes('Nghỉ cả ngày')) {
          offInfo[currentDay] = { type: 'full', reason: notes.trim() || 'use paid leave' };
        }
        if (allText.includes('Nghỉ nửa ngày')) {
          offInfo[currentDay] = { type: 'half', reason: notes.trim() || 'use paid leave' };
        }
      }
      
      const key = s.multi ? s.employee : `${s.employee}|${s.project}`;
      if (!results[key]) {
        results[key] = { employee: s.employee, projects: [], dayHours: {mon:0,tue:0,wed:0,thu:0}, minH: s.minH, offInfo: {} };
      }
      results[key].projects.push(s.project);
      for (const d of ['mon','tue','wed','thu']) {
        results[key].dayHours[d] += empDayHours[d];
      }
      Object.assign(results[key].offInfo, offInfo);
      
      console.log(`${s.employee}/${s.project}: Mon=${empDayHours.mon} Tue=${empDayHours.tue} Wed=${empDayHours.wed} Thu=${empDayHours.thu} Off=${JSON.stringify(offInfo)}`);
      
    } catch(e) {
      console.log(`ERROR ${s.employee}/${s.project}: ${e.message.substring(0,150)}`);
    }
  }

  // Process Fountain sheet - it has day-section structure too based on first run analysis
  // Actually from first run, the Fountain sheet matched Thu=col7 which IS the Actual column
  // But the values were clearly per-day section. Let me re-check properly.
  try {
    const rows = await getRows(FOUNTAIN.id, FOUNTAIN.tab);
    
    // Find structure
    let headerRow = -1, ownerCol = 6, actualCol = 7, notesCol = 10;
    for (let i = 0; i < Math.min(5, rows.length); i++) {
      const r = rows[i] || [];
      for (let j = 0; j < r.length; j++) {
        const c = (r[j]||'').toString().toLowerCase().trim();
        if (c === 'owner' || c === 'assignee') { headerRow = i; ownerCol = j; }
        if (c === 'actual' || c === 'actual (h)') actualCol = j;
        if (c === 'notes' || c === 'note') notesCol = j;
      }
    }
    
    for (const emp of FOUNTAIN_EMPLOYEES) {
      let currentDay = null;
      const empDayHours = {mon:0,tue:0,wed:0,thu:0};
      let offInfo = {};
      const startIdx = headerRow >= 0 ? headerRow + 1 : 3;
      
      for (let i = startIdx; i < rows.length; i++) {
        const row = rows[i] || [];
        const colA = (row[0] || '').toString().trim();
        const day = detectDay(colA);
        if (day) { currentDay = day; continue; }
        if (!currentDay || ['mon','tue','wed','thu'].indexOf(currentDay) < 0) continue;
        
        const owner = (row[ownerCol] || '').toString().trim();
        if (!owner) continue;
        
        const ownerLC = owner.toLowerCase();
        const empLC = emp.toLowerCase();
        if (ownerLC !== empLC && !ownerLC.includes(empLC) && !empLC.includes(ownerLC)) continue;
        
        const hours = parseFloat(row[actualCol]) || 0;
        empDayHours[currentDay] += hours;
        
        const taskDesc = (row[2]||row[1]||'').toString();
        const notes = (row[notesCol]||'').toString();
        if ((taskDesc+notes).includes('Nghỉ cả ngày')) offInfo[currentDay] = {type:'full',reason:notes.trim()||'use paid leave'};
        if ((taskDesc+notes).includes('Nghỉ nửa ngày')) offInfo[currentDay] = {type:'half',reason:notes.trim()||'use paid leave'};
      }
      
      const key = `${emp}|Fountain`;
      results[key] = { employee: emp, projects: ['Fountain'], dayHours: empDayHours, minH: 8, offInfo };
      console.log(`${emp}/Fountain: Mon=${empDayHours.mon} Tue=${empDayHours.tue} Wed=${empDayHours.wed} Thu=${empDayHours.thu} Off=${JSON.stringify(offInfo)}`);
    }
  } catch(e) {
    console.log(`ERROR Fountain: ${e.message.substring(0,150)}`);
  }

  console.log('\n=== RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => console.error(e));
