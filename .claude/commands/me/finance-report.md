---
description: Tin tức mới nhất cho watchlist cổ phiếu (FPT, VEA) theo phong cách news-digest + quét P/B < 1 kèm nhận định
---

# Finance Report

## Utils

| Util | When | Params |
|------|------|--------|
| `/util:report` | Every piece output | `reports/{YYYY-MM-DD}/{HHMM}-finance-{type}.md` |

## Config

`config/finance-watchlist.json` — tracked tickers (`watchlist[].ticker/name/spreadsheet_id/report_sheet`) + `top100_spreadsheet_id`/`top100_sheet`. **Thêm mã mới vào đây, không sửa file skill này.** Không phải secret — tracked trong git (xem exception trong `.gitignore`).

**Google Sheets auth:** service account `config/daily-agent-490610-7eb7985b33e3.json`, scope `https://www.googleapis.com/auth/spreadsheets`. Chỉ cần đọc (read-only) cho skill này.

---

## Quick Reference

| Command | What it does | Output file |
|---------|--------------|-------------|
| `/finance-report` | Full run — Focus + PB Low | 1 file gộp hoặc 2 file riêng |
| `/finance-report focus` | Tin tức mới nhất cho từng mã trong watchlist | `{HHMM}-finance-focus.md` |
| `/finance-report pb-low` | List toàn bộ mã P/B < 1 trong Top 100 + nhận định | `{HHMM}-finance-pblow.md` |

---

## Piece 1 — Focus (`/finance-report focus`)

Tin tức mới nhất cho từng mã trong watchlist, **CÙNG NGUYÊN TẮC ANTI-HALLUCINATION như `/me:news-digest`** — mọi bài viết PHẢI lấy thẳng từ JSON trả về của script, không được bịa tiêu đề/link/tóm tắt.

**Fetch:**
```bash
.claude/skills/.venv/bin/python3 scripts/fetch-finance-news.py --limit=20
```
Script tự đọc `config/finance-watchlist.json`, build Google News RSS query riêng cho từng mã (mã CK + tên đầy đủ công ty), tái dùng `fetch_rss`/`_gnews` từ `.claude/skills/news-digest/scripts/fetch-news.py` (nạp qua `importlib` vì tên file có dấu gạch ngang, không import thẳng được) — cùng cơ chế parse RSS/dedup đã kiểm chứng ở news-digest.

**Trước khi viết bất kỳ nội dung nào**: gọi script → nhận JSON → đọc `results[].sources[].articles` → CHỈ tổng hợp từ đó. Nguồn trả về 0 bài → ghi `_(Không có bài mới)_`, không bịa.

**Output** (`{HHMM}-finance-focus.md`), theo đúng format `/news-digest`:
```markdown
# 📰 Finance Focus — {YYYY-MM-DD} {HH:MM}

## {TICKER} — {name}
**{Tên nguồn (Google News – {TICKER} VN)}**
- [{Tiêu đề}]({link}) · {pubDate} — {tóm tắt 1 câu tiếng Việt}
...

**{Tên nguồn (Google News – tên đầy đủ)}**
- [{Tiêu đề}]({link}) · {pubDate} — {tóm tắt 1 câu tiếng Việt}
...

### Điểm nổi bật {TICKER}
- {1-3 gạch đầu dòng: tin gì đáng chú ý nhất, có ảnh hưởng gì đến luận điểm đầu tư đã có trong sheet '{report_sheet}' không}

---
(lặp lại cho từng mã trong watchlist)
```

- Dedup trong cùng 1 report nếu 1 bài xuất hiện ở cả 2 query (mã CK + tên đầy đủ) của cùng 1 ticker.
- Bài cũ hơn 7 ngày: đánh dấu `[cũ]`.
- Phần "Điểm nổi bật": chỉ nêu tin THẬT SỰ mới/đáng chú ý (đổi lãnh đạo, cảnh báo kiểm toán, biến động giá lớn, sự kiện pháp lý...) — không diễn giải lại toàn bộ luận điểm đã có sẵn trong sheet phân tích.

