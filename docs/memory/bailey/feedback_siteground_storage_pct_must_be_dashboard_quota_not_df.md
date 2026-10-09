---
name: feedback_siteground_storage_pct_must_be_dashboard_quota_not_df
description: "🔴 2026-10-09: Siteground storage % for Slack = dashboard plan quota (69% OK), NOT `df /home/customer` (86%, shared server mount) — 86% NOT OK was wrong"
metadata:
  type: feedback
---

User corrected 2026-10-09: Siteground dashboard shows **69%** (OK). The 86% posted 10-02 and 10-09 came from `df` on `/home/customer` (164G mount = shared server disk, not the account's plan quota), then carried forward when SSH/Puppeteer unavailable.

**Why:** Wrong basis → customer Slack showed NOT OK for 2 weeks when storage was fine.

**How to apply:** Never use `df` % for Prestashop storage status. Use dashboard quota (Puppeteer `siteground-storage.js`). SSH `du -sh ~/www/*` is only for the breakdown. If dashboard unreadable, don't carry a df-based %; ask user for the dashboard figure or mark from last dashboard value. Supersedes 86% notes in [[feedback_siteground_disk_81pct_staging_copies]].
