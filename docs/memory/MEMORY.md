# Memory Index

Categorized by the question you're trying to answer. Reorganized 2026-06-11.

---

## 🔴 CRITICAL — READ FIRST (rules that have failed multiple times)

Skim these every single run. If your output contradicts any of them, you have a bug.

- [reference_trello_gate_mapping.md](reference_trello_gate_mapping.md) — **Exact gate sources per Check Progress item. Check this before completing OR skipping any item.**
- [feedback_leave_day_handling.md](feedback_leave_day_handling.md) — **"Nghỉ cả ngày" / "Nghỉ nửa ngày" → pro-rate weekly target before computing shortfall.** Never write `actual vs full_target` when any leave day exists.
- [feedback_summary_sheet_no_double_count.md](feedback_summary_sheet_no_double_count.md) — Summary col D is **already** the grand total; never also sum per-employee Actual cols (caused 2× bug 2026-05-11).
- [feedback_dev_project_mapping_flexible.md](feedback_dev_project_mapping_flexible.md) — **ALL devs scan ALL 11 sheets by owner col G — NEVER use Summary tab total (all-devs sum); never hardcode dev→sheet**
- [feedback_sheets_subagent_unreliable.md](feedback_sheets_subagent_unreliable.md) — Verify suspicious 0h findings directly before flagging / reminding.
- [feedback_matrix_resource_arrangement_room.md](feedback_matrix_resource_arrangement_room.md) — **Cross-check Matrix room "Delivery - Resource Arrangement" (namtv's leave notes) before flagging ANY dev 0h.**
- [feedback_subagent_no_unauthorized_writes.md](feedback_subagent_no_unauthorized_writes.md) — Subagents must NEVER submit forms / tick Trello / send msgs / push code beyond explicit scope.
- [feedback_matrix_token_never_report_expired.md](feedback_matrix_token_never_report_expired.md) — Run `scripts/matrix-token-refresh.js` BEFORE claiming Matrix token expired.
- [feedback_token_handling.md](feedback_token_handling.md) — **⚠️ MUST READ BEFORE SLACK SCAN** — Amazing Meds + Equanimity xoxc: run refresh scripts PROACTIVELY, NEVER report invalid_auth.
- [feedback_timeline_system.md](feedback_timeline_system.md) — MUST update `.monitoring-timelines.json` at end of EVERY run; verify by re-reading.
- [feedback_fountain_cr_column.md](feedback_fountain_cr_column.md) — Fountain total estimate = Col I **+** Col J (CR). Both capacity AND over-estimate use the sum.
- [feedback_fountain_kunal_checklist.md](feedback_fountain_kunal_checklist.md) — Fountain 5-part check is MANDATORY every run; never skip any part.
- [feedback_report_location.md](feedback_report_location.md) — Reports go in `reports/{YYYY-MM-DD}/...`, **NOT** `plans/reports/`.
- [feedback_khanhhh_aysar_second_project.md](feedback_khanhhh_aysar_second_project.md) — KhanhHH = **3 sources**: Generator sheet + Baamboozle Workstream + **Colin/ETZ Workstream** (3rd one found missing 2026-06-19 — not a closed list, re-ask if a 4th surfaces).
- [feedback_google_sheets_per_employee.md](feedback_google_sheets_per_employee.md) — Filter EVERY dev to their own name in multi-employee sheets (James Diamond sheet has both PhucVT and AnhNH2 on different projects) — never `sum()` all owners in a sheet as one person's total.
- [feedback_sheets_scan_script_reuse_wrong_day.md](feedback_sheets_scan_script_reuse_wrong_day.md) — **Verify `daily-sheets-scan-{today}*.js` actually exists before trusting its output** — cron silently reused yesterday's script (wrong date tokens), reported Wed data as Thu for TuanNT/Elena/KhanhHH, falsely auto-completed 3 Trello items.
- [feedback_mpfc_oauth2_real_unresolved_bug.md](feedback_mpfc_oauth2_real_unresolved_bug.md) — MPFC's recurring OAuth2 invalid_grant (since Jun3) is a REAL unresolved bug, not stale noise — never just relabel as "older".
- [feedback_workstream_config_not_gitignored.md](feedback_workstream_config_not_gitignored.md) — Check ANY new `config/.*-config.json` is in `.gitignore` — workstream-config leaked a live token in git history until fixed 2026-06-19.

---

## User
- [user_role.md](user_role.md) — PM at NUS Technology, oversees 10+ client projects, daily monitoring workflow

## Reference (Static Lookup)
- [reference_email_accounts_all9.md](reference_email_accounts_all9.md) — **9 monitored email accounts** (6 Zoho + 2 Gmail IMAP + 1 Gmail API). Cron only checked 6; mpfc key missing as of Jun 13.
- [reference_workstream.md](reference_workstream.md) — Workstream API — single `/api` prefix only (double prefix 404s, caused false "login failed" — fixed 2026-06-18)
- [reference_elena_wordpress_csp_config.md](reference_elena_wordpress_csp_config.md) — samguard.co CSP lives in `wp_options.hsts_csp` DB column, not a file — ask before editing
- [reference_matrix_rooms.md](reference_matrix_rooms.md) — Developer Matrix room IDs for task log reminders
- [reference_upwork_workrooms.md](reference_upwork_workrooms.md) — Upwork workroom URLs, account credentials, weekly report comparison
- [reference_mpfc_github.md](reference_mpfc_github.md) — MPFC GitHub repo is mypersonalfootballcoach/wp (not nustechnology/...)
- [project_monday_report_sheets.md](project_monday_report_sheets.md) — All 8 Monday report sheet IDs (Neural/LegalAtoms/Taraba DO have sheets)

## Project (Dynamic State)
- [project_timezone_utc7.md](project_timezone_utc7.md) — All time references use UTC+7 (Vietnam/ICT); convert by subtracting 7h for cron/UTC
- [project_leave_plan_system.md](project_leave_plan_system.md) — **Leave plan**: run parse-leave-emails.js in email piece; check config/leave-plan.json BEFORE task log checks
- [project_daily_report_workflow.md](project_daily_report_workflow.md) — Full daily report workflow: data sources, Trello mappings, configs
- [project_alert_cron_setup.md](project_alert_cron_setup.md) — Alert cron: 30 min interval, env requirements, rate-limit detection
- [project_longvv_james_diamond.md](project_longvv_james_diamond.md) — LongVV project assignments change weekly — check Matrix Monday plan (W30: 16h Maddy + 15h Celine/OhCleo)
- [project_blake_socal_dropped.md](project_blake_socal_dropped.md) — Blake/SoCal Auto Wraps dropped from monitoring as of 2026-05-11
- [project_php_team.md](project_php_team.md) — PHP team: LongVV, PhucVT, TuanNT, KhanhHH, LeNH, VietPH
- [project_blair_brown_setup.md](project_blair_brown_setup.md) — Blair Brown - Peptide Clyde (WooCommerce): dev=DuongDN, Workstream "WordPress Update" ID `cmqj4tj6v01gfm81vgx7ipkov`, FORBIDDEN (not manager), added to weekly Matrix report W31+

---

## Per-Project / Per-Person
- [feedback_franc_adhoc.md](feedback_franc_adhoc.md) — Franc/RDC is ad hoc like Marcel — no hours expectation, always complete Trello item

## 🔴 Recurring Daily Report Errors (Jun 11–13 — must not repeat)
- [feedback_maddy_jira_weekly_check.md](feedback_maddy_jira_weekly_check.md) — **Run EVERY day** `maddy-jira-tasklog-check.js --week` in Sheets piece — never skip; include markdown table in report
- [feedback_recheck_must_fill_missing_data.md](feedback_recheck_must_fill_missing_data.md) — **Recheck must fill missing data** (BLOCKED/expired/unavailable sections), not just fix Trello items
- [feedback_puppeteer_cron_tmpdir.md](feedback_puppeteer_cron_tmpdir.md) — Puppeteer cron /tmp failure → false 0h/unavailable — fix: `TMPDIR=/var/tmp` + `--crash-dumps-dir=/var/tmp` + `--disable-dev-shm-usage`
- [feedback_vietph_leave_date_cron_bug.md](feedback_vietph_leave_date_cron_bug.md) — Leave note for day N-1 applied to day N by cron — verify leave note row date = PREV_DATE before marking "leave day"
- [feedback_tuannt_gate_show_breakdown.md](feedback_tuannt_gate_show_breakdown.md) — TuanNT gate label must show per-sheet breakdown (JohnYi Xh | Paturevision Xh | ...) — "combined Xh" alone is misleading
- [feedback_airagri_webapp_channel.md](feedback_airagri_webapp_channel.md) — **Vinn posts in #airagri_webapp, NOT only #airagri-flutter** — always scan BOTH channels to find "Just report my process today:"

## News Digest
- [feedback_news_digest_new_topic.md](feedback_news_digest_new_topic.md) — Unknown topic → add as new topic with own RSS sources in fetch-news.py, never alias existing topics
- [feedback_news_digest_use_actual_links.md](feedback_news_digest_use_actual_links.md) — **ALWAYS use `link` field from fetched JSON, NEVER fabricate/guess article URLs**
- [feedback_news_digest_php_events.md](feedback_news_digest_php_events.md) — PHP major events (PHPverse, Laracon, PHP Tek) must be fetched with full schedule+speakers
- [feedback_news_digest_ai_underused_sources.md](feedback_news_digest_ai_underused_sources.md) — AI section must sample ALL 10 sources, not just VN Google News; Facebook can't be scraped (login wall)

## Workflow & Reporting Style
- [feedback_freelancer_email_must_be_scanned.md](feedback_freelancer_email_must_be_scanned.md) — freelancer@mypersonalfootballcoach.com MUST appear in email scan every run. Contains MPFC production errors.
- [feedback_matrix_tomorrow_is_message_date_plus_one.md](feedback_matrix_tomorrow_is_message_date_plus_one.md) — Leave dates = check **email** or **sheets col A**. NEVER infer from "tomorrow/mai" in chat.
- [feedback_report_style.md](feedback_report_style.md) — Channel-level summaries, concise grammar, no trailing summaries
- [feedback_customer_facing_messages.md](feedback_customer_facing_messages.md) — NEVER expose internal tool/auth failures in customer Slack channels
- [feedback_always_include_links.md](feedback_always_include_links.md) — Include clickable URLs for Trello cards, PRs, tickets
- [feedback_ondemand_updates.md](feedback_ondemand_updates.md) — On-demand = separate timestamped file, don't overwrite daily
- [feedback_monday_friday_timestamp.md](feedback_monday_friday_timestamp.md) — Monday daily report starts from last Friday 8AM
- [feedback_monday_discord_scan_friday_window.md](feedback_monday_discord_scan_friday_window.md) — **Monday scan window = Fri 08:00+07, NOT Sat/Sun.** Wrong date = miss Friday reports
- [feedback_imap_slack_timestamp_gotchas.md](feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE uses server dates, Slack `after:` excludes named date
- [feedback_no_duplicate_sends.md](feedback_no_duplicate_sends.md) — Never re-send while background task is pending
- [feedback_never_send_messages_without_permission.md](feedback_never_send_messages_without_permission.md) — Never send Matrix/Slack messages unless explicitly authorised in the task

## Alert Classification (when to flag)
- [feedback_alert_classification.md](feedback_alert_classification.md) — Only our issues, checklist text is notes not alerts, staging=INFO, "Chưa"=normal
- [feedback_rebecca_chua_not_trello_block.md](feedback_rebecca_chua_not_trello_block.md) — "Chưa" in Rebecca col P NEVER blocks Trello completion
- [feedback_alert_means_no_complete.md](feedback_alert_means_no_complete.md) — Alert found = do NOT complete Trello item
- [feedback_fountain_tasklog_not_monitored.md](feedback_fountain_tasklog_not_monitored.md) — Fountain dev task log hours NOT monitored — outside PM scope
- [feedback_missing_daily_report_is_alert.md](feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert (unless leave day — see leave_day_handling)
- [feedback_project_topics_not_alerts.md](feedback_project_topics_not_alerts.md) — Slack dev discussions ≠ alerts, don't block Trello
- [feedback_csp_violations_are_real_errors.md](feedback_csp_violations_are_real_errors.md) — samguard.co CSP violations are real errors
- [feedback_blake_rollbar_not_person_alert.md](feedback_blake_rollbar_not_person_alert.md) — Client website Rollbar errors don't block Blake/per-client Trello items

## Scrin.io
- [feedback_scrin_isyesterday_monday_bug.md](feedback_scrin_isyesterday_monday_bug.md) — scrin-fetch-yesterday.js on Mon returns SUNDAY, not Friday. Never label as Friday Scrin data.

## Tokens, Auth & Decryption
- [feedback_matrix_refresh_headless_bug.md](feedback_matrix_refresh_headless_bug.md) — **matrix-token-refresh.js must be headless:false on DISPLAY:1. When fails: `DISPLAY=:1 node scripts/matrix-login.js`**
- [feedback_decrypt_before_reading.md](feedback_decrypt_before_reading.md) — Run decrypt-secrets.sh before reading config
- [feedback_never_report_token_expired.md](feedback_never_report_token_expired.md) — NEVER report token expired as blocker — always fix/rerun, never skip a piece for token failure
- [feedback_matrix_join_public_room.md](feedback_matrix_join_public_room.md) — Matrix M_FORBIDDEN = just POST /join
- [feedback_github_account_mapping.md](feedback_github_account_mapping.md) — duongdn for Elena, nusken for Precognize, nuscarrick default
- [feedback_ssh_passphrase_in_config.md](feedback_ssh_passphrase_in_config.md) — SSH passphrases in ~/.ssh/config comments (#passphase:)

---

## Trello Updates
- [feedback_trello_find_by_name.md](feedback_trello_find_by_name.md) — Check mail/progress cards are recurring, find by name not ID
- [feedback_trello_all_checklists.md](feedback_trello_all_checklists.md) — Check Progress has MULTIPLE checklists, iterate ALL
- [feedback_trello_mail_must_check_email.md](feedback_trello_mail_must_check_email.md) — Trello mail MUST check emails first, not just toggle items
- [feedback_trello_progress_reuse_pieces.md](feedback_trello_progress_reuse_pieces.md) — Progress items must run ALL mapped source pieces (Slack+Sheets etc)
- [feedback_email_trello_completion.md](feedback_email_trello_completion.md) — Complete all 6 "Check mail" items after email check
- [feedback_checklist_person_link.md](feedback_checklist_person_link.md) — Checklist items name person; their status gates completion
- [feedback_trello_per_client_gates_on_lead_dev.md](feedback_trello_per_client_gates_on_lead_dev.md) — Per-client item gates on lead dev (Nick for John Yi, Elliott for Generator)

## Slack & Discord Sources
- [feedback_slack_threads.md](feedback_slack_threads.md) — MUST use search.messages API (conversations.history misses thread replies)
- [feedback_discord_only_airagri_bizurk.md](feedback_discord_only_airagri_bizurk.md) — Discord: only AirAgri + Bizurk, NOT HOMIEAPP
- [feedback_vinn_daily_report_format.md](feedback_vinn_daily_report_format.md) — Vinn's AirAgri daily report opens with "Just report my process today:" — date window: check N-1
- [feedback_philip_msteams_must_run.md](feedback_philip_msteams_must_run.md) — Philip MS Teams: run with FULL NAME query "Philip Briggs"; config+login verified working
- [feedback_scrin_company_not_john_yi.md](feedback_scrin_company_not_john_yi.md) — Scrin.io tracks Nick (nick@nustechnology.com) NOT TuanNT — NEVER attribute Scrin hours to TuanNT
- [feedback_andrew_taraba_animworld_dm.md](feedback_andrew_taraba_animworld_dm.md) — Andrew Taraba: check nuscarrick DM with "animeworld", not Bizurk channels
- [feedback_andrew_taraba_low_activity.md](feedback_andrew_taraba_low_activity.md) — Bizurk silence is normal, not an alert
- [feedback_ggs_nick_daily_report.md](feedback_ggs_nick_daily_report.md) — GGS Nick daily report absence is not an alert
- [feedback_aysar_daily_report_slack.md](feedback_aysar_daily_report_slack.md) — General rule: check Slack for daily reports, send Matrix reminder only if missing.
- [feedback_aysar_jamie_ronan_room.md](feedback_aysar_jamie_ronan_room.md) — **CORRECTED**: Aysar report = Baamboozle Slack MPDM C07SQ4HAUHZ. Matrix `!gjtiuNjeqDarGWkSnf` = send reminders only.

---

## Sheets & Task Logs (general rules)
- [feedback_sheets_wrong_tab_numbering.md](feedback_sheets_wrong_tab_numbering.md) — **🔴 CRITICAL: Tab W{n} ≠ calendar week n. ALWAYS use Summary tab to find correct tab.**
- [feedback_sheets_scan_prev_date_for_daily_hours.md](feedback_sheets_scan_prev_date_for_daily_hours.md) — **Daily hours scan = PREV_DATE (yesterday)**. Using today's tokens at 05:00 = all 0h.
- [feedback_workstream_authoritative_for_maddy_devs.md](feedback_workstream_authoritative_for_maddy_devs.md) — Workstream authoritative for Maddy/LongVV/LuHX. Run workstream-fetch when sheets=0h.
- [feedback_dev_not_working_project_x_means_that_project_only.md](feedback_dev_not_working_project_x_means_that_project_only.md) — "Not working ProjectX" ≠ 0h total. Scan all sheets before concluding 0h day.
- [feedback_aysar_sheet_owner_is_khanhhh.md](feedback_aysar_sheet_owner_is_khanhhh.md) — **Aysar sheet owner=KhanhHH (not LeNH)**. LeNH combined = Rory + Franc + Rebecca (Q-T) only.
- [feedback_tasklog_summary_sheet.md](feedback_tasklog_summary_sheet.md) — Summary tab: use for W{n} date lookup ONLY. Col D = all-dev total, not per-dev hours.
- [feedback_tasklog_0h_reminder_complete.md](feedback_tasklog_0h_reminder_complete.md) — **0h task log + reminder sent = COMPLETE Trello item.**
- [feedback_no_activity_not_skip.md](feedback_no_activity_not_skip.md) — **"No Slack activity" is NOT a skip reason. Quiet = OK → COMPLETE.**
- [feedback_leave_day_handling.md](feedback_leave_day_handling.md) — Full leave day rule: 0h OK, pro-rate weekly target, covers daily report / 0h check / shortfall
- [feedback_google_sheets_per_employee.md](feedback_google_sheets_per_employee.md) — Filter by Owner col G, not day total. TuanNT splits across projects
- [feedback_parttime_official_filter.md](feedback_parttime_official_filter.md) — Only "Task dự án" as official, exclude "Part-time" rows
- [feedback_tasklog_skip_first_row.md](feedback_tasklog_skip_first_row.md) — Never use first empty row of a day (Paturevision write)
- [feedback_tasklog_reminder_matrix.md](feedback_tasklog_reminder_matrix.md) — Send Matrix reminder to devs with 0h task log (workday, no leave)

## Per-Developer Rules
### LongVV
- [feedback_longvv_hour_split.md](feedback_longvv_hour_split.md) — **Part-time (16h/wk Maddy)**; check Matrix weekly plan for current project split
- [feedback_longvv_direct_matrix.md](feedback_longvv_direct_matrix.md) — LongVV reminders → `!mYZBGNoLFVpMVIJtPu` (direct), NOT Maddy Xtreme room
### TuanNT
- [feedback_tuannt_trello_gates.md](feedback_tuannt_trello_gates.md) — TuanNT COMBINED 0h (**4 sheets**: JohnYi+Rebecca+Paturevision+Neural) blocks John Yi+Rebecca+Bailey. Any one = no alert.
- [feedback_tuannt_four_sheets.md](feedback_tuannt_four_sheets.md) — **5 sheets, PREV_DATE tokens**: +CharlesChang(19gsF1h...) added 2026-06-17; W-tabs per-project, check Summary tab.
### LeNH
- [feedback_lenh_rebecca_sheet.md](feedback_lenh_rebecca_sheet.md) — LeNH has 3 sheets: Rory+Franc+Rebecca (Q-T) ONLY — NOT Aysar (Aysar=KhanhHH)
- [feedback_lenh_per_sheet_not_alert.md](feedback_lenh_per_sheet_not_alert.md) — 0h in one sheet ≠ alert if working another that day
- [feedback_lenh_partial_hour_alert.md](feedback_lenh_partial_hour_alert.md) — Any <adjusted_target shortfall (even 0.17h) without leave = alert + reminder
- [feedback_rory_franc_gate_slack_only.md](feedback_rory_franc_gate_slack_only.md) — **Rory/Franc Trello items gate on Slack ONLY (Swift/RDC)** — LeNH hours never block these, only trigger personal reminder
### KhanhHH
- [feedback_khanhhh_aysar_second_project.md](feedback_khanhhh_aysar_second_project.md) — **🔴 3 sources: Generator + Baamboozle Workstream + Colin/ETZ Workstream** — Colin/ETZ missed entirely on 2026-06-19, repeat offense pattern
- [feedback_fountain_0h_not_expected_day1.md](feedback_fountain_0h_not_expected_day1.md) — **Fountain 0h on first day of week is NOT expected — 40h/week devs should log 8h/day, always flag**
### Other devs
- [feedback_marcel_adhoc_project.md](feedback_marcel_adhoc_project.md) — Marcel adhoc, 0h is expected
- [feedback_kai_16h_no_daily_report.md](feedback_kai_16h_no_daily_report.md) — Kai 16h/wk, daily report in Xtreme not required
- [feedback_bailey_dev3_not_active.md](feedback_bailey_dev3_not_active.md) — Bailey DEV3/DuongDN inactive, 0h is expected

---

## Upwork & Time Tracking
- [feedback_upwork_in_daily_report.md](feedback_upwork_in_daily_report.md) — Must be included in daily report
- [feedback_upwork_tasklog_by_taskid.md](feedback_upwork_tasklog_by_taskid.md) — Compare by specific task ID, not all rows by person
- [feedback_upwork_filter_by_task_id_strict.md](feedback_upwork_filter_by_task_id_strict.md) — Paturevision col E = Task ID; Bailey contract filter; VietPH 21.25h matched Upwork 21.50h once filtered
- [feedback_upwork_tracker_shared_users.md](feedback_upwork_tracker_shared_users.md) — Trackers shared across users; sum ALL Owners on contract Task ID. Aysar=KhanhHH+LeNH, Rory=LeNH only
- [feedback_upwork_vs_tasklog_all_hours.md](feedback_upwork_vs_tasklog_all_hours.md) — Sum ALL hours (official + part-time) to match Upwork
- [feedback_upwork_match_not_alert.md](feedback_upwork_match_not_alert.md) — Upwork matching task log = OK; week-over-week drops are not alerts
- [feedback_neural_upwork.md](feedback_neural_upwork.md) — Neural Contract: MUST fetch messages via API intercept
- [feedback_neural_silence_not_alert.md](feedback_neural_silence_not_alert.md) — Neural silence / Cloudflare block / auth failure = NEVER an alert. Complete Trello unless urgent unread client msg.
- [feedback_trello_per_client_gates_on_lead_dev.md](feedback_trello_per_client_gates_on_lead_dev.md) — Per-client item gates on lead dev (Nick for John Yi, Elliott for Generator)

---

## Fountain
- [feedback_over_estimate_tracking.md](feedback_over_estimate_tracking.md) — Track if hours still growing week-over-week
- [feedback_hungpn_not_sole_qc.md](feedback_hungpn_not_sole_qc.md) — HungPN 0h not alert if other QC (PhatDLT) covers
- [feedback_trinhmtt_not_qc.md](feedback_trinhmtt_not_qc.md) — TrinhMTT not QC, exclude from Fountain QC alerts
- [feedback_vutq_small_plan_normal.md](feedback_vutq_small_plan_normal.md) — VuTQ small W{n} plan: once weekly total met, subsequent 0h days are normal
- [feedback_fountain_dev_0h_no_speculation.md](feedback_fountain_dev_0h_no_speculation.md) — Don't speculate on individual Fountain dev 0h days as unresolved questions
- [feedback_fountain_hasv_not_on_plan.md](feedback_fountain_hasv_not_on_plan.md) — HaVS not always on Fountain plan; only flag 0h if named in that week's Matrix plan
- [feedback_fountain_monday_plan_timing.md](feedback_fountain_monday_plan_timing.md) — @trinhmtt posts W{n} plan Mon 08:30-09:30 +07. Wait until 09:30 before flagging "plan absent".
- [feedback_fountain_capacity_script_regex_bug.md](feedback_fountain_capacity_script_regex_bug.md) — Capacity scripts must match bare-numeric task names too, not just dash-named — caused 5x false discrepancy 2026-06-21→22

---

## Per-Project Rules
### Elena / SamGuard
- [feedback_elena_auto_deploy.md](feedback_elena_auto_deploy.md) — Auto review+merge+deploy without asking
- [feedback_elena_check_pending_actions_first.md](feedback_elena_check_pending_actions_first.md) — **MUST check `.elena-pending-actions.json` for `deployed:false` BEFORE checking GitHub PRs**
### Bailey / Paturevision
- [feedback_bailey_is_paturevision.md](feedback_bailey_is_paturevision.md) — Bailey DEV1+DEV3 hours in Paturevision spreadsheet (not Marcel)
- [feedback_bailey_invoice_wbs_billing.md](feedback_bailey_invoice_wbs_billing.md) — Bailey invoices use WBS estimates (not task log actuals)
### Aysar / Baamboozle
- [feedback_aysar_github_issues.md](feedback_aysar_github_issues.md) — Also check baamboozle/baamboozle-web-app + bbzl-web-client open issues (carrick token)
- [feedback_aysar_jamie_ronan_room.md](feedback_aysar_jamie_ronan_room.md) — **CORRECTED**: Aysar report = Baamboozle Slack MPDM C07SQ4HAUHZ. Matrix = send reminders only.
- [feedback_aysar_daily_report_slack.md](feedback_aysar_daily_report_slack.md) — General rule: check Slack for daily reports, send Matrix reminder only if missing.
- [feedback_aysar_carrick_post_timing.md](feedback_aysar_carrick_post_timing.md) — Carrick posts Aysar MPDM update ~10:00-10:30+07, not early morning — don't flag absent before then
### Other
- [feedback_matrix_report_format.md](feedback_matrix_report_format.md) — James Diamond + Marcel weekly Matrix message format

---

## Safety & Infrastructure
- [feedback_no_cleanup_without_confirmation.md](feedback_no_cleanup_without_confirmation.md) — NEVER run server cleanup without user confirmation
- [feedback_no_vacuum_full_production.md](feedback_no_vacuum_full_production.md) — NEVER VACUUM FULL on production, use pg_repack
- [feedback_storage_explain_and_alert.md](feedback_storage_explain_and_alert.md) — Storage >= 75%: investigate causes, recommend cleanup

## Dev Environment
- [feedback_ripgrep_execute_permission.md](feedback_ripgrep_execute_permission.md) — After Claude Code npm update: `chmod +x` the bundled rg binary — npm strips execute bit
- [feedback_matrix_daily_summary.md](feedback_matrix_daily_summary.md) — Matrix daily scan = action items table + key updates paragraphs. NEVER raw dump. Rewrite matrix-rooms file after fetch.
- [feedback_sheets_empty_col_a_bug.md](feedback_sheets_empty_col_a_bug.md) — **extractDailyHoursByOwner skips rows with empty col A** — also count rows where col A blank but col G (owner) has value. Bug caused 4.5h instead of 8h for KhanhHH Jun 9.
