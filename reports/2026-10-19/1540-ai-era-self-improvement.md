# Chuẩn bị gì cho thời đại AI — Self-improvement review

**Ngày:** 2026-10-19
**Nguồn dữ liệu:** memory tổng hợp từ nhiều tháng monitor Slack / Matrix-Element / Discord / Email; git `My-AI-Agent` (2.509 commit từ 03/2026); 21 lệnh `me:*`; 40+ thư mục dự án trong `~/projects`.
**Lưu ý:** chưa đọc trực tiếp tin nhắn Slack/Element. Đánh giá dựa trên memory đã tổng hợp.

---

## 1. Vị trí hiện tại — bạn đã đi trước

- **Đã xây một hệ thống AI agent thật**, không chỉ chat với AI:
  - 21 lệnh tự động: daily/weekly/monday report, server/mpfc/bailey monitor, finance, money, news-digest, tax…
  - Tích hợp Slack, Matrix, Discord, Trello, Workstream, Upwork, Jira, Google Sheets
  - Cả nhóm 5 dev PHP + hơn 10 dự án khách hàng được giám sát bằng AI
- **Có nền kỹ thuật (PHP/Laravel) và làm vai trò PM.** Sự kết hợp này rất có giá trị trong thời AI.
- **Đã đi dạy về AI:** có `trainings/`, deck AI training NUS, hướng dẫn OpenSpec cho team.

## 2. Điểm yếu nhìn từ dữ liệu

| # | Vấn đề | Bằng chứng | Rủi ro |
|---|---|---|---|
| 1 | Sửa AI sai bằng tay rất nhiều | 150+ file feedback trong memory ("đừng báo nhầm", "phải verify", "403 giả"…) | Bạn thành người gác chất lượng thủ công, tốn rất nhiều thời gian |
| 2 | Hệ thống phình nhanh, ít được làm gọn | 77% commit là `auto:`; MEMORY.md vượt giới hạn, bị cắt bớt | Chỉ một mình bạn hiểu và vận hành được |
| 3 | Công việc tập trung giám sát người | Kiểm giờ log, 0h, nhắc nhở, Trello gate | AI làm phần này ngày càng rẻ; giá trị PM chuyển sang khách hàng và ra quyết định |
| 4 | Phân tán năng lượng | Công việc + chứng khoán + money + news + thuế + blog | Kiệt sức, không đào sâu được hướng nào |

## 3. Kỹ năng cần chuẩn bị (theo thứ tự ưu tiên)

### 3.1 Đánh giá và kiểm chứng đầu ra AI (evals)
- Bạn đang làm việc này bằng tay qua memory. Hãy biến nó thành test tự động: **mỗi lỗi từng gặp thành một test case**.
- Đây là kỹ năng hiếm và đang được trả giá cao.
- **Việc cụ thể:** chọn `daily-report`, gom 10 lỗi báo nhầm hay gặp nhất → viết script kiểm tra tự động.

### 3.2 Thiết kế hệ thống agent
- Học bài bản: context engineering, memory gọn, tool design, MCP, Claude Agent SDK.
- **Việc cụ thể:** gộp 150+ feedback thành khoảng 20 rule cốt lõi; đưa MEMORY.md về dưới giới hạn.

### 3.3 Hiểu nghiệp vụ và khách hàng
- AI viết code, viết báo cáo được. Nó không tạo được niềm tin với khách hay biết khách thật sự cần gì.
- **Việc cụ thể:** chuyển thời gian từ kiểm giờ dev (đã có AI lo) sang trao đổi với khách, đề xuất cải tiến cho dự án.

### 3.4 Nâng cấp team PHP
- Dạy dev dùng AI coding (Claude Code, spec-driven / OpenSpec).
- Một team biết dùng AI là lợi thế cạnh tranh của công ty, và của chính bạn.
- **Việc cụ thể:** mỗi dev một workflow AI chuẩn; đo thời gian trước/sau.

### 3.5 Đóng gói hệ thống thành sản phẩm hoặc dịch vụ
- Hệ thống "AI PM assistant" có thể dùng lại cho các PM khác ở NUS, hoặc bán cho công ty outsource khác.
- Từ người dùng AI, bạn thành người tạo giá trị bằng AI.

