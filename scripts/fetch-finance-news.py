#!/usr/bin/env python3
"""
Fetch latest news per ticker in config/finance-watchlist.json, reusing
news-digest's RSS fetch/parse machinery (same anti-hallucination guarantees:
every article comes straight from a real RSS feed, no synthesis).

Usage:
  python3 fetch-finance-news.py [--limit=N] [--group=watchlist|candidates|all]

--group selects which list to fetch:
  watchlist  (default) permanent tracked tickers -> report Piece 1 (Focus)
  candidates temporary tickers with a TTL        -> report Piece 4 (Candidate)
  all        both, tagged by `group` in each result

Output: JSON { fetchedAt, results: [{ ticker, name, group, ttl..., sources: [...] }] }
"""

import datetime
import json
import os
import sys
import urllib.parse

import importlib.util

_PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
_FETCH_NEWS_PATH = os.path.join(_PROJECT_ROOT, ".claude", "skills", "news-digest", "scripts", "fetch-news.py")

# fetch-news.py has a hyphen in its filename, so it can't be imported with a plain
# `import` statement (not a valid Python module name) — load it by file path instead.
_spec = importlib.util.spec_from_file_location("fetch_news_lib", _FETCH_NEWS_PATH)
fetch_news_lib = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(fetch_news_lib)
fetch_rss = fetch_news_lib.fetch_rss
_gnews = fetch_news_lib._gnews

WATCHLIST_PATH = os.path.join(_PROJECT_ROOT, "config", "finance-watchlist.json")


def load_config():
    with open(WATCHLIST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def load_watchlist():
    return load_config()["watchlist"]


def load_candidates(cfg=None):
    """Return candidate entries enriched with TTL fields (expires/days_left/expired).

    A candidate is never auto-removed — once past its TTL the report surfaces it
    for an explicit keep-or-drop decision, so expired items are still returned.
    """
    cfg = cfg or load_config()
    block = cfg.get("candidates") or {}
    ttl_days = int(block.get("ttl_days", 7))
    today = datetime.date.today()
    out = []
    for item in block.get("items", []):
        if item.get("status") == "dropped":
            continue
        entry = dict(item)
        added = datetime.date.fromisoformat(item["added"])
        expires = added + datetime.timedelta(days=ttl_days)
        entry["ttl_days"] = ttl_days
        entry["expires"] = expires.isoformat()
        entry["days_left"] = (expires - today).days
        entry["expired"] = today >= expires
        out.append(entry)
    return out


def sources_for_ticker(ticker: str, name: str, search_name: str = None) -> list:
    """Build the two Google News queries per ticker.

    `search_name` overrides the query text when the display name alone is too
    generic (e.g. "Sơn Đồng Nai" collides with the province name) — the display
    name stays clean while the query gets narrowed.
    """
    query_name = search_name or name
    return [
        {
            "name": f"Google News – {ticker} (VN)",
            "url": _gnews(f"cổ phiếu {ticker}", hl="vi", gl="VN"),
        },
        {
            "name": f"Google News – {query_name} (VN, tên đầy đủ)",
            "url": _gnews(query_name, hl="vi", gl="VN"),
        },
    ]


def fetch_entries(entries, limit, group):
    results = []
    for entry in entries:
        ticker = entry["ticker"]
        name = entry["name"]
        sources_out = []
        for src in sources_for_ticker(ticker, name, entry.get("search_name")):
            sources_out.append(fetch_rss(src, limit, tag=None))
        row = {"ticker": ticker, "name": name, "list": group, "sources": sources_out}
        # Carry TTL/decision metadata through so the report can render it verbatim.
        for key in ("group", "exchange", "added", "expires", "days_left", "expired", "status", "note"):
            if key in entry:
                row[key] = entry[key]
        results.append(row)
    return results


def main():
    limit = 20
    group = "watchlist"
    for arg in sys.argv[1:]:
        if arg.startswith("--limit="):
            limit = int(arg.split("=", 1)[1])
        elif arg.startswith("--group="):
            group = arg.split("=", 1)[1]

    if group not in ("watchlist", "candidates", "all"):
        print(f"Unknown --group={group} (use watchlist|candidates|all)", file=sys.stderr)
        sys.exit(1)

    results = []
    if group in ("watchlist", "all"):
        results += fetch_entries(load_watchlist(), limit, "watchlist")
    if group in ("candidates", "all"):
        results += fetch_entries(load_candidates(), limit, "candidates")

    output = {
        "fetchedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "results": results,
    }
    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
