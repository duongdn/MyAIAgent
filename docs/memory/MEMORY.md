# Memory Index — organized by command, detail in linked file

**Read scope:** `/util:read-memory <command> [piece]` reads Global + matching section ONLY. Filenames are self-descriptive — open a file for detail.

## Global — every command
- [project_memory_index_organized_by_command](global/project_memory_index_organized_by_command.md), [feedback_timeline_system](global/feedback_timeline_system.md)
- [feedback_decrypt_before_reading](global/feedback_decrypt_before_reading.md), [feedback_ssh_passphrase_in_config](global/feedback_ssh_passphrase_in_config.md)
- [feedback_never_report_token_expired](global/feedback_never_report_token_expired.md) — 🔴 fix silently
- [feedback_report_location](global/feedback_report_location.md), [feedback_always_include_links](global/feedback_always_include_links.md), [feedback_report_style](global/feedback_report_style.md), [feedback_customer_facing_messages](global/feedback_customer_facing_messages.md)
- [feedback_workstream_sso_recheck_fixed](daily-report/general/feedback_workstream_sso_recheck_fixed.md) — 🔴 SSO transient, retry
- [feedback_davidztv_github_always_configured](daily-report/general/feedback_davidztv_github_always_configured.md) — 🔴 gh auth token -u davidztv
- [feedback_never_send_messages_without_permission](global/feedback_never_send_messages_without_permission.md), [feedback_no_duplicate_sends](global/feedback_no_duplicate_sends.md), [feedback_subagent_no_unauthorized_writes](global/feedback_subagent_no_unauthorized_writes.md)
- [feedback_github_account_mapping](global/feedback_github_account_mapping.md) — duongdn=Elena, nusken=Precognize
- [project_alert_cron_setup](global/project_alert_cron_setup.md), [project_php_team](global/project_php_team.md), [project_timezone_utc7](global/project_timezone_utc7.md), [user_role](global/user_role.md), [feedback_ripgrep_execute_permission_fix](global/feedback_ripgrep_execute_permission.md)
- [project_mpfc_cron_server](global/project_mpfc_cron_server.md) — 🔴 own cron + 3rd memory store
- [feedback_slack_new_workspace_token_extraction](global/feedback_slack_new_workspace_token_extraction.md)
- [feedback_customer_direct_ask_universal_gate](global/feedback_customer_direct_ask_universal_gate.md) — 🔴 unanswered ask=warning
- [feedback_decrypt_secrets_clobbers_live_tokens](global/feedback_decrypt_secrets_clobbers_live_tokens.md)
- [feedback_gui_automation_risk_on_shared_desktop](global/feedback_gui_automation_risk_on_shared_desktop.md) — 🔴 xdotool=live desktop
- [feedback_visible_browser_login_required](global/feedback_visible_browser_login_required.md) — 🔴 never external-timeout shorter than internal wait
- [reference_google_drive_service_account_fallback](global/reference_google_drive_service_account_fallback.md), [feedback_strikethrough_corrections](global/feedback_strikethrough_corrections.md)
- [feedback_matrix_never_use_device_auth](global/feedback_matrix_never_use_device_auth.md), [feedback_visible_browser_login_required](global/feedback_visible_browser_login_required.md) — 🔴 see [[project_matrix_static_compat_token]]
- [feedback_fix_internal_issues_not_just_report](global/feedback_fix_internal_issues_not_just_report.md), [feedback_verify_config_history_before_blaming_external_credential](global/feedback_verify_config_history_before_blaming_external_credential.md) — 🔴🔴
- [feedback_missing_report_requires_effort_check](global/feedback_missing_report_requires_effort_check.md) — 🔴🔴🔴 missing report=alert only if effort=0
- [feedback_never_invent_requirements_in_estimates](global/feedback_never_invent_requirements_in_estimates.md) — 🔴🔴 quote ONLY what client asked; open their mockup before costing
- [feedback_redmine_curl_needs_url_encoding](global/feedback_redmine_curl_needs_url_encoding.md) — use -G --data-urlencode, raw `><|` 400s
- [feedback_claude_launcher_model_separation](global/feedback_claude_launcher_model_separation.md) — default claude=subscription sonnet; claude-nus/duongdn(-prod)=DeepSeek launchers, keep

