# SamGuard WordPress — Performance Issues Report

**Server:** samguard.co (67.207.77.101, DigitalOcean droplet, hostname `landing-page`)
**Điều tra:** 2026-07-22, xuất phát từ báo cáo Matrix (anhttl) "Error establishing a database connection" đêm 21→22/7

---

## 1. Sự cố: MySQL bị OOM-kill lặp lại đêm 21/7

- **18:40–18:59 UTC 21/7 (01:40–01:59 +07 22/7):** kernel OOM-killer kill `mysqld` **8 lần trong 20 phút**, systemd auto-restart mỗi lần
- **Tổng lịch sử: 797 lần OOM-kill trên mysql.service** — không phải sự cố 1 đêm, đã tái diễn mãn tính từ lâu
- `mysql.service` không có memory cgroup limit riêng (`MemoryMax=infinity`) → đây là OOM toàn hệ thống (hết RAM chung), kernel chỉ tình cờ luôn chọn mysqld làm nạn nhân

## 2. Nguyên nhân gốc: Apache scale kịch trần worker

Đọc lại **toàn bộ** process table trong dmesg tại thời điểm OOM (không chỉ vài dòng cuối):

| Chỉ số | Giá trị |
|---|---|
| Số Apache worker tại thời điểm OOM | **151** (đúng bằng `MaxRequestWorkers=150` trong `mpm_prefork.conf`) |
| Tổng RSS của riêng các Apache worker | **~3.3GB** |
| Tổng RAM server | **1.9GB** |

→ Apache một mình đã cần gấp ~1.7 lần tổng RAM máy. Server **không hề thiếu RAM cho 1 site WP bình thường** — vấn đề là Apache bị đẩy lên kịch trần worker.

## 3. Vì sao Apache bị đẩy lên kịch trần

Check `access.log.1` (log ngày 21/7) trong khung giờ crash (18:33–18:59 UTC):

- **950 request trong ngày từ 1 IP `159.89.114.69`**, riêng trong 25 phút trước crash là 714/764 request (93%) — pattern `GET /.git/objects/xx/...` lặp lại hàng trăm lần → bot quét lỗ hổng `.git` lộ (đã tìm thấy và **đã vá** — xem mục 5, không thuộc phạm vi report này)
- Site **không cache gì** — mỗi request (kể cả 404 từ bot) đều full-bootstrap WordPress + query DB (WPML/Elementor lookup option không cache, thấy rõ trong `debug.log`)
- Rate của bot chỉ ~8 req/s lúc đỉnh — không phải flood khối lượng lớn, nhưng vì mỗi request tốn tài nguyên nặng (full PHP+DB bootstrap, không cache), cộng traffic thường ngày → đủ đẩy Apache lên gần 150 worker
- **Không phải DDoS thể tích lớn** — là 1 bot recon/scan, kết hợp với site thiếu cache khiến tài nguyên bị khuếch đại

## 4. Vấn đề phụ: `wp-content/debug.log` phình to 3GB

- File `debug.log` **3,046,788,527 bytes (~3GB)**, chưa từng được rotate
- Ghi liên tục mỗi request → thêm áp lực I/O trên máy vốn đã RAM-starved
- Nội dung chủ yếu là lỗi PHP Fatal lặp lại liên tục: `Call to undefined method WP_Error::get_method()` tại `wp-includes/rest-api/class-wp-rest-server.php:1153` — cùng chữ ký lỗi đang thấy trên New Relic của MPFC, khả năng là bug chung của 1 plugin/PHP version, đáng để dọn dù không liên quan trực tiếp tới vụ OOM
- Disk hiện tại 45% (22G/48G) — chưa nguy cấp nhưng sẽ tiếp tục phình nếu không rotate

## 5. Đã fix trong lúc điều tra (không tính vào report này)

Đã chặn `.git` public exposure trên cả 2 vhost (port 80 + 443), verify 403 Forbidden, site vẫn chạy bình thường. Chi tiết đã trao đổi trực tiếp, không nhắc lại ở đây theo yêu cầu.

## 6. Đề xuất fix (chưa làm gì thêm, chờ duyệt)

| # | Đề xuất | Mức độ | Ghi chú |
|---|---|---|---|
| 1 | Đưa site qua Cloudflare (proxy DNS cam, bật WAF/bot-fight-mode) | Ưu tiên cao | Site hiện DNS trỏ thẳng origin, không CDN/WAF nào che — Cloudflare chặn bot quét (`.git`, wp-json spam...) trước khi chạm tới origin, ẩn IP thật, có rate-limit/DDoS protection miễn phí sẵn |
| 2 | Giảm `MaxRequestWorkers` (150 → ~15-20) trong `mpm_prefork.conf` | Ưu tiên cao | Chặn Apache tự đẩy vượt RAM cho phép; request thừa sẽ queue thay vì spawn worker vô tội vạ |
| 3 | Bật object cache (Redis/Memcached) cho WordPress | Ưu tiên cao | Loại bỏ hàng loạt query WPML/Elementor lặp lại mỗi request — giảm tải cả CPU lẫn DB connection |
| 4 | Rotate/truncate `debug.log`, tắt `WP_DEBUG_LOG` hoặc giới hạn log level | Ưu tiên trung bình | Giảm I/O, giải phóng ~3GB disk |
| 5 | Nâng RAM droplet (1.9GB → 4GB) | Tùy chọn, dài hạn | Giải pháp bền nhất nếu traffic tiếp tục tăng, nhưng không bắt buộc nếu áp dụng #2+#3 |
| 6 | Fix bug `WP_Error::get_method()` trên REST API | Ưu tiên thấp | Không gây crash trực tiếp nhưng đang log lỗi liên tục, có thể là entry point bị bot scan |

---

## Câu hỏi chưa giải quyết

1. Áp dụng đề xuất nào trong 5 mục trên? Có cần làm ngay không hay để lên plan riêng?
2. Có muốn setup cảnh báo (Matrix alert) khi OOM-kill xảy ra lần nữa, để phát hiện sớm hơn lần này (biết được là do anhttl báo tình cờ, không phải do hệ thống monitor)?
