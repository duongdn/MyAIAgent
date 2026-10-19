# Storage Cleanup — Ổ chính `/` (sda3)

**Thời gian:** 2026-10-19 15:45 (UTC+7)
**Phạm vi:** chỉ ổ chính `/` (205G). `/disk2` = ổ backup → bỏ qua.

## Trạng thái

| Thời điểm | Used | Avail | Use% |
|---|---|---|---|
| Ban đầu | 169G | 28G | 87% |
| Sau drop `paturevision_staging_20250214` | 166G | 30G | 85% |
| Sau drop `luxeitfwdm2` | 164G | 32G | 84% |
| Sau drop 4 DB swit (Postgres) | 159G | 37G | 82% |
| Sau dọn cache (mục B) | 146G | 50G | 75% |

## Đã làm

- ✅ DROP DATABASE `paturevision_staging_20250214` (MySQL, ~2.5G, tạo 2025-08-28) — user duyệt.
  - Lưu ý: `/disk2/projects/Bailey/php/app/config/parameters.php` còn trỏ DB này (bản local cũ của Bailey php) → nếu chạy lại bản đó sẽ lỗi DB.
- ✅ DROP DATABASE `luxeitfwdm2` (bản import cũ, app dùng `luxeit2fwdm-v2`) — user duyệt. Còn lại `luxeit2fwdm-v2`.
- ✅ DROP Postgres `swit_ocpp_dev`, `swit_staging`, `swit_dev`, `swit-api-test` (Mirko/swit, ko còn làm) — user duyệt. Code `/disk2/projects/Mirko` giữ nguyên (ổ backup).
- ✅ Dọn cache (~13G): Chrome cache, pip/node-gyp/typescript cache, npm cache, Docker image không dùng (405M) + 6 volume ẩn danh nhỏ (~50M mỗi cái), 15 snap revision disabled, snapd cache, apt cache, journal vacuum.
  - **Giữ lại Docker:** volume ẩn danh `0991a08f4b34…` 2.2G = Postgres data dir (sửa lần cuối 2026-09-03) — chờ user xác nhận; named volume `metastamp-*`, `ohcleo-backend-api_*` giữ (có data dự án).
- ✅ Xoá `~/.minikube/cache` (826M, k8s chưa dùng) → 145G used / 51G avail.
- ❌ miniconda3 — **giữ**, user bỏ qua (đang là base của `~/.claude/skills/.venv`, Poetry, `scripts/cookie-vault-sync.sh`, env `ohcleo-api`).

## Phân bổ ổ `/`

| Thư mục | Size | Chính |
|---|---|---|
| `/home` | 109G | projects 42G, .config 18G, .nvm 8.1G, .cache 7.1G, miniconda3 5.1G, .rvm 4.7G, Downloads 4.7G, .npm 4.4G |
| `/var` | 44G | MySQL 21G, Postgres 6.9G, snapd 6.5G, Docker 5.5G, flatpak 1.6G, log 1.5G |
| `/usr` | 14G | system |
| `/opt` | 3.4G | forticlient, Element, OpenCode, Postman… |

## Check: tại sao có 2 DB luxeit (Maddy LIFM2)

Cả 2 đều import ngày **2025-03-03**, từ 2 dump khác nhau của cùng site Magento:

| DB | Import lúc | Tables | Size | Nguồn |
|---|---|---|---|---|
| `luxeitfwdm2` | 13:49–14:39 | 629 | 1.58G (disk 2.3G) | `LIFM2/luxeitfwdm2.zip` |
| `luxeit2fwdm-v2` | 15:02–15:26 | 577 | 1.54G (disk 2.2G) | `LIFM2/luxeit2fwdm-v2.zip` → `luxeit2fwdm.sql` (dump mới hơn, 14:53) |

- Bản v2 = tập con của bản 1: **0 bảng chỉ có ở v2**, 52 bảng chỉ có ở bản 1 (`alerts`, `archived_*`, `bank_details`, `country`, `email_blocks`…).
- App local `LIFM2/luxeitfwdm2/app/etc/env.php`:
  ```php
  #'dbname' => 'luxeitfwdm2',      // đã comment
  'dbname' => 'luxeit2fwdm-v2',     // đang dùng
  ```
- ⇒ Import bản 1 trước, sau đó lấy dump mới (v2), import lại và chuyển app sang v2. **Bản `luxeitfwdm2` = bản cũ, bỏ.** Cả 2 không update từ 03/2025.