## daily-report — general
- [project_daily_report_workflow](daily-report/general/project_daily_report_workflow.md), [reference_ohcleo_no_server_access](daily-report/general/reference_ohcleo_no_server_access.md)
- [feedback_ondemand_updates](daily-report/general/feedback_ondemand_updates.md), [feedback_recheck_must_fill_missing_data](daily-report/general/feedback_recheck_must_fill_missing_data.md), [feedback_monday_friday_timestamp](daily-report/general/feedback_monday_friday_timestamp.md), [feedback_monday_must_use_friday_data](daily-report/general/feedback_monday_must_use_friday_data.md) — 🔴🔴🔴 #1 bug: Monday uses Friday data
- [feedback_alert_classification](daily-report/general/feedback_alert_classification.md), [feedback_alert_means_no_complete](daily-report/general/feedback_alert_means_no_complete.md), [feedback_missing_daily_report_is_alert](daily-report/general/feedback_missing_daily_report_is_alert.md)
- [feedback_report_internal_consistency_and_always_reverify](daily-report/general/feedback_report_internal_consistency_and_always_reverify.md) — 🔴🔴🔴 grep whole file
- [feedback_trello_write_only_verified_and_no_debug_writes](daily-report/general/feedback_trello_write_only_verified_and_no_debug_writes.md) — 🔴 never test-write to Trello (debug PUT completed Philip twice); re-fetch live card before finalizing (concurrent sessions flip items)

## daily-report:email
- [feedback_freelancer_email_must_be_scanned](daily-report/email/feedback_freelancer_email_must_be_scanned.md), [reference_email_accounts_all10](daily-report/email/reference_email_accounts_all10.md), [feedback_imap_slack_timestamp_gotchas](daily-report/email/feedback_imap_slack_timestamp_gotchas.md)

## daily-report:slack
- [feedback_slack_threads](daily-report/slack/feedback_slack_threads.md), [feedback_token_handling](daily-report/slack/feedback_token_handling.md)
- [feedback_project_topics_not_alerts](daily-report/slack/feedback_project_topics_not_alerts.md), [feedback_low_activity_devs_not_alert](daily-report/slack/feedback_low_activity_devs_not_alert.md)
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [feedback_aysar_consolidated](daily-report/slack/feedback_aysar_consolidated.md) — 🔴 Aysar=MPDM C07SQ4HAUHZ
- [feedback_maddy_kai_longvv_identity_and_quality_escalation](daily-report/slack/feedback_maddy_kai_longvv_identity_and_quality_escalation.md), [feedback_maddy_four_part_check_mandatory](daily-report/slack/feedback_maddy_four_part_check_mandatory.md) — 🔴🔴 4x violated, [feedback_maddy_4part_check_mandatory_in_every_report](daily-report/slack/feedback_maddy_4part_check_mandatory_in_every_report.md) — 🔴🔴🔴 standalone ## section required, [feedback_maddy_jira_ticket_activity_daily](daily-report/slack/feedback_maddy_jira_ticket_activity_daily.md) — 🔴 daily JIRA comment scan
- [feedback_kai_daily_report_gate](feedback_kai_daily_report_gate.md) — 🔴 check WS Maddy hours first
- [feedback_puppeteer_cron_tmpdir](daily-report/slack/feedback_puppeteer_cron_tmpdir.md), [feedback_solid_code_new_workspace_unwired](daily-report/slack/feedback_solid_code_new_workspace_unwired.md)
- [feedback_franc_rdc_customer_ask_not_flagged](daily-report/slack/feedback_franc_rdc_customer_ask_not_flagged.md) — 🔴
- [feedback_ohcleo_events_code_channel_not_found](daily-report/slack/feedback_ohcleo_events_code_channel_not_found.md) — channel_not_found=bot removed from channel, not auth; needs admin re-invite