### 3.6 Nền tảng không lỗi thời
- Tư duy hệ thống, giao tiếp tiếng Anh với khách, tài chính cá nhân (đang làm tốt), sức khỏe.

## 4. Tâm lý

- Hoang mang là bình thường. Khách quan mà nói, bạn đang ở nhóm khoảng **5% người dùng AI sâu nhất** trong ngành.
- Rủi ro lớn nhất **không phải bị AI thay thế**, mà là **kiệt sức vì tự tay vận hành quá nhiều thứ**.

## 5. Kế hoạch 3 tháng

| Thời gian | Việc |
|---|---|
| Hàng tuần | 2 giờ cắt bớt/gộp lệnh và memory, **không thêm mới** |
| Tháng 1 | Chọn **một** hướng đào sâu: AI agent/evals **hoặc** PM/khách hàng/kinh doanh |
| Tháng 1–2 | Viết bộ eval đầu tiên cho `daily-report` |
| Tháng 2–3 | Chuyển giao một phần hệ thống cho người khác trong team; tổ chức buổi training AI coding cho dev PHP |

## Câu hỏi còn mở

- Hướng đi tiếp: kỹ thuật (AI engineer/architect) hay quản lý/kinh doanh?
- Có muốn quét trực tiếp Slack/Element 1–3 tháng gần đây không? Mục đích là xem bạn đang tốn thời gian vào việc gì, việc nào lặp lại, việc nào chỉ con người làm được.

---

# PHỤ LỤC — Quét trực tiếp Slack + Element (90 ngày, 2026-07-21 → 2026-10-19)

**Phạm vi:** chỉ tin nhắn **do bạn gửi**. Slack `search from:me` trên 15 workspace đang hoạt động (Amazing Meds bỏ qua vì dự án đã cancel; OhCleo quét bổ sung). Matrix: 151 phòng.
**Tổng:** 6.060 tin (Slack 2.025 · Element 4.102) ≈ **~95 tin/ngày làm việc**, trung bình 78 ký tự/tin.

## A. Thời gian đi đâu

