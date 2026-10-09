---
name: feedback_siteground_storage_pct_must_be_dashboard_quota_not_df
description: "🔴🔴 Siteground storage % = (df used − 10.61GB system)/df size → 69.0% = dashboard (2026-10-09). Raw df % (75–86%) is wrong; never carry old %"
metadata:
  type: feedback
---

User corrected 2026-10-09: dashboard = 69% (OK, <70%). We posted NOT OK 86% on 02/10 and 09/10.

**Root causes:**
1. Wrong formula: used raw `df` Use% on `/home/customer`. Dashboard subtracts Siteground system overhead (10.61 GB, seen in 03-20 dashboard breakdown).
2. 09/10 run happened on cron server `mpfc.mpfc.live` (user `mpfc`), whose `~/.ssh/config` had NO `Bailey.cpanel` block or `~/.ssh/nick/id_rsa` key. It then copied 10-02's 86% instead of re-measuring. **Fixed 2026-10-09:** block + key added on mpfc (`~/.ssh/config.bak.20261009` backup), verified 69.0% from there. Also, the staging cleanup had already happened by then (~/www 41G → 25G: pre9 23→9.7G, staging-sg 6.9→3.9G).

**Formula (verified = 69.0%):** `ssh Bailey.cpanel 'df -B1 ~' | awk '{print 100*($3/1e9-10.61)/($2/1e9)}'`. Now in the skill's Subtask 7, step 3.

**How to apply:** Always re-measure every run. Never carry a previous %. If SSH fails, retry and check ssh config. Thresholds: <70 OK, 70–85 WARNING, >85 NOT OK. Supersedes [[feedback_siteground_disk_81pct_staging_copies]].
