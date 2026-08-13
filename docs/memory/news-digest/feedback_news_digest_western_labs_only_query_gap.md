---
name: feedback_news_digest_western_labs_only_query_gap
description: "news-digest ai topic's 'Google News – AI Model Releases' source query only searched Western labs (Claude/OpenAI/GPT/Gemini), silently excluding DeepSeek/Qwen/other Chinese-lab releases"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 00d344e5-7153-45cc-8086-23b3ad8ff03b
  modified: 2026-08-13T04:01:27.490Z
---

Root cause found 2026-08-13 when user asked why news-digest missed DeepSeek V4 Pro launch (released night of 2026-08-12). `.claude/skills/news-digest/scripts/fetch-news.py` line ~124, the "Google News – AI Model Releases" source used `_gnews("Claude Anthropic OpenAI GPT Gemini model release launch 2026")` — a keyword-filtered Google News search that hardcoded only Western-lab names. DeepSeek, Qwen, Kimi, GLM, MiniMax etc. releases never matched this query, so they never surfaced from that source. This is distinct from [[feedback_news_digest_ai_underused_sources]] (that was a synthesis/selection bug across already-fetched sources; this is a fetch-time query gap — the articles were never even retrieved).

**Why:** The query string picks explicit lab names rather than a topic-level query, so any non-listed lab is invisible regardless of how big the release is. HuggingFace Blog source did carry some DeepSeek retrospective content, but not day-of release coverage.

**How to apply:** First fix (adding "DeepSeek Qwen" to the query) was WRONG per user correction — still an enumerated allowlist, would keep missing the next unlisted lab. Corrected fix: made the query lab-agnostic — `_gnews("new AI model release launch benchmark 2026")` — no company/model names at all, so it structurally can't exclude any lab. Verified via `fetch-news.py ai` — source returns DeepSeek, Meta, Anthropic, OpenAI, Gemini articles all from the one generic query. **Rule: never enumerate specific model/company names in a source query meant to cover "all releases" — genericize the query instead.** Also: news-digest inherently lags same-day breaking releases by ~12-24h since it depends on Google News/RSS indexing, not live scraping — don't expect release-night coverage even after this fix.
