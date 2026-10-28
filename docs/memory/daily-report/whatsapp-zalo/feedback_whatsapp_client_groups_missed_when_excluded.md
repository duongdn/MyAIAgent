---
name: feedback_whatsapp_client_groups_missed_when_excluded
description: WhatsApp excluded from default run hid real client asks (Marcel Xid DEX deadline, Saul MPFC) — user expects them noted
metadata:
  type: feedback
---
2026-10-28: user "Marcel có msg WhatsApp, sao ko note". Cron/recheck skipped WhatsApp (Piece 16 excluded by default, token-heavy). Missed: "Xid urgent" group — Marcel fwd DEX notice, UAT API auth mandatory from 2026-11-01; Saul (MPFC) "set up manual" + IDP requirements.

**Why:** client asks live in WhatsApp (Marcel/Xid group, Saul MPFC); exclusion = blind spot.
**How to apply:** every recheck (after 08:00, PC on) run `node scripts/whatsapp-monitor.js --since=<last_run>` at least — cheap when only 2-3 chats recent. Client chats (Xid urgent, Saul +44 7903 871230) → alerts. Related: [[project_whatsapp_zalo_cdp_monitor]], [[feedback_mpfc_saul_replies_via_whatsapp]].