## daily-report:discord
- [feedback_discord_only_airagri_bizurk](daily-report/discord/feedback_discord_only_airagri_bizurk.md), [feedback_vinn_daily_report_format](daily-report/discord/feedback_vinn_daily_report_format.md) — NOT HOMIEAPP
- [feedback_discord_token_refresh_script_broken](daily-report/discord/feedback_discord_token_refresh_script_broken.md) — 🔴 401≠login

## daily-report:sheets
- [feedback_workstream_needs_review_check](daily-report/sheets/feedback_workstream_needs_review_check.md), [feedback_longvv_consolidated](daily-report/sheets/feedback_longvv_consolidated.md)
- [feedback_workstream_all_projects_in_script](daily-report/sheets/feedback_workstream_all_projects_in_script.md), [feedback_dev_project_mapping_flexible](daily-report/sheets/feedback_dev_project_mapping_flexible.md) — 🔴 substring-match bug fixed
- [feedback_google_sheets_per_employee](daily-report/sheets/feedback_google_sheets_per_employee.md), [feedback_sheets_scan_prev_date_for_daily_hours](daily-report/sheets/feedback_sheets_scan_prev_date_for_daily_hours.md)
- [feedback_workstream_fetch_needs_explicit_date_arg](daily-report/sheets/feedback_workstream_fetch_needs_explicit_date_arg.md)
- [feedback_check_workstream_before_flagging_shortfall](daily-report/sheets/feedback_check_workstream_before_flagging_shortfall.md) — 🔴🔴🔴 12x recurred false-0h, [feedback_marginal_daily_shortfall_check_weekly](daily-report/sheets/feedback_marginal_daily_shortfall_check_weekly.md), [feedback_no_dated_scan_scripts](daily-report/sheets/feedback_no_dated_scan_scripts.md) — 🔴 AM 0h≠bug
- [feedback_sheets_scan_script_positional_args](daily-report/sheets/feedback_sheets_scan_script_positional_args.md) — 🔴 positional args not flags
- [feedback_workstream_report_needs_dev_reviewer_hours_and_status](daily-report/sheets/feedback_workstream_report_needs_dev_reviewer_hours_and_status.md) — 🔴 WS row needs dev+reviewer+status
- [feedback_dev_not_working_project_x_means_that_project_only](daily-report/sheets/feedback_dev_not_working_project_x_means_that_project_only.md), [feedback_parttime_official_filter](daily-report/sheets/feedback_parttime_official_filter.md)
- [feedback_sheets_wrong_tab_numbering](daily-report/sheets/feedback_sheets_wrong_tab_numbering.md), [feedback_sheets_empty_col_a_bug](daily-report/sheets/feedback_sheets_empty_col_a_bug.md)
- [feedback_tasklog_summary_sheet](daily-report/sheets/feedback_tasklog_summary_sheet.md), [feedback_summary_sheet_no_double_count](daily-report/sheets/feedback_summary_sheet_no_double_count.md)
- [feedback_lenh_consolidated](daily-report/sheets/feedback_lenh_consolidated.md), [feedback_tuannt_consolidated](daily-report/sheets/feedback_tuannt_consolidated.md), [feedback_phucvt_adhoc_external_ignore](daily-report/sheets/feedback_phucvt_adhoc_external_ignore.md)
- [feedback_khanhhh_aysar_consolidated](daily-report/sheets/feedback_khanhhh_aysar_consolidated.md) — Aysar sheet owner=KhanhHH
- [project_leave_plan_system](daily-report/sheets/project_leave_plan_system.md), [feedback_leave_day_handling](daily-report/sheets/feedback_leave_day_handling.md)
- [reference_workstream](daily-report/sheets/reference_workstream.md), [feedback_maddy_jira_weekly_check](daily-report/sheets/feedback_maddy_jira_weekly_check.md) — 🔴 script reads STALE Sheet
- [feedback_encrypt_secrets_missing_workstream](daily-report/sheets/feedback_encrypt_secrets_missing_workstream.md), [feedback_elena_sheet_permission_error](daily-report/sheets/feedback_elena_sheet_permission_error.md)
- [feedback_tasklog_0h_reminder_complete](daily-report/sheets/feedback_tasklog_0h_reminder_complete.md), [feedback_matrix_tomorrow_is_message_date_plus_one](daily-report/sheets/feedback_matrix_tomorrow_is_message_date_plus_one.md)

