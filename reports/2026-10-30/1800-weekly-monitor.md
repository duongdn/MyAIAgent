# Weekly Monitor — Week 2026-10-26 → 10-30

**Run:** 2026-10-30 18:00 (+07) cron · **So với:** report 2026-10-23
**Workstream: LIVE** (24 project qua `/review/week`). Chạy lúc T6 18:00 → log T6 10-30 có thể còn vào tối nay.

---

## #1 — Team Hours

| Dev | Projects (WS) | T2 | T3 | T4 | T5 | T6 | Total | Status |
|-----|---------------|----|----|----|----|----|-------|--------|
| KhanhHH | Radio Data Center 17 + Baamboozle 11.33 + BXR 8.67 | 8 | 8 | 8 | 8 | 5 | **37h** | 🟡 T6 5h (−3h), ko có leave; có thể log muộn tối nay |
| TuanNT | Speedventory 39.33 + Neural Contract 0.67 | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ (Andrew Taraba 0h tuần này) |
| LeNH | James Diamond | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ |
| PhucVT | Definitive Guide 28 + Meta-Stamp 3 + Speedventory 1 | 8 | nghỉ | 8 | 8 | 8 | **32h** | ✅ 40 − 1 ngày nghỉ (10-27, approved) = 32h |
| LongVV | OhCleo 20.5 + Maddy 11.83 + Definitive Guide 6.5 + Baamboozle 1.17 | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ (Maddy ≥16h target n/a, flex) |
| VietPH | — | | | | | | — | Nghỉ việc 2026-06-30 |

Leave (leave-plan.json, cập nhật 10-30 05:00): PhucVT 10-27 full — lý do **ốm (sốt)**, non-default. Ko có leave khác.

**JIRA cross-check LongVV/Kai (Maddy):** WS 11.83h (10-28 6h, 10-30 5.83h) vs JIRA 6h (LIFM2-473 10-28 6h) → **🔴 lệch 5.83h > 2h** — 10-30 5.83h chưa có worklog JIRA (có thể log JIRA muộn).
**Sheets:** ko còn task-log (đều trên Workstream).

---

## #2 — Fountain (Kunal) 5-Part Check

### 1. Matrix plan ✅
@trinhmtt T2 10-26 09:29, room `!EWnVDAxbTGsBxPkaaI`: **VuTQ 20h · ThinhT 20h · ViTHT 40h → QC 20h**. Ko đổi giữa tuần.

### 2. Task log actuals ✅ (WS Fountain `cmpqcjojh00q2tk1v2qi7gs0j`)
ViTHT 40 · ThinhT 20 · VuTQ 12 · QC: PhatDLT 13 + HungPN 4 (+8.75h OhCleo uncharged) = 17 · TrinhMTT 9.25 (PM, uncharged).

### 3. Plan vs Actual
| Dev | Plan | Actual | Δ |
|-----|------|--------|---|
| ViTHT | 40h | 40h | ✅ |
| ThinhT | 20h | 20h | ✅ |
| VuTQ | 20h | 12h | 🔴 −8h — log 26/27/28 (4h/ngày), **ko log 10-29, 10-30**; nghỉ ½ 10-26 (WS) |
| QC (PhatDLT+HungPN) | 20h | 17h | 🟡 −3h — HungPN chỉ 4h Fountain (ko log T6) |

### 4. Capacity & Runway (Est vs Charged A13:L, live)
| Bucket | Tasks | Remaining | vs 10-23 |
|--------|-------|-----------|----------|
| Narrow (Not Started + In-progress) | 28 | 229.00h | = |
| Broad (excl. Live/Cancelled) | 63 | 328.50h | = |
| Blank status (untriaged) | 17 | 280.25h | = |

Runway @86h/wk: Narrow ≈ 2.7 tuần; Narrow + blank ≈ 6 tuần. **Sheet vẫn đóng băng** (y hệt từ 10-10, tuần thứ 4).

### 5. Over-estimate tracking
37 item >20% over (= tuần trước), ko item nào tăng. Top: #2627 +1550% (Has Bug on Live) · #2615 12h→106.75h +790% · #2639 +725% · #2545 +650% · #2630 +650% · #2613 +625% · #2652 +600% · #2501 +538% · #2380 +531% · #2691 +500% · #2523 +281% · #2603 +263% · #2604 +250% · #2702 +219% (In-progress) · #2624 +160% (Dev Done). #2595 ko over.

---

## #3 — Weekly Report Finalization (Workstream) — tuần 2026-10-26

Nguồn: cron log `tmp/weekly-report-cron-logs/finalization-20261030-1800.log` (ko submit lại).

