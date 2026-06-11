# Matrix — since 2026-06-10 08:00 +07:00
# Active rooms: 28 / 125 | Messages: 762

---

### Aysar Khalid - Baamboozle
- DuongDN notified KhanhHH of a customer message (14:19)
- KhanhHH checked + sent temp reply; Elliott release deferred to next day

### Bailey - BA/QC
- TrinhMTT sent invoice to client: Weekly Monitor 5h ($150), Prestashop Mobile Menu 13.5h ($405), GLS Console update
- Discussion on billing numbers: dev uses WBS est formula; "fixed cost" = number reported to client (separate from task log actuals)
- BinhNT confirmed payment received 22:08 — external + internal payment files updated ✅
- DuongDN reminder at 11:00: client hasn't paid weekly monitor yet (resolved by 22:08)

### Bailey - Management
- Same invoice confirmation as above; BinhNT confirmed payment and updated both sheets

### Celine - OhCleo
- LongVV active all day: working on premium/free track logic, "offer 1 month free" task, Android subscription payment fix
- PR #2 (FE) merged + deployed by DuongDN 14:11 ✅
- PR #13 (BE API) review requested by LongVV 14:56 — DuongDN pending
- PR #14 (Android Google service account payment 401) requested by LongVV 16:50 — DuongDN pending ⚠️
- BE slowness (>15s) reported by customer → DuongDN investigated + fixed 16:05 (connection keep-alive) ✅
- Android subscription validation failing (401 permissionDenied) → LongVV reconfigured Google service account key

### Delivery - Resource Arrangement
- Jun 10 sick/absent: TienND2 (fever, Arthur no cover), KhoaTD (family, Rory → TinPC covers from MyID), PhongTB AM (stomach, Kevin Kung no cover), ThinhPVD AM (unwell, Tony Berry no cover), AnhNH2 PM (child follow-up, Nestor no cover)
- Jun 11: ToanNT sick (fever) → idle, no coverage needed
- Jun 12: LamLQ off (family, MinhTC covers from MyID), HungTK off (family, idle)
- Jun 18-19: TamLH off (family + rest, Shai uses PL)

### Delivery Department
- TriNM being onboarded to Mikkel Routhe - Easy Rate project (anhnvn submitted request with 4 criteria)
- NamTV: all onboarding checklists must now CC namtv@nustechnology.com

### Direct Manager
- NamTV: new rule — share onboarding checklist with namtv@ after completion
- BinhNT: technical article submission form shared (forms.gle/...) — deadline to be confirmed
- DuongDN flagged workstream task log missing task ID field → makes it hard to track actual vs estimate per task; NamTV + AnnHVN: tagging system planned for this

### Elena - Active Alerts
- Active day on AA2/AA3: DongNV merged API change (latestStatusAction format: string → object with name+icon) that broke FE compatibility
- Fixed same day: DongNV added back old field alongside new one, deployed 15:10 ✅
- AA2 payment still partially held. AA3 est under dispute — KietNHT reviewed spec gaps (missing validations, audit requirement mismatch), sent feedback to Lena evening
- TuanNguyen (new dev) added to AA3 — reading code to get up to speed

### Elena - Digital Plant
- All 3 studio servers (studio-01, 02, 03) unstable Jun 10: studio-02+03 rebuilding (502), studio-01 had stale DB (only 22 items)
- TienND2 to restore studio-01 Jun 11 AM ✅ (confirmed 17:21)
- At 23:01: all 3 servers have old data, no active alerts — full restore needed
- AI usage policy email from client sent to Michelle — AnnhTTL to share with dev team

### Kunal - Fountain
- Cards 2871 (Infinity Build-a-Box) + 2934 (Shipping Cost) tested DONE by HungPN/PhatDLT ✅
- PR #453 merged to live by VuTQ ✅
- DuongDN relayed Kunal's message: Tom back tomorrow (Jun 11), move QC backlog to beta ready
- ThinhT: ActiveStorage::Blob not found warnings = 5000+ on Rollbar — likely cleanup needed
- DatNT requested Server Beta deploy access → DuongDN approved, to contact VuTQ

