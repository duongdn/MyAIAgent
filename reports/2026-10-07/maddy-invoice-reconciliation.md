# Maddy (Xtreme) — Đối soát invoice 0180-20261006-01 vs JIRA vs Workstream

**Ngữ cảnh:** Room "PHP Projects" (`!unGjZonXnglXiqZCSC`), chientx 09:35 forward complain của Maddy (06/10 17:26): giờ Kai trên invoice ≠ giờ Kai log JIRA; Maddy tưởng bug fix (cho task đã trả tiền) không bị charge; khách cuối không trả tiền fix bug → Maddy tự bù.
NamTV yêu cầu (10:04–10:07): (1) giải thích rõ giờ không khớp do đâu, (2) liệt kê bug bị lặp lại / bug dễ thấy, (3) mobile dev cũng phải nắm (DM chỉ có 1), (4) fixed cost cho task về sau.
Nguồn: Invoice PDF, `Kai Worklog.xlsx` (JIRA export Maddy gửi), Workstream raw `/review/week` project Maddy, JIRA LIFM2 live (changelog).

## 1. Tổng giờ Kai (LongVV), 07/09 → 04/10

| Tuần | Workstream charged | Invoice | JIRA (Maddy export) | Invoice − JIRA |
|------|-----|-----|-----|-----|
| 07–13/09 | 8.5h | 8.5h | 7.0h | +1.5h |
| 14–20/09 | 8.0h | **5.0h** (đã giảm 3h) | 1.0h | +4.0h |
| 21–27/09 | 12.0h | **9.5h** (đã giảm 2.5h) | 2.5h | +7.0h |
| 28/09–04/10 | 3.25h | 3.25h | 0h | +3.25h |
| **Tổng** | **31.75h** | **26.25h** (918.75 AUD) | **10.5h** | **+15.75h** (551.25 AUD) |

→ Invoice đã thấp hơn WS 5.5h. Chênh 15.75h so JIRA = **giờ có làm nhưng Kai không log worklog vào JIRA**, không phải bill khống.

## 2. Phân rã 31.75h WS

**A. Khớp JIRA — 10.5h:** 409 (2h), 452 (0.5), 455 (0.5), 464 (4), 465 (1), 467 (2.5).

**B. Có ticket nhưng KHÔNG log JIRA — 13.5h:**
| Ticket | Loại | WS | Ghi chú |
|---|---|---|---|
| LIFM2-409 Import Shopify payouts | Task | +2h (25/09 "Check Anoma Scenario") | est 113.25 / spent 111.25 — gần hết est; Anoma test lại nhiều vòng |
| LIFM2-467 In-Home Quote Form | Task mới (17/09) | +2.5h (25/09) | est 2h, JIRA 2.5h → thực tế 5h, bị trả về 29/09 |
| LIFM2-466 Tagging Postmark emails | Task mới | 3h (16/09) | **không est**, tag "Làm trước report sau", JIRA vẫn To Do |
| LIFM2-468 Quoting Tool Issue | **Bug** | 2.5h (22/09 + 02/10) | không est, 0 worklog |
| LIFM2-459 Listed - buy tab issue | Task (rework) | 2h (25/09) | bị Anoma trả về 2 lần (24/08, 07/09) |
| LIFM2-428 Authenticity Certificate | Task | 1.5h (24/09 viết guideline deploy cho Madhuraka) | |

**C. Không có ticket — 7.75h:** "Check Issue quoting tool & feedback" 5h (16/09), investigate items sold bị draft trên Shopify 1h, investigate cải thiện kết quả quoting tool 1h, resolve PR conflicts 0.5h, "Fix urgent bug" 0.25h.

→ **21.25h không có trong JIRA**, trong đó **~11h là bug/investigate quoting tool** (468 2.5 + 5 + 1 + 465/455 liên quan) — đúng loại Maddy nói không được charge.

## 3. Bug lặp lại / dễ thấy (điểm NamTV nhấn mạnh)

