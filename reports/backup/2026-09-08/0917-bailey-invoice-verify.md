## Bailey Invoice Verification

**Invoice total:** $6,922.50 (230.75h) | **Rate:** $30/h (all lines check out at exactly $30/h)
**Sources:** WBS Billing (3 payment tabs) + GGS Slack + Est vs Charged sheet + Workstream actuals (`workstream-fetch-speedventory-task-actuals.js 2026-09-08`)
**Note:** invoice framed as "hourly items" — all 8 lines confirmed hourly (no fixed-cost/Slack-quote items found in WBS), so verification = invoice hrs vs WS actual (authoritative per memory, Sheet col K stale post-8/16).

### Line Item Verification

| # | Task | Billing | Inv Hrs | WBS Hrs | Slack | Sheet Actual (stale) | WS Actual | Hrs OK? | Inv $ | Match? |
|---|------|---------|---------|---------|-------|----------------------|-----------|---------|-------|--------|
| 1 | [PrestaShop] Sync Queue Issue | Hourly | 5.25 | not in WBS yet (new/pending) | bug thread found, no fixed quote | 5.25 | 5.25 | YES | $157.50 | ✅ |
| 2 | [Console][Maint] Incorrect Total Purchase Price on PO | Hourly | 1 | not in WBS yet | n/a | 1.00 | 1.00 (⚠️ see note) | YES | $30.00 | ✅ |
| 3 | [Console][Maint] Console Platform Upgrade | Hourly | 205.25 | not in WBS yet | 195.50 (stale) | **205.25 (exact)** | YES | $6,157.50 | ✅ |
| 4 | [Console][Maint] Upgrade RDS | Hourly | 3.25 | old unrelated "Upgrade RDS" 0.5h/$15 PAID Jan-2025 in WBS — different task, ignore | n/a | 3.25 | 3.25 | YES | $97.50 | ✅ |
| 5 | [Console][Maint] Upgrade RDS QC | Hourly | 2 | not in WBS yet | 0.00 (Sheet "Not Started", stale) | 2.00 | YES (via WS) | $60.00 | ✅ |
| 6 | [Maintenance] Selling Price Issue | Hourly | 9 | not in WBS yet | task row blank/not logged | 9.00 | YES | $270.00 | ✅ |
| 7 | Weekly Monitor – Aug 2026 | Hourly | 4 | WBS row 163 = 5h/$150 placeholder (unbilled template, no status/date yet) | n/a | 4.00 | YES (WS overrides placeholder) | $120.00 | ✅ |
| 8 | Weekly Monitor – Jul 2026 ("missing 1h") | Hourly | 1 | WBS row 162 = 4h/$120 **already PAID** Aug 4 2026 (this 1h is an add-on beyond that) | n/a | no WS tag found (predates/outside migration data) | UNVERIFIED — rely on invoice's own "as mentioned previously" note | $30.00 | ⚠️ unverified but plausible |

**Sum check:** 5.25+1+205.25+3.25+2+9+4+1 = 230.75h ✓ matches invoice total hours.
**Cost check:** 157.50+30+6157.50+97.50+60+270+120+30 = $6,922.50 ✓ matches invoice total exactly.

