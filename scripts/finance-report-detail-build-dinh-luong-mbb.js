#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1UtAH3Bq5LYzJmqMQiFxOtODrMLjswiayc80-slGhvRg';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const years = ['2012','2014','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','Q3/2024','Q4/2024','Q1/2025','Q2/2025','Q3/2025','Q4/2025','Q1/2026','Q2/2026'];
const cols = ['B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U'];

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  const src = meta.data.sheets.find(s => s.properties.title === 'MBB');
  const target = 'Định lượng - MBB';
  let existing = meta.data.sheets.find(s => s.properties.title === target);
  if (existing) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ deleteSheet: { sheetId: existing.properties.sheetId } }] } });
  }
  const copyRes = await sheets.spreadsheets.sheets.copyTo({ spreadsheetId: ssid, sheetId: src.properties.sheetId, requestBody: { destinationSpreadsheetId: ssid } });
  const newSheetId = copyRes.data.sheetId;
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ updateSheetProperties: { properties: { sheetId: newSheetId, title: target, index: 2 }, fields: 'title,index' } }] } });

  // raw sheet has 169 rows -> ratio block starts row 171
  const startRow = 171;
  const rows = [];
  rows.push(['CHỈ SỐ TÀI CHÍNH NGÂN HÀNG (tính từ BCTC — công thức tham chiếu sống tới sheet MBB; cột quý là số theo kỳ, KHÔNG annualize)', ...years]);
  rows.push(['ROE (LNST / VCSH cuối kỳ, %)']);
  rows.push(['ROA (LNST / Tổng tài sản cuối kỳ, %)']);
  rows.push(['CIR — Chi phí hoạt động / Tổng thu nhập hoạt động (%)']);
  rows.push(['Tỷ lệ Thu nhập lãi thuần / Tổng tài sản cuối kỳ (%) — PROXY, KHÔNG PHẢI NIM chính thức (NIM thật cần tài sản sinh lời bình quân, không công bố trong BCTC cơ bản)']);
  rows.push(['NPL (Nợ xấu/dư nợ) — xem nguồn workbook so sánh ngành nếu có, nếu không: N/A không công bố trong BCTC cơ bản cafef']);
  rows.push(['CAR (Hệ số an toàn vốn) — xem nguồn workbook so sánh ngành nếu có, nếu không: N/A không công bố trong BCTC cơ bản cafef']);

  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A${startRow}`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });

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

  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { repeatCell: { range: { sheetId: newSheetId, startRowIndex: roeRow-1, endRowIndex: niiRow, startColumnIndex: 1, endColumnIndex: 21 }, cell: { userEnteredFormat: { numberFormat: { type: 'PERCENT', pattern: '0.00%' } } }, fields: 'userEnteredFormat.numberFormat' } },
    { repeatCell: { range: { sheetId: newSheetId, startRowIndex: startRow-1, endRowIndex: startRow }, cell: { userEnteredFormat: { textFormat: { bold: true } } }, fields: 'userEnteredFormat.textFormat' } },
    { updateDimensionProperties: { range: { sheetId: newSheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 420 }, fields: 'pixelSize' } },
  ] } });

  console.log(JSON.stringify({ success: true, target, newSheetId, startRow }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