- **Quoting tool = điểm nóng chronic.** ≥25 ticket "quote" từ 10/2025 (365, 368, 369, 381, 382 hotfix jumping, 384, 387, 391, 404, 405, 417, 426, 434 AI MVP, 441, 446, 454, 455, 463, 465, 468…). Jumping text sửa 3 lần (369 → 381 → 382 hotfix). Tháng 9 vẫn tiếp tục: 463 batch issue (không est), 468 (không est), ~6h investigate không ticket. **Đây là case Maddy sẽ nói "bug trên task đã trả tiền".**
- **LIFM2-455 Refresh Issue on Quotes page (Bug):** Anoma trả về 2 lần (18/07, 14/08), xong lần 3 (09/09). Bug UI dễ thấy.
- **LIFM2-465 Quote-email tab feedback (Bug):** relates 449/451 (task tháng 7 đã trả tiền) → bug phát sinh từ task đã bill. Bị trả về 23/09.
- **LIFM2-459:** bị trả về 2 lần, spent 2h > est 1.5h.
- **LIFM2-452:** bị trả về 26/08, Done 21/09.
- **LIFM2-467 (task mới 17/09):** est 2h, thực tế 5h, bị trả về 29/09.
- Hôm qua Anoma tiếp tục hỏi 409 Buy-out + lỗi RMS5 "enable+Listed" (Alert #5 daily report), vẫn chưa trả lời.

## 4. Mobile dev (LuHX), NamTV: "cần nắm"

~~Không có ticket JIRA nào trong task log~~ **Sửa 11:25 (anh Dương chỉ ra):** LuHX log JIRA dưới tên **Jeff Nguyen**, ticket **IHC-52 "Shift Notes"** (project IHC, không phải LIFM2). Worklog 07/09–04/10 = **27h** vs WS **27.25h** vs invoice **27.25h**, khớp từng ngày, chỉ thiếu 0.25h ngày 30/09. Mobile **không có vấn đề lệch giờ**. Lưu ý: IHC-52 **không có estimate** (est 0), đang ở Testing.

## Checklist issue Kai (LongVV) cần kiểm tra — thêm 11:35

Mục tiêu: mỗi giờ trên invoice (26.25h) phải chỉ ra được ticket + worklog JIRA, hoặc giải thích được. Kai rà từng dòng, ghi kết quả vào cột "Kai xác nhận".

| # | Ngày | WS | Việc (WS) | JIRA | Issue | Kai cần làm / trả lời | Kai xác nhận |
|---|---|---|---|---|---|---|---|
| K1 | 07/09 | 0.5h | Check feedback & resolve PR conflicts | không ticket | Không biết thuộc ticket nào | Thuộc ticket nào? Log worklog vào ticket đó | |
| K2 | 16/09 | 3h | LIFM2-466 Tagging Postmark emails | 0h, To Do, **không est** | Task mới làm không est, không worklog, status không update | Log 3h, set est, update status. Khách có yêu cầu task này không (link msg)? | |
| K3 | 16/09 | **5h** | Check Issue quoting tool & feedback | không ticket | Dòng lớn nhất không ticket. Nghi là bug quoting tool (task đã bill) | Cụ thể issue gì, ai report, liên quan ticket nào (463/468?). Là bug do mình hay yêu cầu mới? | |
| K4 | 22/09 + 02/10 | 2.5h | LIFM2-468 Quoting Tool Issue (Bug) | 0h, **không est** | Bug, không est, không worklog | Log worklog. Nguyên nhân: lỗi code mình hay do data/khách? | |
| K5 | 24/09 | 1.5h | Write guidelines deploy LIFM2-428 cho Madhuraka | 0h | Không log | Madhuraka có yêu cầu viết guideline không? Log vào 428 | |
| K6 | 25/09 | 2h | LIFM2-459 Check Anoma feedback | 0h (spent 2h > est 1.5h) | Rework lần 3 (trả về 24/08, 07/09) | Vì sao bị trả về 2 lần? Lỗi mình sót hay khách đổi yêu cầu? | |
| K7 | 25/09 | 2h | LIFM2-409 Check Anoma Scenario | 0h (JIRA chỉ 2h ngày 10/09) | 409 đã gần hết est (111.25/113.25h) | Log 2h. Scenario mới (Buy-out?) hay test lại phần cũ? | |
| K8 | 25/09 | 2.5h | LIFM2-467 In Home Quote Form | JIRA 2.5h (22/09), lần 25/09 không log | Est 2h, thực tế 5h, bị trả về 29/09 | Log 2.5h. Vì sao vượt est gấp đôi + bị trả về? | |
| K9 | 28/09 | 1h | Investigate items sold bị draft trên Shopify | không ticket | Không ticket | Ai yêu cầu? Bug hay support? Tạo/ghi ticket | |
| K10 | 28/09 | 1h | Investigate improve quoting tool results | không ticket | Không ticket, quoting tool | Khách có yêu cầu không? Tạo ticket + worklog | |
| K11 | 01/10 | 0.25h | Fix urgent bug | không ticket | Không biết bug gì | Bug gì, ticket nào? | |

**Bug lặp lại — Kai giải thích nguyên nhân từng cái (cho câu trả lời NamTV):**

| # | Ticket | Lịch sử | Kai cần trả lời |
|---|---|---|---|
| B1 | LIFM2-455 Refresh Issue on Quotes page | Anoma trả về 18/07, 14/08 → xong 09/09 | Vì sao fix 3 lần mới qua? |
| B2 | LIFM2-465 Quote-email tab feedback | Bug từ task 449/451 (T7, đã bill). Trả về 23/09, đang To Do | Có phải bug do task 449/451 mình làm sót? |
| B3 | LIFM2-452 Issue updating 4W Sent status | Trả về 26/08 → Done 21/09 | Vì sao bị trả về? |
| B4 | Quoting tool nói chung (463, 468 + K3, K10) | ≥25 ticket từ 10/2025; jumping text sửa 3 lần (369 → 381 → 382) | Gốc rễ là gì? Có cần đề xuất refactor/test case để dứt điểm không? |

**Invoice đã giảm 5.5h (W2 −3h, W3 −2.5h):** Kai xác nhận đã cắt những dòng nào, để đối chiếu với K1–K11 (tránh vừa giảm vừa credit trùng).

**Việc tồn đang chờ Kai:** Anoma hỏi 06/10 (409 Buy-out flow; lỗi RMS5 "enable+Listed"; "items enabled on Shopify nhưng msg wired") chưa trả lời.

### Cập nhật 13:30: Kai trả lời (room "Maddy - Extreme Soft Solutions" 11:16–12:01) + doc giải thích quoting tool

**Kai trả lời theo checklist:**
| # | Kai nói | Đánh giá |
|---|---|---|
| K3 (5h) | "Check issue quoting tool & feedback", liên quan LIFM2-468. Mất thời gian tìm nguyên nhân, đối soát từng item | Là đợt điều tra **log 10 issue LIF ngày 14/09**; kết quả = [doc giải thích](https://docs.google.com/document/d/1QzmeIuJUxID1rS3ktFyEjX02zpWcHBNeP8gXl89e9-0). Có sản phẩm cụ thể, giải thích được. Nhưng **chưa có worklog JIRA**, cần log vào 468 |
| K4 (468) | Đã tạo 468, Maddy approve 1h; "em sót 1h chưa log" | WS charge 2.5h cho 468 vs approve 1h → **vượt 1.5h** chưa xin |
| K5 (428 guideline 1.5h) | Chưa log, chờ a confirm rồi log | OK, cho log |
| K9 Shopify draft 1h | Yêu cầu qua Slack [link](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1790552571912369) | Có yêu cầu khách, không ticket |
| K10 Quoting tool approach 1h | Slack [link](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1790304363097069?thread_ts=1789646620.555009&cid=D050TGMRFRQ) | Có yêu cầu khách, không ticket |
| K11 "urgent bug" 0.25h | Thực ra "Fix payout bracket issue", Slack [link](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1790828431589969) | Bug payout (409?), cần xem có phải bug của mình không |
| Bug của mình | "cũng có bug của mình, đã fix, em bỏ thời gian riêng, ko charge ổng phút nào" | **Chưa kiểm chứng.** Cần Kai liệt kê bug nào + ngày, đối chiếu WS không có dòng charge tương ứng |
| K1, K2, K6, K7, K8 | Chưa trả lời | Còn mở |

**Doc giải thích quoting tool (Kai soạn), tóm tắt:**
- Rà 10 issue log LIF 14/09 trên data production. **Chỉ 1 lỗi thật của mình**: issue 108/109, bulk batch chạy chồng (~30% batch bị overlap) → duplicate row, nhấp nháy, sót item. Fix đang test. Không phải nguyên nhân nhận diện sai.
- Còn lại là **giới hạn thiết kế, không phải bug**: tìm theo từ phổ biến trong kết quả Google (Pochette → "Neverfull"); include term làm hẹp search (Shopify AND); hard limit 8 kết quả; ranking ưu tiên title ngắn; stripped words ("It" trong "Chain It Bag"); size lưu trong title; 2 case dùng nhầm ảnh (ảnh receipt). ~7–9% quote không ra kết quả kể cả khi chạy đúng. Google không deterministic.
- Lịch sử: **119 thay đổi search logic từ đầu 2025** (82 trong 3 tháng), hầu hết do từng ví dụ thực tế.
- Đề xuất thương mại: tách **Faults** (vẫn fix theo arrangement hiện tại) vs **Accuracy improvements** (charge riêng). **16h/tháng** × 3 tháng đầu rồi review. Feature mới quote riêng: 6 item nhỏ = **4.5h**; 6 item lớn chờ review (style-code search, structured size/leather, matching model…).

**Nhận xét của em:**
1. Doc tốt, đúng hướng NamTV (tách fault vs improvement, retainer/fixed cho việc sau). Trả lời được câu "vì sao quote tool bug mãi": phần lớn không phải bug code.
2. **Nhưng mâu thuẫn với complaint của Maddy:** Maddy coi các report này là bug trên tính năng đã trả tiền; doc lại nói 18 tháng qua đã charge chính loại việc này ("part of the work we've been charging for"). Đây đúng là điểm Maddy phản đối, nên phải nói khéo: quá khứ giữ nguyên hay credit một phần.
3. **Doc đã gửi Maddy chưa?** Kai nói "bữa e có soạn". Nếu Maddy chưa thấy thì 5h investigate (K3) càng bị hỏi. Nên gửi doc cùng bảng đối chiếu.
4. **Estimate 4.5h cho 6 item có vẻ quá thấp** (search trace page 1h, replay console 1h, broader results 1h). Rủi ro vượt est lần nữa, giống 467 (est 2h → 5h). Cần Kai review lại trước khi gửi.
5. "Broader results option" vừa nằm bảng estimate 1h, vừa nằm bảng "chờ review" → trùng, cần sửa.
6. Câu "đã tự fix bug của mình không charge" phải chứng minh được bằng WS (ngày nào, ticket nào). Nếu chứng minh được thì đây là luận điểm mạnh nhất để trả lời Maddy.

**Còn chờ Kai:** K1 (PR conflicts 0.5h thuộc ticket nào), K2 (466 không est: ai yêu cầu), K6 (459 rework 3 lần: vì sao), K7 (409 scenario: mới hay cũ), K8 (467 vượt est gấp đôi), danh sách bug tự fix không charge, xác nhận doc đã gửi Maddy chưa; log JIRA cho 428, 468, 466, 459, 409, 467.

### Cập nhật 13:50: Slack Kai ↔ Madhuraka (DM `D050TGMRFRQ`), doc đã gửi chưa?

**Đã gửi.** Timeline:
- 15/09 08:54: Madhuraka gửi log issue của LIF (doc + sheet đánh số). Kai: "I will check and give detailed item **can chargable estimates** for you." Madhuraka: LIF "pretty upset about issues not being fixed", muốn báo "đã check và **fix hết**".
- 16/09: Kai charge **5h** (K3) để điều tra.
- 17/09 10:29: [Kai gửi doc](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1789615758052749?thread_ts=1789437285.771429) + sheet các issue đã fix. 22/09 18:04 gửi lại link khi Madhuraka hỏi → **Madhuraka đã nhận doc.**
- 21/09: Madhuraka **approve 1h** sửa (`site:`, tăng số kết quả) → PR #548. Nhưng WS charge 468 = **2.5h** (22/09 1.5h + 02/10 1h) → **vượt 1.5h** so với approve.
- 25/09: Kai xin thêm 1–2h tìm hướng cải thiện. Madhuraka: "I don't think they will approve… **Ok. I will absorb that cost.** You can proceed" → K10 (1h, 28/09) **có approve**, nhưng là tiền **Maddy tự bỏ ra**. Đây chính là chỗ Maddy than "coming out of my pocket".
- 28/09: Kai gửi suggestion (tab "Solutions for Not Fixed item").
- 🔴 **03/10 14:32: Madhuraka hỏi 2 câu** (include term phân cách bằng dấu phẩy có fix issue 2 không; include term override global exclude word có fix issue 1 không). **Chưa trả lời, 4 ngày.**

**Kết luận:**
- 5h K3 có bằng chứng (doc gửi 17/09, Madhuraka đã đọc). Nhưng **không được approve trước**: Kai chỉ nói sẽ đưa estimate, rồi charge luôn 5h cho bước điều tra. Madhuraka có thể coi là chi phí đánh giá bug.
- 468: approve 1h, charge 2.5h → 1.5h vượt cần giải thích hoặc credit.
- K10 1h: Madhuraka đã đồng ý absorb, giữ được.
- Phải trả lời ngay 2 câu hỏi 03/10 trước khi gửi bảng đối chiếu. Đang chậm trả lời đúng lúc khách complain.

## 5. Kết luận và đề xuất

1. Giờ không phải ảo: WS có đủ, invoice còn thấp hơn WS 5.5h. **Lỗi quy trình:** Kai không log worklog JIRA cho ~21h (2/3 tổng giờ), có việc làm không tạo ticket, có task không est.
2. Gửi Maddy bảng đối chiếu theo ticket (mục 2), tách rõ: (a) task mới / CR (466, 467, 428 guideline, 409 scenario mới), (b) investigate theo yêu cầu, (c) bug fix.
3. Với **bug lặp lại trên task đã bill** (455, 465, 459 rework, 468/quoting tool investigate): đề xuất **không charge / credit vào invoice sau**. Ước tính phần dễ bị phản đối ≈ 468 2.5h + quoting-tool investigate không ticket 5–6h + 459 2h ≈ **9.5–10.5h (~330–370 AUD)**. Cần anh quyết.
4. Từ nay: **bắt buộc log worklog JIRA cùng ngày** cho mọi giờ charge (cả LuHX nếu khách có JIRA/board cho mobile); không ticket thì không charge; task mới phải có est trước khi làm (466/468 vi phạm).
5. NamTV đề xuất fixed cost cho task sau: hợp với task mới có scope rõ (467-like). Bug/investigate vẫn hourly nhưng cap theo est.

## Draft trả lời room PHP Projects (chưa gửi)

> Em rà xong T9 (07/09–04/10) rồi ạ:
> - Kai: WS 31.75h, invoice đã giảm còn 26.25h, JIRA chỉ 10.5h → lệch 15.75h là do Kai **không log worklog JIRA** (~21h không có trên JIRA: 13.5h có ticket nhưng ko log, 7.75h không có ticket). Không phải bill khống.
> - Bug lặp: quoting tool là điểm nóng (≥25 ticket từ 10/2025; T9 còn 468 + ~6h investigate không ticket), 455 bị trả 2 lần, 465 phát sinh từ task 449/451 đã bill, 459 trả 2 lần. Phần này ~10h, đề xuất credit lại cho Maddy.
> - Mobile (LuHX = Jeff Nguyen trên JIRA): 27.25h khớp worklog IHC-52 (27h), ok. Chỉ thiếu est cho IHC-52.
> - Từ nay: bắt buộc log JIRA cùng ngày, không ticket không charge, task mới phải est trước. Task mới có scope rõ thì chuyển fixed cost như a Nam nói.
> Chi tiết bảng đối chiếu: reports/2026-10-07/maddy-invoice-reconciliation.md

## Unresolved questions
1. Credit bao nhiêu giờ cho Maddy (đề xuất ~9.5–10.5h)? Hay giải thích và giữ nguyên?
2. 3h + 2.5h đã giảm ở W2/W3: ai giảm, giảm phần nào? Nên nói rõ với Maddy để thấy đã có thiện chí.
3. ~~Mobile tracking~~ resolved: LuHX = Jeff Nguyen, IHC-52. Memory "LuHX not managed" vẫn giữ cho daily gate, hay đổi theo NamTV "cần nắm"?
4. Ai trả lời Maddy: chientx (người nhận WhatsApp) hay Kai/LongVV trực tiếp?
