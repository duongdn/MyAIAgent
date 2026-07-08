---
name: project_monday_effort_verify_thuyltt_context
description: Context behind /me:monday-effort-verify-with-thuyltt — ThuyLTT's weekly hour summary is Workstream-derived, not an independent source
metadata:
  type: project
---

Created 2026-07-08: `/me:monday-effort-verify-with-thuyltt` (`.claude/commands/me/monday-effort-verify-with-thuyltt.md`) verifies DuongDN's own weekly hours as confirmed by ThuyLTT in Matrix room `!oofREYAXHsvPWEOJev:nustechnology.com` against live Workstream/Sheets data.

**Why:** ThuyLTT posts a weekly "tổng kết giờ làm" image every week, but it's generated FROM Workstream — not an independent check. Root-cause case (2026-07 W27): DuongDN forgot to log hours into Workstream for Raymond Huang - LegalAtoms; ThuyLTT's summary correctly showed nothing (Workstream had nothing), so the "gap" was DuongDN's own missed data entry, not her error. He asked for a command to double-check her file against real Workstream data going forward — this command is that ask.

**How to apply:** Default week = last week (command runs Monday, per user: "default là last week nha, do sẽ chạy thứ 2"). Core check is NOT "do the two numbers match" — it's "does DuongDN have real hours (Workstream/Sheets) for a project that's silently absent from ThuyLTT's image." Authenticated Matrix media API (`/v1/media/download/`) worked on first try.

**First real test run (2026-07-08, week 2026-06-29 to 2026-07-05) — validated the core check:** found LegalAtoms had 2h logged (2026-06-30) invisible in both ThuyLTT's image (cropped screenshot, column off-frame) AND the generic `/time/projects` self-membership list — required a direct per-project-ID query to surface. Confirms the command's central value.

**User correction after this run — the flag must be bidirectional, not one-sided:** a project missing from ThuyLTT's image can be caused by (1) DuongDN's own logging gap (hadn't entered hours yet when she compiled — the original case) OR (2) her own reporting gap (hours were already in Workstream but she still missed them). User: "cần make sure check ngược lại là có khả năng có trên workstream mà ThuyLTT quên report." The command must surface both possibilities, not default to blaming DuongDN. Command file updated accordingly (Step 7/8 + gotchas).

**Also from this run:**
- Speedventory (Bailey Joey): DuongDN's hours there are NEVER in Workstream (manual authorized charge) — confirmed 0h-expected exception, not a gap. User: "Bailey ko có trên workstream, tạm ignore nha."
- Elena Klebanov (SamGuard?) and Celine Fierro (OhCleo) are Workstream projects NOT in `reference_workstream.md`'s 17-project list and not returned by self `/time/projects` either — a similar blind spot to LegalAtoms. Celine/OhCleo is brand new as of this week per user ("Celine thì từ tuần này, ok vậy done") — acceptable to be unverifiable for now; revisit only if it stays unverifiable after a few more weeks. `/admin/projects` = 403, no listing endpoint found yet to discover their IDs.

See also [[feedback_decrypt_secrets_clobbers_live_tokens]] — hit and fixed the Matrix token-clobber bug while building/testing this command. Also observed Matrix access tokens are short-lived (expired twice within ~1h during testing) — expect multiple refreshes per run.
