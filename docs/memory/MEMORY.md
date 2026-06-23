# Memory Index — one line/entry, detail in linked file (compacted 2026-06-23)

## 🔴 CRITICAL — READ FIRST (rules that failed multiple times)
- [reference_trello_gate_mapping.md](reference_trello_gate_mapping.md) — Exact gate source per Check Progress item
- [feedback_leave_day_handling.md](feedback_leave_day_handling.md) — Leave day → pro-rate weekly target before shortfall
- [feedback_summary_sheet_no_double_count.md](feedback_summary_sheet_no_double_count.md) — Summary col D already grand total
- [feedback_dev_project_mapping_flexible.md](feedback_dev_project_mapping_flexible.md) — ALL devs scan ALL sheets+WS by owner col, never hardcode
- [feedback_sheets_subagent_unreliable.md](feedback_sheets_subagent_unreliable.md) — Verify suspicious 0h findings directly
- [feedback_matrix_resource_arrangement_room.md](feedback_matrix_resource_arrangement_room.md) — Cross-check "Resource Arrangement" room before flagging 0h
- [feedback_subagent_no_unauthorized_writes.md](feedback_subagent_no_unauthorized_writes.md) — Subagents NEVER submit/tick/send/push beyond scope
- [feedback_matrix_token_never_report_expired.md](feedback_matrix_token_never_report_expired.md) — Run matrix-token-refresh.js BEFORE claiming expired
- [feedback_token_handling.md](feedback_token_handling.md) — Amazing Meds + Equanimity xoxc: refresh proactively, never invalid_auth
- [feedback_timeline_system.md](feedback_timeline_system.md) — MUST update `.monitoring-timelines.json` every run
- [feedback_fountain_cr_column.md](feedback_fountain_cr_column.md) — Fountain estimate = Col I + Col J (CR)
- [feedback_fountain_kunal_checklist.md](feedback_fountain_kunal_checklist.md) — Fountain 5-part check MANDATORY every run
- [feedback_report_location.md](feedback_report_location.md) — Reports go in `reports/{YYYY-MM-DD}/...`, NOT `plans/reports/`
- [feedback_khanhhh_aysar_second_project.md](feedback_khanhhh_aysar_second_project.md) — KhanhHH Aysar = LeNH tracker sub-contract
- [feedback_google_sheets_per_employee.md](feedback_google_sheets_per_employee.md) — Filter EVERY dev to own name in multi-employee sheets
- [feedback_workstream_config_not_gitignored.md](feedback_workstream_config_not_gitignored.md) — New `config/.*-config.json` must be gitignored
- [feedback_sheets_scan_script_reuse_wrong_day.md](feedback_sheets_scan_script_reuse_wrong_day.md) — Verify scan script date matches today before trusting output
- [feedback_mpfc_oauth2_real_unresolved_bug.md](feedback_mpfc_oauth2_real_unresolved_bug.md) — MPFC OAuth2 invalid_grant is REAL unresolved, not noise
- [reference_email_accounts_all9.md](reference_email_accounts_all9.md) — 9 email accounts total (6 Zoho+2 Gmail IMAP+1 Gmail API), not 6 — full scans miss 3 if hardcoded
- [feedback_recheck_must_fill_missing_data.md](feedback_recheck_must_fill_missing_data.md) — Recheck mode must re-run sources to fill BLOCKED/expired data, not just fix Trello
- [feedback_news_digest_use_actual_links.md](feedback_news_digest_use_actual_links.md) — News links: use JSON `link`; run fix-links.py after save
- [feedback_check_workstream_before_flagging_shortfall.md](feedback_check_workstream_before_flagging_shortfall.md) — Live-query FULL Workstream project list before any 0h/shortfall line, list itself goes stale