| Project | Status | Lý do |
|---------|--------|-------|
| Portfolio - James Diamond | ✅ submitted (cron) | AnhNH2 5/5, LeNH 5/5 |
| MissSwimwear | ✅ submitted (cron) | 0 log |
| Tokenlite | ✅ submitted (cron) | ko dev active |
| ETZ - Wathaga | ✅ finalized by KietNVT 10-30 09:07Z | |
| Family App | ✅ finalized by MinhTV 10-30 10:37Z | |
| OhCleo | ✅ finalized by MinhTV 10-30 10:37Z | |
| Auction Warehouse | 🔴 | LongVV 0/5 (0 log tuần này) |
| Baamboozle | 🔴 | LongVV thiếu 26–29 (1/5); KhanhHH 5/5 |
| BXR App | 🔴 | KhanhHH thiếu 28 · KhoaTD thiếu 27 (½ nghỉ)–30 (1/5) |
| Definitive Guide | 🔴 | LongVV thiếu 26, 27, 28 (2/5); PhucVT 4/5 (nghỉ 27) |
| Fountain Greetings | 🔴 | VuTQ thiếu 29, 30 |
| Meta-Stamp | 🔴 | PhucVT thiếu 26 (3/5, nghỉ 27) |
| Neural Contract | 🔴 | TuanNT thiếu 27–30 (1/5) |
| Portfolio (Andrew Taraba) | 🔴 | TuanNT 0/5 |
| Radio Data Center | 🔴 | KhanhHH thiếu 30 |
| Samguard (Elena) | 🔴 | DongNV 0/5 · DuongDN 0/5 · KietNHT 0/5 · SamHT thiếu 26, 27 · TienND2 thiếu 28–30 |
| Speedventory (Bailey) | 🔴 | DatNC thiếu 29, 30 · NamNN thiếu 28–30 · PhucVT thiếu 28–30 · TrinhMTT thiếu 29, 30 · VuTQ 0/5 · **1 dòng charge Pending review (PhucVT 10-26)** |
| Xtreme Soft Solutions (Maddy) | 🔴 | LongVV thiếu 26, 27, 29 (2/5) |
| Crystal lang | ❌ HTTP 403 | "Only the project Manager can finalize" |
| Generator | ❌ HTTP 403 | "Only the project Manager can finalize" |

Tổng: 6 finalized, 12 blocked, 2 API error (14 chưa finalize).

**Ghi chú:** Phần lớn 🔴 là do rule per-project gặp dev đa project (LongVV, PhucVT, TuanNT đều đủ ~full tuần ở project khác). Blocker thật: VuTQ Fountain 29–30 ko log ở đâu cả; KhanhHH T6 chỉ 5h; Speedventory 1 dòng Pending review.

---

## #4 — James Diamond + Marcel Matrix Report

Nguồn: WS James Diamond — LeNH 40h (8×5), AnhNH2 20h (4×5), charged = actual. Marcel: DuongDN 0.67h (40m, 10-29). Blair Brown đã đóng, bỏ.

Draft trong `config/.weekly-report-send-flags.json` (`confirmed: false`), **CHƯA GỬI**. Draft 19/10 cũ chuyển sang `unsent_draft_10_19`.
```
Report week 26/10

James Diamond

Web: 40h/40h
LeNH: 40h/40h

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel
DuongDN: 40m/40m
```

---

## Unresolved
1. Xác nhận nguyên văn text JD 26/10 ở trên để gửi room ThuyLTT. Các draft 19/10, 12/10, 05/10 cũng chưa gửi — gửi hay bỏ?
2. VuTQ ko log 10-29, 10-30 (Fountain plan 20h, actual 12h) — nghỉ chưa khai hay chưa log?
3. KhanhHH T6 5h — đợi log tối nay, recheck sáng mai.
4. LongVV Maddy WS 11.83h vs JIRA 6h — nhắc log JIRA 10-30?
5. Speedventory: 1 dòng PhucVT 10-26 Pending review — cần reviewer duyệt trước khi finalize.
6. Crystal lang + Generator: DuongDN ko phải Manager → ko finalize được.
7. Fountain Est vs Charged đóng băng 4 tuần, 17 dòng chưa triage — nhắc PM cập nhật?

---

## Recheck 2026-10-31 07:15 (+07) — WS live
- **VuTQ Fountain: 20h** (4h × 5 ngày, đã log 29+30) → khớp plan 20h ✅ (Unresolved #2 đóng).
- **KhanhHH Radio Data Center: 17h → 20h** (T6 log thêm, 10-30 = 3h) → tổng tuần ≈ **40h** ✅ (Unresolved #3 đóng).
- HungPN Fountain vẫn 4h (ko log 28–30) → QC 17h/20h 🟡 còn.
- Matrix JD 26/10: **đã gửi** 2026-10-30 20:53 (event `$xp29um9U_…`) — Unresolved #1 đóng.
