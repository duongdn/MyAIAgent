#!/usr/bin/env node
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SERVICE_ACCOUNT_KEY = './config/daily-agent-490610-7eb7985b33e3.json';
const TARGET_DATE = '2026-07-06';

const SHEETS = {
  'Maddy': '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I',
  'Baamboozle': '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8',
  'James Diamond': '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI',
  'Bailey': '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg',
  'Marcel': '1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI',
  'Neural Contract': '1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg',
  'LegalAtoms': '1Q9qB-Bz4lRqSIjqNbLszFOtokm4X_fUe4KqiTXIQ9_c',
  'Andrew Taraba': '11iOnN6sCEK_5pcoeFs8tm42GZRZ719rTDlAeAYQIOGI'
};

const WORKSTREAM_MAP = {
  'Maddy': 'maddy',
  'Baamboozle': 'baamboozle',
  'James Diamond': 'james_diamond',
  'Bailey': 'speedventory',
  'Marcel': 'marcel',
  'Neural Contract': 'neural_contract',
  'LegalAtoms': 'legalatoms',
  'Andrew Taraba': null
};

function parseSheetDate(dateStr) {
  if (!dateStr) return null;
  try {
    let match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (match) {
      let [, m, d, y] = match;
      y = y.length === 2 ? '20' + y : y;
      return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }
    match = dateStr.match(/(\w+)\s+(\d{1,2}),?\s+(\d{4})/);
    if (match) {
      const months = { 'January': '01', 'February': '02', 'March': '03', 'April': '04', 
                       'May': '05', 'June': '06', 'July': '07', 'August': '08', 
                       'September': '09', 'October': '10', 'November': '11', 'December': '12' };
      const [, month, day, year] = match;
      const m = months[month];
      if (m) return `${year}-${m}-${String(day).padStart(2,'0')}`;
    }
  } catch (e) {}
  return null;
}

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });
  return google.sheets({ version: 'v4', auth });
}

async function fetchSheetData(sheets, sheetId, projectName) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Summary!A6:D60'
    });
    
    const values = response.data.values || [];
    for (const row of values) {
      if (!row || row.length < 4) continue;
      const dateCell = row[1];
      const hoursCell = row[3];
      
      const parsedDate = parseSheetDate(dateCell);
      if (parsedDate === TARGET_DATE) {
        const hours = parseFloat(hoursCell) || 0;
        return { found: true, hours, dateLabel: dateCell };
      }
    }
    
    return { found: false, hours: 0, dateLabel: null };
  } catch (err) {
    return { found: false, hours: 0, error: err.message };
  }
}

function checkWorkstreamStaleness(projectKey, sheetHours) {
  if (!projectKey) return null;
  
  try {
    const output = execSync(`node scripts/workstream-fetch-project-week.js ${TARGET_DATE} ${projectKey}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000
    });
    const data = JSON.parse(output);
    const projectData = data[projectKey];
    
    if (projectData && projectData.members && projectData.members.length > 0) {
      const totalWorkstream = projectData.members.reduce((sum, m) => sum + m.weekTotal, 0);
      return { workstreamHours: totalWorkstream, discrepancy: Math.abs(totalWorkstream - sheetHours) };
    }
  } catch (err) {
    // silently skip
  }
  return null;
}

async function main() {
  const sheets = await getSheets();
  const results = [];
  const notes = [];
  
  for (const [projectName, sheetId] of Object.entries(SHEETS)) {
    const sheetData = await fetchSheetData(sheets, sheetId, projectName);
    
    let reportLine = `${projectName}: `;
    let finalHours = sheetData.hours;
    let note = null;
    
    if (sheetData.error) {
      reportLine += `ERROR`;
    } else if (!sheetData.found) {
      reportLine += `0h`;
      note = `${projectName}: No matching week row found in sheet`;
    } else if (sheetData.hours === 0) {
      // Always check staleness for zeros
      const wsCheck = checkWorkstreamStaleness(WORKSTREAM_MAP[projectName], sheetData.hours);
      if (wsCheck && wsCheck.workstreamHours > 0) {
        finalHours = wsCheck.workstreamHours;
        reportLine += `${finalHours}h`;
        note = `${projectName}: Sheet shows 0, Workstream shows ${finalHours}h (staleness correction)`;
      } else {
        reportLine += `${finalHours}h`;
      }
    } else {
      reportLine += `${finalHours}h`;
    }
    
    results.push(reportLine);
    if (note) notes.push(note);
  }
  
  console.log(results.join('\n'));
  if (notes.length > 0) {
    console.log('\nNotes:');
    notes.forEach(n => console.log('- ' + n));
  }
}

main().catch(e => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
