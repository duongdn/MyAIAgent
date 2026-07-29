# Matrix — since 2026-07-28 08:00 +07:00 (15/136 active rooms, 304 msgs)

### Precognize (AA board) — 86 msgs
Team (samht/kietnht/anhttl/tuanntg/duyvna) building audit-log feature — UI polish vs design/requirement mismatches worked through live, released to staging EOD, one case (close alert) still needs retest tomorrow. Normal dev work, no blocker.

### Bailey - Paturevision (stock bug) — 88 msgs
TuanNT + DatNC + HaVS spent most of the day (09:19-15:30) diagnosing a `booked_qty` data bug (stale/duplicate stock rows, tenant_id mismatch in a Sidekiq job). Root cause found (missing `acts_as_tenant/sidekiq` require), fix deployed ~15:30. Real, substantial TuanNT activity this day — not a 0h day.

### LongVV personal room — 2 msgs
Routine (localhost dev link, "updated").

### Upwork/Brad Ballantine (New Sites) — 8 msgs
namtv relayed Brad's Crazy Domains login details; DuongDN confirmed handling replies since 07-20, agreed to proactively flag future BD follow-ups.

### Training room — 4 msgs
daidv: still finishing other tasks, not training yet; will ping when starting — DuongDN OK'd ad-hoc timing.

### Arthur - Meta-Stamp — 4 msgs
TienND: M1 review blocked at YouTube-connect step on staging — Google returns "Access blocked" — flagged to namtv, who acked. **Needs follow-up** (see Piece 13).

### Bailey - Management — 2 msgs
namtv chasing TrinhMTT; bug found in testing, fix pushed, re-test tomorrow.

### BDD - Delivery — 1 msg
namtv: prospect still hasn't replied, low probability; dev capacity tight regardless.

### Celine - OhCleo — 3 msgs
DuongDN asked when LongVV restarts; MinhTV: Thu/Fri, 4h/day, task type (mobile vs BE) still TBD.

### Delivery - Resource Arrangement — 10 msgs
Leave/absence log processed for SamHT, DatNT, ThangN, HauTT, HaVS, TinPC, VinhNT — routine HR housekeeping, all noted/actioned by HaLT/namtv.

### Kevin Kung - Codeorange — 8 msgs ⚠️
lucnt relayed client (Kevin) asking for a quote to rebuild a page using native WordPress functions instead of the current Angular-in-iframe setup. DuongDN replied same day (13:33) asking for clarification on scope — **acknowledged, not yet quoted**, needs follow-up.

### Kunal - Fountain — 18 msgs
Team routine: security checklist assignments (C1-C4 across FE Fountain/Infinity), a 2024 hotfix comment questioned/explained, 2 Trello cards (blog) moving through QA. No blockers.

### Maddy - Xtreme Soft Solutions — 10 msgs
DuongDN flagged to LongVV that Maddy "looks out of tasks"; separately Minh Trinh asked about an unfamiliar "Integra ETC" app — team confirmed NUS has no ownership, referred back to Maddy.

### Marcel - XID (Equanimity) — 56 msgs
DuongDN + LongVV worked a full day on SGBuildIndex (QPSS/Manpower API), deployed fixes, tested with LongVV, promised customer (Komal) an answer by 10am next day pending UAT account access. Active, well-managed, no unresolved customer ask.

### PHP Projects — 4 msgs
Blair Brown back with small new requirements (being estimated before starting, per his own prior commitment); namtv reminder to chase his outstanding payment.

---
### ⚠️ Action items for DuongDN (1)
| Room | Time | Message |
|------|------|---------|
| Kevin Kung - Codeorange | 13:27 | lucnt: "Giờ ổng lại hỏi em nếu build nó theo native function của Wordpress thì tốn bao lâu, kêu mình đưa quote💀. Nhờ anh Dương hay anh Long xem qua giúp em chỗ này với." — DuongDN replied 13:33 asking for scope clarification; quote still not finalized.
