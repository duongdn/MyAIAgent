---
description: Điều tra WARN từ audit cron của finance-quantification, xác minh và tự fix script nếu là bug thật (không đoán mò)
---

# Finance Quantification — Audit & Auto-Fix

Chạy hàng ngày qua cron (`scripts/autorun-finance-quantification-audit.sh`, 20:00 UTC+7) khi
`node scripts/finance-quantification-audit-cron.js` thoát với code 2 (có WARN mới, đã lọc
false-positive đã biết). Input: output của lệnh trên, truyền qua biến môi trường
`AUDIT_OUTPUT` hoặc file `$AUDIT_OUTPUT_FILE`.

**Bối cảnh bắt buộc đọc trước:** `docs/memory/finance-report/feedback_cafef_systemic_code_shift_audit.md`
— giải thích pattern bug đã gặp 3 lần (KQKD chain-shift, CDKT label gap, CDKT receivables
chain-shift) và cách `applyChainShift` trong `scripts/finance-quantification-build.js` hoạt động.

## Nguyên tắc tối thượng: KHÔNG ĐOÁN MÒ, KHÔNG TỰ SỬA MÙ QUÁNG

Một audit WARN chỉ là **gợi ý**, không phải bằng chứng. Lần đầu áp dụng
`CDKT_TN_LABEL_FIX` mù quáng theo code số đã phá dữ liệu ĐÚNG của VND/SSI (2 mã chứng khoán
dùng code 135-137 cho ý nghĩa khác hẳn) — chỉ vì "positive dự phòng" trông giống bug không có
nghĩa nó LÀ bug. Với MỖI finding, phải tự điều tra độc lập trước khi đổi 1 dòng code:

1. **Pull raw cafef data trực tiếp** (không qua build script) cho mã bị flag — dùng
   `curl "https://apiweb.cafef.vn/api/v2/BCTC/GetReportCDKT?symbol=<T>&pageIndex=1&pageSize=8&reportType=ALL&TypeTime=QUY"`
   (đổi `GetReportCDKT`→KQKD endpoint nếu là KQKD warning) để xem giá trị thô theo từng kỳ.
2. **Kiểm tra continuity qua ranh giới nghi ngờ** (thường quanh đầu 1 năm/quý mới): giá trị ở
   code bị flag có "nhảy" đột ngột rồi 1 code khác cũng nhảy tương ứng cùng lúc không? Đó là
   dấu hiệu chain-shift thật.
3. **Kiểm tra template của NHIỀU mã khác nhau** (ít nhất 3-5 mã, ưu tiên khác ngành) trước khi
   kết luận "universal" — banks/securities/insurers dùng template khác hẳn công ty thường,
   cùng 1 code có thể mang nghĩa hoàn toàn khác (case VND/SSI).
4. **Chỉ fix khi có bằng chứng rõ ràng** (magnitude continuity qua cutover, hoặc so khớp với
   trang cafef.vn hiển thị trực tiếp cho mã đó). Nếu không chắc → **KHÔNG SỬA**, chỉ ghi báo cáo
   và dừng lại, để user tự quyết định (worse để sai còn hơn tự tay làm hỏng thêm).

## Quy trình

1. Đọc `AUDIT_OUTPUT` — liệt kê từng mã + WARN.
2. Với mỗi finding, điều tra theo 4 bước trên. Phân loại: `CONFIRMED_BUG` / `FALSE_POSITIVE` / `UNCERTAIN`.
3. **`FALSE_POSITIVE`**: thêm regex/pattern vào `KNOWN_FALSE_POSITIVES` trong
   `scripts/finance-quantification-audit-cron.js` (để không lặp lại warning này mỗi ngày), kèm
   comment giải thích lý do (giống các entry hiện có).
4. **`CONFIRMED_BUG`**:
   - Nếu khớp pattern chain-shift đã biết (raw code X trước cutover = true code X+1, ...) →
     thêm 1 chain mới vào `applyChainShift` call site trong `main()` của
     `finance-quantification-build.js` (theo mẫu `KQKD_CHAIN`/`CDKT_TN_RECEIVABLE_LT_CHAIN`).
   - Nếu là label-only bug (giống case 135-137) → thêm entry vào `CDKT_TN_LABEL_FIX`, **luôn
     match theo đúng text gốc bị lỗi (`from`), không bao giờ chỉ theo code số**.
   - Rebuild TẤT CẢ mã bị ảnh hưởng (không chỉ mã bị flag — pattern có thể universal, xem cách
     scan hàng loạt trong memory file) bằng `node scripts/finance-quantification-build.js <TICKER>`.
   - Chạy lại `node scripts/finance-quantification-audit-cron.js` để xác nhận sạch.
   - `node --check scripts/finance-quantification-build.js` trước khi commit.
5. **`UNCERTAIN`**: KHÔNG sửa code, KHÔNG rebuild. Chỉ ghi vào báo cáo để user review thủ công.
6. Commit (conventional commit, không nhắc AI trong message) + push cho MỌI thay đổi code
   (kể cả chỉ thêm false-positive suppression). Deploy lên mpfc:
   `ssh mpfc.mpfc.live "cd /var/www/MyDailyAgent && git pull && sudo systemctl restart quantification-web"`.
7. Cập nhật memory theo dual-memory system (`docs/memory/` + `~/.claude/projects/.../memory/`,
   cả 2 MEMORY.md) — thêm/update `feedback_cafef_systemic_code_shift_audit.md` với finding mới.
8. Ghi báo cáo `reports/{date}/{time}-finance-quantification-audit.md` tóm tắt: mã nào
   CONFIRMED_BUG (đã fix), FALSE_POSITIVE (đã suppress), UNCERTAIN (cần user review).

## Giới hạn phạm vi

- Không tự thêm entry mới vào `KQKD_CHAIN`/`CDKT_TN_RECEIVABLE_LT_CHAIN` (đây là chain CỤ THỂ
  đã verify) — nếu phát hiện pattern chain-shift MỚI (code khác), tạo 1 const chain mới, không
  nhét vào chain có sẵn.
- Không sửa `applyChainShift`/`auditTemplateNumbering`/`auditContraSign` (cơ chế lõi) trừ khi
  chính cơ chế đó sinh ra false-positive/false-negative rõ ràng — ưu tiên sửa ở lớp
  case-cụ-thể (`KNOWN_FALSE_POSITIVES`, `*_LABEL_FIX`, chain mới) trước.
- Nếu > 3 mã trong 1 lần audit đều `UNCERTAIN` → dừng lại, không cố fix gì, chỉ báo cáo (khả
  năng cao là audit logic tự nó có vấn đề, cần user xem lại, không phải data cafef).
