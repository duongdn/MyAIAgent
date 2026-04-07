# Memory Index

## Feedback
- [feedback_workflow_update_rule.md](feedback_workflow_update_rule.md) — Always update workflow docs (not just memory) with any feedback; docs are portable across machines
- [feedback_no_duplicate_sends.md](feedback_no_duplicate_sends.md) — Never send to external services (Matrix, Slack, etc.) while a background task doing the same send is still pending
- [feedback_sheets_summary_tab.md](feedback_sheets_summary_tab.md) — Use Summary tab to find correct W{n} and per-employee totals in NUS task log sheets
- [feedback_matrix_report_format.md](feedback_matrix_report_format.md) — James Diamond + Marcel Matrix message format: charge/actual, no `-` prefix, AnhNH2 has no fixed plan, include paid leave annotation
- [feedback_parttime_official_filter.md](feedback_parttime_official_filter.md) — Only count "Task dự án" rows as official time, exclude "Part-time" rows in column A
- [feedback_monday_friday_timestamp.md](feedback_monday_friday_timestamp.md) — On Monday, daily report period starts from last Friday 8AM
- [feedback_marcel_adhoc_project.md](feedback_marcel_adhoc_project.md) — Marcel is adhoc project, 0h on any day is expected
- [feedback_alert_means_no_complete.md](feedback_alert_means_no_complete.md) — Alert found (including failed daily reports) = do NOT complete Trello item
- [feedback_checklist_person_link.md](feedback_checklist_person_link.md) — Trello checklist items name the responsible person; their daily report status gates completion
- [feedback_only_our_issues.md](feedback_only_our_issues.md) — Only flag issues caused by our team, client-side prod errors are INFO not alerts
- [feedback_checklist_notes_not_alerts.md](feedback_checklist_notes_not_alerts.md) — Checklist item notes/text are user's personal reminders, NOT alerts — only monitoring data determines completion
- [feedback_chua_is_normal.md](feedback_chua_is_normal.md) — "Chưa" in task log col P is normal default state, not an alert
- [feedback_update_all_related_sections.md](feedback_update_all_related_sections.md) — When info changes, update ALL related sections in the report in one pass, not just the one being discussed
- [feedback_staging_errors_not_alert.md](feedback_staging_errors_not_alert.md) — Staging environment errors (BugSnag, Rollbar) are INFO, not blocking alerts — only production matters
- [feedback_upwork_vs_tasklog_all_hours.md](feedback_upwork_vs_tasklog_all_hours.md) — Upwork comparison: sum ALL hours (official + part-time) to match Upwork tracked time

- [feedback_ignore_checklist_item_name.md](feedback_ignore_checklist_item_name.md) — Never interpret checklist item text as status — completion based only on alerts found
- [feedback_discord_token_validation.md](feedback_discord_token_validation.md) — MUST verify Discord tokens with 3-step curl check before reporting expired — recurring false alarm
- [feedback_timeline_update_critical.md](feedback_timeline_update_critical.md) — CRITICAL: MUST update .monitoring-timelines.json at end of EVERY run
- [feedback_upwork_in_daily_report.md](feedback_upwork_in_daily_report.md) — Upwork monitoring must be included in daily report — 5 workrooms, 3 accounts
- [feedback_matrix_join_public_room.md](feedback_matrix_join_public_room.md) — Matrix "not in room" = just POST /join, no permission/invite needed
- [feedback_project_topics_not_alerts.md](feedback_project_topics_not_alerts.md) — Slack dev discussions are NOT monitoring alerts — don't block Trello checklist for project bugs

- [feedback_dual_memory_system.md](feedback_dual_memory_system.md) — ALWAYS save to BOTH Claude memory AND docs/memory/ in project
- [feedback_discord_only_airagri_bizurk.md](feedback_discord_only_airagri_bizurk.md) — Discord: only AirAgri + Bizurk, NOT HOMIEAPP
- [feedback_fountain_always_5part.md](feedback_fountain_always_5part.md) — CRITICAL: Fountain 5-part check keeps getting missed, MUST validate all parts before finalizing report
- [feedback_tasklog_skip_first_row.md](feedback_tasklog_skip_first_row.md) — Task log: never use first empty row of a day, write to second row or later
- [feedback_trello_all_checklists.md](feedback_trello_all_checklists.md) — Trello Check Progress has MULTIPLE checklists, must iterate ALL not just known ones
- [feedback_trello_mail_must_check_email.md](feedback_trello_mail_must_check_email.md) — /daily-report trello mail MUST check emails first, not just toggle Trello items
- [feedback_csp_violations_are_real_errors.md](feedback_csp_violations_are_real_errors.md) — samguard.co CSP violations are real errors needing CSP config update, not INFO
- [feedback_missing_daily_report_is_alert.md](feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert, do NOT complete Trello item
- [feedback_trello_progress_reuse_pieces.md](feedback_trello_progress_reuse_pieces.md) — Trello progress items must run mapped source piece, not duplicate logic
- [feedback_leave_day_no_report_needed.md](feedback_leave_day_no_report_needed.md) — "Nghỉ cả ngày" in column A = leave day, no daily report needed, not an alert
- [feedback_fix_tokens_dont_report.md](feedback_fix_tokens_dont_report.md) — Never report "token expired" — fix it silently. Matrix: use browser profile script. Slack: use auto-refresh flow.
- [feedback_matrix_browser_profile.md](feedback_matrix_browser_profile.md) — Matrix OIDC refresh expired → use scripts/matrix-token-refresh.js + tmp/matrix-browser-profile/ (headless SSO, works automatically)

- [feedback_ripgrep_execute_permission.md](feedback_ripgrep_execute_permission.md) — Claude Code rg binary loses execute bit after npm update → all skills vanish with "Unknown skill"; fix with chmod +x
- [feedback_andrew_taraba_animworld_dm.md](feedback_andrew_taraba_animworld_dm.md) — Andrew Taraba check: use nuscarrick DM with "animeworld" user, NOT Bizurk server channels
- [feedback_neural_upwork.md](feedback_neural_upwork.md) — Neural Contract check = Upwork workroom 38901192, NOT "no mapped source"

## Reference
- [reference_upwork_workrooms.md](reference_upwork_workrooms.md) — Upwork workroom URLs, account credentials, and weekly report comparison setup
- [reference_matrix_rooms.md](reference_matrix_rooms.md) — Developer Matrix room IDs for task log reminders (LongVV, PhucVT, LeNH, Elena team)
- [feedback_decrypt_before_reading.md](feedback_decrypt_before_reading.md) — Always run decrypt-secrets.sh before reading config — .enc files may be newer than .json files
- [feedback_ssh_passphrase_in_config.md](feedback_ssh_passphrase_in_config.md) — SSH passphrases stored as #passphase: comments in ~/.ssh/config above Host entry
- [feedback_storage_explain_and_alert.md](feedback_storage_explain_and_alert.md) — Storage >= 75%: investigate WHY (du breakdown), explain causes, recommend cleanup actions
- [feedback_no_cleanup_without_confirmation.md](feedback_no_cleanup_without_confirmation.md) — NEVER run server cleanup/destructive commands without explicit user confirmation

- [feedback_longvv_hour_split.md](feedback_longvv_hour_split.md) — LongVV splits 16h Maddy + 24h Xtreme; Xtreme sheet issues are client-side

## Project
- [project_maddy_new_tasklog.md](project_maddy_new_tasklog.md) — Maddy task log changed to sheet 1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I as of 2026-04-06
