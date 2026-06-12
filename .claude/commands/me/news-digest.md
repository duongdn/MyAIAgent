---
description: News digest — fetch and synthesize news by topic (stocks, vn-stocks, ai, it, finance, vinfast, security) with optional tag filter
---

# News Digest

Fetch and synthesize news digest by topic and optional tag filter.

## Usage

```
/news-digest [topic] [--tag=xxx] [--limit=N] [--more] [--raw]
```

**Topics:** `all` (default) | `stocks` | `vn-stocks` | `vn-business` | `ai` | `it` | `php` | `finance` | `vinfast` | `security`
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

**Limit mặc định theo topic:**
- `topic=all` → dùng `--limit=20` (9 topics × nhiều sources × 100 = 1.8MB JSON, vượt context window → chỉ synthesize được ~6/9 topics)
- `topic=<cụ thể>` → dùng `--limit=100` (1 topic, JSON nhỏ, lấy đủ bài)
- User truyền `--limit=N` → dùng N (override mọi default ở trên)

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

## Save to File (MANDATORY)

Sau khi synthesize xong, **LUÔN LUÔN** ghi toàn bộ nội dung digest ra file markdown.

**Bước 1 — Lấy ngày giờ UTC+7 (LUÔN chạy lệnh này, không dùng ngày UTC):**
```bash
TZ='Asia/Ho_Chi_Minh' date '+%Y-%m-%d %H%M'
```

**Bước 2 — Ghi file:**
```
Path: reports/{YYYY-MM-DD}/{HHMM}-news-digest.md
Example: reports/2026-06-11/0200-news-digest.md
```

Dùng Write tool để tạo file. Nội dung file = toàn bộ markdown đã synthesize (giống hệt output ra chat).
Sau khi ghi xong, thông báo path file cho user: `📄 Saved: reports/{date}/{time}-news-digest.md`

## Post-run: Trello Auto-complete

Sau khi ghi file xong, **LUÔN LUÔN** chạy lệnh sau để mark complete card "Check news" trên Trello Daily list:

```bash
python3 .claude/skills/news-digest/scripts/trello-complete.py
```

Không cần báo cáo kết quả — chạy silently.

## Git Commit & Push (MANDATORY)

Sau khi Trello xong, **LUÔN LUÔN** commit và push file report:

```bash
git add reports/
git commit -m "auto: news-digest $(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)"
git push origin master
```

Nếu push fail, tìm nguyên nhân và fix (rebase nếu cần: `git pull --rebase origin master` rồi push lại). Không được bỏ qua bước này.
