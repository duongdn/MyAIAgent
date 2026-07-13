---
name: feedback_matrix_resource_arrangement_room
description: "Matrix room \"Delivery - Resource Arrangement\" is an authoritative same-day leave/absence source — must cross-check before flagging any dev's 0h as an alert"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 291ec938-3434-4d4e-a750-eb13b544adaa
---

Matrix room **"Delivery - Resource Arrangement"** is where namtv posts same-day/short-notice dev absences as they're processed, in the format:
`NEW | DevName | [Chiều = PM only, blank = full day] | DD/MM/YYYY | reason ==> Tính bên {Project} ko bù [do {context}]. Anh đã update note`

A separate person ("halt", HR/admin) periodically confirms: `Tất cả các nghỉ phép của Dev đã được xử lí, VÀ ĐÃ ĐƯỢC update note` (all leaves processed).

This room is **authoritative — equal weight to leave-plan.json / email leave requests** for that day's absence, even though `parse-leave-emails.js` never ingests it (it only scans email). The "Tính bên {Project} ko bù" wording means the missing hours are formally charged against that project's budget with no make-up expected — i.e. management has already excused it.

**Why:** On 2026-06-18, the daily-report recheck found namtv's note confirming LeNH's full-day sick leave (Jun 17, charged to Rory) in this exact room during the same Matrix scan used to write the report — but the report still wrote LeNH's 0h as "⚠️ Sick same-day... not yet in leave-plan.json", framing confirmed/processed leave as an open gap. User caught it: "why !!!". The same room also had TuanNT's PM-only leave note (charged to Bailey) which should have informed — though not fully cleared — the TuanNT 0h gate on John Yi/Bailey/Rebecca (PM excused, but AM hours were still genuinely unaccounted for, so the gate correctly stayed partially open, just needed correct framing).

**How to apply:**
1. Whenever a dev shows 0h on sheets with no leave-plan.json entry, **also check "Delivery - Resource Arrangement"** for that date before flagging as an unexplained alert.
2. If found with no time marker (full day) → treat exactly like `leave-plan.json` full-day leave: 0h OK, no reminder, no "gap" framing.
3. If found with "Chiều"/"Sáng" marker (half day) → pro-rate per [[feedback_leave_day_handling]]: only the marked half is excused, the other half's hours still need accounting for.
4. Cite the exact note (sender, project charged, timestamp) in the report instead of writing a generic "not yet in leave-plan.json" caveat — that phrasing implies the info doesn't exist, when it was sitting in the same Matrix scan.
5. This room scans automatically as part of the full joined-rooms Matrix fetch (no extra script needed) — the failure mode is forgetting to cross-reference it during the Sheets 0h analysis, not a missing data source.

**Confirmed 2026-07-02:** Cron's Matrix token expired (missed this room entirely that run), so TuanNT's 0h on John Yi/Bailey/Rebecca was flagged as a plain unexcused alert. Recheck refreshed the token, found TuanNT's note — this time **no time marker (full day)**, "Đang nằm viện" (hospitalized), charged to Bailey no makeup. Per rule #2 above, this fully cleared all 3 gated Trello items (John Yi, Bailey, Rebecca), unlike the 2026-06-18 half-day ("Chiều") precedent which only partially cleared. Also cross-checked KhanhHH's Workstream hours the same run — different root cause (cron WS login failure, not a leave note) but same lesson: a cron auth failure on ANY source (Matrix, Workstream) can manufacture a false "no leave / 0h" alert that a same-morning recheck should catch before reminders go out.

Related: [[project_leave_plan_system]], [[feedback_leave_day_handling]], [[feedback_check_workstream_before_flagging_shortfall]]
