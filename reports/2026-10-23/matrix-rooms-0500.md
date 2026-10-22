# Matrix — summary since 2026-10-22 08:00 +07:00 (28 active rooms / 676 msgs)

### Key updates

**PHP2Shell + Node.js CVE — company-wide response:**
- namtv all-hands 08:43: critical. Patch now, suggest shutdown when we can't patch. Tracking sheet created. Company Wiki and Quiz were shut down temporarily.
- duongdn 08:34/08:38: "làm ngay lập tức", tell each customer and suggest a server shutdown. Every team reported status (see Alert #8).
- Afternoon: Node.js CVE-2026-111497 round. Most projects are unaffected (no server-side Node). Fountain/Infinity were upgraded to 24.22.1. Also a Railway env-var leak (Arthur) and a LiteLLM supply-chain hack (namtv 16:20).

**Bailey — pre-live + prod sync:**
- TuanNT: PHP is already 8.4.27. Pre-live (prelive2) testing with the customer.
- Prestashop→Console sync stalled repeatedly (10:45, 14:17, 16:42, also on prod). datnc pushed hard ("này prod mà"). TuanNT fixed the Rails 6 syntax/tenant check. Mobile build couldn't fetch orders at first.
- Schenker IP: move the live EIP to prelive at swap. duongdn 16:23: the project needs real documentation ("dự án hiện rất lớn để dùng trí nhớ quản lí").

**Arthur — Railway key rotation + R1 staging:** PhucVT rotated keys and pushed R1+B1+rate limit to staging 17:07 (Railway queue). duongdn: Arthur release has priority ("có hứa release, ko vi phạm được").

**Rory/BXR (KhanhHH):** customer paused the contract. KhanhHH suggested the fix, minhtv: 8h manual task approved. KhanhHH found the Apple Wallet `.p12` key was **publicly downloadable** on production. Direct download is blocked now, and the mobile team will generate a new key tomorrow (needs the customer to resume the contract).

**OhCleo:** minhtv asks for LongVV full-time tomorrow. duongdn: James/DG upgrade comes first, so "report first, work later".

**Other:**
- Fountain: blog redirected on LIVE, Sanity go-live ASAP. Process meeting, moving PM to GitHub. ViTHT wrote Backstage business guides.
- Elena OP: AA-122..125 bugs estimated/fixed (PR #5558), new API for investigation history (+1h BE/FE). Release Wed next week.
- LeNH/AirAgri: PHP 8.4.27 done 12:38. duongdn: keep customer chat in the room, not DMs.
- RDC: KhanhHH PHP done + compromise scan clean. Node PRs not yet merged.
- James Diamond (halt): customer hasn't replied to the payment chase, duongdn to follow up with a tag.
- Colin ETZ: notice sent by email (Colin blocked Slack).

---
