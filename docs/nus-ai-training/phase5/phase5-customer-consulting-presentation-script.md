# Tư vấn & đề xuất cho khách hàng — Kịch bản trình bày (Giai đoạn 5)

Phần này nằm trong **Phần 3** của buổi, sau demo security và phần Vận hành.
Slide liên quan: "Tư vấn: từ yêu cầu mơ hồ → bài toán rõ" → "Prototype nhỏ nhất" → "Tổng kết — Thiết kế AI feature trên 1 trang".
Thời lượng: ~15 phút. Không cần code, không cần máy — chỉ cần bảng trắng (hoặc 1 slide trống) và tờ "thẻ khách hàng" ở mục 3.

---

## 1. Phần này để làm gì

**Một câu:** dạy người nghe biến một yêu cầu AI mơ hồ của khách thành một **đề xuất prototype nhỏ, đo được, an toàn** — thay vì gật đầu rồi ôm việc.

Vì sao quan trọng với dev nhiều kinh nghiệm:
- Họ biết tư vấn phần mềm thường. Nhưng **dự án AI có 3 cái bẫy riêng** mà phần mềm thường ít gặp:

| Bẫy | Phần mềm thường | Dự án AI |
|---|---|---|
| "Làm được không?" | Làm được hay không — rõ ràng | **Luôn "làm được" một demo**, nhưng demo chạy ≠ chạy đúng với dữ liệu thật |
| Tiêu chí xong | Feature chạy đúng spec | Đúng **bao nhiêu %**? Sai thì hậu quả gì? — khách hầu như không nói |
| Phạm vi dữ liệu | Rõ từ đầu | "Mọi tài liệu" = hàng chục nguồn, quyền xem khác nhau, có tài liệu mật |

**Thông điệp mang về:**
> "Khách mua **kết quả đo được**, không mua chatbot. Việc của mình là hỏi đủ để biết kết quả đó là gì — rồi đề xuất cái nhỏ nhất chứng minh được nó."

Liên hệ cả buổi: phần security vừa rồi chính là **prototype giai đoạn 2** của đề xuất này. Cuối phần sẽ nối lại.

---

## 2. Hiểu nội dung trước khi trình bày

### 2.1 Tình huống (case study xuyên suốt chương trình)

Khách hàng — **Công ty ABC** (giả lập), làm SaaS, có team support 12 người — nói:

> **"Tôi muốn một chatbot đọc mọi tài liệu công ty và tự tạo ticket. Làm trong 1 tháng được không?"**

### 2.2 Sáu câu hỏi phải hỏi (khớp slide "Tư vấn")

| # | Câu hỏi | Vì sao phải hỏi | Câu khách hay trả lời → câu hỏi tiếp |
|---|---|---|---|
| 1 | **User task**: ai dùng, để làm việc gì cụ thể? | "Chatbot" cho nhân viên support khác hẳn chatbot cho khách hàng cuối (rủi ro, quyền, giọng văn) | "Ai cũng dùng" → "Tuần đầu, **một** nhóm nào dùng nhiều nhất?" |
| 2 | **Input / Output**: hỏi bằng gì, nhận lại gì? | Quyết định pattern: trả lời có nguồn? soạn ticket? hành động thật? | "Trả lời mọi câu hỏi" → "Cho tôi **5 câu hỏi thật** tuần trước nhân viên đã hỏi" |
| 3 | **Dữ liệu**: "mọi tài liệu" là nguồn nào? Cập nhật thế nào? Có tài liệu mật? | Phần khó nhất và tốn công nhất của RAG — không phải model | "Mọi thứ trên Drive" → "Drive có hồ sơ lương, hợp đồng không? Ai được xem?" |
| 4 | **Mức chấp nhận sai**: trả lời sai thì hậu quả gì? Ai phát hiện? | Quyết định mức kiểm soát: chỉ gợi ý? cần người duyệt? tự động? | "Không được sai" → "Nhân viên support hiện nay sai bao nhiêu %? Sai thì ai sửa?" |
| 5 | **Quyền**: ai xem tài liệu nào? Ai được tạo ticket gì? | Chính là ①②④ trong demo security | "Ai cũng được" → "Nhân viên thử việc có được xem hợp đồng khách không?" |
| 6 | **Tiêu chí thành công**: con số nào thì coi là thành công? | Không có con số = không bao giờ nghiệm thu được | "Giảm tải support" → "Hiện mỗi tuần bao nhiêu câu hỏi lặp lại? Giảm còn bao nhiêu thì đáng tiền?" |

