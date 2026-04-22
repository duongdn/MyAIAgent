# Memory Index

## User
- [user_role.md](user_role.md) — PM at NUS Technology, oversees 10+ client projects, daily monitoring workflow

## Project
- [project_daily_report_workflow.md](project_daily_report_workflow.md) — Full daily report workflow: all data sources, Trello mappings, config files
- [project_alert_cron_setup.md](project_alert_cron_setup.md) — Alert cron: 30 min interval, env requirements, rate-limit detection
- [project_maddy_new_tasklog.md](project_maddy_new_tasklog.md) — Maddy task log = sheet 1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I (since 2026-04-06)
- [project_monday_report_sheets.md](project_monday_report_sheets.md) — All 8 Monday report sheet IDs. Neural/LegalAtoms/Taraba DO have sheets (skill said "always 0", wrong)
- [project_longvv_james_diamond.md](project_longvv_james_diamond.md) — LongVV works on Maddy + James Diamond sheets from W23 (2026-04-20); sum both sheets for total

## Reference
- [reference_upwork_workrooms.md](reference_upwork_workrooms.md) — Upwork workroom URLs, account credentials, weekly report comparison
- [reference_matrix_rooms.md](reference_matrix_rooms.md) — Developer Matrix room IDs for task log reminders

## Feedback — Monitoring & Alerts
- [feedback_timeline_system.md](feedback_timeline_system.md) — Three timelines (daily_report/refresh/alert), MUST update at end of EVERY run
- [feedback_token_handling.md](feedback_token_handling.md) — Fix tokens silently, verify before flagging, xoxc needs Cookie header
- [feedback_alert_classification.md](feedback_alert_classification.md) — Only our issues, checklist text is notes not alerts, staging=INFO, "Chưa"=normal
- [feedback_alert_means_no_complete.md](feedback_alert_means_no_complete.md) — Alert found = do NOT complete Trello item
- [feedback_missing_daily_report_is_alert.md](feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert
- [feedback_project_topics_not_alerts.md](feedback_project_topics_not_alerts.md) — Slack dev discussions ≠ alerts, don't block Trello
- [feedback_csp_violations_are_real_errors.md](feedback_csp_violations_are_real_errors.md) — samguard.co CSP violations are real errors

## Feedback — Slack & Discord
- [feedback_slack_threads.md](feedback_slack_threads.md) — MUST use search.messages API (conversations.history misses thread replies)
- [feedback_discord_only_airagri_bizurk.md](feedback_discord_only_airagri_bizurk.md) — Discord: only AirAgri + Bizurk, NOT HOMIEAPP
- [feedback_andrew_taraba_animworld_dm.md](feedback_andrew_taraba_animworld_dm.md) — Andrew Taraba: check nuscarrick DM with "animeworld", not Bizurk channels
- [feedback_andrew_taraba_low_activity.md](feedback_andrew_taraba_low_activity.md) — Bizurk/Andrew Taraba is low-activity, silence is normal not an alert

## Feedback — Trello
- [feedback_checklist_person_link.md](feedback_checklist_person_link.md) — Checklist items name person; their status gates completion
- [feedback_trello_find_by_name.md](feedback_trello_find_by_name.md) — Check mail/progress cards are recurring, find by name not ID
- [feedback_trello_all_checklists.md](feedback_trello_all_checklists.md) — Check Progress has MULTIPLE checklists, iterate ALL
- [feedback_trello_mail_must_check_email.md](feedback_trello_mail_must_check_email.md) — Trello mail MUST check emails first, not just toggle items
- [feedback_trello_progress_reuse_pieces.md](feedback_trello_progress_reuse_pieces.md) — Progress items must run mapped source piece
- [feedback_email_trello_completion.md](feedback_email_trello_completion.md) — Complete all 6 "Check mail" checklist items after email check

## Feedback — Task Logs & Sheets
- [feedback_google_sheets_per_employee.md](feedback_google_sheets_per_employee.md) — Filter by Owner column (G), not day total. TuanNT splits 3 projects.
- [feedback_tasklog_summary_sheet.md](feedback_tasklog_summary_sheet.md) — Use Summary sheet for weekly hours, not individual W-sheets
- [feedback_parttime_official_filter.md](feedback_parttime_official_filter.md) — Only "Task dự án" as official time, exclude "Part-time" rows
- [feedback_lenh_rebecca_sheet.md](feedback_lenh_rebecca_sheet.md) — LeNH has 4 sheets: Rory+Franc+Aysar+Rebecca, must check all 4
- [feedback_tasklog_skip_first_row.md](feedback_tasklog_skip_first_row.md) — Never use first empty row of a day
- [feedback_tasklog_reminder_matrix.md](feedback_tasklog_reminder_matrix.md) — Send Matrix reminder to devs with 0h task log
- [feedback_leave_day_no_report_needed.md](feedback_leave_day_no_report_needed.md) — "Nghỉ cả ngày" = leave day, not an alert

## Feedback — Fountain
- [feedback_fountain_kunal_checklist.md](feedback_fountain_kunal_checklist.md) — MANDATORY 5-part check: Matrix plan, actuals, plan vs actual, capacity, over-estimate
- [feedback_over_estimate_tracking.md](feedback_over_estimate_tracking.md) — Track if hours still growing week-over-week
- [feedback_hungpn_not_sole_qc.md](feedback_hungpn_not_sole_qc.md) — HungPN 0h not alert if other QC (PhatDLT) covers

## Feedback — Upwork
- [feedback_upwork_in_daily_report.md](feedback_upwork_in_daily_report.md) — Must be included in daily report
- [feedback_upwork_tasklog_by_taskid.md](feedback_upwork_tasklog_by_taskid.md) — Compare by specific task ID, not all rows by person
- [feedback_upwork_vs_tasklog_all_hours.md](feedback_upwork_vs_tasklog_all_hours.md) — Sum ALL hours (official + part-time) to match Upwork
- [feedback_upwork_match_not_alert.md](feedback_upwork_match_not_alert.md) — Upwork matching task log = OK, week-over-week drops are not alerts
- [feedback_neural_upwork.md](feedback_neural_upwork.md) — Neural Contract: MUST fetch messages via API intercept, not just timesheet hours

## Feedback — Monitoring Exceptions
- [feedback_kai_16h_no_daily_report.md](feedback_kai_16h_no_daily_report.md) — Kai 16h/wk, daily report in Xtreme not required
- [feedback_trinhmtt_not_qc.md](feedback_trinhmtt_not_qc.md) — TrinhMTT not QC, exclude from Fountain QC alerts
- [feedback_ggs_nick_daily_report.md](feedback_ggs_nick_daily_report.md) — GGS Nick daily report absence is not an alert

## Feedback — Project-Specific
- [feedback_elena_auto_deploy.md](feedback_elena_auto_deploy.md) — Elena PRs: auto review+merge+deploy without asking
- [feedback_github_account_mapping.md](feedback_github_account_mapping.md) — duongdn for Elena, nusken for Precognize
- [feedback_bailey_is_paturevision.md](feedback_bailey_is_paturevision.md) — Bailey DEV1+DEV3 hours in Paturevision spreadsheet
- [feedback_bailey_invoice_wbs_billing.md](feedback_bailey_invoice_wbs_billing.md) — Bailey invoices use WBS estimates, not task log actuals
- [feedback_longvv_hour_split.md](feedback_longvv_hour_split.md) — LongVV: 16h Maddy + 24h Xtreme
- [feedback_marcel_adhoc_project.md](feedback_marcel_adhoc_project.md) — Marcel is adhoc, 0h is expected
- [feedback_bailey_dev3_not_active.md](feedback_bailey_dev3_not_active.md) — Bailey DEV3/DuongDN inactive, 0h is expected
- [feedback_matrix_report_format.md](feedback_matrix_report_format.md) — James Diamond + Marcel Matrix message format

## Feedback — Report & Workflow
- [feedback_report_style.md](feedback_report_style.md) — Channel-level summaries, concise grammar, no trailing summaries
- [feedback_always_include_links.md](feedback_always_include_links.md) — Include clickable URLs for Trello cards, PRs, tickets
- [feedback_ondemand_updates.md](feedback_ondemand_updates.md) — On-demand = separate timestamped file, don't overwrite daily
- [feedback_monday_friday_timestamp.md](feedback_monday_friday_timestamp.md) — Monday daily report starts from last Friday 8AM
- [feedback_imap_slack_timestamp_gotchas.md](feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE uses server dates, Slack after: excludes named date
- [feedback_no_duplicate_sends.md](feedback_no_duplicate_sends.md) — Never re-send while background task is pending

## Feedback — Infrastructure & Safety
- [feedback_decrypt_before_reading.md](feedback_decrypt_before_reading.md) — Run decrypt-secrets.sh before reading config
- [feedback_ssh_passphrase_in_config.md](feedback_ssh_passphrase_in_config.md) — SSH passphrases in ~/.ssh/config comments (#passphase:)
- [feedback_storage_explain_and_alert.md](feedback_storage_explain_and_alert.md) — Storage >= 75%: investigate causes, recommend cleanup
- [feedback_no_cleanup_without_confirmation.md](feedback_no_cleanup_without_confirmation.md) — NEVER run server cleanup without user confirmation
- [feedback_no_vacuum_full_production.md](feedback_no_vacuum_full_production.md) — NEVER VACUUM FULL on production, use pg_repack
- [feedback_matrix_join_public_room.md](feedback_matrix_join_public_room.md) — Matrix M_FORBIDDEN = just POST /join