## daily-report:scrin
- [feedback_scrin_consolidated](daily-report/scrin/feedback_scrin_consolidated.md) — 🔴🔴🔴 tracks Nick NOT TuanNT

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
- [reference_nick_trello_session_read](daily-report/trello/reference_nick_trello_session_read.md) — read Nick-board cards via Chrome Default-profile cookies, not .trello-config.json
- [feedback_philip_msteams_must_run](daily-report/trello/feedback_philip_msteams_must_run.md), [feedback_philip_msteams_duplicate_contacts](daily-report/trello/feedback_philip_msteams_duplicate_contacts.md) — 🔴 regressed 2026-08-13, customerHints dropped from config, re-check it exists
- [feedback_recheck_uses_morning_report_data](daily-report/trello/feedback_recheck_uses_morning_report_data.md) — 🔴 pull Trello LIVE
- [feedback_rebecca_chua_not_trello_block](daily-report/trello/feedback_rebecca_chua_not_trello_block.md), [feedback_tuannt_gate_show_breakdown](daily-report/trello/feedback_tuannt_gate_show_breakdown.md)
- [feedback_arthur_blair_brown_gate_added](daily-report/trello/feedback_arthur_blair_brown_gate_added.md)
- [feedback_philip_msteams_chrome_profile_crash](daily-report/trello/feedback_philip_msteams_chrome_profile_crash.md) — 🔴 rebuild keeping IndexedDB
- [feedback_msteams_stale_profile](daily-report/trello/feedback_msteams_stale_profile.md) — 🔴 clear tmp profile first
- [feedback_legalatoms_ray_many_subprojects_ignore_unless_direct_ask](daily-report/trello/feedback_legalatoms_ray_many_subprojects_ignore_unless_direct_ask.md) — Raymond many sub-projects, ignore client msg unless direct ask to us

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
- [feedback_upwork_match_not_alert](daily-report/upwork/feedback_upwork_match_not_alert.md), [feedback_neural_consolidated](daily-report/upwork/feedback_neural_consolidated.md) — 🔴 read PERMANENT FIX before touching Neural/Rory/Aysar auth, [reference_upwork_workrooms](daily-report/upwork/reference_upwork_workrooms.md) — 🔴 live-cookie fix covers Rory/Aysar too
- [reference_upwork_inbox_generic_room_script](daily-report/upwork/reference_upwork_inbox_generic_room_script.md) — read ANY inbox thread: `upwork-room-messages.js`, inbox=/ab/messages/, storyId not id
- [reference_upwork_memo_validation](daily-report/upwork/reference_upwork_memo_validation.md) — Piece 15: Hourly Payment Protection memo rubric + `upwork-memo-check.js`; invalid memo = ⚠️
- [project_brad_ballantine_new_sites](daily-report/upwork/project_brad_ballantine_new_sites.md) — 🟡 estimate sent 08-07 (13–15h); 08-09 homepage-text + photos asks in progress (inbox scan 08-10)
- [reference_auctionwarehouse_server_and_stack](daily-report/upwork/reference_auctionwarehouse_server_and_stack.md) — 🔴 Laravel 5.8 + open /register = anyone is admin, past webshells
- [feedback_venv_python_abi_mismatch_broken_browser_cookie3](daily-report/feedback_venv_python_abi_mismatch_broken_browser_cookie3.md) — 🔴 Upwork fails in run but works manually = venv ABI mismatch, not auth; add system-python fallback
- [feedback_bailey_vinn_david2_accounts_removed](daily-report/upwork/feedback_bailey_vinn_david2_accounts_removed.md) — 🔴 Bailey Upwork accounts vinn/david2 gone (2026-08-10); never report "no saved session"; Bailey tracked via sheet+TuanNT only