### Summary
- **Invoice valid: YES** (with 1 unresolved sub-item, see below).
- Rate: every line = exactly $30/h. ✓
- Totals: hours and dollar total both reconcile exactly to invoice's stated 230.75h / $6,922.50.
- 6 of 8 lines match Workstream actuals exactly (items #1,2,3,4,5,6 hourly tasks — #7 Weekly Monitor Aug also exact).
- Item #3 (Console Platform Upgrade, 205.25h) — Sheet col K is stale (195.5h) as expected per known migration gotcha; WS actual matches invoice exactly (205.25h). Confirmed this figure is the standalone "Console Platform Upgrade" tag only — did NOT bleed in the separate "Console Platform Upgrade Rail 7" tag (92.5h, correctly excluded, not on this invoice).
- Item #7 — WBS has a 5h/$150 placeholder row (163) for Aug-2026 Monitor with no status/date filled in (i.e., un-finalized template default); actual WS-logged hours are 4h, matching invoice. Not a real discrepancy — WBS placeholder just hasn't been updated to actual yet.
- Item #8 — WBS shows Jul-2026 Weekly Monitor as 4h, **already PAID** (Aug 4 2026). Invoice line for "1h missing" is a separate top-up charge referencing a prior shortfall ("as mentioned previously") — could not independently verify this extra hour via WBS or Workstream (no matching WS tag found, likely predates the 8/16 migration data window). Plausible given invoice's own framing but unverified by data.
- **Payment status:** all 8 items correctly show as NOT yet in WBS payment sheets (i.e., unpaid/pending) — expected for a new invoice. Exception: the base 4h of Jul-2026 Monitor is already paid, but that's not what's being invoiced here (only the extra 1h is).

### Internal Cross-Reference (not blocking)

| Task | Sheet Est Raw | Sheet Est w/Buffer | Sheet Actual (stale) | WS Actual (live) | WBS Billed |
|------|--------------:|--------------------:|----------------------:|------------------:|-----------|
| Sync Queue Issue | — | — | 5.25 | 5.25 | not yet billed |
| Incorrect Total Purchase Price on PO | — | — | 1.00 | 1.00 (two tags both =1h, see below) | not yet billed |
| Console Platform Upgrade | 128.00 | — | 195.50 | 205.25 | not yet billed |
| Console Platform Upgrade Rail 7 (separate, not invoiced) | — | — | 92.50 | 92.50 | not yet billed |
| Upgrade RDS | 3.00 | — | 3.25 | 3.25 | not yet billed |
| Upgrade RDS QC | 24.00 | — | 0.00 | 2.00 | not yet billed |
| Selling Price Issue | — | — | not logged | 9.00 | not yet billed |
| Weekly Monitor Aug 2026 | — | — | n/a | 4.00 | WBS placeholder row = 5h/$150 (unfinalized) |
| Weekly Monitor Jul 2026 (base, already paid) | — | — | n/a | n/a | 4h/$120 PAID Aug 4 2026 |

**Gotcha caught (per skill step 4 guidance on tags[0] risk):** "Incorrect Total Purchase Price on PO" appears under TWO distinct Workstream tags in the raw actuals dump — `INCORRECT TOTAL PURCHASE PRICE` and `[CONSOLE] [MAINTENANCE] INCORRECT TOTAL PURCHASE PRICE ON PO` — both independently showing 1h. This looks like the same piece of work double-tagged (a naming/tag-ID split) rather than 2 separate hours of work. Sheet's Est-vs-Charged Actual column also shows exactly 1.00h for this task, giving decent confidence the true total is 1h (matching invoice) and not 2h — but the duplicate tag itself should be cleaned up in Workstream to avoid future double-counting.

### Unresolved Questions
1. Item #8 (Weekly Monitor Jul 2026, 1h/$30 "missing hour") could not be verified against WBS or Workstream — no matching data source found for the claimed shortfall. Recommend asking Amy/Joey thread reference for the original "missing 1 hour" mention before approving this specific sub-line, though it doesn't affect the other 7 items.
2. "Incorrect Total Purchase Price on PO" has two Workstream tags both logging 1h each (see gotcha above) — worth cleaning up in Workstream tagging so future invoices don't risk double-counting this task.
3. Console Platform Upgrade (Task ID WS field in Est-vs-Charged sheet is a free-text label "Console Platform Upgrade", not a numeric tag ID) — confirmed via taskTexts that WS aggregation correctly isolated 205.25h to the right tag (excluding Rail 7's 92.5h), but the Sheet's Task-ID-WS column isn't a clean numeric ID for this row, worth normalizing.
