# Memory Index — organized by command, detail in linked file

**Read scope:** `/util:read-memory <command> [piece]` reads Global + matching section ONLY.

## Global — read for every monitoring command
- [project_memory_index_organized_by_command](global/project_memory_index_organized_by_command.md) — folder layout, new files go in command subfolder
- [feedback_decrypt_before_reading](global/feedback_decrypt_before_reading.md), [feedback_ssh_passphrase_in_config](global/feedback_ssh_passphrase_in_config.md) — decrypt-secrets.sh first; SSH passphrase in ~/.ssh/config
- [feedback_never_report_token_expired](global/feedback_never_report_token_expired.md) — ZERO TOLERANCE: never report invalid_auth, fix silently
- [feedback_workstream_config_not_gitignored](global/feedback_workstream_config_not_gitignored.md), [feedback_timeline_system](global/feedback_timeline_system.md) — new config/*.json gitignored; update timelines every run
- [feedback_new_config_file_gitignore_gap](global/feedback_new_config_file_gitignore_gap.md) — recurring: new config/*.json missing from .gitignore blocks push (GH013); fixed via git-filter-repo when unpushed
- [feedback_report_location](global/feedback_report_location.md) — Reports in `reports/{date}/`, not plans/reports/
- [feedback_always_include_links](global/feedback_always_include_links.md), [feedback_report_style](global/feedback_report_style.md) — concise, no trailing summary, always URLs
- [feedback_customer_facing_messages](global/feedback_customer_facing_messages.md) — never expose internal auth failures to customers
- [feedback_never_send_messages_without_permission](global/feedback_never_send_messages_without_permission.md), [feedback_no_duplicate_sends](global/feedback_no_duplicate_sends.md), [feedback_subagent_no_unauthorized_writes](global/feedback_subagent_no_unauthorized_writes.md) — never send/re-send w/o explicit authorization
- [feedback_github_account_mapping](global/feedback_github_account_mapping.md) — duongdn=Elena, nusken=Precognize, else default
- [project_alert_cron_setup](global/project_alert_cron_setup.md) — 30min interval, rate-limit
- [project_php_team](global/project_php_team.md) — LongVV,PhucVT,TuanNT,KhanhHH,LeNH (VietPH resigned, don't scan)
- [project_timezone_utc7](global/project_timezone_utc7.md), [user_role](global/user_role.md) — UTC+7; PM at NUS Technology
- [feedback_slack_new_workspace_token_extraction](global/feedback_slack_new_workspace_token_extraction.md) — new workspace: manual login once, extract xoxc from Local Storage (not cookies)
- [feedback_customer_direct_ask_universal_gate](global/feedback_customer_direct_ask_universal_gate.md) — 🔴 STANDING RULE 260707: EVERY project/source (Slack/Matrix/Discord/Email/Teams), EVERY command — unanswered direct customer ask = warning, read full msg not just "posted=clean"
- [feedback_decrypt_secrets_clobbers_live_tokens](global/feedback_decrypt_secrets_clobbers_live_tokens.md) — 260708: decrypt-secrets.sh reverted a live-refreshed Matrix token to stale .enc; fixed via saveSecretConfig auto re-encrypt helper

## daily-report — general
- [project_daily_report_workflow](daily-report/general/project_daily_report_workflow.md) — Full workflow: sources, Trello, configs
- [feedback_ondemand_updates](daily-report/general/feedback_ondemand_updates.md), [feedback_recheck_must_fill_missing_data](daily-report/general/feedback_recheck_must_fill_missing_data.md), [feedback_monday_friday_timestamp](daily-report/general/feedback_monday_friday_timestamp.md) — recheck fills BLOCKED data; Mon starts Fri 8AM
- [feedback_alert_classification](daily-report/general/feedback_alert_classification.md), [feedback_alert_means_no_complete](daily-report/general/feedback_alert_means_no_complete.md), [feedback_missing_daily_report_is_alert](daily-report/general/feedback_missing_daily_report_is_alert.md) — our issues only=alerts; missing report=alert unless leave

## daily-report:email
- [feedback_freelancer_email_must_be_scanned](daily-report/email/feedback_freelancer_email_must_be_scanned.md), [reference_email_accounts_all10](daily-report/email/reference_email_accounts_all10.md) — 10 accounts; davidztv19=Arthur/Meta-Stamp
- [feedback_imap_slack_timestamp_gotchas](daily-report/email/feedback_imap_slack_timestamp_gotchas.md), [feedback_email_scan_stale_window_bug](daily-report/email/feedback_email_scan_stale_window_bug.md) — use 260622.js logic not 260610.js
- [feedback_davidztv19_new_account_unwired](daily-report/email/feedback_davidztv19_new_account_unwired.md) — davidztv19@ in config but not in cron scan script, silently skipped

## daily-report:slack
- [feedback_slack_threads](daily-report/slack/feedback_slack_threads.md), [feedback_token_handling](daily-report/slack/feedback_token_handling.md) — use search.messages not conversations.history
- [feedback_project_topics_not_alerts](daily-report/slack/feedback_project_topics_not_alerts.md), [feedback_no_activity_not_skip](daily-report/slack/feedback_no_activity_not_skip.md), [feedback_low_activity_devs_not_alert](daily-report/slack/feedback_low_activity_devs_not_alert.md) — dev talk ≠ alert; low activity often normal
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [feedback_aysar_consolidated](daily-report/slack/feedback_aysar_consolidated.md) — Aysar gate=MPDM C07SQ4HAUHZ, no fixed time
- [feedback_maddy_kai_longvv_identity_and_quality_escalation](daily-report/slack/feedback_maddy_kai_longvv_identity_and_quality_escalation.md) — LIFM2-439 trust incident, Kai/LongVV hours unresolved
- [feedback_maddy_four_part_check_mandatory](daily-report/slack/feedback_maddy_four_part_check_mandatory.md) — MANDATORY every time: Slack+JIRA+est/actual+PR(Bitbucket xtreme-web/rms, creds set 260707); found critical unaddressed PR bugs
- [feedback_kai_daily_report_gate](feedback_kai_daily_report_gate.md), [feedback_puppeteer_cron_tmpdir](daily-report/slack/feedback_puppeteer_cron_tmpdir.md) — cron /tmp fail→TMPDIR=/var/tmp
- [feedback_solid_code_new_workspace_unwired](daily-report/slack/feedback_solid_code_new_workspace_unwired.md) — ✅ RESOLVED 260707: IS the Arthur/Meta-Stamp workspace, 3 channels wired into Arthur check
- [feedback_franc_rdc_customer_ask_not_flagged](daily-report/slack/feedback_franc_rdc_customer_ask_not_flagged.md) — 🔴 260707: dmetiner's direct unaddressed asks (MPX fail, plugin reorg, export deadline) wrongly marked clean; must read full msg text not just "posted=clean"

## daily-report:discord
- [feedback_airagri_webapp_channel](daily-report/discord/feedback_airagri_webapp_channel.md), [feedback_discord_only_airagri_bizurk](daily-report/discord/feedback_discord_only_airagri_bizurk.md) — only AirAgri (#airagri_webapp) + Bizurk, not HOMIEAPP
- [feedback_vinn_daily_report_format](daily-report/discord/feedback_vinn_daily_report_format.md), [feedback_monday_discord_scan_friday_window](daily-report/discord/feedback_monday_discord_scan_friday_window.md) — Vinn check N-1; Mon window=Fri 08:00

## daily-report:sheets (task logs / per-developer)
- [feedback_workstream_needs_review_check](daily-report/sheets/feedback_workstream_needs_review_check.md) — 260708: WS reviewStatus=Pending → ALERT to project reviewer (roster Manager), not the dev
- [feedback_workstream_all_projects_in_script](daily-report/sheets/feedback_workstream_all_projects_in_script.md), [feedback_dev_project_mapping_flexible](daily-report/sheets/feedback_dev_project_mapping_flexible.md) — scan ALL sheets+WS by owner col, never hardcode
- [feedback_sheets_subagent_unreliable](daily-report/sheets/feedback_sheets_subagent_unreliable.md), [feedback_google_sheets_per_employee](daily-report/sheets/feedback_google_sheets_per_employee.md) — verify suspicious 0h directly, filter own name
- [feedback_workstream_fetch_needs_explicit_date_arg](daily-report/sheets/feedback_workstream_fetch_needs_explicit_date_arg.md) — no date arg = defaults to current empty week
- [feedback_workstream_vs_sheets_migration_gaps](daily-report/sheets/feedback_workstream_vs_sheets_migration_gaps.md) — Crystal lang/Arthur found; email added, no Trello (forbidden)
- [feedback_sheets_scan_script_reuse_wrong_day](daily-report/sheets/feedback_sheets_scan_script_reuse_wrong_day.md), [feedback_sheets_scan_prev_date_for_daily_hours](daily-report/sheets/feedback_sheets_scan_prev_date_for_daily_hours.md) — date=PREV_DATE
- [feedback_check_workstream_before_flagging_shortfall](daily-report/sheets/feedback_check_workstream_before_flagging_shortfall.md), [feedback_marginal_daily_shortfall_check_weekly](daily-report/sheets/feedback_marginal_daily_shortfall_check_weekly.md) — 🔴re-run WS query, take higher; 6th recurrence 260707 now hit Sheets multi-dev calls too (isolate dev, re-run solo)
- [feedback_no_dated_scan_scripts](daily-report/sheets/feedback_no_dated_scan_scripts.md) — never dated scan-*.js, use sheets-tasklog-scan.js
- [feedback_dev_not_working_project_x_means_that_project_only](daily-report/sheets/feedback_dev_not_working_project_x_means_that_project_only.md), [feedback_parttime_official_filter](daily-report/sheets/feedback_parttime_official_filter.md) — only "Task dự án" counts, exclude Part-time
- [feedback_sheets_wrong_tab_numbering](daily-report/sheets/feedback_sheets_wrong_tab_numbering.md), [feedback_sheets_empty_col_a_bug](daily-report/sheets/feedback_sheets_empty_col_a_bug.md) — use Summary tab; blank-colA counts if col G owner
- [feedback_tasklog_summary_sheet](daily-report/sheets/feedback_tasklog_summary_sheet.md), [feedback_summary_sheet_no_double_count](daily-report/sheets/feedback_summary_sheet_no_double_count.md) — Summary col D = grand total, don't re-sum
- [feedback_khanhhh_aysar_second_project](daily-report/sheets/feedback_khanhhh_aysar_second_project.md), [feedback_aysar_sheet_owner_is_khanhhh](daily-report/sheets/feedback_aysar_sheet_owner_is_khanhhh.md) — Aysar sheet owner=KhanhHH not LeNH
- [feedback_longvv_consolidated](daily-report/sheets/feedback_longvv_consolidated.md) — UPDATED 260707: now full-time 40h/wk on Ohcleo ("Tony"), old 16h/wk part-time superseded
- [feedback_lenh_consolidated](daily-report/sheets/feedback_lenh_consolidated.md), [feedback_tuannt_consolidated](daily-report/sheets/feedback_tuannt_consolidated.md) — LeNH any shortfall=alert; TuanNT combined 0h gates John Yi+Rebecca+Bailey, scan ALL 11 sheets
- [feedback_vietph_leave_date_cron_bug](daily-report/sheets/feedback_vietph_leave_date_cron_bug.md), [project_leave_plan_system](daily-report/sheets/project_leave_plan_system.md), [feedback_leave_day_handling](daily-report/sheets/feedback_leave_day_handling.md) — parse-leave-emails.js first, leave date=PREV_DATE
- [reference_workstream](daily-report/sheets/reference_workstream.md), [feedback_maddy_jira_weekly_check](daily-report/sheets/feedback_maddy_jira_weekly_check.md) — 17 WS projects, run daily --week check
- [feedback_encrypt_secrets_missing_workstream](daily-report/sheets/feedback_encrypt_secrets_missing_workstream.md), [feedback_elena_sheet_permission_error](daily-report/sheets/feedback_elena_sheet_permission_error.md) — perm error masks as "no week tab"
- [feedback_tasklog_reminder_matrix](daily-report/sheets/feedback_tasklog_reminder_matrix.md), [feedback_tasklog_0h_reminder_complete](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md), [feedback_matrix_tomorrow_is_message_date_plus_one](daily-report/sheets/feedback_matrix_tomorrow_is_message_date_plus_one.md) — 0h+no leave→remind, sent→complete; leave dates from email/sheets only

## daily-report:scrin
- [feedback_scrin_consolidated](daily-report/scrin/feedback_scrin_consolidated.md) — 🔴 REPEAT VIOLATION 260707: tracks Nick not TuanNT (never conflate); also check raw Project/Client tag, "john yi" is stale company label not live project

## daily-report:fountain
- [feedback_fountain_cr_column](daily-report/fountain/feedback_fountain_cr_column.md), [feedback_fountain_kunal_checklist](daily-report/fountain/feedback_fountain_kunal_checklist.md) — est=ColI+ColJ; 5-part MANDATORY
- [feedback_fountain_dev_specific_consolidated](daily-report/fountain/feedback_fountain_dev_specific_consolidated.md) — HungPN/TrinhMTT QC, VuTQ small-plan, HaVS plan-check
- [feedback_fountain_0h_not_expected_day1](daily-report/fountain/feedback_fountain_0h_not_expected_day1.md), [feedback_fountain_monday_plan_timing](daily-report/fountain/feedback_fountain_monday_plan_timing.md) — 0h day1 flag 40h/wk; Mon plan 08:30-09:30
- [feedback_fountain_capacity_script_regex_bug](daily-report/fountain/feedback_fountain_capacity_script_regex_bug.md), [feedback_fountain_tasklog_not_monitored](daily-report/fountain/feedback_fountain_tasklog_not_monitored.md) — match bare-numeric names; task log NOT monitored
- [feedback_over_estimate_tracking](daily-report/fountain/feedback_over_estimate_tracking.md), [feedback_fountain_est_vs_charged_status_column_bug](daily-report/fountain/feedback_fountain_est_vs_charged_status_column_bug.md) — track growth wk/wk; status idx6 not idx2

## daily-report:elena
- [feedback_elena_consolidated](daily-report/elena/feedback_elena_consolidated.md), [feedback_csp_violations_are_real_errors](daily-report/elena/feedback_csp_violations_are_real_errors.md), [reference_elena_wordpress_csp_config](daily-report/elena/reference_elena_wordpress_csp_config.md) — auto-deploy mergeable PRs; CSP violations real, config wp_options.hsts_csp

## daily-report:trello (Check Progress / Check Mail)
- [reference_trello_gate_mapping](daily-report/trello/reference_trello_gate_mapping.md), [feedback_trello_all_checklists](daily-report/trello/feedback_trello_all_checklists.md), [feedback_trello_find_by_name](daily-report/trello/feedback_trello_find_by_name.md) — iterate ALL checklists; find by name not ID
- [feedback_trello_mail_must_check_email](daily-report/trello/feedback_trello_mail_must_check_email.md), [feedback_email_trello_completion](daily-report/trello/feedback_email_trello_completion.md), [feedback_trello_progress_reuse_pieces](daily-report/trello/feedback_trello_progress_reuse_pieces.md), [feedback_checklist_person_link](daily-report/trello/feedback_checklist_person_link.md) — Progress runs ALL mapped pieces
- [feedback_trello_per_client_gates_on_lead_dev](daily-report/trello/feedback_trello_per_client_gates_on_lead_dev.md), [feedback_philip_msteams_must_run](daily-report/trello/feedback_philip_msteams_must_run.md), [feedback_philip_msteams_duplicate_contacts](daily-report/trello/feedback_philip_msteams_duplicate_contacts.md) — Philip needs FULL NAME, only "(External) Six Star Rentals" correct
- [feedback_recheck_uses_morning_report_data](daily-report/trello/feedback_recheck_uses_morning_report_data.md) — recheck uses report data, never re-query today
- [feedback_rebecca_chua_not_trello_block](daily-report/trello/feedback_rebecca_chua_not_trello_block.md), [feedback_blake_rollbar_not_person_alert](daily-report/trello/feedback_blake_rollbar_not_person_alert.md) — never block on Rebecca col P or client Rollbar errors
- [feedback_tuannt_gate_show_breakdown](daily-report/trello/feedback_tuannt_gate_show_breakdown.md) — TuanNT gate shows per-sheet breakdown

## daily-report:reminders
- [feedback_tasklog_reminder_matrix](daily-report/sheets/feedback_tasklog_reminder_matrix.md), [feedback_tasklog_0h_reminder_complete](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md) — 0h+no leave→remind; sent=complete Trello
- [reference_matrix_rooms](daily-report/reminders/reference_matrix_rooms.md) — dev Matrix room IDs

## daily-report:matrix
- [feedback_matrix_daily_summary](daily-report/matrix/feedback_matrix_daily_summary.md), [feedback_matrix_join_public_room](daily-report/matrix/feedback_matrix_join_public_room.md) — summarize, never raw dump; M_FORBIDDEN=POST /join
- [feedback_matrix_refresh_headless_bug](daily-report/matrix/feedback_matrix_refresh_headless_bug.md), [feedback_matrix_token_never_report_expired](daily-report/matrix/feedback_matrix_token_never_report_expired.md), [feedback_matrix_token_short_lived](daily-report/matrix/feedback_matrix_token_short_lived.md) — headless:false, verify before claiming expired, fetch immediately (short-lived)
- [feedback_matrix_resource_arrangement_room](daily-report/matrix/feedback_matrix_resource_arrangement_room.md), [project_longvv_james_diamond](daily-report/matrix/project_longvv_james_diamond.md) — cross-check before 0h; LongVV changes weekly
- [feedback_read_full_room_transcript_not_grep_snippets](daily-report/matrix/feedback_read_full_room_transcript_not_grep_snippets.md) — read FULL transcript for active rooms, grep snippets miss real signals (payment risk, unanswered client Qs)
- [feedback_arthur_metastamp_four_part_check](daily-report/matrix/feedback_arthur_metastamp_four_part_check.md) — 5 sources (2 Matrix+3 Slack "Solid Code"), Vietnamese summary+issue-list mandatory; recurring window=~1wk NOT full history (one-time deep dive only)

## daily-report:upwork
- [feedback_upwork_in_daily_report](daily-report/upwork/feedback_upwork_in_daily_report.md), [feedback_upwork_session_token_storage](daily-report/upwork/feedback_upwork_session_token_storage.md) — must include every run; cron never re-logs in
- [feedback_upwork_tasklog_by_taskid](daily-report/upwork/feedback_upwork_tasklog_by_taskid.md), [feedback_upwork_filter_by_task_id_strict](daily-report/upwork/feedback_upwork_filter_by_task_id_strict.md), [feedback_upwork_tracker_shared_users](daily-report/upwork/feedback_upwork_tracker_shared_users.md) — task ID match (Paturevision col E), trackers shared sum ALL owners
- [feedback_upwork_vs_tasklog_all_hours](daily-report/upwork/feedback_upwork_vs_tasklog_all_hours.md), [feedback_upwork_match_not_alert](daily-report/upwork/feedback_upwork_match_not_alert.md) — sum ALL hours to match; matching=OK
- [feedback_neural_consolidated](daily-report/upwork/feedback_neural_consolidated.md), [reference_upwork_workrooms](daily-report/upwork/reference_upwork_workrooms.md) — Neural silence/Cloudflare never alert

## daily-report:performance
- [project_performance_piece_added](daily-report/performance/project_performance_piece_added.md) — Piece 14 (New Relic APM), keys for OhCleo+MPFC already existed in config from a prior Cline-OhCleo session — check session transcripts before asking user to resend keys

## bailey-invoice-verify / bailey-monitor / bailey-task-monitor
- [feedback_bailey_paturevision_billing](bailey/feedback_bailey_paturevision_billing.md), [feedback_tasklog_skip_first_row](bailey/feedback_tasklog_skip_first_row.md) — col E=Task ID, bill WBS+buffer, never first empty row
- [feedback_bailey_trello_card_is_recurring](bailey/feedback_bailey_trello_card_is_recurring.md) — search by name+open state, skill's ID stale
- [feedback_warning_needs_explanation](bailey/feedback_warning_needs_explanation.md), [reference_bailey_monitor_skill_file](bailey/reference_bailey_monitor_skill_file.md) — WARNING needs plain-language explanation
- [feedback_overbudget_check_missing_from_other_active](bailey/feedback_overbudget_check_missing_from_other_active.md) — 🔴 260707: bailey-task-monitor.py only checks overbudget on bug tasks; 6 fixed-cost tasks (up to +148.7%) silently missed in "Other Active" — manually compute actual vs est_buffer for all fixed tasks

## mpfc-monitor
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [reference_mpfc_github](mpfc-monitor/reference_mpfc_github.md) — OAuth2 invalid_grant REAL; repo mypersonalfootballcoach/wp

## weekly-report
- [feedback_matrix_report_format](weekly-report/feedback_matrix_report_format.md), [project_blair_brown_setup](weekly-report/project_blair_brown_setup.md) — JD+Marcel format; Blair Brown FORBIDDEN status
- [feedback_workstream_all_projects](weekly-report/feedback_workstream_all_projects.md) — fetch WS /review/week for ALL projects first (JD/Blair Brown/Fountain/Generator/Baamboozle/Colin are WS-only)
- [feedback_thuyle_report_explicit_send_flag](weekly-report/feedback_thuyle_report_explicit_send_flag.md) — never send ThuyLTT report w/o explicit confirmation of final text

## monday-report
- [project_monday_report_sheets](monday-report/project_monday_report_sheets.md) — 8 sheet IDs
- [feedback_monday_report_hours_and_scope](monday-report/feedback_monday_report_hours_and_scope.md) — use WS weekTotal not weekCharged; scope=manager+Form dropdown

## monday-effort-verify (with-thuyltt)
- [project_monday_effort_verify_thuyltt_context](monday-effort-verify/project_command_context.md) — new 260708: ThuyLTT's hour image is Workstream-derived not independent; LegalAtoms miss was DuongDN's own missed WS entry

## money-report
- [feedback_misa_money_report_net_worth_bugs](money-report/feedback_misa_money_report_net_worth_bugs.md), [reference_misa_money_report_skill_file](money-report/reference_misa_money_report_skill_file.md), [feedback_investment_analysis_framework](money-report/feedback_investment_analysis_framework.md) — Net Worth via trueTotalBalance API
- [feedback_money_report_html_dashboard](money-report/feedback_money_report_html_dashboard.md) — needs dashboard.html + history.json
- [feedback_savings_already_matured_check](money-report/feedback_savings_already_matured_check.md) — flag matured savings, don't drop from Upcoming
- [feedback_tikop_is_liquid_not_investment](money-report/feedback_tikop_is_liquid_not_investment.md) — Tikop=Liquid not Investment

## news-digest
- [feedback_news_digest_full_hallucination_incident](news-digest/feedback_news_digest_full_hallucination_incident.md) — 🔴 260708: whole report faked (fake Google News URLs); recheck grep must also catch fake-URL patterns not just placeholders
- [feedback_news_digest_new_topic](news-digest/feedback_news_digest_new_topic.md), [feedback_news_digest_php_events](news-digest/feedback_news_digest_php_events.md) — unknown topic→own RSS; PHP events need full schedule
- [feedback_news_digest_ai_underused_sources](news-digest/feedback_news_digest_ai_underused_sources.md), [feedback_news_digest_use_actual_links](news-digest/feedback_news_digest_use_actual_links.md) — sample ALL 11 sources; JSON `link`+fix-links.py
- [feedback_news_digest_thieu_nguyen_rss_timeout](news-digest/feedback_news_digest_thieu_nguyen_rss_timeout.md) — needs venv python3 or FB cookie refresh no-ops
- [feedback_news_digest_dedup_rule](news-digest/feedback_news_digest_dedup_rule.md) — cap article URL at 2 appearances
- [feedback_facebook_scraper_missing_x_display](news-digest/feedback_facebook_scraper_missing_x_display.md) — root cause of "no FB posts" 07-05/06/07: crashed w/o live Xvfb; fixed w/ self-start fallback

## server-monitor
- [feedback_server_safety_consolidated](server-monitor/feedback_server_safety_consolidated.md) — never cleanup/VACUUM FULL w/o confirmation

## No dedicated memory yet
trello-monitor, cdf-monitor, tax-check, vn-bank-rates — self-contained.
