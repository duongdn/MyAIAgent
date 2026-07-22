# Memory Index — organized by command, detail in linked file

**Read scope:** `/util:read-memory <command> [piece]` reads Global + matching section ONLY. Filenames are self-descriptive — open a file for detail.

## Global — every command
- [project_memory_index_organized_by_command](global/project_memory_index_organized_by_command.md), [feedback_timeline_system](global/feedback_timeline_system.md)
- [feedback_decrypt_before_reading](global/feedback_decrypt_before_reading.md), [feedback_ssh_passphrase_in_config](global/feedback_ssh_passphrase_in_config.md)
- [feedback_never_report_token_expired](global/feedback_never_report_token_expired.md) — 🔴 fix silently
- [feedback_report_location](global/feedback_report_location.md), [feedback_always_include_links](global/feedback_always_include_links.md), [feedback_report_style](global/feedback_report_style.md), [feedback_customer_facing_messages](global/feedback_customer_facing_messages.md)
- [feedback_workstream_sso_recheck_fixed](daily-report/general/feedback_workstream_sso_recheck_fixed.md) — 🔴 retry at recheck, SSO failure often transient
- [feedback_davidztv_github_always_configured](daily-report/general/feedback_davidztv_github_always_configured.md) — 🔴 check gh auth token -u davidztv
- [feedback_never_send_messages_without_permission](global/feedback_never_send_messages_without_permission.md), [feedback_no_duplicate_sends](global/feedback_no_duplicate_sends.md), [feedback_subagent_no_unauthorized_writes](global/feedback_subagent_no_unauthorized_writes.md)
- [feedback_github_account_mapping](global/feedback_github_account_mapping.md) — duongdn=Elena, nusken=Precognize
- [project_alert_cron_setup](global/project_alert_cron_setup.md), [project_php_team](global/project_php_team.md), [project_timezone_utc7](global/project_timezone_utc7.md), [user_role](global/user_role.md), [feedback_ripgrep_execute_permission_fix](global/feedback_ripgrep_execute_permission.md)
- [project_mpfc_cron_server](global/project_mpfc_cron_server.md) — 🔴 mpfc.mpfc.live runs own cron + 3rd memory store
- [feedback_slack_new_workspace_token_extraction](global/feedback_slack_new_workspace_token_extraction.md)
- [feedback_customer_direct_ask_universal_gate](global/feedback_customer_direct_ask_universal_gate.md) — 🔴 unanswered direct ask=warning
- [feedback_decrypt_secrets_clobbers_live_tokens](global/feedback_decrypt_secrets_clobbers_live_tokens.md)
- [feedback_gui_automation_risk_on_shared_desktop](global/feedback_gui_automation_risk_on_shared_desktop.md) — 🔴 xdotool=live desktop
- [reference_google_drive_service_account_fallback](global/reference_google_drive_service_account_fallback.md), [feedback_strikethrough_corrections](global/feedback_strikethrough_corrections.md)
- [feedback_matrix_never_use_device_auth](global/feedback_matrix_never_use_device_auth.md), [feedback_visible_browser_login_required](global/feedback_visible_browser_login_required.md) — 🔴 see [[project_matrix_static_compat_token]]
- [feedback_fix_internal_issues_not_just_report](global/feedback_fix_internal_issues_not_just_report.md), [feedback_verify_config_history_before_blaming_external_credential](global/feedback_verify_config_history_before_blaming_external_credential.md) — 🔴🔴
- [feedback_missing_report_requires_effort_check](global/feedback_missing_report_requires_effort_check.md) — 🔴🔴🔴 missing report=alert only if effort=0

## daily-report — general
- [project_daily_report_workflow](daily-report/general/project_daily_report_workflow.md), [reference_ohcleo_no_server_access](daily-report/general/reference_ohcleo_no_server_access.md)
- [feedback_ondemand_updates](daily-report/general/feedback_ondemand_updates.md), [feedback_recheck_must_fill_missing_data](daily-report/general/feedback_recheck_must_fill_missing_data.md), [feedback_monday_friday_timestamp](daily-report/general/feedback_monday_friday_timestamp.md)
- [feedback_alert_classification](daily-report/general/feedback_alert_classification.md), [feedback_alert_means_no_complete](daily-report/general/feedback_alert_means_no_complete.md), [feedback_missing_daily_report_is_alert](daily-report/general/feedback_missing_daily_report_is_alert.md)
- [feedback_report_internal_consistency_and_always_reverify](daily-report/general/feedback_report_internal_consistency_and_always_reverify.md) — 🔴🔴🔴 grep whole file

