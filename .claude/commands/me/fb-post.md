---
description: Daily Facebook post (trang cá nhân) — soạn 1 bài tiếng Việt từ info đã collect, đăng dạng nháp "Chỉ mình tôi"; --submit để công khai
---

# FB Daily Post

Trello task: đăng 1 bài FB mỗi ngày (Zalo sau). **Default = draft**: bài được đăng với audience **"Chỉ mình tôi"** trên profile `facebook.com/dnduong.us`. User review trên FB rồi quyết định submit.

## Usage

```
/me:fb-post                                  → soạn + đăng nháp (Only me) cho hôm nay
/me:fb-post --dry-run                        → soạn + điền composer, KHÔNG bấm Đăng
/me:fb-post --submit [post-url] [--audience=public|friends]  → công khai bài nháp (default: nháp mới nhất, public)
/me:fb-post --delete [post-url]                 → xoá nháp bị loại (script chỉ xoá nếu vẫn "Chỉ mình tôi")
/me:fb-post --report-date=YYYY-MM-DD --report-time=HHMM     → (cron) dùng giờ được truyền vào
```

## Files

- Script: `scripts/facebook-profile-post.js` (puppeteer, profile `tmp/facebook-profile`, Xvfb :90 riêng — không đụng desktop thật)
- History: `docs/fb-post/post-history.json` — array `{date, topic, sources[], postUrl, status: draft|published, audience}`
- Ý tưởng user thả vào: `docs/fb-post-ideas/*.md` (đã dùng → ghi tên file vào `sources` của history, không dùng lại)
- Memory: đọc `docs/memory/fb-post/` trước khi viết (feedback văn phong user đã góp ý)
- Output: `reports/{date}/{HHMM}-fb-post.md` (nội dung bài + nguồn + postUrl)

## Mode: --submit

1. Lấy `post-url` từ arg, nếu không có → entry `status=draft` mới nhất trong history.
2. `node scripts/facebook-profile-post.js --submit <url> --audience=<public|friends>`
3. `ok:true` → update history `status=published`, `audience`; rồi `python3 scripts/trello-complete-daily-fb-post-card.py <url>` (complete card Trello "Đăng 1 bài trên zalo/facebook" hôm nay — card do Card Repeater tạo, chỉ complete SAU khi submit thành công, không complete lúc mới draft). Lỗi → báo user kèm screenshot path. KHÔNG tự retry.
4. Commit history.

## Mode: draft (default)

### 1. Skip check
Nếu history đã có entry `date` = hôm nay → báo "đã có nháp hôm nay: <url>" và dừng (trừ khi user gọi tay và muốn thêm bài).

### 2. Gom nguyên liệu (chỉ đọc, 3 ngày gần nhất)
- `reports/{date}/*news-digest.md` — tin AI/IT/chứng khoán VN/kinh doanh
- `reports/{date}/*finance-report*.md`, `*money-*` **CHỈ lấy nhận định thị trường chung**; KHÔNG BAO GIỜ đưa số liệu tài sản/danh mục/nợ cá nhân của user
- `docs/fb-post-ideas/*.md` chưa dùng → **ưu tiên cao nhất** (user tự thả vào)
- Trải nghiệm làm việc: report trong ngày (vd. `*ai-*`, `*learning-plan*`), memory `docs/memory/` → rút bài học về AI agent, tự động hoá, quản lý team dev, làm outsource
- Tự tìm thêm (WebSearch) nếu nguyên liệu mỏng: chủ đề hợp profile user (PM/tech lead công ty outsource VN, dùng AI agent tự động hoá công việc, đầu tư chứng khoán VN dài hạn)

### 3. Chọn chủ đề — xoay vòng 5 loại (user chốt 2026-10-20)
Ghi `type` vào history; không lặp cùng `type` 2 ngày liền, không trùng chủ đề 7 ngày. Ý tưởng trong `docs/fb-post-ideas/` luôn ưu tiên.

| type | Nội dung | Nguồn |
|---|---|---|
| `stock-humor` | Chuyện vui/tự trào người mới chơi chứng khoán (mẫu bên dưới) | news-digest vn-stocks làm cái cớ; ảnh VN-Index |
| `nus-blog` | Share 1 bài blog NUS: 1–2 câu tiếng Việt đời thường "team mình vừa viết về…" + link bài (FB tự tạo preview) | `curl -sL https://www.nustechnology.com/blog` → lấy `/blog/<slug>`, chọn bài chưa share trong history; đọc bài để tóm 1 câu dễ hiểu |
| `trend` | 1 trend/meme đang hot trên mạng VN, kèm 1–2 câu cảm nhận/review vui | WebSearch trend tuần này (TikTok/FB/báo VN); chỉ chuyện vô hại, KHÔNG chính trị/tôn giáo/drama cá nhân/tin đồn; share link gốc, KHÔNG tải ảnh người khác về đăng lại |
| `share-article` | Share 1 bài báo công nghệ/tài chính/chứng khoán + 1–2 câu nhận xét giản dị | news-digest 3 ngày gần nhất, link gốc (không link news.google) |
| `running` | **Nhắc user**, không tự bịa thành tích | xem dưới |
| `fb-memory` | Chia sẻ lại 1 kỷ niệm "Ngày này năm xưa" của FB + caption 1–2 dòng (vd. "3 năm trước…", cảm nhận vui/hoài niệm) | `node scripts/facebook-profile-post.js --list-memories` → JSON `{index, ago, text}`; chọn kỷ niệm vui/ý nghĩa (bỏ qua kỷ niệm buồn/tang/ốm đau/người cũ); đăng: `--draft <caption> --share-memory <index>`. Không có kỷ niệm hôm nay → chọn type khác |

