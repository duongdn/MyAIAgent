# Monitoring Refresh — Mon 23 Mar 2026, 13:40

**Window:** 08:46 → 13:40 (Saigon)

---

## Slack (13 workspaces, 30 new msgs total)

### Xtreme Soft Solutions — 14 msgs
- **kai <-> anomawasala (client):** Client reporting YTD discrepancy + return ticket worth 1500/=. Kai: "will check later"
- **kai <-> madhuraka (client):** "Are you working today?" → Kai confirmed yes. Discussing TuffPoly changes + LIF. Kai: "I focused on LIF and missed the TP feedback earlier. I'll take care of it today."
- **Daily report check — Kai: PASSED** (active, confirmed working)

### GLOBAL GRAZING SERVICES — 5 msgs
- joey in #maintenance: handling theme fix, email storage issue ("I will start deleting staff email. And if not enough space add more storage")
- **Daily report check — Nick: no msgs from Nick today.** Joey active, Nick not seen since cutoff.
- **ALERT:** Email storage issue — joey investigating

### Generator — 8 msgs
- rudi asks Violet to QA Trello card https://trello.com/c/8BFQP37y
- rudi: "When can we release incident management?"
- violet: "I think it could be released tomorrow"
- **ALERT:** rudi assigned triage card to NUS Carrick: https://trello.com/c/sJ537j2n — needs attention
- rudi assigned another triage to Jeff: https://trello.com/c/IoOrvUli

### William Bills — 1 msg
- duongdn asks Ollie about issues while Lucas off

### SAM GUARD — 2 msgs (HubSpot leads only, no human alerts)

### Baamboozle, RDC, Swift Studio, Amazing Meds, LegalAtoms, MPFC, Equanimity, SoCal, Aigile Dev — 0 msgs

---

## Email (6 accounts, 2 new)

| Account | Count | Key Items |
|---------|-------|-----------|
| duongdn@ | 1 | Internal training email (Redis caching) |
| carrick@ | 1 | Redmine #77761 Elliott bug "Time Slots dropdown No data" — Tested on Internal Staging |
| nick@ | 0 | — |
| rick@ | 0 | — |
| kai@ | 1 | JIRA LIFM2-409 Import Shopify payouts (Madhuraka activity) |
| ken@ | 0 | — |

No production alerts. Redmine #77761 is internal staging only.

---

## Discord — TOKENS VALID (false alarm)

Both tokens verified working (200 OK on `/users/@me`). Earlier 403 was transient or a script bug.
- **nusvinn:** AirAgri, HOMIEAPP — accessible
- **nuscarrick:** Bizurk — accessible

---

## Trello — My Task Board

- **Check mail** card found — all 6 items TODO (not yet checked today)
- **Check progress** card — **not found** on board (not created yet today?)

---

## Fountain Trello Board

**Card counts:**
| List | Count |
|------|-------|
| To-Do | 38 |
| Bugs | 9 |
| Doing | 3 |
| QC Internal | 5 |
| Not Passed | 1 |

**Customer comment (new):**
- **kunalsheth** on "Accidentally uploaded product catalog to gifts": *"@rick570 Okay let me think, I think maybe updated admin 'gifts' tab to 'gift boxes' may help..."*

**rick570 activity:** Reverted gift catalog, notified kunalsheth about OOS logic stopped on LIVE, sent corrected link to tmmckay

**Stuck cards (>5 days):**
- Doing: "New Redemption flow (Gift of Choice Flow)" — **40 days stale**
- Doing: "OrderFlow/Recipient - GiftDrop Preview" — **45 days stale**
- QC Internal: "Incorrect delivery dates" — 51 days; "Gift of Choice - Select and make payment" — 5 days; "Send - Updates to Delivery section" — 9 days; "Gift of Choice (Gift cards)" — 6 days

---

## Redmine — Updated Today

| # | Project | Subject | Status |
|---|---------|---------|--------|
| 77799 | Fountain | Sai UI - address page | New |
| 77798 | Fountain | Sai UI page address | New |
| 77793 | Elena - Digital Plant | Cannot save asset/tag changes | New |
| 77773 | Paturevision | Review stars not showing (PS9 Live) | Tested on Staging |
| 77734 | Elena - Digital Plant | Canvas turns blank after disconnecting tag | Tested on Staging |

---

## Web Monitor

| Site | Status | SSL | Response |
|------|--------|-----|----------|
| samguard.co | UP (200) | 81 days | ~1.8s |

---

## GitHub PRs — FIXED

Earlier 404 was caused by using `nuscarrick` (default) instead of per-repo accounts. Both repos accessible:
- **Elena-SamGuard** → `duongdn` account — OK
- **Precognize/development** → `nusken` account — OK

---

## Google Sheets Task Logs

All sheets show **0h** for Mon Mar 23 — expected (afternoon, not yet filled).

---

## Scrin.io — FIXED (browser scrape)

API token still broken, but browser-based fetch now working via `scripts/scrin-login.js`.

| Date | Day | Week | Month |
|------|-----|------|-------|
| Mon Mar 23 | 0h 00m | 0h 00m | 51h 04m |
| Fri Mar 20 | 7h 03m | 22h 43m | 51h 04m |

**Fri Mar 20 tasks:** Care plan page (3h 10m), Cherry widget (2h 42m), update AM Method website (1h 11m)

Today 0h — expected (Mon afternoon, not yet tracked).

---

## New Alerts (since daily report)

| # | Severity | Area | Issue |
|---|----------|------|-------|
| 1 | MEDIUM | Generator | rudi assigned triage card to NUS Carrick — https://trello.com/c/sJ537j2n |
| 2 | MEDIUM | Generator | Incident management release planned tomorrow |
| 3 | LOW | Global Grazing | Email storage issue — joey investigating |
| 4 | INFO | Fountain | kunalsheth comment on gift catalog + 2 new Redmine bugs (#77799, #77798) |
| 5 | INFO | Fountain | 2 Doing cards stale 40-45 days |
| 6 | — | ~~Discord~~ | ~~Tokens expired~~ — FIXED, tokens valid (false alarm) |
| 7 | — | ~~GitHub~~ | ~~auth 404~~ — FIXED, was using wrong account |
| 8 | — | ~~Scrin.io~~ | ~~Token expired~~ — FIXED via browser scrape |

---

## Unresolved Questions

1. ~~Discord tokens expired~~ — RESOLVED, tokens valid, earlier 403 was false alarm
2. Generator triage card assigned to NUS Carrick — what is it?
3. Check progress Trello card not found — not created yet today?
4. ~~GitHub repos returning 404~~ — RESOLVED, refresh script used wrong account (nuscarrick instead of duongdn/nusken)
5. ~~Scrin.io token expired~~ — RESOLVED, browser scrape working
