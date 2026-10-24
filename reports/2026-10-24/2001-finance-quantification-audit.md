# Finance Quantification Audit — 2026-10-24 20:00

Input: 70 mã, 1 WARN (BSR).

| Mã | WARN | Phân loại | Hành động |
|----|------|-----------|-----------|
| BSR | `[audit] fetch/audit failed — socket hang up` | Lỗi mạng tạm thời (không phải data finding) | Retry: cafef API trả 200 (64KB); chạy lại audit → 70 mã, 0 WARN |

- CONFIRMED_BUG: không có
- FALSE_POSITIVE: không có (không thêm suppression — lỗi mạng không nên regex-suppress, sẽ che lỗi fetch thật)
- UNCERTAIN: không có

Không đổi code, không rebuild, không commit/deploy.
