---
name: feedback_news_digest_dedup_rule
description: news-digest caps each article at 2 total appearances — now enforced mechanically in fetch-news.py, not by manual grep
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a409e960-91d5-4934-afeb-88d76a5d32e1
  modified: 2026-07-22T02:40:20.714Z
---

Each article (by URL) may appear at most 2 times total, counting occurrences across all previous `*-news-digest.md` reports plus the current one being built — including duplicates across different source feeds within the same run (e.g. the same Google News item syndicated to two different topic sections like "Chứng khoán VN" and "Cổ phiếu").

**Why:** User caught (2026-07-03) that the same article appeared twice in one digest under two source headers. Then on 2026-07-22 user reported some articles had been shown 4-5 times despite the "max 2" rule — investigation found real repeats up to 23x (Krebs on Security, php.net, Substack posts). Root cause: the original fix asked the model to manually grep ~40 historical report files and count URL occurrences before every single run — too expensive/easy to skip, so it was essentially never executed in practice. A rule that only lives in prose/memory and requires a manual multi-file scan every run is not reliable enforcement.

**How to apply (current, 2026-07-22 fix):** The historical 2x cap is now enforced automatically inside `.claude/skills/news-digest/scripts/fetch-news.py` — `_load_url_history()` scans `reports/*/*news-digest*.md`, and `main()` drops any fetched article whose URL already hit 2 appearances before returning JSON. Dropped counts surface as `dedupDropped: N` per source. **Do not re-implement the manual grep-history step — trust the script's filtering.** What still needs manual tracking during synthesis (small, feasible within one report, unlike the 40-file historical scan):
1. Cross-source duplicates WITHIN the current run only (e.g. same Google News item syndicated to two topic sections in the report being built) — maintain one running `seen_urls` set while synthesizing.
2. If a source shows fewer than 5 articles because of `dedupDropped`, that's expected/correct — note the shortfall inline (`_(Chỉ N/5 — ...)_`), don't treat as a fetch error and don't re-fetch it in recheck mode.

See also [[feedback_news_digest_thieu_nguyen_rss_timeout]] for the related Facebook-scraper garbling issue in the AI topic's mandatory sections, which is a separate unresolved problem (not a dedup issue).