**Đề xuất:**
- Drop `luxeitfwdm2` → ~2.3G.
- Nếu không còn dev LIFM2 local: drop luôn `luxeit2fwdm-v2` (+2.2G); file zip dump vẫn còn để restore.
- File trùng trong `~/projects/Maddy/LIFM2`: `luxeitfwdm2.zip` 363M (dump của DB bỏ), `rms.zip` 173M (đã giải nén `rms/`), `luxeitforward_rms-2025-01-16.sql` 373M.

## Plan còn lại (chờ duyệt)

### A. DB local (~15G)
| DB | Size | Gợi ý |
|---|---|---|
| `luxeitfwdm2` | 2.3G | Drop (xem trên) |
| `luxeit2fwdm-v2` | 2.2G | Drop nếu không dev LIFM2 local |
| `bailey_pre9` | 2.7G | Tạo 2026-03-20 — còn cần? |
| `mwmxcoma_wp_nmqrw` | 2.8G | ? |
| `ohcleo` | 3.7G | Giữ nếu dev OhCleo |
| `wp_tactical`, `delayedflight`, `montreall`, `catnapping` | ~2.7G | Dự án cũ? |
| PG `swit_ocpp_dev` (Mirko) | 4.9G | Mirko còn làm? |
| PG `xid_async_dev` | 1.3G | Giữ (XID active) |

### B. Cache — an toàn, tự tạo lại (~17G)
| Mục | Size | Lệnh |
|---|---|---|
| Chrome cache | 5.6G | `rm -rf ~/.cache/google-chrome/*` |
| snapd cache + 15 snap disabled | ~5–6G | `snap remove <n> --revision=<r>`, xoá `/var/lib/snapd/cache/*` |
| npm cache | 4.4G | `npm cache clean --force` |
| Docker unused volume/image | ~3.4G | `docker system prune` + `docker volume prune` |
| journal | ~0.8G | `journalctl --vacuum-size=200M` |
| minikube cache | 0.9G | nếu ko dùng k8s |

### C. Deps project `node_modules` + `vendor` (~12G)
Xoá ở project không active (Colin, Andrew-Taraba, marcel, Maddy/LIFM2…). Cài lại khi cần.

### D. Clone trùng + dump trong `~/projects` (~5G)
- `JamesDefinitiveGuide/` vs `james-definitive/` — cùng repo, .git ~0.9G mỗi cái → xoá 1.
- `Elena/develop` + `Elena/external` — .git 1.7G mỗi cái → `git gc` hoặc xoá `external` nếu chỉ tham khảo.
- `Colin/excel-test-zone-api/prod_dump_20260515.sql.gz` 1.6G → xoá/move `/disk2`.

### E. Runtime / app (~6–8G)
- Node 9 bản: giữ v22.22.1, v20.19.0, v18.20.7; xoá v12, v14, v16, v17, v20.18.3, v22.7.0 (có openclaw + CUDA lib) → ~3–4G.
- Ruby 4 bản (3.0.4, 3.3.4, 3.3.5, 3.4.8) + gems 1.9G → bỏ 2 bản.
- `~/Downloads` 4.7G (zip 1.4G 06/2026, `hunterxtop_deployment.zip` 0.5G).
- `.nuget` + `.dotnet` 3.7G, AnythingLLM 2.1G, Postman 1.5G, flatpak 1.6G.
- `My-AI-Agent/tmp/msteams-will-profile-bak-202606110830` 568M.

**Tổng tiềm năng:** ~50–60G → `/` còn ~80–90G trống (~58%).

## Câu hỏi chưa giải quyết

1. Drop `luxeit2fwdm-v2` nữa không? (`luxeitfwdm2` đã drop)
2. Docker volume Postgres ẩn danh `0991a08f4b34…` (2.2G, 2026-09-03) — xoá?
3. DB mục A khác: `bailey_pre9`, `mwmxcoma_wp_nmqrw`, `wp_tactical`, `delayedflight`, `montreall`, `catnapping`, `swit_ocpp_dev` — giữ/drop?
4. Project nào không còn active (để xoá deps)?
5. Còn dùng .NET / minikube / AnythingLLM?
6. Dump/zip trong `~/projects` + Downloads: xoá hay move `/disk2`?
