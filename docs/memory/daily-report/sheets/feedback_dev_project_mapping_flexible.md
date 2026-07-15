---
name: feedback_dev_project_mapping_flexible
description: "ALL devs scan ALL 11 sheets aggregated by owner col G — never use Summary tab total (all-devs sum), never hardcode dev→sheet mapping"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a61419af-501f-4646-a1fa-5c9991cec471
---

🔴 **2026-07-13 update: Workstream is now primary for ALL these projects except Paturevision/Bailey** (see [[reference_workstream]] — full migration, not just a tie-breaker). This file's sheet list is now the FALLBACK/cross-check source (query when Workstream returns 0h or looks suspicious) for every sheet except Paturevision, which remains the sole/primary source since Bailey has no Workstream project. The scanning discipline below (all sheets, filter by owner col G, never hardcode dev→sheet) still applies whenever Sheets IS being queried — it just isn't the first place to look anymore except for Bailey.

Dev → project sheet mapping is **not static**. Any dev may log hours in any sheet and assignments change weekly.

**NEVER use Summary tab col D as a dev's total — it is the all-devs project sum.** Using it gave KhanhHH 80h (impossible). Always filter W{n} tab rows by owner col G = dev name, then sum.

**Complete sheet list (ALL must be scanned every run):**
| Sheet | ID | Week numbering |
|-------|-----|----------------|
| Maddy | `1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I` | standard |
| JohnYi | `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ` | standard |
| Rebecca | `1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4` | standard |
| JamesDiamond | `1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI` | standard |
| Rory | `1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8` | standard |
| Franc | `1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ` | standard |
| Aysar | `1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8` | non-calendar |
| Generator | `1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM` | standard |
| Paturevision | `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg` | standard |
| Fountain | `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` | standard |
| Elena | `1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ` | own epoch (W1=2026-03-23); use Summary to map date→W{n} |

**Why:** 2026-05-06 user corrected hardcoded KhanhHH→Generator mapping. "KhanhHH work multiple project now". 2026-06-11 user repeated: "dev can switch project easily, check fucking memory". 80h weekly bug from Summary tab misuse.

**How to apply:**
1. Scan ALL 11 sheets every run — never skip based on assumed assignment.
2. For each sheet: use Summary tab to find the W{n} containing the reporting date, then read W{n}!A:H.
3. Filter rows by col G (Owner) = dev name. Sum col H (Actual hours).
4. Also include rows where col A is empty but col G has owner — some devs omit "Task dự án" in col A. See [[feedback_sheets_empty_col_a_bug]].
5. Aggregate across ALL sheets → compare to 8h daily target.
6. **⚠️ CORRECTED 2026-06-22 — No Q-T special case:** The old "LeNH hours in Q-T" claim was wrong. Rebecca cols M-Q are sign-off confirmations, NOT task hours. Scan LeNH in Rebecca the same as all devs: filter col G (Owner)="LeNH", sum col H (Actual). No special column needed.
7. Only flag shortfall if AGGREGATE < target and no leave note. Per-sheet 0h alone is never an alert.

**Per-dev exceptions:**
- LongVV: 16h/wk part-time; check Matrix weekly plan for current week target
- TuanNT: 8h target combined across ALL sheets
- Marcel/DuongDN: adhoc, 0h expected
- Bailey-DuongDN (DEV3): inactive, 0h expected

🔴 **CONFIRMED BUG, fixed 2026-07-15: owner-name matching used substring `.includes()`, causing false attribution across similarly-named people.** `scripts/sheets-tasklog-scan.js` matched dev names via `k.toLowerCase().includes(dev.toLowerCase())` — since Elena sheet's col G has `TuanNTG` (a different real person, active in the Elena Slack channel per daily-report Piece transcripts), `"tuanntg".includes("tuannt")` was `true`, so TuanNTG's 8h got wrongly credited to TuanNT (PHP team dev on Paturevision/John Yi/Rebecca), inflating his combined total from a real 8h to a false 16h and masking that this could have hidden a real shortfall on a different day. **Fix applied:** all 3 substring-match call sites (Sheets `matchKeys`/`leaveKeys` filters + the Workstream `employeeName` filter) now use exact case-insensitive equality (`===`) instead of `.includes()`. CLI callers must pass the exact dev name (already how it's invoked per existing examples — no behavior change there). If a NEW name collision surfaces again (e.g. two people with a shared prefix), do not revert to substring matching — add an explicit alias/exclusion instead.
