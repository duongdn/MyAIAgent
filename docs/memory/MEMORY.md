# Memory Index — organized by command, detail in linked file (reorganized 2026-06-24)

**Read scope:** `/util:read-memory <command> [piece]` reads ## Global + the matching command section ONLY — not the whole file.

## Global — read for every monitoring command
- [project_memory_index_organized_by_command](global/project_memory_index_organized_by_command.md) — Index grouped by command/piece — read only Global + matching section
- [feedback_decrypt_before_reading](global/feedback_decrypt_before_reading.md), [feedback_ssh_passphrase_in_config](global/feedback_ssh_passphrase_in_config.md) — Run decrypt-secrets.sh before reading config; SSH passphrases live in ~/.ssh/config comments
- [feedback_never_report_token_expired](global/feedback_never_report_token_expired.md) — ZERO TOLERANCE — never report invalid_auth, fix silently
- [feedback_workstream_config_not_gitignored](global/feedback_workstream_config_not_gitignored.md) — New `config/.*-config.json` must be gitignored
- [feedback_timeline_system](global/feedback_timeline_system.md) — MUST update `.monitoring-timelines.json` every run
- [feedback_report_location](global/feedback_report_location.md) — Reports go in `reports/{YYYY-MM-DD}/...`, NOT `plans/reports/`
- [feedback_always_include_links](global/feedback_always_include_links.md), [feedback_report_style](global/feedback_report_style.md) — Channel-level summaries, concise, no trailing summary; always include clickable URLs
- [feedback_customer_facing_messages](global/feedback_customer_facing_messages.md) — NEVER expose internal tool/auth failures to customers
- [feedback_never_send_messages_without_permission](global/feedback_never_send_messages_without_permission.md), [feedback_no_duplicate_sends](global/feedback_no_duplicate_sends.md), [feedback_subagent_no_unauthorized_writes](global/feedback_subagent_no_unauthorized_writes.md) — Never send/re-send without explicit authorization; subagents never submit/tick/send/push beyond scope
- [feedback_github_account_mapping](global/feedback_github_account_mapping.md) — duongdn=Elena, nusken=Precognize, nuscarrick=default
- [project_alert_cron_setup](global/project_alert_cron_setup.md) — Alert cron: 30 min interval, env reqs, rate-limit detection
- [project_php_team](global/project_php_team.md) — PHP team: LongVV, PhucVT, TuanNT, KhanhHH, LeNH, VietPH
- [project_timezone_utc7](global/project_timezone_utc7.md) — All times UTC+7; subtract 7h for cron/UTC
- [user_role](global/user_role.md) — PM at NUS Technology, 10+ client projects, daily monitoring

