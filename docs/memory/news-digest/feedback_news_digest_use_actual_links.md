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

**Bug 3 — cache overwrite across topic calls, and mid-path truncation (found 2026-07-06):**

`fetch-news.py` wrote `/tmp/news-digest-cache.json` unconditionally on every call — `cache_path = save_cache or CACHE_FILE` always resolved to the same file even without `--save-cache`. Since the `all` workflow runs the script once per topic (9 sequential calls — see SKILL.md, a single `all` call returns ~1.8MB and blows the context window), each call overwrote the cache. By the time `fix-links.py` ran once at the end, only the LAST topic's data (`security`, last in the SKILL.md list) survived — every other topic's broken links were silently unfixable.

Also newly observed: the LLM's link-dropping failure mode evolved from whole bare-domain (Bug 1) to **mid-path truncation** — writing a real-looking but cut-off URL, e.g. `vnexpress.net/gia-xang-dau-giam-manh-dia-com-to-pho-van-khong-giam-gia-nhie` (missing the tail + numeric ID). `fix-links.py`'s old `is_bare_domain` regex only matched full bare domains, not this.

**Fixes applied 2026-07-06:**
1. `fetch-news.py`: cache write now MERGES `output["results"]` into any existing cache file (keyed by topic, replacing only the topics just fetched) instead of overwriting.
2. `fix-links.py`: `fix_section` now replaces the position-matched URL whenever it differs from the cache's URL for that slot (bare-domain OR same-domain-but-different — the truncation case), not just when the URL is fully bare.

**How to apply:** If user reports broken/truncated links again after a run using the 9-separate-topic-call pattern, first check whether `fetch-news.py`'s merge logic and `fix-links.py`'s truncation detection are still in place (`git log`/`git blame` these two files) before re-diagnosing from scratch — this exact bug class is now supposed to be closed.

**⚠️ CRITICAL CAVEAT — do NOT re-run `fix-links.py` against an OLD report with a FRESHLY re-fetched cache.** Position-based matching only works if the cache's article order matches the order at write-time. Confirmed by direct experiment 2026-07-06: re-fetching all 9 topics ~6.5h after the original digest and running `fix-links.py` against the old report **silently swapped in wrong articles** (e.g. a CNBC "SpaceX IPO" headline got paired with a "museum opens in Boston" URL) — live RSS feeds had published newer articles, shifting every position. `fix-links.py` is only safe when the cache comes from the SAME fetch session as the markdown it's fixing (the normal in-workflow use). For fixing an OLD report's broken links after the fact:
1. HTTP-check every URL (`curl -s -o /dev/null -w "%{http_code}"`) to find real 4xx — don't trust regex heuristics alone (bare-domain/truncation patterns miss things like reused/duplicate Google News tokens, and some genuinely-broken URLs look well-formed).
2. Treat 401/403 as likely anti-bot/paywall blocking (marketwatch, openai.com, krebsonsecurity.com all do this) — verify by checking if the URL appears verbatim in a fresh cache/search rather than assuming it's dead.
3. For confirmed-dead non-Google URLs (404 on both curl and WebFetch), fix by searching a freshly fetched cache/web search for the exact TITLE (not position) to recover the correct URL — the same-day slug is usually stable even if RSS order isn't.
4. For confirmed-dead Google News tokens (400 = malformed token) where the true token can't be recovered without the original session's cache, fall back to `https://news.google.com/search?q=<url-encoded headline>&hl=vi` — always resolves, avoids fabricating a wrong specific URL.