| Kênh | Tin | Bản chất |
|---|---|---|
| Equanimity (Slack) | 530 | Trao đổi trực tiếp khách, bonus/billing, scope |
| OhCleo (Slack, 364 DM với Celine + 43 #cover-art) | 411 | **Làm trực tiếp như dev + support cho khách**: "My report today", sửa server, hướng dẫn API key/credit, chuẩn bị submit Apple/Google |
| Bailey – Paturevision + BA/QC + Mgmt (Element) | 730 | Điều phối team, hỏi tiến độ, chất vấn vượt est |
| Xtreme Soft / Maddy (Slack + Element) | 470 | Trả lời khách, estimate, giải thích kỹ thuật |
| Baamboozle (Slack) | 288 | Post "Today's update", báo PR fixed/deployed |
| Meta-Stamp / Arthur | 144+ | Viết văn bản dài cho khách: warranty vs billable, giải thích fix |
| OhCleo, James, Brad, Marcel, Elena, Wildsoul, Sandor… | 100–250/phòng | Dev hỏi, bạn trả lời/chốt |
| GLOBAL GRAZING (Slack) | 90 | "Report today: • …" thay dev |

**Giờ:** 08–17h, hai đỉnh 9h và 15–16h; ~250 tin sau 18h; 76 tin cuối tuần. Đều 5 ngày, không ngày nào nhẹ.

## B. Phân loại công việc

| Loại | Ước tính | Ví dụ thật | AI làm được? |
|---|---|---|---|
| **Hỏi tiến độ / đòi log giờ** | ~300 tin | "sao rồi mn, hết 8h rồi phải ko????", "task log đủ hết chưa mn?", "update task id nha mn" | ✅ **Gần như toàn bộ** — đã có data Workstream; bot nhắc tự động |
| **Viết daily update / report today cho khách** | ~150 tin | "Report today: • [Prestashop]…", "Today's update: • Fix CSRF…" | ✅ Sinh từ commit/PR/Jira, bạn chỉ duyệt |
| **Báo PR/deploy cho khách** | ~400 | "I've fixed this task on 2 PRs…", "deployed to Nusdev site" | ✅ Template + link PR tự động |
| **Câu trả lời ngắn (OK, ok e, uhm, chính xác)** | ~25% tin | | ⚪ Không tốn nhiều, nhưng là dấu hiệu bị kéo vào mọi luồng |
| **Chất vấn vượt estimate / charge giờ** | ~100 | "Này có vấn đề gì mà vượt est nhiều vậy?", "sao em để charge task e hôm qua vậy" | 🟡 AI phát hiện & soạn câu hỏi; **bạn quyết định** |
| **Estimate, báo giá, thương lượng** | ~200 | "range with clear assumptions, not a committed number", warranty vs billable, xin bonus $150 | 🔴 **Chỉ người làm được** — phán đoán, rủi ro, quan hệ |
| **Root cause / định hướng kỹ thuật cho dev** | ~150 | "abandoned process queue… root cause", "check kĩ log Console", "kiểm tra key bằng flag -v" | 🟡 AI hỗ trợ phân tích; **bạn là người kiểm chứng** |
| **Chọn người, phân task, nhân sự** | ~80 | "đủ task làm tuần này ko? Celine và Maddy?", "start James ngay được ko?" | 🔴 Chỉ người |
| **Suy nghĩ về AI cho team** | rải rác | "lí do gì mà bỏ AI vào nó vẫn ko nhanh hơn nhiều so với trước vậy", MCP training | 🔴 **Đây là chỗ bạn tạo giá trị lớn nhất** |

## C. Phát hiện chính

1. **Bạn đang làm 3–4 vai cùng lúc** (OhCleo cho thấy thêm vai *dev chính + support khách*, 411 tin/90 ngày): PM (điều phối), dev-relay (viết update/PR thay dev cho khách), tech lead (root cause). Vai dev-relay chiếm khoảng 1/3 tin Slack và **dễ tự động nhất**.
2. **Khoảng 40–50% tin nhắn là việc AI làm được**: hỏi tiến độ, nhắc log, viết report today, báo PR. Bạn đã tự động *đọc*, nhưng chưa tự động *viết/gửi* (đúng theo rule không gửi khi chưa xin phép). Bước tiếp theo hợp lý: **AI soạn nháp, bạn bấm duyệt**.
3. **Việc chỉ người làm được** (estimate, thương lượng billing, chọn người, chốt hướng kỹ thuật, câu hỏi "tại sao AI chưa làm team nhanh hơn") chiếm khoảng 25–30% nhưng là phần có giá trị nhất. Nên dồn thời gian vào đây.
4. **Câu hỏi của chính bạn là đề bài đúng:** *"bỏ AI vào vẫn không nhanh hơn nhiều"*. Kỹ năng của thời AI không phải "dùng AI" mà là **thiết kế lại quy trình** để AI tạo ra tốc độ thật (spec rõ → AI code → review → test).
5. **Tín hiệu quá tải:** ~250 tin ngoài giờ, chuỗi "sao rồi mn????", nhiều "OK/ok e". Bạn đang là nút thắt (bottleneck) của mọi phòng.

## D. Đề xuất hành động (cập nhật mục 5)

| Ưu tiên | Việc | Tiết kiệm ước tính |
|---|---|---|
| 1 | **Bot nhắc log/tiến độ tự động** trong phòng Element mỗi project (dùng data Workstream sẵn có) — thay ~300 tin "sao rồi mn" | 30–45 phút/ngày |
| 2 | **Draft "Report today / PR fixed" cho khách** từ Git/Jira → bạn duyệt 1 click | 30 phút/ngày |
| 3 | **Dev tự post update cho khách** (đào tạo + template), bạn chỉ giám sát | Giảm vai dev-relay |
| 4 | **Alert vượt estimate** tự soạn câu hỏi cho dev (bạn đã chất vấn tay nhiều lần) | 15 phút/ngày |
| 5 | Dùng thời gian lấy lại: estimate/sales, thiết kế quy trình AI coding cho team, giải câu hỏi "vì sao AI chưa làm team nhanh hơn" | → kỹ năng mục 3.2–3.4 |

**Kết luận:** dữ liệu xác nhận đánh giá trước. Bạn không thiếu kỹ năng AI. Bạn thiếu **thời gian cho phần chỉ con người làm được**, vì đang tự tay làm phần mà AI làm được.

## Câu hỏi còn mở (phụ lục)

- Muốn bắt đầu từ đề xuất D.1 (bot nhắc) hay D.2 (draft report cho khách)?
