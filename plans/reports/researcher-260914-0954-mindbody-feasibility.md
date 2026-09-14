# Mindbody API Feasibility — Wildsoul Wellness Brief

**Date:** 2026-09-14
**Nguồn brief:** Email "Wildsoul Mindbody x NUS Technology.pdf" forward từ Chien Tran (CEO), khách Wildsoul Wellness (multi-location wellness studio, Úc), dùng Mindbody.
**Yêu cầu của khách:** đánh giá tính khả thi kỹ thuật cho 6 hạng mục, đề xuất kiến trúc + lộ trình theo giai đoạn (ưu tiên value cao nhất trước).

---

## Bảng tóm tắt tiếng Việt

| # | Hạng mục | Khách muốn gì | Mindbody API hỗ trợ tới đâu | Độ khó | Gợi ý |
|---|----------|----------------|------------------------------|--------|-------|
| A | Chẩn đoán lỗi booking | Biết chính xác lý do 1 member không book được (do gói nào, quyền gì) | Có data thô (gói, lớp, chi nhánh) nhưng KHÔNG có endpoint trả lý do trực tiếp — phải tự viết logic đối chiếu | Trung bình | Custom logic layer trên API |
| B | Sửa hàng loạt hợp đồng/membership | Sửa nhiều member cùng lúc (nhiều chi nhánh), có validate + audit trail | KHÔNG có endpoint bulk-update xác nhận trong doc — chỉ sửa từng người, giới hạn 1000 call/ngày | Cao, rủi ro | Cần hỏi thẳng Mindbody support/sandbox trước khi báo giá |
| C | Kiosk on-site cho "Wildsoul Collective" | Member đến nơi mới chọn buổi tập trên tablet, trừ gói tự động, sync về Mindbody | **Hỗ trợ đầy đủ** — GetClasses (chỗ trống), GetClientServices (check gói), AddClientToClass (đặt chỗ+trừ gói), webhook (sync realtime). Mindbody còn có sẵn app Check-In | **Thấp — Quick win** | 🟢 Đề xuất làm Phase 1, ~2-3 tuần |
| D | Đồng bộ quyền truy cập đa chi nhánh | Phát hiện member bị cấu hình quyền sai (lẽ ra chỉ 1 chi nhánh nhưng lại full network) | Có data (cross-site relations) nhưng không có endpoint audit tự động — phải tự quét & so sánh | Trung bình | Custom logic, chạy định kỳ |
| E | Báo cáo network-level | Báo cáo tổng toàn hệ thống (vd: member bị suspend nhưng vẫn bị charge) | **Hỗ trợ tốt** — export data qua API + webhook log mọi thay đổi, đẩy vào BI (Tableau/Power BI) | Thấp-Trung bình | 🟢 Đề xuất Phase 2 |
| F | Kiểm tra đồng bộ backend↔app | Biết khi nào config ở backend chưa đồng bộ xuống app/booking cho khách | Mindbody KHÔNG có endpoint "trạng thái đồng bộ" — đây là bài toán tự giám sát (polling 2 phía so sánh), không phải giới hạn API | Cao | Cần xây hệ thống canary/test riêng, không thuộc phạm vi API |

**Điều kiện tiên quyết quan trọng:** phải xác nhận gói Mindbody của Wildsoul có bật API access + đủ quyền (Enrollment/ClassService/SaleService) — không phải tier nào cũng có. Nên hỏi Chien/khách xác nhận cái này TRƯỚC khi báo giá bất kỳ hạng mục nào.

**Đề xuất lộ trình:** Phase 1 = C (kiosk, nhanh, rủi ro thấp) → Phase 2 = E (báo cáo) → Phase 3+ = A, D (cần build thêm logic) → B, F (cần xác nhận thêm với Mindbody trước khi cam kết, rủi ro cao nhất).

---

## Full English Detail

