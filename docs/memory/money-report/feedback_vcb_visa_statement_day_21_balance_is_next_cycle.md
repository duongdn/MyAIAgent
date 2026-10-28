---
name: vcb_visa_statement_day_21_balance_is_next_cycle
description: VCB Visa sao kê ngày 21; dư nợ sau ngày 21 thuộc kỳ sau, user đã trả kỳ hiện tại — không khuyên "lương về trả thẻ trước"
metadata:
  type: feedback
---
VCB Visa chốt sao kê ngày 21 hàng tháng. User trả hết mỗi kỳ sao kê. Dư nợ phát sinh sau ngày 21 thuộc kỳ sau, trả tháng sau.

**Why:** 2026-10-28 report khuyên "lương về trả thẻ 6.95M trước" — user sửa: đã trả đợt sao kê này rồi, tháng sau trả tiếp.

**How to apply:** Trong money-report, không khuyến nghị trả thẻ khi lương về / không coi dư nợ thẻ là việc cần làm. Chỉ ghi "thuộc kỳ sao kê 21/{tháng sau}". Chỉ flag nếu dư nợ kỳ đã chốt chưa trả quá hạn. Liên quan [[low_cash_before_payday_not_a_risk]].
