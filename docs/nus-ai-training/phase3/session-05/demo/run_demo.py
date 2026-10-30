"""
Demo Session 5 trên terminal (dự phòng khi trang web lỗi). Model thật qua LLM gateway công ty.
In từng bước vòng lặp agent ①–④ (slide 5) do trace_local.py ghi lại.

    python3 run_demo.py rag                    # ① chỉ hỏi: tra tài liệu 1 lần là đủ
    python3 run_demo.py ticket --approve yes   # ② nhiều bước + tạo ticket, người duyệt bấm Đồng ý
    python3 run_demo.py ticket --approve no    # ② người duyệt Từ chối → không có ticket
    python3 run_demo.py "câu hỏi bất kỳ"
"""
import argparse
import asyncio
import os

QUESTIONS = {  # 2 yêu cầu của "Ví dụ trong buổi" (đề cương Session 5) — giống 2 nút trên trang web
    "rag": "Mã lỗi thanh toán E205 nghĩa là gì?",
    "ticket": "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi.",
}


async def main():
    """Input (dòng lệnh): question = "rag" | "ticket" | câu hỏi tự gõ; --approve yes|no
    Output: in câu hỏi, từng bước trace, câu trả lời, số lượt gọi LLM + token, ticket đã tạo."""
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("question", nargs="?", default="rag")
    p.add_argument("--approve", choices=["yes", "no"], default="yes", help="người duyệt trả lời gì khi agent muốn tạo ticket")
    a = p.parse_args()
    os.environ["DEMO_TRACE"] = "1"  # LocalTraceProcessor in từng bước ra màn hình

    import agent_openai_sdk as sdk  # import sau khi đặt DEMO_TRACE

    def ask_human(tool_name, args):
        """Input: tool_name="create_ticket", args={…}. Output: True nếu --approve yes."""
        print(f"   🙋 cần người duyệt {tool_name}{args} → {'ĐỒNG Ý' if a.approve == 'yes' else 'TỪ CHỐI'}")
        return a.approve == "yes"

    question = QUESTIONS.get(a.question, a.question)
    model = sdk.make_model()
    print(f"Agent: OpenAI Agents SDK + {model.model}\n   👤 {question}")
    answer, usage = await sdk.run_agent(model, question, ask_human)
    print(f"   💬 {answer}")
    if usage:
        print(f"   💰 {usage['requests']} lượt gọi LLM, {usage['input_tokens']} input + {usage['output_tokens']} output tokens")
    print(f"   🎫 ticket: {[t['id'] for t in sdk.TICKETS] or 'không có'}")


if __name__ == "__main__":
    asyncio.run(main())
