---
description: Xây dựng sheet Phân tích Định lượng (tỷ số tài chính) cho 1 mã CK bất kỳ — 1 script, 2 caller (CLI + web UI)
---

# Finance Quantification — Phân tích Định lượng

Input: 1 mã cổ phiếu (ticker). Output: 1 tab `Định lượng - <TICKER>` trong shared spreadsheet (`config/finance-quantification.json`), bao gồm raw BCTC + block tỷ số tài chính (công thức tham chiếu trực tiếp, cùng sheet). Tự động fetch giá thị trường + số CP lưu hành từ vietstock.vn — **không nhập tay số nào**.

**Nguyên tắc tối thượng: KHÔNG BỊA SỐ LIỆU.** Thiếu dữ liệu → script tự abort với `ERROR:` rõ ràng, không tự suy đoán/nội suy.

## Cách dùng

```bash
# CLI — chạy trực tiếp
node scripts/finance-quantification-build.js <TICKER>

# Hoặc gọi từ Claude Code
/me:finance-quantification <TICKER>
```

## Stdout contract

Script in ra các dòng theo prefix cố định, dùng cho cả người đọc lẫn web UI parse:

| Prefix | Ý nghĩa | Hành động |
|--------|--------|----------|
| `PROGRESS: n/6 ...` | Tiến độ từng bước | Web UI cập nhật progress bar |
| `WARN: ...` | Cảnh báo không fatal | Tiếp tục (VD: thiếu TTM EPS) |
| `DONE: <url>` | Thành công, kèm link sheet | Web UI hiển thị link + trạng thái xong |
| `ERROR: <CODE> ...` | Lỗi fatal, exit≠0 | Web UI hiển thị lỗi đỏ |

### Mã lỗi

| CODE | Nguyên nhân | Cách xử lý |
|------|-----------|----------|
| `INVALID_TICKER` | Ticker không hợp lệ (regex `^[A-Z0-9]{3,10}$`) | Nhập lại đúng mã |
| `UNSUPPORTED_CHART_OF_ACCOUNTS` | Mã thuộc ngành đặc thù (bank, CK...) — template khác VAS chuẩn | Cần mapping riêng, chưa hỗ trợ |
| `BALANCE_MISMATCH` | Tổng tài sản ≠ Tổng nguồn vốn (dữ liệu cafef lỗi) | Báo admin kiểm tra lại |
| `NO_DATA` | Không có dữ liệu BCTC trên cafef.vn, hoặc vietstock không có giá | Kiểm tra lại mã |
| `API_FAILURE` | cafef/vietstock API không phản hồi | Thử lại sau |

## Shared spreadsheet

Tất cả mã dùng chung 1 file: `config/finance-quantification.json` → `shared_spreadsheet_id`.
Mỗi lần chạy thêm/ghi đè tab `Định lượng - <TICKER>` — không đụng vào các tab khác, không đổi tên file.

## Cấu trúc output mỗi tab

```
Rows 1..N     BCTC thô: Tài sản (CDKT TN) → Nguồn vốn (CDKT NV) → KQKD → LCTT
              Mỗi section có 1 header row + các dòng template (code+name) + giá trị theo năm
Row N+1..N+2  Blank separator
Rows N+3..    Ratio block: I.Quy mô / II.Sinh lợi / III.Tăng trưởng / IV.Đòn bẩy /
              V.Thanh khoản / VI.Định giá (EPS/BVPS/P/E/P/B/giá hiện tại/số CP)
              Tất cả số liệu trong block là CÔNG THỨC tham chiếu cùng sheet (không hardcode)
```

## Nguồn dữ liệu

| Loại | Nguồn | Cơ chế |
|------|-------|-------|
| BCTC (CDKT, KQKD, LCTT) | `apiweb.cafef.vn` JSON API (GET, `TypeTime=NAM`, lọc `type=HK`) | Automated fetch, verify 270==440 |
| EPS theo quý (TTM) | `apiweb.cafef.vn` JSON API (GET, `TypeTime=QUY`) | 4 quý liên tiếp gần nhất |
| Giá + vốn hóa + sàn | `finance.vietstock.vn/data/getpricehistory` (POST form) | ExchangeID=1, tự tính số CP = MarketCap/Price |
| Google Sheets | Service account `config/daily-agent-490610-7eb7985b33e3.json` | Ghi tab vào shared spreadsheet |
