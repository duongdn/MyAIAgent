---
name: feedback_nus_blog_house_format
description: NUS house blog format (extracted from nustechnology.com/blog) — required shape for the Mindbody post series
metadata:
  type: feedback
---

DuongDN rejected the Mindbody posts' cold open ("mới mở đầu đi thẳng vô thế này chả ra gì") and sent me to `https://www.nustechnology.com/blog` to learn the house format. Extracted from 4 live posts (OOXML, Typesense/PostgreSQL search, cockpit, etc.):

**Opening — 2–3 short paragraphs (~100–150 words) BEFORE the first subheading:**
1. General/industry framing — a common reflex in the field and why it breaks.
2. The specific project — "our team built/designed…".
3. Scope/constraint/payoff — what this article covers.
Then a horizontal rule (`---`), then the hero diagram, then sections.

🔴 **The opening rhythm, verbatim from the Typesense post** — do NOT write a neutral description of the domain ("side A handles X, side B handles Y"). Name a *reflex*, then indict it:
> *"When designing search functionality for a modern Software-as-a-Service (SaaS) platform, there is a common engineering [instinct]… It is an easy default to fall back on, but in multi-tenant architectures… **we designed a pragmatic hybrid search architecture**, splitting the workload between…"*

So: `When <situation>, there is a common engineering instinct: <name it>. / It is an easy default, and it holds right up until <the first time it breaks>. / Our team built <X> in production for <Y>, and <what was NOT hard> was never the hard part. This article covers…`

DuongDN rejected the neutral-description version of post 01's opening twice (2026-09-22: "vẫn tệ quá, tìm cách mở bài hay hơn"). The reflex-indictment shape is what he wanted.

**Body shape:** Problem → named trap of the naive approach → architecture/solution → deep dives → Impact/Results → Core Lesson → CTA.

**Voice:** first-person plural ("our team", "we built") — never "I".

**Failure framing:** never narrate a specific incident/bug/failed build. Problems are framed as *structural traps inherent in conventional tooling*. (Verified: the OOXML post recounts no specific incident.) This is the opposite of the post-mortem framing the first drafts used.

**Ending:** always a CTA/positioning section ("Turn Insights into Action", "Schedule a Strategy Session") — not a dry "Conclusion" heading.

**Titles:** benefit/architecture framing with a colon — "The Pragmatic Search Architecture: Why We Paired Typesense with PostgreSQL ts_vector".

**Why:** the earlier drafts read like internal engineering notes; the user's complaint was about structure/format, not just translation quality.

**How to apply:** see [[feedback_mindbody_blog_source_and_requirements]] for the source/requirements constraint (content must come from the real Rory code at `/disk2/projects/Rory/code/`, requirements only from the chientx Matrix room). Sample post 01 rewritten to this format first; apply to 02–07 only after DuongDN approves it.

Working files: `tmp/blog-posts/mindbody/` — `posts/` (EN, submitted), `vi/` (Vietnamese), `bilingual/` (review tables), `make-bilingual.py` (regenerates tables from block-aligned EN/VI), `TRANSLATION-STYLE.md` (VI style guide).
