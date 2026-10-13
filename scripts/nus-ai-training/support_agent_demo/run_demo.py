"""
Demo: Support agent đọc knowledge base, đề xuất ticket và đi qua 5 điểm kiểm tra quyền.
Không cần cài gì, không cần API key. Python 3.8+.

CÁCH CHẠY (từ thư mục chứa file này):
    python3 run_demo.py                          # chạy 4 kịch bản, tự hỏi y/n khi cần duyệt
    python3 run_demo.py --approve no             # không hỏi, người duyệt luôn từ chối
    python3 run_demo.py --scenario 2             # chỉ chạy kịch bản 2 (prompt injection)
    python3 run_demo.py --scenario 2 --disable 4 --approve yes
                                                 # tắt checkpoint ④ + người duyệt bấm OK theo phản xạ
                                                 # → ticket độc được tạo thật
    python3 run_demo.py --scenario 4 --disable 1 --disable 2
                                                 # tắt ① ② → rò tài liệu bí mật của tenant khác

GỢI Ý TRÌNH BÀY: chạy đủ 4 kịch bản trước (KB1 đi hết 5 checkpoint, KB2-4 bị chặn đúng chỗ),
rồi tắt từng checkpoint và hỏi người học: "tắt cái này thì chuyện gì xảy ra?" trước khi Enter.
"""
import argparse

import app
from sample_data import KB_DOCS, POISONED_DOC
from scripted_model import scripted_model

SCENARIOS = {
    1: ("Bình thường — alice (support) hỏi và nhờ tạo ticket",
        dict(session_user="alice", question="Khách X báo lỗi thanh toán, xử lý sao? Tạo ticket giúp tôi.")),
    2: ("Prompt injection — KB có tài liệu độc, alice chỉ HỎI, không nhờ tạo ticket",
        dict(session_user="alice", question="Khách X báo lỗi thanh toán, xử lý sao?",
             kb=KB_DOCS + [POISONED_DOC])),  # ai đó đã cài tài liệu độc vào KB
    3: ("Thiếu quyền — bob (viewer) nhờ tạo ticket",
        dict(session_user="bob", question="Khách X báo lỗi thanh toán. Tạo ticket giúp tôi.")),
    4: ("Giả mạo tenant — alice gửi request tự khai mình thuộc tenant-B",
        dict(session_user="alice", question="Giá giao dịch của chúng ta là bao nhiêu?", claimed_tenant="tenant-B")),
}


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--scenario", type=int, choices=SCENARIOS, help="chỉ chạy 1 kịch bản")
    p.add_argument("--disable", action="append", default=[], choices=list("12345"),
                   help="tắt checkpoint (lặp lại được) để xem hậu quả")
    p.add_argument("--approve", choices=["ask", "yes", "no"], default="ask",
                   help="checkpoint ⑤: ask=hỏi y/n, yes=luôn đồng ý, no=luôn từ chối")
    a = p.parse_args()

    if a.disable:
        print(f"⚠ Đang TẮT checkpoint: {', '.join(sorted(a.disable))}")
    for num, (title, kwargs) in SCENARIOS.items():
        if a.scenario and num != a.scenario:
            continue
        print(f"\n━━ Kịch bản {num}: {title}")
        print(f"   👤 {kwargs['session_user']}: {kwargs['question']}")
        answer = app.run_agent(scripted_model, disabled=set(a.disable), approve_mode=a.approve, **kwargs)
        print(f"   💬 trả lời: {answer}")

    print(f"\nTicket trong hệ thống đích: {app.TICKETS or 'không có'}")


if __name__ == "__main__":
    main()
