---
name: feedback_khanhhh_aysar_second_project
description: KhanhHH works on THREE sources, not two — Generator sheet + Aysar/Baamboozle Workstream + Colin/ETZ Workstream. All three must be checked every time, no exceptions.
metadata:
  type: feedback
---

KhanhHH logs hours on the Aysar sheet (`1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8`) under their own name in col G, but Upwork billing for Aysar workroom (35642393) runs through **LeNH's** tracker (sub-contract pattern).

**Why:** Confirmed 2026-05-07 — KhanhHH logged 3.83h on Aysar W23 R36. Upwork showed "LeNH on Aysar" hours which could be mistaken for LeNH unlogged work.

**Upwork sub-contract rule:**
- Don't flag Aysar Upwork hours as "LeNH unlogged" — verify Aysar sheet for KhanhHH rows first
- "LeNH on Aysar Xh" in Upwork = KhanhHH's work billed through LeNH tracker

**How to apply:**
1. KhanhHH daily total = Generator sheet (W45 etc.) **+** Aysar Workstream (Baamboozle project `cmqez93ka07q8p81v7035l3td`). Google Sheets Aysar tab will show 0h — that is expected, Aysar hours are in Workstream not Sheets.
2. Aysar uses non-calendar W{n} numbering — always verify by reading W tab's first date row, not assuming calendar week.
3. Standard 8h/day rule applies to KhanhHH aggregate across ALL sources (Sheets + Workstream).
4. Workstream API: `GET {api_base}/review/week?projectId=cmqez93ka07q8p81v7035l3td&date=YYYY-MM-DD` (single `/api` prefix — see [[reference_workstream]]) — look for `employeeName: KhanhHH` in rows, `actual` field is hours in "H:MM" format.

**Repeat miss 2026-06-18:** Despite this memory existing since 2026-05-07, the daily-sheets-scan script for that day only queried Generator + Aysar sheets for KhanhHH (no Workstream call at all) and reported "5h, no alert" — missed 1h30m of real Aysar/Baamboozle hours sitting in Workstream, true total 6.5h. User caught it: "did you check all task log, workstream???". **The daily-sheets-scan-*.js scripts are rewritten fresh each day and keep dropping the Workstream call for KhanhHH — explicitly add the Workstream Baamboozle fetch (step 4 above) every time one of these scripts is written, do not rely on memory alone since the script itself has no enforcement.**

**🔴 THIRD source found 2026-06-19 — "Colin" / ETZ:** KhanhHH also works on a **third** project: "ETZ - Wathaga" (customer alias "Colin CardWell"), tracked in Workstream under `projectId: cmqezatb807qvp81vpnzzimmp` — completely separate from Generator and Baamboozle. There is ALSO a Google Sheet for it ("NUS - ETZ - Project Management - V2", id `1Y2QU1igccJ_ghirGZn_W36MY8ZwyvIKgE2GHl5j7rSE`) but as of 2026-06-19 it shows 0h for everyone all week — not reliable, check Workstream instead.

User said "KhanhHH said he working on Colin, I keep asking you check all task log!!!" after a "comprehensive" 12-sheet scan still missed this, because no memory or script anywhere named Colin/ETZ for KhanhHH before this. **KhanhHH's daily total = Generator sheet + Baamboozle Workstream (`cmqez93ka07q8p81v7035l3td`) + Colin/ETZ Workstream (`cmqezatb807qvp81vpnzzimmp`). All THREE every time — this is not a closed list, re-ask "does KhanhHH have any other current project?" if a 4th ever surfaces.**

Fetch command for Colin/ETZ: `GET {api_base}/review/week?projectId=cmqezatb807qvp81vpnzzimmp&date=YYYY-MM-DD` (same pattern as Baamboozle, see [[reference_workstream]]).
