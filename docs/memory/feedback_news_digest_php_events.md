---
name: feedback_news_digest_php_events
description: "PHP major events (PHPverse, Laracon, PHP Tek) must be fetched and detailed in news digest, not just one-liner from RSS"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a5c96df8-08ee-4ec1-9149-86d2a6dcc690
---

When a major PHP community event appears in the PHP/Laravel news section (PHPverse, Laracon, PHP Tek, etc.), do NOT just summarize the RSS title as a one-liner.

**Rule:** Actively fetch the event landing page or announcement to extract full schedule, speaker list, and talk topics — then present them in the digest.

**Why:** RSS feeds from Reddit/Laravel News only give the post title ("PHPverse is starting!") without body content. The actual value is in the schedule and talks. PHP devs care deeply about these events. Missed PHPverse 2026 full schedule on 2026-06-10 digest.

**How to apply:** In the PHP section synthesis step, when an event title is detected (PHPverse, Laracon, PHP Tek, WordCamp, etc.), use WebFetch on the event URL to get the full program, then feature it prominently with speaker+topic table.

[[feedback_news_digest_use_actual_links]]
