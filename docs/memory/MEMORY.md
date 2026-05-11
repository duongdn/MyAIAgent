# Memory Index

Categorized by the question you're trying to answer. Reorganized 2026-05-07.

## User
- [user_role.md](user_role.md) — PM at NUS Technology, oversees 10+ client projects, daily monitoring workflow

## Reference (Static Lookup)
- [reference_matrix_rooms.md](reference_matrix_rooms.md) — Developer Matrix room IDs for task log reminders
- [reference_upwork_workrooms.md](reference_upwork_workrooms.md) — Upwork workroom URLs, account credentials, weekly report comparison
- [project_monday_report_sheets.md](project_monday_report_sheets.md) — All 8 Monday report sheet IDs (Neural/LegalAtoms/Taraba DO have sheets)
- [project_maddy_new_tasklog.md](project_maddy_new_tasklog.md) — Maddy task log = sheet 1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I (since 2026-04-06)

## Project (Dynamic State)
- [project_daily_report_workflow.md](project_daily_report_workflow.md) — Full daily report workflow: data sources, Trello mappings, configs
- [project_alert_cron_setup.md](project_alert_cron_setup.md) — Alert cron: 30 min interval, env requirements, rate-limit detection
- [project_longvv_james_diamond.md](project_longvv_james_diamond.md) — LongVV works on Maddy + James Diamond from W23 (2026-04-20)
- [project_blake_socal_dropped.md](project_blake_socal_dropped.md) — Blake/SoCal Auto Wraps dropped from monitoring as of 2026-05-11

---

