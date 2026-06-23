---
name: feedback-news-digest-use-actual-links
description: "news-digest article links must come from JSON link field, never fabricated — automated fix-links.py handles both bare-domain and Google News /rss/ links"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 27c119ac-91b5-49a8-a8cf-f7d303db3b9a
---

ALWAYS use the `link` field from the fetched JSON article data. NEVER fabricate URLs.

**Root causes (both now permanently fixed):**

**Bug 1 — Bare-domain URLs** (`https://vnexpress.net`, `https://cafef.vn`):
LLM sees title "Headline - PublisherName" and silently swaps in publisher homepage instead of real article URL.

**Bug 2 — Google News /rss/articles/ links** (`https://news.google.com/rss/articles/CBMi...?oc=5`):
These require JavaScript to redirect. In some markdown viewers / contexts, clicking the `/rss/` variant does NOT redirect to the actual article. Confirmed by gnews library source: only `/articles/CBMi...` (without `rss/`, without `?oc=5`) reliably triggers the browser JS redirect.

**Permanent automated fix (implemented 2026-06-23):**

1. `fetch-news.py` now converts Google News links at fetch time:
   - `/rss/articles/CBMi...?oc=5` → `/articles/CBMi...` (no rss/, no ?oc=5)
   - Cache auto-saved to `/tmp/news-digest-cache.json` after every fetch

2. `fix-links.py` runs after writing markdown (MANDATORY per news-digest.md):
   ```bash
   python3 .claude/skills/news-digest/scripts/fix-links.py reports/{YYYY-MM-DD}/{HHMM}-news-digest.md
   ```
   - Pass 1: converts any remaining `/rss/articles/` links to `/articles/` format
   - Pass 2: replaces bare-domain URLs with correct article URLs from JSON cache using position-based matching
   - Retroactively fixed 494 broken links across 17 historical reports

**How to apply:**
- After saving news digest markdown, ALWAYS run fix-links.py (already in news-digest.md workflow)
- If fix-links.py reports fixes > 0 before the usual bare-domain check — this is normal; the /rss/ conversion is Pass 1
- Do NOT manually retype Google News long base64 URLs — they will be wrong; let fix-links.py handle it
- If `/tmp/news-digest-cache.json` is missing (e.g. cron ran `--no-cache`), fix-links.py skips Pass 2 gracefully but still does Pass 1 (/rss/ conversion)

**Why:** Violated on 06-12, 06-15, 06-17, 06-23. Fix is now automated, not reliant on LLM copy-paste accuracy.
