const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';
  const sheetId = 886541258;

  // Step 1: delete old rows 122-129 (index 121 to 129)
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        { deleteDimension: { range: { sheetId, dimension: 'ROWS', startIndex: 121, endIndex: 129 } } },
      ],
    },
  });
  console.log('Old rows 122-129 deleted.');

  // Step 2: insert 25 new blank rows at index 121
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        { insertDimension: { range: { sheetId, dimension: 'ROWS', startIndex: 121, endIndex: 146 }, inheritFromBefore: false } },
      ],
    },
  });
  console.log('25 new rows inserted at index 121 (rows 122-146).');

  const GREY = { red: 0.91764706, green: 0.91764706, blue: 0.91764706 };
  const BLUE = { red: 0.8, green: 0.8784314, blue: 0.9764706 };

  const values = [
    // R122 header
    ["Tiêu chí", "Ngưỡng", "Số liệu FPT (file 2025 → live 22/7/2026)", "Kết quả", "Ghi chú", ""],
    // R123-132: 10 criteria
    ["1. Quy mô — Hạng nhất/Top ngành hoặc Top 100 vốn hóa", "Top ngành hoặc Top 100", "CP \"Dịch vụ Công nghệ\" DUY NHẤT trong rổ 101 CP vốn hóa lớn (~123 nghìn tỷ, snapshot Jul-26)", "ĐẠT", "Nguồn: sheet 'Top 100' — rổ 101 CP vốn hóa lớn theo dõi, không phải toàn bộ 3 sàn.", ""],
    ["2. Vốn — TS ngắn hạn/Nợ ngắn hạn (Current ratio)", "≥ 2.0 lần", "1.40", "KHÔNG ĐẠT", "Cao nhất 10 năm (2016-2025): 1.45 lần — chưa năm nào đạt 2x. Không phụ thuộc giá CP.", ""],
    ["3. Nợ phải trả/Vốn chủ sở hữu (D/E)", "≤ 2.0 lần", "1.01", "ĐẠT", "Trung bình 10 năm: 1.13 lần.", ""],
    ["4. Có lời 10 năm gần nhất (2016-2025)", "LNST dương cả 10 năm", "1,991 tỷ (thấp nhất 10 năm)", "ĐẠT", "Số liệu là LNST - cổ đông công ty mẹ, thấp nhất trong 10 năm.", ""],
    ["5. EPS TB 3 năm gần nhất > 33% so TB 3 năm xa nhất", "> 33%", "14.4%", "KHÔNG ĐẠT", "TB EPS 2023-25: 4,940đ vs TB EPS 2016-18: 4,319đ.", ""],
    ["6. Cổ tức > 0 trong 10 năm gần nhất", "Trả cổ tức tiền mặt cả 10 năm", "1 năm không có dòng tiền (2017)", "KHÔNG ĐẠT", "Năm 2017 không có dòng tiền chi trả cổ tức trong BCTC (có thể trả bằng CP thay vì tiền mặt) — nguồn: sheet 'FPT' dòng 229.", ""],
    ["7. EPS tăng trưởng trong 10 năm", "EPS 2025 > EPS 2016", "3,925đ (2016) → 5,216đ (2025, file); EPS live TTM 5,651đ", "ĐẠT", "Tăng không đều — giảm 2018 (-23.9%, thoái vốn FPT Retail/Trading) và 2020 (-2.4%). Live EPS còn cao hơn file → càng củng cố ĐẠT.", ""],
    ["8. Trần định giá: P/E ≤ 25 lần", "≤ 25 lần", "16.50 (file) → 11.87 (live)", "ĐẠT (cả 2)", "P/E hiện tại 2025; live giảm càng củng cố ĐẠT.", ""],
    ["9. Khuyến nghị: P/E ≤ 15x VÀ P/B ≤ 1.5x", "PE≤15x và PB≤1.5x", "PE 16.50/PB 3.54 (file) → PE 11.87/PB 2.95 (live)", "KHÔNG ĐẠT (cả 2)", "Live: P/E đã đạt (11.87≤15) nhưng P/B chưa đạt (2.95>1.5) — cần đạt CẢ HAI mới tính đạt.", ""],
    ["10. Graham Number: P/E × P/B ≤ 22.5", "≤ 22.5", "58.33 (file) → 35.02 (live)", "KHÔNG ĐẠT (cả 2)", "Live cải thiện mạnh (-40%) nhưng vẫn > 22.5. Dùng EPS & BVPS năm gần nhất.", ""],
    // R133 Kết luận I
    ["Kết luận I", "", "5/10 tiêu chí đạt", "KHÔNG ĐỔI", "Dù giá live giảm ~29%, 2 tiêu chí định giá (9, 10) vẫn kẹt vì P/B chưa đạt ngưỡng 1.5x.", ""],
    // R134 blank
    ["", "", "", "", "", ""],
    // R135 Greenblatt subheader
    ["II. XẾP HẠNG THEO MÔ HÌNH GREENBLATT (KẾT HỢP ROA + P/E)", "", "", "", "", ""],
    // R136 intro
    ["Nguồn: sheet 'Benjamin Graham - FPT' mục II + sheet 'Top 100' — rổ 101 CP vốn hóa lớn theo dõi (snapshot Jul-26), không phải toàn thị trường. Đây là mô hình xếp hạng TƯƠNG ĐỐI, khác bản chất với 10 tiêu chí Graham (ngưỡng tuyệt đối) ở trên.", "", "", "", "", ""],
    // R137 Greenblatt table header
    ["Chỉ tiêu", "Giá trị FPT", "Xếp hạng trong 101 CP", "Diễn giải", "", ""],
    // R138-144 data
    ["Vốn hóa thị trường (nghìn tỷ VNĐ)", "123 (snapshot Jul-26)", "21", "So với vốn hóa live 22/7/2026 (~115 nghìn tỷ, xem bảng GIÁ CẢ) — chênh nhỏ do khác ngày snapshot, không phải sai số.", "", ""],
    ["ROE (%)", "27.30%", "14", "Hạng 14/101 theo ROE giảm dần (1=cao nhất).", "", ""],
    ["ROA (%)", "13.60%", "15", "Hạng 15/101 theo ROA giảm dần.", "", ""],
    ["P/E (lần)", "12.8 (snapshot Jul-26)", "45", "Gần khớp P/E live 11.87 (bảng GIÁ CẢ) — chênh nhỏ do khác ngày/nguồn snapshot. Hạng 45/101 theo P/E tăng dần (1=rẻ nhất).", "", ""],
    ["P/B (lần)", "3.2 (snapshot Jul-26)", "80", "Gần khớp P/B live 2.95 (bảng GIÁ CẢ).", "", ""],
    ["Điểm kết hợp ROA + P/E (càng nhỏ càng tốt)", "60", "15 (hạng ROA) + 45 (hạng P/E)", "", "", ""],
    ["Xếp hạng cuối cùng (mô hình)", "77/101", "Top ~24%", "Vị trí thứ 25 từ trên xuống trong 101 CP — khá tốt nhưng không thuộc nhóm dẫn đầu (nhóm đầu: hạng 90-100).", "", ""],
    // R145 blank
    ["", "", "", "", "", ""],
    // R146 Đánh giá 4 (merged, single cell text, rest blank)
    ["Đánh giá 4 (Graham + Greenblatt): Theo 10 tiêu chí Graham cổ điển, FPT giữ nguyên 5/10 tiêu chí đạt ở CẢ giá file lẫn giá live (22/7/2026) — 2 tiêu chí định giá then chốt (PE+PB kép, Graham Number) vẫn KHÔNG ĐẠT vì P/B (2.95x live) còn cao hơn nhiều ngưỡng 1.5x dù P/E đã về dưới 15x. Theo mô hình Greenblatt (đánh giá TƯƠNG ĐỐI so với 101 CP vốn hóa lớn, không phải ngưỡng tuyệt đối), FPT xếp hạng 77/101 (top ~24%) — khá tốt, không tệ nhưng cũng không thuộc nhóm dẫn đầu. Hai kết luận không mâu thuẫn: Graham đo \"có rẻ tuyệt đối không\" (KHÔNG), Greenblatt đo \"có tốt hơn phần lớn thị trường không\" (CÓ, tương đối). Phù hợp nhà đầu tư chấp nhận trả giá hợp lý-khá cao để đổi lấy chất lượng+tăng trưởng, hơn là nhà đầu tư phòng thủ tìm giá cực rẻ. Nguồn: sheet 'Benjamin Graham - FPT' (đầy đủ 10 tiêu chí + xếp hạng Greenblatt) + giá live Simplize.vn/TradingView truy cập 22/7/2026.", "", "", "", "", ""],
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Báo cáo 2'!A122:F146",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
  console.log('Values written rows 122-146.');

  // Formatting requests
  const requests = [];
  // Section headers full-width merge + blue bg: row135 (idx134)
  requests.push({
    mergeCells: { range: { sheetId, startRowIndex: 134, endRowIndex: 135, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' },
  });
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 134, endRowIndex: 135, startColumnIndex: 0, endColumnIndex: 6 },
      cell: { userEnteredFormat: { backgroundColor: BLUE, textFormat: { bold: true }, wrapStrategy: 'WRAP' } },
      fields: 'userEnteredFormat.backgroundColor,userEnteredFormat.textFormat,userEnteredFormat.wrapStrategy',
    },
  });
  // Intro line row136 (idx135) merge A:F
  requests.push({
    mergeCells: { range: { sheetId, startRowIndex: 135, endRowIndex: 136, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' },
  });
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 135, endRowIndex: 136, startColumnIndex: 0, endColumnIndex: 6 },
      cell: { userEnteredFormat: { textFormat: { italic: true, fontSize: 9 }, wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
      fields: 'userEnteredFormat.textFormat,userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment',
    },
  });
  // Table headers grey bg bold: row122 (idx121), row137 (idx136)
  for (const idx of [121, 136]) {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: idx, endRowIndex: idx + 1, startColumnIndex: 0, endColumnIndex: 6 },
        cell: { userEnteredFormat: { backgroundColor: GREY, textFormat: { bold: true }, wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
        fields: 'userEnteredFormat.backgroundColor,userEnteredFormat.textFormat,userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment',
      },
    });
  }
  // Merge E:F for Ghi chú column on Graham table header+data rows (122-133): idx121-133
  for (let idx = 121; idx <= 132; idx++) {
    requests.push({
      mergeCells: { range: { sheetId, startRowIndex: idx, endRowIndex: idx + 1, startColumnIndex: 4, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' },
    });
  }
  // Merge C:D for Diễn giải column on Greenblatt table header+data rows (137-144): idx136-143 -> merge cols 3:6 (C,D empty already used, need D:F actually)
  // Greenblat cols: A=Chỉ tiêu,B=Giá trị,C=Xếp hạng,D=Diễn giải -> merge D:F
  for (let idx = 136; idx <= 143; idx++) {
    requests.push({
      mergeCells: { range: { sheetId, startRowIndex: idx, endRowIndex: idx + 1, startColumnIndex: 3, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' },
    });
  }
  // wrap+top align for all data rows 122-144 (idx121-143)
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 121, endRowIndex: 144, startColumnIndex: 0, endColumnIndex: 6 },
      cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
      fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment',
    },
  });
  // Kết luận I row133 (idx132) bold
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 132, endRowIndex: 133, startColumnIndex: 0, endColumnIndex: 6 },
      cell: { userEnteredFormat: { textFormat: { bold: true } } },
      fields: 'userEnteredFormat.textFormat.bold',
    },
  });
  // Xếp hạng cuối cùng row144 (idx143) bold
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 143, endRowIndex: 144, startColumnIndex: 0, endColumnIndex: 6 },
      cell: { userEnteredFormat: { textFormat: { bold: true } } },
      fields: 'userEnteredFormat.textFormat.bold',
    },
  });
  // Đánh giá 4 row146 (idx145) merge A:F, italic fontSize9, WRAP
  requests.push({
    mergeCells: { range: { sheetId, startRowIndex: 145, endRowIndex: 146, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' },
  });
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 145, endRowIndex: 146, startColumnIndex: 0, endColumnIndex: 6 },
      cell: { userEnteredFormat: { textFormat: { italic: true, fontSize: 9 }, wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
      fields: 'userEnteredFormat.textFormat,userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment',
    },
  });

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  console.log('Formatting applied.');
}
main().catch(e => { console.error(e); process.exit(1); });