## Workflow & Reporting Style
- [feedback_report_style.md](feedback_report_style.md) — Channel-level summaries, concise grammar, no trailing summaries
- [feedback_always_include_links.md](feedback_always_include_links.md) — Include clickable URLs for Trello cards, PRs, tickets
- [feedback_ondemand_updates.md](feedback_ondemand_updates.md) — On-demand = separate timestamped file, don't overwrite daily
- [feedback_monday_friday_timestamp.md](feedback_monday_friday_timestamp.md) — Monday daily report starts from last Friday 8AM
- [feedback_imap_slack_timestamp_gotchas.md](feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE uses server dates, Slack `after:` excludes named date
- [feedback_no_duplicate_sends.md](feedback_no_duplicate_sends.md) — Never re-send while background task is pending
- [feedback_timeline_system.md](feedback_timeline_system.md) — Three timelines (daily_report/refresh/alert), MUST update at end of EVERY run

## Alert Classification (when to flag)
- [feedback_alert_classification.md](feedback_alert_classification.md) — Only our issues, checklist text is notes not alerts, staging=INFO, "Chưa"=normal
- [feedback_alert_means_no_complete.md](feedback_alert_means_no_complete.md) — Alert found = do NOT complete Trello item
- [feedback_missing_daily_report_is_alert.md](feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert
- [feedback_project_topics_not_alerts.md](feedback_project_topics_not_alerts.md) — Slack dev discussions ≠ alerts, don't block Trello
- [feedback_csp_violations_are_real_errors.md](feedback_csp_violations_are_real_errors.md) — samguard.co CSP violations are real errors
- [feedback_blake_rollbar_not_person_alert.md](feedback_blake_rollbar_not_person_alert.md) — Client website Rollbar errors don't block Blake/per-client Trello items

## Tokens, Auth & Decryption
- [feedback_decrypt_before_reading.md](feedback_decrypt_before_reading.md) — Run decrypt-secrets.sh before reading config
- [feedback_token_handling.md](feedback_token_handling.md) — Fix tokens silently, verify before flagging, xoxc needs Cookie header
- [feedback_matrix_token_never_report_expired.md](feedback_matrix_token_never_report_expired.md) — Never write "Matrix token expired" without running matrix-token-refresh.js first
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

## Slack & Discord Sources
- [feedback_slack_threads.md](feedback_slack_threads.md) — MUST use search.messages API (conversations.history misses thread replies)
- [feedback_discord_only_airagri_bizurk.md](feedback_discord_only_airagri_bizurk.md) — Discord: only AirAgri + Bizurk, NOT HOMIEAPP
- [feedback_vinn_daily_report_format.md](feedback_vinn_daily_report_format.md) — Vinn's AirAgri daily report opens with "Just report my process today:"
- [feedback_andrew_taraba_animworld_dm.md](feedback_andrew_taraba_animworld_dm.md) — Andrew Taraba: check nuscarrick DM with "animeworld", not Bizurk channels
- [feedback_andrew_taraba_low_activity.md](feedback_andrew_taraba_low_activity.md) — Bizurk silence is normal, not an alert
- [feedback_ggs_nick_daily_report.md](feedback_ggs_nick_daily_report.md) — GGS Nick daily report absence is not an alert

---

## Sheets & Task Logs (general rules)
- [feedback_dev_project_mapping_flexible.md](feedback_dev_project_mapping_flexible.md) — **Devs no longer have static project assignments — scan ALL sheets, aggregate by Owner col G**
- [feedback_google_sheets_per_employee.md](feedback_google_sheets_per_employee.md) — Filter by Owner col G, not day total. TuanNT splits across projects
- [feedback_tasklog_summary_sheet.md](feedback_tasklog_summary_sheet.md) — Use Summary sheet for weekly hours, not individual W-sheets
- [feedback_parttime_official_filter.md](feedback_parttime_official_filter.md) — Only "Task dự án" as official, exclude "Part-time" rows
- [feedback_tasklog_skip_first_row.md](feedback_tasklog_skip_first_row.md) — Never use first empty row of a day (Paturevision write)
- [feedback_tasklog_reminder_matrix.md](feedback_tasklog_reminder_matrix.md) — Send Matrix reminder to devs with 0h task log (workday, no leave)
- [feedback_leave_day_no_report_needed.md](feedback_leave_day_no_report_needed.md) — "Nghỉ cả ngày" = leave day, not an alert
- [feedback_sheets_subagent_unreliable.md](feedback_sheets_subagent_unreliable.md) — Verify suspicious 0h findings directly; subagent has missed entries

## Per-Developer Rules
### LongVV
- [feedback_longvv_hour_split.md](feedback_longvv_hour_split.md) — 16h Maddy + 24h Xtreme/other; new template since 2026-04-06
- [feedback_longvv_not_rebecca.md](feedback_longvv_not_rebecca.md) — LongVV sheets = Maddy + James Diamond ONLY (NOT Rebecca)
- [feedback_longvv_direct_matrix.md](feedback_longvv_direct_matrix.md) — LongVV reminders → `!mYZBGNoLFVpMVIJtPu` (direct), NOT Maddy Xtreme room
- [feedback_longvv_partial_week_may.md](feedback_longvv_partial_week_may.md) — **W25 ONLY (expires 2026-05-10):** sub-8h is expected, no alert
### LeNH
- [feedback_lenh_rebecca_sheet.md](feedback_lenh_rebecca_sheet.md) — LeNH has 4 sheets: Rory+Franc+Aysar+Rebecca (Q-T cols)
- [feedback_lenh_per_sheet_not_alert.md](feedback_lenh_per_sheet_not_alert.md) — 0h in one sheet ≠ alert if working another that day
- [feedback_lenh_partial_hour_alert.md](feedback_lenh_partial_hour_alert.md) — Any <8h shortfall (even 0.17h) without leave = alert + reminder
### KhanhHH
- [feedback_khanhhh_aysar_second_project.md](feedback_khanhhh_aysar_second_project.md) — KhanhHH 2nd project = Aysar; Aysar uses non-calendar W; Upwork billed under LeNH (sub-contract)
- [feedback_khanhhh_multi_project.md](feedback_khanhhh_multi_project.md) — Multi-project rule (resolved → Aysar)
### Other devs
- [feedback_marcel_adhoc_project.md](feedback_marcel_adhoc_project.md) — Marcel adhoc, 0h is expected
- [feedback_kai_16h_no_daily_report.md](feedback_kai_16h_no_daily_report.md) — Kai 16h/wk, daily report in Xtreme not required
- [feedback_bailey_dev3_not_active.md](feedback_bailey_dev3_not_active.md) — Bailey DEV3/DuongDN inactive, 0h is expected

---

## Upwork & Time Tracking
- [feedback_upwork_in_daily_report.md](feedback_upwork_in_daily_report.md) — Must be included in daily report
- [feedback_upwork_tasklog_by_taskid.md](feedback_upwork_tasklog_by_taskid.md) — Compare by specific task ID, not all rows by person
- [feedback_upwork_vs_tasklog_all_hours.md](feedback_upwork_vs_tasklog_all_hours.md) — Sum ALL hours (official + part-time) to match Upwork
- [feedback_upwork_match_not_alert.md](feedback_upwork_match_not_alert.md) — Upwork matching task log = OK; week-over-week drops are not alerts
- [feedback_neural_upwork.md](feedback_neural_upwork.md) — Neural Contract: MUST fetch messages via API intercept
- [feedback_neural_silence_not_alert.md](feedback_neural_silence_not_alert.md) — Neural Contract long silence ≠ alert; only urgent unanswered client msgs block Trello

---

## Fountain
- [feedback_fountain_kunal_checklist.md](feedback_fountain_kunal_checklist.md) — MANDATORY 5-part check
- [feedback_fountain_cr_column.md](feedback_fountain_cr_column.md) — **CRITICAL:** Col J = CR; total estimate = I + J (capacity AND over-est)
- [feedback_over_estimate_tracking.md](feedback_over_estimate_tracking.md) — Track if hours still growing week-over-week
- [feedback_hungpn_not_sole_qc.md](feedback_hungpn_not_sole_qc.md) — HungPN 0h not alert if other QC (PhatDLT) covers
- [feedback_trinhmtt_not_qc.md](feedback_trinhmtt_not_qc.md) — TrinhMTT not QC, exclude from Fountain QC alerts
- [feedback_vutq_small_plan_normal.md](feedback_vutq_small_plan_normal.md) — VuTQ small W{n} plan: once weekly total met, subsequent 0h days are normal
- [feedback_fountain_dev_0h_no_speculation.md](feedback_fountain_dev_0h_no_speculation.md) — Don't speculate on individual Fountain dev 0h days as unresolved questions

---

## Per-Project Rules
### Elena / SamGuard
- [feedback_elena_auto_deploy.md](feedback_elena_auto_deploy.md) — Auto review+merge+deploy without asking
### Bailey / Paturevision
- [feedback_bailey_is_paturevision.md](feedback_bailey_is_paturevision.md) — Bailey DEV1+DEV3 hours in Paturevision spreadsheet (not Marcel)
- [feedback_bailey_invoice_wbs_billing.md](feedback_bailey_invoice_wbs_billing.md) — Bailey invoices use WBS estimates (not task log actuals)
### Aysar / Baamboozle
- [feedback_aysar_github_issues.md](feedback_aysar_github_issues.md) — Also check baamboozle/baamboozle-web-app + bbzl-web-client open issues (carrick token)
### Other
- [feedback_matrix_report_format.md](feedback_matrix_report_format.md) — James Diamond + Marcel weekly Matrix message format

---

## Safety & Infrastructure
- [feedback_no_cleanup_without_confirmation.md](feedback_no_cleanup_without_confirmation.md) — NEVER run server cleanup without user confirmation
- [feedback_no_vacuum_full_production.md](feedback_no_vacuum_full_production.md) — NEVER VACUUM FULL on production, use pg_repack
- [feedback_storage_explain_and_alert.md](feedback_storage_explain_and_alert.md) — Storage >= 75%: investigate causes, recommend cleanup
