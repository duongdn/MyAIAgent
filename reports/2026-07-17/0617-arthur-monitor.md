# Arthur / Meta-Stamp V3 — Cập nhật 17/07 (từ 2026-07-15 08:35 đến 2026-07-17 06:35)

## Tóm tắt nhanh
Chưa có tin cập nhật kết quả demo investor (mục #2 vẫn treo). Nam xác nhận Arthur sẽ làm "P2", giao Phúc làm tiếp, dặn không confirm việc gì với Chris (chỉ confirm với Arthur). Có nhầm lẫn URL production (Chris gửi domain sai) — đã tự làm rõ nội bộ, còn 4 câu hỏi cần hỏi lại Arthur/Chris. Nam nhắc Phúc trả lời khách nhanh hơn, đừng chờ.

⚠️ **Giới hạn lần chạy này:** chỉ đọc được 2 phòng Matrix. Slack "Solid Code" (4 kênh) bị `invalid_auth` — kịch bản re-extract cookie David (Profile 15) không chạy được trong session này (đường dẫn Chrome profile của môi trường đã đổi, không tìm thấy Profile 15 hay cookie Slack nào lưu sẵn). GitHub (`Christebob/Meta_Stamp_V3`) và Workstream (Crystal lang) đều không truy cập được — GitHub API đang bị lỗi diện rộng (confirmed qua githubstatus.com "Partially Degraded Service", auth call trả 503 dù token còn hạn), Workstream cần đăng nhập SSO trực tiếp (thử 3 lần, browser treo không tự hoàn tất được, cần người ngồi máy). Cả 2 sẽ cần chạy lại lần tới.

## Chi tiết mới (Matrix only)

### Matrix — Arthur business room (!BEXEdVUmvWclPLELFf)
- 09:23 15/07: Phúc hỏi hôm nay chưa có task bên Arthur, quay lại Ons-WyAsk được không — Nam xác nhận được.
- 09:40-10:47: Tiến hỏi rate David/Nick khi làm thay Arthur (20h hay 40h/tuần, rate khác nhau). Nam xác nhận: Arthur đã confirm làm P2, giao Phúc làm luôn; note bên finance là tuần này giờ của Phúc chỉ tính 4h cho Chris, còn lại tính khác — **dặn rõ: không confirm việc gì trực tiếp với Chris, chỉ confirm qua Arthur.**
- 10:55-11:20: Phúc phát hiện Chris gửi nhầm domain (production-dash-13f4 → 404); tự suy ra domain đúng là frontend-production-13f4.up.railway.app. Cần hỏi lại Arthur xác nhận domain đúng.
- 12:00-12:07: Tiến soạn sẵn nội dung cần hỏi Chris/Casey qua Arthur:
  1. Domain production đúng là frontend-production-13f4 — xin xác nhận (Yes/No).
  2. Đã upload 13/14 tracks Chris gửi (qua acc metastamp_creator+2@yopmail.com) — cần Arthur xác nhận có đủ không.
  3. Hỏi Chris dùng API key nào khi bị lỗi 403 lúc pull Pocket — để so sánh với key hiện tại.
  4. Hỏi Casey muốn tạo account loại creator hay customer, rồi tạo sẵn gửi luôn cho gọn.
- 13:42-13:48: Nam thúc Phúc trả lời khách nhanh hơn — "đừng chờ Chris confirm, cái nào rõ thì trả lời luôn, cái nào blocked thì nói rõ ra là blocked."

### Matrix — technical setup room (!QEbdvaMJkTurMpRPIX)
- 09:50-10:03 15/07: DuongDN nhờ Phúc review (nội dung không nêu cụ thể); Phúc xong, gửi ảnh. Phúc note: "chuyển cái client report qua cho a Lễ (LeNH) và Long (LongVV)" — vẻ như tracking client-report của dự án này đang được san sẻ/chuyển giao thêm người, và có vẻ hiện tại hệ thống chỉ đang track theo Phúc. Không rõ ý nghĩa đầy đủ, nêu ra để xác nhận thêm.

## BẢNG THEO DÕI (cập nhật từ lần trước)

| # | Mục | Trạng thái | Ghi chú |
|---|-----|-----------|---------|
| 1 | P0-1: Provenance/Ownership modal live demo | ✅ Client-confirmed | Không đổi |
| 2 | P0-2: Chris investor demo (14/07) | 🟢 Đã chạy, chờ kết quả | Vẫn chưa có tin funding — treo 3 ngày |
| 3 | Stripe payout bug (pending funds) | 🔴 Unresolved (chưa xác nhận thêm) | Không thấy nhắc lại trong window này — cần hỏi lại tình trạng |
| 4 | Nick sick 15/07 | ✅ Đã nghỉ, không có gì bất thường thêm | — |
| 5 | PhucVT snapshot script | ✅ Done | Không đổi |
| 6 | Rate David/Nick khi làm thay Arthur (P2) | 🟢 Đã confirm nội bộ | Arthur đồng ý, Phúc làm, finance note riêng biệt cho Chris vs Arthur |
| 7 | Production domain nhầm lẫn (Chris gửi sai) | 🟡 Đã tự suy luận, cần Arthur xác nhận | frontend-production-13f4.up.railway.app |
| 8 | 4 câu hỏi chờ gửi Arthur/Chris (domain, 13/14 tracks, API key 403, Casey acc type) | 🟡 Đã soạn, cần gửi | Xem chi tiết mục Matrix business room |
| 9 | Client report tracking — chuyển giao thêm cho LeNH/LongVV | ⚪ Chưa rõ, cần xác nhận | Ghi nhận từ phòng technical setup, ý nghĩa chưa rõ |

## Câu hỏi cần anh xác nhận/quyết định
- Kết quả demo investor 14/07 — có funding không? (đã treo 3 ngày chưa có tin)
- Stripe payout bug còn tồn tại không, hay đã tự resolve khi funds clear sau Jul 20?
- Việc "chuyển client report cho Lễ và Long" — có phải đổi người phụ trách theo dõi Arthur không?
- Cho phép chạy lại Workstream (Crystal lang) và Slack Solid Code khi có người ngồi máy để đăng nhập lại — 2 nguồn này đã unavailable liên tiếp lần này.
