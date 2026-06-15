# Matrix — Kunal / Fountain — since 2026-06-09 00:00 +07:00

**Room: `!EWnVDAxbTGsBxPkaaI:nustechnology.com` | Messages: 282**

---

### Summary (Jun 9–14)

**Active dev work — multiple cards deployed to Live:**
- #2865 Address editing / cart items (DatNT + VuTQ) — deployed Live ✅
- #2881 Image display inline fix (ThinhT + VuTQ) — deployed Live ✅ (browser cache note sent to Kunal)
- #2918 Gift drop swap (ThinhT) — deployed to Live directly by TrinhMTT without QC ⚠️ (process violation, corrected)
- #2911 Cocktail kit update — Beta tested by PhatDLT, HungPN ✅
- #2934 Shipping cost not updating (PhatDLT + DatNT) — investigated, fix shipped to Live ✅
- #2872 Infinity browse — tested DONE by HungPN ✅
- #2871 Infinity build-a-box — tested DONE by HungPN ✅
- #2836 Business homepage — customer (Thomas/Kunal) feedback, DatNT fixing
- #2837 Infinity custom roses — ViTHT fixed design comments
- #2854 Cart/address state display — ViTHT + HungPN + VuTQ (full-name vs abbreviation discussion; fix deployed BETA then Live)
- #2811 Fountain states update — merged into infinity_master, deployed
- #2913 Card deployed to BETA by ViTHT
- Apple Pay fix (#433 PR) — HungPN + VuTQ tested and deployed ✅
- Gift drop link bug (#2938) — reported by customer on Live, urgent fix in progress

**Kunal messages (via DuongDN relay, Jun 10):**
- "Tom should be back to work tomorrow — get as much in beta ready for QC"
- Screenshots shared of cards still in Internal QC Backlog
- DuongDN instructed TrinhMTT to relay any replies via WhatsApp room

**Tech notes:**
- VuTQ added `CLAUDE.md` to FE master with project onboarding info
- Rollbar: ~5,000 `ActiveStorage::Blob not found` warnings — ThinhT flagged, VuTQ to investigate
- Mailgun: question raised about using same domain for both Fountain + Infinity sends
- Image `fill` usage: VuTQ corrected DatNT on Next.js Image component API (sizes prop required)

**Process issue:**
- TrinhMTT pushed card #2918 directly to Live without QC sign-off — ThinhT reminded of process (staging → QC → customer approval → Live). TrinhMTT acknowledged.

**W52 plan (Jun 9):**
- Team logs hours on Workstream (not Google Sheets) — DuongDN updated AI note accordingly
- No per-dev hour plan posted in this room (Workstream is the source for Fountain)
