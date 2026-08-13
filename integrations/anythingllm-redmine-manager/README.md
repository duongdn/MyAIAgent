# Redmine Manager — AnythingLLM Custom Agent Skill

Custom agent skill cho AnythingLLM, cho phép AI đọc/ghi issue trên Redmine (tạo bug, đổi status, thêm comment, tra cứu, xoá).

## Dành cho user (QC) — cách dùng

Không cần biết gì về format/plugin.json/handler.js ở dưới. Chỉ cần 3 điều:

1. **Skill đã bật sẵn** trong workspace (do admin cấu hình 1 lần).
2. **Luôn gõ `@agent` ở đầu tin nhắn** — thiếu nó AI chỉ trả lời chay, không đụng Redmine thật.
3. **Quên cú pháp?** Gõ `@agent [REDMINE:HELP]` bất cứ lúc nào → skill trả lại toàn bộ hướng dẫn ngay trong chat (gõ sai action cũng tự trả về help).
4. **Lần đầu dùng / chưa biết mã số:** Redmine dùng số ID cho tracker/status/priority (mỗi dự án khác nhau). Gõ trước:
   ```
   @agent [REDMINE:META] meta_type=trackers
   ```
   (đổi `meta_type=` thành `statuses`, `priorities` để tra tiếp) để biết đúng số cần điền.

**Bảng lệnh theo việc thường làm** (điền giá trị vào chỗ trống sau `=` rồi gửi):

| Muốn làm gì | Gõ | Ghi chú |
|---|---|---|
| Xem lại cú pháp | `@agent [REDMINE:HELP]` | không cần tham số |
| Báo bug mới | `@agent [REDMINE:CREATE] project_id= subject="" description="" tracker_id=` | `project_id`, `subject` bắt buộc |
| Xem bug đang ở trạng thái nào | `@agent [REDMINE:READ] issue_id=` | `issue_id` = số trên URL issue |
| Đổi trạng thái / ghi chú | `@agent [REDMINE:UPDATE] issue_id= status_id= notes=""` | hiện popup **xin xác nhận** → bấm Approve mới thực thi |
| Xem list bug đang mở | `@agent [REDMINE:LIST] project_id= status_id=` | bỏ trống field = lấy tất cả |
| Tra ID hợp lệ | `@agent [REDMINE:META] meta_type=` | dùng trước khi create/update lần đầu |
| Xoá bug tạo nhầm | `@agent [REDMINE:DELETE] issue_id=` | popup xác nhận — **không hoàn tác được**, cẩn thận |

**Lỗi hay gặp:**
- Gõ câu tự nhiên không có `@agent` ở đầu → AI chỉ trả lời chay, không đụng Redmine thật.
- Điền sai `issue_id`/`project_id`, hoặc gõ sai tên action → skill tự trả về thông báo lỗi + help lại trong chat.
- Báo "chưa cấu hình" → báo admin kiểm tra `REDMINE_URL`/`REDMINE_API_KEY` trong Agent Skills.

---

## Dành cho người triển khai / dev

### Format

Đây là format **custom agent skill chính thức** của AnythingLLM (`schema: "skill-1.0.0"`), không phải tự chế:
- Docs: https://docs.anythingllm.com/agent/custom/introduction
- plugin.json spec: https://docs.anythingllm.com/agent/custom/plugin-json
- handler.js spec: https://docs.anythingllm.com/agent/custom/handler-js

Mỗi skill = 1 folder gồm:
| File | Vai trò |
|---|---|
| `plugin.json` | Khai báo tên, mô tả, tham số cấu hình (`setup_args`), tham số gọi hàm (`entrypoint.params`), ví dụ prompt |
| `handler.js` | Logic thực thi — export `module.exports.runtime.handler(params)`, phải return string |

### Cài đặt vào AnythingLLM

