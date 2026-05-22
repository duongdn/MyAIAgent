---
name: feedback_news_digest_new_topic
description: When /news-digest receives an unknown topic, add it as a NEW topic with proper RSS sources — never map to existing topics
metadata:
  type: feedback
---

When user passes a topic not in the valid list to `/news-digest`, the correct approach is:

1. **Add it as a new topic** in `SOURCES` dict in `.claude/skills/news-digest/scripts/fetch-news.py`
2. **Find relevant RSS feeds** that are specific to that topic (not reusing existing sources)
3. **Update the command doc** at `.claude/commands/news-digest.md` — both `description:` frontmatter and `**Topics:**` line
4. **Run the script** to verify it works, fix any dead feeds
5. **Save memory** so pattern is known for next time

**Why:** Do NOT alias/combine existing topics. Each new topic deserves its own distinct RSS sources that are specifically relevant to it.

**How to apply:** Triggered whenever `/news-digest <unknown-topic>` is called. Before erroring out, check if this is a new topic that should be added to the script.

**Topic added so far:**
- `finance` → Reuters Finance, Yahoo Finance, Google News (finance/banking/economy/central bank, M&A/IPO, crypto)
- `vinfast` → Google News EN ("VinFast electric vehicle EV"), Google News ("VinFast VFS Nasdaq stock"), Google News VN ("VinFast xe điện")
- `security` → The Hacker News (feedburner), Krebs on Security, Bleeping Computer, Google News ("cybersecurity vulnerability CVE exploit 2026")

**RSS source selection guidance:**
- Prefer official/authoritative RSS feeds (Reuters, Yahoo Finance, FT, WSJ, etc.)
- Use `_gnews(query)` helper for Google News RSS with specific search queries
- Aim for 4-5 sources per topic, covering different angles
- Test all feeds — skip dead ones (DNS/connection errors)
