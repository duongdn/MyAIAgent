---
name: feedback_james_diamond_skill_table_stale_use_lenh_not_phucvt
description: "James Diamond Trello gate is LeNH (full-time since 2026-08-21), NOT PhucVT — the daily-report skill's own gate-mapping table still says 'sheets phucvt' and is stale; follow the memory correction over the skill table"
metadata:
  type: feedback
---

🔴 **3rd recurrence of this exact mistake (2026-09-09).** [[feedback_lenh_james_diamond_blair_brown_deprioritized]] already documents that LeNH moved to James Diamond full-time on 2026-08-21 — but the `daily-report.md` skill file's own gate-mapping table (`james → discord airagri + sheets phucvt`) was never updated and still routes James Diamond's hours-gate to PhucVT. Read the memory at session start, then still followed the skill's stale table when actually gating the Trello item — user had to correct it live again ("PhucVT ko làm James nữa, LeNh full, nói rồi mà").

**Why:** the skill file (`.claude/commands/me/daily-report.md` or equivalent) is the procedural doc; memory is the living correction layer. When they conflict, memory wins — but this only works if the gate-mapping table is actually cross-checked against memory before use, not just read once and set aside.

**How to apply:** For ANY James Diamond / Vinn task Trello item check, query Workstream project `james_diamond` (id `cmqook9vf0kl8m81vusyo8ppt`) filtered by **LeNH**, never PhucVT. Also apply the general lesson: before using any gate-mapping table baked into a skill file, grep memory for that project/client name first — a skill file can silently drift out of sync with a memory correction.
