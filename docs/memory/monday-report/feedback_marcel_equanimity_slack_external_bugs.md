---
name: feedback_marcel_equanimity_slack_external_bugs
description: Marcel/Tokenlite external bugs must be checked via "Equanimity" Slack workspace — skill text "always 0" is wrong, same class of error as Neural/LegalAtoms/Taraba hours
metadata:
  type: feedback
---

Monday report's Marcel (Tokenlite) section says "External Bugs: Always 0" — this is wrong, same as the skill previously wrongly said Neural/LegalAtoms/Taraba dev hours are "always 0" (see [[project_monday_report_sheets]]). Marcel's actual client company is **Equanimity® (Blockchain) Holdings Pte. Ltd.** (Marcel Füssinger is the Owner/representative) — confirmed via Workstream `GET /pinfo/projects/cmqyvio4s000pqo0xdajw5n2k`'s `customer` field. This matches the **"Equanimity"** workspace already in `config/.slack-accounts.json` (xoxc session-token type, account carrick@nustechnology.com, channel `xid-technologies`).

**Why:** 2026-08-17 run reported Marcel external bugs = 0 by trusting the skill's "always 0" without checking Slack at all — there's no workspace literally named "Marcel" or "Tokenlite" so it looked like there was nothing to check. User caught it: "marcel có 3 external bug mà, ko check slack à?" (Marcel has 3 external bugs, didn't you check Slack?). Refreshed token via `slack-xoxc-refresh-equanimity.js`, searched `after:{sun}before:{mon+1}`, found 3 distinct bugs in the reporting week: device scan failures (missing clock-in/out), SGBuildex fields empty/UAT-prod mismatch, invalid per-worker FIN/NRIC data — all reported by komal.bailur (client-side coordinator) and/or escalated by Marcel himself.

**How to apply:** For Marcel/Tokenlite Monday report external bugs, ALWAYS search the **Equanimity** Slack workspace (channel `xid-technologies`) for the reporting week — never trust "always 0" from the skill text. Client-side reporters to watch: `marcel` (owner) and `komal.bailur` (project coordinator, relays Ken-Pal/SGBuildex team reports). Internal/our-side: `carrick` (dev), `mani.annadurai`. Apply the same merge-same-issue-thread / exclude-investigation-only rules as [[feedback_external_bug_counting_judgment_calls]].

Related: [[project_monday_report_sheets]] (same "always 0" pattern for Neural/LegalAtoms/Taraba hours)
