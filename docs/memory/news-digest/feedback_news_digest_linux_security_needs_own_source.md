---
name: feedback_news_digest_linux_security_needs_own_source
description: 2026-10-30 user upset digest missed Linux security issues — generic security feeds (5 items each) crowded out kernel CVEs; added "Google News – Linux Security" source
metadata:
  type: feedback
---

User (2026-10-30): "sao news-digest ko fetch được issue security của Linux !!!". Digest had only the TCP 9.8 CVE; missed public root exploit for unpatched kernel, CISA KEV Linux kernel add, Fragnesia chain. Feeds had them, but 5-per-source cap + no Linux-specific source crowded them out.

**Fix:** security topic now has `Google News – Linux Security` (`linux kernel vulnerability OR exploit OR CVE when:7d`).

**How to apply:** Linux source kept, but user said the real issue is priority — see [[feedback_news_digest_pick_by_importance_not_feed_order]].

[[feedback_article_count_5_per_source]] [[feedback_news_digest_45day_window_let_old_gnews_through]]
