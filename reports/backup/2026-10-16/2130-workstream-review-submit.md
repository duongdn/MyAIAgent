## Workstream Review Submit — Upwork Tracker (Week Oct 12, 2026) — 21:30 (+07:00)

Request id `cmvalxi4i0z8qo11uv7hfujxl`, deadline shown 2026-12-25 (recurring placeholder).

| Project | Account/Dev | Memo check 12–15/10 | Answer | Note | Submitted |
|---|---|---|---|---|---|
| Baamboozle | Carrick (Rory 41069448 + Aysar 35642393, tracker LeNH, actual work KhanhHH) | Rory 1 memo, Aysar 8 memo (10-12..10-15, aggregated from this week's daily-report runs), 0 invalid | Đã check | Khớp WS KhanhHH 14.33h Baamboozle tuần này. 10-16 chưa check riêng (sẽ nằm trong daily-report sáng mai) | ✓ 21:26 |
| Tokenlite | DuongDN (WS project `cmqyvio4s000pqo0xdajw5n2k`) | Upwork login lỗi trên host hiện tại (Mac, không có cookie vault/Chrome profile đúng) | Đã check | Verify qua WS task log thay Upwork memo (theo yêu cầu user): 10-12 DuongDN 0:30 "Check FIN/NRIC validation rule" — mô tả cụ thể, hợp lệ | ✓ 21:26 |

Cross-check: `GET /requests` sau submit → cả 2 `status: Submitted`.

## Môi trường — ghi chú quan trọng

Tất cả `scripts/get-*-cookies.py` (carrick, duongdn, david, slack) hardcode path Linux `/home/nus/.config/google-chrome/Profile N/Cookies`. Session này chạy trên máy Mac của DuongDN (`nuss-MacBook-Pro.local`, home `/Users/duongdn`) — không khớp path đó, nên cookie extraction fail ngay cả khi Chrome Profile 1 có tồn tại trên máy (chứa account carrick@nustechnology.com thật). Không phải máy "local company PC" (Linux, `/home/nus`) mà các memory trước mô tả, và cũng không phải mpfc (headless cron server) — đây là máy thứ 3. Chưa sửa script (user chỉ yêu cầu verify qua WS log cho lần này, không yêu cầu fix path).

## Unresolved questions
1. Nếu máy Mac này sẽ dùng thường xuyên để chạy các skill này, cần thêm nhánh platform-detect (macOS `~/Library/Application Support/Google/Chrome/Profile N/Cookies`) vào `get-carrick-upwork-cookies.py` / `get-duongdn-upwork-cookies.py` / các script cookie khác — hỏi user có muốn fix không.
2. 10-16 (hôm nay) chưa có Upwork memo check riêng cho Baamboozle — sẽ xuất hiện trong daily-report 10-17 sáng mai, không block submission tuần này theo tiền lệ tuần trước.
