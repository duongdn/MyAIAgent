#!/usr/bin/env node
/**
 * Add the mandatory thin-data-limitation caveat to the HPA raw sheet: a cell
 * note on A1 (visible on hover) plus a visible banner row below the 202-row
 * data block (row 204, after a blank row 203 — does not disturb any formula
 * row references used by the ratio-block/valuation scripts, which only
 * reference rows <=202).
 */
const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const sheetName = 'HPA';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const CAVEAT = `LƯU Ý GIỚI HẠN DỮ LIỆU: HPA (CTCP Phát triển Nông nghiệp Hòa Phát) niêm yết HOSE từ 06/02/2026 (IPO thành công 30 triệu CP tháng 1/2026, giá 41,900đ/CP). cafef.vn CHỈ có 1 năm BCTC hợp nhất kiểm toán (2025) + 3 quý gần nhất (Q4/2025, Q1/2026, Q2/2026) — KHÔNG đạt tối thiểu 5 năm theo chuẩn quy trình (so với FPT/VEA/SAB/FOX có 5-11 năm). Đây là giới hạn dữ liệu THỰC vì công ty mới niêm yết, KHÔNG phải lỗi thu thập. Đã kiểm tra: KHÔNG dùng FireAnt bổ sung do FireAnt trộn lẫn dữ liệu một công ty khác từng dùng mã HPA trước đây (quy mô tài sản chênh ~50 lần, dữ liệu 2009-2012) — xem docs/memory/finance-report/feedback_newly_listed_ticker_thin_cafef_data.md.`;

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetObj = meta.data.sheets.find((s) => s.properties.title === sheetName);
  const sheetId = sheetObj.properties.sheetId;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${sheetName}'!A204`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[CAVEAT]] },
  });

  const requests = [
    { updateCells: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 }, rows: [{ values: [{ note: CAVEAT }] }], fields: 'note' } },
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 203, endRowIndex: 204, startColumnIndex: 0, endColumnIndex: 6 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 1, green: 0.949, blue: 0.8 },
            textFormat: { fontFamily: 'Arial', fontSize: 9, bold: true, italic: true },
            wrapStrategy: 'WRAP',
          },
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,wrapStrategy)',
      },
    },
    { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 203, endIndex: 204 }, properties: { pixelSize: 90 }, fields: 'pixelSize' } },
    { mergeCells: { range: { sheetId, startRowIndex: 203, endRowIndex: 204, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' } },
  ];
  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  console.log(JSON.stringify({ success: true }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