## daily-report — general (cross-piece rules)
- [project_daily_report_workflow](daily-report/general/project_daily_report_workflow.md) — Full daily report workflow: sources, Trello, configs
- [feedback_ondemand_updates](daily-report/general/feedback_ondemand_updates.md), [feedback_recheck_must_fill_missing_data](daily-report/general/feedback_recheck_must_fill_missing_data.md) — On-demand = separate timestamped file; recheck mode must re-run sources to fill BLOCKED/expired data AND reclassify wrongly-skipped no-activity items, not just fix Trello
- [feedback_monday_friday_timestamp](daily-report/general/feedback_monday_friday_timestamp.md) — Monday report starts from last Friday 8AM
- [feedback_alert_classification](daily-report/general/feedback_alert_classification.md), [feedback_alert_means_no_complete](daily-report/general/feedback_alert_means_no_complete.md) — Only our issues count as alerts (checklist=notes, staging=INFO); if alert found, do NOT complete Trello item
- [feedback_missing_daily_report_is_alert](daily-report/general/feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert (unless leave)

## daily-report:email
- [feedback_freelancer_email_must_be_scanned](daily-report/email/feedback_freelancer_email_must_be_scanned.md) — freelancer@mypersonalfootballcoach.com every scan
- [reference_email_accounts_all9](daily-report/email/reference_email_accounts_all9.md) — 9 email accounts total (6 Zoho+2 Gmail IMAP+1 Gmail API), not 6
- [feedback_imap_slack_timestamp_gotchas](daily-report/email/feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE=server dates, Slack after: excludes named date

## daily-report:slack
- [feedback_slack_threads](daily-report/slack/feedback_slack_threads.md) — MUST use search.messages API, not conversations.history
- [feedback_project_topics_not_alerts](daily-report/slack/feedback_project_topics_not_alerts.md), [feedback_no_activity_not_skip](daily-report/slack/feedback_no_activity_not_skip.md), [feedback_low_activity_devs_not_alert](daily-report/slack/feedback_low_activity_devs_not_alert.md) — Dev discussions ≠ alerts; "no activity" alone isn't a skip reason; Marcel/Franc/Kai/Bailey DEV3/Andrew Taraba/GGS Nick low activity = normal
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md) — MPFC OAuth2 invalid_grant is REAL unresolved, not noise
- [feedback_token_handling](daily-report/slack/feedback_token_handling.md) — Amazing Meds + Equanimity xoxc: refresh proactively, never invalid_auth
- [feedback_aysar_consolidated](daily-report/slack/feedback_aysar_consolidated.md) — Aysar gate=Slack MPDM C07SQ4HAUHZ (not Matrix), posts ~17:00-17:45+07, +GitHub issues
- [feedback_maddy_kai_longvv_identity_and_quality_escalation](daily-report/slack/feedback_maddy_kai_longvv_identity_and_quality_escalation.md) — UNRESOLVED: Kai/LongVV may be 40h not 16h (ask user); also LIFM2-439 client trust incident
- [feedback_puppeteer_cron_tmpdir](daily-report/slack/feedback_puppeteer_cron_tmpdir.md) — Puppeteer cron /tmp failure → false 0h; TMPDIR=/var/tmp

## daily-report:discord
- [feedback_airagri_webapp_channel](daily-report/discord/feedback_airagri_webapp_channel.md), [feedback_discord_only_airagri_bizurk](daily-report/discord/feedback_discord_only_airagri_bizurk.md) — Discord: only AirAgri (+#airagri_webapp channel) + Bizurk, NOT HOMIEAPP
- [feedback_vinn_daily_report_format](daily-report/discord/feedback_vinn_daily_report_format.md) — Vinn opens "Just report my process today:" — check N-1
- [feedback_monday_discord_scan_friday_window](daily-report/discord/feedback_monday_discord_scan_friday_window.md) — Monday scan window = Fri 08:00+07

## daily-report:sheets (task logs / per-developer)
- [feedback_workstream_all_projects_in_script](daily-report/sheets/feedback_workstream_all_projects_in_script.md) — CRITICAL: workstream-fetch-project-week.js must include ALL 9 projects; blair_brown must be manager:true; missing = false 0h alerts
- [feedback_dev_project_mapping_flexible](daily-report/sheets/feedback_dev_project_mapping_flexible.md) — ALL devs scan ALL sheets+WS by owner col, never hardcode
- [feedback_sheets_subagent_unreliable](daily-report/sheets/feedback_sheets_subagent_unreliable.md), [feedback_google_sheets_per_employee](daily-report/sheets/feedback_google_sheets_per_employee.md) — Verify suspicious 0h findings directly; filter EVERY dev to own name in multi-employee sheets
- [feedback_sheets_scan_script_reuse_wrong_day](daily-report/sheets/feedback_sheets_scan_script_reuse_wrong_day.md), [feedback_sheets_scan_prev_date_for_daily_hours](daily-report/sheets/feedback_sheets_scan_prev_date_for_daily_hours.md) — Verify scan script/date matches PREV_DATE before trusting daily-hours output
- [feedback_check_workstream_before_flagging_shortfall](daily-report/sheets/feedback_check_workstream_before_flagging_shortfall.md), [feedback_marginal_daily_shortfall_check_weekly](daily-report/sheets/feedback_marginal_daily_shortfall_check_weekly.md) — Live-query FULL Workstream list before any 0h/shortfall line (goes stale); marginal shortfall (<1h) check weekly total first
- [feedback_no_dated_scan_scripts](daily-report/sheets/feedback_no_dated_scan_scripts.md) — NEVER write dated daily-sheets-scan-*.js copies; use canonical scripts/sheets-tasklog-scan.js (KhanhHH/Generator bug recurred 1 day after first fix because fixes didn't carry forward)
- [feedback_dev_not_working_project_x_means_that_project_only](daily-report/sheets/feedback_dev_not_working_project_x_means_that_project_only.md), [feedback_parttime_official_filter](daily-report/sheets/feedback_parttime_official_filter.md) — "Not on ProjectX" ≠ 0h total; only "Task dự án" counts official, exclude Part-time
- [feedback_sheets_wrong_tab_numbering](daily-report/sheets/feedback_sheets_wrong_tab_numbering.md), [feedback_sheets_empty_col_a_bug](daily-report/sheets/feedback_sheets_empty_col_a_bug.md) — Tab W{n} ≠ calendar week n (use Summary tab); blank-colA rows still count if col G has owner
- [feedback_tasklog_summary_sheet](daily-report/sheets/feedback_tasklog_summary_sheet.md) — Summary tab for W{n} lookup ONLY, col D not per-dev
- [feedback_khanhhh_aysar_second_project](daily-report/sheets/feedback_khanhhh_aysar_second_project.md), [feedback_aysar_sheet_owner_is_khanhhh](daily-report/sheets/feedback_aysar_sheet_owner_is_khanhhh.md) — Aysar sheet owner=KhanhHH not LeNH; bills via LeNH tracker too, exhaust all sources first
- [feedback_longvv_consolidated](daily-report/sheets/feedback_longvv_consolidated.md) — LongVV 16h/WEEK target (0h/day normal); reminders → direct Matrix room only
- [feedback_lenh_consolidated](daily-report/sheets/feedback_lenh_consolidated.md) — LeNH: not Aysar owner, per-sheet 0h ≠ alert, any combined shortfall=alert, Rory/Franc gate on Slack only
- [feedback_tuannt_consolidated](daily-report/sheets/feedback_tuannt_consolidated.md) — TuanNT combined 0h gates John Yi+Rebecca+Bailey; scan ALL 11 sheets
- [feedback_summary_sheet_no_double_count](daily-report/sheets/feedback_summary_sheet_no_double_count.md) — Summary col D already grand total
- [feedback_vietph_leave_date_cron_bug](daily-report/sheets/feedback_vietph_leave_date_cron_bug.md), [project_leave_plan_system](daily-report/sheets/project_leave_plan_system.md), [feedback_leave_day_handling](daily-report/sheets/feedback_leave_day_handling.md) — Run parse-leave-emails.js before task log checks; verify leave note date=PREV_DATE; pro-rate weekly target on leave days
- [reference_workstream](daily-report/sheets/reference_workstream.md), [feedback_maddy_jira_weekly_check](daily-report/sheets/feedback_maddy_jira_weekly_check.md) — Workstream API: single `/api` prefix only; run EVERY day `--week` Jira check, include table
- [feedback_encrypt_secrets_missing_workstream](daily-report/sheets/feedback_encrypt_secrets_missing_workstream.md) — encrypt-secrets.sh was missing workstream/newrelic/rollbar configs, silently dropping every Workstream token refresh (fixed 2026-06-25)

## daily-report:scrin
- [feedback_scrin_consolidated](daily-report/scrin/feedback_scrin_consolidated.md) — Scrin tracks Nick not TuanNT; Mon fetch returns Sunday not Friday

## daily-report:fountain
- [feedback_fountain_cr_column](daily-report/fountain/feedback_fountain_cr_column.md) — Fountain estimate = Col I + Col J (CR)
- [feedback_fountain_kunal_checklist](daily-report/fountain/feedback_fountain_kunal_checklist.md) — Fountain 5-part check MANDATORY every run
- [feedback_fountain_dev_specific_consolidated](daily-report/fountain/feedback_fountain_dev_specific_consolidated.md) — HungPN/TrinhMTT QC, VuTQ small-plan, HaVS plan-check, no 0h speculation
- [feedback_fountain_0h_not_expected_day1](daily-report/fountain/feedback_fountain_0h_not_expected_day1.md), [feedback_fountain_monday_plan_timing](daily-report/fountain/feedback_fountain_monday_plan_timing.md) — 0h day1 NOT expected for 40h/wk devs — flag; Monday plan posts 08:30-09:30+07, wait before flagging
- [feedback_fountain_capacity_script_regex_bug](daily-report/fountain/feedback_fountain_capacity_script_regex_bug.md), [feedback_fountain_tasklog_not_monitored](daily-report/fountain/feedback_fountain_tasklog_not_monitored.md) — Capacity scripts must match bare-numeric task names; dev task log hours NOT monitored
- [feedback_over_estimate_tracking](daily-report/fountain/feedback_over_estimate_tracking.md) — Track if hours still growing week-over-week

## daily-report:elena
- [feedback_elena_consolidated](daily-report/elena/feedback_elena_consolidated.md) — Elena: auto deploy mergeable PRs; check pending-actions.json deployed:false FIRST
- [feedback_csp_violations_are_real_errors](daily-report/elena/feedback_csp_violations_are_real_errors.md), [reference_elena_wordpress_csp_config](daily-report/elena/reference_elena_wordpress_csp_config.md) — samguard.co CSP violations are real errors; config in `wp_options.hsts_csp` DB col

## daily-report:trello (Check Progress / Check Mail)
- [reference_trello_gate_mapping](daily-report/trello/reference_trello_gate_mapping.md), [feedback_trello_all_checklists](daily-report/trello/feedback_trello_all_checklists.md) — Exact gate source per item; Check Progress has MULTIPLE checklists, iterate ALL
- [feedback_trello_find_by_name](daily-report/trello/feedback_trello_find_by_name.md) — Find recurring cards by name not ID
- [feedback_trello_mail_must_check_email](daily-report/trello/feedback_trello_mail_must_check_email.md), [feedback_email_trello_completion](daily-report/trello/feedback_email_trello_completion.md) — "Check mail" MUST check email first; completing it marks all 6 "Check mail" items done
- [feedback_trello_progress_reuse_pieces](daily-report/trello/feedback_trello_progress_reuse_pieces.md) — Progress items run ALL mapped source pieces (sheets/slack memory applies here too)
- [feedback_checklist_person_link](daily-report/trello/feedback_checklist_person_link.md) — Checklist items name person; status gates completion
- [feedback_trello_per_client_gates_on_lead_dev](daily-report/trello/feedback_trello_per_client_gates_on_lead_dev.md), [feedback_philip_msteams_must_run](daily-report/trello/feedback_philip_msteams_must_run.md) — Per-client item gates on lead dev; Philip MS Teams check needs FULL NAME "Philip Briggs"
- [feedback_rebecca_chua_not_trello_block](daily-report/trello/feedback_rebecca_chua_not_trello_block.md), [feedback_blake_rollbar_not_person_alert](daily-report/trello/feedback_blake_rollbar_not_person_alert.md) — Never block Trello: Rebecca col P "Chưa", client Rollbar errors
- [feedback_tuannt_gate_show_breakdown](daily-report/trello/feedback_tuannt_gate_show_breakdown.md) — TuanNT gate label must show per-sheet breakdown

## daily-report:reminders
- [feedback_tasklog_reminder_matrix](daily-report/sheets/feedback_tasklog_reminder_matrix.md) — Send Matrix reminder for 0h task log (workday, no leave)
- [feedback_tasklog_0h_reminder_complete](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md) — 0h + reminder sent = COMPLETE Trello item
- [reference_matrix_rooms](daily-report/reminders/reference_matrix_rooms.md) — Dev Matrix room IDs for task log reminders

## daily-report:matrix
- [feedback_matrix_daily_summary](daily-report/matrix/feedback_matrix_daily_summary.md) — Matrix scan = action table + key updates, never raw dump
- [feedback_matrix_join_public_room](daily-report/matrix/feedback_matrix_join_public_room.md) — Matrix M_FORBIDDEN = just POST /join
- [feedback_matrix_refresh_headless_bug](daily-report/matrix/feedback_matrix_refresh_headless_bug.md), [feedback_matrix_token_never_report_expired](daily-report/matrix/feedback_matrix_token_never_report_expired.md) — matrix-token-refresh.js must be headless:false; run it BEFORE claiming token expired
- [feedback_matrix_token_short_lived](daily-report/matrix/feedback_matrix_token_short_lived.md) — access_token expires within minutes; fetch data immediately after refresh, don't delay
- [feedback_matrix_resource_arrangement_room](daily-report/matrix/feedback_matrix_resource_arrangement_room.md) — Cross-check "Resource Arrangement" room before flagging 0h
- [feedback_matrix_tomorrow_is_message_date_plus_one](daily-report/sheets/feedback_matrix_tomorrow_is_message_date_plus_one.md) — Leave dates from email/sheets only, never chat
- [project_longvv_james_diamond](daily-report/matrix/project_longvv_james_diamond.md) — LongVV assignments change weekly — check Matrix Monday plan

## daily-report:upwork
- [feedback_upwork_in_daily_report](daily-report/upwork/feedback_upwork_in_daily_report.md) — Must be included in daily report
- [feedback_upwork_tasklog_by_taskid](daily-report/upwork/feedback_upwork_tasklog_by_taskid.md), [feedback_upwork_filter_by_task_id_strict](daily-report/upwork/feedback_upwork_filter_by_task_id_strict.md), [feedback_upwork_tracker_shared_users](daily-report/upwork/feedback_upwork_tracker_shared_users.md) — Compare by specific task ID, not all rows; Paturevision col E=Task ID; trackers shared, sum ALL Owners
- [feedback_upwork_vs_tasklog_all_hours](daily-report/upwork/feedback_upwork_vs_tasklog_all_hours.md), [feedback_upwork_match_not_alert](daily-report/upwork/feedback_upwork_match_not_alert.md) — Sum ALL hours (official+part-time) to match Upwork; matching=OK, week-over-week drops not alerts
- [feedback_neural_consolidated](daily-report/upwork/feedback_neural_consolidated.md) — Neural: messages_only workroom, must intercept API; silence/Cloudflare never an alert
- [reference_upwork_workrooms](daily-report/upwork/reference_upwork_workrooms.md) — Upwork workroom URLs, credentials, weekly comparison

## bailey-invoice-verify / bailey-monitor / bailey-task-monitor
- [feedback_bailey_paturevision_billing](bailey/feedback_bailey_paturevision_billing.md), [feedback_tasklog_skip_first_row](bailey/feedback_tasklog_skip_first_row.md), [feedback_upwork_filter_by_task_id_strict](daily-report/upwork/feedback_upwork_filter_by_task_id_strict.md) — Bailey hours in Paturevision sheet (col E=Task ID, invoices bill WBS+buffer); never use first empty row of a day

## mpfc-monitor
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [reference_mpfc_github](mpfc-monitor/reference_mpfc_github.md) — OAuth2 invalid_grant is REAL unresolved (not noise); repo is mypersonalfootballcoach/wp

## weekly-report
- [feedback_matrix_report_format](weekly-report/feedback_matrix_report_format.md), [project_blair_brown_setup](weekly-report/project_blair_brown_setup.md) — James Diamond + Marcel weekly Matrix format; Blair Brown: dev, Workstream ID, FORBIDDEN status
- [feedback_workstream_all_projects](weekly-report/feedback_workstream_all_projects.md) — **ALWAYS fetch WS /review/week for ALL projects first** — teams log in WS not GSheets (JD, Blair Brown, Fountain, Generator, Baamboozle, Colin all WS-only)

## monday-report
- [project_monday_report_sheets](monday-report/project_monday_report_sheets.md) — All 8 Monday report sheet IDs

## money-report
- [feedback_misa_money_report_net_worth_bugs](money-report/feedback_misa_money_report_net_worth_bugs.md), [reference_misa_money_report_skill_file](money-report/reference_misa_money_report_skill_file.md), [feedback_investment_analysis_framework](money-report/feedback_investment_analysis_framework.md) — MISA Net Worth: use `trueTotalBalance` API not manual reconstruct (rules in money-report.md skill); investment analysis: growth quality + 3-question framework

## news-digest
- [feedback_news_digest_new_topic](news-digest/feedback_news_digest_new_topic.md) — Unknown topic → new topic w/ own RSS sources, never alias
- [feedback_news_digest_php_events](news-digest/feedback_news_digest_php_events.md) — PHP events (PHPverse, Laracon) need full schedule+speakers
- [feedback_news_digest_ai_underused_sources](news-digest/feedback_news_digest_ai_underused_sources.md) — AI section sample ALL 11 sources; FB via rss.app workaround now live
- [feedback_news_digest_use_actual_links](news-digest/feedback_news_digest_use_actual_links.md) — News links: use JSON `link`; run fix-links.py after save
- [feedback_news_digest_thieu_nguyen_rss_timeout](news-digest/feedback_news_digest_thieu_nguyen_rss_timeout.md) — rss.app feed "empty" was a 10s timeout false-negative, not real — fixed w/ retry+20s

## server-monitor
- [feedback_server_safety_consolidated](server-monitor/feedback_server_safety_consolidated.md) — Never cleanup/VACUUM FULL w/o confirmation; storage alerts need WHY breakdown

## No dedicated memory yet
trello-monitor, bailey-invoice-verify (billing-specific notes live under bailey above), cdf-monitor, tax-check, vn-bank-rates — self-contained skill files, nothing in memory targets them specifically.
