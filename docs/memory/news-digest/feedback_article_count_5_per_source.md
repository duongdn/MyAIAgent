---
name: feedback_article_count_5_per_source
description: "news-digest.md skill self-contradicts on article count (top Usage says 3/source default, 5 with --more; Output Format rules say show ALL fetched) — user confirmed 5/source regardless of --more is correct, 2026-07-23"
metadata:
  type: feedback
  originSessionId: 29ad2457-3f66-4a81-b23e-9bac691e5ac7
  modified: 2026-07-23T02:01:37.070Z
---

The `me:news-digest` skill file has two contradicting instructions: the top "Usage" section says default is 3 articles/source (5 with `--more`), but the "Output Format" → "Rules — chế độ mặc định" section says "Hiển thị TẤT CẢ bài đã fetch (không giới hạn số bài/nguồn)" (show ALL fetched, no per-source limit). With `--limit=100` (the documented default), literal "all" would mean ~2,700+ articles across 9 topics for a topic=all run — wildly impractical and inconsistent with actual historical report sizes (e.g. 2026-07-22's report had 236 articles total across 9 topics, ≈5/source).

**Why:** Asked user directly via AskUserQuestion on 2026-07-23 since this is a real spec contradiction I can't resolve from context alone and the difference in scope is enormous (5/source ≈ 250 articles vs. all ≈ 2,700). User picked "5 per source" — matching both historical practice and the dedup-rule memory's expectation ([[feedback_news_digest_dedup_rule]] says "if a source shows fewer than 5 articles because of dedupDropped, that's expected/correct").

**How to apply:** For every `news-digest` run (default or `--more`), cap each source at 5 articles regardless of the "TẤT CẢ" wording in Output Format rules — treat 5/source as the actual current spec, `--more` only changes summary length (2-3 sentences vs 1) and adds pubDate display, not article count. Don't re-ask the user each run; this is now the settled default. If the user ever wants literal "all articles," they'll need to say so explicitly.
