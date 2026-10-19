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
