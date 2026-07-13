---
name: feedback_news_digest_thieu_nguyen_rss_timeout
description: "Thiệu Nguyễn source(s) repeatedly showed empty/missing/sparse in news-digest AI section across 4 separate incidents — final root cause: fetch-news.py must run under .claude/skills/.venv/bin/python3, or the FB cookie-refresh silently no-ops (ImportError swallowed) and looks exactly like a dead session. Trimmed 2026-07-13 (was a very long blow-by-blow investigation log)."
metadata:
  node_type: memory
  type: feedback
  originSessionId: efa6becf-d110-4d65-baf1-63ee4f6b601e
---

Four separate incidents (2026-06-24 through 2026-07-02) where the Thiệu Nguyễn AI-news section came back empty/missing/sparse, each with a DIFFERENT root cause — don't rubber-stamp a new occurrence with an old explanation:

1. **2026-06-24 — RSS timeout.** `fetch_rss()`'s `urllib.request.urlopen` had `timeout=10`; rss.app's dynamic render sometimes exceeds that. Fixed: timeout raised to 20s + 1 retry.
2. **2026-07-01 — rss.app quota exhausted (HTTP 402).** Replaced with `scripts/facebook-page-scraper.js` (puppeteer persistent-profile). Added a 4th independent source: Thiệu Nguyễn Substack feed (plain RSS, no login).
3. **2026-07-02 — spec gap, not a fetch failure.** All 4 sections fetched fine but were silently dropped from the saved report because the command's MANDATORY section list only named 3 of them. Fixed: all 4 now explicit MANDATORY sections in `.claude/commands/me/news-digest.md`, plus a hard post-save verification (grep the 4 required headers, fix before proceeding if count < 4).
4. **2026-07-02 — FB scraper stuck at 1 post/source.** Extensive investigation (stealth puppeteer, warm-up navigation, cookie/account-switcher screen) initially concluded the FB session was "dead server-side" and needed interactive human re-login. **This conclusion was WRONG.** Actual root cause: `_refresh_fb_cookies()` requires `browser_cookie3`, only installed in `.claude/skills/.venv` — every test run used bare `python3` (no `browser_cookie3`), so the refresh silently no-op'd (`except Exception: pass` swallowed the `ImportError`) and `tmp/fb-cookies.json` never actually updated, producing the same stale 1 post every time. Once run under the correct venv interpreter, the "dead" session turned out to be fully alive — full authenticated feed, no login wall.

**Two more bugs found once the session was correctly authenticated:**
- FB virtualizes the feed DOM (posts unmount after scrolling past) — old scraper extracted once at the end and only ever saw the final leftover post. Fixed: extract at every scroll checkpoint, merge into a link-keyed map across the session.
- Authenticated pages' post links carry `comment_id`/`reply_comment_id` params that the old code excluded as "not clean post links" — fine on a degraded preview session, but excludes everything on a real one. Fixed: strip those params instead of rejecting the link, dedup by resulting canonical link + a content-text fingerprint.

**Fix applied (the one that matters long-term):** `.claude/commands/me/news-digest.md` — every `fetch-news.py`/`fix-links.py`/`trello-complete.py` invocation now explicitly uses `.claude/skills/.venv/bin/python3`, never bare `python3`. This applies to cron too.

**How to apply:** If a Thiệu Nguyễn (or any `.claude/skills/`-based script) source shows empty again, check in this order: (1) is a real fetch error being returned (transient), (2) is the report file missing the section header despite the fetch working (spec/synthesis gap), (3) is the data garbage/stale (scraper logic bug), (4) **is the script actually running under `.claude/skills/.venv/bin/python3`** — a silently-swallowed `ImportError` from the wrong interpreter can look exactly like a dead remote session and waste hours chasing the wrong fix, as it did here.

See [[feedback_news_digest_ai_underused_sources]].
