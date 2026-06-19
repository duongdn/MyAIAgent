# Maddy / Xtreme Project Health Report — 2026-06-19 11:30

## Executive Summary

**Maddy is at a critical point.** 4 tickets are actively being complained about (444, 434, 439, 260). Financial risk is real — client (Maddy's client, not Maddy) has already refused to pay for over-estimate hours on some tickets. Maddy is now managing up to NUS (Carrick/Chien) and down to Kai simultaneously, under pressure from both sides.

---

## Maddy's Exact Complaints (Jun 18 22:54 — full message)

> **444** — Anoma said this took 15 seconds. Should be instantaneous. Make sure all operations done in queue, only saving queue entry is synchronous.
> 
> **434** — PR has comments. Please address. Want this live asap.
>
> **439** — I need clarification on my questions. Needs to go live asap. Delayed for so long, customer is getting worried.
>
> **260** — Previous feedback not addressed before pushed to Anoma for testing. Provide detailed explanation as to why feedback was not addressed.
>
> **"Every time we go through a round of QA testing and getting it returned back, we are adding time to the ticket — this is the main reason for tickets going well over estimation. Can you suggest a process to minimise this delay? We do not want more than 2 rounds of QA testing for any ticket unless there is additional requirements from client. When a ticket is pushed to Anoma for testing, please ask QA to go through all requirements and confirm whether it is working. If they are only checking the newly added aspect, there is a chance that something else might have broken."**

---

## Active Ticket Status (all non-Done/non-Cancelled)

### 🔴 Critical — Over estimate OR multiple QA cycles

| Ticket | Summary | Status | Est | Spent | Over | QA Returns | Maddy Returns |
|--------|---------|--------|-----|-------|------|------------|---------------|
| **LIFM2-409** | Import Shopify payouts | Testing - Anoma | 80h | **97.3h** | **+22%** | **9** | 2 |
| **LIFM2-439** | Listed-Cons tab changes | To Do | 12h | **21.5h** | **+79%** | **5** | 0 |
| **LIFM2-431** | Bulk listing price performance | Done | 8h | **25.5h** | **+219%** | 5 | 2 |
| **LIFM2-432** | Listed - Buy tab changes | Done | 3h | **8.5h** | **+183%** | 4 | 1 |
| **LIFM2-367** | Check drag functionality | To Do (On hold) | 15h | **17.5h** | **+17%** | 0 | 0 |

### ⚠️ Warning — No estimate set + large spend, or 3+ QA returns

| Ticket | Summary | Status | Est | Spent | QA Returns |
|--------|---------|--------|-----|-------|------------|
| **LIFM2-268** | Create email templates | Customer Feedback | NO-EST | **407.3h** | 7 |
| **LIFM2-285** | Email Template Filtering [ON HOLD] | Review | NO-EST | **69.3h** | 6 |
| **LIFM2-259** | Bulk upload images to S3 | Customer Feedback | NO-EST | **72.8h** | 4 |
| **LIFM2-260** | Update Shopify products w/ images | To Do | NO-EST | **38.5h** | 3 |
| **LIFM2-295** | Sell page redesign [ON HOLD] | To Do | NO-EST | 39.5h | 2 |
| **LIFM2-434** | Quote Tool - AI MVP | In Progress | 32h | 17.5h (ok so far) | 3 |

### Active but currently clean

| Ticket | Summary | Status | Est | Spent | Note |
|--------|---------|--------|-----|-------|------|
| LIFM2-444 | Async Queue for Bulk Price Updates | Testing - Anoma | 15h | 12h | Maddy flagged 15s perf. issue Jun 18 |
| LIFM2-445 | Update Price Action button | In Progress | NO-EST | 0h | Just started |
| LIFM2-436 | Returns | Review | 15h | 12.8h | Under estimate so far |
| LIFM2-428 | Product Authenticity Certificate | To Do | 44h | 32.3h | Under estimate so far |

---

## LIFM2-409 Deep Dive (the ticket Maddy specifically demanded)

- **Created:** 2025-12-06 | **Age: 6.5 months** open
- **QA return count: 9** — returned from "Testing - Anoma" to "To Do" nine times
- Maddy herself pulled it back twice (once from "Ready to deploy" back to "To Do" on Apr 7)
- **Current state:** Anoma commented "Testing ok" on Jun 11 — but **nobody moved status to "Ready to deploy"**
- **Stalled 8 days** since Jun 11. No activity. Ticket is effectively done but orphaned.

**Action required:** Kai needs to move LIFM2-409 to "Ready to deploy" immediately — Anoma already approved it Jun 11.

---

## Pattern Analysis — Why Maddy is Unhappy

### 1. QA cycles are the core complaint (her own words)
Tickets with 5+ QA returns: 409 (9x), 268 (7x), 285 (6x), 439 (5x), 431 (5x), 432 (4x), 259 (4x), 260 (3x).
**Root causes per Maddy:** QA only checks newly-added aspect, doesn't regression-test full scope. Previous feedback not addressed before pushing to Anoma.

### 2. Estimate overruns without pre-approval
- Maddy's explicit rule (Jun 10 Slack): **15h threshold — must ask her before exceeding**
- Client is refusing to pay for extra hours not pre-approved
- Pattern: Kai runs over quietly, Maddy discovers post-facto, has to fight client
- Tickets already over: 431 (+219%), 432 (+183%), 439 (+79%), 409 (+22%), 367 (+17%)

### 3. Feedback not read before testing
- Jun 18: 260 — "previous feedback not addressed before pushed to Anoma"
- Jun 8: 443 — Maddy said Kai's approach was "incorrect", had to explain the requirement again
- Jun 6: PR 476 — "Why do we have all SQL and DB access logic inside the controller? ... this code looks like it is written by a junior developer"
- Jun 4: Client asking to expedite payouts/cons tab/fulfilled orders — "in board for a while"

### 4. Response lag
- Multiple "Are you there?" messages (Apr 28, May 27, May 28, Jun 1, Jun 3)
- Jun 18: 444 complaint + 434/439/260 → Kai replied "Ok, I will check" 2.5h later
- LIFM2-409: Anoma said "Testing ok" Jun 11, still not moved to Ready to deploy 8 days later

### 5. Code quality concerns
- May 21 (PR 476): "SQL logic in controller, not model... constructed SQL using CASE instead of prepared statement... looks like written by a junior developer"
- Jun 6: Maddy set up Codex AI PR review pipeline to catch code quality before merge
- Jun 8: Maddy had to personally investigate and partially fix a bug on production

---

## Immediate Action Items

| Priority | Action | Ticket |
|----------|--------|--------|
| 🔴 NOW | Move LIFM2-409 to "Ready to deploy" — Anoma approved Jun 11, stalled 8 days | 409 |
| 🔴 URGENT | Kai to address 439 clarification questions from Maddy, get it live | 439 |
| 🔴 URGENT | Kai to address PR comments on 434 | 434 |
| 🔴 URGENT | Kai to explain why 260 feedback was not read before testing | 260 |
| 🔴 URGENT | Verify 444 queue implementation — Anoma says 15s, should be instant | 444 |
| 🟡 Process | Kai to respond to Maddy's request for a QA process proposal | All |
| 🟡 Tracking | All tickets >15h need Maddy approval before continuing | All |

---

## What the Daily Report Should Be Flagging (but hasn't been)

The daily Xtreme scan returns only 5 messages max from the Kai↔Maddy DM (the token is Kai's). The scan summarizes only "Kai daily report ✓" and discards everything else. **Every Maddy message should be flagged verbatim.** She is the client. Her messages about QA, estimates, performance, and code quality are all alerts.

Specific messages missed in today's report:
- Jun 18 22:54: Full 4-ticket complaint + QA process demand (above)
- Jun 10 15:13: Estimate overrun warning + 15h threshold rule
- Jun 11 01:09: "client has already raised questions... told me they won't pay us for extra work"
- Jun 8 06:34-08:17: "this approach is incorrect" on 443 + code quality demands
- May 21 14:39: "looks like written by a junior developer" on PR 476

---

*Unresolved questions:*
- Does Maddy have a separate DM with Carrick (not via Kai token) where she sends higher-level escalations? The long "Chien have a chat to Kai" message from user's original prompt was not found in any Xtreme channel — it may have been sent via WhatsApp/email/another channel.
- Is LongVV now taking over from Kai on this project, or is Kai continuing?
