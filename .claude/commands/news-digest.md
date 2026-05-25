---
description: News digest — fetch and synthesize news by topic (stocks, vn-stocks, ai, it, finance, vinfast, security) with optional tag filter
---

# News Digest

Fetch and synthesize news digest by topic and optional tag filter.

## Usage

```
/news-digest [topic] [--tag=xxx] [--limit=N] [--more] [--raw]
```

**Topics:** `all` (default) | `stocks` | `vn-stocks` | `ai` | `it` | `finance` | `vinfast` | `security`
**Options:**
- `--tag=xxx` — lọc bài theo từ khóa (OR logic nếu nhiều tag: `--tag=security,ftp`)
- `--limit=N` — số bài fetch mỗi nguồn (default: 100)
- `--more` — hiển thị 5 bài/nguồn thay vì 3, tóm tắt 2-3 câu, kèm ngày đăng
- `--raw` — giữ ngôn ngữ gốc, không dịch

**Examples:**
```
/news-digest                         → all topics, dịch tiếng Việt
/news-digest vn-stocks               → chứng khoán VN
/news-digest ai --more               → AI news, nhiều bài + tóm tắt dài hơn
/news-digest it --tag=ai --more      → IT/AI, đầy đủ hơn
/news-digest stocks --limit=10       → fetch 10 bài/nguồn
/news-digest stocks --raw            → global stocks, ngôn ngữ gốc (EN)
/news-digest ai --more --limit=10    → fetch 10, hiển thị 5/nguồn, tóm tắt dài
```

## Run

Default limit = 100 (đủ để lấy toàn bộ bài từ RSS feed). Chỉ cần truyền `--limit` khi muốn giới hạn khác.

```bash
python3 .claude/skills/news-digest/scripts/fetch-news.py [topic] [--tag=xxx] [--limit=N]
```

`--raw` là cờ output — script không cần xử lý, Claude tự điều chỉnh khi tổng hợp.

## Output Format

**Mặc định: luôn trình bày bằng tiếng Việt** — dịch tiêu đề và tóm tắt sang tiếng Việt dù nguồn là tiếng Anh.
Khi có `--raw`: giữ ngôn ngữ gốc của bài, không dịch.

```
## 📰 Tin tức — {Tên Topic} [#tag] · {ngày}

### {Tên Topic}

**{Tên Nguồn}**
- [{Tiêu đề đã dịch}]({link}) — {tóm tắt 1 câu tiếng Việt}
- [{Tiêu đề đã dịch}]({link}) — {tóm tắt 1 câu tiếng Việt}
...

---
### Điểm nổi bật
- {2–4 gạch đầu dòng tổng hợp xu hướng/chủ đề chính}
```

**Rules — chế độ mặc định:**
- Hiển thị TẤT CẢ bài đã fetch (không giới hạn số bài/nguồn)
- Tóm tắt mỗi bài trong 1 câu tiếng Việt
- Không hiển thị ngày đăng

**Rules — khi có `--more`:**
- Hiển thị TẤT CẢ bài đã fetch (không giới hạn số bài/nguồn)
- Tóm tắt mỗi bài 2–3 câu tiếng Việt, chi tiết hơn
- Hiển thị ngày đăng sau tiêu đề: `· {pubDate}`
- Điểm nổi bật mở rộng: 4–6 gạch đầu dòng

**Rules — chung:**
- Bỏ qua nguồn không có bài — không đề cập
- Điểm nổi bật: tổng hợp pattern/xu hướng, không chỉ liệt kê headline
- Nếu tag trả về <3 bài tổng: ghi "Ít kết quả cho tag '{tag}' — thử tag rộng hơn"
- Bài cũ hơn 7 ngày: đánh dấu `[cũ]`
- Nguồn lỗi: bỏ qua không đề cập
- `--raw`: giữ tiêu đề + tóm tắt ngôn ngữ gốc, header đổi thành "📰 News Digest"
- Có thể kết hợp: `--more --raw`, `--more --limit=10`, v.v.