## User / Project / Reference
- [user_role.md](user_role.md) — PM at NUS Technology, 10+ client projects, daily monitoring
- [feedback_investment_analysis_framework.md](feedback_investment_analysis_framework.md) — Growth quality + 3-question conclusion framework
- [reference_matrix_rooms.md](reference_matrix_rooms.md) — Dev Matrix room IDs for task log reminders
- [reference_upwork_workrooms.md](reference_upwork_workrooms.md) — Upwork workroom URLs, credentials, weekly comparison
- [reference_mpfc_github.md](reference_mpfc_github.md) — MPFC repo is mypersonalfootballcoach/wp
- [reference_workstream.md](reference_workstream.md) — Workstream API: single `/api` prefix only
- [reference_elena_wordpress_csp_config.md](reference_elena_wordpress_csp_config.md) — samguard.co CSP in `wp_options.hsts_csp` DB col
- [project_monday_report_sheets.md](project_monday_report_sheets.md) — All 8 Monday report sheet IDs
- [project_timezone_utc7.md](project_timezone_utc7.md) — All times UTC+7; subtract 7h for cron/UTC
- [project_leave_plan_system.md](project_leave_plan_system.md) — Run parse-leave-emails.js before task log checks
- [project_daily_report_workflow.md](project_daily_report_workflow.md) — Full daily report workflow: sources, Trello, configs
- [project_alert_cron_setup.md](project_alert_cron_setup.md) — Alert cron: 30 min interval, env reqs, rate-limit detection
- [project_longvv_james_diamond.md](project_longvv_james_diamond.md) — LongVV assignments change weekly — check Matrix Monday plan
- [project_blake_socal_dropped.md](project_blake_socal_dropped.md) — Blake/SoCal dropped from monitoring 2026-05-11
- [project_php_team.md](project_php_team.md) — PHP team: LongVV, PhucVT, TuanNT, KhanhHH, LeNH, VietPH
- [project_blair_brown_setup.md](project_blair_brown_setup.md) — Blair Brown setup: dev, Workstream ID, FORBIDDEN status

## Recurring Daily Report Errors / News Digest
- [feedback_maddy_jira_weekly_check.md](feedback_maddy_jira_weekly_check.md) — Run EVERY day `--week` check, include table
- [feedback_puppeteer_cron_tmpdir.md](feedback_puppeteer_cron_tmpdir.md) — Puppeteer cron /tmp failure → false 0h; TMPDIR=/var/tmp
- [feedback_vietph_leave_date_cron_bug.md](feedback_vietph_leave_date_cron_bug.md) — Verify leave note date = PREV_DATE before marking leave
- [feedback_tuannt_gate_show_breakdown.md](feedback_tuannt_gate_show_breakdown.md) — TuanNT gate label must show per-sheet breakdown
- [feedback_airagri_webapp_channel.md](feedback_airagri_webapp_channel.md) — Vinn posts in #airagri_webapp too — scan both channels
- [feedback_news_digest_new_topic.md](feedback_news_digest_new_topic.md) — Unknown topic → new topic w/ own RSS sources, never alias
- [feedback_news_digest_php_events.md](feedback_news_digest_php_events.md) — PHP events (PHPverse, Laracon) need full schedule+speakers
- [feedback_news_digest_ai_underused_sources.md](feedback_news_digest_ai_underused_sources.md) — AI section sample ALL 10 sources; FB unscrapeable

