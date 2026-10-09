# Matrix — since 2026-08-12 08:00 +07:00 (summarized)

**Delivery - Resource Arrangement** — leave notes for 08-12: ToanNT (football injury, internal/idle time, no project charge), PhucVT (Chiều/half-day, "Không khoẻ", charged to Arthur no makeup), PhongTH (Chiều/half-day, "đưa bé đi khám bệnh", HaVS covers on Alex project). halt confirmed all leaves processed/noted. TienND2 PT (part-time?) confirmed by anhnvn.

**Arthur - Meta-Stamp** — PhucVT/TienND/namtv resolved a Stripe test-card 500 error on `/.well-known/ai-license` — old Stripe secret key stopped resolving in Stripe, PhucVT rotated to a new key, confirmed working ~10:04. namtv flagged (⚠️ action item for DuongDN): remind Arthur's team not to delete/rotate env keys without updating environment vars properly — a process note, not a new incident. See full Piece 13 Arthur check for the dedicated deep-dive.

**Brad Ballantine - Auction Warehouse** — PhucVT + DuongDN handled a client comms confusion: Brad said a "Nataly" messaged him on Slack/WhatsApp, but no one recognizes the identity. Resolved by having PhucVT email Nataly at auctionwarehouse9@gmail.com directly instead of WhatsApp. No outstanding unanswered ask.

**Celine - OhCleo** (74 msgs) — Active mobile-app UI/QA cycle (Hùng QC, LongVV/"Long Vo" dev, Lu Ho mobile builds) around content-preference filters (task #204), orientation/category filter definitions. LongVV posted his daily report at 17:05: "Fix start page. Content preferences." — matches the Slack DM report seen in Piece 12.

**Elena - Active Alerts / SamGuard WordPress** — normal dev work (audit-log logic, Java 21 upgrade sync discussion for AA repo — billing question raised, unresolved whether upgrade work is in-scope/chargeable, to be escalated to LA). SamGuard WordPress: KhanhHH got client to grant `site-settings-write` permission, confirmed working by EOD. No customer complaint, routine.

**Kunal - Fountain** (75 msgs) — high dev activity: ViTHT/ThinhT/VuTQ/HungPN/PhatDLT/DatNT (Infinity+Fountain shared-catalog QC), a stock-sharing/checkout edge case found and noted for later fix, PR #3022 (infinity-add-forth-gift-variant) reviewed and pushed by VuTQ. No unresolved customer ask visible in this window (Kunal himself didn't post). See Piece 6 for full 3-part Fountain check.

**Maddy - Extreme Soft Solutions** — TuanNT/LongVV discussing LIFM2-436 client comment (JIRA); LongVV asked DuongDN for ~0.5h to fix an out-of-scope popup display issue, DuongDN approved ("Có"). See dedicated Maddy section (Piece 2/8) for full 4-part check.

**Rory Hackett - BXR App** (65 msgs) — LeNH + KhoaTD working through a Klaviyo multi-site-ID/MB integration question for the client (Simon); resolved via Klaviyo docs research, plan is to submit a support ticket to Klaviyo to confirm no data loss before re-integrating. Ongoing technical work, not blocked.

**NUS - Bailey - Paturevision** — TuanNT handled a real production incident: SiteGround queue/abandoned-process pileup causing site downtime. Root cause found (runaway restart-queue script), fixed same morning (~09:15 "site đã lên lại"), formal root-cause report sent to client by TuanNT (13:24) citing SiteGround's process/resource limits — client acknowledged. Real TuanNT effort evidence for Bailey on 08-12.

**Kevin Kung - Codeorange** — LongVV handling WordPress site migration tasks (Instagram footer/header items, theme transfer needing dev credentials for a 3rd-party site) — routine, blocked only on client providing flywheelsites.com credentials (expected next day).

**Những chú voi con đáng yêu / Senior Devs / Technology Department** — internal chat: AI agent demo announcement, James Diamond project ownership history lookup (inconclusive — old git repo location unknown, TuanNT recalls it started on Bitbucket under a different dev, "Cường"), welcome-new-hire messages, DuongDN's tech-talk announcement. No action items beyond the git-history ask already answered inline.

**Other rooms** (Charles-Family, Elena-Digital Plant, Precognize-adjacent, GGS/internal ops rooms) — routine, no alerts.

### ⚠️ Action items for DuongDN
- **Arthur - Meta-Stamp** (10:05, namtv): explain to Arthur's team not to delete env-var keys casually; if rotating, must update env vars properly.
- **!DlcbJDCUZaUivhEXSb** (11:03-11:08, anhnvn): James Diamond/AirAgri project-history info request (who started it, when) — DuongDN researched live in-thread, inconclusive (old git repo deleted/moved), continued in "Những chú voi con đáng yêu" room where TuanNT recalled "Cường did it first, then Việt, originally on Bitbucket." Still open/soft — no hard deadline given.
