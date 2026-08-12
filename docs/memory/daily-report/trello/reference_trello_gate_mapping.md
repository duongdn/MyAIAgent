---
name: reference_trello_gate_mapping
description: Exact gate criteria per Check Progress Trello item — what must be checked before completing each item
metadata: 
  node_type: memory
  type: reference
  originSessionId: af2513cb-f81f-4d95-9e41-d22b3d7382e4
---

# Trello Check Progress — Gate Mapping

Each row = one checklist item on the "Check Progress" card (board O83pAyqb).
**Complete item ONLY when ALL listed sources are clean (no alerts).**

| Trello Item | Gate Sources | Alert = skip |
|-------------|-------------|--------------|
| Maddy - Carrick/Kai/Luis | Xtreme Slack (Kai activity) | Kai absent/no report |
| John Yi - Amazing Meds | Amazing Meds Slack + **TuanNT task log** | TuanNT 0h |
| Bailey | GGS Slack (Nick) + **TuanNT task log** | TuanNT 0h (TuanNT = Bailey DEV1) |
| Rebecca (William Bills) | William Bills Slack + **TuanNT task log** | TuanNT 0h |
| James Diamond - Vinn | AirAgri Discord (nusvinn) | Vinn no daily report |
| Rory | Swift Studio Slack (Carrick activity) | Carrick absent |
| Elliott | Generator Slack (Elliott/Violet) | Elliott no activity |
| MPFC | MPFC Slack | No activity |
| Marcel | Equanimity Slack | Marcel/Carrick alert |
| Elena - SamGuard | SAM GUARD Slack + Elena PRs | Elena alert |
| Raymond - LegalAtoms | LegalAtoms Slack (Nick mentions) | Nick alert |
| Neural Contract | Neural Upwork messages | No activity |
| Andrew Taraba | Bizurk Discord (nuscarrick DM "animeworld") | No DM activity |
| Colin | Aigile Dev Slack | No activity |
| Aysar | KhanhHH task log (Aysar sheet) + Baamboozle workspace activity | KhanhHH 0h |
| Franc | RDC Slack (dmetiner updates) — read full msg text, not just "posted" | dmetiner posts a direct unanswered/unresolved ask (deadline, bug, request), even if only "let me check" replied |
| Fountain | Matrix plan posted + no over-est spike | Plan missing OR spike |
| Elena - WordPress | samguard.co JS console check | JS errors |
| Philip | MS Teams (`will@nustechnology.com`) → Philip Briggs (Six Star Rentals, pbriggs@sixstarrentals.com.au) DM | Customer complaint or unresolved request |
| Upwork Memo | Upwork hourly workroom memos (Piece 15, `upwork-memo`) | Any invalid memo across Rory/Aysar/Bailey = ⚠️ skip; session/Cloudflare ≠ memo status → complete |
| Blake/SoCal | **DROPPED** as of 2026-05-11 | — |

## Key Rules

- **TuanNT task log 0h** → skip John Yi + Bailey + Rebecca simultaneously
- **Aysar gate = MPDM C07SQ4HAUHZ**, NOT Baamboozle workspace general activity
- 🔴 **REVERSED 2026-08-12 — Trello checklist item TEXT is NOT a live hold flag, it's static duplicate-card text.** The 2026-08-11 entry claiming "Elliott - GreenFort Capital - performance issue (pending)" should override clean Slack/sheets was WRONG — user corrected directly: "tên của checklist ko quan trọng, nó là card duplicate mà" (the checklist name doesn't matter, it's a duplicate/recurring card). The "Check progress" card is recreated by a Trello Power-Up on a recurring schedule, and item names get cloned verbatim from the template each time — they do NOT get edited live to reflect current status. A parenthetical note like `(pending)`, `(RISK)`, `HẾT TASK` etc. in an item's name is leftover/descriptive template text, not a signal anyone is actively setting per-day. **Gate items ONLY on the live data source check (Slack/sheets/Workstream per the table above) — never on the item's own name text.** Confirmed live investigation 2026-08-12: the GreenFort "performance issue" text referred to a Booking Requests Calendar-view slowness ticket last discussed 2026-05-18, already fixed via MR — 2+ months stale, unrelated to any current status. If item text ever seems to describe something concerning, that's useful CONTEXT to look into via the actual source (Slack/GitHub/etc.), not a reason to hold the item on its own.
- **Task-log 0h sends reminder** but does NOT block Trello items for Slack-only gates (Franc, Aysar, etc.)
- **Slack quiet ≠ complete** if item also requires task-log check (John Yi, Bailey, Rebecca)
- **"nghỉ cả ngày"** in any dev's sheet = leave day, 0h OK, no alert, no reminder

## Common Mistakes to Avoid

1. Using task-log 0h to block Slack-only items (Franc, Aysar, Bailey-GGS-side)
2. Completing task-log-gated items from Slack alone (John Yi, Bailey, Rebecca)
3. Missing leave notes ("nghỉ cả ngày") and flagging 0h as alert
4. Skipping MPDM C07SQ4HAUHZ and treating Baamboozle workspace quiet as Aysar check
5. **Treating checklist item NAME TEXT as a live hold flag** — it's static duplicate-card text, not a per-day human signal. Gate only on actual source data.
