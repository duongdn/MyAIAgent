# Redmine Manager — AnythingLLM Custom Agent Skill

Custom agent skill cho AnythingLLM, cho phép AI đọc/ghi issue trên Redmine (tạo bug, đổi status, thêm comment, tra cứu, xoá).

## Format

Đây là format **custom agent skill chính thức** của AnythingLLM (`schema: "skill-1.0.0"`), không phải tự chế:
- Docs: https://docs.anythingllm.com/agent/custom/introduction
- plugin.json spec: https://docs.anythingllm.com/agent/custom/plugin-json
- handler.js spec: https://docs.anythingllm.com/agent/custom/handler-js

Mỗi skill = 1 folder gồm:
| File | Vai trò |
|---|---|
| `plugin.json` | Khai báo tên, mô tả, tham số cấu hình (`setup_args`), tham số gọi hàm (`entrypoint.params`), ví dụ prompt |
| `handler.js` | Logic thực thi — export `module.exports.runtime.handler(params)`, phải return string |

## Cài đặt vào AnythingLLM

1. Copy nguyên folder này vào `storage/plugins/agent-skills/redmine-manager/` trên máy chạy AnythingLLM.
   - Tên folder đích **phải khớp** `hubId` trong `plugin.json` (`redmine-manager`).
2. Restart AnythingLLM.
3. Workspace → **Agent Skills** → bật **Redmine Manager**.
4. Điền cấu hình:
   - `REDMINE_URL`: vd `https://redmine.nustechnology.com`
   - `REDMINE_API_KEY`: lấy ở Redmine → My account → API access key (không paste key vào chat AI, điền trực tiếp vào ô này)
5. Trong chat, gõ `@agent` rồi ra lệnh bằng tiếng Việt/Anh tự nhiên.

## Tham số (`action`)

| action | Bắt buộc | Mô tả |
|---|---|---|
| `create` | `project_id`, `subject` | Tạo issue mới |
| `read` | `issue_id` | Lấy chi tiết + note gần nhất |
| `update` | `issue_id` | Đổi `status_id`/`priority_id`/`assigned_to_id`, thêm `notes` — cần user approve trong UI |
| `delete` | `issue_id` | Xoá issue — cần user approve, không hoàn tác được |
| `list` | — | Lọc theo `project_id`/`status_id`/`assigned_to_id`, giới hạn `limit` |
| `meta` | `meta_type` | Tra ID hợp lệ: `projects`\|`trackers`\|`statuses`\|`priorities` |

Chạy `action=meta` trước khi `create`/`update` để biết đúng `tracker_id`/`priority_id`/`status_id` của instance Redmine bạn (mỗi Redmine có thể khác nhau).

## Ví dụ prompt

- "Tạo bug mới trong project qc-app: login lỗi trên Safari"
- "Xem chi tiết issue #123"
- "Đổi issue #123 sang Resolved, ghi chú đã fix"
- "List issue đang mở trong project qc-app"
- "Danh sách status hợp lệ trong Redmine"

## Bảo mật

- Không commit `REDMINE_API_KEY` vào file nào trong repo này — nhập trực tiếp qua AnythingLLM UI (`setup_args`), lưu trong storage của AnythingLLM.
- `update`/`delete` bắt buộc qua `requestToolApproval` (người dùng phải xác nhận trong UI) vì có thể thay đổi/xoá dữ liệu thật trên Redmine.

## Chưa xử lý / cần xác nhận thêm

- Không có giá trị mặc định cho `tracker_id`/`priority_id` vì khác nhau theo instance — cần chạy `meta` 1 lần để biết ID thật.
- Nếu muốn `update`/`delete` chạy tự động không cần approve (full-auto QC bot), cần sửa `handler.js` bỏ đoạn `requestToolApproval`.
