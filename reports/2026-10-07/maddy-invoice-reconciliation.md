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