**Câu số 4 quan trọng nhất** (ô cam trên slide): nó quyết định pattern và mức kiểm soát. Cùng một chatbot:
- Sai về giờ làm việc → chẳng sao → tự trả lời được.
- Sai về chính sách hoàn tiền → mất tiền → phải có nguồn + người xem lại.
- Tạo ticket sai → làm phiền team khác → cần duyệt (⑤) + giới hạn (④).

### 2.3 Chọn pattern — từ nhỏ đến lớn

Thứ tự ưu tiên (đã học ở các giai đoạn trước): **không cần AI → 1 model call → RAG → workflow cố định → agent**. Chỉ lên mức sau khi mức trước không đủ.

Với ABC:
| Nhu cầu | Pattern hợp lý | Vì sao không lớn hơn |
|---|---|---|
| Trả lời câu hỏi từ tài liệu | **RAG** có trích nguồn | Không cần agent — chỉ 1 bước tìm + trả lời |
| Tạo ticket | **Workflow**: model soạn nháp → người duyệt → tạo | Luồng biết trước, không cần model tự quyết nhiều bước |
| Tự tra nhiều hệ thống, tự quyết bước tiếp | Agent | Chỉ khi P1, P2 đã chứng minh giá trị — chưa cần |

### 2.4 Prototype nhỏ nhất (khớp slide "Prototype nhỏ nhất")

| Giai đoạn | Làm gì | Rủi ro | Tiêu chí go/no-go để sang bước sau |
|---|---|---|---|
| **P1** | Q&A có nguồn — **read-only**, **1 nguồn** dữ liệu (FAQ support), 1 nhóm user | Thấp: không có side effect | Đạt X% đúng có nguồn trên bộ test; nhân viên thực sự dùng |
| **P2** | Đề xuất ticket — model soạn nháp, **người duyệt**, rule trong code | Trung bình: có side effect, có kiểm soát | Tỉ lệ nháp được duyệt không sửa ≥ Y%; 0 ticket sai quyền |
| **P3** | Mở rộng nguồn + phân quyền theo phòng ban | Cao: dữ liệu mật, nhiều quyền | Bộ test quyền (hỏi chéo phòng ban) pass 100% |

**Nối với demo security:** demo vừa xem chính là **P2** — `search_kb` (P1) + `create_ticket` có ④⑤. Kịch bản 4 (giả mạo tenant) chính là bộ test quyền của **P3**.

### 2.5 Khung solution brief 1 trang (khớp slide "Tổng kết")

1. **Bài toán** — user task, input, output, tác động nếu sai, tiêu chí thành công
2. **Pattern** — vì sao model call / RAG / workflow / agent
3. **Agent** (nếu dùng) — goal, tool, state, stop condition; phần SDK lo vs phần mình kiểm soát
4. **MCP** (nếu dùng) — server cung cấp gì, thử bằng Inspector
5. **Security** — quyền user/tenant, dữ liệu nhạy cảm, approval, prompt injection
6. **Kiểm chứng** — test case, metric, failure mode, phạm vi prototype

Mục 5 của tài liệu này có **một bản brief mẫu đã điền đủ** cho ABC — dùng để chiếu cuối phần và làm ví dụ cho bài đánh giá cuối chương trình.

---

## 3. Chuẩn bị trước buổi

### 3.1 Thẻ khách hàng (chỉ trainer giữ — đừng chiếu)

Trainer **đóng vai khách ABC**. Người nghe hỏi; trainer trả lời theo thẻ này. Chỉ trả lời đúng câu được hỏi — **không tự nói thêm** (khách thật cũng vậy).

