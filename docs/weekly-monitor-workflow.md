# Weekly Monitor Workflow

Run Friday night or Saturday morning. Output: `reports/YYYY-MM-DD-weekly-monitor.md`

## Workflow Maintenance Rule

**Any feedback or correction from the user must be updated in this file immediately.** This workflow is the source of truth for running on any machine — do not store operational knowledge only in Claude's memory.

## #1: Team Hours = 40h/week

**NEVER pre-assign developers to specific sheets.** Scan ALL 11 Google Sheets for each developer by filtering col G (Owner) = dev name, sum col H (Actual). New sheets surface without notice — the full 11-sheet list is authoritative.

For each team member, check Google Docs hours (filter by Owner column G, NOT day total row). Multi-project employees — sum across ALL sheets where their name appears.

| Internal Name | External Name | Weekly Target | JIRA cross-check |
|--------------|---------------|---------------|-----------------|
| LongVV | Kai | 16h/wk | madhuraka instance (LIFM2, TP, XS) — compare total vs Sheets |
| TuanNT | TuanNT/Nick | 40h/wk | — |
| KhanhHH | KhanhHH | 40h/wk | — (also check ALL Workstream projects) |
| LeNH | LeNH/Carrick | 40h/wk | swiftstudio instance (BXR project) — compare vs Sheets |
| PhucVT | PhucVT | 40h/wk | — |
| VietPH | VietPH | 40h/wk | — |

**Alert thresholds:** < 40h/wk (most devs); < 16h/wk (LongVV). Marginal shortfall < 1h: check weekly total first before flagging.

**Workstream projects** (scan ALL for ALL devs, in addition to sheets):
- maddy: `cmpqc1v7v00ahtk1vs1817xt8`
- rebecca: `cmpqcflkx00litk1vic3vki6j`
- baamboozle: `cmqez93ka07q8p81v7035l3td`
- colin-etz: `cmqezatb807qvp81vpnzzimmp`
- blair-brown: `cmqj4tj6v01gfm81vgx7ipkov`

### Google Sheets — Week Tab Mapping (Mar 16 2026 reference)

Each project started at different times, so W{n} differs per sheet:

| Sheet | Sheet ID | Mar 16 = |
|-------|----------|----------|
| Xtreme Soft (Maddy) | `1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58` | W50 |
| James Diamond | `1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI` | W17 |
| Paturevision (Bailey) | `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg` | W19 |
| John Yi/Amazing Meds | `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ` | W15 |
| William Bills (Rebecca) | `1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4` | W16 |
| Generator App (Elliott) | `1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM` | W32 |
| BXR App (Rory) | `1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8` | W3 |
| Radio Data Center (Franc) | `1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ` | W16 |
| Baamboozle (Aysar) | `1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8` | W16 |
| Elena | `1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ` | — |
| Fountain | `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` | W18 |

Scan ALL 11 sheets for every dev. Never skip a sheet because "that dev doesn't work there" — assignments change without notice.

**IMPORTANT:** Week tabs shift each week. Always verify by reading row 4 col A (date) to confirm correct tab. To find current week: check a few tabs and match the Monday date.

### Finding the Correct Week Tab — Use Summary Tab

Every task log sheet has a **Summary** tab with week-to-date mapping. This is the fastest way to find the correct W{n}:

1. Read `Summary!A:C` (columns: W{n}, Start date, End date)
2. Find the row where column B = target Monday (format: "Month DD, YYYY", e.g. "March 16, 2026")
3. Column A in that row = the correct W{n} tab name (e.g. "W17")
4. The Summary tab also shows per-employee weekly totals — use these for the total hours check. Only open the W{n} tab when you need daily breakdowns.

Notes on Summary tab structure:
- Employee names are in row 5 (index 4), starting at column index 8 (col I), repeating each name 4 times (actual, self-rated, charged, rate). Read only the first occurrence (actual column) per employee.
- Some sheets have many employees — read to column AM or beyond (not just A:Z) to capture all.
- Week rows start at row 6. Column A = W{n}, Column B = start date ("Month DD, YYYY"), Column D = total actual.

Notes on W tab leave row parsing:
- "Nghỉ nửa ngày" (half day off) and "Nghỉ cả ngày" (full day off) appear as separate rows with Owner in col G and **empty col H** — do not skip these rows. They explain short/zero hours on that day.
- When checking for leave, scan all rows under the day header for the employee, including rows with empty col H.

