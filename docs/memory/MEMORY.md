# Memory Index — organized by command, detail in linked file (reorganized 2026-06-23)

**Read scope:** `/util:read-memory <command> [piece]` reads ## Global + the matching command section ONLY — not the whole file. This keeps each command from loading memory it does not need.

## Global — read for every monitoring command
- [project_memory_index_organized_by_command.md](global/project_memory_index_organized_by_command.md) — This index is grouped by command/piece, not topic — read only Global + the matching section
- [feedback_decrypt_before_reading.md](global/feedback_decrypt_before_reading.md) — Run decrypt-secrets.sh before reading config
- [feedback_never_report_token_expired.md](global/feedback_never_report_token_expired.md) — ZERO TOLERANCE — never report invalid_auth, fix silently
- [feedback_workstream_config_not_gitignored.md](global/feedback_workstream_config_not_gitignored.md) — New `config/.*-config.json` must be gitignored
- [feedback_ssh_passphrase_in_config.md](global/feedback_ssh_passphrase_in_config.md) — SSH passphrases in ~/.ssh/config comments
- [feedback_timeline_system.md](global/feedback_timeline_system.md) — MUST update `.monitoring-timelines.json` every run
- [feedback_report_location.md](global/feedback_report_location.md) — Reports go in `reports/{YYYY-MM-DD}/...`, NOT `plans/reports/`
- [feedback_always_include_links.md](global/feedback_always_include_links.md) — Include clickable URLs for Trello/PRs/tickets
- [feedback_customer_facing_messages.md](global/feedback_customer_facing_messages.md) — NEVER expose internal tool/auth failures to customers
- [feedback_never_send_messages_without_permission.md](global/feedback_never_send_messages_without_permission.md) — Never send msgs unless explicitly authorised
- [feedback_no_duplicate_sends.md](global/feedback_no_duplicate_sends.md) — Never re-send while background task pending
- [feedback_subagent_no_unauthorized_writes.md](global/feedback_subagent_no_unauthorized_writes.md) — Subagents NEVER submit/tick/send/push beyond scope
- [feedback_report_style.md](global/feedback_report_style.md) — Channel-level summaries, concise, no trailing summaries
- [feedback_github_account_mapping.md](global/feedback_github_account_mapping.md) — duongdn=Elena, nusken=Precognize, nuscarrick=default
- [feedback_ripgrep_execute_permission.md](global/feedback_ripgrep_execute_permission.md) — After npm update: chmod +x bundled rg binary
- [project_alert_cron_setup.md](global/project_alert_cron_setup.md) — Alert cron: 30 min interval, env reqs, rate-limit detection
- [project_php_team.md](global/project_php_team.md) — PHP team: LongVV, PhucVT, TuanNT, KhanhHH, LeNH, VietPH
- [project_timezone_utc7.md](global/project_timezone_utc7.md) — All times UTC+7; subtract 7h for cron/UTC
- [user_role.md](global/user_role.md) — PM at NUS Technology, 10+ client projects, daily monitoring