| Nếu được hỏi về… | Khách ABC trả lời |
|---|---|
| Ai dùng | "Nhân viên support, 12 người. Sau này có thể cho khách hàng tự hỏi." |
| Câu hỏi ví dụ | "Cách xử lý lỗi thanh toán, chính sách hoàn tiền, cách reset 2FA cho khách, giới hạn gói Pro." |
| Bao nhiêu câu hỏi | "Khoảng 300 ticket/tuần, tôi đoán 60% là câu hỏi lặp lại." |
| Tài liệu ở đâu | "Confluence (quy trình support), Google Drive (đủ thứ), Jira (ticket cũ), và email." |
| Tài liệu mật | *(chỉ nói nếu hỏi)* "À, Drive có thư mục HR — bảng lương, hợp đồng nhân viên. Và hợp đồng giá riêng với từng khách." |
| Cập nhật | "Confluence cập nhật hàng tuần. Drive thì… ai cũng sửa." |
| Sai thì sao | "Không được sai." → *nếu hỏi tiếp:* "Sai về hoàn tiền thì mất tiền. Tháng trước nhân viên mới hoàn nhầm 2.000 USD." |
| Ticket | "Jira, 5 team. Hiện nhân viên tự chọn team, hay chọn nhầm." |
| Quyền | "Ai cũng xem được hết." → *nếu hỏi về nhân viên thử việc / HR:* "…à không, HR thì không." |
| Thành công là gì | "Giảm tải cho support." → *nếu hỏi con số:* "Nếu bot tự trả lời được một nửa số câu lặp lại thì tôi đỡ được 2 người." |
| Thời hạn | "1 tháng, vì tháng sau có buổi họp hội đồng quản trị." |
| Dữ liệu ra nước ngoài | *(chỉ nói nếu hỏi)* "Khách hàng của tôi có hợp đồng yêu cầu dữ liệu không ra khỏi EU." |

Các "bẫy" giấu trong thẻ — người nghe phải tự hỏi ra:
- 🔴 **HR + hợp đồng giá trong Drive** → "mọi tài liệu" sẽ lộ dữ liệu mật (= kịch bản 4 của demo).
- 🔴 **Hoàn nhầm 2.000 USD** → mức chấp nhận sai thực tế cho chủ đề hoàn tiền là rất thấp → cần nguồn + người duyệt.
- 🔴 **Dữ liệu không ra khỏi EU** → loại ngay một số model/provider (nối với câu "đổi model = quyết định security" ở phần trước).
- 🟡 **"Drive ai cũng sửa"** → nguy cơ đầu độc dữ liệu (= kịch bản 5).
- 🟡 **Họp HĐQT tháng sau** → khách cần một thứ **trình bày được** trong 1 tháng — P1 vừa đủ.

### 3.2 Chuẩn bị màn hình

- Bảng trắng / slide trống chia 6 ô theo 6 câu hỏi — điền dần khi người nghe hỏi ra.
- Mở sẵn mục 5 (brief mẫu) để chiếu cuối.

---

## 4. Kịch bản trình bày

Ký hiệu: 🗣 = nói · 🎭 = trainer đóng vai khách · 👉 = chỉ/ghi lên bảng · ❓ = hỏi người nghe · 📌 = câu chốt

### Mở đầu (1 phút)

🗣 "Phần cuối. Giả sử sáng mai khách gọi. Tôi sẽ đóng vai khách — mọi người là team tư vấn của NUS."

🎭 **"Tôi muốn một chatbot đọc mọi tài liệu công ty và tự tạo ticket. Làm trong 1 tháng được không?"**

❓ "Ai sẵn sàng trả lời 'được' ngay?" *(thường sẽ có người gật — không sao)*

### Màn 1 — Cách trả lời sai (2 phút)

🗣 "Giả sử mình nói: *'Được anh, 1 tháng, dùng RAG + agent.'* Một tháng sau demo. Chuyện gì có thể xảy ra?"

