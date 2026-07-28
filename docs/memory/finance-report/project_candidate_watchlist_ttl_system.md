---
name: project_candidate_watchlist_ttl_system
description: "/me:finance-report Piece 4 \"Candidate\" — watchlist tạm TTL 7 ngày, config + CLI + bẫy trùng ký hiệu/địa danh"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8631d72a-a5c0-4819-9cdb-476386673f15
  modified: 2026-07-28T02:31:26.181Z
---

Added 2026-07-28. `/me:finance-report` có Piece 4 **Candidate** — watchlist tạm để soi 1 ngành ngắn hạn rồi bỏ ra, tách hẳn khỏi `watchlist[]` vĩnh viễn.

**Config:** `config/finance-watchlist.json` → `candidates.ttl_days` (7) + `candidates.items[]` (`ticker/name/group/exchange/added/status/note`, optional `search_name`).

**CLI:** `node scripts/finance-candidates.js <list|add|renew|drop|note>` — `renew` = set `added` về hôm nay (+7 ngày).

**Fetch:** `scripts/fetch-finance-news.py --group=candidates|watchlist|all` (mặc định `watchlist`). JSON trả kèm `expires/days_left/expired`.

**Why:** user muốn bỏ mã vào/ra theo đợt, mỗi mã sống 7 ngày rồi tự nhắc quyết định giữ hay bỏ — không muốn watchlist phình ra vĩnh viễn.

**How to apply:**
- Hết TTL **KHÔNG tự xoá** — report gắn cờ ⏰ HẾT HẠN, user quyết định. `status: dropped` = loại khỏi fetch nhưng giữ lịch sử.
- Report phải có **Bảng quyết định** cuối piece (News flow | Tín hiệu trong kỳ | Đề xuất khi hết hạn).
- **Verify mã trước khi thêm:** `node scripts/finance-report-detail-fetch-cafef.js <TICKER> --years=1` — mã giả sẽ fail parse JSON.
- 🔴 **2 bẫy đã cắn:**
  1. **Trùng ký hiệu mã nước ngoài** — APH↔Amphenol, ADP↔Automatic Data Processing. Phải đánh dấu ⚠️ từng bài nhiễu.
  2. **Tên trùng địa danh** → query 100% nhiễu (SDN "Sơn Đồng Nai", NHH "Nhựa Hà Nội"). Fix bằng `search_name`; nếu vẫn nhiễu thì ghi thẳng "không monitor được bằng tin tức", KHÔNG bịa nhận định.
- Mã 0 bài thật → ghi "không có news flow" + đề xuất bỏ, không viết nhận định rỗng.

Liên quan: [[feedback_article_count_5_per_source]], [[feedback_news_digest_full_hallucination_incident]], [[project_finance_report_detail_skill]].
