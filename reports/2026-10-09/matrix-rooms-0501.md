# Matrix — since 2026-10-08 05:30 (+07:00), summarized 05:01 run

Active rooms: 23 / 150 | Messages: 534

## James – DefinitiveGuide (!1Mj0Tuln…)
- PhucVT moved TuanNT to the new build: Laravel 13 / PHP 8.3, branch `upgrade/cp2-laravel13`, on staging-upgrade.
- The empty `.env` was explained: the real file is `/srv/staging-upgrade/.env`, mounted over `/app/.env`. TuanNT switched Stripe to test mode and ran `stripe:plan`.
- TuanNT 15:50: fixed the free-plan `stripe_id` error and it works. Testing/fixing continues on the new branch.

## Precognize / Elena OP (!KGfMOd…, 209 msgs)
- Busy dev day: license view-history done (TuanNTG), search (TienND), draft-state ticket done but not deployed (KietNHT).
- Open requirement question: Data Exclusions default time window (1 year, compared against a configurable limit). The client is off 10-09, so the team wants confirmation early.

## Kunal – Fountain
- DatNT: Gift-of-Choice missing item fix on the Pro thank-you/checkout pages (FE + BE PR #539), reviewed by VuTQ and deployed.
- PR #509 (card 2895) went LIVE 12:03. DatNT is staging #600/#553/#601/#603/#534. #534 is waiting on Kunal's fix.
- ViTHT 13:42: **checkout layout broken on the Gift-a-Choice flow** (HungPN saw it too). Normal gift flow is OK.
- Out-of-stock display was caused by the `is sold out` attribute, not a bug.

## PHP Projects (Maddy invoice)
- namtv/chientx/duongdn discussed the explanation for Maddy's September invoice (15.75h not logged in JIRA: "Do mình quên log, manager cũng ko kiểm tra JIRA").
- duongdn rewrote the client message with an apology at 17:04. chientx will discuss point 3 with the client separately. It is not confirmed that the message reached the client.

## Potential – Wildsoul Wellness
- Class vs appointment decided (prefer class; drop-in for single visit, series for pack). QR offline design: signed pack GUID. Legacy pricing kept via promo code (demoed).
- duongdn updated the estimate. **anhnvn sent the doc to the client at 16:25 ✅** (yesterday's #6 resolved).

## Sandor – Lyf Support
- LongVV PRs #547/#548 merged and deployed, but the error persists and a different error now appears. **Prod has the same error**, so LongVV will report to the client with an estimate.
- MinhTV asked duongdn to support ("nhiều PR").

## NUS – Bailey – Paturevision 2026
- TuanNT posted yesterday's tasks 08:42 (#101 Advanced Split Order). He flagged that the task has 2h left and may overrun slightly if more bugs appear.
- duongdn 09:48 flagged the wrong task-log date, and TuanNT fixed it ✅.

## Other
- TuanNT DM: left 1h early 15:14 (bank), approved.
- Andrew Taraba – Portfolio: TuanNT will take an extra update, OK'd.
- Marcel/Komal (chientx forward): ZKTeco ask, duongdn "ok" ✅.
- Delivery – Resource Arrangement: TienND sick 10-08 (MyID not compensated).
- Bailey – Management: trinhmtt says the client will pay "nay mai".
- OhCleo/Streamline room: LuHX estimate for mobile home view = 6h.
- Rory BXR: LuHX picked up a ClickUp task, but Rory's explanation is unclear and LuHX is waiting on photos.
- Recruitment/NUS Technology: internal (BDM candidate dropped, survey deadline Fri 10-09).