### A. Booking Eligibility & Diagnostics
**Verdict: Partially supported — custom logic required.**
Mindbody exposes the raw components (`GetClientServices` for a member's active pricing options/entitlements, `GetClasses` for class capacity/restrictions) but no single endpoint explains *why* a specific booking is blocked. Building this means: fetch member's active contracts → query class restrictions → write custom conflict-resolution logic to produce a human-readable denial reason. No dedicated diagnostics endpoint exists; webhooks don't help here since they fire on state changes, not hypothetical queries.

### B. Membership/Contract Bulk Management
**Verdict: Not directly supported — needs a workaround.**
The API reads contracts/memberships and updates individual client services, but there is **no confirmed bulk-update endpoint** in the public v6 spec. Scaling to "update 500 members across 8 locations" means looping individual update calls, against a **1,000 calls/day** rate limit, with no atomic/rollback guarantee. `UpdateMembership`'s existence itself needs confirming via API sandbox or a direct question to Mindbody support before this can be scoped or quoted.

### C. On-Site Kiosk Booking (Wildsoul Collective)
**Verdict: Directly supported — best Phase 1 candidate.**
`GetClasses` gives live capacity, `GetClientServices` confirms entitlement, `AddClientToClass` creates the booking (and deducts the pass/entitlement automatically for pass-based pricing), and webhooks push booking/capacity changes in near real time. Mindbody's native Check-In app already covers part of this kiosk flow — worth checking if it covers Wildsoul's exact UX before building custom. Estimated 2-3 week build. Unconfirmed: whether entitlement can be validated *before* confirming a booking (pre-flight check) vs. only at confirmation time.

### D. Multi-Location Access & Permissions Consistency
**Verdict: Partially supported — validation requires custom queries.**
`GetClientRelations`/cross-site data tells you which locations a member can access; you'd cross-reference this against site-level membership rules yourself — no built-in "audit inconsistency" endpoint. At scale (10,000+ members), the 1,000 calls/day limit means batching over multiple days for a full network audit.

### E. Reporting & Data Visibility
**Verdict: Directly supported — pair with a BI pipeline.**
All the underlying data (clients, sales, contracts, class rosters) is queryable via API GET endpoints, and webhooks capture every mutation — enough to build a custom transaction log/audit trail feeding Tableau/Power BI/a custom pipeline. No native custom-report-builder via API, so this still needs an external BI layer, but the data access itself isn't a blocker. Good Phase 2 candidate.

### F. Backend-to-App Sync Visibility
**Verdict: Not an API-solvable problem — needs a separate monitoring harness.**
Mindbody has no "config deployment status" endpoint. Verifying that a backend change (pricing, new class, studio launch) actually propagated to the branded app means querying both systems independently and diffing — a canary/test-harness problem, not something the API exposes directly. Webhooks confirm a backend mutation happened, not that it propagated downstream.

### Key Dependency
Mindbody gates API access behind partner approval + subscription tier — confirm Wildsoul actually has an API key issued with Enrollment/ClassService/SaleService scopes, plus sandbox access for testing, before committing to any of the above.

### Unresolved Questions
1. Does Mindbody Public API v6 have a genuine bulk-update endpoint, or only single-client updates? (needs sandbox test / direct Mindbody support question)
2. Can `AddClientToClass` validate/deduct entitlement *before* confirming a booking, or only after? (affects kiosk pre-flight UX)
3. Does Mindbody's native Check-In app already cover the Collective kiosk UX, or is a fully custom build needed?
4. Are higher rate-limit tiers available above 1,000 calls/day for bulk/audit operations?
5. What is the typical sync delay between a backend config change and branded-app propagation?

### Sources
- Mindbody API Release Notes — developers.mindbodyonline.com/Resources/ApiReleaseNotes
- Mindbody Webhooks API Documentation — developers.mindbodyonline.com/WebhooksDocumentation
- Mindbody Public API v6.0 — developers.mindbodyonline.com/ui/documentation/public-api
- Mindbody Multi-location Management — mindbodyonline.com/business/multi-location-management
- Mindbody Check-In App (App Store listing)
