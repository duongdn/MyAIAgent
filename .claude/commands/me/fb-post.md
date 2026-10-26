---
description: Daily Facebook post (trang cá nhân) — mỗi sáng soạn NHIỀU bài ứng viên đánh số cho user chọn; --pick N để đăng bài user chọn
---

# FB Daily Post

Trello task: đăng 1 bài FB mỗi ngày (Zalo sau). Profile `facebook.com/dnduong.us`.
**Default (cron 08:45) = chỉ soạn danh sách ứng viên đánh số, KHÔNG đăng gì.** User đọc, chọn số → `--pick N`.

## Usage

```
/me:fb-post                                    → soạn danh sách ứng viên hôm nay (không đăng)
/me:fb-post --pick N [--audience=public|friends|onlyme]  → đăng ứng viên số N hôm nay (default public)
/me:fb-post --pick YYYY-MM-DD#N ...            → đăng ứng viên của ngày khác
/me:fb-post --submit [post-url] [--audience=public|friends]  → công khai 1 bài đang "Chỉ mình tôi"
/me:fb-post --delete [post-url]                → xoá bài còn "Chỉ mình tôi"
/me:fb-post --report-date=YYYY-MM-DD --report-time=HHMM   → (cron) dùng giờ truyền vào
```

## Files

- Script: `scripts/facebook-profile-post.js` (puppeteer, profile `tmp/facebook-profile` + cookie tự nạp từ Chrome Profile 9, Xvfb :90 riêng)
- Ứng viên: `docs/fb-post/candidates/{date}.json` — `[{n, type, topic, text, feeling, image?, memoryIndex?, sources[]}]`
- Report cho user đọc: `reports/{date}/{HHMM}-fb-post-candidates.md`
- History bài đã đăng: `docs/fb-post/post-history.json` — `{date, n, type, topic, sources[], postUrl, status, audience}`
- Ý tưởng user thả vào: `docs/fb-post-ideas/*.md` (đã dùng → ghi vào `sources`)
- Memory: đọc `docs/memory/fb-post/` trước khi viết

## Mode: soạn ứng viên (default)

### 1. Skip check
Đã có `docs/fb-post/candidates/{date}.json` → báo đường dẫn report và dừng (trừ khi user gọi tay muốn soạn lại).

### 2. Đọc bối cảnh (chỉ đọc)
1. 🔴 **FB của user**: `node scripts/facebook-profile-post.js --list-own-posts --limit=20` → bài 2–3 tuần gần nhất (cả bài user tự đăng lẫn bài bot). Dùng để **luân chuyển chủ đề**: chủ đề/loại user vừa đăng trong ~3 ngày → hạ ưu tiên; không viết lại ý đã có; nối tiếp được thì càng tốt (vd. user vừa đăng chạy bộ → hôm nay bớt bài chạy bộ).
2. `docs/fb-post/post-history.json` + `docs/fb-post/candidates/*.json` 7 ngày gần nhất → không lặp lại text/link đã đề xuất.
3. `docs/fb-post-ideas/*.md` chưa dùng → luôn đưa vào danh sách.
4. 🔴 KHÔNG BAO GIỜ lấy số liệu tài sản/danh mục/nợ cá nhân (`*money-*`), tên khách hàng/dev, giờ công.

### 3. Soạn ứng viên — càng nhiều càng tốt
Mục tiêu **10–15 bài**, mỗi type có ít nhất 1–2 bài khi nguồn cho phép, đánh số 1..N. Thứ tự: bài hợp nhất với bối cảnh hôm nay lên đầu.

| type | Nội dung | Nguồn |
|---|---|---|
| `idea` | Từ ý tưởng user thả vào | `docs/fb-post-ideas/*.md` |
| `stock-humor` | Chuyện vui/tự trào người mới chơi chứng khoán | `reports/{3 ngày}/*news-digest.md` mục Chứng khoán VN làm cái cớ; ảnh `node scripts/render-vnindex-chart-image.js tmp/vnindex-{date}.png` |
| `nus-blog` | Share 1 bài blog NUS + 1–2 câu đời thường | `curl -sL https://www.nustechnology.com/blog` → `/blog/<slug>` chưa share; 🔴 PHẢI `curl` đọc nội dung bài (không viết theo tiêu đề) để tóm 1 câu đúng |
| `trend` | Trend/meme đang hot trên mạng VN + 1–2 câu cảm nhận vui | WebSearch tuần này; chỉ chuyện vô hại, KHÔNG chính trị/tôn giáo/drama/tin đồn; link gốc, KHÔNG tải ảnh người khác |
| `share-article` | Bài báo công nghệ/tài chính/chứng khoán + nhận xét giản dị | `reports/{3 ngày}/*news-digest.md`; link gốc, không link news.google |
| `running` | Buổi chạy/milestone, số THẬT | `python3 scripts/strava-running-stats.py` → chỉ dùng số trong JSON; kèm `latest.url`; có `milestones` → xếp lên đầu + 🔔 |
| `fb-memory` | Chia sẻ lại kỷ niệm "Ngày này năm xưa" + caption 1–2 dòng | `node scripts/facebook-profile-post.js --list-memories`; bỏ kỷ niệm buồn/tang/ốm/người cũ; lưu `memoryIndex`. 🔴 Trước khi viết caption PHẢI xem ảnh: `--draft <file> --share-memory <i> --dry-run` rồi Read `tmp/fb-post-dry-run.png` — text gốc hay là câu đùa, không viết theo nghĩa đen. Report ghi 1 dòng mô tả kỷ niệm gốc (ai đăng, ảnh gì) |

