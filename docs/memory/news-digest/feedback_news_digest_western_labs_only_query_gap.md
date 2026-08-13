---
name: feedback_news_digest_western_labs_only_query_gap
description: "news-digest ai topic's 'Google News – AI Model Releases' source query only searched Western labs (Claude/OpenAI/GPT/Gemini), silently excluding DeepSeek/Qwen/other Chinese-lab releases"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 00d344e5-7153-45cc-8086-23b3ad8ff03b
  modified: 2026-08-13T03:37:11.550Z
---

Root cause found 2026-08-13 when user asked why news-digest missed DeepSeek V4 Pro launch (released night of 2026-08-12). `.claude/skills/news-digest/scripts/fetch-news.py` line ~124, the "Google News – AI Model Releases" source used `_gnews("Claude Anthropic OpenAI GPT Gemini model release launch 2026")` — a keyword-filtered Google News search that hardcoded only Western-lab names. DeepSeek, Qwen, Kimi, GLM, MiniMax etc. releases never matched this query, so they never surfaced from that source. This is distinct from [[feedback_news_digest_ai_underused_sources]] (that was a synthesis/selection bug across already-fetched sources; this is a fetch-time query gap — the articles were never even retrieved).

**Why:** The query string picks explicit lab names rather than a topic-level query, so any non-listed lab is invisible regardless of how big the release is. HuggingFace Blog source did carry some DeepSeek retrospective content, but not day-of release coverage.

**How to apply:** Fixed by adding "DeepSeek Qwen" to the query (now: `"Claude Anthropic OpenAI GPT Gemini DeepSeek Qwen model release launch 2026"`). Verified via `fetch-news.py ai --tag=deepseek` — source now returns DeepSeek articles. If another major lab emerges (Mistral already covered generically, Kimi/Moonshot, MiniMax, Z.ai/GLM), consider adding to this same query rather than creating a new source, per [[feedback_news_digest_new_topic]] guidance only applying to whole new topics, not lab names within an existing topic. Also: news-digest inherently lags same-day breaking releases by ~12-24h since it depends on Google News/RSS indexing, not live scraping — don't expect release-night coverage even after this fix.
