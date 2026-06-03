const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({ keyFile: 'config/daily-agent-490610-7eb7985b33e3.json', scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

const ALL_SHEETS = {
  Maddy:        '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I',
  JohnYi:       '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ',
  Rebecca:      '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4',
  Neural:       '1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg',
  JamesDiamond: '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI',
  Rory:         '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8',
  Franc:        '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ',
  Aysar:        '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8',
  Generator:    '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM',
  Paturevision: '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg',
  Elena:        '1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ',
  Fountain:     '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o',
  LongVV2:      '1eZoRo_zqarndr2TS5RiN_PcBtjcSCTP2_kYX66oBugA',
};

// Use yesterday in +07 timezone as the reporting date
const now7 = new Date(Date.now() + 7*3600*1000);
const yesterday7 = new Date(now7); yesterday7.setUTCDate(yesterday7.getUTCDate() - 1);
const TARGET = new Date(yesterday7.getUTCFullYear(), yesterday7.getUTCMonth(), yesterday7.getUTCDate());
const dd = String(TARGET.getDate()).padStart(2,'0');
const mm = String(TARGET.getMonth()+1).padStart(2,'0');
const yy = String(TARGET.getFullYear()).slice(-2);
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const dayName = DAY_NAMES[TARGET.getDay()];
const TODAY_TOKENS = [dayName+', '+dd+'/'+mm+'/'+yy, dd+'/'+mm+'/'+yy];
const DAY_PAT = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),/;
const MONTHS = {January:0,February:1,March:2,April:3,May:4,June:5,July:6,August:7,September:8,October:9,November:10,December:11};

function parseDate(s) {
  if (!s) return null;
  const m = String(s).trim().match(/^(\w+)\s+(\d+),\s+(\d{4})/);
  if (m && MONTHS[m[1]] !== undefined) return new Date(+m[3], MONTHS[m[1]], +m[2]);
  const m2 = String(s).trim().match(/^(\d{1,2})\/(\d{2})\/(\d{2})/);
  if (m2) return new Date(2000 + +m2[3], +m2[2]-1, +m2[1]);
  return null;
}

async function main() {
  const api = google.sheets({ version: 'v4', auth: await auth.getClient() });
  const byOwnerToday = {}, byOwnerWeek = {}, leaveByOwner = {};

  async function getRange(id, range) {
    try { return (await api.spreadsheets.values.get({ spreadsheetId: id, range })).data.values || []; }
    catch(e) { return []; }
  }

  async function findWeekTab(id, name) {
    for (const row of await getRange(id, 'Summary!A1:D80')) {
      if (!row[0] || !/^W\d+/.test(String(row[0]).trim())) continue;
      const s = parseDate(row[1]), e = parseDate(row[2]);
      if (s && e && s <= TARGET && TARGET <= e) return row[0].trim();
    }
    process.stderr.write('  No tab: ' + name + '\n');
    return null;
  }

  for (const [name, id] of Object.entries(ALL_SHEETS)) {
    const tab = await findWeekTab(id, name);
    if (!tab) continue;
    process.stderr.write(name + ' -> ' + tab + '\n');

    const rows = await getRange(id, tab + '!A1:J200');
    let inToday = false;

    for (const row of rows) {
      const a = (row[0]||'').trim();
      if (TODAY_TOKENS.some(t => a.includes(t))) { inToday = true; continue; }
      if (inToday && DAY_PAT.test(a)) inToday = false;
      // Only capture leave notes within the target day block
      if (inToday && a.includes('Ngh') && row[6]) { leaveByOwner[(row[6]||'').trim()] = a; continue; }
      const al = a.toLowerCase();
      if (!al.includes('task d') && !al.includes('task du')) continue;
      const owner = (row[6]||'').trim();
      const hrs = parseFloat((row[7]||'0').toString().replace(',','.')) || 0;
      if (!owner || hrs <= 0) continue;
      byOwnerWeek[owner] = (byOwnerWeek[owner]||0) + hrs;
      if (inToday) byOwnerToday[owner] = (byOwnerToday[owner]||0) + hrs;
    }
  }

  // Only managed devs
  const MANAGED = ['LongVV', 'PhucVT', 'TuanNT', 'KhanhHH', 'LeNH', 'VietPH', 'VuTQ'];
  const ts = new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit' });
  console.log('\n=== TASK LOG TEAM — ' + ts + ' +07 ===');
  for (const o of MANAGED) {
    const today = byOwnerToday[o]||0, week = byOwnerWeek[o]||0;
    const leave = leaveByOwner[o] ? ' ['+leaveByOwner[o]+']' : '';
    const flag = today>0 ? '[x]' : week>0 ? '[ ]' : '[!]';
    console.log(flag, o.padEnd(10), 'today:', String(today).padStart(4)+'h   week:', week+'h'+leave);
  }
}
main().catch(e => console.error('FATAL:', e.message));
