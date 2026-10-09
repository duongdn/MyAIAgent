# Elena OP — Hướng dẫn test hằng ngày

> Chạy mỗi ngày trên test env, ghi kết quả vào Nhật ký test cuối file. Lỗi đã biết + lý do: [elena-op-deployed-code-review.md](elena-op-deployed-code-review.md)
> Test env: https://active-alerts.nusdev.net/optimizations · Admin: https://active-alerts.nusdev.net/admin-ui/ · Repo local: `/home/nus/projects/Elena/develop`

## 0. Chuẩn bị
- Tài khoản: 1 user **System**, 1 user **Admin** (không phải System), 1 user thường. Hỏi kietnht/duyvna nếu chưa có.
- 3 file license test (only OP / only Monitor / all): tuanntg gửi trong room ngày 07/10 (`Licenses.zip`).
- Mở DevTools, tab **Network**, lọc `vp_server` để xem API.
- Kiểm tra bản build: View source trang `/optimizations/`, tên file `main-XXXX.js`. Đổi tên tức là có deploy mới.

## Test A: License và quyền vào app (5 phút)
| Bước | Kỳ vọng |
|------|---------|
| Admin → System Configuration → License, upload **only Monitor** | Card hiện Monitoring, menu app **không có** Optimization |
| Mở thẳng `/optimizations/` (user Admin) | Chuyển sang trang Access Denied |
| Upload **only OP** | Menu có Optimization + Configuration + Digital Plant, không có Dashboard/Active Alerts. Không có cảnh báo tag |
| Mở portal gốc | Tự chuyển sang Optimization (default page) |
| Upload **all** | Tất cả menu có |
| License History | Có dòng cho mỗi lần upload, đúng module |
| User thường + license hết hạn | Popup "License needs renewal, contact administrator", đóng popup thì về login |
| **Test fail-open (A):** DevTools → Network → chặn request `license/status` (chuột phải → Block request URL), reload `/optimizations/` | Hiện tại **vẫn vào được**. Đây là lỗi A, ghi kết quả |

## Test B: Wizard tạo model, Step 1 (5 phút)
| Bước | Kỳ vọng |
|------|---------|
| Runs → New Model | Mở wizard Step 1 |
| Gõ 1 ký tự vào ô Target Tag | Báo "quá ngắn", không gọi API |
| Gõ ≥2 ký tự | Sau khoảng 300ms gọi `entityByNameAndDescription`, có danh sách tag |
| Chọn 1 tag | Gọi `POST /model/tags/details`, card hiện asset name + icon + measurement icon |
| `tags/details` trả 404/405/500 | Card báo lỗi + nút Retry (nếu vậy thì BE #321 chưa deploy) |
| Tag không gắn asset | Báo lỗi "target phải có asset", không cho Continue |
| Đặt tên `Line A - Max Throughput` | Báo trùng (mock) |
| Improvement / cost min > max | Báo lỗi validate |
| Save draft rồi F5 | **Mất** (mock, xem E) |

## Test C: Step 2 Influencers
| Bước | Kỳ vọng |
|------|---------|
| Thêm nhiều tag | Nhóm theo asset, 1 request `tags/details` cho cả lô |
| Target tag không xuất hiện trong danh sách influencer | Đúng |
| Xóa 1 asset group | Mất cả nhóm |
| Influencer thiếu asset | Không cho Continue |

## Test D: Hiệu năng search (2 phút, làm khi có data thật trên plant2)
- Gõ một chuỗi rất chung (`PV`, `.OP`). Trong Network ghi lại **thời gian** và **kích thước response** của `entityByNameAndDescription`.
- Response quá 1MB hoặc trên 2s, hoặc dropdown giật, thì báo lại vấn đề D.

## Test E: Trang Runs (mock)
- Search, filter, sort, phân trang chạy được. Chỉ là dữ liệu mẫu, F5 về trạng thái ban đầu.
- Chỉ test UI: tên dài bị cắt, ở 1920×1080 không vỡ layout (anhttl báo lỗi này ngày 07/10).

## Test API bằng curl (tùy chọn)
DevTools → request bất kỳ → Copy as cURL để lấy cookie:
```bash
B=https://active-alerts.nusdev.net/vp_server/dae/rest
C='Cookie: <dán từ browser>'
curl -s "$B/license/status" -H "$C" | jq '.data | {isValid, activeModules, modules}'
curl -s -X POST "$B/model/tags/details" -H "$C" -H 'Content-Type: application/json' \
  -d '{"tagIds":["<tagId>","<tagId>","khong-ton-tai"]}' | jq
# Kỳ vọng: 1 dòng, có assetName/units; id lạ bị bỏ
```

## Chạy local (khi cần test branch chưa deploy)
```bash
cd /home/nus/projects/Elena/develop && git fetch nus
git worktree add /tmp/elena-test nus/<branch>
cd /tmp/elena-test/precognize-workspace && npm ci
# Muốn gọi BE test env: sửa proxy.conf.json target -> https://active-alerts.nusdev.net/vp_server
npm run start-optimization   # http://localhost:4203
```

## Nhật ký test

| Ngày | Build (`main-*.js`) | Test | Kết quả / bug |
|------|---------------------|------|---------------|
| 2026-10-09 | main-SOJERMXW | Kiểm tra bundle | Có OP-11 tag details. Chưa có #325/#328. BE `tags/details` chưa xác nhận (cần login) |
