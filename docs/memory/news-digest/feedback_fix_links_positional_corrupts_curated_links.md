---
name: fix-links-positional-corrupts-curated-links
description: fix-links.py remaps URLs by article position per source — corrupts correct links when digest skips/dedups articles
metadata:
  type: feedback
---
2026-10-13: digest built with links taken straight from fetch JSON, but some articles skipped (cross-source dedup). fix-links.py "fixed 39" links → replaced correct URLs with wrong articles' URLs (position-shifted). Had to restore + recommit.

**Why:** script assumes Nth bullet in a source section = Nth article in JSON.
**How to apply:** after fix-links, diff links vs JSON-sourced originals; if it "fixes" full (non bare-domain) URLs, revert. Long-term: make fix-links only touch bare-domain URLs / match by title. Related [[news_digest_use_actual_links]].
