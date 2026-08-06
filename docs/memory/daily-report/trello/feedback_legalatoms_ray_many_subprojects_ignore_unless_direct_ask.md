---
name: feedback_legalatoms_ray_many_subprojects_ignore_unless_direct_ask
description: "Raymond/LegalAtoms has many sub-projects; client Slack messages not directed at DuongDN = ignore, don't block Trello. Complete item unless it's a direct ask to us."
metadata:
  type: feedback
---

Raymond (LegalAtoms) has MANY sub-projects, and not every client message is about our work. Do NOT treat every LegalAtoms client Slack message as a DuongDN action item.

**Why:** 2026-08-06: miratariq (client) reported someone e-filed in production using a test-looking email (`jamesandersonla2026+3rdaug@gmail.com`), suspecting one of our team tested in prod. I flagged it as Alert #2 and left the Raymond Trello item incomplete ("unaddressed"). User: "có nhắn gì mình ko, ko thì ignore, Raymond rất nhiều sub dự án, ko phải cái nào cũng liên quan mình, ghi memory và complete item" — the message was NOT directed at DuongDN, so it wasn't our action item. Complete the item.

**How to apply:**
- When a LegalAtoms client message appears, check: is it a DIRECT ask to DuongDN (mention/@/addressed to us)? If no → ignore, complete Raymond - LegalAtoms Trello item.
- Only block the Raymond Trello gate on (a) a direct ask to us, or (b) Nick-specific alert (per `reference_trello_gate_mapping` — "LegalAtoms Slack (Nick mentions)").
- General client chatter in LegalAtoms workspace is not a DuongDN action item — many sub-projects, most unrelated to our scope.
- If a message IS a direct customer question/ask addressed to us, that's a real alert (see [[feedback_customer_direct_ask_universal_gate]]).
