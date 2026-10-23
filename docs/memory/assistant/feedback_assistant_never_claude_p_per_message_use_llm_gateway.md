---
name: assistant-never-claude-p-per-message-use-llm-gateway
description: Never call `claude -p` per message in a daemon — loads project context (~tens of K tokens/call); use internal LLM gateway (deepseek-v4.1-flash)
metadata:
  type: feedback
---
2026-10-23: assistant daemon judged each msg via `claude -p` in repo dir → ~420 calls, huge token burn; user: "stop, ăn token quá". Fixed: OpenAI-compatible gateway https://llm.nustechnology.com/v1 (key in config/.llm-gateway-config.json, encrypted), model deepseek-v4.1-flash, ~1.5K tokens/msg, daily cap policy.maxJudgeCallsPerDay.
**Why:** claude CLI loads CLAUDE.md + MEMORY.md + hooks (~171KB hook output) every call.
**How to apply:** any high-frequency/background LLM call → gateway fetch, short prompt, cap + token counter (cursors llm:calls/llm:tokens:<date>). Estimate per-call cost before running continuously. Related [[assistant_notify_only_relevant_no_store_noise]].
