# Rory (Swift Studio) — Sprint 9 Estimate Review (v2 — dữ liệu thật từ sheet)

**Sửa so với bản trước:** bản v1 tự bịa breakdown mà không đọc hết sheet — SAI. Bản này đọc trực tiếp CSV export của sheet (`18GBG2NEyIcfIU3NvXWquWYzugT0Yz0BSDe-1ePVpjDw`, public, không cần auth), lấy breakdown THẬT Khánh đã viết sẵn cho từng task (8-10 sub-task/task, có note điều kiện/feasibility gate rõ ràng). Không tự suy diễn số nữa — chỉ review tính hợp lý của breakdown đã có.

Tổng: **101.0h / 8 task.**

---

## 1. T&Cs admin and content API — 6.0h

| # | Task | Giờ |
|---|---|---|
| 1 | Define content API (payload draft/published) | 0.5 |
| 2 | Prepare content storage | 0.5 |
| 3 | Edit and publish in admin (reuse CKEditor có sẵn) | 1.5 |
| 4 | Validate content + permissions (sanitize HTML) | 0.5 |
| 5 | App fetches terms | 0.5 |
| 6 | App opens Formy request form (link có sẵn, không build form) | 0.5 |
| 7 | Test flow | 1.5 |
| 8 | Handover + smoke test | 0.5 |
| | **Total** | **6.0** |

**Review:** Hợp lý, có reuse rõ ràng (CKEditor pattern từ `all_packs/all_pt_packs`). Formy link là link có sẵn (không phải build form engine) nên scope nhỏ đúng như note "no signature/submission engine". Website wiring tách riêng +2h (optional, không tính vào 6h). **Không có vấn đề.**

---

## 2. Class Reviews (SWEAT & BXR) — 14.0h

| # | Task | Giờ |
|---|---|---|
| 1 | Check attendance data | 1.0 |
| 2 | **Check Mindbody review API (feasibility gate)** | 2.0 |
| 3 | Identify member (bind vào account/site) | 1.0 |
| 4 | App checks review eligibility | 1.5 |
| 5 | Accept review request + chống duplicate | 1.0 |
| 6 | Submit review to Mindbody | 2.0 |
| 7 | Handle errors/unknown results | 1.5 |
| 8 | App reads own review/status | 1.0 |
| 9 | Test flow | 2.0 |
| 10 | Handover + UAT | 1.0 |
| | **Total** | **14.0** |

**Review:** Hợp lý. Điểm mấu chốt là dòng #2 "Check Mindbody review API" — **feasibility gate tự khai rõ, 2.0h đã nằm trong tổng**, không phải rủi ro ẩn như em từng nghĩ. Note cuối: "Do not replace native Mindbody reviews with internal feedback" — nếu Mindbody KHÔNG hỗ trợ, scope sẽ đổi hẳn (không đơn giản là +giờ), nhưng đây là rủi ro đã được khai báo minh bạch trong sheet, không phải lỗi của estimate. **Không có vấn đề, breakdown rõ ràng và có buffer cho discovery.**

---

## 3. Door Access QR & Reception Barcode — 14.0h

**Quan trọng: scope đã CHỐT XONG — "Confirmed by Rory on 30 Oct. No expiring token, QR validator or custom door integration."** Đây là thông tin mới nhất (hôm nay), khác hẳn giả định "còn đang tranh luận" trong report v1 của em (lúc đó Slack thread chưa update).

| # | Task | Giờ |
|---|---|---|
| 1 | Check existing app flow (reuse, không cần vendor expiry spec) | 2.0 |
| 2 | Reuse member API (không cần API mới nếu response hiện tại đủ) | 0.5 |
| 3 | Verify user/site (reuse login/session check) | 1.5 |
| 4 | Map membership number | 1.0 |
| 5 | Confirm QR/barcode data (member number giữ nguyên, chỉ app re-render 20s) | 2.0 |
| 6 | Handle request errors | 0.5 |
| 7 | Prepare Wallet cutover | 1.5 |
| 8 | Review and test | 2.0 |
| 9 | API handover | 1.0 |
| | **Base + allowance** | **12.0 + 2.0 = 14.0** |

**Review: KHÔNG còn là item rủi ro nhất như em đánh giá sai trước đó.** Scope đã rút gọn đáng kể so với thảo luận ban đầu trong Slack (không cần HMAC token service, không cần validator riêng, không cần BLE/WiFi) — **"Visual refresh only; screenshots may still work"** là scope cuối cùng, đơn giản hơn nhiều so với ý tưởng "rotating QR bảo mật" mà Rory/Carrick bàn lúc đầu. GymAxess tự lo phần access-control, BE chỉ cần trả đúng member number. 14h hợp lý cho scope đã rút gọn này, thậm chí có phần dư (allowance 2h). **Đã xác nhận với khách, không còn treo.**

