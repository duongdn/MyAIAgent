---
name: feedback_never_invent_requirements_in_estimates
description: "🔴 When scoping/estimating client work, quote ONLY what the customer actually asked for — verify every line item against their own words/files before costing it"
metadata:
  type: feedback
---

**Rule:** Never add tasks to an estimate that the customer did not ask for. Every line item must trace to a quote from the client's own message or a file they supplied. If something looks technically necessary but was not requested, it goes in a separate "found this, your call" list with **no hours and no price** — not into the quote.

**Why:** 2026-07-28, Auction Warehouse / Brad Ballantine estimate. First pass came out 41–60h. User pushed back twice ("Này cus có yêu cầu ko???", then "Đừng có tự đẻ requirement !!!"). Auditing every line against Brad's actual messages + his own mockup file cut ~22h of invented work:
- SEO / sitemap / Google Analytics (3h) — never mentioned; he literally said "just need a basic site".
- Contact forms (5h) — **his own mockup already used `mailto:` + `tel:` links, zero `<form>` tags**.
- "4 inner pages" (4h) — mockup nav hrefs were all `#`, i.e. a single-page anchor design.
- "Make it responsive" (3.5h) — mockup already had `<meta viewport>` + `@media(max-width:900px)`.
- Image optimisation — mockup had **0 `<img>` tags** (10 inline SVGs).
- Drag-drop sort ordering in admin — he only said "easy for us to update".
- A whole security-hardening block (4–6h) — real findings from the server audit, but Brad never raised security at all.

**How to apply:**
1. Before writing any estimate, re-read the client's messages and **open the assets they sent** (mockups, docs). Grep the mockup for `@media`, `<form>`, `<img>`, nav `href` — it answers "is X already done / already decided" far better than assuming.
2. Tag each line item: quoted-by-client / implied-by-their-asset / **my addition**. Delete or unbundle every "my addition".
3. Real problems found during audit (security holes, EOL PHP, etc.) → mention as advisory, let the client ask; do not price them into the job, and see [[feedback_fix_internal_issues_not_just_report]] — that "just fix it" rule is for OUR infra, not a client's site we have no contract on.
4. Padding an estimate is not conservatism — it loses the deal and reads as inventing billable work.
