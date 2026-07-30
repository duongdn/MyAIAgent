---
name: feedback_finance_report_never_construct_urls_and_more_ticker_collisions
description: "During /me:finance-report full run (2026-07-30) drafted placeholder rss?q= URLs instead of real article links (anti-hallucination near-miss); also found FOX (FPT Telecom) collides with US Fox Corp/FOXA, and HPP (Sơn Hải Phòng) picked up unrelated SHB bank articles"
metadata:
  type: feedback
  originSessionId: 2ac9f7f1-c1c8-4a14-8d37-c008b5c80c01
  modified: 2026-07-30T03:06:48.028Z
---

While writing Piece 1 (Focus) and Piece 5 (Candidate) for `/me:finance-report`, drafted markdown links using `https://news.google.com/rss/search?q={ticker}` as a stand-in "good enough" URL for several bullets instead of the actual `link` field from `fetch-finance-news.py`'s JSON — a real instance of the exact anti-hallucination violation the skill explicitly warns against ("KHÔNG được tự tạo URL"), caught only by re-reading my own draft before finalizing, not by any automated check for this skill (no `fix-links.py` equivalent exists for finance-report).

**Why:** With 150+ articles across a Focus/Candidate run, it's tempting to write a "plausible enough" URL from the ticker/query instead of round-tripping to the JSON per bullet, especially under time/token pressure. `fetch-finance-news.py` reuses `fetch_rss`/`_gnews` from news-digest, so real links are always the `CBMi...` Google News hash format — any `rss/search?q=` URL in output is *always* fabricated, never legitimate.

**How to apply:** Before writing any bullet in Piece 1 or Piece 5, keep the ticker's deduped JSON (title→link map) open and copy the `link` field directly — never type or template a URL by hand. After drafting, grep the file for `rss/search` or `rss/articles/` — any hit is fabricated and must be fixed by re-matching against the JSON (fuzzy title match on the non-source-suffix portion works if the exact JSON wasn't kept). Consider building a `fix-links.py`-equivalent for finance-report if this recurs.

**New ticker collisions found (add to the watch-list beyond APH/ADP in [[project_candidate_watchlist_ttl_system]]):**
- **FOX (watchlist, not just candidates!)** — FPT Telecom's ticker collides with **Fox Corp (NASDAQ: FOXA / "FOX")**, the Murdoch US media company. The short "FOX (VN)" query pulled 2/6 "recent" articles that were 100% about Fox Corp US (TradingKey stock-mover posts). This is the first time the collision trap has hit the *permanent* watchlist (`config/finance-watchlist.json`), not just `candidates` — worth flagging in Piece 1 every run until/unless `search_name` is added for FOX too.
- **ADP (candidates)** — confirmed again, collides with **Automatic Data Processing Inc (NASDAQ: ADP)**. `search_name` ("cổ phiếu ADP Sơn Á Đông") is only applied to the "tên đầy đủ" source query — the short "ADP (VN)" source still uses the bare ticker and stays heavily polluted. Same structural gap likely applies to APH's short-query source.
- **HPP (candidates, Sơn Hải Phòng)** — new, unrelated to the usual foreign-ticker pattern: 3/6 articles in the "HPP (VN)" source were about **SHB** (a Vietnamese bank, completely different ticker string) — not an obvious substring/collision explanation, possibly a Google News RSS relevance quirk. Also 1 article "Hanwha Life... rót 200 tỷ vào Quỹ Đầu tư HPP" is ambiguous (could be an unrelated fund named HPP) — flagged but not counted as company news.

**How to apply (collisions):** When drafting Piece 1/Piece 5 for any of FOX, APH, ADP, HPP, treat the short "{TICKER} (VN)" source with suspicion by default — skim titles for obviously non-Vietnamese-stock content (USD prices, "Inc", NASDAQ/NYSE mentions, English-only headlines with no Vietnamese company name) before including. Mark confirmed noise with ⚠️ inline rather than silently dropping it, so the report is auditable.
