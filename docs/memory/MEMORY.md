# Memory Index — organized by command, detail in linked file

**Read scope:** `/util:read-memory <command> [piece]` reads Global + matching section ONLY.

## Global — read for every monitoring command
- [project_memory_index_organized_by_command](global/project_memory_index_organized_by_command.md) — folder layout
- [feedback_decrypt_before_reading](global/feedback_decrypt_before_reading.md), [feedback_ssh_passphrase_in_config](global/feedback_ssh_passphrase_in_config.md) — decrypt-secrets.sh first; SSH passphrase in ~/.ssh/config
- [feedback_never_report_token_expired](global/feedback_never_report_token_expired.md) — ZERO TOLERANCE: never report invalid_auth, fix silently
- [feedback_workstream_config_not_gitignored](global/feedback_workstream_config_not_gitignored.md), [feedback_timeline_system](global/feedback_timeline_system.md) — new config/*.json gitignored; update timelines every run
- [feedback_new_config_file_gitignore_gap](global/feedback_new_config_file_gitignore_gap.md) — new config missing .gitignore blocks push; fix via git-filter-repo
- [feedback_report_location](global/feedback_report_location.md) — Reports in `reports/{date}/`
- [feedback_always_include_links](global/feedback_always_include_links.md), [feedback_report_style](global/feedback_report_style.md) — concise, no trailing summary, always URLs
- [feedback_interactive_review_stays_in_chat](global/feedback_interactive_review_stays_in_chat.md) — 🔴 ad-hoc reviews go in chat, not tmp/file+pointer
- [feedback_customer_facing_messages](global/feedback_customer_facing_messages.md) — never expose internal auth failures to customers
- [feedback_never_send_messages_without_permission](global/feedback_never_send_messages_without_permission.md), [feedback_no_duplicate_sends](global/feedback_no_duplicate_sends.md), [feedback_subagent_no_unauthorized_writes](global/feedback_subagent_no_unauthorized_writes.md) — never send w/o explicit authorization; the reminder-specific version of this rule is now hardcoded in `.claude/commands/me/daily-report.md` Piece 9, not memory
- [feedback_github_account_mapping](global/feedback_github_account_mapping.md) — duongdn=Elena, nusken=Precognize
- [project_alert_cron_setup](global/project_alert_cron_setup.md) — 30min interval, rate-limit
- [project_php_team](global/project_php_team.md) — LongVV,PhucVT,TuanNT,KhanhHH,LeNH (VietPH resigned)
- [project_timezone_utc7](global/project_timezone_utc7.md), [user_role](global/user_role.md) — UTC+7; PM at NUS Technology
- [feedback_slack_new_workspace_token_extraction](global/feedback_slack_new_workspace_token_extraction.md) — new workspace: extract xoxc from Local Storage
- [feedback_customer_direct_ask_universal_gate](global/feedback_customer_direct_ask_universal_gate.md) — 🔴 unanswered direct customer ask = warning, read full msg
- [feedback_decrypt_secrets_clobbers_live_tokens](global/feedback_decrypt_secrets_clobbers_live_tokens.md) — decrypt-secrets can revert/delete live tokens; use saveSecretConfig
- [feedback_gui_automation_risk_on_shared_desktop](global/feedback_gui_automation_risk_on_shared_desktop.md) — 🔴 xdotool on DISPLAY=:1 = user's live desktop; verify window every keystroke, abort if user active
- [reference_google_drive_service_account_fallback](global/reference_google_drive_service_account_fallback.md) — Drive OAuth expired → service account + `files().export`
- [feedback_matrix_never_use_device_auth](global/feedback_matrix_never_use_device_auth.md), [feedback_visible_browser_login_required](global/feedback_visible_browser_login_required.md) — 🔴 expired session→visible DISPLAY=:1 retry only, never device-code/passive text; unresolved=ALERT (Matrix specifically superseded, see [[project_matrix_static_compat_token]])
- [feedback_strikethrough_corrections](global/feedback_strikethrough_corrections.md) — correcting a report after feedback = strikethrough wrong text + correction, never silent delete
- [feedback_reminder_template_content_must_match_data](global/feedback_reminder_template_content_must_match_data.md) — 🔴 check message TEXT against verified number before sending, never reuse a "0h" template for a nonzero figure
- [feedback_fix_internal_issues_not_just_report](global/feedback_fix_internal_issues_not_just_report.md) — 🔴 agent-fixable technical alerts (our code/infra) → fix directly, don't just re-report; external/human-only blockers → document exact missing credential
- [feedback_verify_config_history_before_blaming_external_credential](global/feedback_verify_config_history_before_blaming_external_credential.md) — 🔴 N accounts fail at once → check `git log` on the config first, don't assume provider-side expiry (260710: 5 Zoho "invalid creds" was actually our own bad commit)
- [feedback_ripgrep_execute_permission_fix](global/feedback_ripgrep_execute_permission.md) — macOS only, SessionStart hook is a silent no-op on Linux

## daily-report — general
- [project_daily_report_workflow](daily-report/general/project_daily_report_workflow.md) — Full workflow: sources, Trello, configs
- [reference_ohcleo_no_server_access](daily-report/general/reference_ohcleo_no_server_access.md) — OhCleo: zero server access, Tony's own infra, Slack DM only
- [feedback_ondemand_updates](daily-report/general/feedback_ondemand_updates.md), [feedback_recheck_must_fill_missing_data](daily-report/general/feedback_recheck_must_fill_missing_data.md), [feedback_monday_friday_timestamp](daily-report/general/feedback_monday_friday_timestamp.md) — recheck fills BLOCKED; Mon=Fri 8AM
- [feedback_alert_classification](daily-report/general/feedback_alert_classification.md), [feedback_alert_means_no_complete](daily-report/general/feedback_alert_means_no_complete.md), [feedback_missing_daily_report_is_alert](daily-report/general/feedback_missing_daily_report_is_alert.md) — our issues=alerts; missing report=alert unless leave
- [feedback_report_internal_consistency_and_always_reverify](daily-report/general/feedback_report_internal_consistency_and_always_reverify.md) — 🔴🔴 repeat complaint: fix stale cross-references after corrections; "checked <1hr ago" is never a reason to skip a re-check the user asked for

## daily-report:email
- [feedback_freelancer_email_must_be_scanned](daily-report/email/feedback_freelancer_email_must_be_scanned.md), [reference_email_accounts_all10](daily-report/email/reference_email_accounts_all10.md) — 10 accounts; davidztv19=Arthur
- [feedback_imap_slack_timestamp_gotchas](daily-report/email/feedback_imap_slack_timestamp_gotchas.md), [feedback_email_scan_stale_window_bug](daily-report/email/feedback_email_scan_stale_window_bug.md) — 🔴 dated scripts hardcode stale window, caused false "0 new" all 10 accts 260709 (real prod alerts missed) — verify window is live first
- [feedback_davidztv19_new_account_unwired](daily-report/email/feedback_davidztv19_new_account_unwired.md) — davidztv19@ in config but not cron script

## daily-report:slack
- [feedback_slack_threads](daily-report/slack/feedback_slack_threads.md), [feedback_token_handling](daily-report/slack/feedback_token_handling.md) — search.messages not conversations.history
- [feedback_project_topics_not_alerts](daily-report/slack/feedback_project_topics_not_alerts.md), [feedback_low_activity_devs_not_alert](daily-report/slack/feedback_low_activity_devs_not_alert.md) — dev talk≠alert; low activity often normal; merged in "no activity = complete" rule 2026-07-13
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [feedback_aysar_consolidated](daily-report/slack/feedback_aysar_consolidated.md) — 🔴 Aysar gate=MPDM C07SQ4HAUHZ; MANDATORY pre-check `sheets-tasklog-scan.js <date> KhanhHH` before ever flagging MPDM silence (2x repeat false alert 260708/260709)
- [feedback_maddy_kai_longvv_identity_and_quality_escalation](daily-report/slack/feedback_maddy_kai_longvv_identity_and_quality_escalation.md) — LIFM2-439 trust incident
- [feedback_maddy_four_part_check_mandatory](daily-report/slack/feedback_maddy_four_part_check_mandatory.md) — MANDATORY: Slack+JIRA+est/actual+PR
- [feedback_kai_daily_report_gate](feedback_kai_daily_report_gate.md) — 🔴🔴 RETIRED 260709 (3rd repeat false alert): NEVER flag "Kai no report" as Maddy alert
- [feedback_puppeteer_cron_tmpdir](daily-report/slack/feedback_puppeteer_cron_tmpdir.md) — cron /tmp fail→TMPDIR=/var/tmp
- [feedback_solid_code_new_workspace_unwired](daily-report/slack/feedback_solid_code_new_workspace_unwired.md) — ✅ IS Arthur workspace, 3 channels wired
- [feedback_franc_rdc_customer_ask_not_flagged](daily-report/slack/feedback_franc_rdc_customer_ask_not_flagged.md) — 🔴 read full msg text, not just "posted=clean"

## daily-report:discord
- [feedback_airagri_webapp_channel](daily-report/discord/feedback_airagri_webapp_channel.md), [feedback_discord_only_airagri_bizurk](daily-report/discord/feedback_discord_only_airagri_bizurk.md), [feedback_monday_discord_scan_friday_window](daily-report/discord/feedback_monday_discord_scan_friday_window.md), [feedback_vinn_daily_report_format](daily-report/discord/feedback_vinn_daily_report_format.md) — AirAgri+Bizurk only
- [feedback_discord_token_refresh_script_broken](daily-report/discord/feedback_discord_token_refresh_script_broken.md) — 🔴 401≠login needed; screenshot first, script itself is broken

## daily-report:sheets (task logs / per-developer)
- [feedback_workstream_needs_review_check](daily-report/sheets/feedback_workstream_needs_review_check.md) — WS reviewStatus=Pending → ALERT to reviewer, not dev
- [feedback_workstream_all_projects_in_script](daily-report/sheets/feedback_workstream_all_projects_in_script.md), [feedback_dev_project_mapping_flexible](daily-report/sheets/feedback_dev_project_mapping_flexible.md) — scan ALL sheets+WS by owner, never hardcode
- [feedback_vietph_leave_date_cron_bug](daily-report/sheets/feedback_vietph_leave_date_cron_bug.md) — leave note may apply to wrong PREV_DATE
- [feedback_sheets_subagent_unreliable](daily-report/sheets/feedback_sheets_subagent_unreliable.md), [feedback_google_sheets_per_employee](daily-report/sheets/feedback_google_sheets_per_employee.md), [feedback_sheets_scan_script_reuse_wrong_day](daily-report/sheets/feedback_sheets_scan_script_reuse_wrong_day.md), [feedback_sheets_scan_prev_date_for_daily_hours](daily-report/sheets/feedback_sheets_scan_prev_date_for_daily_hours.md) — date=PREV_DATE
- [feedback_workstream_fetch_needs_explicit_date_arg](daily-report/sheets/feedback_workstream_fetch_needs_explicit_date_arg.md) — no date arg = defaults to empty week
- [feedback_workstream_vs_sheets_migration_gaps](daily-report/sheets/feedback_workstream_vs_sheets_migration_gaps.md) — Crystal lang/Arthur found; email added, no Trello
- [feedback_check_workstream_before_flagging_shortfall](daily-report/sheets/feedback_check_workstream_before_flagging_shortfall.md), [feedback_marginal_daily_shortfall_check_weekly](daily-report/sheets/feedback_marginal_daily_shortfall_check_weekly.md), [feedback_no_dated_scan_scripts](daily-report/sheets/feedback_no_dated_scan_scripts.md) — 🔴🔴🔴🔴🔴🔴🔴🔴🔴 9 recurrences: combined multi-dev scans AND isolated single-dev rescans can BOTH mislabel/miss hours (260709: LeNH mislabeled 8h James Diamond as "Peptide Clyde") — always cross-check any 0h/shortfall (and any correction to one) against a 3rd, fully unfiltered all-projects dump before trusting it
- [feedback_dev_not_working_project_x_means_that_project_only](daily-report/sheets/feedback_dev_not_working_project_x_means_that_project_only.md), [feedback_parttime_official_filter](daily-report/sheets/feedback_parttime_official_filter.md) — only "Task dự án" counts
- [feedback_sheets_wrong_tab_numbering](daily-report/sheets/feedback_sheets_wrong_tab_numbering.md), [feedback_sheets_empty_col_a_bug](daily-report/sheets/feedback_sheets_empty_col_a_bug.md), [feedback_tasklog_summary_sheet](daily-report/sheets/feedback_tasklog_summary_sheet.md), [feedback_summary_sheet_no_double_count](daily-report/sheets/feedback_summary_sheet_no_double_count.md) — use Summary col D
- [feedback_longvv_consolidated](daily-report/sheets/feedback_longvv_consolidated.md) — full-time 40h/wk on Ohcleo ("Tony")
- [feedback_lenh_consolidated](daily-report/sheets/feedback_lenh_consolidated.md), [feedback_tuannt_consolidated](daily-report/sheets/feedback_tuannt_consolidated.md) — LeNH any shortfall=alert; TuanNT 0h gates 3 items (3-way cross-check first, see above)
- [feedback_khanhhh_aysar_consolidated](daily-report/sheets/feedback_khanhhh_aysar_consolidated.md) — Aysar sheet+Upwork hours=KhanhHH not LeNH; scan ALL sources, new sources keep surfacing
- [project_leave_plan_system](daily-report/sheets/project_leave_plan_system.md), [feedback_leave_day_handling](daily-report/sheets/feedback_leave_day_handling.md) — parse-leave-emails.js first
- [reference_workstream](daily-report/sheets/reference_workstream.md), [feedback_maddy_jira_weekly_check](daily-report/sheets/feedback_maddy_jira_weekly_check.md) — 17 WS projects, run daily
- [feedback_encrypt_secrets_missing_workstream](daily-report/sheets/feedback_encrypt_secrets_missing_workstream.md), [feedback_elena_sheet_permission_error](daily-report/sheets/feedback_elena_sheet_permission_error.md) — perm error masks as "no week tab"
- [feedback_tasklog_reminder_matrix](daily-report/sheets/feedback_tasklog_reminder_matrix.md), [feedback_tasklog_0h_reminder_complete](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md), [feedback_matrix_tomorrow_is_message_date_plus_one](daily-report/sheets/feedback_matrix_tomorrow_is_message_date_plus_one.md) — 0h+no leave→remind (3-way cross-check first!), sent→complete; message TEXT must match verified number, see Global reminder-template rule

## daily-report:scrin
- [feedback_scrin_consolidated](daily-report/scrin/feedback_scrin_consolidated.md) — 🔴 tracks Nick not TuanNT; raw Project/Client tag usually "No project"/"No client" — never present this figure as validating any specific client's work (260709 repeat)

## daily-report:fountain
- [feedback_fountain_cr_column](daily-report/fountain/feedback_fountain_cr_column.md), [feedback_fountain_kunal_checklist](daily-report/fountain/feedback_fountain_kunal_checklist.md) — est=ColI+ColJ; 5-part MANDATORY
- [feedback_fountain_dev_specific_consolidated](daily-report/fountain/feedback_fountain_dev_specific_consolidated.md) — HungPN/TrinhMTT QC, VuTQ, HaVS specifics
- [feedback_fountain_0h_not_expected_day1](daily-report/fountain/feedback_fountain_0h_not_expected_day1.md), [feedback_fountain_monday_plan_timing](daily-report/fountain/feedback_fountain_monday_plan_timing.md) — Mon plan 08:30-09:30
- [feedback_fountain_capacity_script_regex_bug](daily-report/fountain/feedback_fountain_capacity_script_regex_bug.md), [feedback_fountain_tasklog_not_monitored](daily-report/fountain/feedback_fountain_tasklog_not_monitored.md), [feedback_fountain_est_vs_charged_status_column_bug](daily-report/fountain/feedback_fountain_est_vs_charged_status_column_bug.md), [feedback_over_estimate_tracking](daily-report/fountain/feedback_over_estimate_tracking.md) — track growth wk/wk

## daily-report:elena
- [feedback_elena_consolidated](daily-report/elena/feedback_elena_consolidated.md), [feedback_csp_violations_are_real_errors](daily-report/elena/feedback_csp_violations_are_real_errors.md), [reference_elena_wordpress_csp_config](daily-report/elena/reference_elena_wordpress_csp_config.md) — auto-deploy mergeable PRs; CSP violations real

## daily-report:trello (Check Progress / Check Mail)
- [reference_trello_gate_mapping](daily-report/trello/reference_trello_gate_mapping.md), [feedback_trello_all_checklists](daily-report/trello/feedback_trello_all_checklists.md), [feedback_trello_find_by_name](daily-report/trello/feedback_trello_find_by_name.md) — iterate ALL checklists; find by name
- [feedback_trello_mail_must_check_email](daily-report/trello/feedback_trello_mail_must_check_email.md), [feedback_email_trello_completion](daily-report/trello/feedback_email_trello_completion.md), [feedback_trello_progress_reuse_pieces](daily-report/trello/feedback_trello_progress_reuse_pieces.md), [feedback_checklist_person_link](daily-report/trello/feedback_checklist_person_link.md) — Progress runs ALL mapped pieces
- [feedback_trello_per_client_gates_on_lead_dev](daily-report/trello/feedback_trello_per_client_gates_on_lead_dev.md), [feedback_philip_msteams_must_run](daily-report/trello/feedback_philip_msteams_must_run.md), [feedback_philip_msteams_duplicate_contacts](daily-report/trello/feedback_philip_msteams_duplicate_contacts.md) — Philip needs FULL NAME
- [feedback_philip_msteams_chrome_profile_crash](daily-report/trello/feedback_philip_msteams_chrome_profile_crash.md) — 🔴 profile corruption SIGTRAP crash; rebuild keeping IndexedDB, never drop it
- [feedback_recheck_uses_morning_report_data](daily-report/trello/feedback_recheck_uses_morning_report_data.md) — recheck uses report data, never re-query
- [feedback_rebecca_chua_not_trello_block](daily-report/trello/feedback_rebecca_chua_not_trello_block.md), [feedback_tuannt_gate_show_breakdown](daily-report/trello/feedback_tuannt_gate_show_breakdown.md) — TuanNT gate shows per-sheet breakdown
- [feedback_arthur_blair_brown_gate_added](daily-report/trello/feedback_arthur_blair_brown_gate_added.md) — Arthur now Full Run; Blair Brown gated by sheets lenh

## daily-report:matrix
- [feedback_matrix_daily_summary](daily-report/matrix/feedback_matrix_daily_summary.md), [feedback_matrix_join_public_room](daily-report/matrix/feedback_matrix_join_public_room.md) — summarize, never raw dump
- [feedback_matrix_refresh_headless_bug](daily-report/matrix/feedback_matrix_refresh_headless_bug.md), [feedback_matrix_token_never_report_expired](daily-report/matrix/feedback_matrix_token_never_report_expired.md), [feedback_matrix_token_short_lived](daily-report/matrix/feedback_matrix_token_short_lived.md) — verify before claiming expired
- [feedback_matrix_resource_arrangement_room](daily-report/matrix/feedback_matrix_resource_arrangement_room.md), [project_longvv_james_diamond](daily-report/matrix/project_longvv_james_diamond.md), [reference_matrix_rooms](daily-report/reminders/reference_matrix_rooms.md) — cross-check before 0h
- [feedback_read_full_room_transcript_not_grep_snippets](daily-report/matrix/feedback_read_full_room_transcript_not_grep_snippets.md) — read FULL transcript, grep misses signals
- [feedback_arthur_metastamp_four_part_check](daily-report/matrix/feedback_arthur_metastamp_four_part_check.md) — 5 sources (2 Matrix+3 Slack), Vietnamese summary mandatory
- [project_matrix_static_compat_token](daily-report/matrix/project_matrix_static_compat_token.md) — 🔴 mct_ non-expiring token from admin (260713), browser-refresh flow now rarely needed

## daily-report:upwork
- [feedback_upwork_in_daily_report](daily-report/upwork/feedback_upwork_in_daily_report.md), [feedback_upwork_session_token_storage](daily-report/upwork/feedback_upwork_session_token_storage.md) — cron never re-logs in
- [feedback_upwork_tasklog_by_taskid](daily-report/upwork/feedback_upwork_tasklog_by_taskid.md), [feedback_upwork_filter_by_task_id_strict](daily-report/upwork/feedback_upwork_filter_by_task_id_strict.md), [feedback_upwork_tracker_shared_users](daily-report/upwork/feedback_upwork_tracker_shared_users.md), [feedback_upwork_vs_tasklog_all_hours](daily-report/upwork/feedback_upwork_vs_tasklog_all_hours.md), [feedback_upwork_match_not_alert](daily-report/upwork/feedback_upwork_match_not_alert.md), [feedback_neural_consolidated](daily-report/upwork/feedback_neural_consolidated.md), [reference_upwork_workrooms](daily-report/upwork/reference_upwork_workrooms.md) — task ID match; see Global visible-browser-login rule before ever writing "session expired"

## daily-report:performance
- [project_performance_piece_added](daily-report/performance/project_performance_piece_added.md) — Piece 14 (New Relic APM); OhCleo+MPFC keys already existed from a prior Cline-OhCleo session

## bailey-invoice-verify/monitor/task-monitor
- [feedback_bailey_paturevision_billing](bailey/feedback_bailey_paturevision_billing.md), [feedback_tasklog_skip_first_row](bailey/feedback_tasklog_skip_first_row.md) — col E=Task ID
- [feedback_bailey_trello_card_is_recurring](bailey/feedback_bailey_trello_card_is_recurring.md) — search by name+open, skill's ID stale
- [feedback_warning_needs_explanation](bailey/feedback_warning_needs_explanation.md), [reference_bailey_monitor_skill_file](bailey/reference_bailey_monitor_skill_file.md) — WARNING needs plain-language explanation
- [feedback_overbudget_check_missing_from_other_active](bailey/feedback_overbudget_check_missing_from_other_active.md) — 🔴 fixed-cost tasks silently missed — compute actual vs est_buffer manually
- [feedback_boto3_pyopenssl_broken](bailey/feedback_boto3_pyopenssl_broken.md) — no aws CLI; boto3 needs `pip install --user --upgrade pyOpenSSL` first
- [feedback_siteground_captcha_no_ssh_fallback](bailey/feedback_siteground_captcha_no_ssh_fallback.md) — Siteground login CAPTCHA-blocked, no Bailey.cpanel SSH host configured

## mpfc-monitor
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [reference_mpfc_github](mpfc-monitor/reference_mpfc_github.md) — repo mypersonalfootballcoach/wp

## weekly-report
- [feedback_matrix_report_format](weekly-report/feedback_matrix_report_format.md), [project_blair_brown_setup](weekly-report/project_blair_brown_setup.md) — Blair Brown FORBIDDEN status
- [feedback_thuyle_report_explicit_send_flag](weekly-report/feedback_thuyle_report_explicit_send_flag.md) — 🔴 exact-text confirmation gate before sending to ThuyLTT
- [feedback_workstream_all_projects](weekly-report/feedback_workstream_all_projects.md) — fetch WS /review/week for ALL projects, not just GSheets

## monday-report
- [project_monday_report_sheets](monday-report/project_monday_report_sheets.md) — 8 sheet IDs
- [feedback_monday_report_hours_and_scope](monday-report/feedback_monday_report_hours_and_scope.md) — use WS weekTotal, scope=manager+Form dropdown

## monday-effort-verify (with-thuyltt)
- [project_monday_effort_verify_thuyltt_context](monday-effort-verify/project_command_context.md) — ThuyLTT's hour image is WS-derived not independent

## money-report
- [feedback_misa_money_report_net_worth_bugs](money-report/feedback_misa_money_report_net_worth_bugs.md), [reference_misa_money_report_skill_file](money-report/reference_misa_money_report_skill_file.md), [feedback_investment_analysis_framework](money-report/feedback_investment_analysis_framework.md) — Net Worth via trueTotalBalance
- [feedback_money_report_html_dashboard](money-report/feedback_money_report_html_dashboard.md) — needs dashboard.html + history.json
- [feedback_savings_already_matured_check](money-report/feedback_savings_already_matured_check.md) — flag matured savings
- [feedback_tikop_is_liquid_not_investment](money-report/feedback_tikop_is_liquid_not_investment.md) — Tikop=Liquid not Investment

## news-digest
- [feedback_news_digest_full_hallucination_incident](news-digest/feedback_news_digest_full_hallucination_incident.md) — 🔴 whole report faked once; recheck grep must catch fake-URL patterns
- [feedback_news_digest_new_topic](news-digest/feedback_news_digest_new_topic.md), [feedback_news_digest_php_events](news-digest/feedback_news_digest_php_events.md) — unknown topic→own RSS
- [feedback_news_digest_ai_underused_sources](news-digest/feedback_news_digest_ai_underused_sources.md), [feedback_news_digest_use_actual_links](news-digest/feedback_news_digest_use_actual_links.md), [feedback_news_digest_thieu_nguyen_rss_timeout](news-digest/feedback_news_digest_thieu_nguyen_rss_timeout.md) — sample ALL sources
- [feedback_news_digest_dedup_rule](news-digest/feedback_news_digest_dedup_rule.md) — cap URL at 2 appearances
- [feedback_facebook_scraper_missing_x_display](news-digest/feedback_facebook_scraper_missing_x_display.md) — crash root cause: no live Xvfb, fixed w/ self-start fallback
- [feedback_facebook_scraper_chrome_path_drift](news-digest/feedback_facebook_scraper_chrome_path_drift.md) — 🔴 hardcoded `/opt/google/chrome/chrome` no longer exists, use `/usr/bin/google-chrome` fallback (260711)

## server-monitor
- [feedback_server_safety_consolidated](server-monitor/feedback_server_safety_consolidated.md) — never cleanup/VACUUM FULL w/o confirmation

## No dedicated memory yet
trello-monitor, cdf-monitor, tax-check, vn-bank-rates — self-contained.
