# Memory Index

Categorized by the question you're trying to answer. Reorganized 2026-05-23.

---

## 🔴 CRITICAL — READ FIRST (rules that have failed multiple times)

Skim these every single run. If your output contradicts any of them, you have a bug.

- [reference_trello_gate_mapping.md](reference_trello_gate_mapping.md) — **Exact gate sources per Check Progress item. Check this before completing OR skipping any item.**
- [feedback_leave_day_handling.md](feedback_leave_day_handling.md) — **"Nghỉ cả ngày" / "Nghỉ nửa ngày" → pro-rate weekly target before computing shortfall.** Never write `actual vs full_target` when any leave day exists in the week.
- [feedback_summary_sheet_no_double_count.md](feedback_summary_sheet_no_double_count.md) — Summary col D is **already** the grand total; never also sum per-employee Actual cols (caused 2× bug 2026-05-11).
- [feedback_dev_project_mapping_flexible.md](feedback_dev_project_mapping_flexible.md) — Devs no longer have static project assignments — **scan ALL sheets, aggregate by Owner col G**.
- [feedback_sheets_subagent_unreliable.md](feedback_sheets_subagent_unreliable.md) — Verify suspicious 0h findings directly before flagging / reminding.
- [feedback_subagent_no_unauthorized_writes.md](feedback_subagent_no_unauthorized_writes.md) — Subagents must NEVER submit forms / tick Trello / send msgs / push code beyond explicit scope.
- [feedback_matrix_token_never_report_expired.md](feedback_matrix_token_never_report_expired.md) — Run `scripts/matrix-token-refresh.js` BEFORE claiming Matrix token expired.
- [feedback_token_handling.md](feedback_token_handling.md) — **⚠️ MUST READ BEFORE SLACK SCAN** — Amazing Meds + Equanimity xoxc: run refresh scripts PROACTIVELY before scanning, NEVER report invalid_auth. Scripts: slack-xoxc-refresh-amazingmeds.js / slack-xoxc-refresh-equanimity.js
- [feedback_timeline_system.md](feedback_timeline_system.md) — MUST update `.monitoring-timelines.json` at end of EVERY run; verify by re-reading.
- [feedback_fountain_cr_column.md](feedback_fountain_cr_column.md) — Fountain total estimate = Col I **+** Col J (CR). Both capacity AND over-estimate use the sum.
- [feedback_fountain_kunal_checklist.md](feedback_fountain_kunal_checklist.md) — Fountain 5-part check is MANDATORY every run; never skip any part.
- [feedback_report_location.md](feedback_report_location.md) — Reports go in `reports/{YYYY-MM-DD}/...`, **NOT** `plans/reports/`.

---

## User
- [user_role.md](user_role.md) — PM at NUS Technology, oversees 10+ client projects, daily monitoring workflow

## Reference (Static Lookup)
- [reference_workstream.md](reference_workstream.md) — **Workstream (workstream.nustechnology.com)** — Maddy=Xtreme Soft Solutions, Rebecca=MissSwimwear. Scripts: workstream-login.js, workstream-fetch-project-week.js
- [reference_matrix_rooms.md](reference_matrix_rooms.md) — Developer Matrix room IDs for task log reminders
- [reference_upwork_workrooms.md](reference_upwork_workrooms.md) — Upwork workroom URLs, account credentials, weekly report comparison
- [reference_mpfc_github.md](reference_mpfc_github.md) — MPFC GitHub repo is mypersonalfootballcoach/wp (not nustechnology/...)
- [project_monday_report_sheets.md](project_monday_report_sheets.md) — All 8 Monday report sheet IDs (Neural/LegalAtoms/Taraba DO have sheets)
- [project_maddy_new_tasklog.md](project_maddy_new_tasklog.md) — Maddy task log = sheet 1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I (since 2026-04-06)

