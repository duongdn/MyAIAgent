---
name: feedback_news_digest_ai_underused_sources
description: "AI topic digest must pull from all 10 configured sources, not just Google News VN — Facebook pages cannot be scraped without login"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: efa6becf-d110-4d65-baf1-63ee4f6b601e
---

When synthesizing the `ai` topic in news-digest, past runs (e.g. 2026-06-19 02:00) only surfaced articles from "Google News – AI Việt Nam" (generic VN mainstream press) and skipped the 8 substantive English sources already configured in `fetch-news.py`: TechCrunch AI, The Verge AI, OpenAI News, Google DeepMind Blog, Google Blog – AI, Hugging Face Blog, MIT Technology Review, Google News – AI Model Releases. All of these returned valid articles when re-fetched — the gap was in synthesis/selection, not missing sources.

**Why:** User complained "too little AI news, full of low-value stuff" while seeing lots of AI content on Facebook. Root cause was NOT a source gap — it was under-sampling the already-rich English sources in favor of generic VN Google News hits. Confirmed by re-fetching `ai` topic same day: all 8 underused sources had fresh (same-day) substantive articles (model releases, research blogs, funding, policy).

**How to apply:** When doing the `ai` section (or `all` with ai included), explicitly pull a few items from EACH configured source, not just the first one or two. Don't let one noisy/generic source (VN Google News) crowd out OpenAI/DeepMind/HuggingFace/TechCrunch/Verge blog-style sources which tend to have more substantive, less repetitive content.

Also: Facebook pages/profiles (tested `facebook.com/<handle>`) cannot be scraped via WebFetch — returns only the profile name, no post content, due to login wall. Don't attempt to add Facebook as an automated source; if user wants Facebook content, they must paste specific post links for manual summarization.

See [[feedback_news_digest_new_topic]], [[feedback_news_digest_use_actual_links]].
