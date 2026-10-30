"""
Dữ liệu mẫu cho demo Session 5: knowledge base (KB) của team support.
Hệ thống thật: tài liệu nằm trong vector DB (Session 3–4); ở đây là list Python cho dễ đọc.
"""

KB_DOCS = [
    {
        "id": "kb-001",
        "title": "Xử lý lỗi thanh toán thẻ",
        "content": "Nếu khách báo lỗi thanh toán: kiểm tra mã lỗi cổng thanh toán, "
                   "yêu cầu khách thử lại sau 15 phút, nếu vẫn lỗi thì tạo ticket cho billing-team.",
    },
    {
        "id": "kb-002",
        "title": "Danh sách mã lỗi cổng thanh toán",
        "content": "E101 = thẻ hết hạn, E205 = ngân hàng từ chối, E999 = lỗi phía cổng thanh toán.",
    },
    {
        "id": "kb-003",
        "title": "Đặt lại mật khẩu tài khoản",
        "content": "Hướng dẫn khách bấm 'Quên mật khẩu' ở trang đăng nhập, link đặt lại có hiệu lực 30 phút.",
    },
]
