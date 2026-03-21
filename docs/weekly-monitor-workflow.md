# Weekly Monitor Workflow

Run Friday night or Saturday morning. Output: `reports/YYYY-MM-DD-weekly-monitor.md`

## #1: Team Hours = 40h/week

For each team member, check Google Docs hours (filter by Owner column G, NOT day total row). Members who split across projects — sum all project sheets.

| Internal Name | External Name | Client | Hours Sources |
|--------------|---------------|--------|---------------|
| LongVV | Kai | Maddy | Google Docs (Xtreme Soft) + JIRA (madhuraka: LIFM2, TP, XS) |
| TuanNT | TuanNT/Nick | Bailey + Rebecca + John Yi | Google Docs (Paturevision + William Bills + John Yi/Amazing Meds) |
| KhanhHH | KhanhHH | Elliott | Google Docs (Generator App) |
| LeNH | LeNH | Rory + Franc + Aysar | Google Docs (BXR App + Radio Data Center + Baamboozle) |
| PhucVT | PhucVT | James Diamond | Google Docs (James Diamond) |
| VietPH | VietPH | Bailey | Google Docs (Paturevision) |

### Google Sheets — Week Tab Mapping (Mar 16 2026 reference)

Each project started at different times, so W{n} differs per sheet:

| Sheet | Sheet ID | Mar 16 = | Employee |
|-------|----------|----------|----------|
| Xtreme Soft (Maddy) | `1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58` | W50 | LongVV |
| James Diamond | `1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI` | W17 | PhucVT, AnhNH2 |
| Paturevision (Bailey) | `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg` | W19 | VietPH, TuanNT |
| John Yi/Amazing Meds | `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ` | W15 | TuanNT |
| William Bills (Rebecca) | `1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4` | W16 | TuanNT |
| Generator App (Elliott) | `1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM` | W32 | KhanhHH |
| BXR App (Rory) | `1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8` | W3 | LeNH |
| Radio Data Center (Franc) | `1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ` | W16 | LeNH |
| Baamboozle (Aysar) | `1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8` | W16 | LeNH |
| Fountain | `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` | W18 | ViTHT, ThinhT, VuTQ, PhatDLT, HungPN |

**IMPORTANT:** Week tabs shift each week. Always verify by reading row 4 col A (date) to confirm correct tab. To find current week: check a few tabs and match the Monday date.

### Finding the Correct Week Tab — Use Summary Tab

Every task log sheet has a **Summary** tab with week-to-date mapping. This is the fastest way to find the correct W{n}:

1. Read `Summary!A:C` (columns: W{n}, Start date, End date)
2. Find the row where column B = target Monday (format: "Month DD, YYYY", e.g. "March 16, 2026")
3. Column A in that row = the correct W{n} tab name (e.g. "W17")
4. The Summary tab also shows per-employee weekly totals — use these for the total hours check. Only open the W{n} tab when you need daily breakdowns.

Note: Employee names start at column index 8 (col I) in the Summary tab, repeating in groups of 4 (actual, self-rated, charged, rate). Some sheets have many employees, so read to column AM or beyond to capture all.

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

### JIRA (LongVV/Kai only)
- `POST /rest/api/3/search/jql` with `worklogAuthor=5b1ed0bcc175e5207bf80b77 AND worklogDate >= "{monday}"`
- Paginate worklogs for issues with >20 entries: `GET /issue/{key}/worklog?startAt=N`
- Config: `.jira-config.json`

## #2: Report Project

### Kunal (Fountain)
Compare planned hours (from Matrix weekly plan) with actual hours in Fountain task log. Flag if mismatch.

### James Diamond + Marcel — Combined report to Matrix
Extract last week's hours and send as ONE message to Matrix room.
- Room: `!oofREYAXHsvPWEOJev:nustechnology.com` (Thuy Le)
- Template (combined, with title for traceability):
```
Report week {DD/MM}

James Diamond
Web: {actual}/{plan}
- PhucVT: {actual}/{plan}

Mobile: {actual}/{plan}
- AnhNH2: {actual}/{plan}

---

Marcel
- DuongDN: {hours}
```
- Title: "Report week DD/MM" where DD/MM = Monday of the reported week
- **PhucVT = Web**, all other members = **Mobile**
- Plan hours: PhucVT 40h/week
- Format hours as Xh Ym (not decimal). E.g., 1.33h → 1h20m
- Sheets:
  - James Diamond: `1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI`
  - Marcel: `1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI`
- Filter by Owner column (G), sum per employee
- Send via Matrix PUT message API (auto-refresh token if expired)

## More requirements TBD

## Config Files
- `.google-docs.json` — All spreadsheet IDs and employee mappings
- `.jira-config.json` — JIRA API credentials and team config
- `.scrin-config.json` — Scrin.io login + API config
- `.matrix-config.json` — Matrix/Element auth + room configs
