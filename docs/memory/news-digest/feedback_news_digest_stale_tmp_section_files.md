---
name: feedback_news_digest_stale_tmp_section_files
description: 2026-10-05 cron digest shipped July articles — main agent waited on glob count of /tmp/nd-section-*.md, stale files from old runs satisfied it, concatenated before subagents finished
metadata:
  type: feedback
---

2026-10-05 0405 digest (cron on mpfc server) had VN stocks/business sections full of July articles (e.g. "Chứng khoán ngày 9/7", World Cup Ronaldo, vnexpress IDs 5095xxx vs current 5128xxx). fetch-news.py output was fresh — not a fetch/recency bug.

Root cause: run improvised scratch files in shared `/tmp/nd-*`. Waited with `until [ $(ls /tmp/nd-section-*.md | wc -l) -ge 9 ]` → old files from Jul/Aug runs (nd-section-A.md, nd-section-vnstocks.md...) satisfied it instantly → report concatenated + committed 21:10 UTC while vn-business (21:12) and vn-stocks (21:25) subagents still running. Agent even `sed`-patched a stale header date `2026-08-27`→`2026-10-05`.

**Why:** shared /tmp on server accumulates months of leftovers; glob-count waits can't tell old from new.

**How to apply:** skill now requires per-run `$RUN_DIR=/tmp/news-digest-run-{date}-{time}`, wait on 9 exact filenames, header date must equal REPORT_DATE (never sed-fix dates). autorun-news-digest.sh wipes `/tmp/nd-* /tmp/news-digest-* /tmp/news-*.json` before running. When user reports old articles in a digest: check vnexpress article IDs vs live RSS + server `/tmp` leftovers before blaming the recency filter.

[[feedback_news_digest_no_recency_filter_fixed]] [[feedback_news_digest_full_hallucination_incident]]