### Steps
1. For each sheet, read Summary tab to find correct W{n} and per-employee weekly totals
2. Open W{n} tab only for daily breakdown when needed (flagging < 8h days)
3. Filter task entries by Owner column (G) matching target employee
3. Sum Actual column (H) per day per employee
4. For multi-project employees (TuanNT, LeNH), sum across all their sheets
5. Flag if:
   - Any employee total < 40h/week
   - Any day < 8h (unless "Nghỉ cả ngày" full day off or "Nghỉ nửa ngày" half day = 4h min)
   - Off reason: default = "use paid leave". Check Notes column (K) for non-default reasons, only report if different.
6. For LongVV/Kai only: also check JIRA worklogs and compare (docs vs JIRA, flag if differ > 2h)

### JIRA (LongVV/Kai + LeNH/Carrick)

**Maddy (madhuraka instance):**
- `POST /rest/api/3/search/jql` with `worklogAuthor=5b1ed0bcc175e5207bf80b77 AND worklogDate >= "{monday}"`

**Rory (swiftstudio instance):**
- `POST /rest/api/3/search/jql` with `worklogAuthor=5a9390547a13c34d34cef5bd AND worklogDate >= "{monday}"`
- Project filter: `project = BXR`

**Both:** Paginate worklogs for issues with >20 entries: `GET /issue/{key}/worklog?startAt=N`. Flag if JIRA vs Google Docs differ > 2h. Config: `.jira-config.json`

## #2: Report Project

### Kunal (Fountain) — MANDATORY 5-part check
Sheet: `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`

1. **Matrix plan**: Fetch from Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), cite source
2. **Task log actuals**: Summary tab W{n}, per-developer weekly totals
3. **Plan vs Actual table**: Per-dev comparison, flag mismatch
4. **Capacity & Runway**: "Est vs Charged" tab — col I=Est Raw, col K=Actual. Exclude "Deployed on Live"/"Cancelled". Calculate remaining, runway at dev h/wk. Delta vs previous report.
5. **Over-estimate tracking**: actual > est +20%, top offenders table. Compare with previous report — flag STILL GROWING vs stable. Key tasks: #2595 (120h est), #2615 (12h est).

### James Diamond + Marcel — Combined report to Matrix
Extract last week's hours and send as ONE message to Matrix room.
- Room: `!oofREYAXHsvPWEOJev:nustechnology.com` (Thuy Le)

**MANDATORY send gate (added 2026-07-04):** Never send this report off a general "yes, send" — a wrong `Web: 40h/42h` slipped through that way once already. Use `config/.weekly-report-send-flags.json`:
1. Compute the exact message text and write it to `james_diamond_marcel_blair_brown.message_text`, with `confirmed: false`.
2. Show the user the literal text (not a paraphrase) and ask them to explicitly confirm THAT text.
3. Only after explicit confirmation, set `confirmed: true` + `confirmed_at`, then send.
4. After sending, set `sent: true`, `sent_at`, `event_id`.
5. If the numbers change after feedback, go back to step 1 with `confirmed: false` — never resend without a fresh explicit confirmation of the new text.
6. **Web charge = SUM of each dev's own charge line, never a fixed 40h contract shortcut.** Makeup hours for a PRIOR week's undercharge get `charge=0` for that dev's line (only `actual` counts them), annotated e.g. `LongVV: 0h/2h (bù charge thiếu tuần trước, không charge thêm)`.
- Template (combined, with title for traceability):
```
Report week {DD/MM}

James Diamond

Web: {charge}/{actual} [(off X day dùng paid leave)]
PhucVT: {charge}/{actual} [(off X day dùng paid leave)]

Mobile: {charge}/{actual}
AnhNH2: {charge}/{actual}

---

Marcel
DuongDN: {hours}
```
- Format is **charge/actual** (charged hours first, actual hours second)
- Title: "Report week DD/MM" where DD/MM = Monday of the reported week
- **PhucVT = Web**, all other members = **Mobile**
- Plan hours: PhucVT 40h/week. AnhNH2 has no fixed plan — use actual as both charge and actual (e.g. 20h/20h)
- If an employee has a "Nghỉ nửa ngày" or "Nghỉ cả ngày" row, append `(off X day dùng paid leave)` to both the section line and the individual name line
- No `-` prefix before employee names
- Format hours as Xh Ym (not decimal). E.g., 1.33h → 1h20m
- Sheets:
  - James Diamond: `1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI`
  - Marcel: `1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI`
- Filter by Owner column (G), sum per employee
- Send via Matrix PUT message API (auto-refresh token if expired)

## More requirements TBD

## Config Files

All config files are in the `config/` directory:
- `config/.google-docs.json` — All spreadsheet IDs and employee mappings
- `config/.jira-config.json` — JIRA API credentials and team config
- `config/.scrin-config.json` — Scrin.io login + API config
- `config/.matrix-config.json` — Matrix/Element auth + room configs
- `config/daily-agent-*.json` — Google service account key for Sheets API