👉 Liệt kê nhanh lên bảng (để người nghe đoán trước, rồi bổ sung):
- Bot trả lời nhân viên thử việc **bảng lương của giám đốc** → vì "mọi tài liệu" có thư mục HR.
- Bot trả lời sai chính sách hoàn tiền → nhân viên làm theo → **mất tiền**.
- Bot tạo ticket gán nhầm team → các team khác phàn nàn → **bị tắt sau 1 tuần**.
- Nghiệm thu: khách hỏi "bot đúng bao nhiêu %?" — không ai trả lời được vì **chưa bao giờ thống nhất con số**.

📌 "Với AI, 'làm được' luôn đúng — demo lúc nào cũng chạy. Câu hỏi thật là: **làm cái gì, đúng đến mức nào, an toàn đến đâu**."

### Màn 2 — Hỏi đúng (6 phút) — tương tác

🗣 "Làm lại. Mọi người hỏi tôi — khách ABC. Tôi chỉ trả lời đúng câu được hỏi. Mục tiêu: điền đủ 6 ô."

👉 Chiếu slide "Tư vấn" (6 ô). Ghi câu trả lời của khách vào ô tương ứng khi người nghe hỏi ra.

🎭 Trả lời theo **thẻ khách hàng** (mục 3.1). Chỉ nói thông tin "bẫy" khi được hỏi đúng.

Gợi ý điều phối:
- Nếu người nghe chỉ hỏi về tính năng ("có cần giao diện mobile không?") → 🗣 "Câu đó cần, nhưng ô nào trong 6 ô vẫn trống?"
- Nếu 3 phút chưa ai hỏi về **tài liệu mật** → gợi ý: ❓ "Trong 'mọi tài liệu' có gì mà mình không muốn bot đọc?"
- Nếu chưa ai hỏi **sai thì sao** → gợi ý: ❓ "Nếu bot trả lời sai một câu, chuyện xấu nhất là gì?"
- Nếu ai đó hỏi ra **dữ liệu không ra khỏi EU** → khen ngay: 🗣 "Câu này loại luôn một nửa số model mình vừa chạy ở phần trước."

Sau ~5 phút, 👉 tổng kết bảng:

| Ô | Khách nói lúc đầu | Sau khi hỏi |
|---|---|---|
| User task | "Chatbot" | 12 nhân viên support, câu hỏi lặp lại về quy trình |
| Input/Output | "Trả lời mọi thứ" | Câu hỏi quy trình → câu trả lời **có nguồn**; soạn ticket |
| Dữ liệu | "Mọi tài liệu" | Confluence (sạch) + Drive (có HR, hợp đồng giá, ai cũng sửa) + Jira + email |
| Mức chấp nhận sai | "Không được sai" | Hoàn tiền: gần như 0 (đã mất 2.000 USD). Câu hỏi chung: chấp nhận hơn |
| Quyền | "Ai cũng xem được" | Trừ HR + hợp đồng giá; dữ liệu không ra khỏi EU |
| Tiêu chí | "Giảm tải" | Bot tự trả lời ~50% câu lặp lại (≈ 90 câu/tuần) → đỡ ~2 người |

📌 "Khách không nói dối — khách chỉ không biết cái gì quan trọng với AI. **3 ô quan trọng nhất (dữ liệu, sai, quyền) đều phải hỏi ra mới biết.**"

### Màn 3 — Đề xuất (5 phút)

🗣 "Giờ mình đề xuất. Không phải 'chatbot đọc mọi tài liệu' — mà cái nhỏ nhất chứng minh được giá trị trong 1 tháng."

👉 Chiếu slide "Prototype nhỏ nhất", nói theo ABC:

**P1 — 4 tuần, kịp họp HĐQT:**
- Q&A **chỉ từ Confluence** (nguồn sạch, cập nhật có quy trình). **Không** đụng Drive.
- 12 nhân viên support dùng nội bộ, **không** mở cho khách hàng cuối.
- Mọi câu trả lời **có link nguồn**; chủ đề hoàn tiền → luôn kèm "kiểm tra lại với team billing".
- Model chạy ở provider đáp ứng yêu cầu dữ liệu EU.
- Đo: bộ **50 câu hỏi thật** (khách cung cấp) — mục tiêu ≥ 85% đúng có nguồn; theo dõi % câu nhân viên dùng bot thay vì hỏi đồng nghiệp.

