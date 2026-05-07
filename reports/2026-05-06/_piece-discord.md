# Discord Piece — 2026-05-06

**Window:** 2026-05-05T09:30:00+07 → 2026-05-06T08:28:55+07 (~23h)
**Token verification:** nusvinn ✓ (Vinn, vinn@nustechnology.com) / nuscarrick ✓ (Carrick, carrick@nustechnology.com) — both /users/@me passed, no refresh needed.

## Summary

| Server | Channels | Msgs in window | Daily reports | Status |
|---|---|---|---|---|
| AirAgri | airagri_webapp, airagri-flutter | 267 (218 + 49) | Vinn ✓ (webapp 17:15 +07), Jeff ✓ (flutter 17:30 +07) | OK |
| Bizurk | DM @animeworld | 6 | n/a (low activity) | OK |

## AirAgri detail

### #airagri_webapp (218 msgs)

Heavy day driven by James Diamond pushing urgent SMS/email-notification fixes and file-manager fixes to production. Mary blocked on staging account access (her email not on Vinn's account). Multiple PRs merged and deployed.

Key threads:
- 14:32–16:17 (UTC 07:32–09:17): Mary/Jon/Vinn/James debate SMS+email at 1AM bug. Vinn confirms cron now runs 07:00–15:00 AEST window only (level-3 only for SMS). Deployed staging then prod.
- 15:14–17:00 (UTC 08:14–10:00): James demands urgent prod push for file manager (rename/sort/view), 1AM-notification fix. Vinn deploys to prod ~08:39 UTC ("Done. I have deployed to prod").
- Leon merged PRs 359/361/363/348 (SDK file mgr, spray PPE hotfix, hazard-task assignment) and opened 371/372 (file naming + sorting). Vinn reviewed/merged.
- 17:15 +07 (10:15 UTC) — **Vinn daily report ✓**: "Just report my process today: ..." → PR #338/#327 review (staging), hazard/incident task assignment (need info), S3 self-test (done), open images new tab (dev done), review Leon/Jon PRs 371/372/368/366/359/363, hazard cron 07–15 AEST gate (deployed staging+prod), alarm issue check, all uploads → S3 (prod).
- Late session (UTC 01:03–01:27 = 08:03–08:27 +07): Jon asks Mary/James to confirm task-creation email; Mary still blocked on staging login (her email not on account); James asks who owns "Open Hazard" button on hazard view page (assigning to Vinn/Leon).

### #airagri-flutter (49 msgs)

- Visitor app form bug for "Withcott Seedlings - Helidon" — James escalated; Jeff investigated (no form configured on web side initially), then Jeff fixed and rebuilt.
- Map work: default map shows areas/names only; Save Current View / Manage Views / asset filter / primary area filter.
- Form submit API returning error on signature payload — Vinn fixed quickly.
- 17:30 +07 (10:30 UTC) — **Jeff daily report ✓** (8 hours): Visitor app fix + new build (done), areas-only home map (done), MyView section API integration (done), map view switching (done), Save Current View (done). Next: Manage Views, Asset Filter, Primary Area Filter. Deployed iOS TF 1.0.3(2) on Visitor app.
- Jeff also pre-approved 8h with James earlier in window.

## Bizurk DM (animeworld)

6 msgs in window. Discussion of Upwork contract (new contract via agency) for the WordPress landing-page job. Andrew Taraba: no activity (expected, low-activity user — NOT an alert per project rules).

- AnimeWorld 13:21+07: "is it with you or agency?"
- Carrick 14:44+07: "With agency as normal. I'm not freelancer"
- Carrick 14:49+07: explains mockup-vs-figma reasoning re Angular feedback ("This is hard to make 100% similar with the mockup")
- Carrick 15:02+07: "BTW, I updated the arrow icon"
- AnimeWorld 16:19+07: "Mockup will never be made with figma" / "It's always going to be an image"

Carrick remains active and responding; minor friction with client over Angular delivery match-to-mockup but not blocking.

## Alerts

| Sev | Server | Item | Notes |
|---|---|---|---|
| — | — | None | All target users posted daily reports. Tokens valid. No auth/access failures. |

No alerts.
