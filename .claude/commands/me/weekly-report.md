---
description: Weekly monitoring report — team hours, project reports, JIRA cross-check
---

# ⚠️ MANDATORY FIRST STEP — READ MEMORY

**Before doing ANYTHING else, read these files in order:**
1. `docs/memory/MEMORY.md` — get the full list of memory files
2. Read EVERY feedback file listed under `## Feedback` in that index
3. Memory OVERRIDES any instructions in this skill file

Do not skip this. Do not proceed until all feedback files are read.

---

# Weekly Report

Run Friday night or Saturday morning. Generates `reports/{YYYY-MM-DD}/weekly-monitor.md`.

## Instructions

1. Read workflow from `~/projects/My-AI-Agent/docs/weekly-monitor-workflow.md`
2. Read all config files: `.google-docs.json`, `.jira-config.json`, `.scrin-config.json`, `.matrix-config.json`
3. Read previous weekly report for comparison

## #1: Team Hours = 40h/week

For each employee, check Google Sheets hours (filter by Owner column G). Multi-project employees sum all sheets.

| Employee | Projects |
|----------|----------|
| LongVV | Xtreme Soft + JIRA cross-check |
| TuanNT | Paturevision + William Bills + John Yi |
| KhanhHH | Generator App |
| LeNH | BXR App + Radio Data Center + Baamboozle |
| PhucVT | James Diamond |
| VietPH | Paturevision |
| Fountain team | ViTHT, ThinhT, VuTQ, PhatDLT, HungPN |

**Flag if:** Any employee < 40h/week, any day < 8h (unless paid leave), off reason != default.

**LongVV/Kai only:** Also check JIRA worklogs, compare with Google Docs. Flag if differ > 2h.

## #2: Report Project

### Fountain (Kunal)
- Compare Matrix weekly plan vs actual hours in task log
- Capacity & runway: active scope (Not Started + In-progress) / 86h per week
- Over-estimate tracking: flag tasks where actual > est and still growing

### James Diamond + Marcel — Matrix Report
- Extract hours from Google Sheets
- Send combined message to Matrix room `!oofREYAXHsvPWEOJev:nustechnology.com`
- Format: "Report week DD/MM" with hours as Xh Ym (not decimal)
- Format per line: charge/actual (e.g. 36h/40h). No `-` prefix before names.
- PhucVT = Web, AnhNH2 = Mobile, plan: PhucVT 40h. AnhNH2 has no plan — use actual as both values.
- If employee has "Nghỉ nửa ngày"/"Nghỉ cả ngày", append (off X day dùng paid leave) to section and name line

## Key Rules

- Filter by Owner column (G), NOT day total row
- "Nghỉ cả ngày" = full day off (0h OK), "Nghỉ nửa ngày" = half day (4h OK)
- Off reason default = "use paid leave". Only report non-default reasons from Notes column (K)
- Week tabs differ per sheet — verify by reading row 4 col A date
- Unfilled hours show "—", not "0h"
- Scrin.io cross-reference: John Yi task log only, not TuanNT total

## Arguments

If `$ARGUMENTS` is provided:
- `/weekly-report hours` — only check team hours
- `/weekly-report fountain` — only Fountain plan vs actual
- `/weekly-report matrix` — only send James Diamond + Marcel Matrix report
- `/weekly-report` (no args) — run everything
