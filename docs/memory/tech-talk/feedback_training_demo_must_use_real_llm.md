---
name: feedback_training_demo_must_use_real_llm
description: NUS AI training demos must use a real LLM, never a scripted/simulated model that forces the outcome
metadata:
  type: feedback
---

User rejected a demo where the "model" was scripted to always fall for prompt injection ("này là mình đang cố ý code cho nó theo hướng mình, ko ok, làm 1 cái demo thực sự với ai thật đi").

**Why:** Audience = very experienced devs; a rigged model proves nothing. Real results also taught more: Claude resisted obvious injection but fell for subtle "policy-looking" poisoned data.

**How to apply:** Build training demos on a real agent. No API keys on this machine (no OpenAI/Gemini key; Vertex AI disabled on daily-agent-490610) → use Claude Agent SDK (`claude-agent-sdk`), which runs on the logged-in Claude Code account. Report actual model behavior; if model resists, say so rather than tuning data to force a failure. Demo: `scripts/nus-ai-training/support_agent_demo/`. Related: [[project_nus_ai_training_part5_status]].