## daily-report:email
- [feedback_freelancer_email_must_be_scanned](daily-report/email/feedback_freelancer_email_must_be_scanned.md), [reference_email_accounts_all10](daily-report/email/reference_email_accounts_all10.md), [feedback_imap_slack_timestamp_gotchas](daily-report/email/feedback_imap_slack_timestamp_gotchas.md)

## daily-report:slack
- [feedback_slack_threads](daily-report/slack/feedback_slack_threads.md), [feedback_token_handling](daily-report/slack/feedback_token_handling.md)
- [feedback_project_topics_not_alerts](daily-report/slack/feedback_project_topics_not_alerts.md), [feedback_low_activity_devs_not_alert](daily-report/slack/feedback_low_activity_devs_not_alert.md)
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [feedback_aysar_consolidated](daily-report/slack/feedback_aysar_consolidated.md) — 🔴 Aysar=MPDM C07SQ4HAUHZ
- [feedback_maddy_kai_longvv_identity_and_quality_escalation](daily-report/slack/feedback_maddy_kai_longvv_identity_and_quality_escalation.md), [feedback_maddy_four_part_check_mandatory](daily-report/slack/feedback_maddy_four_part_check_mandatory.md) — 🔴🔴 3x violated: skipped, then buried outside dedicated section
- [feedback_kai_daily_report_gate](feedback_kai_daily_report_gate.md) — 🔴 check WS Maddy hours first
- [feedback_puppeteer_cron_tmpdir](daily-report/slack/feedback_puppeteer_cron_tmpdir.md), [feedback_solid_code_new_workspace_unwired](daily-report/slack/feedback_solid_code_new_workspace_unwired.md)
- [feedback_franc_rdc_customer_ask_not_flagged](daily-report/slack/feedback_franc_rdc_customer_ask_not_flagged.md) — 🔴

## daily-report:discord
- [feedback_discord_only_airagri_bizurk](daily-report/discord/feedback_discord_only_airagri_bizurk.md), [feedback_vinn_daily_report_format](daily-report/discord/feedback_vinn_daily_report_format.md) — NOT HOMIEAPP
- [feedback_discord_token_refresh_script_broken](daily-report/discord/feedback_discord_token_refresh_script_broken.md) — 🔴 401≠login