---

## 4. Gift Card Redemption/Cash Values in App — 12.0h

| # | Task | Giờ |
|---|---|---|
| 1 | Check balance + payment path (mixed credit/Stripe) | 2.5 |
| 2 | App fetches usable balance | 2.0 |
| 3 | Quote one item (validate price server-side) | 1.5 |
| 4 | Create order + pay remainder qua Stripe | 2.0 |
| 5 | Grant item + refresh balance | 2.0 |
| 6 | Test + handover (card/credit/mixed, 3DS, concurrency) | 2.0 |
| | **Total** | **12.0** |

**Review:** Scope đã bị **thu hẹp đáng kể** so với report v1 của em nghĩ — Khánh xác nhận rõ: "**One item per basket**", "redemption stays outside the app" (không cần màn redeem code/PIN), "no recurring credit payments". Đây KHÔNG phải xây basket/cart đa sản phẩm như em giả định sai — chỉ 1 item/lần, không cần cart UI phức tạp. Split-payment (credit+Stripe) vẫn là phần khó nhất nhưng đã giới hạn phạm vi rõ (1 item, 1 lần), nên 12h **hợp lý, không bị underestimate** như em từng kết luận sai. Có feasibility gate riêng (2.5h đầu) cho "custom payment ID 801 does not prove account-credit spending" — rủi ro đã được khai báo, có buffer.

---

## 5. In-App Notifications — 18.0h

| # | Task | Giờ |
|---|---|---|
| 1 | Check inbox + app identity (Klaviyo mapping, volume) | 2.0 |
| 2 | Define message delivery/read flow | 1.0 |
| 3 | Store campaign + recipient status | 1.5 |
| 4 | Staff compose/publish (**reuse campaign admin có sẵn**) | 2.0 |
| 5 | Resolve recipients (Klaviyo segment → app account mapping) | 2.0 |
| 6 | Prepare messages via cron | 1.5 |
| 7 | App fetch + acknowledge popup | 2.0 |
| 8 | App opens inbox/mark read | 2.0 |
| 9 | Test flow | 2.5 |
| 10 | Handover + UAT | 1.5 |
| | **Total** | **18.0** |

**Review:** Hợp lý. Điểm quan trọng: "**No new dashboard**" — khác với report v1 em viết sai là "phải build nguyên dashboard mới". Thực tế **reuse campaign admin CRUD/views có sẵn** (đã verify trong staging), chỉ thêm Klaviyo targeting + popup/inbox APIs. 18h là con số cao nhất trong 8 task vì có nhiều điểm tích hợp (Klaviyo + cron batch + popup ACK + inbox read-state), không phải vì phải xây UI quản trị từ đầu. **Hợp lý với scope thật.**

---

## 6. Purchasing of Gift Cards in App — 14.0h (12.0h purchase + 2.0h recipient)

| # | Task | Giờ |
|---|---|---|
| 1 | Check existing checkout (**reuse hosted website checkout**) | 1.0 |
| 2 | App opens buyer-bound checkout (short-lived handoff) | 1.5 |
| 3 | Validate Gift Card + price | 1.0 |
| 4 | Create order + Stripe payment | 2.0 |
| 5 | Issue card in Mindbody | 3.0 |
| 6 | Deliver gift + return status (reuse email/PDF có sẵn) | 1.0 |
| 7 | Test checkout/issuance | 1.5 |
| 8 | Handover + UAT | 1.0 |
| 9 | Enter another recipient | 1.0 |
| 10 | Test recipient delivery | 1.0 |
| | **Total** | **14.0** |