### Maddy - Xtreme Soft Solutions
- DuongDN apologized for task 431 overrun ("my mistake, didn't track estimate closely enough")
- Reminded LongVV: return to proper flow — est task → customer approval → JIRA → no shortcutting
- LongVV acknowledged ✅

### Những chú voi con đáng yêu (General team chat)
- DuongDN shared PHP conference stream link (Laracon-style, AI + PHP topics)
- LongVV + PhucVT reminiscing about buying Laracon tickets — casual chat, no action

### NUS - Bailey - Paturevision 2026
- DatNC announced live deployment Jun 11 AM: Console Order Verification + Force Scanning + Mobile build
- NamNN sent Firebase App Distribution build link for mobile ✅

### NUS - Colin - ETZ
- KietNVT requesting case studies from devs on Colin ETZ (2 topics, 1 per person)
- DuongDN: start with 1, add more if available

### NUS - Elliott - New GreenFort Capital
- KhanhHH + TuanTT reminding DuongDN + MinhTrinh about something (message truncated) — likely pending action from DuongDN

### NUS Technology
- ThaoNM: World Cup 2026 prediction system announcement — 28 predictions recorded so far, encourages participation

### Philip Briggs - Elevate365.AI
- NamTV assigned NghiepNQ to find technical points for Philip Briggs / Elevate365.AI (discussed in bữa meeting với Chiến)
- NghiepNQ acknowledged — to discuss with TriNM

### Rory Hackett - BXR App
- MinhTV: 177.5h charged (103h BE + 74.5h Mobile) vs ~189h est — approaching limit ⚠️
- Membership flow blocked: Mindbody technical account manager OOO until Jun 22 — LeNH created support ticket, no ETA
- Barcode logic clarified with Rory: "can change" = OK as long as it scans correctly at gym
- Stripe UAE region missing — LeNH flagged, needs to be set up by client
- Third-party domain `22bishopsgate.smarttwin.app` found in API calls — unknown purpose, LeNH asking Rory
- Intense testing session: many features broken (sign in, sign up, switch location). MinhTV unable to reproduce some bugs until physically sitting with Tin

### Technology Department
- Claude Fable 5 + Mythos 5 released today — team discussion on benchmarks vs GPT-5.5 pricing
- NamTV: Mythos delayed due to security capability concerns; Fable 5 free trial Jun 10-22 then usage credits
- TamLH: "Claude quota reset = happy" 😆
- NamTV: new member onboarding checklist process announced (share with namtv@)

### Unnamed / System rooms
- `!DlcbJDCUZaUivhEXSb` (2 msgs): DuongDN sent reminder to someone — no further context
- `!JrWTZuFUwWdMGNnaWO` (5 msgs): DuongDN asked VietPH for hunterxTop source code (kicked from project) → VietPH sent Google Drive link ✅
- `!mYZBGNoLFVpMVIJtPu` (3 msgs — LongVV DM): DuongDN flagged OhCleo PR #1 performance issue (getDeviceFreeListens fires on every page load) — minor but important; LongVV acknowledged
- `!oGYjbzEfphvvauBZtq` (5 msgs): DuongDN + NamTV discussing LeNH workload — Rory tasks nearly done, LeNH may go idle next week; NamTV asking about customer progress expectations
- `!OIrgPraJWrcDTnRVLQ` (1 msg): DuongDN sent 0h reminder to LeNH for Jun 9 task log
- `!ojexjpmcFesBwKOXco` (3 msgs): DuongDN considering giving LeNH Friday off (task nearly done); MinhTV says BE API errors are main blocker before membership
- `!QEbdvaMJkTurMpRPIX` (5 msgs): PhucVT working remote today (unwell); DuongDN suggested passing task to TuanNT; PhucVT: task too complex/cross-dev, will handle himself
- `!RlDBmHJkbksrxefMGn` (6 msgs): DatNT (Fountain) requested Server Beta deploy access for UI bug fix tasks → DuongDN approved, told to contact VuTQ
