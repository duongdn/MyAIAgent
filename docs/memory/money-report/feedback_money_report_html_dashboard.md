---
name: feedback_money_report_html_dashboard
description: "money-report must also produce an HTML dashboard + running history JSON — now baked directly into the skill file, not just memory"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 040507ea-9dd2-4276-9187-4991241ed16e
---

Every `/me:money-report` full run MUST also produce `reports/{YYYY-MM-DD}/money-dashboard.html` and append a snapshot to `reports/money-history.json`, in the SAME turn as the 5 markdown pieces.

**Why:** Missed FOUR times — 2026-07-06, 2026-07-07, 2026-07-09, and again 2026-07-14 (user: "what the fuck !!!! sao lai miss tạo ra file html nữa" — visibly furious, 4th repeat). Root cause of #1/#2: SKILL.md itself didn't mention the dashboard, only memory did. Root cause of #3 (07-09): the memory note lived only in project-local `docs/memory/`, never mirrored to Claude memory, so it wasn't in context. Root cause of #4 (07-14, THIS incident): both memory copies existed by then, but the Claude-memory copy was a **stale, unsynced older version** (missing the 07-09 process-fix content) — read that stale copy at session start, it said nothing about a 3rd/4th miss, and there was no trigger to proactively check `docs/memory/money-report/` before starting since `/me:money-report` isn't covered by `util:read-memory`'s command-scoped pattern the way `/daily-report` is.

🔴🔴🔴 **REAL FIX (2026-07-14, after 4th miss):** Memory-only enforcement has now failed 3 separate ways (missing from SKILL.md, unsynced across the two memory stores, stale copy read). Stop relying on memory recall for this. **The requirement is now written directly into `.claude/commands/me/money-report.md` itself** as "Piece 7 — Dashboard" plus a 🔴🔴🔴 banner at the top of the Quick Reference table — this content is injected into context every single time `/money-report` is invoked via the Skill/command tool, so it cannot be forgotten regardless of memory state. This memory file is now a secondary backstop, not the primary mechanism.

**If this memory and the skill file ever disagree, trust the skill file** (`.claude/commands/me/money-report.md`) — it's the one that's actually injected on every invocation, so it's authoritative and easier to keep current. Update this memory file only to log new incidents, not as the source of truth for the dashboard spec.

**How to apply (spec — same content now also in the skill file):**
- `reports/money-history.json` — flat list under `snapshots`, one entry per run: `date`, `label` (dd/mm), `net_worth` (always `trueTotalBalance.amount`, never reconstructed), `gross_assets`, `liabilities`, `categories` (`real_estate`, `gold`, `investment`, `savings`, `liquid` — all **with** home included, consistent schema across entries), `method` (`dashboard_verified` when read straight from API/app, `reconstructed` if manually summed), `note` (what changed since last snapshot, Vietnamese, concise).
- `money-dashboard.html` — dark theme (`#0f1117` bg), Chart.js via CDN (fine for a static file opened locally — do NOT use the Artifact tool, its CSP blocks the CDN). Sections: KPI row w/ deltas, highlights callout, Net Worth trend line, allocation donut (excl. home), category evolution stacked bar, savings+liquid grouped bar, full account detail table. Copy the CSS/JS skeleton from the most recent prior dashboard file, swap in new numbers.
- Backfill any `categories: null` historical entry's chart points from that prior dashboard's own embedded chart data rather than leaving a gap.
- **Open the file in a browser after writing** (`google-chrome file://...`) — don't wait for the user to ask.
- See [[reference_misa_money_report_skill_file]] and [[feedback_misa_money_report_net_worth_bugs]] for the underlying Net Worth / cost-basis rules this dashboard visualizes.
