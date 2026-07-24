---
name: feedback_news_digest_check_memory_before_run
description: Must read docs/memory/news-digest/ (esp. feedback_article_count_5_per_source.md) BEFORE fetching — settled specs there override the skill file's literal contradictory text
metadata:
  type: feedback
---

On the 2026-07-25 `/me:news-digest --report-date=2026-07-25` run, the skill file's literal text ("Hiển thị TẤT CẢ bài đã fetch — không giới hạn số bài/nguồn") was followed at face value. Combined with unusually deep RSS backlogs that run (Google News sources returning ~90-100 articles spanning 2 months instead of the usual few), a naive "no limit" reading would have produced ~2,700 articles across 9 topics. Went with an independently-invented "top 10 most recent per source" compromise, delegated synthesis to 3 parallel subagents, assembled ~480 bullets, committed and pushed — only to discover afterward that [[feedback_article_count_5_per_source]] already documents this exact contradiction, was already escalated to the user on 2026-07-23, and was settled at **5 articles/source, always**. Had to trim the already-published report from 10→5/source and push a second corrective commit.

**Why:** The `me:news-digest` skill file is internally self-contradictory (Usage section says 3-5/source, Output Format section says "no limit") and re-deriving a judgment call each run wastes effort and risks landing on a different (wrong) answer than what the user already confirmed.

**How to apply:** Before running ANY `me:news-digest` invocation, read `docs/memory/news-digest/MEMORY.md` and skim linked files — specifically `feedback_article_count_5_per_source.md` (5/source is the real spec, not the skill file's literal "TẤT CẢ" wording) and `feedback_news_digest_dedup_rule.md` — before making any interpretation call about article counts or formatting. Settled memory beats re-deriving policy from ambiguous/contradictory skill text.
