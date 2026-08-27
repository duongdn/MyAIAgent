#!/usr/bin/env node
const { google } = require('googleapis');
const path = require('path');
const ssid = '1oDM7Fixh2bHKBcqnHhWzLPO1OukR9FSl3u4tW6WaI5Y';
const KEY_PATH = path.join(__dirname, '..', '..', '..', '..', '..', 'projects', 'My-AI-Agent', 'config', 'daily-agent-490610-7eb7985b33e3.json');
// fallback absolute
const KEY_PATH2 = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const fs = require('fs');
const key = fs.existsSync(KEY_PATH2) ? KEY_PATH2 : KEY_PATH;

const years = ['2014','2015','2016','2018','2019','2020','2021','2022','2023','2024','2025'];
const cols = ['B','C','D','E','F','G','H','I','J','K','L'];

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: key, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  const src = meta.data.sheets.find(s => s.properties.title === 'VCB');
  const target = 'Định lượng - VCB';
  let existing = meta.data.sheets.find(s => s.properties.title === target);
  if (existing) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ deleteSheet: { sheetId: existing.properties.sheetId } }] } });
  }
  const copyRes = await sheets.spreadsheets.sheets.copyTo({ spreadsheetId: ssid, sheetId: src.properties.sheetId, requestBody: { destinationSpreadsheetId: ssid } });
  const newSheetId = copyRes.data.sheetId;
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ updateSheetProperties: { properties: { sheetId: newSheetId, title: target, index: 2 }, fields: 'title,index' } }] } });

  // Build ratio block starting row 122 (after 119 rows + gap)
  const startRow = 122;
  const rows = [];
  rows.push(['CHỈ SỐ TÀI CHÍNH NGÂN HÀNG (tính từ BCTC — công thức tham chiếu sống tới sheet VCB)', ...years]);
  rows.push(['ROE (LNST / VCSH cuối năm, %)']);
  rows.push(['ROA (LNST / Tổng tài sản cuối năm, %)']);
  rows.push(['CIR — Chi phí hoạt động / Tổng thu nhập hoạt động (%)  — chỉ có dữ liệu 2024-2025 do cafef không công bố "Tổng thu nhập hoạt động" các năm trước']);
  rows.push(['Tỷ lệ Thu nhập lãi thuần / Tổng tài sản cuối năm (%) — PROXY, KHÔNG PHẢI NIM chính thức (NIM thật cần tài sản sinh lời bình quân, không công bố trong BCTC cơ bản)']);
  rows.push(['NPL (Nợ xấu/dư nợ) — N/A: không công bố trong BCTC cơ bản cafef, cần Báo cáo thường niên/Thuyết minh']);
  rows.push(['CAR (Hệ số an toàn vốn) — N/A: không công bố trong BCTC cơ bản cafef, cần Báo cáo thường niên/Basel công bố riêng']);

  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A${startRow}`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });

  // formulas for ROE, ROA, CIR, NII/TA
  const roeRow = startRow + 1, roaRow = startRow + 2, cirRow = startRow + 3, niiRow = startRow + 4;
  const formulaRows = { roe: [], roa: [], cir: [], nii: [] };
  cols.forEach((c) => {
    formulaRows.roe.push(`=IFERROR(${c}116/${c}66,"n/a")`);
    formulaRows.roa.push(`=IFERROR(${c}116/${c}48,"n/a")`);
    formulaRows.cir.push(`=IFERROR(${c}108/${c}107,"n/a")`);
    formulaRows.nii.push(`=IFERROR(${c}96/${c}48,"n/a")`);
  });
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!B${roeRow}`, valueInputOption: 'USER_ENTERED', requestBody: { values: [formulaRows.roe] } });
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!B${roaRow}`, valueInputOption: 'USER_ENTERED', requestBody: { values: [formulaRows.roa] } });
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!B${cirRow}`, valueInputOption: 'USER_ENTERED', requestBody: { values: [formulaRows.cir] } });
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!B${niiRow}`, valueInputOption: 'USER_ENTERED', requestBody: { values: [formulaRows.nii] } });

  // format as percent
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { repeatCell: { range: { sheetId: newSheetId, startRowIndex: roeRow-1, endRowIndex: niiRow, startColumnIndex: 1, endColumnIndex: 12 }, cell: { userEnteredFormat: { numberFormat: { type: 'PERCENT', pattern: '0.00%' } } }, fields: 'userEnteredFormat.numberFormat' } },
    { repeatCell: { range: { sheetId: newSheetId, startRowIndex: startRow-1, endRowIndex: startRow }, cell: { userEnteredFormat: { textFormat: { bold: true } } }, fields: 'userEnteredFormat.textFormat' } },
    { updateDimensionProperties: { range: { sheetId: newSheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 380 }, fields: 'pixelSize' } },
  ] } });

  console.log(JSON.stringify({ success: true, target, newSheetId }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
