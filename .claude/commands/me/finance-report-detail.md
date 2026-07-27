---
description: Xây báo cáo phân tích cổ phiếu đầy đủ (6 sheet) cho 1 mã, theo đúng format/style đã làm cho FPT và VEA
---

# Finance Report Detail

Input: 1 mã cổ phiếu (ticker). Output: bộ 6 sheet phân tích đầy đủ trong Google Sheets, format giống FPT (sheet gốc chuẩn) / VEA (mã đã làm trước đó).

**Đây KHÔNG phải script tự động chạy 1 lệnh xong** — là quy trình nhiều bước, có nghiên cứu số liệu thật + xây dựng Google Sheets qua API. Thời gian và số vòng lặp phụ thuộc độ sẵn có của dữ liệu nguồn.

## Config

`config/finance-watchlist.json` — nếu mã đã có trong `watchlist[]`, dùng `spreadsheet_id`/`report_sheet` có sẵn. Nếu là mã MỚI, hỏi user muốn tạo spreadsheet mới hay dùng ID có sẵn (KHÔNG tự ý tạo/ghi đè spreadsheet khi chưa xác nhận).

**Sheet mẫu (style chuẩn để copy theo):** FPT — `1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw`, sheet `Báo cáo 2` (sheetId 886541258). Đây là format gốc, mọi mã mới phải match visual style của sheet này (border, merge, màu, font).

**Google Sheets auth:** service account `config/daily-agent-490610-7eb7985b33e3.json`, scope `spreadsheets` (cần quyền ghi, không phải readonly như finance-report thường).

---

## Cấu trúc 6 sheet bắt buộc (đặt tên `<X> - <TICKER>`, trừ sheet raw)

1. **`<TICKER>`** — BCTC gốc: Bảng cân đối kế toán + Kết quả kinh doanh + Lưu chuyển tiền tệ, càng nhiều năm càng tốt (tối thiểu 5 năm, lý tưởng 10-11 năm như VEA) + quý gần nhất nếu có.
2. **`Định tính - <TICKER>`** — phân tích định tính: mô hình kinh doanh, vị thế ngành, ban lãnh đạo, rủi ro.
3. **`Định lượng - <TICKER>`** — copy sheet 1 + block phân tích tỷ số (ROE/ROA/biên LN/vòng quay...) phía dưới.
4. **`Định giá - <TICKER>`** — định giá (P/E, P/B, DCF nếu đủ dữ liệu, so sánh ngành), công thức tham chiếu thẳng `'<TICKER>'!` cells, không hardcode số.
5. **`Benjamin Graham - <TICKER>`** — checklist 10 tiêu chí Benjamin Graham, ghi rõ ĐẠT/KHÔNG ĐẠT từng tiêu chí kèm số liệu chứng minh.
6. **`Báo cáo 2 - <TICKER>`** — báo cáo tổng hợp cuối, format giống FPT `Báo cáo 2`: bảng CAGR nhiều năm, có phần định tính tóm tắt, kết luận đầu tư.

## Quy trình

### Bước 1 — Xác nhận phạm vi
- Mã đã có trong watchlist? Dùng luôn ID/sheet có sẵn nếu đã tồn tại (không tạo trùng).
- Mã mới: hỏi user — tạo spreadsheet mới, hay thêm sheet vào 1 spreadsheet có sẵn?
- Sau khi có, thêm/verify entry trong `config/finance-watchlist.json`.

### Bước 2 — Thu thập dữ liệu gốc (nguồn thật, KHÔNG BỊA)
- Tìm báo cáo tài chính/báo cáo thường niên chính thức: web search tên công ty + "báo cáo thường niên" / "báo cáo tài chính" + năm, ưu tiên nguồn công ty/UBCKNN/HOSE-HNX-UPCOM, hoặc cafef/vietstock cho số liệu tổng hợp.
- PDF dạng scan (ảnh, không extract text được) → `pdftoppm` render từng trang thành PNG → đọc bằng vision (Read tool trên ảnh) → chép chính xác số liệu, không làm tròn/suy đoán.
- Số liệu không tìm được / mâu thuẫn giữa nguồn → dừng lại, hỏi user cung cấp, **không tự điền số ước lượng**.
- Nếu user tự cung cấp số liệu (paste, upload) → verify tính hợp lý cơ bản trước khi dùng (VD: tổng tài sản = tổng nguồn vốn, các mục con cộng đúng subtotal) — báo cho user nếu phát hiện bất thường thay vì âm thầm sửa hoặc âm thầm dùng.