## daily-report:performance
- [project_performance_piece_added](daily-report/performance/project_performance_piece_added.md) — check NRQL TIMESERIES

## daily-report:whatsapp-zalo
- [project_whatsapp_zalo_cdp_monitor](daily-report/project_whatsapp_zalo_cdp_monitor.md) — 🔴 WhatsApp full content + Zalo name/time only; dedicated monitor Chrome (--user-data-dir), E2EE constraint

## bailey-invoice-verify/monitor/task-monitor
- [feedback_bailey_paturevision_billing](bailey/feedback_bailey_paturevision_billing.md), [feedback_tasklog_skip_first_row](bailey/feedback_tasklog_skip_first_row.md)
- [feedback_bailey_trello_card_is_recurring](bailey/feedback_bailey_trello_card_is_recurring.md), [feedback_warning_needs_explanation](bailey/feedback_warning_needs_explanation.md), [reference_bailey_monitor_skill_file](bailey/reference_bailey_monitor_skill_file.md)
- [feedback_overbudget_check_missing_from_other_active](bailey/feedback_overbudget_check_missing_from_other_active.md) — 🔴
- [feedback_boto3_pyopenssl_broken](bailey/feedback_boto3_pyopenssl_broken.md), [feedback_siteground_captcha_no_ssh_fallback](bailey/feedback_siteground_captcha_no_ssh_fallback.md)

## mpfc-monitor
- [feedback_mpfc_oauth2_real_unresolved_bug](daily-report/slack/feedback_mpfc_oauth2_real_unresolved_bug.md), [reference_mpfc_github](mpfc-monitor/reference_mpfc_github.md)

## weekly-report
- [feedback_matrix_report_format](weekly-report/feedback_matrix_report_format.md), [project_blair_brown_setup](weekly-report/project_blair_brown_setup.md) — Blair Brown IS included (see [[feedback_blair_brown_index_annotation_contradicts_file]], old "FORBIDDEN" tag was stale/unexplained)
- [feedback_thuyle_report_explicit_send_flag](weekly-report/feedback_thuyle_report_explicit_send_flag.md) — 🔴 exact-text confirm
- [feedback_workstream_all_projects](weekly-report/feedback_workstream_all_projects.md)
- [feedback_workstream_display_outage_pattern](weekly-report/feedback_workstream_display_outage_pattern.md) — 🔴 WS SSO failed 3x/1wk (07-26/31, 08-01), check env before blind retry
- [feedback_blair_brown_index_annotation_contradicts_file](weekly-report/feedback_blair_brown_index_annotation_contradicts_file.md) — index/file conflict resolved, include Blair Brown

## monday-report
- [project_monday_report_sheets](monday-report/project_monday_report_sheets.md), [feedback_monday_report_hours_and_scope](monday-report/feedback_monday_report_hours_and_scope.md)
- [feedback_monday_report_must_write_file](monday-report/feedback_monday_report_must_write_file.md) — 🔴 always write reports/{date}/{HHMM}-monday-report.md, was previously null/ad-hoc
- [feedback_workstream_dates_can_undercount_ws_vs_manual](monday-report/feedback_workstream_dates_can_undercount_ws_vs_manual.md) — verify live before override
- [reference_sheets_summary_week_fetch_script](monday-report/reference_sheets_summary_week_fetch_script.md) — fixes UTC date-shift bug
- [feedback_external_bug_counting_judgment_calls](monday-report/feedback_external_bug_counting_judgment_calls.md) — merge same-issue threads, exclude investigation-only client asks
- [feedback_maddy_workstream_hours_longvv_filter](monday-report/feedback_maddy_workstream_hours_longvv_filter.md) — 🔴 Maddy WS hours = LongVV member only, don't sum all members
- [feedback_marcel_equanimity_slack_external_bugs](monday-report/feedback_marcel_equanimity_slack_external_bugs.md) — 🔴 Marcel bugs live in "Equanimity" Slack workspace, skill's "always 0" is wrong

