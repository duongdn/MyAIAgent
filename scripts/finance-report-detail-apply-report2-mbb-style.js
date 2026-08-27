#!/usr/bin/env node
const { google } = require('googleapis');
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const ssid = '1UtAH3Bq5LYzJmqMQiFxOtODrMLjswiayc80-slGhvRg';
const target = 'Báo cáo 2 - MBB';

// 1-based row numbers from write-report2-mbb-content.js layout
const sectionHeaderRows = [1, 4, 8, 9, 25, 41, 44, 57, 67, 70, 75]; // full-row merge + bold + light blue
const tableHeaderRows = [10, 26, 45, 58]; // gray bold header rows
const narrativeMergeRows = [2, 5, 6, 23, 39, 42, 55, 65, 68, 71, 72, 73, 76, 77, 78, 79, 80]; // merge A:F, wrap
const dataTableRanges = [ [11, 22, 5], [27, 38, 5], [46, 54, 3], [59, 64, 2] ]; // [startRow,endRow,numCols] 1-based inclusive

const LIGHT_BLUE = { red: 0.8, green: 0.8784314, blue: 0.9764706 };
const GRAY = { red: 0.85, green: 0.85, blue: 0.85 };

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  const s = meta.data.sheets.find(x => x.properties.title === target);
  const sheetId = s.properties.sheetId;

  const requests = [];

  // clear any leftover merges first
  requests.push({ unmergeCells: { range: { sheetId, startRowIndex: 0, endRowIndex: 100, startColumnIndex: 0, endColumnIndex: 6 } } });

  sectionHeaderRows.forEach(r => {
    requests.push({ mergeCells: { range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' } });
    requests.push({ repeatCell: { range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { backgroundColor: LIGHT_BLUE, textFormat: { bold: true, fontSize: 11 }, wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat.backgroundColor,userEnteredFormat.textFormat,userEnteredFormat.wrapStrategy' } });
  });

  narrativeMergeRows.forEach(r => {
    requests.push({ mergeCells: { range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' } });
    requests.push({ repeatCell: { range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } });
  });

  tableHeaderRows.forEach(r => {
    requests.push({ repeatCell: { range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { backgroundColor: GRAY, textFormat: { bold: true } } }, fields: 'userEnteredFormat.backgroundColor,userEnteredFormat.textFormat' } });
  });

  dataTableRanges.forEach(([start, end, numCols]) => {
    requests.push({ updateBorders: {
      range: { sheetId, startRowIndex: start - 1, endRowIndex: end, startColumnIndex: 0, endColumnIndex: numCols },
      top: { style: 'SOLID', width: 1, color: { red: 0.6, green: 0.6, blue: 0.6 } },
      bottom: { style: 'SOLID', width: 1, color: { red: 0.6, green: 0.6, blue: 0.6 } },
      left: { style: 'SOLID', width: 1, color: { red: 0.6, green: 0.6, blue: 0.6 } },
      right: { style: 'SOLID', width: 1, color: { red: 0.6, green: 0.6, blue: 0.6 } },
      innerHorizontal: { style: 'SOLID', width: 1, color: { red: 0.85, green: 0.85, blue: 0.85 } },
      innerVertical: { style: 'SOLID', width: 1, color: { red: 0.85, green: 0.85, blue: 0.85 } },
    } });
    requests.push({ repeatCell: { range: { sheetId, startRowIndex: start, endRowIndex: end, startColumnIndex: 1, endColumnIndex: numCols }, cell: { userEnteredFormat: { horizontalAlignment: 'RIGHT' } }, fields: 'userEnteredFormat.horizontalAlignment' } });
  });

  // wrap + top-align whole sheet baseline
  requests.push({ repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 100, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } });

  // title row bigger font
  requests.push({ repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 13 } } }, fields: 'userEnteredFormat.textFormat' } });

  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests } });
  console.log(JSON.stringify({ success: true, target }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
