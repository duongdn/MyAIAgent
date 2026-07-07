---
name: feedback_customer_direct_ask_universal_gate
description: Universal rule across ALL monitoring commands and ALL sources — detect direct unaddressed customer asks/requests and flag as warnings, never just "did someone post"
metadata:
  type: feedback
---

Applies to EVERY project, EVERY source (Slack, Matrix, Discord, Email, MS Teams), EVERY monitoring command (daily-report, weekly-report, monday-report, bailey-*, cdf-monitor, etc.) — not just the Franc/RDC incident that triggered this.

**Why:** [[feedback_franc_rdc_customer_ask_not_flagged]] — Franc/RDC was marked clean despite dmetiner directly asking Carrick to investigate a device failure + reorganize plugins ahead of a shipment deadline, with only "let me check" and no follow-up 25h+ later. User escalated: "Not only Franc, all projects, you are my assistant, you must aware such thing to warning me." This is a standing instruction to catch customer-facing risk across the whole portfolio proactively, not per-incident after being caught.

**How to apply — for every source, every project, every run:**
1. Never summarize a client/customer channel by activity count or "X posted, so it's an update, clean." Read the actual message content every time.
2. For every customer/client message found, ask: is this a direct ask, question, complaint, or deadline-tied request? Is it still unanswered, or only acknowledged ("let me check", "noted", a reaction emoji) without a substantive resolution?
3. If yes → WARNING, regardless of which project/source. Do not complete the Trello/checklist item for it. State it explicitly in the report — don't bury it in a summary table cell as "✓ clean" or "N msgs."
4. Applies uniformly to: Slack (Franc/dmetiner, Maddy/Xtreme, Aysar/Baamboozle, Elena/SamGuard, etc.), Matrix (Fountain/Kunal, Arthur/Meta-Stamp, Elena rooms), Discord (AirAgri/Vinn, Bizurk), Email (all 10 accounts), MS Teams (Philip/Six Star Rentals).
5. Distinguish from internal dev-topic chatter ([[feedback_project_topics_not_alerts]]) — that rule is about OUR team discussing bugs/features among ourselves, which is NOT an alert. This rule is the opposite case: the CUSTOMER directly asking us for something, unresolved.
6. When any client/customer channel had activity, default to reading the full thread ([[feedback_read_full_room_transcript_not_grep_snippets]]) rather than trusting a keyword/count summary — that's how the Franc miss happened.