## monday-effort-verify
- [project_monday_effort_verify_thuyltt_context](monday-effort-verify/project_command_context.md), [reference_elena_samguard_tasklog_sheet](monday-effort-verify/reference_elena_samguard_tasklog_sheet.md) — 🔴 tab `W{n}` ≠ calendar week

## money-report
- [feedback_misa_money_report_net_worth_bugs](money-report/feedback_misa_money_report_net_worth_bugs.md), [reference_misa_money_report_skill_file](money-report/reference_misa_money_report_skill_file.md), [feedback_investment_analysis_framework](money-report/feedback_investment_analysis_framework.md)
- [feedback_money_report_html_dashboard](money-report/feedback_money_report_html_dashboard.md) — 🔴🔴🔴 fix baked into command
- [feedback_savings_already_matured_check](money-report/feedback_savings_already_matured_check.md), [feedback_tikop_is_liquid_not_investment](money-report/feedback_tikop_is_liquid_not_investment.md)
- [feedback_near_zero_cost_basis_is_settled_ledger_not_idle_cash](money-report/feedback_near_zero_cost_basis_is_settled_ledger_not_idle_cash.md) — 🔴 basis≈0=ledger settled, NOT idle cash
- [feedback_liquid_must_include_inactive_residual_accounts](money-report/feedback_liquid_must_include_inactive_residual_accounts.md) — 🔴 Momo/nam á/Payoneer (~907K) belong in Liquid despite inActive:true; use 72.9M gap as sanity check

## news-digest
- [feedback_news_digest_full_hallucination_incident](news-digest/feedback_news_digest_full_hallucination_incident.md) — 🔴
- [feedback_news_digest_new_topic](news-digest/feedback_news_digest_new_topic.md), [feedback_news_digest_php_events](news-digest/feedback_news_digest_php_events.md)
- [feedback_news_digest_ai_underused_sources](news-digest/feedback_news_digest_ai_underused_sources.md), [feedback_news_digest_use_actual_links](news-digest/feedback_news_digest_use_actual_links.md)
- [feedback_news_digest_thieu_nguyen_rss_timeout](news-digest/feedback_news_digest_thieu_nguyen_rss_timeout.md), [feedback_news_digest_dedup_rule](news-digest/feedback_news_digest_dedup_rule.md)
- [feedback_facebook_scraper_missing_x_display](news-digest/feedback_facebook_scraper_missing_x_display.md)
- [feedback_facebook_scraper_chrome_path_drift](news-digest/feedback_facebook_scraper_chrome_path_drift.md) — 🔴 use google-chrome path
- [feedback_facebook_scraper_deleted_by_cleanup_commit](news-digest/feedback_facebook_scraper_deleted_by_cleanup_commit.md) — 🔴 restore from git history
- [feedback_facebook_scraper_char_scramble](news-digest/feedback_facebook_scraper_char_scramble.md) — 🔴 titles scrambled, split on "Đã chia sẻ với Công khai"
- [feedback_facebook_not_logged_in_is_false_failure](news-digest/feedback_facebook_not_logged_in_is_false_failure.md) — 🔴 test scraper directly before reporting
- [feedback_article_count_5_per_source](news-digest/feedback_article_count_5_per_source.md) — 5/source settled default
- [feedback_news_digest_check_memory_before_run](news-digest/feedback_news_digest_check_memory_before_run.md) — 🔴 read this dir BEFORE fetching
- [feedback_news_digest_fb_source_misattribution](news-digest/feedback_news_digest_fb_source_misattribution.md) — mrgoonie post landed under Thiệu Nguyễn's JSON key, verify by link/content not key
- [feedback_news_digest_nghienai_group_persistent_notloggedin](news-digest/feedback_news_digest_nghienai_group_persistent_notloggedin.md) — group-specific auth fail, distinct from session-wide failure
- [feedback_news_digest_western_labs_only_query_gap](news-digest/feedback_news_digest_western_labs_only_query_gap.md) — 🔴 AI Model Releases source query missed DeepSeek/Qwen; fixed 2026-08-13

