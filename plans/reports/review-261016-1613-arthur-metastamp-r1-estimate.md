# Review est R1 — Arthur / Meta-Stamp (PhucVT, 16-10-2026)

Nguồn: Slack #msv3-official (đến 10-16 11:31), Matrix room Arthur-Meta-Stamp, `R1_scope_list_161026_EN.pdf` (bản 15:56), `spec-every-access-ledger_v4_2026-10-15.pdf`.

## Bối cảnh
- Gate payment $3,330 đã chốt; $1,701 giữ lại tới khi R2–R6 pass trên prod.
- Chris: R1 = new paid work (cần hours + price + date, itemize để chọn line). R2–R6 + B2 Chris coi là trong phần đã trả. R6 + bulk add/remove/move đã lên prod sáng 16-10.
- Est: R1 21h, Backfill 5.5h, B1 1h. Cộng số học đúng (a1–a6 = 8h; tổng 21h; BF 5.5h).

## Vấn đề chính
1. **Thiếu price + date** — spec §6.1 yêu cầu "hours, a price and a date". Cần thêm giá từng line ($90/h, -10% nếu tiếp tục áp → 21h = $1,701) và ngày giao staging/prod.
2. **R1-a chồng lấn R2/R3 (no-charge)** — a3 "one shared read layer" + phần a4 (Feed đọc cùng record) chính là R2/R3 §6.2 mà Chris coi đã trả. Chris sẽ bắt. Phải tách: phần mới = un-merge write paths, account-wide Feed paging/date range/filter (Feed hiện cap 8 row, không creator_id) → giải thích rõ vì sao là mới; phần "same record" → để ở R2/R3. Nếu không tách thì nên chủ động ghi "a3 counted under R2/R3, not charged" để tránh tranh cãi.
3. **Không nêu R2–R5 + B2 xử lý thế nào** — spec §6.2 bảo "nếu thấy phần nào là new work, nói trước". Est nên có 1 dòng: R2–R5, B2 no charge, build sau R1 theo build order (R1 → R5 → R2/R3+B2 → R4 → B1) để tránh rework. Kèm lý do ngắn.
4. **Field chưa được est ở đâu**: `asn`, `network`, `reverse_dns` (§3.2) — reverse DNS lúc write sẽ tăng latency, cần async/lookup; `identity_tier` code+label, `delivery`, `terms_version/terms_url` per row, retire label PAID/402 DENIED/NAMED/FINGERPRINTED. Nếu thuộc R5/R6/B2 thì ghi rõ; nếu không thì thiếu giờ.
5. **R1-b 2.5h hơi mỏng** — count cố định lúc write cần atomic counter (concurrent request cùng agent → trùng số; T1 3 pull trong 1 phút, T9 200 pull/ngày). Cần counter table + row lock/sequence. Khuyên +0.5–1h hoặc ghi rõ cách làm.
6. **R1-f 2.5h + volume** — 1 search ghi tới hàng chục row/call (14k tracks của Tommy), mỗi row cần count + snapshot → bulk insert, có thể ảnh hưởng latency search. Est chưa đề cập; spec §6.5 hỏi thẳng việc này.
7. **verify_url cho search/list row** (§3.5.3) — a5 0.5h chỉ nói pull; xác nhận bao gồm cả search/list.
8. **Breaking change receipt** — bỏ `history_total`/`repeat_count`, refusal không còn share receipt_id → agent đang parse (Tommy integration) bị ảnh hưởng. Nên note deprecation/compat.
9. **Chưa trả lời §6.5**: JSON array vs JSON Lines (đề xuất JSONL/streaming cho export toàn account), volume/storage/paging (keyset pagination, index), header Railway (X-Real-IP — đã trả lời ở R6, nhắc lại 1 dòng).
10. **Test 2.5h cho T1–T10, 2 vòng (staging+prod) có Tommy** — tight; T9 cần tạo 250 event, T6/T7 cần 2 IP khác nhau. Chấp nhận được nếu có script tự động; nếu không +1h.

## Ổn
- Itemize đúng các line R1-a…f như spec yêu cầu, có UI work từng line, "drop a line and its test time goes with it" — tốt.
- Backfill tách riêng, trả lời đúng §6.4 (BF-3 optional, approximate, marker trên group cũ).
- B1 có lý do out-of-scope (navbar 27-11-2025, trước M4) — hợp lý.

## Wording (NamTV nhắc: freelancer, không "we/our/team")
- Dòng R1-b: "how many times we have seen this agent" — là trích spec, nhưng nên đổi "the platform has seen" cho đồng nhất. Không thấy "we/our/ours/team" khác trong PDF.
- Kiểm lại message Slack đi kèm (câu "they are ours to absorb" NamTV đã bắt) trước khi gửi.

## Đề xuất tổng
- R1: 21h → ~22–23h nếu cộng count atomic + volume/bulk insert, hoặc giữ 21h nhưng chuyển a3 sang R2/R3 (no charge) và dùng 1h đó bù chỗ mỏng.
- Thêm cột price + ngày giao; thêm đoạn R2–R5/B2 no-charge + build order; trả lời §6.5.

## Unresolved
- R2–R5 no-charge đã thống nhất nội bộ chưa (NamTV lo nếu Chris không làm R1 thì R2–R5 bị treo → $1,701 treo theo)? Cần plan B: nếu Chris drop R1, vẫn làm R2–R5 trên schema hiện tại.
- Discount 10% có áp cho R1 không.
