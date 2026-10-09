# Update - 2026-03-19 15:37

Monitoring period: Since 15:13 update

## Discord (CORRECTED — tokens valid, earlier 403 was transient)

### nusvinn — AirAgri
**#airagri_webapp (20+ msgs):** Active discussion between Vinn and James Diamond (.jdiamond).
- Vinn clarifying device stopped vs SOS alarm distinction
- Vinn showing alarm action screen mockup → James says change blue button to AirAgri green
- James requesting full investigation on Traccar data
- Vinn asking about device type — seems related to Paul's earlier issue

**#airagri-flutter (5 msgs):** Jeff posted daily update — continuing Notify MD + Classify & Assign Investigation for incidents. James flagged green color on Yes/No buttons (wrong shade, should be brand green). Jeff acknowledged.

### nusvinn — HOMIEAPP
No activity today. Some channels have Missing Access.

### nuscarrick — Bizurk
No activity today across all channels.

## Discord Alerts

- **AirAgri: James requesting "full investigation" on Traccar data** — may be a priority item for Vinn
- **AirAgri: Brand color consistency** — James flagged wrong green on multiple screens (alarm action buttons, yes/no buttons)

## Corrections to 15:13 Update

- ~~Discord tokens expired~~ → Tokens are valid. The 403 was transient (rate limit or network issue).
- Removed "Refresh Discord tokens" from action items.

## Matrix — Fountain Room (FIXED — token refreshed)

Active today (~40 msgs). Key participants: ViTHT, ThinhT, HungPN, TrinhMTT, VuTQ.

**Activity summary:**
- **VuTQ** pushed to live (card requested by TrinhMTT) — done at 09:46
- **ThinhT** deployed Redmine #77762 fix to staging
- **ViTHT** working on GiftDrop link + redemption FAQ section (#2744), proposing shared Accordion component for all FAQ sections
- **HungPN** (QC) reviewing multiple cards: #2668 (corporate gifting), #2624 (order complete), #2615 (gift-of-choice). Found UI bugs on some.
- **TrinhMTT** (QC lead) coordinating — asking HungPN to double-check "not pass" cards, assigning ThinhT to fix
- Cards #2668 and #2624 moved to "not pass" by designer — UI bugs flagged
- Card #2624: ViTHT says all fixes done yesterday, Phat checked, designer may have missed "Done" label
- Gift-of-choice cards (#2615, #2742) — ThinhT pushing to finish

**No weekly plan message found in recent 50 messages** — plan was likely posted earlier in the week.

**Alerts:**
- Multiple cards moved to "not pass" by designer — active QC cycle, not blocked but high churn
- Team actively working, good coordination between devs and QC

## Fountain Trello Board (Web Development)

### Active Task Counts
| Status | Count |
|--------|-------|
| To-Do | 37 |
| Bugs | 16 |
| Doing | 3 |
| QC Internal | 6 |
| In QA | 1 |
| Not passed | 2 |
| **TOTAL ACTIVE** | **65** |

### Customer Messages Today (2026-03-19)
- **Kunal** on [Remove Automatic Out of Stock](https://trello.com/c/oHJ5YO8y): asks Rick to remove auto out-of-stock, something buggy with system
- **Kunal** on [GiftDrop- New redemption flow](https://trello.com/c/DfP5ExzX): asking tmmckay about card image from card page

### Not Passed (needs attention)
- [Order complete - Update](https://trello.com/c/5eQEjmOB) — today. ViTHT says fixes done, designer may have missed "Done" label
- [Giftdrop link - FAQ section](https://trello.com/c/RaKovm1i) — today. Rick acknowledged tmmckay's detailed comments, will update

### Stuck Tasks — Cross-referenced with Est vs Actual (Google Sheet)

**[#2640 GiftDrop Preview](https://trello.com/c/poDqYoiE/2640)** — 42d in Doing
- Dev: **LamLQ** | Est: 12h | Actual: ~6.75h (In-progress <50%)
- Idle W1-W9, only clarified in W10 (0.75h). Started real dev in W12 (6h: preview + enable pages)
- **Why stuck:** Wasn't started for 9 weeks despite being in Doing. Now progressing.

**[#2695 New Redemption flow](https://trello.com/c/DfP5ExzX/2695)** — 37d in Doing
- Dev: **LamLQ** | Est: 20h | Actual: 4h (In-progress <50%)
- 0h logged W1-W12. Only started W13 (this week, 4h).
- **Why stuck:** Not started until this week. Sat in Doing 5 weeks untouched.
- **Risk:** Related parent [#2595](https://trello.com/c/DfP5ExzX) is **168h actual vs 120h est (+40% over)**, still growing. W10 alone was 34.5h.

**[#2666 Delivery section](https://trello.com/c/EoG6XcQe/2666)** — bounced Doing↔QC 4 times
- Dev: **LamLQ** | Est: 2h | Actual: ~4.5h (Deployed on Staging)
- W11: 2h, W12: 2.5h extra (refactor + fix)
- **Why bouncing:** Unclear specs, QC keeps finding UI issues. 2x over estimate on a small task.

**[Delivery dates issue](https://trello.com/c/oHJ5YO8y)** — 48d in QC Internal
- Est: 20h | Actual: 21.5h (Deployed on Staging)
- Created May 2025, bounced Live→QA→Bugs→Doing→QC. 10+ months old, chronic.

**All 3 active stuck tasks assigned to LamLQ** — juggling multiple cards, tasks sat in Doing weeks before work started.

## Remaining Action Items

- [x] ~~Refresh Matrix access token~~ — done, token updated + auto-refresh via OIDC
- ~~Check Precognize PR #4788~~ — not nusken-authored, skip per workflow rules
