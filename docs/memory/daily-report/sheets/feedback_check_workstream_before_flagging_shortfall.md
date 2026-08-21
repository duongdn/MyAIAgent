---
name: feedback_check_workstream_before_flagging_shortfall
description: "Workstream is the sole hours source now (Sheets task log retired) — a single query pass is NOT reliable evidence for any 0h/shortfall claim. Live project list, per-dev filters, and even unfiltered dumps have all silently missed real logged hours, repeatedly. Always re-verify before alerting/sending."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 7802f504-a1ff-402a-b985-121eb7c467ce
---

**🔴 Workstream is the ONLY hours source now — Google Sheets task log is retired (all projects, including Bailey, migrated; see [[reference_workstream]]).** This memory used to describe Workstream-vs-Sheets discrepancies; those are now moot. What remains, hard-won across 13+ recurrences, is that a SINGLE Workstream query — filtered or unfiltered — is not reliable evidence of 0h/shortfall for any dev.

**Deeper bug found 2026-06-23 — the project LIST itself goes stale:** a check that only queries a hardcoded subset of Workstream projects will miss real hours logged under a project not in that subset. Always live-query `GET /time/projects?date=` for the FULL current project list — never trust a static table alone.

**Recurring failure modes found across many incidents (2026-06-25 through 2026-08-13), all confirmed real via user pushback + re-verification:**
1. **Per-dev-filtered fetch on a specific project can return empty even when the project/dev genuinely has logged hours** — happened repeatedly on "Peptide Clyde" and "Portfolio - James Diamond" for LeNH specifically, at least 8 times. Re-running the identical filtered query, even fresh-token, does not reliably surface it.
2. **`/review/week?projectId=...&date=...` can return `403 Forbidden` when `date` is the exact Monday/start-of-week or the 1-2 days right after it**, but 200 OK with full data when `date` is later in that same week. Fix: never query a historical week using an early-week date; use a date from the back half of the target week.
3. **Even a fully unfiltered all-projects dump (no dev filter) has twice failed to show a dev's real hours on the first pass, then shown them correctly ~15-30 min later** on the identical command — this is NOT always a live data-entry race (see #4), sometimes it's a genuine backend caching/indexing lag specific to certain projects (James Diamond has the worst track record: 5+ incidents across 2 weeks).
4. **Morning 0h reads for the previous day's hours are often just "not logged yet"** — devs commonly enter the prior day's time first thing in the morning. A 0h read before ~09:30 local time is not reliable evidence of a real gap; re-check ~20-30 min later before finalizing a report or sending a reminder.
5. **A "corrected" number from a 2nd query can itself be wrong (mislabeled project attribution)** — a 3rd, structurally different check (unfiltered dump) is sometimes needed even to validate a correction, not just the original finding.
6. **Some devs simply don't use Workstream for a given project and will always show 0h there** — e.g. TuanNT logging Bailey/Paturevision hours matters only if that project has been migrated to Workstream; if a dev's real work sits somewhere the check doesn't query, absence of Workstream rows is not evidence of no work. Always confirm which system a dev/project pair actually uses before trusting an absence.

**Escalated rule (the actual bar for confidence):** before writing ANY 0h/shortfall line into a report, OR before sending a reminder/blocking a Trello item on that basis:
- Live-query the FULL current Workstream project list, don't rely on a static table.
- Query using a date from the back half of the target week if checking a past week (avoid the 403 early-week bug).
- Do at least 2 independent passes spaced ~15-30 min apart if the finding will go into a report or trigger an action — take the higher/positive result if they disagree.
- If a dev pushes back on a finding, treat it as a strong signal to re-verify immediately with a structurally different method (e.g. unfiltered dump instead of re-running the same filtered call) — don't just re-defend the prior finding.
- The cost of a wrong alert/reminder already sent is categorically higher than a wrong line in an unpublished draft — weight verification effort accordingly.

See [[reference_workstream]] for API endpoints, [[feedback_khanhhh_aysar_consolidated]] and [[feedback_tuannt_consolidated]] for dev-specific gating rules built on top of this.
