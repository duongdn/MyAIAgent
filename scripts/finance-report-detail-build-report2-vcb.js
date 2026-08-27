#!/usr/bin/env node
const { google } = require('googleapis');
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const FPT_SSID = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';
const FPT_SHEETID = 886541258;
const ssid = '1oDM7Fixh2bHKBcqnHhWzLPO1OukR9FSl3u4tW6WaI5Y';
const target = 'Báo cáo 2 - VCB';

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  const existing = meta.data.sheets.find(s => s.properties.title === target);
  if (existing) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ deleteSheet: { sheetId: existing.properties.sheetId } }] } });
  }

  const copyRes = await sheets.spreadsheets.sheets.copyTo({ spreadsheetId: FPT_SSID, sheetId: FPT_SHEETID, requestBody: { destinationSpreadsheetId: ssid } });
  const newSheetId = copyRes.data.sheetId;
  const rowCount = copyRes.data.gridProperties ? copyRes.data.gridProperties.rowCount : 200;
  const colCount = copyRes.data.gridProperties ? copyRes.data.gridProperties.columnCount : 20;

  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateSheetProperties: { properties: { sheetId: newSheetId, title: target, index: 5 }, fields: 'title,index' } },
  ] } });

  // unmerge full range first
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { unmergeCells: { range: { sheetId: newSheetId, startRowIndex: 0, endRowIndex: rowCount, startColumnIndex: 0, endColumnIndex: colCount } } },
  ] } }).catch(e => console.error('unmerge warn:', e.message));

  console.log(JSON.stringify({ success: true, target, newSheetId, rowCount, colCount }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