## Workflow & Reporting Style
- [feedback_freelancer_email_must_be_scanned.md](feedback_freelancer_email_must_be_scanned.md) — freelancer@mypersonalfootballcoach.com every scan
- [feedback_matrix_tomorrow_is_message_date_plus_one.md](feedback_matrix_tomorrow_is_message_date_plus_one.md) — Leave dates from email/sheets only, never chat
- [feedback_report_style.md](feedback_report_style.md) — Channel-level summaries, concise, no trailing summaries
- [feedback_customer_facing_messages.md](feedback_customer_facing_messages.md) — NEVER expose internal tool/auth failures to customers
- [feedback_always_include_links.md](feedback_always_include_links.md) — Include clickable URLs for Trello/PRs/tickets
- [feedback_ondemand_updates.md](feedback_ondemand_updates.md) — On-demand = separate timestamped file
- [feedback_monday_friday_timestamp.md](feedback_monday_friday_timestamp.md) — Monday report starts from last Friday 8AM
- [feedback_monday_discord_scan_friday_window.md](feedback_monday_discord_scan_friday_window.md) — Monday scan window = Fri 08:00+07
- [feedback_imap_slack_timestamp_gotchas.md](feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE=server dates, Slack after: excludes named date
- [feedback_no_duplicate_sends.md](feedback_no_duplicate_sends.md) — Never re-send while background task pending
- [feedback_never_send_messages_without_permission.md](feedback_never_send_messages_without_permission.md) — Never send msgs unless explicitly authorised

## Alert Classification / Scrin / Tokens
- [feedback_alert_classification.md](feedback_alert_classification.md) — Only our issues, checklist=notes not alerts, staging=INFO
- [feedback_fountain_tasklog_not_monitored.md](feedback_fountain_tasklog_not_monitored.md) — Fountain dev task log hours NOT monitored
- [feedback_rebecca_chua_not_trello_block.md](feedback_rebecca_chua_not_trello_block.md) — "Chưa" in Rebecca col P never blocks Trello
- [feedback_alert_means_no_complete.md](feedback_alert_means_no_complete.md) — Alert found = do NOT complete Trello item
- [feedback_missing_daily_report_is_alert.md](feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert (unless leave)
- [feedback_project_topics_not_alerts.md](feedback_project_topics_not_alerts.md) — Slack dev discussions ≠ alerts
- [feedback_csp_violations_are_real_errors.md](feedback_csp_violations_are_real_errors.md) — samguard.co CSP violations are real errors
- [feedback_blake_rollbar_not_person_alert.md](feedback_blake_rollbar_not_person_alert.md) — Client Rollbar errors don't block per-client items
- [feedback_scrin_consolidated.md](feedback_scrin_consolidated.md) — Scrin tracks Nick not TuanNT; Mon fetch returns Sunday not Friday
- [feedback_decrypt_before_reading.md](feedback_decrypt_before_reading.md) — Run decrypt-secrets.sh before reading config
- [feedback_never_report_token_expired.md](feedback_never_report_token_expired.md) — ZERO TOLERANCE — never report invalid_auth, fix silently
- [feedback_matrix_refresh_headless_bug.md](feedback_matrix_refresh_headless_bug.md) — matrix-token-refresh.js must be headless:false
- [feedback_matrix_join_public_room.md](feedback_matrix_join_public_room.md) — Matrix M_FORBIDDEN = just POST /join
- [feedback_github_account_mapping.md](feedback_github_account_mapping.md) — duongdn=Elena, nusken=Precognize, nuscarrick=default
- [feedback_ssh_passphrase_in_config.md](feedback_ssh_passphrase_in_config.md) — SSH passphrases in ~/.ssh/config comments

## Trello / Slack & Discord
- [feedback_trello_find_by_name.md](feedback_trello_find_by_name.md) — Find recurring cards by name not ID
- [feedback_trello_all_checklists.md](feedback_trello_all_checklists.md) — Check Progress has MULTIPLE checklists, iterate ALL
- [feedback_trello_mail_must_check_email.md](feedback_trello_mail_must_check_email.md) — Trello mail MUST check emails first
- [feedback_trello_progress_reuse_pieces.md](feedback_trello_progress_reuse_pieces.md) — Progress items run ALL mapped source pieces
- [feedback_email_trello_completion.md](feedback_email_trello_completion.md) — Complete all 6 "Check mail" items after email check
- [feedback_checklist_person_link.md](feedback_checklist_person_link.md) — Checklist items name person; status gates completion
- [feedback_trello_per_client_gates_on_lead_dev.md](feedback_trello_per_client_gates_on_lead_dev.md) — Per-client item gates on lead dev
- [feedback_slack_threads.md](feedback_slack_threads.md) — MUST use search.messages API, not conversations.history
- [feedback_discord_only_airagri_bizurk.md](feedback_discord_only_airagri_bizurk.md) — Discord: only AirAgri+Bizurk, NOT HOMIEAPP
- [feedback_vinn_daily_report_format.md](feedback_vinn_daily_report_format.md) — Vinn opens "Just report my process today:" — check N-1
- [feedback_philip_msteams_must_run.md](feedback_philip_msteams_must_run.md) — Philip MS Teams: run with FULL NAME "Philip Briggs"

## Sheets & Task Logs / Per-Developer
- [feedback_sheets_scan_prev_date_for_daily_hours.md](feedback_sheets_scan_prev_date_for_daily_hours.md) — Daily hours scan = PREV_DATE
- [feedback_dev_not_working_project_x_means_that_project_only.md](feedback_dev_not_working_project_x_means_that_project_only.md) — "Not on ProjectX" ≠ 0h total
- [feedback_sheets_wrong_tab_numbering.md](feedback_sheets_wrong_tab_numbering.md) — Tab W{n} ≠ calendar week n; use Summary tab
- [feedback_tasklog_summary_sheet.md](feedback_tasklog_summary_sheet.md) — Summary tab for W{n} lookup ONLY, col D not per-dev
- [feedback_aysar_sheet_owner_is_khanhhh.md](feedback_aysar_sheet_owner_is_khanhhh.md) — Aysar sheet owner=KhanhHH not LeNH
- [feedback_parttime_official_filter.md](feedback_parttime_official_filter.md) — Only "Task dự án" official, exclude Part-time
- [feedback_tasklog_skip_first_row.md](feedback_tasklog_skip_first_row.md) — Never use first empty row of a day
- [feedback_tasklog_reminder_matrix.md](feedback_tasklog_reminder_matrix.md) — Send Matrix reminder for 0h task log (workday, no leave)
- [feedback_tasklog_0h_reminder_complete.md](feedback_tasklog_0h_reminder_complete.md) — 0h + reminder sent = COMPLETE Trello item
- [feedback_no_activity_not_skip.md](feedback_no_activity_not_skip.md) — "No Slack activity" not a skip reason, quiet=OK
- [feedback_marginal_daily_shortfall_check_weekly.md](feedback_marginal_daily_shortfall_check_weekly.md) — Marginal shortfall (<1h): check weekly total first
- [feedback_sheets_empty_col_a_bug.md](feedback_sheets_empty_col_a_bug.md) — extractDailyHoursByOwner must count blank-colA rows w/ col G owner
- [feedback_longvv_consolidated.md](feedback_longvv_consolidated.md) — LongVV 16h/WEEK target (0h/day normal); reminders → direct Matrix room only
- [feedback_maddy_kai_longvv_identity_and_quality_escalation.md](feedback_maddy_kai_longvv_identity_and_quality_escalation.md) — UNRESOLVED: Kai/LongVV may be 40h not 16h (ask user); also LIFM2-439 client trust incident
- [feedback_lenh_consolidated.md](feedback_lenh_consolidated.md) — LeNH: not Aysar owner, per-sheet 0h ≠ alert, any combined shortfall=alert, Rory/Franc gate on Slack only
- [feedback_tuannt_consolidated.md](feedback_tuannt_consolidated.md) — TuanNT combined 0h gates John Yi+Rebecca+Bailey; scan ALL 11 sheets
- [feedback_khanhhh_aysar_second_project.md](feedback_khanhhh_aysar_second_project.md) — Aysar bills via LeNH tracker, exhaust all sources first
- [feedback_low_activity_devs_not_alert.md](feedback_low_activity_devs_not_alert.md) — Marcel/Franc/Kai/Bailey DEV3/Andrew Taraba/GGS Nick: low activity normal

## Upwork & Time Tracking
- [feedback_upwork_in_daily_report.md](feedback_upwork_in_daily_report.md) — Must be included in daily report
- [feedback_upwork_tasklog_by_taskid.md](feedback_upwork_tasklog_by_taskid.md) — Compare by specific task ID, not all rows
- [feedback_upwork_filter_by_task_id_strict.md](feedback_upwork_filter_by_task_id_strict.md) — Paturevision col E=Task ID; Bailey/VietPH filters
- [feedback_upwork_tracker_shared_users.md](feedback_upwork_tracker_shared_users.md) — Trackers shared; sum ALL Owners on contract Task ID
- [feedback_upwork_vs_tasklog_all_hours.md](feedback_upwork_vs_tasklog_all_hours.md) — Sum ALL hours (official+part-time) to match Upwork
- [feedback_upwork_match_not_alert.md](feedback_upwork_match_not_alert.md) — Matching = OK; week-over-week drops not alerts
- [feedback_neural_consolidated.md](feedback_neural_consolidated.md) — Neural: messages_only workroom, must intercept API; silence/Cloudflare never an alert
- [feedback_bailey_paturevision_billing.md](feedback_bailey_paturevision_billing.md) — Bailey hours in Paturevision sheet; invoices bill WBS estimate+buffer

## Fountain
- [feedback_over_estimate_tracking.md](feedback_over_estimate_tracking.md) — Track if hours still growing week-over-week
- [feedback_fountain_dev_specific_consolidated.md](feedback_fountain_dev_specific_consolidated.md) — HungPN/TrinhMTT QC, VuTQ small-plan, HaVS plan-check, no 0h speculation
- [feedback_fountain_0h_not_expected_day1.md](feedback_fountain_0h_not_expected_day1.md) — 0h on day1 NOT expected for 40h/wk devs — flag
- [feedback_fountain_monday_plan_timing.md](feedback_fountain_monday_plan_timing.md) — Plan posts Mon 08:30-09:30+07, wait before flagging
- [feedback_fountain_capacity_script_regex_bug.md](feedback_fountain_capacity_script_regex_bug.md) — Capacity scripts must match bare-numeric task names

## Per-Project Rules / Safety & Infrastructure
- [feedback_elena_consolidated.md](feedback_elena_consolidated.md) — Elena: auto deploy mergeable PRs; check pending-actions.json deployed:false FIRST
- [feedback_aysar_consolidated.md](feedback_aysar_consolidated.md) — Aysar gate=Slack MPDM C07SQ4HAUHZ (not Matrix), posts ~17:00-17:45+07, +GitHub issues
- [feedback_matrix_report_format.md](feedback_matrix_report_format.md) — James Diamond + Marcel weekly Matrix format
- [feedback_server_safety_consolidated.md](feedback_server_safety_consolidated.md) — Never cleanup/VACUUM FULL w/o confirmation; storage alerts need WHY breakdown
- [feedback_matrix_daily_summary.md](feedback_matrix_daily_summary.md) — Matrix scan = action table + key updates, never raw dump
- [feedback_ripgrep_execute_permission.md](feedback_ripgrep_execute_permission.md) — After npm update: chmod +x bundled rg binary