1. Copy (hoặc symlink lúc dev) folder này vào `storage/plugins/agent-skills/redmine-manager/` trên máy chạy AnythingLLM.
   - Tên folder đích **phải khớp** `hubId` trong `plugin.json` (`redmine-manager`).
   - Máy này (AnythingLLM Desktop, Linux): deploy dir là
     `~/.config/anythingllm-desktop/storage/plugins/agent-skills/redmine-manager/`, cấu trúc:
     - `handler.js` → **symlink** về file trong repo này (sửa logic là có hiệu lực ngay, chỉ cần restart app).
     - `plugin.json` → **file thật, độc lập, KHÔNG symlink**. AnythingLLM tự ghi `REDMINE_URL`/`REDMINE_API_KEY` (giá trị thật) thẳng vào `setup_args.*.value` của file này khi user cấu hình qua UI. Nếu symlink file này về repo, secret sẽ lọt vào git (repo này có auto-commit theo lịch). Khi đổi schema `entrypoint.params`/`examples`, sửa ở repo rồi copy đè sang deploy dir thủ công.
2. Restart AnythingLLM.
3. Workspace → **Agent Skills** → bật **Redmine Manager**.
4. Điền cấu hình:
   - `REDMINE_URL`: vd `https://redmine.nustechnology.com`
   - `REDMINE_API_KEY`: lấy ở Redmine → My account → API access key (không paste key vào chat AI, điền trực tiếp vào ô này)
5. Trong chat, gõ `@agent` rồi ra lệnh bằng tiếng Việt/Anh tự nhiên.

### Tham số (`action`)

| action | Bắt buộc | Mô tả |
|---|---|---|
| `create` | `project_id`, `subject` | Tạo issue mới |
| `read` | `issue_id` | Lấy chi tiết + note gần nhất |
| `update` | `issue_id` | Đổi `status_id`/`priority_id`/`assigned_to_id`, thêm `notes` — cần user approve trong UI |
| `delete` | `issue_id` | Xoá issue — cần user approve, không hoàn tác được |
| `list` | — | Lọc theo `project_id`/`status_id`/`assigned_to_id`, giới hạn `limit` |
| `meta` | `meta_type` | Tra ID hợp lệ: `projects`\|`trackers`\|`statuses`\|`priorities` |
| `help` | — | Trả về cú pháp lệnh (cũng tự trả về khi `action` sai/thiếu) |

Chạy `action=meta` trước khi `create`/`update` để biết đúng `tracker_id`/`priority_id`/`status_id` của instance Redmine bạn (mỗi Redmine có thể khác nhau).

### Cú pháp lệnh cố định

AnythingLLM gọi skill qua LLM function-calling (không có parser cứng), nhưng dùng đúng template dưới đây (sau `@agent`) giúp AI map param chính xác gần như 100%, thay vì câu tự nhiên tự do:

```
@agent [REDMINE:CREATE] project_id=<slug> subject="<tiêu đề>" description="<mô tả>" tracker_id=<id> priority_id=<id>
@agent [REDMINE:READ] issue_id=<số>
@agent [REDMINE:UPDATE] issue_id=<số> status_id=<id> notes="<ghi chú>"
@agent [REDMINE:LIST] project_id=<slug> status_id=<id> limit=<số>
@agent [REDMINE:META] meta_type=projects|trackers|statuses|priorities
@agent [REDMINE:DELETE] issue_id=<số>
@agent [REDMINE:HELP]
```

Bỏ field nào không cần (VD `list` không cần `project_id`). Field format khớp thẳng tên trong `entrypoint.params` của `plugin.json`. Không dùng AnythingLLM Slash Commands (snippet riêng từng máy/DB, không portable) — help nằm ngay trong skill (`action=help`) để dùng được ở bất kỳ nơi nào cài skill này.

### Bảo mật

- Không commit `REDMINE_API_KEY` vào file nào trong repo này — nhập trực tiếp qua AnythingLLM UI (`setup_args`), lưu trong storage của AnythingLLM.
- `update`/`delete` bắt buộc qua `requestToolApproval` (người dùng phải xác nhận trong UI) vì có thể thay đổi/xoá dữ liệu thật trên Redmine.

### Chưa xử lý / cần xác nhận thêm

- Không có giá trị mặc định cho `tracker_id`/`priority_id` vì khác nhau theo instance — cần chạy `meta` 1 lần để biết ID thật.
- Nếu muốn `update`/`delete` chạy tự động không cần approve (full-auto QC bot), cần sửa `handler.js` bỏ đoạn `requestToolApproval`.