## daily-report — general (cross-piece rules)
- [project_daily_report_workflow.md](daily-report/general/project_daily_report_workflow.md) — Full daily report workflow: sources, Trello, configs
- [feedback_ondemand_updates.md](daily-report/general/feedback_ondemand_updates.md) — On-demand = separate timestamped file
- [feedback_recheck_must_fill_missing_data.md](daily-report/general/feedback_recheck_must_fill_missing_data.md) — Recheck mode must re-run sources to fill BLOCKED/expired data, not just fix Trello
- [feedback_monday_friday_timestamp.md](daily-report/general/feedback_monday_friday_timestamp.md) — Monday report starts from last Friday 8AM
- [feedback_alert_classification.md](daily-report/general/feedback_alert_classification.md) — Only our issues, checklist=notes not alerts, staging=INFO
- [feedback_alert_means_no_complete.md](daily-report/general/feedback_alert_means_no_complete.md) — Alert found = do NOT complete Trello item
- [feedback_missing_daily_report_is_alert.md](daily-report/general/feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert (unless leave)

## daily-report:email
- [feedback_freelancer_email_must_be_scanned.md](daily-report/email/feedback_freelancer_email_must_be_scanned.md) — freelancer@mypersonalfootballcoach.com every scan
- [reference_email_accounts_all9.md](daily-report/email/reference_email_accounts_all9.md) — 9 email accounts total (6 Zoho+2 Gmail IMAP+1 Gmail API), not 6 — full scans miss 3 if hardcoded
- [feedback_imap_slack_timestamp_gotchas.md](daily-report/email/feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE=server dates, Slack after: excludes named date

## daily-report:slack
- [feedback_imap_slack_timestamp_gotchas.md](daily-report/email/feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE=server dates, Slack after: excludes named date
- [feedback_slack_threads.md](daily-report/slack/feedback_slack_threads.md) — MUST use search.messages API, not conversations.history
- [feedback_project_topics_not_alerts.md](daily-report/slack/feedback_project_topics_not_alerts.md) — Slack dev discussions ≠ alerts
- [feedback_no_activity_not_skip.md](daily-report/slack/feedback_no_activity_not_skip.md) — "No Slack activity" not a skip reason, quiet=OK
- [feedback_low_activity_devs_not_alert.md](daily-report/slack/feedback_low_activity_devs_not_alert.md) — Marcel/Franc/Kai/Bailey DEV3/Andrew Taraba/GGS Nick: low activity normal
- [feedback_mpfc_oauth2_real_unresolved_bug.md](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md) — MPFC OAuth2 invalid_grant is REAL unresolved, not noise
- [feedback_token_handling.md](daily-report/slack/feedback_token_handling.md) — Amazing Meds + Equanimity xoxc: refresh proactively, never invalid_auth
- [feedback_aysar_consolidated.md](daily-report/slack/feedback_aysar_consolidated.md) — Aysar gate=Slack MPDM C07SQ4HAUHZ (not Matrix), posts ~17:00-17:45+07, +GitHub issues
- [feedback_maddy_kai_longvv_identity_and_quality_escalation.md](daily-report/slack/feedback_maddy_kai_longvv_identity_and_quality_escalation.md) — UNRESOLVED: Kai/LongVV may be 40h not 16h (ask user); also LIFM2-439 client trust incident
- [feedback_puppeteer_cron_tmpdir.md](daily-report/slack/feedback_puppeteer_cron_tmpdir.md) — Puppeteer cron /tmp failure → false 0h; TMPDIR=/var/tmp

## daily-report:discord
- [feedback_airagri_webapp_channel.md](daily-report/discord/feedback_airagri_webapp_channel.md) — Vinn posts in #airagri_webapp too — scan both channels
- [feedback_discord_only_airagri_bizurk.md](daily-report/discord/feedback_discord_only_airagri_bizurk.md) — Discord: only AirAgri+Bizurk, NOT HOMIEAPP
- [feedback_vinn_daily_report_format.md](daily-report/discord/feedback_vinn_daily_report_format.md) — Vinn opens "Just report my process today:" — check N-1
- [feedback_monday_discord_scan_friday_window.md](daily-report/discord/feedback_monday_discord_scan_friday_window.md) — Monday scan window = Fri 08:00+07
- [feedback_no_activity_not_skip.md](daily-report/slack/feedback_no_activity_not_skip.md) — "No Slack activity" not a skip reason, quiet=OK

## daily-report:sheets (task logs / per-developer)
- [feedback_dev_project_mapping_flexible.md](daily-report/sheets/feedback_dev_project_mapping_flexible.md) — ALL devs scan ALL sheets+WS by owner col, never hardcode
- [feedback_sheets_subagent_unreliable.md](daily-report/sheets/feedback_sheets_subagent_unreliable.md) — Verify suspicious 0h findings directly
- [feedback_google_sheets_per_employee.md](daily-report/sheets/feedback_google_sheets_per_employee.md) — Filter EVERY dev to own name in multi-employee sheets
- [feedback_sheets_scan_script_reuse_wrong_day.md](daily-report/sheets/feedback_sheets_scan_script_reuse_wrong_day.md) — Verify scan script date matches today before trusting output
- [feedback_khanhhh_aysar_second_project.md](daily-report/sheets/feedback_khanhhh_aysar_second_project.md) — Aysar bills via LeNH tracker, exhaust all sources first
- [feedback_check_workstream_before_flagging_shortfall.md](daily-report/sheets/feedback_check_workstream_before_flagging_shortfall.md) — Live-query FULL Workstream project list before any 0h/shortfall line, list itself goes stale
- [feedback_sheets_scan_prev_date_for_daily_hours.md](daily-report/sheets/feedback_sheets_scan_prev_date_for_daily_hours.md) — Daily hours scan = PREV_DATE
- [feedback_dev_not_working_project_x_means_that_project_only.md](daily-report/sheets/feedback_dev_not_working_project_x_means_that_project_only.md) — "Not on ProjectX" ≠ 0h total
- [feedback_sheets_wrong_tab_numbering.md](daily-report/sheets/feedback_sheets_wrong_tab_numbering.md) — Tab W{n} ≠ calendar week n; use Summary tab
- [feedback_tasklog_summary_sheet.md](daily-report/sheets/feedback_tasklog_summary_sheet.md) — Summary tab for W{n} lookup ONLY, col D not per-dev
- [feedback_aysar_sheet_owner_is_khanhhh.md](daily-report/sheets/feedback_aysar_sheet_owner_is_khanhhh.md) — Aysar sheet owner=KhanhHH not LeNH
- [feedback_parttime_official_filter.md](daily-report/sheets/feedback_parttime_official_filter.md) — Only "Task dự án" official, exclude Part-time
- [feedback_tasklog_reminder_matrix.md](daily-report/sheets/feedback_tasklog_reminder_matrix.md) — Send Matrix reminder for 0h task log (workday, no leave)
- [feedback_tasklog_0h_reminder_complete.md](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md) — 0h + reminder sent = COMPLETE Trello item
- [feedback_marginal_daily_shortfall_check_weekly.md](daily-report/sheets/feedback_marginal_daily_shortfall_check_weekly.md) — Marginal shortfall (<1h): check weekly total first
- [feedback_sheets_empty_col_a_bug.md](daily-report/sheets/feedback_sheets_empty_col_a_bug.md) — extractDailyHoursByOwner must count blank-colA rows w/ col G owner
- [feedback_longvv_consolidated.md](daily-report/sheets/feedback_longvv_consolidated.md) — LongVV 16h/WEEK target (0h/day normal); reminders → direct Matrix room only
- [feedback_maddy_kai_longvv_identity_and_quality_escalation.md](daily-report/slack/feedback_maddy_kai_longvv_identity_and_quality_escalation.md) — UNRESOLVED: Kai/LongVV may be 40h not 16h (ask user); also LIFM2-439 client trust incident
- [feedback_lenh_consolidated.md](daily-report/sheets/feedback_lenh_consolidated.md) — LeNH: not Aysar owner, per-sheet 0h ≠ alert, any combined shortfall=alert, Rory/Franc gate on Slack only
- [feedback_tuannt_consolidated.md](daily-report/sheets/feedback_tuannt_consolidated.md) — TuanNT combined 0h gates John Yi+Rebecca+Bailey; scan ALL 11 sheets
- [feedback_leave_day_handling.md](daily-report/sheets/feedback_leave_day_handling.md) — Leave day → pro-rate weekly target before shortfall
- [feedback_summary_sheet_no_double_count.md](daily-report/sheets/feedback_summary_sheet_no_double_count.md) — Summary col D already grand total
- [feedback_vietph_leave_date_cron_bug.md](daily-report/sheets/feedback_vietph_leave_date_cron_bug.md) — Verify leave note date = PREV_DATE before marking leave
- [feedback_matrix_tomorrow_is_message_date_plus_one.md](daily-report/sheets/feedback_matrix_tomorrow_is_message_date_plus_one.md) — Leave dates from email/sheets only, never chat
- [project_leave_plan_system.md](daily-report/sheets/project_leave_plan_system.md) — Run parse-leave-emails.js before task log checks
- [reference_workstream.md](daily-report/sheets/reference_workstream.md) — Workstream API: single `/api` prefix only
- [feedback_maddy_jira_weekly_check.md](daily-report/sheets/feedback_maddy_jira_weekly_check.md) — Run EVERY day `--week` check, include table

## daily-report:scrin
- [feedback_scrin_consolidated.md](daily-report/scrin/feedback_scrin_consolidated.md) — Scrin tracks Nick not TuanNT; Mon fetch returns Sunday not Friday

## daily-report:fountain
- [feedback_fountain_cr_column.md](daily-report/fountain/feedback_fountain_cr_column.md) — Fountain estimate = Col I + Col J (CR)
- [feedback_fountain_kunal_checklist.md](daily-report/fountain/feedback_fountain_kunal_checklist.md) — Fountain 5-part check MANDATORY every run
- [feedback_fountain_dev_specific_consolidated.md](daily-report/fountain/feedback_fountain_dev_specific_consolidated.md) — HungPN/TrinhMTT QC, VuTQ small-plan, HaVS plan-check, no 0h speculation
- [feedback_fountain_0h_not_expected_day1.md](daily-report/fountain/feedback_fountain_0h_not_expected_day1.md) — 0h on day1 NOT expected for 40h/wk devs — flag
- [feedback_fountain_monday_plan_timing.md](daily-report/fountain/feedback_fountain_monday_plan_timing.md) — Plan posts Mon 08:30-09:30+07, wait before flagging
- [feedback_fountain_capacity_script_regex_bug.md](daily-report/fountain/feedback_fountain_capacity_script_regex_bug.md) — Capacity scripts must match bare-numeric task names
- [feedback_fountain_tasklog_not_monitored.md](daily-report/fountain/feedback_fountain_tasklog_not_monitored.md) — Fountain dev task log hours NOT monitored
- [feedback_over_estimate_tracking.md](daily-report/fountain/feedback_over_estimate_tracking.md) — Track if hours still growing week-over-week

## daily-report:elena
- [feedback_elena_consolidated.md](daily-report/elena/feedback_elena_consolidated.md) — Elena: auto deploy mergeable PRs; check pending-actions.json deployed:false FIRST
- [feedback_csp_violations_are_real_errors.md](daily-report/elena/feedback_csp_violations_are_real_errors.md) — samguard.co CSP violations are real errors
- [reference_elena_wordpress_csp_config.md](daily-report/elena/reference_elena_wordpress_csp_config.md) — samguard.co CSP in `wp_options.hsts_csp` DB col

## daily-report:trello (Check Progress / Check Mail)
- [reference_trello_gate_mapping.md](daily-report/trello/reference_trello_gate_mapping.md) — Exact gate source per Check Progress item
- [feedback_trello_find_by_name.md](daily-report/trello/feedback_trello_find_by_name.md) — Find recurring cards by name not ID
- [feedback_trello_all_checklists.md](daily-report/trello/feedback_trello_all_checklists.md) — Check Progress has MULTIPLE checklists, iterate ALL
- [feedback_trello_mail_must_check_email.md](daily-report/trello/feedback_trello_mail_must_check_email.md) — Trello mail MUST check emails first
- [feedback_trello_progress_reuse_pieces.md](daily-report/trello/feedback_trello_progress_reuse_pieces.md) — Progress items run ALL mapped source pieces
- [feedback_email_trello_completion.md](daily-report/trello/feedback_email_trello_completion.md) — Complete all 6 "Check mail" items after email check
- [feedback_checklist_person_link.md](daily-report/trello/feedback_checklist_person_link.md) — Checklist items name person; status gates completion
- [feedback_trello_per_client_gates_on_lead_dev.md](daily-report/trello/feedback_trello_per_client_gates_on_lead_dev.md) — Per-client item gates on lead dev
- [feedback_philip_msteams_must_run.md](daily-report/trello/feedback_philip_msteams_must_run.md) — Philip MS Teams: run with FULL NAME "Philip Briggs"
- [feedback_rebecca_chua_not_trello_block.md](daily-report/trello/feedback_rebecca_chua_not_trello_block.md) — "Chưa" in Rebecca col P never blocks Trello
- [feedback_blake_rollbar_not_person_alert.md](daily-report/trello/feedback_blake_rollbar_not_person_alert.md) — Client Rollbar errors don't block per-client items
- [feedback_tuannt_gate_show_breakdown.md](daily-report/trello/feedback_tuannt_gate_show_breakdown.md) — TuanNT gate label must show per-sheet breakdown
- [feedback_tasklog_0h_reminder_complete.md](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md) — 0h + reminder sent = COMPLETE Trello item
- [feedback_lenh_consolidated.md](daily-report/sheets/feedback_lenh_consolidated.md) — LeNH: not Aysar owner, per-sheet 0h ≠ alert, any combined shortfall=alert, Rory/Franc gate on Slack only
- [feedback_tuannt_consolidated.md](daily-report/sheets/feedback_tuannt_consolidated.md) — TuanNT combined 0h gates John Yi+Rebecca+Bailey; scan ALL 11 sheets
- [feedback_aysar_consolidated.md](daily-report/slack/feedback_aysar_consolidated.md) — Aysar gate=Slack MPDM C07SQ4HAUHZ (not Matrix), posts ~17:00-17:45+07, +GitHub issues
- [project_blake_socal_dropped.md](daily-report/trello/project_blake_socal_dropped.md) — Blake/SoCal dropped from monitoring 2026-05-11

## daily-report:reminders
- [feedback_tasklog_reminder_matrix.md](daily-report/sheets/feedback_tasklog_reminder_matrix.md) — Send Matrix reminder for 0h task log (workday, no leave)
- [feedback_tasklog_0h_reminder_complete.md](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md) — 0h + reminder sent = COMPLETE Trello item
- [reference_matrix_rooms.md](daily-report/reminders/reference_matrix_rooms.md) — Dev Matrix room IDs for task log reminders

## daily-report:matrix
- [feedback_matrix_daily_summary.md](daily-report/matrix/feedback_matrix_daily_summary.md) — Matrix scan = action table + key updates, never raw dump
- [feedback_matrix_join_public_room.md](daily-report/matrix/feedback_matrix_join_public_room.md) — Matrix M_FORBIDDEN = just POST /join
- [feedback_matrix_refresh_headless_bug.md](daily-report/matrix/feedback_matrix_refresh_headless_bug.md) — matrix-token-refresh.js must be headless:false
- [feedback_matrix_resource_arrangement_room.md](daily-report/matrix/feedback_matrix_resource_arrangement_room.md) — Cross-check "Resource Arrangement" room before flagging 0h
- [feedback_matrix_token_never_report_expired.md](daily-report/matrix/feedback_matrix_token_never_report_expired.md) — Run matrix-token-refresh.js BEFORE claiming expired
- [feedback_matrix_tomorrow_is_message_date_plus_one.md](daily-report/sheets/feedback_matrix_tomorrow_is_message_date_plus_one.md) — Leave dates from email/sheets only, never chat
- [reference_matrix_rooms.md](daily-report/reminders/reference_matrix_rooms.md) — Dev Matrix room IDs for task log reminders
- [project_longvv_james_diamond.md](daily-report/matrix/project_longvv_james_diamond.md) — LongVV assignments change weekly — check Matrix Monday plan
- [feedback_token_handling.md](daily-report/slack/feedback_token_handling.md) — Amazing Meds + Equanimity xoxc: refresh proactively, never invalid_auth
- [feedback_longvv_consolidated.md](daily-report/sheets/feedback_longvv_consolidated.md) — LongVV 16h/WEEK target (0h/day normal); reminders → direct Matrix room only

## daily-report:upwork
- [feedback_upwork_in_daily_report.md](daily-report/upwork/feedback_upwork_in_daily_report.md) — Must be included in daily report
- [feedback_upwork_tasklog_by_taskid.md](daily-report/upwork/feedback_upwork_tasklog_by_taskid.md) — Compare by specific task ID, not all rows
- [feedback_upwork_filter_by_task_id_strict.md](daily-report/upwork/feedback_upwork_filter_by_task_id_strict.md) — Paturevision col E=Task ID; Bailey/VietPH filters
- [feedback_upwork_tracker_shared_users.md](daily-report/upwork/feedback_upwork_tracker_shared_users.md) — Trackers shared; sum ALL Owners on contract Task ID
- [feedback_upwork_vs_tasklog_all_hours.md](daily-report/upwork/feedback_upwork_vs_tasklog_all_hours.md) — Sum ALL hours (official+part-time) to match Upwork
- [feedback_upwork_match_not_alert.md](daily-report/upwork/feedback_upwork_match_not_alert.md) — Matching = OK; week-over-week drops not alerts
- [feedback_neural_consolidated.md](daily-report/upwork/feedback_neural_consolidated.md) — Neural: messages_only workroom, must intercept API; silence/Cloudflare never an alert
- [reference_upwork_workrooms.md](daily-report/upwork/reference_upwork_workrooms.md) — Upwork workroom URLs, credentials, weekly comparison

## bailey-invoice-verify / bailey-monitor / bailey-task-monitor
- [feedback_bailey_paturevision_billing.md](bailey/feedback_bailey_paturevision_billing.md) — Bailey hours in Paturevision sheet; invoices bill WBS estimate+buffer
- [feedback_tasklog_skip_first_row.md](bailey/feedback_tasklog_skip_first_row.md) — Never use first empty row of a day
- [feedback_upwork_filter_by_task_id_strict.md](daily-report/upwork/feedback_upwork_filter_by_task_id_strict.md) — Paturevision col E=Task ID; Bailey/VietPH filters

## mpfc-monitor
- [feedback_mpfc_oauth2_real_unresolved_bug.md](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md) — MPFC OAuth2 invalid_grant is REAL unresolved, not noise
- [reference_mpfc_github.md](mpfc-monitor/reference_mpfc_github.md) — MPFC repo is mypersonalfootballcoach/wp

## weekly-report
- [feedback_matrix_report_format.md](weekly-report/feedback_matrix_report_format.md) — James Diamond + Marcel weekly Matrix format
- [feedback_check_workstream_before_flagging_shortfall.md](daily-report/sheets/feedback_check_workstream_before_flagging_shortfall.md) — Live-query FULL Workstream project list before any 0h/shortfall line, list itself goes stale
- [feedback_maddy_jira_weekly_check.md](daily-report/sheets/feedback_maddy_jira_weekly_check.md) — Run EVERY day `--week` check, include table
- [feedback_leave_day_handling.md](daily-report/sheets/feedback_leave_day_handling.md) — Leave day → pro-rate weekly target before shortfall
- [project_blair_brown_setup.md](weekly-report/project_blair_brown_setup.md) — Blair Brown setup: dev, Workstream ID, FORBIDDEN status
- [project_longvv_james_diamond.md](daily-report/matrix/project_longvv_james_diamond.md) — LongVV assignments change weekly — check Matrix Monday plan
- [reference_workstream.md](daily-report/sheets/reference_workstream.md) — Workstream API: single `/api` prefix only

## monday-report
- [project_monday_report_sheets.md](monday-report/project_monday_report_sheets.md) — All 8 Monday report sheet IDs
- [feedback_summary_sheet_no_double_count.md](daily-report/sheets/feedback_summary_sheet_no_double_count.md) — Summary col D already grand total
- [feedback_tasklog_summary_sheet.md](daily-report/sheets/feedback_tasklog_summary_sheet.md) — Summary tab for W{n} lookup ONLY, col D not per-dev
- [reference_workstream.md](daily-report/sheets/reference_workstream.md) — Workstream API: single `/api` prefix only

## money-report
- [feedback_misa_money_report_net_worth_bugs.md](money-report/feedback_misa_money_report_net_worth_bugs.md) — MISA Net Worth: ALWAYS use `trueTotalBalance` API, never reconstruct manually; FX bug undercounts USD income — see [[reference_misa_money_report_skill_file]]
- [reference_misa_money_report_skill_file.md](money-report/reference_misa_money_report_skill_file.md) — MISA money-report rules live in `.claude/commands/me/money-report.md`, not memory
- [feedback_investment_analysis_framework.md](money-report/feedback_investment_analysis_framework.md) — Growth quality + 3-question conclusion framework

## news-digest
- [feedback_news_digest_new_topic.md](news-digest/feedback_news_digest_new_topic.md) — Unknown topic → new topic w/ own RSS sources, never alias
- [feedback_news_digest_php_events.md](news-digest/feedback_news_digest_php_events.md) — PHP events (PHPverse, Laracon) need full schedule+speakers
- [feedback_news_digest_ai_underused_sources.md](news-digest/feedback_news_digest_ai_underused_sources.md) — AI section sample ALL 10 sources; FB unscrapeable
- [feedback_news_digest_use_actual_links.md](news-digest/feedback_news_digest_use_actual_links.md) — News links: use JSON `link`; run fix-links.py after save

## server-monitor
- [feedback_server_safety_consolidated.md](server-monitor/feedback_server_safety_consolidated.md) — Never cleanup/VACUUM FULL w/o confirmation; storage alerts need WHY breakdown
- [feedback_ssh_passphrase_in_config.md](global/feedback_ssh_passphrase_in_config.md) — SSH passphrases in ~/.ssh/config comments

## No dedicated memory yet
trello-monitor, bailey-invoice-verify (billing-specific notes live under bailey above), cdf-monitor, tax-check, vn-bank-rates — self-contained skill files, nothing in memory targets them specifically.