## daily-report:sheets
- [feedback_workstream_needs_review_check](daily-report/sheets/feedback_workstream_needs_review_check.md), [feedback_longvv_consolidated](daily-report/sheets/feedback_longvv_consolidated.md)
- [feedback_workstream_all_projects_in_script](daily-report/sheets/feedback_workstream_all_projects_in_script.md), [feedback_dev_project_mapping_flexible](daily-report/sheets/feedback_dev_project_mapping_flexible.md) — 🔴 substring-match bug fixed
- [feedback_google_sheets_per_employee](daily-report/sheets/feedback_google_sheets_per_employee.md), [feedback_sheets_scan_prev_date_for_daily_hours](daily-report/sheets/feedback_sheets_scan_prev_date_for_daily_hours.md)
- [feedback_workstream_fetch_needs_explicit_date_arg](daily-report/sheets/feedback_workstream_fetch_needs_explicit_date_arg.md)
- [feedback_check_workstream_before_flagging_shortfall](daily-report/sheets/feedback_check_workstream_before_flagging_shortfall.md) — 🔴🔴🔴 James Diamond+LeNH false-0h, 12x recurred, single dump not enough, [feedback_marginal_daily_shortfall_check_weekly](daily-report/sheets/feedback_marginal_daily_shortfall_check_weekly.md), [feedback_no_dated_scan_scripts](daily-report/sheets/feedback_no_dated_scan_scripts.md) — 🔴 AM 0h≠bug
- [feedback_sheets_scan_script_positional_args](daily-report/sheets/feedback_sheets_scan_script_positional_args.md) — 🔴 positional args not flags, wrong flags fake a total data-gap
- [feedback_workstream_report_needs_dev_reviewer_hours_and_status](daily-report/sheets/feedback_workstream_report_needs_dev_reviewer_hours_and_status.md) — 🔴 WS row needs dev+reviewer+status
- [feedback_dev_not_working_project_x_means_that_project_only](daily-report/sheets/feedback_dev_not_working_project_x_means_that_project_only.md), [feedback_parttime_official_filter](daily-report/sheets/feedback_parttime_official_filter.md)
- [feedback_sheets_wrong_tab_numbering](daily-report/sheets/feedback_sheets_wrong_tab_numbering.md), [feedback_sheets_empty_col_a_bug](daily-report/sheets/feedback_sheets_empty_col_a_bug.md)
- [feedback_tasklog_summary_sheet](daily-report/sheets/feedback_tasklog_summary_sheet.md), [feedback_summary_sheet_no_double_count](daily-report/sheets/feedback_summary_sheet_no_double_count.md)
- [feedback_lenh_consolidated](daily-report/sheets/feedback_lenh_consolidated.md), [feedback_tuannt_consolidated](daily-report/sheets/feedback_tuannt_consolidated.md)
- [feedback_khanhhh_aysar_consolidated](daily-report/sheets/feedback_khanhhh_aysar_consolidated.md) — Aysar sheet owner=KhanhHH
- [project_leave_plan_system](daily-report/sheets/project_leave_plan_system.md), [feedback_leave_day_handling](daily-report/sheets/feedback_leave_day_handling.md)
- [reference_workstream](daily-report/sheets/reference_workstream.md), [feedback_maddy_jira_weekly_check](daily-report/sheets/feedback_maddy_jira_weekly_check.md) — 🔴 script reads STALE Sheet
- [feedback_encrypt_secrets_missing_workstream](daily-report/sheets/feedback_encrypt_secrets_missing_workstream.md), [feedback_elena_sheet_permission_error](daily-report/sheets/feedback_elena_sheet_permission_error.md)
- [feedback_tasklog_0h_reminder_complete](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md), [feedback_matrix_tomorrow_is_message_date_plus_one](daily-report/sheets/feedback_matrix_tomorrow_is_message_date_plus_one.md)

## daily-report:scrin
- [feedback_scrin_consolidated](daily-report/scrin/feedback_scrin_consolidated.md) — 🔴🔴🔴 tracks Nick NOT TuanNT (3x violated, skill file now fixed too)

## daily-report:fountain
- [feedback_fountain_kunal_checklist](daily-report/fountain/feedback_fountain_kunal_checklist.md) — 🔴 3-part MANDATORY
- [feedback_fountain_dev_specific_consolidated](daily-report/fountain/feedback_fountain_dev_specific_consolidated.md)
- [feedback_fountain_0h_not_expected_day1](daily-report/fountain/feedback_fountain_0h_not_expected_day1.md), [feedback_fountain_monday_plan_timing](daily-report/fountain/feedback_fountain_monday_plan_timing.md)
- [feedback_fountain_tasklog_not_monitored](daily-report/fountain/feedback_fountain_tasklog_not_monitored.md)
## daily-report:elena
- [feedback_elena_consolidated](daily-report/elena/feedback_elena_consolidated.md), [feedback_csp_violations_are_real_errors](daily-report/elena/feedback_csp_violations_are_real_errors.md), [reference_elena_wordpress_csp_config](daily-report/elena/reference_elena_wordpress_csp_config.md)