---

## Piece 2 — PB Low (`/finance-report pb-low`)

1. Đọc `top100_spreadsheet_id` / `top100_sheet` từ config (hiện là tab `'Top 100'`, cột: Mã | Ngành | Vốn hóa | ROE | ROA | P/E | P/B | ...).
2. Lọc TẤT CẢ dòng có P/B < 1. Sắp xếp tăng dần theo P/B. **Không đối chiếu/lọc theo watchlist** — liệt kê hết.
3. Với MỖI mã lọt danh sách, đưa ra **nhận định ngắn** dựa trên số liệu đã có trong cùng dòng (ROE, ROA, P/E, Vốn hóa, Ngành) — không tra cứu thêm bên ngoài trừ khi user yêu cầu:
   - P/B thấp + ROE/ROA cao → khả năng bị định giá thấp thật sự (tiềm năng)
   - P/B thấp + ROE/ROA thấp/âm → có thể "rẻ vì lý do chính đáng" (value trap), cần cảnh báo
   - Ngành đang khó khăn mang tính chu kỳ (BĐS, ngân hàng đang xử lý nợ xấu...) → note rủi ro ngành chung, không đi sâu nghiên cứu riêng từng mã trừ khi được yêu cầu
4. **Output** (`{HHMM}-finance-pblow.md`):
   ```markdown
   # P/B < 1 Screen — {YYYY-MM-DD} {HH:MM}
   Nguồn: sheet 'Top 100', spreadsheet {top100_spreadsheet_id}

   | Mã | Ngành | Vốn hóa | ROE | ROA | P/E | P/B | Nhận định nhanh |
   |----|-------|---------|-----|-----|-----|-----|------------------|
   | ... | ... | ... | ... | ... | ... | ... | {1 câu: tiềm năng / value trap / cần xem thêm} |

   {N} mã trong Top 100 có P/B < 1.

   ## Nhận định tổng quan
   - {2-4 gạch đầu dòng: pattern chung — ví dụ nhóm ngành nào chiếm nhiều nhất trong danh sách, mã nào đáng chú ý nhất và vì sao, mã nào rủi ro nhất và vì sao}
   ```
5. **Không bịa** nhận định vượt quá những gì số liệu trong sheet cho phép suy luận — nếu ROE/ROA/ngành không đủ để kết luận rõ ràng, ghi "cần nghiên cứu thêm" thay vì đoán.

---

## Full Run (`/finance-report`)

1. Chạy Piece 1 (Focus).
2. Chạy Piece 2 (PB Low).
3. Gộp thành 1 file `reports/{YYYY-MM-DD}/{HHMM}-finance-report.md` hoặc giữ 2 file riêng — miễn không bỏ sót piece nào.

---

## Key Rules

- **Piece 1 tuân thủ NGUYÊN VĂN quy tắc anti-hallucination của `/me:news-digest`**: không viết tin trước khi có JSON, không tự chế URL, đếm số bài viết ra khớp số bài JSON trả về.
- **Piece 2 chỉ quét trong phạm vi sheet `Top 100`** (~101 mã vốn hóa lớn theo dõi) — không phải toàn bộ thị trường. Nếu user hỏi "có phải tất cả mã P/B<1 trên sàn không" → trả lời KHÔNG, đây chỉ là danh sách đang theo dõi.
- **Thêm mã mới vào watchlist**: sửa `config/finance-watchlist.json`. Piece 1 (Focus/tin tức) hoạt động ngay không cần thêm gì. Nếu muốn Piece 1 so sánh với luận điểm đầu tư đã phân tích, mã đó cần có sẵn sheet `Báo cáo 2`-style (xây theo quy trình đã dùng cho FPT/VEA — research agents + Google Sheets API, không thuộc phạm vi skill này).
- **Không cần quyền ghi Google Sheets** cho skill này — chỉ đọc.