**P2 — sau khi P1 đạt:**
- Bot **soạn nháp** ticket + gợi ý team → **nhân viên duyệt** → mới tạo trong Jira.
- Rule trong code: priority, team hợp lệ (= ④ trong demo).
- Đo: % nháp được duyệt không sửa; 0 ticket sai quyền.

**P3 — chỉ khi P2 ổn:**
- Thêm Drive **sau khi** phân loại tài liệu và áp quyền; HR + hợp đồng giá **không bao giờ** vào index.
- Bộ test quyền: hỏi chéo phòng ban, giả mạo danh tính (= kịch bản 4 của demo) — phải pass 100%.

👉 Nối lại: 🗣 "Demo security lúc nãy chính là P2. Kịch bản giả mạo tenant chính là bộ test của P3. Mình không demo cho vui — đó là cách mình **chứng minh với khách** prototype an toàn."

🗣 "Và câu cuối khi trình bày đề xuất cho khách:"

📌 **"P1 cho anh một con số đo được trong 4 tuần để mang vào họp HĐQT. Còn 'chatbot đọc mọi tài liệu và tự tạo ticket' — mình sẽ đi tới đó, nhưng từng bước, mỗi bước có con số chứng minh. Một demo chạy được không có nghĩa là sẵn sàng cho 300 ticket mỗi tuần."**

### Kết — Solution brief (1 phút)

👉 Chiếu bản brief mẫu (mục 5).

🗣 "Đây là tất cả những gì vừa nói, gói trong 1 trang. Bài đánh giá cuối chương trình làm đúng khung này."

*(Bài đánh giá cuối nói ở speaker notes / lời nói — không ghi lên slide.)*

---

## 5. Solution brief mẫu — Công ty ABC (chiếu cuối phần)

> Số liệu là của khách giả lập trong thẻ khách hàng — không phải số thật.

**1. Bài toán**
- User: 12 nhân viên support của ABC.
- Task: trả lời câu hỏi lặp lại về quy trình (~60% của ~300 ticket/tuần); soạn ticket đúng team.
- Input: câu hỏi tiếng Việt/Anh trong công cụ chat nội bộ. Output: câu trả lời kèm link nguồn; nháp ticket.
- Nếu sai: chủ đề hoàn tiền → mất tiền (đã xảy ra: 2.000 USD); ticket sai team → chậm xử lý.
- Thành công: bot tự trả lời ~50% câu lặp lại (≈ 90 câu/tuần), ≥ 85% đúng có nguồn trên bộ test 50 câu.

**2. Pattern**
- RAG có trích nguồn cho Q&A — không cần agent vì chỉ 1 bước tìm + trả lời.
- Workflow "soạn nháp → người duyệt → tạo" cho ticket — luồng biết trước.
- Agent: chưa dùng ở P1/P2; xem xét khi cần tra nhiều hệ thống.

**3. Agent** — chưa áp dụng (xem Pattern).

**4. MCP** — P2: Jira MCP server chỉ mở `create_ticket_draft` + `list_teams`; thử độc lập bằng MCP Inspector trước khi nối.

**5. Security**
- Quyền: danh tính từ SSO công ty; retrieval filter theo phòng ban ngay khi query.
- Dữ liệu nhạy cảm: HR, hợp đồng giá **không vào index**; log che thông tin khách hàng.
- Approval: mọi ticket qua người duyệt; priority/team kiểm tra bằng code.
- Prompt injection / đầu độc: P1 chỉ dùng Confluence (có quy trình sửa); Drive chỉ vào ở P3 sau khi phân quyền ghi.
- Dữ liệu: model/provider đáp ứng yêu cầu không rời EU.

