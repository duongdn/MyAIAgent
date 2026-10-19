# MPFC upgrade — mọi thứ ở 1 chỗ

| File / folder | Nội dung |
|---|---|
| `handover.md` | Bối cảnh, hạ tầng, quyết định, email nháp gửi Saul |
| `runbook.md` | Cách chạy script, cutover, checklist release (chuyển app phụ) |
| `test-results.md` | Test case A1–G9 (đánh số) + kết quả |
| `schema-diff-live-vs-upgraded.txt` | Khác biệt schema DB live vs sau migrate |
| `scripts/` | `01`→`03` dựng server/code/DB, `90` môi trường test, `patches/` |
| `tests/smoke-test.js` | Crawl trang guest/member/team/admin, bắt lỗi PHP |
| `tests/functional-test.js` | Test thao tác ghi (checkout, …) — chỉ chạy trên host test |

## Tài khoản test
Server: https://upgrade-test.mypersonalfootballcoach.com (basic auth `mpfc`)

| Vai trò | User | Login ở |
|---|---|---|
| Admin | `nus_upgrade_admin` | `/old-login` |
| Member | `nus_upgrade_member` | `/login/` |
| Team member | `nus_upgrade_team` | `/login/` |
| Team manager | `nus_upgrade_manager` | `/login/` |

Team key `NUS-UPGRADE-TEST` (level MPFC Demo). Thẻ Stripe test `4242 4242 4242 4242`.
**Mật khẩu** (không commit vào git): `bash scripts/decrypt-secrets.sh && jq . config/.mpfc-upgrade-test-config.json`
