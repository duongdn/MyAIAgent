---
name: feedback_khanhhh_aysar_second_project
description: KhanhHH's Upwork billing for Aysar runs under LeNH's tracker (sub-contract) — don't flag LeNH Aysar Upwork as unlogged without checking KhanhHH rows in Aysar sheet
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
4. Workstream API: `GET /api/review/week?projectId=cmqez93ka07q8p81v7035l3td&date=YYYY-MM-DD` — look for `employeeName: KhanhHH` in rows, `actual` field is hours in "H:MM" format.
