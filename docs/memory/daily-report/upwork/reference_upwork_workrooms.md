---
name: upwork-workroom-tracking-setup
description: "Upwork account, workroom URLs, and scripts for weekly hour comparison with task logs"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

## Account
- carrick@nustechnology.com (config: `.upwork-config.json`)
- Browser profile saved at `tmp/upwork-profile-carrick/`

## Workrooms
| Project | Client | Workroom ID | Developer | Note |
|---------|--------|-------------|-----------|------|
| Rory | Rory Hackett | 41069448 | LeNH | — |
| Neural Contract | Neural Contract | 38901192 | external | Messages only, no task log |
| Aysar | Aysar K | 35642393 | LeNH (tracker) / KhanhHH (actual work) | Active. Sub-contract pattern — KhanhHH does the work, LeNH's Upwork tracker bills it. See `feedback_khanhhh_aysar_consolidated.md`. |
| Bailey DEV1 | BAILEY JOEY | 42545630 | VietPH | Account: vinn |
| Bailey DEV3 | BAILEY JOEY | 43093775 | DuongDN | Account: david2 |

## Scripts
- `scripts/upwork-login.js --login` — First-time login (visible browser)
- `scripts/upwork-weekly-hours.js` — Fetch weekly hours from all workrooms

## Weekly Report Comparison
- Upwork hours = total tracked time (official + part-time from task log)
- Task log: sum ALL rows for employee (both "Task dự án" + "Part-time" in col A)
- Upwork week = Mon-Sun; task log = Mon-Fri
- Flag discrepancies > 1h between Upwork and task log