## Project (Dynamic State)
- [project_timezone_utc7.md](project_timezone_utc7.md) — All time references use UTC+7 (Vietnam/ICT); convert by subtracting 7h for cron/UTC
- [project_daily_report_workflow.md](project_daily_report_workflow.md) — Full daily report workflow: data sources, Trello mappings, configs
- [project_alert_cron_setup.md](project_alert_cron_setup.md) — Alert cron: 30 min interval, env requirements, rate-limit detection
- [project_longvv_james_diamond.md](project_longvv_james_diamond.md) — LongVV works on Maddy + James Diamond from W23 (2026-04-20)
- [project_blake_socal_dropped.md](project_blake_socal_dropped.md) — Blake/SoCal Auto Wraps dropped from monitoring as of 2026-05-11
- [project_vutq_moved_to_bailey.md](project_vutq_moved_to_bailey.md) — VuTQ moved to Bailey (Paturevision) as of 2026-05-13; 0h in Fountain is expected
- [project_tuannt_25h_excused_jun5.md](project_tuannt_25h_excused_jun5.md) — TuanNT had 2.5h excused time Fri 2026-06-05 (user-confirmed) — explains 0h, John Yi/Bailey/Rebecca completed on this basis (one-off, don't generalize)
- [project_php_team.md](project_php_team.md) — PHP team: LongVV, PhucVT, TuanNT, KhanhHH, LeNH, VietPH

---

## News Digest
- [feedback_news_digest_new_topic.md](feedback_news_digest_new_topic.md) — Unknown topic → add as new topic with own RSS sources in fetch-news.py, never alias existing topics
- [feedback_news_digest_use_actual_links.md](feedback_news_digest_use_actual_links.md) — **ALWAYS use `link` field from fetched JSON, NEVER fabricate/guess article URLs. fetch-news.py resolves relative URLs automatically (fixed 2026-05-29)**

## Workflow & Reporting Style
- [feedback_report_style.md](feedback_report_style.md) — Channel-level summaries, concise grammar, no trailing summaries
- [feedback_customer_facing_messages.md](feedback_customer_facing_messages.md) — NEVER expose internal tool/auth failures in customer Slack channels
- [feedback_always_include_links.md](feedback_always_include_links.md) — Include clickable URLs for Trello cards, PRs, tickets
- [feedback_ondemand_updates.md](feedback_ondemand_updates.md) — On-demand = separate timestamped file, don't overwrite daily
- [feedback_monday_friday_timestamp.md](feedback_monday_friday_timestamp.md) — Monday daily report starts from last Friday 8AM
- [feedback_imap_slack_timestamp_gotchas.md](feedback_imap_slack_timestamp_gotchas.md) — IMAP SINCE uses server dates, Slack `after:` excludes named date
- [feedback_no_duplicate_sends.md](feedback_no_duplicate_sends.md) — Never re-send while background task is pending

## Alert Classification (when to flag)
- [feedback_alert_classification.md](feedback_alert_classification.md) — Only our issues, checklist text is notes not alerts, staging=INFO, "Chưa"=normal
- [feedback_rebecca_chua_not_trello_block.md](feedback_rebecca_chua_not_trello_block.md) — "Chưa" in Rebecca col P NEVER blocks Trello completion — it's default template state
- [feedback_alert_means_no_complete.md](feedback_alert_means_no_complete.md) — Alert found = do NOT complete Trello item
- [feedback_missing_daily_report_is_alert.md](feedback_missing_daily_report_is_alert.md) — Missing daily report = critical alert (unless leave day — see leave_day_handling)
- [feedback_project_topics_not_alerts.md](feedback_project_topics_not_alerts.md) — Slack dev discussions ≠ alerts, don't block Trello
- [feedback_csp_violations_are_real_errors.md](feedback_csp_violations_are_real_errors.md) — samguard.co CSP violations are real errors
- [feedback_blake_rollbar_not_person_alert.md](feedback_blake_rollbar_not_person_alert.md) — Client website Rollbar errors don't block Blake/per-client Trello items

## Scrin.io
- [feedback_scrin_isyesterday_monday_bug.md](feedback_scrin_isyesterday_monday_bug.md) — scrin-fetch-yesterday.js on Mon returns SUNDAY, not Friday. Never label its output as Friday Scrin data.

## Tokens, Auth & Decryption
- [feedback_matrix_refresh_headless_bug.md](feedback_matrix_refresh_headless_bug.md) — **matrix-token-refresh.js must be headless:false on DISPLAY:1. Was headless:'new' — fixed 2026-06-03. When fails: `DISPLAY=:1 node scripts/matrix-login.js`**
- [feedback_decrypt_before_reading.md](feedback_decrypt_before_reading.md) — Run decrypt-secrets.sh before reading config
- [feedback_never_report_token_expired.md](feedback_never_report_token_expired.md) — NEVER report token expired as blocker — always fix/rerun, never skip a piece for token failure
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
- [feedback_vinn_daily_report_format.md](feedback_vinn_daily_report_format.md) — Vinn's AirAgri daily report opens with "Just report my process today:" — date window: check N-1 report, not same-day
- [feedback_philip_msteams_must_run.md](feedback_philip_msteams_must_run.md) — Philip MS Teams: run with FULL NAME query "Philip Briggs" (plain "Philip" = 113 ambiguous matches); config+login now verified working
- [feedback_philip_msteams_config_missing.md](feedback_philip_msteams_config_missing.md) — **RESOLVED 2026-06-06:** `.msteams-accounts.json` created+encrypted, script verified working — blocker gone
- [feedback_msteams_url_substring_bug_fixed.md](feedback_msteams_url_substring_bug_fixed.md) — MS Teams script `url.includes()` falsely matched OAuth redirect_uri params, exited login loop pre-password; fixed via exact-hostname `isTeamsHost()`
- [feedback_scrin_company_not_john_yi.md](feedback_scrin_company_not_john_yi.md) — Scrin.io company 266977 is NOT John Yi — never label TuanNT Scrin hours as "John Yi effort"
- [feedback_andrew_taraba_animworld_dm.md](feedback_andrew_taraba_animworld_dm.md) — Andrew Taraba: check nuscarrick DM with "animeworld", not Bizurk channels
- [feedback_andrew_taraba_low_activity.md](feedback_andrew_taraba_low_activity.md) — Bizurk silence is normal, not an alert
- [feedback_ggs_nick_daily_report.md](feedback_ggs_nick_daily_report.md) — GGS Nick daily report absence is not an alert

---

## Sheets & Task Logs (general rules)
- [feedback_sheets_wrong_tab_numbering.md](feedback_sheets_wrong_tab_numbering.md) — **🔴 CRITICAL: Tab W{n} ≠ calendar week n. ALWAYS use Summary tab (col A=week, col B=start date) to find correct tab — NEVER scan individual tabs or hardcode.**
- [feedback_tasklog_0h_reminder_complete.md](feedback_tasklog_0h_reminder_complete.md) — **0h task log + reminder sent = COMPLETE Trello item. Reminder IS the action, nothing more to do.**
- [feedback_no_activity_not_skip.md](feedback_no_activity_not_skip.md) — **"No Slack activity" is NOT a skip reason. Quiet = OK → COMPLETE. Only skip on specific positive alerts.**
- [feedback_google_sheets_per_employee.md](feedback_google_sheets_per_employee.md) — Filter by Owner col G, not day total. TuanNT splits across projects
- [feedback_tasklog_summary_sheet.md](feedback_tasklog_summary_sheet.md) — Use Summary sheet for weekly hours, not individual W-sheets
- [feedback_parttime_official_filter.md](feedback_parttime_official_filter.md) — Only "Task dự án" as official, exclude "Part-time" rows
- [feedback_tasklog_skip_first_row.md](feedback_tasklog_skip_first_row.md) — Never use first empty row of a day (Paturevision write)
- [feedback_tasklog_reminder_matrix.md](feedback_tasklog_reminder_matrix.md) — Send Matrix reminder to devs with 0h task log (workday, no leave)

## Per-Developer Rules
### LongVV
- [feedback_longvv_hour_split.md](feedback_longvv_hour_split.md) — **Part-time (16h/wk Maddy)**; 0h/day is NOT an alert — check weekly total only
- [feedback_longvv_not_rebecca.md](feedback_longvv_not_rebecca.md) — LongVV sheets = Maddy + James Diamond ONLY (NOT Rebecca)
- [feedback_longvv_direct_matrix.md](feedback_longvv_direct_matrix.md) — LongVV reminders → `!mYZBGNoLFVpMVIJtPu` (direct), NOT Maddy Xtreme room
### TuanNT
- [feedback_tuannt_trello_gates.md](feedback_tuannt_trello_gates.md) — TuanNT COMBINED 0h (all 3 sheets) blocks John Yi + Rebecca + Bailey. Working any one sheet = no alert.
### LeNH
- [feedback_lenh_rebecca_sheet.md](feedback_lenh_rebecca_sheet.md) — LeNH has 4 sheets: Rory+Franc+Aysar+Rebecca (Q-T cols)
- [feedback_lenh_per_sheet_not_alert.md](feedback_lenh_per_sheet_not_alert.md) — 0h in one sheet ≠ alert if working another that day (same rule applies to TuanNT)
- [feedback_lenh_partial_hour_alert.md](feedback_lenh_partial_hour_alert.md) — Any <adjusted_target shortfall (even 0.17h) without leave = alert + reminder
### KhanhHH
- [feedback_khanhhh_aysar_second_project.md](feedback_khanhhh_aysar_second_project.md) — KhanhHH 2nd project = Aysar; Aysar uses non-calendar W; Upwork billed under LeNH (sub-contract)
- [feedback_khanhhh_multi_project.md](feedback_khanhhh_multi_project.md) — Multi-project rule (resolved → Aysar)
### TuanNT
- [feedback_tuannt_trello_gates.md](feedback_tuannt_trello_gates.md) — TuanNT 0h gates John Yi, Rebecca, AND Bailey Trello items simultaneously
### Other devs
- [feedback_marcel_adhoc_project.md](feedback_marcel_adhoc_project.md) — Marcel adhoc, 0h is expected
- [feedback_kai_16h_no_daily_report.md](feedback_kai_16h_no_daily_report.md) — Kai 16h/wk, daily report in Xtreme not required
- [feedback_bailey_dev3_not_active.md](feedback_bailey_dev3_not_active.md) — Bailey DEV3/DuongDN inactive, 0h is expected

---

## Upwork & Time Tracking
- [feedback_upwork_in_daily_report.md](feedback_upwork_in_daily_report.md) — Must be included in daily report
- [feedback_upwork_tasklog_by_taskid.md](feedback_upwork_tasklog_by_taskid.md) — Compare by specific task ID, not all rows by person
- [feedback_upwork_filter_by_task_id_strict.md](feedback_upwork_filter_by_task_id_strict.md) — Paturevision col E = Task ID; Bailey contract = "[Maintenance] Update PHP version on Prestashop"; VietPH 21.25h matched Upwork 21.50h once filtered
- [feedback_upwork_tracker_shared_users.md](feedback_upwork_tracker_shared_users.md) — Trackers shared across users; sum ALL Owners on contract Task ID. Aysar=KhanhHH+LeNH, Rory=LeNH only
- [feedback_upwork_vs_tasklog_all_hours.md](feedback_upwork_vs_tasklog_all_hours.md) — Sum ALL hours (official + part-time) to match Upwork
- [feedback_upwork_match_not_alert.md](feedback_upwork_match_not_alert.md) — Upwork matching task log = OK; week-over-week drops are not alerts
- [feedback_neural_upwork.md](feedback_neural_upwork.md) — Neural Contract: MUST fetch messages via API intercept
- [feedback_neural_silence_not_alert.md](feedback_neural_silence_not_alert.md) — Neural silence / Cloudflare block / auth failure = NEVER an alert. Complete Trello unless urgent unread client msg.
- [feedback_trello_per_client_gates_on_lead_dev.md](feedback_trello_per_client_gates_on_lead_dev.md) — Per-client item gates on lead dev (Nick for John Yi, Elliott for Generator); supporting-dev issues go in report not Trello

---

## Fountain
- [feedback_over_estimate_tracking.md](feedback_over_estimate_tracking.md) — Track if hours still growing week-over-week
- [feedback_hungpn_not_sole_qc.md](feedback_hungpn_not_sole_qc.md) — HungPN 0h not alert if other QC (PhatDLT) covers
- [feedback_trinhmtt_not_qc.md](feedback_trinhmtt_not_qc.md) — TrinhMTT not QC, exclude from Fountain QC alerts
- [feedback_vutq_small_plan_normal.md](feedback_vutq_small_plan_normal.md) — VuTQ small W{n} plan: once weekly total met, subsequent 0h days are normal
- [feedback_fountain_dev_0h_no_speculation.md](feedback_fountain_dev_0h_no_speculation.md) — Don't speculate on individual Fountain dev 0h days as unresolved questions
- [feedback_fountain_hasv_not_on_plan.md](feedback_fountain_hasv_not_on_plan.md) — HaVS not always on Fountain plan; only flag 0h if named in that week's Matrix plan
- [feedback_fountain_monday_plan_timing.md](feedback_fountain_monday_plan_timing.md) — @trinhmtt posts W{n} plan Mon 08:30-09:30 +07. Wait until 09:30 before flagging "plan absent".

---

## Per-Project Rules
### Elena / SamGuard
- [feedback_elena_auto_deploy.md](feedback_elena_auto_deploy.md) — Auto review+merge+deploy without asking
- [feedback_elena_check_pending_actions_first.md](feedback_elena_check_pending_actions_first.md) — **MUST check `.elena-pending-actions.json` for `deployed:false` BEFORE checking GitHub PRs — missed deploys won't appear as open PRs**
### Bailey / Paturevision
- [feedback_bailey_is_paturevision.md](feedback_bailey_is_paturevision.md) — Bailey DEV1+DEV3 hours in Paturevision spreadsheet (not Marcel)
- [feedback_bailey_invoice_wbs_billing.md](feedback_bailey_invoice_wbs_billing.md) — Bailey invoices use WBS estimates (not task log actuals)
### Aysar / Baamboozle
- [feedback_aysar_github_issues.md](feedback_aysar_github_issues.md) — Also check baamboozle/baamboozle-web-app + bbzl-web-client open issues (carrick token)
- [feedback_aysar_jamie_ronan_room.md](feedback_aysar_jamie_ronan_room.md) — **CORRECTED** Aysar report = Baamboozle Slack MPDM C07SQ4HAUHZ (Carrick→Ronan/Jamie). Matrix `!gjtiuNjeqDarGWkSnf` = send reminders only, not for checking.
- [feedback_aysar_daily_report_slack.md](feedback_aysar_daily_report_slack.md) — General rule: check Slack for daily reports, send Matrix reminder only if missing.
### Other
- [feedback_matrix_report_format.md](feedback_matrix_report_format.md) — James Diamond + Marcel weekly Matrix message format

---

## Safety & Infrastructure
- [feedback_no_cleanup_without_confirmation.md](feedback_no_cleanup_without_confirmation.md) — NEVER run server cleanup without user confirmation
- [feedback_no_vacuum_full_production.md](feedback_no_vacuum_full_production.md) — NEVER VACUUM FULL on production, use pg_repack
- [feedback_storage_explain_and_alert.md](feedback_storage_explain_and_alert.md) — Storage >= 75%: investigate causes, recommend cleanup

## Dev Environment
- [feedback_ripgrep_execute_permission.md](feedback_ripgrep_execute_permission.md) — After Claude Code npm update: `chmod +x` the bundled rg binary — npm strips execute bit on macOS, causing all skills to vanish