**6. Kiểm chứng**
- Test case: 50 câu hỏi thật do ABC cung cấp + câu trả lời đúng; 10 câu hỏi chéo quyền (P3).
- Metric: % đúng có nguồn; % câu nhân viên dùng bot; % nháp ticket duyệt không sửa; latency; chi phí/câu.
- Failure mode: trả lời sai hoàn tiền; lộ tài liệu khác phòng ban; ticket sai team.
- Phạm vi prototype: P1 = 4 tuần, Confluence, 12 user nội bộ, read-only.
- Câu hỏi còn chờ khách: ai duyệt bộ 50 câu test? ai sở hữu tài liệu Confluence? ngân sách vận hành/tháng?

---

## 6. Khi tình huống khác dự kiến

| Tình huống | Xử lý |
|---|---|
| Người nghe im lặng, không ai hỏi | Gọi tên 1–2 người; hoặc tự hỏi câu 1 làm mẫu rồi mời người khác hỏi câu tiếp |
| Hỏi ra hết "bẫy" quá nhanh | Khen; rút Màn 2, dành thêm thời gian Màn 3 |
| Sa đà vào kỹ thuật (vector DB nào, model nào) | 🗣 "Câu hay — nhưng khách chưa trả lời được thì chọn gì cũng là đoán. Quay lại 6 ô." |
| Có người cãi "khách muốn agent thì làm agent" | 🗣 "Đề xuất P1 không từ chối agent — nó là bước đầu để khách thấy giá trị và mình thấy rủi ro. Agent ở P3 nếu cần." |
| Hết giờ | Bỏ Màn 1; Màn 2 chỉ hỏi 3 ô cam (dữ liệu, sai, quyền); chiếu brief mẫu |

---

## 7. Câu hỏi hay gặp

**"Khách nhất định đòi 1 tháng có đủ 'đọc mọi tài liệu + tạo ticket'?"**
Đưa 2 phương án: (a) P1 trong 1 tháng, có con số; (b) làm hết trong 1 tháng nhưng ghi rõ rủi ro: chưa có bộ test, chưa phân quyền Drive, chưa có tiêu chí nghiệm thu. Khách chọn — mình ghi lại.

**"Ước lượng effort thế nào khi chưa biết dữ liệu?"**
Ước lượng P1 thôi (phạm vi nhỏ, đã biết). P2/P3 ước lượng sau khi P1 cho thấy chất lượng dữ liệu. Không ước lượng thứ chưa hiểu.

**"85% lấy ở đâu ra?"**
Từ khách — so với mức nhân viên hiện tại và hậu quả khi sai. Con số trong brief mẫu là ví dụ; với khách thật, hỏi "nhân viên mới hiện đúng bao nhiêu %?" rồi đặt mục tiêu quanh đó.

**"Nếu khách không có 50 câu test?"**
Thì việc đầu tiên của P1 là cùng khách **lấy 50 câu từ ticket cũ** (Jira đã có). Không có bộ test = không nghiệm thu được — nói rõ với khách.

**"Có nên cho khách hàng cuối dùng luôn không?"**
Không ở P1. Người dùng nội bộ chịu được sai và báo lại; khách hàng cuối thì không. Mở cho khách cuối là quyết định sau P2, với mức chấp nhận sai riêng.

---

## 8. Tham khảo nhanh

| Màn | Thời gian | Cần |
|---|---|---|
| Mở đầu | 1' | Câu yêu cầu của khách |
| 1 — Trả lời sai | 2' | Bảng trắng: liệt kê hậu quả |
| 2 — Hỏi đúng | 6' | Slide 6 ô + thẻ khách hàng (mục 3.1) |
| 3 — Đề xuất | 5' | Slide "Prototype nhỏ nhất" |
| Kết | 1' | Brief mẫu (mục 5) |

3 câu chốt cần nói được không cần nhìn:
1. "Với AI, 'làm được' luôn đúng. Câu hỏi thật là: làm cái gì, đúng đến mức nào, an toàn đến đâu."
2. "3 ô quan trọng nhất — dữ liệu, sai, quyền — đều phải hỏi ra mới biết."
3. "Một demo chạy được không có nghĩa là sẵn sàng cho 300 ticket mỗi tuần."
