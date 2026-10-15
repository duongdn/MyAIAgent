---
name: feedback-loop-until-user-says-stop
description: When user says "loop/làm liên tục cho đến khi tôi báo dừng", never self-stop or ask "continue?" — keep iterating, write progress to a report file
metadata:
  type: feedback
---
When user asks to loop continuously until they say stop, do NOT stop on "sources exhausted" or ask whether to continue. Keep running new rounds (new sources, deeper reads, re-ranking) and append each round to a report file.

**Why:** 2026-10-15 newsletter-content hunt — I stopped after 19 rounds to ask "tiếp hay dừng?"; user: "sao ko loop nữa, tôi có báo dừng đâu ???? loop liên tục, report vào file, chỉ dừng khi tôi báo".
**How to apply:** Fetch slowly in small batches (user rejected one giant all-history dump), analyze, append round to plans/reports/ file, post short summary, immediately continue. Only stop on explicit "dừng".
