#!/usr/bin/env python3
"""
Fetch news digest by topic and optional tag filter.

Usage:
  python3 fetch-news.py [topic] [--tag=xxx] [--limit=N]

Topics:
  all         All topics (default)
  stocks      Global stock market / indices / trading
  vn-stocks   Vietnamese securities / chứng khoán
  vn-business Vietnamese business / economy / doanh nghiệp
  ai          AI / machine learning news (VN + global)
  it          IT / tech / software news (VN + global)
  security    Cybersecurity news (VN + global)
  finance     Finance: banking, economy, central banks, M&A, crypto (VN + global)

Options:
  --tag=xxx  Filter articles whose title or description contains xxx (case-insensitive, word-boundary for short tags)
  --limit=N  Max articles per source (default: 100)

Output: JSON { topic, tag, fetchedAt, results: [{ topic, sources: [{ name, url, articles, error }] }] }
"""

import html
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from typing import Optional


# ── Google News RSS builder ───────────────────────────────────────────────────

def _gnews(query: str, hl: str = "en", gl: str = "US") -> str:
    return (
        f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}"
        f"&hl={hl}&gl={gl}&ceid={gl}:{hl}"
    )


# ── RSS Sources by topic ──────────────────────────────────────────────────────

SOURCES = {
    "stocks": [
        {
            "name": "CNBC Markets",
            "url": "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664",
        },
        {
            "name": "MarketWatch",
            "url": "https://feeds.content.dowjones.io/public/rss/mw_topstories",
        },
        {
            "name": "Google News – Stock Market",
            "url": _gnews("stock market today"),
        },
        {
            "name": "Google News – S&P 500 / Nasdaq",
            "url": _gnews("S&P 500 Nasdaq"),
        },
    ],
    "vn-stocks": [
        {
            "name": "Google News – Chứng khoán VN",
            "url": _gnews("chứng khoán Việt Nam VN-Index", hl="vi", gl="VN"),
        },
        {
            "name": "Google News – Cổ phiếu",
            "url": _gnews("cổ phiếu thị trường chứng khoán", hl="vi", gl="VN"),
        },
        {
            "name": "Google News – Tài chính VN",
            "url": _gnews("tài chính đầu tư Việt Nam", hl="vi", gl="VN"),
        },
    ],
    "ai": [
        {
            "name": "Google News – AI Việt Nam",
            "url": _gnews("trí tuệ nhân tạo AI công nghệ", hl="vi", gl="VN"),
        },
        {
            "name": "TechCrunch AI",
            "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
        },
        {
            "name": "The Verge – AI",
            "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
        },
        {
            "name": "OpenAI News",
            "url": "https://openai.com/news/rss.xml",
        },
        {
            "name": "Google DeepMind Blog",
            "url": "https://deepmind.google/blog/rss.xml",
        },
        {
            "name": "Google Blog – AI",
            "url": "https://blog.google/innovation-and-ai/technology/ai/rss/",
        },
        {
            "name": "Hugging Face Blog",
            "url": "https://huggingface.co/blog/feed.xml",
        },
        {
            "name": "MIT Technology Review",
            "url": "https://www.technologyreview.com/feed/",
        },
        {
            "name": "Google News – AI Model Releases",
            "url": _gnews("Claude Anthropic OpenAI GPT Gemini model release launch 2026"),
        },
        {
            "name": "Google News – AI",
            "url": _gnews("artificial intelligence LLM generative AI"),
        },
    ],
    "it": [
        {
            "name": "VnExpress – Số hóa",
            "url": "https://vnexpress.net/rss/so-hoa.rss",
        },
        {
            "name": "Tuổi Trẻ – Nhịp sống số",
            "url": "https://tuoitre.vn/rss/nhip-song-so.rss",
        },
        {
            "name": "Google News – Công nghệ VN",
            "url": _gnews("công nghệ thông tin phần mềm lập trình", hl="vi", gl="VN"),
        },
        {
            "name": "Hacker News",
            "url": "https://news.ycombinator.com/rss",
        },
        {
            "name": "TechCrunch",
            "url": "https://techcrunch.com/feed/",
        },
        {
            "name": "Ars Technica",
            "url": "https://feeds.arstechnica.com/arstechnica/index",
        },
        {
            "name": "Wired",
            "url": "https://www.wired.com/feed/rss",
        },
        {
            "name": "Google News – Tech",
            "url": _gnews("technology software engineering"),
        },
    ],
    "security": [
        {
            "name": "Google News – An ninh mạng VN",
            "url": _gnews("an ninh mạng bảo mật an toàn thông tin", hl="vi", gl="VN"),
        },
        {
            "name": "The Hacker News",
            "url": "https://feeds.feedburner.com/TheHackersNews",
        },
        {
            "name": "Krebs on Security",
            "url": "https://krebsonsecurity.com/feed/",
        },
        {
            "name": "Bleeping Computer",
            "url": "https://www.bleepingcomputer.com/feed/",
        },
        {
            "name": "Google News – Cybersecurity",
            "url": _gnews("cybersecurity vulnerability CVE exploit 2026"),
        },
    ],
    "vinfast": [
        {
            "name": "Google News – VinFast EN",
            "url": _gnews("VinFast electric vehicle EV"),
        },
        {
            "name": "Google News – VinFast VFS stock",
            "url": _gnews("VinFast VFS Nasdaq stock"),
        },
        {
            "name": "Google News – VinFast VN",
            "url": _gnews("VinFast xe điện", hl="vi", gl="VN"),
        },
    ],
    "vn-business": [
        {
            "name": "VnExpress – Kinh doanh",
            "url": "https://vnexpress.net/rss/kinh-doanh.rss",
        },
        {
            "name": "Tuổi Trẻ – Kinh doanh",
            "url": "https://tuoitre.vn/rss/kinh-doanh.rss",
        },
        {
            "name": "Thanh Niên – Kinh tế",
            "url": "https://thanhnien.vn/rss/kinh-te.rss",
        },
        {
            "name": "Google News – Kinh doanh VN",
            "url": _gnews("kinh doanh doanh nghiệp Việt Nam khởi nghiệp startup", hl="vi", gl="VN"),
        },
    ],
    "php": [
        {
            "name": "Laravel News",
            "url": "https://laravel-news.com/feed",
        },
        {
            "name": "PHP.net News",
            "url": "https://www.php.net/feed.atom",
        },
        {
            "name": "Reddit r/PHP",
            "url": "https://www.reddit.com/r/PHP/.rss",
        },
        {
            "name": "php[architect]",
            "url": "https://www.phparch.com/feed/",
        },
        {
            "name": "Google News – PHP Laravel",
            "url": _gnews("PHP Laravel Symfony backend web development 2026"),
        },
    ],
    "finance": [
        {
            "name": "CafeF – Tài chính",
            "url": "https://cafef.vn/tai-chinh-ngan-hang.rss",
        },
        {
            "name": "VnExpress – Kinh tế",
            "url": "https://vnexpress.net/rss/kinh-te.rss",
        },
        {
            "name": "Google News – Tài chính VN",
            "url": _gnews("tài chính ngân hàng lãi suất kinh tế Việt Nam", hl="vi", gl="VN"),
        },
        {
            "name": "Reuters Finance",
            "url": "https://feeds.reuters.com/reuters/businessNews",
        },
        {
            "name": "Yahoo Finance",
            "url": "https://finance.yahoo.com/news/rssindex",
        },
        {
            "name": "Google News – Global Finance",
            "url": _gnews("finance banking economy central bank interest rate"),
        },
        {
            "name": "Google News – M&A / IPO",
            "url": _gnews("merger acquisition IPO valuation 2026"),
        },
        {
            "name": "Google News – Crypto",
            "url": _gnews("bitcoin ethereum crypto blockchain 2026"),
        },
    ],
}


