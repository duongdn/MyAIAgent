# Matrix — since 2026-08-13 08:00 +07:00

Active rooms: 34 / 139 | Messages: 786

## Key updates

**Bailey (Workstream migration)**: binhnt confirmed WS "add budget" tag now live; only Bailey still on old process, moving over from next week.

**LongVV (Maddy/OhCleo split)**: DuongDN followed up on 08-12 shortfall (6.17h found); LongVV explained remaining hours were on Kevin Kung/Codeorange (1h50m) — 08-12 confirmed full 8h once combined. namtv/DuongDN discussed reallocating LongVV off Celine (too many Maddy tasks incoming) — Brad Ballantine site work likely moves to TuanNT/PhucVT instead.

**KhanhHH**: DuongDN confirmed 08-12 total (5.17h: Radio Data Center 4.5h + Baamboozle 0.67h) — acknowledged.

**LeNH**: DuongDN asked LeNH to check 08-12 task log (showing 0h in both sheet + Workstream) — no reply visible in this window yet.

**Bailey/Paturevision — near-miss caught**: TuanNT attempted RDS version upgrade directly against the LIVE database; DuongDN caught it immediately ("làm bao năm kinh nghiệm rồi mà còn dính cái này"), TuanNT switched to the safe approach (new RDS instance + staging data restore). Also actively worked PR #293 (fallback fix, reviewed by HaVS) and mailcatcher checks — real Bailey work done 08-13, not yet reflected in the task-log sheet as of this report.

**Equanimity/XID — Ken-Pal go-live (08-14, today)**: komal.bailur flagged at 21:58 that required fields are still missing/not populating in UAT ("please help to fix before sending data") — unresolved as of report time. Carrick told the team earlier the same day he'd be on leave "tomorrow" (08-14, today). ⚠️ Needs follow-up given go-live is today.

**Arthur/Meta-Stamp**: PhucVT relayed Chris's DM questions to TienND; TienND is handling a wallet-insufficient-funds payment bug + scope clarification for a new (unscoped, "thinking/planning only, not charged") feature request from the client.

**Fountain**: weekly plan posted Tue 08-11 16:30 by trinhmtt — ThinhT 4h, ViTHT 40h, DatNT 40h, LamLQ 16h, QC 25h. Team fixed a `/admin/order_items` regression (Rails 8 gem issue, same root cause hit on Infinity) and shipped PR #494/#495 for bottle-engraving + URL/nuqs improvements.

**Celine/OhCleo**: Very active — QC (hungpn) + dev (LongVV/luhx) iterating on content-preference filter bugs ahead of a mobile release; both iOS/Android builds approved and released 08-13 15:15. DuongDN/minhtv discussed reallocating LongVV's time given Celine's growing ad-hoc request volume; new team member (Phương) being onboarded to help manage client communication.

**Delivery - Resource Arrangement**: halt confirmed "Tất cả các nghỉ phép của Dev đã được xử lí" (all leave processed) 17:24. New notes: TienND2 out 08-14 (not on PHP team roster), VinhNT hospital trip 08-19.

**Elena - Active Alerts**: internal dev-topic thread (Java version upgrade estimation for AA service) — no customer-facing issue, informational.

**Brad Ballantine (PhucVT)**: hit the 14h Upwork budget cap as of 08-13 EOD; asked to request more hours from Brad.

## Other rooms (quiet/routine)
- Bailey - BA/QC: fixed-cost payment request follow-up (trinhmtt), routine.
- Marcel - XID: routine merge-request review ping, resolved.
- Newsletter Inform: internal company newsletter banter, no action needed.
- Kevin Kung - Codeorange: theme-rebuild scoping (rough 1-day estimate given), routine.
