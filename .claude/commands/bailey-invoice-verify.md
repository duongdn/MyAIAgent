---
description: Verify Bailey/Paturevision invoice against WBS billing and task log data
---

# Bailey Invoice Verify

Verify a Bailey/Paturevision invoice against two data sources:
1. **WBS Billing** spreadsheet (what we charge client) — the source of truth for invoices
2. **Est vs Charged** task log (actual hours worked) — for cross-reference

## Data Sources

| Source | Sheet ID | Purpose |
|--------|----------|---------|
| WBS Billing | `1rp0URMjhaOnEe3T_M0o6JbC2av1hno_rdkLIEdWeP4U` | Invoice amounts (estimates + buffer) |
| Est vs Charged | `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg` | Task log actuals + charged hours |

**Service account:** `config/daily-agent-490610-7eb7985b33e3.json`
**Rate:** $30/hour

## Billing Model

- **Fixed-cost tasks:** Billed at **WBS estimated hours + buffer** (typically 10%), NOT actual hours
- **Hourly tasks:** Billed at actual hours from task log "Charged" column
- Buffer formula: Raw estimate × 1.10–1.24 (varies by task complexity)

## Steps

### Step 1 — Parse the invoice
Extract line items from user input: task name, hours, amount.

### Step 2 — Fetch WBS billing data
Read from `Main Tasks - Payment` and `Miscellaneous Tasks - Payment` sheets:
- Columns: Task name (B), Estimate for Costs (C/E), Cost (D/F), Status (G/H), Payment Status (I)
- Match each invoice line item to a row

### Step 3 — Fetch individual WBS sheets (if needed)
For large tasks (e.g., Photo Capture, Awaiting Shipments), check the dedicated WBS sheet:
- Get Console/Mobile/Prestashop breakdown
- Verify: Total hours + Buffer hours = Global hours (billed)

Key WBS sheets:
| Sheet | gid |
|-------|-----|
| WBS - Mandatory Photo Capture | 676218340 |
| WBS - Picking & Stock Location Enhancements | 1508556933 |
| WBS - Order Verification Screen | 357245054 |
| WBS - Awaiting Shipment | 1942930271 |

### Step 4 — Cross-reference with Est vs Charged
Read `Est vs Charged` sheet (gid=920993260) for each task:
- Columns: Task name (A), Status (G), Dev (H), Est Raw (I), Est w/Buffer (J), Actual (K), Charged (L)
- Compare: WBS billing amount vs Est w/Buffer vs Actual

### Step 5 — Generate report

```
## Bailey Invoice Verification

**Invoice total:** $X,XXX.XX | **Rate:** $30/h

### Line Item Comparison

| # | Task | Invoice Hrs | Invoice $ | WBS Billing $ | WBS Est+Buffer | Actual | Match? |
|---|------|-------------|-----------|---------------|----------------|--------|--------|

### Summary
- Total match: YES/NO
- Discrepancies: list any
- Fixed-cost tasks: verify against WBS estimate+buffer
- Hourly tasks: verify against task log "Charged" column

### Cross-Reference (Actual vs Billed)
Show how actual hours compare to what's being billed (for internal awareness, not invoice validation).
```

Save report to `plans/reports/bailey-invoice-verify-{YYMMDD-HHMM}.md`

## Important Rules

- Fixed-cost invoice amounts come from WBS estimates, NOT task log actuals
- The "Charged" column in Est vs Charged = actual hours logged, which may differ from invoice
- Always check BOTH payment sheets (Main Tasks + Miscellaneous Tasks)
- Some tasks span Console + Mobile — invoice may combine them into one line item

## Arguments

Pass the invoice text as the argument: `/bailey-invoice-verify <invoice text>`