Lỗi nguồn (Strava/FB `not_logged_in`…) → bỏ type đó, ghi rõ ở cuối report ("đăng nhập lại … trong Chrome Profile 9").

### 4. Văn phong (mọi ứng viên)
🔴 Đọc `docs/memory/fb-post/feedback_fb_post_write_for_general_public_no_jargon.md`.
- Rất ngắn 2–4 dòng (~20–40 chữ), đơn giản, hài hước, tự trào; chơi chữ/ca dao/tục ngữ được
- 2–4 emoji; KHÔNG hashtag; plain text; link (nếu có) ở dòng cuối
- KHÔNG phân tích, KHÔNG list bài học, KHÔNG lời khuyên đầu tư, KHÔNG thuật ngữ, KHÔNG tự thêm ý ngoài chủ đề
- Giọng ngây ngô người mới; tăng dần độ chuyên nghiệp theo thời gian
- Ngày lễ (20/10, 8/3, Tết, Trung thu…) → có thể thêm 1 câu chúc đơn giản
- Mỗi bài 1 cảm xúc FB có trong danh sách FB VN (vd. "hết tiền", "hào hứng", "khỏe mạnh", "hạnh phúc", "tích cực", "hoang mang", "thư thái", "ngốc nghếch")

Mẫu user duyệt (2026-10-20):
```
Tưởng chỉ nông dân mới "được mùa mất giá" 🌾
Ai ngờ chứng sĩ cũng y chang 😅
Mã nào cũng giảm, rẻ như cho... mà mình hết tiền mua 🫠
```

🔴 **Lọc bảo mật:** không tên khách hàng/dự án khách, không tên dev/đồng nghiệp, không giờ công/billing, không token/server/URL nội bộ, không số tiền tài sản.

### 5. Ghi kết quả (KHÔNG đăng)
1. `docs/fb-post/candidates/{date}.json` (đủ field để `--pick` đăng không cần soạn lại)
2. `reports/{date}/{HHMM}-fb-post-candidates.md`: đầu file 1 dòng tóm bối cảnh (user vừa đăng gì, Strava, kỷ niệm), rồi mỗi ứng viên:
   ```
   ### 3. [running] 🔔 Cán mốc 200 km tháng 10 — cảm xúc: khỏe mạnh
   <nội dung bài y hệt sẽ đăng>
   ```
   Cuối file: `Chọn bài: /me:fb-post --pick <số>`
3. Commit candidates + report (`chore: fb post candidates {date}`).

## Mode: --pick N

1. Đọc `docs/fb-post/candidates/{date}.json` (date = hôm nay hoặc phần trước `#`), lấy ứng viên `n=N`. Không có → báo user.
2. Ghi `text` ra `tmp/fb-post-{date}-{N}.txt`; `stock-humor` có `image` → render lại ảnh nếu file không còn.
3. Đăng (luôn qua cổng "Chỉ mình tôi" của script):
   `node scripts/facebook-profile-post.js --draft tmp/fb-post-{date}-{N}.txt [--image …] [--feeling "…"] [--share-memory <memoryIndex>]`
4. `--audience` ≠ `onlyme` → `node scripts/facebook-profile-post.js --submit <postUrl> --audience=<public|friends>`.
5. `ok:true` → append history `{date, n, type, topic, sources, postUrl, status: published|draft, audience}`; đã công khai → `python3 scripts/trello-complete-daily-fb-post-card.py <postUrl>`.
6. `ok:false` + `not_logged_in` → báo user đăng nhập lại facebook.com trong Chrome Profile 9. Lỗi khác → báo + screenshot, KHÔNG retry mù.
7. Commit history.

## Mode: --submit / --delete

- `--submit`: url từ arg hoặc entry `status=draft` mới nhất → `--submit <url> --audience=…` → history `published` → Trello như bước 5 của `--pick`.
- `--delete`: `node scripts/facebook-profile-post.js --delete <url>` (script chỉ xoá bài còn "Chỉ mình tôi").

## Guardrails
- Cron KHÔNG BAO GIỜ tự đăng; chỉ `--pick` / `--submit` do user gọi mới đăng/công khai
- Script luôn đăng qua "Chỉ mình tôi" trước và bỏ tick "Đặt làm đối tượng mặc định"
- Trello card chỉ complete sau khi bài đã công khai thành công