## daily-report:trello
- [reference_trello_gate_mapping](daily-report/trello/reference_trello_gate_mapping.md), [feedback_trello_all_checklists](daily-report/trello/feedback_trello_all_checklists.md), [feedback_trello_find_by_name](daily-report/trello/feedback_trello_find_by_name.md)
- [feedback_trello_mail_must_check_email](daily-report/trello/feedback_trello_mail_must_check_email.md), [feedback_email_trello_completion](daily-report/trello/feedback_email_trello_completion.md)
- [feedback_checklist_person_link](daily-report/trello/feedback_checklist_person_link.md), [feedback_trello_per_client_gates_on_lead_dev](daily-report/trello/feedback_trello_per_client_gates_on_lead_dev.md)
- [feedback_philip_msteams_must_run](daily-report/trello/feedback_philip_msteams_must_run.md), [feedback_philip_msteams_duplicate_contacts](daily-report/trello/feedback_philip_msteams_duplicate_contacts.md) — ✅ FIXED
- [feedback_recheck_uses_morning_report_data](daily-report/trello/feedback_recheck_uses_morning_report_data.md) — 🔴 pull Trello LIVE
- [feedback_rebecca_chua_not_trello_block](daily-report/trello/feedback_rebecca_chua_not_trello_block.md), [feedback_tuannt_gate_show_breakdown](daily-report/trello/feedback_tuannt_gate_show_breakdown.md)
- [feedback_arthur_blair_brown_gate_added](daily-report/trello/feedback_arthur_blair_brown_gate_added.md)
- [feedback_philip_msteams_chrome_profile_crash](daily-report/trello/feedback_philip_msteams_chrome_profile_crash.md) — 🔴 rebuild keeping IndexedDB
- [feedback_msteams_stale_profile](daily-report/trello/feedback_msteams_stale_profile.md) — 🔴 clear tmp profile before concluding auth broken

## daily-report:matrix
- [feedback_matrix_daily_summary](daily-report/matrix/feedback_matrix_daily_summary.md), [feedback_matrix_join_public_room](daily-report/matrix/feedback_matrix_join_public_room.md)
- [feedback_matrix_resource_arrangement_room](daily-report/matrix/feedback_matrix_resource_arrangement_room.md), [project_longvv_james_diamond](daily-report/matrix/project_longvv_james_diamond.md)
- [reference_matrix_rooms](daily-report/reminders/reference_matrix_rooms.md)
- [feedback_read_full_room_transcript_not_grep_snippets](daily-report/matrix/feedback_read_full_room_transcript_not_grep_snippets.md) — 🔴
- [project_matrix_static_compat_token](daily-report/matrix/project_matrix_static_compat_token.md) — 🔴 mct_ admin token
- [feedback_maddy_bitbucket_pr_alert_needs_live_verification](daily-report/matrix/feedback_maddy_bitbucket_pr_alert_needs_live_verification.md) — 🔴 recompute live
- [feedback_dont_bury_real_issues_as_context](daily-report/matrix/feedback_dont_bury_real_issues_as_context.md) — 🔴 real issue needs own alert

## daily-report:upwork
- [feedback_upwork_in_daily_report](daily-report/upwork/feedback_upwork_in_daily_report.md), [feedback_upwork_task_id_filter_consolidated](daily-report/upwork/feedback_upwork_task_id_filter_consolidated.md)
- [feedback_upwork_match_not_alert](daily-report/upwork/feedback_upwork_match_not_alert.md), [feedback_neural_consolidated](daily-report/upwork/feedback_neural_consolidated.md) — 🔴 read PERMANENT FIX section before touching Neural/Rory/Aysar auth, [reference_upwork_workrooms](daily-report/upwork/reference_upwork_workrooms.md) — 🔴 live-cookie fix now covers Rory/Aysar too, not just Neural

## daily-report:performance
- [project_performance_piece_added](daily-report/performance/project_performance_piece_added.md) — check NRQL TIMESERIES

## bailey-invoice-verify/monitor/task-monitor
- [feedback_bailey_paturevision_billing](bailey/feedback_bailey_paturevision_billing.md), [feedback_tasklog_skip_first_row](bailey/feedback_tasklog_skip_first_row.md)
- [feedback_bailey_trello_card_is_recurring](bailey/feedback_bailey_trello_card_is_recurring.md), [feedback_warning_needs_explanation](bailey/feedback_warning_needs_explanation.md), [reference_bailey_monitor_skill_file](bailey/reference_bailey_monitor_skill_file.md)
- [feedback_overbudget_check_missing_from_other_active](bailey/feedback_overbudget_check_missing_from_other_active.md) — 🔴
- [feedback_boto3_pyopenssl_broken](bailey/feedback_boto3_pyopenssl_broken.md), [feedback_siteground_captcha_no_ssh_fallback](bailey/feedback_siteground_captcha_no_ssh_fallback.md)

