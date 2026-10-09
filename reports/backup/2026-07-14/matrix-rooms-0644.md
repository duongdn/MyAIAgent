# Matrix — since 2026-07-13 08:00 +07:00 (summarized)

**Active rooms: 26 / 132 | Messages: 490**

## Key updates

**Maddy (Xtreme)** — duongdn flagged in-room: "Alert thật — 3 PR Bitbucket Critical/High tồn đọng 18-37 ngày (Kai chưa fix)" — confirms the known PR-review backlog is still open. tuantt/madhuraka discussed LIFM2-428 cert display feedback (new scope, not original ask — LongVV to confirm with client before building).

**Bailey/Paturevision (Console)** — Extended TuanNT/HaVS/datnc debugging session on a stock-quantity discrepancy (multi-tenant `ActsAsTenant` scope bug on the orders view). Root cause found and a fix pushed to production, but numbers were still inconsistent afterward (3750→1150→600 across checks) — flagged as needing further review. duongdn told the team to proactively notify the customer about the bug/possible delay rather than wait to be asked.

**Fountain** — Routine PR review/bugfix traffic (74 msgs): datnt/vitht/thinht/vutq handling Infinity item-extras (#2954), blog PR (#490), and the FirstProject Rollbar error (#1056) duongdn asked to be fixed that morning — vutq confirmed it's live and no longer reporting.

**Elena - Active Alerts (Precognize AA4)** — Team planning for the week (Tuan Nguyen/Kiet Nguyen BE, Tri Nguyen FE), one Java config bug (`SERVER_HOST_IP` placeholder) resolved mid-afternoon, otherwise normal sprint coordination.

**Arthur/Meta-Stamp** — PhucVT/TienND/namtv worked through Stripe Connect setup for Chris's account; determined "standard" Connect doesn't support VN bank payout, still resolving which account/onboarding form to use.

**PHP Projects (Upwork contractor negotiation)** — namtv pushing duongdn to follow up with an unresponsive contractor re: resuming their contract + an Upwork bonus ($37.50→$41.67, corrected) owed from a June 29 dispute refund. No reply from the contractor as of 21:32.

**ThuyLTT / weekly hours reconciliation** — Discussion on Peptide Clyde actual-vs-charged hours (LeNH/KhanhHH) — ThuyLTT pushed back on the practice of overwriting "actual" hours to match "charge" amounts, flagging it as a process risk worth fixing going forward (not just this instance).

**Direct Manager (binhnt)** — Listed remaining jobs not yet migrated to Workstream (a few, e.g. Speedventory/Bailey Joey) — all other projects confirmed migrated.

**Resource arrangement** — Several dev leave/idle notes processed (VuTQ half-day, ThienVN, ToanNT sick, TinPC, LongVV's off-instead-of-remote change, ThoTNT wedding leave).

**Other (routine, no action needed):**
- Celine-OhCleo: longvv clarified a Trello status (in-progress vs ready-to-test) — routine.
- Francesca/RDC, James Diamond/Portfolio: routine task handoff (LeNH picking up Franc work, PhucVT covering James Diamond).
- Matrix compat token: namtv/duongdn confirmed the `mct_` token is a genuinely non-expiring compat token — resolved, no further action.
- Technology Department: dev-tooling tip thread (SSH key per-repo config) — FYI only.
