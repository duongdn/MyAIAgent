#!/usr/bin/env python3
"""
Fix bare-domain URLs in news-digest markdown files using the JSON cache.

Usage:
  python3 fix-links.py <markdown_file> [--cache=/tmp/news-digest-cache.json]

Algorithm:
  For each source section (**Source Name**) in the markdown:
  - Collect all article markdown links in order
  - Replace bare-domain URLs (no path) with the correct URL from the JSON
    cache at the same position (N-th article link → N-th article URL from JSON)

This fixes the recurring pattern where Claude drops the full article URL and
writes just the homepage domain (e.g. https://vnexpress.net instead of the
full article path), especially when processing many articles in one pass.
"""

import json
import re
import sys
from pathlib import Path

CACHE_FILE = "/tmp/news-digest-cache.json"
BARE_DOMAIN_RE = re.compile(r"^https?://[a-z0-9.-]+/?$")
LINK_RE = re.compile(r"(\[([^\]]*)\]\()([^)]+)(\))")


def is_bare_domain(url: str) -> bool:
    return bool(BARE_DOMAIN_RE.match(url))


def build_source_map(cache_data: dict) -> dict:
    """Return {source_name: [url1, url2, ...]} from the fetched JSON cache."""
    source_map: dict[str, list[str]] = {}
    for result in cache_data.get("results", []):
        for source in result.get("sources", []):
            name = source["name"]
            urls = [a.get("link", "") for a in source.get("articles", [])]
            if name not in source_map:
                source_map[name] = urls
            else:
                # Merge if same source appeared in multiple topic fetches
                source_map[name].extend(urls)
    return source_map


def fix_section(section_text: str, article_urls: list[str]) -> tuple[str, int]:
    """
    Replace bare-domain URLs in a source section using position-based matching.
    Returns (fixed_text, num_fixes).
    """
    parts: list[str] = []
    last_end = 0
    article_idx = 0
    fixes = 0

    for match in LINK_RE.finditer(section_text):
        parts.append(section_text[last_end : match.start()])
        url = match.group(3)

        if is_bare_domain(url) and article_idx < len(article_urls) and article_urls[article_idx]:
            correct_url = article_urls[article_idx]
            parts.append(f"{match.group(1)}{correct_url}{match.group(4)}")
            fixes += 1
        else:
            parts.append(match.group(0))

        article_idx += 1
        last_end = match.end()

    parts.append(section_text[last_end:])
    return "".join(parts), fixes


RSS_GNEWS_RE = re.compile(r"news\.google\.com/rss/articles/([A-Za-z0-9_-]+)(?:\?[^)]*)?")


def fix_gnews_rss_links(md: str) -> tuple[str, int]:
    """
    Convert /rss/articles/CBMi... links to /articles/CBMi... (no ?oc=5).
    The /rss/ variant requires JS but doesn't trigger the browser redirect;
    /articles/ triggers the client-side redirect to the actual article.
    """
    def replace(m: re.Match) -> str:
        return f"news.google.com/articles/{m.group(1)}"

    fixed, count = RSS_GNEWS_RE.subn(replace, md)
    return fixed, count


def fix_markdown(md: str, source_map: dict) -> tuple[str, int]:
    """
    Fix all source sections in the markdown.
    1. Convert /rss/articles/ Google News links to /articles/ format.
    2. Replace bare-domain URLs with correct article URLs from the JSON cache.
    """
    total_fixes = 0

    # Pass 1: fix Google News /rss/ links everywhere in the file
    md, gnews_fixes = fix_gnews_rss_links(md)
    total_fixes += gnews_fixes

    # Pass 2: fix bare-domain URLs per source section using position-based matching
    for source_name, urls in source_map.items():
        if not urls:
            continue

        header = f"**{source_name}**"
        header_pos = md.find(header)
        if header_pos == -1:
            continue

        section_start = header_pos + len(header)

        # Section ends at the next bold header (**...**), horizontal rule, or section heading
        next_boundary = re.search(r"\n(?:\*\*[^*\n]+\*\*|\-\-\-|#{1,3} )", md[section_start:])
        section_end = section_start + next_boundary.start() if next_boundary else len(md)

        section_text = md[section_start:section_end]
        fixed_section, fixes = fix_section(section_text, urls)

        if fixes > 0:
            md = md[:section_start] + fixed_section + md[section_end:]
            total_fixes += fixes

    return md, total_fixes


def main():
    args = sys.argv[1:]
    if not args:
        print("Usage: fix-links.py <markdown_file> [--cache=PATH]", file=sys.stderr)
        sys.exit(1)

    md_path = Path(args[0])
    cache_path = Path(CACHE_FILE)

    for arg in args[1:]:
        if arg.startswith("--cache="):
            cache_path = Path(arg.split("=", 1)[1])

    if not md_path.exists():
        print(f"Markdown file not found: {md_path}", file=sys.stderr)
        sys.exit(1)

    if not cache_path.exists():
        print(f"No cache file at {cache_path} — skipping link fix", file=sys.stderr)
        sys.exit(0)

    try:
        cache_data = json.loads(cache_path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"Failed to read cache: {e}", file=sys.stderr)
        sys.exit(0)

    source_map = build_source_map(cache_data)
    md = md_path.read_text(encoding="utf-8")

    fixed_md, total_fixes = fix_markdown(md, source_map)

    if total_fixes > 0:
        md_path.write_text(fixed_md, encoding="utf-8")
        print(f"✓ Fixed {total_fixes} broken link(s) in {md_path}")
    else:
        print(f"✓ No broken links found in {md_path}")


if __name__ == "__main__":
    main()
