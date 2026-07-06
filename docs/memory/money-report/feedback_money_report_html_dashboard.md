---
name: feedback_money_report_html_dashboard
description: "money-report must also produce an HTML dashboard + running history JSON, not documented in the SKILL.md itself"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 040507ea-9dd2-4276-9187-4991241ed16e
---

Every `/me:money-report` full run MUST also produce `reports/{YYYY-MM-DD}/money-dashboard.html` and append a snapshot to `reports/money-history.json`, even though the skill file (`docs-manager`-owned) only documents the 5 markdown pieces + review.

**Why:** User expects this dashboard every run (confirmed 2026-07-06 — user flagged its absence: "sao ko có file html như lúc trước"). It was originally built ad-hoc in an earlier session (first seen 2026-06-23) and has become an implicit standing expectation, not a one-off.

**How to apply:**
- `reports/money-history.json` — flat list under `snapshots`, one entry per run: `date`, `label` (dd/mm), `net_worth` (always `trueTotalBalance.amount`, never reconstructed), `gross_assets`, `liabilities`, `categories` (`real_estate`, `gold`, `investment`, `savings`, `liquid` — all **with** home included, this is the consistent schema across entries), `method` (`dashboard_verified` when read straight from API/app, `reconstructed` if manually summed), `note` (what changed since last snapshot, in Vietnamese, concise).
- `money-dashboard.html` — dark theme (`#0f1117` bg), Chart.js via CDN `<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/...">` (fine for a static file opened locally — do NOT use the Artifact tool for this, its CSP blocks the CDN). Sections: KPI row (Net Worth, Liabilities, Liquid, Savings, current-month Net), a highlights callout card, Net Worth trend line chart (all historical snapshots), allocation donut (excl. home), category evolution stacked bar, savings+liquid grouped bar, full account detail table. Copy the exact CSS/JS skeleton from a prior dashboard (e.g. `reports/2026-06-23/money-dashboard.html`) and just swap in new numbers/labels — don't redesign from scratch.
- Pull historical chart data points from `reports/money-history.json`; if an entry's `categories` is `null` (happened for the 2026-06-23 post-fix snapshot), backfill the chart literal from the previous dashboard's own embedded chart data rather than leaving a gap.
- See [[reference_misa_money_report_skill_file]] and [[feedback_misa_money_report_net_worth_bugs]] for the underlying Net Worth / cost-basis rules this dashboard visualizes.
