# Matrix — since 2026-10-26 08:40 +07:00 (summarized)

**Active rooms: 22 / 152 | Messages: 435** *(since 10-26 08:40)*
Full details: reports/2026-10-27/matrix-rooms-0503.md

### Key updates

**Bailey — go-live day:**
- The customer asked to go live Mon morning. TuanNT moved the domain to the prelive stack, NamNN built the live mobile app, and DatNC tested orders (40771/40772 sync was slow at first, then went through).
- PhucVT joined to investigate the sync. Failed jobs were calling `prelive2`, a config left over from the domain switch. TuanNT fixed it. PhucVT asked for timeouts on console calls and for CURLOPT_VERBOSE to be turned off.
- VuTQ/NamNN listed the upgrade details for Joey (Ruby 2.7.4→3.1.2, Gradle/AGP/Java). VyNL: Redmine #80599 postal-code sync (pre-existing bug).
- halt asked whether any Bailey milestone is billable. DuongDN: "chưa, đang làm để release" (not yet, still working toward release).

**Neural — customer complaint:**
- DuongDN 09:13: the customer is complaining about leftover bugs, handle it today (after Bailey). TuanNT: the fix needs sudo, which we don't have, so config is hardcoded temporarily. DuongDN: "vụ ko test kĩ thật sự ko ổn" (not testing properly really isn't OK). 13:44 error pages updated and the customer was answered.
- namtv: the Neural contract has been paused for a long time. Asked to resolve so last week's hours can be reported. Done.

**OhCleo — release prep:**
- Celine plan this week is 30h. LongVV does Maddy + Celine. PhucVT takes James.
- LuHX: Paywall redesign (~2h) and a staging build. HungPN found a Samsung payment-screen issue (needs internal testing track). The search fix is OK (17:21). Celine wants to submit the new app (covers + new design + search) for review.
- LongVV 19:57 asked LuHX to check Celine's issue tomorrow (Alert #5).

**Fountain:** weekly plan posted 09:29. ViTHT moved 382 BE + 390 FE file changes to BETA. Release 26 went live (VuTQ). ThinhT PR #810 Infinity export. Redmine 81404/81405/81525 testing.

**Other:**
- Rory/BXR: Upwork tracking resumed (minhtv: use the tracker). KhoaTD/KhanhHH estimating a new ClickUp scope (BE + mobile, ~1 week+).
- Resource Arrangement: leave list (see header).
- Tech/security: MinhTV asked DuongDN to run the PolinRider malware scanner. DuongDN scanned 111 repos, clean. MinhTV's team found 2 infected machines.
- Kunal-room side chat: DuongDN shared Claude magic-login links in-room for the Rick account, which ran out of tokens (sensitive, links not copied here).
- HR: week 19–25/10 hours summary posted. Staff evaluations due Oct 30.
- Recruitment: BDM interviews ongoing.

---