## server-monitor
- [feedback_server_safety_consolidated](server-monitor/feedback_server_safety_consolidated.md)

## finance-report
- [project_finance_report_detail_skill](finance-report/project_finance_report_detail_skill.md) — 6-sheet FPT/VEA-style report — 🔴 format DURING build
- [reference_cafef_data_source](finance-report/reference_cafef_data_source.md) — cafef.vn JSON API + 3 bugs (LCTT endpoint, +60k tỷ typo, EPS scaling) + BVPS share-split gotcha
- [reference_raw_sheet_formatting_spec](finance-report/reference_raw_sheet_formatting_spec.md) — 🔴 VEA cell-format spec + 4 apply-scripts, run every build
- [project_candidate_watchlist_ttl_system](finance-report/project_candidate_watchlist_ttl_system.md) — watchlist tạm TTL 7 ngày + CLI finance-candidates.js — 🔴 bẫy trùng ký hiệu APH/ADP
- [feedback_finance_report_detail_new_ticker_qa_checklist](finance-report/feedback_finance_report_detail_new_ticker_qa_checklist.md) — 🔴🔴 text ticker cũ sót lại + %-format bị làm tròn + thiếu row-groups ở Định lượng, so đếm group/merge với ticker tham chiếu
- [feedback_finance_report_never_construct_urls_and_more_ticker_collisions](finance-report/feedback_finance_report_never_construct_urls_and_more_ticker_collisions.md) — 🔴🔴🔴 KHÔNG tự tạo URL rss?q=, luôn lấy link thật từ JSON; FOX↔FOXA, HPP↔SHB nhiễu
- [project_finance_quantification_skill](finance-report/project_finance_quantification_skill.md) — `/me:finance-quantification <TICKER>` standalone ratio analysis + web app at quantification.youragentstore.net, built 2026-07-30
- [feedback_cafef_incomplete_fireant_alternative](finance-report/feedback_cafef_incomplete_fireant_alternative.md) — FireAnt fallback IMPLEMENTED; nhưng BVH verifed cafef đủ (insurance 68+54+37 rows); FireAnt LCTT chỉ 5 dòng gộp → luôn ưu tiên cafef
- [feedback_newly_listed_ticker_thin_cafef_data](finance-report/feedback_newly_listed_ticker_thin_cafef_data.md) — HPA mới niêm yết, cafef chỉ 1 năm thật (không phải thiếu); FireAnt trộn data mã cũ khác chủ → dùng `--cafef` thay vì auto-fallback
- [feedback_balance_check_removed_may_write_mismatched_totals](finance-report/feedback_balance_check_removed_may_write_mismatched_totals.md) — 🔴 balance check (270 vs 440) đã bị XOÁ hẳn 2026-08-15 theo yêu cầu DuongDN; script giờ ghi mọi ticker kể cả khi tổng ko khớp (case VNM FY2025)

## tech-talk
- [feedback_mpfc_excluded_from_demo](tech-talk/feedback_mpfc_excluded_from_demo.md) — 🔴 MPFC fully off-limits for this deck/demo, higher severity than other forbidden names

## No dedicated memory yet
trello-monitor, cdf-monitor, tax-check, vn-bank-rates — self-contained.
