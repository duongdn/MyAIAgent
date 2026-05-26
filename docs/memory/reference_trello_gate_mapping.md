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
| Aysar | Baamboozle MPDM **C07SQ4HAUHZ** (daily report) | Aysar no daily report |
| Franc | RDC Slack (dmetiner updates) | dmetiner alert |
| Fountain | Matrix plan posted + no over-est spike | Plan missing OR spike |
| Elena - WordPress | samguard.co JS console check | JS errors |
| Blake/SoCal | **DROPPED** as of 2026-05-11 | — |

## Key Rules

- **TuanNT task log 0h** → skip John Yi + Bailey + Rebecca simultaneously
- **Aysar gate = MPDM C07SQ4HAUHZ**, NOT Baamboozle workspace general activity
- **Task-log 0h sends reminder** but does NOT block Trello items for Slack-only gates (Franc, Aysar, etc.)
- **Slack quiet ≠ complete** if item also requires task-log check (John Yi, Bailey, Rebecca)
- **"nghỉ cả ngày"** in any dev's sheet = leave day, 0h OK, no alert, no reminder

## Common Mistakes to Avoid

1. Using task-log 0h to block Slack-only items (Franc, Aysar, Bailey-GGS-side)
2. Completing task-log-gated items from Slack alone (John Yi, Bailey, Rebecca)
3. Missing leave notes ("nghỉ cả ngày") and flagging 0h as alert
4. Skipping MPDM C07SQ4HAUHZ and treating Baamboozle workspace quiet as Aysar check
