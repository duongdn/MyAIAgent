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
| `/finance-report sector` | Gom mã theo ngành, chọn mã tốt nhất mỗi ngành (điểm ROE/P/B) | `{HHMM}-finance-sector.md` |

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
6. **Thanh khoản (thêm 27/7/2026):** sheet `Top 100` hiện KHÔNG có cột thanh khoản, nên KHÔNG tự suy đoán/gán nhãn thanh khoản cho từng mã trong bảng trên. Nếu user muốn đào sâu 1 mã cụ thể lọt danh sách trước khi coi là "actionable", chạy `node scripts/finance-report-detail-fetch-liquidity.js <TICKER>` (xem `/me:finance-report-detail` Bước 2b) để lấy KLGD/GTGD thực tế 1 ngày/7 ngày/1 tháng/6 tháng — đặc biệt quan trọng với mã cổ đông Nhà nước/gia đình sở hữu chi phối (free-float thấp).

---

## Piece 3 — Sector Compare (`/finance-report sector`)

Gom toàn bộ mã trong sheet `Top 100` theo cột **Ngành**, so sánh trong từng nhóm, chọn ra mã "tốt nhất" mỗi nhóm.

1. Đọc `top100_spreadsheet_id` / `top100_sheet` từ config, lấy toàn bộ hàng (bỏ hàng header và các hàng ghi chú rác không có P/B/ROE hợp lệ ở cuối sheet — lọc bằng `!isNaN(P/B) && !isNaN(ROE) && có Mã`).
2. Chuẩn hóa tên ngành (merge biến thể viết hoa/thường khác nhau của cùng 1 ngành, ví dụ "Bán lẻ"/"Bán Lẻ").
3. Group theo ngành. Nhóm chỉ có 1 mã → không so sánh, note "chỉ 1 mã, không có gì để so sánh trong ngành".
4. Với nhóm ≥2 mã: tính **điểm = ROE / P/B** cho từng mã (hiệu quả sinh lời trên mỗi đồng giá trả — điểm càng cao càng vừa hiệu quả vừa chưa bị định giá đắt). Mã điểm cao nhất là ứng viên "tốt nhất".
5. **Trước khi chốt "tốt nhất"**: kiểm tra ROE của ứng viên có bị méo không (đòn bẩy cực cao, vốn chủ sở hữu gần 0/âm, yếu tố một lần — dấu hiệu: ROE vượt trội bất thường so với ROA và so với phần còn lại của nhóm). Nếu có, loại mã đó khỏi vị trí "tốt nhất", note rõ lý do, chọn á quân thay thế.
6. **Không bịa** lý do chọn — chỉ dùng số liệu ROE/ROA/P/E/P/B đã có trong sheet để so sánh. Đây là 1 tiêu chí đơn giản (ROE/P/B), không phải phân tích sâu — nói rõ trong report đây không thay thế nghiên cứu kỹ hơn.
7. **Output** (`{HHMM}-finance-sector.md`):
   ```markdown
   # Sector Compare — {YYYY-MM-DD} {HH:MM}
   Nguồn: sheet 'Top 100'. Điểm xếp hạng = ROE / P/B (đơn giản, không thay thế phân tích sâu).

   | Ngành (số mã) | Xếp theo ROE giảm dần | Mã tốt nhất (ROE/P/B) | Vì sao |
   |---|---|---|---|
   | ... | Mã1 X · Mã2 Y ... | **Mã** | {lý do, có loại trừ nếu ROE méo} |

   ## Nhận định tổng quan
   - {mã có điểm ROE/P/B cao nhất toàn báo cáo, case bị loại vì méo số liệu, pattern chung}
   ```

---

## Full Run (`/finance-report`)

1. Chạy Piece 1 (Focus).
2. Chạy Piece 2 (PB Low).
3. Chạy Piece 3 (Sector Compare).
4. Gộp thành 1 file `reports/{YYYY-MM-DD}/{HHMM}-finance-report.md` hoặc giữ 3 file riêng — miễn không bỏ sót piece nào.

---

## Key Rules

- **Piece 1 tuân thủ NGUYÊN VĂN quy tắc anti-hallucination của `/me:news-digest`**: không viết tin trước khi có JSON, không tự chế URL, đếm số bài viết ra khớp số bài JSON trả về.
- **Piece 2 chỉ quét trong phạm vi sheet `Top 100`** (~101 mã vốn hóa lớn theo dõi) — không phải toàn bộ thị trường. Nếu user hỏi "có phải tất cả mã P/B<1 trên sàn không" → trả lời KHÔNG, đây chỉ là danh sách đang theo dõi.
- **Piece 3 cũng chỉ trong phạm vi `Top 100`**, và điểm ROE/P/B là tiêu chí đơn giản — 1 mã không lọt "tốt nhất nhóm" (VD SAB thua QNS trong Hàng tiêu dùng) không có nghĩa là mã xấu, chỉ là định giá (P/B) hiện đắt hơn so với hiệu quả sinh lời (ROE) tương đương của mã được chọn.
- **Thêm mã mới vào watchlist**: sửa `config/finance-watchlist.json`. Piece 1 (Focus/tin tức) hoạt động ngay không cần thêm gì. Nếu muốn Piece 1 so sánh với luận điểm đầu tư đã phân tích, mã đó cần có sẵn sheet `Báo cáo 2`-style (xây theo quy trình đã dùng cho FPT/VEA — research agents + Google Sheets API, không thuộc phạm vi skill này).
- **Không cần quyền ghi Google Sheets** cho skill này — chỉ đọc.
