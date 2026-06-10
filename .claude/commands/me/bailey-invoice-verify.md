---
description: Verify Bailey/Paturevision invoice against WBS billing and task log data
---

# Bailey Invoice Verify

Verify a Bailey/Paturevision invoice against THREE data sources:
1. **WBS Billing** spreadsheet — source of truth for billing amounts
2. **GGS Slack** (#change-requests, #maintenance) — source of truth for quoted hours (client-approved)
3. **Est vs Charged** task log — internal cross-reference for actual hours worked

## Data Sources

| Source | ID / Location | Purpose |
|--------|--------------|---------|
| WBS Billing | `1rp0URMjhaOnEe3T_M0o6JbC2av1hno_rdkLIEdWeP4U` | Billing amounts per task |
| GGS Slack | `globalgrazingservices.slack.com` (token in `.slack-accounts.json`) | Client-approved hour quotes |
| Est vs Charged | `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg` | Actual hours worked |

**Service account:** `config/daily-agent-490610-7eb7985b33e3.json`
**Rate:** $30/hour

## Billing Model

- **Fixed-cost tasks:** Hours billed = hours **quoted to and approved by client on Slack**, recorded in WBS. NOT internal buffer formula.
- **Hourly tasks:** Hours billed = actual hours from Est vs Charged "Actual" column.
- Invoice hours must match BOTH the WBS entry AND the original Slack quote.

## Steps

### Step 1 — Parse the invoice
Extract line items: task name, hours, amount. Compute implied rate (amount ÷ hours) to verify $30/h.

### Step 2 — Fetch WBS billing data
Search ALL three payment sheets: `Main Tasks - Payment`, `Miscellaneous Tasks - Payment`, `Maintenance Tasks - Payment`.
- Match each invoice line item to a WBS row by task name
- Record WBS hours and cost — flag if invoice hours ≠ WBS hours

### Step 3 — Verify hours against GGS Slack (**MANDATORY for fixed-cost tasks**)
For each fixed-cost item, search GGS Slack for the original Amy quote to Joey:
- Search `#change-requests` and `#maintenance` for task name + "hours"
- Find the message where Amy quoted hours to the client and Joey approved
- Confirm invoice hours = Slack-quoted hours
- Use token from `config/.slack-accounts.json` → workspace "GLOBAL GRAZING SERVICES"
- Search API: `https://slack.com/api/search.messages?query=<task+name+hours>&count=5`

### Step 4 — Cross-reference with Est vs Charged (internal awareness)
Read `Est vs Charged` sheet (gid=920993260):
- Columns: Task name (A), Status (G), Dev (H), Est Raw (I), Est w/Buffer (J), Actual (K), Charged (L)
- For hourly tasks: invoice hours must = Actual (col K)
- For fixed tasks: Actual is internal-only; WBS/Slack quote governs billing

### Step 5 — Fetch individual WBS sheets (if needed)
For large tasks spanning Console + Mobile, check dedicated WBS sheet:
| Sheet | gid |
|-------|-----|
| WBS - Mandatory Photo Capture | 676218340 |
| WBS - Picking & Stock Location Enhancements | 1508556933 |
| WBS - Order Verification Screen | 357245054 |
| WBS - Awaiting Shipment | 1942930271 |

### Step 6 — Generate report

```
## Bailey Invoice Verification

**Invoice total:** $X,XXX.XX | **Rate:** $30/h
**Sources:** WBS Billing + GGS Slack + Est vs Charged

### Line Item Verification

| # | Task | Billing | Inv Hrs | WBS Hrs | Slack Quote | Actual | Hrs OK? | Inv $ | Match? |
|---|------|---------|---------|---------|------------|--------|---------|-------|--------|

### Summary
- Invoice valid: YES/NO
- Discrepancies: list any
- Payment status: all items unpaid? (expected for pending invoice)

### Internal Cross-Reference (not blocking)
Show WBS billed vs Est w/Buffer vs Actual for awareness.
```

Save report to `plans/reports/bailey-invoice-verify-{YYMMDD-HHMM}.md`

## Important Rules

- **NEVER treat invoice hours as verified without checking WBS + Slack.** Invoice hours are unverified input.
- Fixed-cost hours are set by client-approved Slack quote, NOT the internal Est w/Buffer formula.
- Hourly task hours must equal actual worked hours (Est vs Charged col K).
- Always check ALL three payment sheets (Main + Miscellaneous + Maintenance Tasks).
- Some tasks span Console + Mobile — search both in Est vs Charged and sum.
- Always check payment status in WBS — items should be unpaid for a new invoice.

## Arguments

Pass the invoice text as the argument: `/bailey-invoice-verify <invoice text>`