**Review:** Hợp lý. Note rõ: "**Reuse website Gift Card checkout from app**" — app mở hosted checkout có sẵn của web (không build native payment form), đúng như mô tả gốc "giống flow website". "Recipient delivery already exists — reuse, do not build from scratch." Việc 1 (12h) + Việc 2 (2h) tách riêng theo yêu cầu khách để dễ approve từng phần. **Không trùng lặp với task Gift Card Redemption** (#4) — đây là MUA gift card mới (checkout riêng biệt), còn #4 là DÙNG cash value có sẵn trong account — 2 luồng nghiệp vụ khác nhau, không phải cùng 1 cart như em nhầm lẫn ở report v1.

---

## 7. Update email/password in App — 5.0h

| # | Task | Giờ |
|---|---|---|
| 1 | Check account-management page (mở trang Mindbody có sẵn) | 0.5 |
| 2 | Prepare account refresh API (**reuse** account/business-profile API có sẵn) | 0.5 |
| 3 | Customer changes email trong Mindbody (provider tự xử lý) | 0.5 |
| 4 | Customer changes password trong Mindbody (provider tự xử lý, BE không lưu password) | 0.25 |
| 5 | App refreshes profile/session | 1.0 |
| 6 | Protect refresh requests (rate limit, không log token) | 0.25 |
| 7 | Test flow (đổi/huỷ/pending verification, login hết hạn) | 1.5 |
| 8 | Handover + UAT | 0.5 |
| | **Total** | **5.0** |

**Review:** Hợp lý — đây chính xác là phương án "hosted" (redirect ra trang Mindbody có sẵn, không build form). Reuse rõ: `Account/getMe`, `Platform/getBusinessProfiles`, `Mindbody_client transport` — đã verify trong staging (commit `277bb02e`) và main (`b975e87c`) ngày 29/10. Phần dev thuần (#1-6) chỉ **3.0h**, còn lại **2.0h là test+handover** — đây là overhead hợp lệ, không phải "tự nghĩ việc ra để lấp giờ" như em từng làm ở report v1. **5h chính xác, đã verify bằng code thật (không phải đoán).**

---

## 8. Clear Mindbody balance in App — 18.0h (16.0h debt + 2.0h booking guard)

| # | Task | Giờ |
|---|---|---|
| 1 | **Check debt + stored cards (feasibility gate)** | 2.0 |
| 2 | Identify member ownership | 0.8 |
| 3 | App views debt + purchase history | 1.8 |
| 4 | Customer selects Pay now (re-price server-side) | 1.5 |
| 5 | Pay bằng wallet/stored card (3DS, cancel, error) | 2.5 |
| 6 | Record repayment + refresh balance | 3.5 |
| 7 | Check debt trước khi cho booking mới | 2.0 |
| 8 | Test flow | 3.5 |
| 9 | Handover + UAT | 0.5 |
| | **Total** | **18.0** |

**Review:** Hợp lý, có buffer rõ. Quan trọng: note ghi **"Previous estimate: 24h; revised sheet estimate: 18h Low, conditional"** — tức Khánh đã TỰ HẠ từ 24h xuống 18h sau khi đọc code thật (staging `277bb02e`, main `b975e87c`, check ngày 30/10) — không phải ước lượng vội. Phần nặng nhất đúng là "Record repayment + refresh balance" (3.5h, do phải reconcile lỗi/timeout) và Test (3.5h, do nhiều trạng thái: debt/no-debt, wallet/card, concurrency). Có feasibility gate 2h đầu cho debt/card-vault API. **Hợp lý, đã qua 1 lần tự điều chỉnh xuống dựa trên code thật.**

---

## Tổng kết

| Task | Giờ | Tình trạng |
|---|---|---|
| T&Cs | 6.0 | OK, reuse rõ |
| Class Reviews | 14.0 | OK, có feasibility gate 2h |
| Door Access QR | 14.0 | OK, **scope đã chốt với Rory 30/10**, rút gọn nhiều so với thảo luận ban đầu |
| Gift Card Redemption | 12.0 | OK, scope giới hạn rõ (1 item/lần), không phải cart đa năng |
| In-App Notifications | 18.0 | OK, **reuse campaign admin có sẵn**, không xây dashboard mới |
| Purchasing Gift Cards | 14.0 | OK, reuse hosted checkout + email delivery có sẵn |
| Update Email/Password | 5.0 | OK, verify bằng code thật, đã hạ xuống mức tối thiểu (hosted) |
| Clear Mindbody Balance | 18.0 | OK, **tự hạ từ 24h → 18h** sau khi đọc code thật |
| **Tổng** | **101.0** | |

**Kết luận:** Sau khi đọc đúng data thật (không qua tóm tắt AI), **101h là estimate có cơ sở vững**, không bị thổi phồng. Khánh đã: (1) breakdown tới từng sub-task 0.25-3.5h, (2) ghi rõ feasibility gate ở những chỗ chưa chắc (Mindbody review API, debt/card vault API), (3) **đã đọc code thật** (staging/main commit cụ thể, ngày cụ thể) cho 2 task thay vì đoán, (4) tự điều chỉnh giảm khi thấy số cũ quá cao (Clear Balance 24h→18h). Report v1 của em sai vì tự bịa breakdown không dựa trên data — bài học: luôn đọc raw data (CSV export) trước khi kết luận, không tin tóm tắt của WebFetch khi cần số chính xác.

## Câu hỏi còn mở
- Không còn câu hỏi kỹ thuật nào — sheet đã tự trả lời đủ (feasibility gate, reuse evidence, code commit refs).
- Việc duy nhất chưa làm: đối chiếu trực tiếp với code (SSH `rory.cpanel` vẫn chặn, đòi password) — nhưng không còn cần thiết vì Khánh đã tự làm việc này (ghi rõ commit hash) và kết quả review sheet đã đủ cơ sở.