# ── Helpers ───────────────────────────────────────────────────────────────────

def _strip_html(text: str) -> str:
    text = html.unescape(text or "")
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _find_text(el, *paths, default="") -> str:
    for path in paths:
        found = el.find(path)
        if found is not None and found.text:
            return found.text.strip()
    return default


def _tag_matches(tag: str, haystack: str) -> bool:
    """Word-boundary match for short tags (≤4 chars), substring for longer."""
    t = tag.lower()
    if len(t) <= 4:
        return bool(re.search(r"\b" + re.escape(t) + r"\b", haystack))
    return t in haystack


def fetch_rss(source: dict, limit: int, tag: Optional[list]) -> dict:
    url = source["url"]
    result = {"name": source["name"], "url": url, "articles": [], "error": None}

    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; NewsDigest/1.0)"},
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            raw = resp.read()

        root = ET.fromstring(raw)

        is_atom = "atom" in root.tag.lower() or root.tag.endswith("}feed")
        if is_atom:
            items = root.findall("{http://www.w3.org/2005/Atom}entry")
        else:
            channel = root.find("channel")
            if channel is None:
                channel = root
            items = channel.findall("item")

        # base URL for resolving relative links (e.g. phparch.com returns /2026/05/...)
        from urllib.parse import urljoin
        base_url = url

        count = 0
        for item in items:
            if count >= limit:
                break

            if is_atom:
                title = _find_text(item, "{http://www.w3.org/2005/Atom}title")
                link_el = item.find("{http://www.w3.org/2005/Atom}link")
                link = link_el.get("href", "") if link_el is not None else ""
                pub = _find_text(item, "{http://www.w3.org/2005/Atom}published", "{http://www.w3.org/2005/Atom}updated")
                summary = _find_text(item, "{http://www.w3.org/2005/Atom}summary", "{http://www.w3.org/2005/Atom}content")
            else:
                title = _find_text(item, "title")
                link = _find_text(item, "link")
                pub = _find_text(item, "pubDate", "{http://purl.org/dc/elements/1.1/}date")
                summary = _find_text(item, "description", "content:encoded")

            # resolve relative links to absolute using the feed's base URL
            if link and not link.startswith("http"):
                link = urljoin(base_url, link)

            title = _strip_html(title)
            summary = _strip_html(summary)[:300]

            if not title:
                continue

            if tag and not any(_tag_matches(t, (title + " " + summary).lower()) for t in tag):
                continue

            result["articles"].append({
                "title": title,
                "link": link,
                "pubDate": pub,
                "summary": summary,
            })
            count += 1

    except Exception as exc:
        result["error"] = str(exc)

    return result


# ── CLI ───────────────────────────────────────────────────────────────────────

def parse_args(argv):
    topic = "all"
    tag = None
    limit = 100

    for arg in argv[1:]:
        if arg.startswith("--tag="):
            tag = [t.strip() for t in arg.split("=", 1)[1].split(",") if t.strip()]
        elif arg.startswith("--limit="):
            limit = int(arg.split("=", 1)[1])
        elif not arg.startswith("--"):
            topic = arg.lower()

    return topic, tag, limit


def main():
    topic, tag, limit = parse_args(sys.argv)

    if topic == "all":
        selected = list(SOURCES.items())
    elif topic in SOURCES:
        selected = [(topic, SOURCES[topic])]
    else:
        valid = ", ".join(list(SOURCES.keys()))
        print(json.dumps({"error": f"Unknown topic '{topic}'. Valid: all, {valid}"}))
        sys.exit(1)

    output = {
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "topic": topic,
        "tag": tag,
        "results": [],
    }

    for topic_name, sources in selected:
        topic_result = {"topic": topic_name, "sources": []}
        for source in sources:
            data = fetch_rss(source, limit, tag)
            topic_result["sources"].append(data)
        output["results"].append(topic_result)

    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