`running`: số liệu THẬT từ Strava — `python3 scripts/strava-running-stats.py` (đọc JSON web Strava bằng cookie Chrome Profile 9; không cần API trả phí).
- Mỗi lần chạy lệnh đều gọi script này trước. `milestones` khác rỗng VÀ `latest.date` = hôm nay/hôm qua → **ưu tiên type `running` hôm đó** (bỏ qua luật xoay vòng), đánh dấu 🔔 trong report.
- Không có milestone → `running` tối đa 1 lần/tuần (ưu tiên Chủ nhật), viết về tổng km tuần/tháng.
- Chỉ dùng số trong JSON (km, pace, phút, tổng tuần/tháng/năm); KHÔNG tự chế số. Giọng ngây ngô vui như các bài khác, không khoe kiểu vận động viên.
- Kèm link `latest.url` (FB tự tạo preview bản đồ Strava). Cảm xúc FB gợi ý: "đầy năng lượng", "khỏe mạnh", "hào hứng".
- `ok:false` + `not_logged_in` → bỏ type running hôm đó, ghi report: "Strava hết phiên — đăng nhập lại strava.com trong Chrome Profile 9".

Chung: 1 bài = 1 ý chính. Link (blog/bài báo/trend) để ở dòng cuối.

### 4. Viết bài
🔴 Đọc `docs/memory/fb-post/feedback_fb_post_write_for_general_public_no_jargon.md` — văn phong user đã chốt.
- Rất ngắn, đơn giản, hài hước (mọi type); `stock-humor` tự trào góc **người mới chơi chứng khoán**; chơi chữ/ca dao/tục ngữ được
- 3–6 emoji hài; kết bằng câu rủ tương tác ("ai cùng cảnh điểm danh")
- KHÔNG phân tích, KHÔNG list bài học, KHÔNG lời khuyên đầu tư, KHÔNG thuật ngữ, KHÔNG tóm tắt tin (tin chỉ là cái cớ)
- Plain text, KHÔNG hashtag
- Tối đa 2–4 dòng ngắn (~20–40 chữ)
- Giai đoạn đầu: giọng ngây ngô, người mới; tăng dần độ chuyên nghiệp theo thời gian (xem số bài trong history)

Mẫu user duyệt (2026-10-20):
```
Hồi xưa cứ tưởng chỉ bà con nông dân mới thấm câu "được mùa mất giá, được giá mất mùa" 🌾
Ai ngờ làm chứng sĩ rồi mới biết mình cũng y chang 😅
...Giờ thị trường đỏ lòm, mã nào cũng giảm sâu, rẻ như cho... thì trong tài khoản còn đúng mấy chục nghìn 🫠
Được giá mà mất tiền. Ai cùng cảnh điểm danh cái nào 🙋‍♂️
```

🔴 **Lọc bảo mật (bắt buộc trước khi đăng):** không tên khách hàng/dự án khách (Maddy, Bailey, Rebecca, Elena, MPFC, Arthur...), không tên dev/đồng nghiệp, không giờ công/billing, không token/server/URL nội bộ, không số tiền tài sản cá nhân. Viết chung chung: "một dự án bên mình", "một bạn dev trong team".

### 5. Đăng nháp
1. Ghi bài ra `tmp/fb-post-{date}.txt`
2. Ảnh: chỉ `stock-humor` → `node scripts/render-vnindex-chart-image.js tmp/vnindex-{date}.png` (VN-Index 90 ngày)
   Cảm xúc FB: chọn 1 cảm xúc khớp bài, phải có trong danh sách FB VN (vd. "hết tiền", "buồn bã", "hoang mang", "bế tắc", "giàu có", "lo âu", "nôn nóng", "thư thái", "ngốc nghếch")
   Ngày lễ/đặc biệt (20/10, 8/3, Tết, Trung thu...) → thêm 1 câu chúc vui ở cuối bài
   `node scripts/facebook-profile-post.js --draft tmp/fb-post-{date}.txt --image tmp/vnindex-{date}.png --feeling "<cảm xúc>"` (thêm `--dry-run` nếu mode dry-run)
3. Kết quả JSON:
   - `ok:true` → append history `{status:"draft", audience:"Chỉ mình tôi", postUrl}`
   - `ok:false` + `not_logged_in` → báo user cần login lại: `node scripts/facebook-profile-post.js` dùng chung profile với `node scripts/facebook-page-scraper.js --login`
   - `ok:false` khác → báo lỗi + screenshot, KHÔNG retry mù, KHÔNG thử đăng Public
4. Ghi report `reports/{date}/{HHMM}-fb-post.md`: bài viết, chủ đề, nguồn, postUrl, lệnh submit
5. Commit `docs/fb-post/post-history.json` + report (`chore: fb post draft {date}`)

## Guardrails
- KHÔNG BAO GIỜ đăng audience khác "Chỉ mình tôi" trong mode draft; script tự chặn nếu audience sai
- Chỉ `--submit` (user gọi) mới đổi audience
- Script luôn bỏ tick "Đặt làm đối tượng mặc định" — không đổi default của profile