### Bước 3 — Build sheet raw `<TICKER>`
- Copy cấu trúc hàng từ sheet FPT gốc (hoặc VEA nếu công ty phi tài chính giống VEA hơn) làm khung, điền đúng label items khớp với BCTC thật của mã (không phải công ty nào cũng có cùng structure — điều chỉnh theo thực tế, không ép khung).
- Set `numberFormat: {type: 'TEXT'}` trước khi ghi nếu có chuỗi dạng %/số để tránh Sheets tự parse sai.

### Bước 4 — Build 5 sheet còn lại
- `Định lượng`: `copyTo` hoặc copy giá trị sheet raw + append block tỷ số phía dưới.
- `Định giá`: dùng `copyTo` từ 1 sheet định giá mẫu đã có (VD Định giá - VEA) rồi sửa formula tham chiếu sang `'<TICKER>'!`, không hardcode.
- `Benjamin Graham`: 10 tiêu chí chuẩn, mỗi tiêu chí trích đúng số liệu từ sheet raw.
- `Báo cáo 2`: copy format từ FPT `Báo cáo 2` bằng `spreadsheets.sheets.copyTo` (giữ style), sau đó **`unmergeCells` toàn bộ range trước khi ghi đè nội dung** (tránh lỗi merge cell nuốt data đã gặp ở VEA), rồi `updateCells fields:'*'` để reset format trước khi ghi số liệu mới.

### Bước 5 — Format & hyperlink
- Border/merge/màu match FPT gốc.
- Link nguồn (báo cáo PDF, trang IR...) dùng kỹ thuật `textFormatRuns` (không phải plain text URL) để click được.
- Row height: `neededHeight = totalLines*21+8`, `CHARS_PER_LINE=230` (cột rộng ~1564px kiểu Báo cáo 2) hoặc `130` (cột ~729px kiểu Định tính) — tính theo độ rộng cột thực tế của sheet đó.
- Tránh chuỗi bắt đầu bằng `+` (VD "+3.80%/năm") — bị Sheets parse thành formula lỗi `#NAME?`.

### Bước 6 — QA trước khi báo hoàn thành
- Grep toàn sheet check không còn `#REF!`/`#NAME?`/`#N/A` ngoài ý muốn.
- Đếm số merge cell đúng như thiết kế (không thừa merge cũ từ lần build trước).
- Đối chiếu 2-3 số liệu quan trọng (VD tổng tài sản năm gần nhất) giữa sheet raw và Báo cáo 2 — phải khớp tuyệt đối.
- Báo cáo cho user: đã build xong mấy/6 sheet, sheet nào còn thiếu dữ liệu, câu hỏi còn tồn đọng (nếu có nguồn mâu thuẫn/thiếu).

---

## Key Rules
- **KHÔNG BỊA SỐ LIỆU** — nguyên tắc tối thượng xuyên suốt cả quy trình, thừa hưởng từ kỷ luật đã áp dụng khi làm FPT/VEA. Thiếu dữ liệu → hỏi user, không tự ước lượng/nội suy rồi trình bày như số thật.
- **Không tạo file/sheet trùng** — luôn check `finance-watchlist.json` và spreadsheet đích trước khi tạo mới.
- Sau khi xong, cập nhật `config/finance-watchlist.json` thêm/update entry của mã (report_sheet trỏ đúng `Báo cáo 2 - <TICKER>`).
- Đây là tác vụ ghi dữ liệu vào Google Sheets thật (không phải bản nháp) — nếu sheet đích đã có dữ liệu cũ, hỏi xác nhận trước khi ghi đè, trừ khi user đã chỉ định rõ đây là rebuild.
