---
name: feedback_facebook_scraper_deleted_by_cleanup_commit
description: "scripts/facebook-page-scraper.js was wiped out by bulk auto-cleanup commit d0d3fd5 (2026-07-15) along with 217 other scripts, breaking all 3 Facebook AI sources in news-digest ai topic for 5 days; restored 2026-07-20 from 740c578"
metadata:
  type: feedback
  originSessionId: 590c9041-0114-4743-a220-bc6a8cfc0ffe
---

Third distinct root cause for the recurring "no Facebook posts" symptom (after [[feedback_facebook_scraper_missing_x_display]] and [[feedback_facebook_scraper_chrome_path_drift]]): an unrelated bulk "auto: 2026-07-15 10:01" cleanup commit (`d0d3fd5`) deleted 218 files across `scripts/`, apparently treating dated/one-off audit scripts as safe to remove — but it swept up `scripts/facebook-page-scraper.js` too, which `.claude/skills/news-digest/scripts/fetch-news.py:378` actively depends on. Reports from 2026-07-15 through 2026-07-20 all showed the FB sections erroring with "scraper không tồn tại" (script missing), not the earlier Xvfb/Chrome-path failure modes.

**Why:** Whatever process/agent generated that cleanup commit didn't check cross-references before deleting scripts — it likely pattern-matched on filenames looking like one-off dated scripts (`check-*-apr20.py`, `weekly-summary-may04.py`, etc.) but `facebook-page-scraper.js` doesn't fit that pattern and was still a live dependency.

**Fix applied (2026-07-20):** Restored via `git show 740c578:scripts/facebook-page-scraper.js > scripts/facebook-page-scraper.js` (740c578 = last commit before deletion, already contains both the Xvfb self-start and Chrome-path fallback fixes). Verified by running the script directly against all 3 FB sources (shinantori, mrgoonie, groups/nghienai) — all returned real posts. Patched the 2026-07-20 report in place (recheck mode) rather than re-running full digest.

**How to apply:** If `news-digest` reports show "scraper không tồn tại" / "removed from repo" for Facebook sections again, check `git log --diff-filter=D -- scripts/facebook-page-scraper.js` for the deleting commit and restore from the commit just before it — don't assume it needs re-writing from scratch. More generally: before any bulk script cleanup, grep `.claude/skills/*/scripts/*.py` for references to the files being deleted (see one-liner used in this session: for each deleted script basename, `grep -rl <basename> .claude/skills`).
