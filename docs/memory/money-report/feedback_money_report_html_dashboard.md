---
name: feedback_money_report_html_dashboard
description: "money-report must also produce an HTML dashboard + running history JSON, not documented in the SKILL.md itself"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 040507ea-9dd2-4276-9187-4991241ed16e
---

Every `/me:money-report` full run MUST also produce `reports/{YYYY-MM-DD}/money-dashboard.html` and append a snapshot to `reports/money-history.json`, even though the skill file (`docs-manager`-owned) only documents the 5 markdown pieces + review.

**Why:** User expects this dashboard every run. Missed THREE times now — 2026-07-06 ("sao ko có file html như lúc trước"), 2026-07-07 ("sao sai mãi thế"), and again 2026-07-09 ("Lai sai nữa rồi, file html đâu !!!" then "tại sao luôn sai, why ????" — escalating visible frustration). It was originally built ad-hoc in an earlier session (first seen 2026-06-23) and has become an implicit standing expectation, not a one-off. Root cause of repeat #1/#2: the money-report SKILL.md text itself (loaded via the Skill tool) does NOT mention the dashboard at all — it's only in memory. **Root cause of repeat #3 (2026-07-09), confirmed by inspection:** this memory file lived ONLY in project-local memory (`docs/memory/money-report/`) and was never mirrored to Claude memory (`~/.claude/projects/-Users-duongdn-projects-MyAIAgent/memory/`), despite CLAUDE.md's MANDATORY dual-memory-write rule. Claude memory's `MEMORY.md` (loaded automatically into context at session start) had ZERO money-report entries, so this rule was invisible unless something explicitly triggered a read of `docs/memory/money-report/` — which nothing did, because `/me:money-report` is not one of the monitoring commands covered by `util:read-memory`'s command-scoped read pattern (that utility is oriented at the daily-report/Trello/Slack monitoring flow, not one-off report commands like this one).

🔴 **STANDING RULE:** Before declaring ANY `/me:money-report` full run finished, produce/update BOTH `money-dashboard.html` and `money-history.json` as part of the SAME turn as the 5 markdown pieces — never as a separate follow-up after the user notices it's missing.

🔴 **PROCESS FIX (added after 3rd miss, 2026-07-09):** This memory MUST also exist in Claude memory (`~/.claude/projects/-Users-duongdn-projects-MyAIAgent/memory/`), not just here — verify both copies exist and are in sync whenever this file is edited. Additionally: at the START of any `/me:money-report` invocation (before running the fetch script), proactively check `docs/memory/money-report/` for standing rules — do not rely solely on the SKILL.md content injected by the command, since it is known to be incomplete (see root cause above).

**How to apply:**
- `reports/money-history.json` — flat list under `snapshots`, one entry per run: `date`, `label` (dd/mm), `net_worth` (always `trueTotalBalance.amount`, never reconstructed), `gross_assets`, `liabilities`, `categories` (`real_estate`, `gold`, `investment`, `savings`, `liquid` — all **with** home included, this is the consistent schema across entries), `method` (`dashboard_verified` when read straight from API/app, `reconstructed` if manually summed), `note` (what changed since last snapshot, in Vietnamese, concise).
- `money-dashboard.html` — dark theme (`#0f1117` bg), Chart.js via CDN `<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/...">` (fine for a static file opened locally — do NOT use the Artifact tool for this, its CSP blocks the CDN). Sections: KPI row (Net Worth, Liabilities, Liquid, Savings, current-month Net), a highlights callout card, Net Worth trend line chart (all historical snapshots), allocation donut (excl. home), category evolution stacked bar, savings+liquid grouped bar, full account detail table. Copy the exact CSS/JS skeleton from a prior dashboard (e.g. `reports/2026-06-23/money-dashboard.html`) and just swap in new numbers/labels — don't redesign from scratch.
- Pull historical chart data points from `reports/money-history.json`; if an entry's `categories` is `null` (happened for the 2026-06-23 post-fix snapshot), backfill the chart literal from the previous dashboard's own embedded chart data rather than leaving a gap.
- See [[reference_misa_money_report_skill_file]] and [[feedback_misa_money_report_net_worth_bugs]] for the underlying Net Worth / cost-basis rules this dashboard visualizes.
