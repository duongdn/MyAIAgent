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

## Reference
- [reference_upwork_workrooms.md](reference_upwork_workrooms.md) — Upwork workroom URLs, account credentials, and weekly report comparison setup
- [reference_matrix_rooms.md](reference_matrix_rooms.md) — Developer Matrix room IDs for task log reminders (LongVV, PhucVT, LeNH, Elena team)
