#!/usr/bin/env python3
"""
Fetch latest news per ticker in config/finance-watchlist.json, reusing
news-digest's RSS fetch/parse machinery (same anti-hallucination guarantees:
every article comes straight from a real RSS feed, no synthesis).

Usage:
  python3 fetch-finance-news.py [--limit=N]

Output: JSON { fetchedAt, results: [{ ticker, name, sources: [{ name, url, articles, error }] }] }
"""

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


def load_watchlist():
    with open(WATCHLIST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)["watchlist"]


def sources_for_ticker(ticker: str, name: str) -> list:
    return [
        {
            "name": f"Google News – {ticker} (VN)",
            "url": _gnews(f"cổ phiếu {ticker}", hl="vi", gl="VN"),
        },
        {
            "name": f"Google News – {name} (VN, tên đầy đủ)",
            "url": _gnews(name, hl="vi", gl="VN"),
        },
    ]


def main():
    limit = 20
    for arg in sys.argv[1:]:
        if arg.startswith("--limit="):
            limit = int(arg.split("=", 1)[1])

    watchlist = load_watchlist()
    results = []
    for entry in watchlist:
        ticker = entry["ticker"]
        name = entry["name"]
        sources_out = []
        for src in sources_for_ticker(ticker, name):
            sources_out.append(fetch_rss(src, limit, tag=None))
        results.append({"ticker": ticker, "name": name, "sources": sources_out})

    import datetime
    output = {
        "fetchedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "results": results,
    }
    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
