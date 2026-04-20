---
name: Monday report — all 8 project task log sheet IDs (incl. Neural/LegalAtoms/Taraba)
description: Complete list of Google Sheets used for Monday report "Total Dev Hours" per project. Neural/LegalAtoms/Andrew Taraba DO have sheets despite skill text saying "always 0".
type: project
---

All 8 Monday report projects have a Google Sheets task log with a **Summary** sheet. Fetch weekly hours from `Summary!A6:D60`, match col B start date to the Monday of the reporting week, read col D (Actual).

| Project | Sheet ID | Sheet name |
|---|---|---|
| Maddy (LongVV only since 2026-04-06) | `1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I` | New template |
| Baamboozle | `1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8` | Aysar-Baamboozle-V3 |
| James Diamond | `1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI` | Portfolio-2025 |
| Bailey | `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg` | Paturevision |
| Marcel | `1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI` | Marcel 2026 |
| **Neural Contract** | `1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg` | **NUS - Neural Contract - Contract Probe v2** |
| **LegalAtoms** | `1Q9qB-Bz4lRqSIjqNbLszFOtokm4X_fUe4KqiTXIQ9_c` | **NUS - Raymond - LegalAtoms - Task Logs** |
| **Andrew Taraba** | `11iOnN6sCEK_5pcoeFs8tm42GZRZ719rTDlAeAYQIOGI` | **NUS - Andrew Taraba - Portfolio-v2** |

**Why:** The monday-report skill text said "always 0" for Neural/LegalAtoms/Taraba, but these projects DO have NUS task log sheets. User flagged Neural=0 as wrong — hours come from the sheet, not Upwork. The "messages_only" flag in upwork-config refers to Upwork monitoring mode only, not absence of internal task log.

**How to apply:** For Monday report, always fetch hours from the corresponding sheet's Summary tab — never default to 0. Use Drive search (name contains "Neural"/"Raymond"/"Andrew") if a project's sheet ID isn't already known.
