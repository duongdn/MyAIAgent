---
name: LeNH 0h in one sheet is NOT alert if they worked on another
description: LeNH splits across 4 sheets (Rory/Franc/Aysar/Rebecca); only flag the sheet where they actually worked
type: feedback
---

LeNH works on 4 sheets but not all of them every day. 0h in Rory/Franc/Aysar/Rebecca is expected for days LeNH wasn't assigned to that project. Do NOT fire an alert for each empty sheet.

**Why:** User corrected 2026-04-23. On Wed 22/04 LeNH worked on Aysar (confirmed by 8.5h tracked on Upwork Aysar workroom) — so Rory and Franc being 0h is *correct*, not missing. Firing "Rory 0h" + "Franc 0h" alerts caused wrongly-skipped Trello items and noise.

**How to apply:**
1. Determine where LeNH actually worked that day: Upwork workroom hours are the primary signal (Rory=41069448, Aysar=35642393, Franc no Upwork sheet — use task log presence).
2. Only flag the specific sheet where LeNH had tracked-but-unlogged hours (e.g. Upwork Aysar 8.5h vs Aysar sheet 0h = ALERT; Rory Upwork 0h + Rory sheet 0h = OK).
3. Same principle applies to any multi-sheet dev: TuanNT (John Yi/Rebecca/Bailey), LongVV (Maddy/James Diamond). Empty sheet ≠ missing log; check total across sheets + Upwork.
4. For Trello Check Progress: only skip the item for the sheet that has the true alert. Complete others.