## mpfc-monitor
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [reference_mpfc_github](mpfc-monitor/reference_mpfc_github.md)

## weekly-report
- [feedback_matrix_report_format](weekly-report/feedback_matrix_report_format.md), [project_blair_brown_setup](weekly-report/project_blair_brown_setup.md) — Blair Brown FORBIDDEN
- [feedback_thuyle_report_explicit_send_flag](weekly-report/feedback_thuyle_report_explicit_send_flag.md) — 🔴 exact-text confirm
- [feedback_workstream_all_projects](weekly-report/feedback_workstream_all_projects.md)

## monday-report
- [project_monday_report_sheets](monday-report/project_monday_report_sheets.md), [feedback_monday_report_hours_and_scope](monday-report/feedback_monday_report_hours_and_scope.md)
- [feedback_workstream_dates_can_undercount_ws_vs_manual](monday-report/feedback_workstream_dates_can_undercount_ws_vs_manual.md) — verify live before override
- [reference_sheets_summary_week_fetch_script](monday-report/reference_sheets_summary_week_fetch_script.md) — fixes UTC date-shift bug

## monday-effort-verify
- [project_monday_effort_verify_thuyltt_context](monday-effort-verify/project_command_context.md), [reference_elena_samguard_tasklog_sheet](monday-effort-verify/reference_elena_samguard_tasklog_sheet.md) — 🔴 tab `W{n}` ≠ calendar week

## money-report
- [feedback_misa_money_report_net_worth_bugs](money-report/feedback_misa_money_report_net_worth_bugs.md), [reference_misa_money_report_skill_file](money-report/reference_misa_money_report_skill_file.md), [feedback_investment_analysis_framework](money-report/feedback_investment_analysis_framework.md)
- [feedback_money_report_html_dashboard](money-report/feedback_money_report_html_dashboard.md) — 🔴🔴🔴 fix baked into command
- [feedback_savings_already_matured_check](money-report/feedback_savings_already_matured_check.md), [feedback_tikop_is_liquid_not_investment](money-report/feedback_tikop_is_liquid_not_investment.md)

## news-digest
- [feedback_news_digest_full_hallucination_incident](news-digest/feedback_news_digest_full_hallucination_incident.md) — 🔴
- [feedback_news_digest_new_topic](news-digest/feedback_news_digest_new_topic.md), [feedback_news_digest_php_events](news-digest/feedback_news_digest_php_events.md)
- [feedback_news_digest_ai_underused_sources](news-digest/feedback_news_digest_ai_underused_sources.md), [feedback_news_digest_use_actual_links](news-digest/feedback_news_digest_use_actual_links.md)
- [feedback_news_digest_thieu_nguyen_rss_timeout](news-digest/feedback_news_digest_thieu_nguyen_rss_timeout.md), [feedback_news_digest_dedup_rule](news-digest/feedback_news_digest_dedup_rule.md)
- [feedback_facebook_scraper_missing_x_display](news-digest/feedback_facebook_scraper_missing_x_display.md)
- [feedback_facebook_scraper_chrome_path_drift](news-digest/feedback_facebook_scraper_chrome_path_drift.md) — 🔴 use google-chrome path
- [feedback_facebook_scraper_deleted_by_cleanup_commit](news-digest/feedback_facebook_scraper_deleted_by_cleanup_commit.md) — 🔴 3rd root cause: bulk cleanup commit deleted script, restore from git history

## server-monitor
- [feedback_server_safety_consolidated](server-monitor/feedback_server_safety_consolidated.md)

## No dedicated memory yet
trello-monitor, cdf-monitor, tax-check, vn-bank-rates — self-contained.
