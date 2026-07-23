# Matrix — since 2026-07-23 08:00 +07:00

Summarized from 568 raw messages across 23 active rooms (of 136 joined). See `daily-report.md` for the condensed action-items/key-updates version used in the daily report.

**Bailey - Upwork review (`!aaumKvfltGlhqcQjJP`):** binhnt logged an Upwork review remove-low-activity note for Blair Brown; DuongDN confirmed the customer has gone silent on a separate item.

**Building notice (`!hMXIevjlYxLqftDvXE`):** routine PCCC (fire-safety) maintenance notice, no impact on work.

**John Yi / Contract Probe (`!knbJbIKzXRJNGVFQNg`):** TuanNT pushed a fix directly to staging then merged to master for contractprobe.com.au at Neural Contract's request; some confusion over whether merge-to-master auto-deploys to production (it doesn't — client deploys separately), resolved in-thread.

**LongVV personal room (`!mYZBGNoLFVpMVIJtPu`):** DuongDN approved LongVV's leave request.

**Colin/ETZ + LongVV Marcel task room (`!oGYjbzEfphvvauBZtq`):** Colin needs KhanhHH ~2.5h (Elena-only impact, confirmed no other project affected); LongVV's Marcel task released as done, LongVV approved for time off.

**LeNH reminder room (`!OIrgPraJWrcDTnRVLQ`):** DuongDN reminded LeNH that 22/07 task log hours aren't updated yet.

**Training room (`!RhKtmpPaaFiIvnrIFj`):** daidv note that training hasn't happened yet today — informational.

**KhanhHH/Generator room (`!rwLbvLBnrRAYMaOPaD`):** DuongDN shared GoDaddy/IAM credentials for a client site handoff (Kevin Kung/Codeorange, see below).

**PHP team general (`!WUDLGWqAONGymzPujw`):** PhucVT shared an unrelated Reddit link about screen-recording-to-skill automation; casual, no action.

**Neural Contract email forward (`!zfXpcHSkwqWylFrApi`):** client thanks for a fix, asks for a Bitbucket commit ASAP — appears already actioned per the John Yi/Contract Probe room above.

**Arthur - Meta-Stamp (150 msgs):** Team (TienND/PhucVT/NamTV) confirmed the 65h fixed-price scope with Arthur/Chris via Trello — Chris confirmed "those two cards are the whole fixed-price scope, nothing else, no new cards coming." 3 milestones planned: M1 (The Meter Release) done tomorrow with one minor YouTube-connect verification issue remaining; M2 essentially done, pending P4 for smoother payment; M3 with Phuc, detail TBD. Proposed release schedule: M1 Mon, M2 Wed, M3 Fri next week — team noted branches need care to avoid collisions given the compressed timeline. Billing housekeeping: this week charged 12h to Arthur under Nick's name via Scrin.io (cleaned up unrelated tracker entries); David's own hours not yet charged, pending Nam's confirmation with Chris on how David's time nets against the fixed price. No new client-facing red flags (no unanswered questions, no payment friction) found in this room this pass.

**Bailey - Management (`!...`):** binhnt/trinhmtt — a live bug fix is landing tomorrow, pending customer test confirmation before being closed out.

**Colin - Management:** kietnvt requested KhanhHH for an urgent ~2.5h ETZ/Colin fix — same item as the Aigile Dev Slack thread (checkout $NaN bug), confirmed by NamTV.

**Delivery - Resource Arrangement:** namtv logged a same-day plan change for PhongTH (24/07: off instead of remote, per family/childcare reason, HaVS covering on the Alex project) and an Elena PT reassignment (TienND2 covering, per anhnvn/namtv agreement). Neither entry involves the 5 PHP-team devs this report gates on (LongVV/PhucVT/TuanNT/KhanhHH/LeNH). "halt" separately confirmed all this week's noted leaves are processed.

**Delivery Department:** kietnvt requested LongVV join a new client project (Codeorange, Kevin Kung) as Web Dev; NamTV approved, noted Workstream is now used for checklist tracking (already reflected there).

**Elena - Active Alerts (103 msgs, internal QA/dev only):** Team (samht/kietnht/anhttl/tuanntg/dongnv) worked through UI testing for a "closed alerts" view, a tag save/reset UX bug (fixed live), and a MongoDB index-name migration conflict on `app_reminder` flagged and being actively debugged by dongnv/kietnht. Purely internal platform work, no customer-facing issue, nothing needs your input.

**Kevin Kung - Codeorange (26 msgs):** GoDaddy site access handed off to LongVV/DuongDN (login issue resolved, OTP delivered via a secondary inbox), site flipped to production mode, new site confirmed live at ccanyc.org by LongVV and DuongDN — one cosmetic issue noted (page title still says generic "WP Engine Site", needs updating).

**Kunal - Fountain (43 msgs):** Normal PR-fix cadence — DatNT found and fixed a bug via a related upstream gem issue, VuTQ reviewed/merged and pushed a matching fix to InfinityRoses, which ThinhT/HungPN tested live on staging with minor follow-up UI polish (image loading attribute, build.css) resolved same day.

**Marcel - XID (40 msgs, Equanimity Slack mirrors part of this):** LongVV completed and shipped the sgbuildex trade-mapping merge requests; found and fixed a real data-mapping bug (Excel truncating "3.10" to "3.1") before release, confirmed with DuongDN, released to prod same day. Separately, DuongDN raised Marcel's screen-recording-of-work-time request in the PHP Projects room — NamTV pushed back strongly on the idea (tasks already have estimates, tracker should be sufficient) and leaned toward declining; see Equanimity Slack summary in daily-report.md for Carrick's own reaction to the same ask.

**NUS - Bailey - Paturevision (74 msgs):** Real bug: `booked_today` scope was double-counting orders also tagged "To be Shipped"/"Awaiting for Pickup" on the Console dashboard. DatNC reported, TuanNT/HaVS diagnosed live, reverted and re-scoped on staging, confirmed fix, planned for LIVE the following morning (deferred one day since it's stock-related, wanted to be safe). Separately reviewed the Prestashop→Console sync auth model (which "tenant" identity syncs orders) — confirmed current live behavior is safe (uses the correct per-tenant auth, no dual-tenant collision risk), agreed to remove now-dead `booked_today`-related code once the fix is fully verified.

**NUS - Colin - ETZ (15 msgs):** Real prod bug — checkout showing $NaN price for some customers, root-caused by an intermittent incomplete-cart API response (likely a deleted/changed product still referenced in a saved cart). Carrick diagnosed and deployed a fix + clearer fallback message; Colin confirmed with the customer it's now working. KhanhHH separately took an urgent 2.5h-estimated fix on the same project, deployed to production, confirmed working by Luc.

**PHP Projects (12 msgs):** Marcel's screen-recording ask discussed and pushed back on (see Marcel/XID above) — decision pending your final call.

**Potential - Virtual Pantam Playground (54 msgs):** Estimate/WBS finalization for a new prospective client. DuongDN provided the estimate (assuming AI-assisted development, Angular tech stack, "option 0" scratch-build basis), answered clarifying questions on rounding precision and what the numbers assume, and anhnvn finalized/shared an external view-only WBS link with the client rep (aliased as "Carrick Nguyen" for this engagement). Delivered same day.
