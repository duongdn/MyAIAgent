---
description: Verify DuongDN's own weekly hours as confirmed by ThuyLTT (Matrix) against live Workstream/Sheets data — catches projects ThuyLTT's Workstream-derived summary silently omits
---

# Monday Effort Verify — with ThuyLTT

Runs Monday (or later) to check the accuracy of ThuyLTT's weekly "tổng kết giờ làm" (hours summary) message for **DuongDN himself**, against independently-queried Workstream + Sheets data.

## Why this exists

ThuyLTT posts a weekly summary **image** in Matrix room `!oofREYAXHsvPWEOJev:nustechnology.com`: "Hi mn, T gửi danh sách tổng kết giờ làm (trong giờ chính thức, ko tính PT) tuần {DD-DD/MM}". **This image is derived from Workstream data — it is not an independent source.**

Root-cause case (2026-07 W27): DuongDN forgot to log his hours into Workstream for **Raymond Huang - LegalAtoms**. ThuyLTT's summary, being Workstream-derived, correctly showed nothing for LegalAtoms — the gap was in the underlying data, not in her reading of it. DuongDN: *"để tránh case này xảy ra nữa, D sẽ viết 1 cái skill để double check file bạn gởi"*. So this command's job is to catch that failure mode: **a project where DuongDN has real logged hours (in Workstream or Sheets) that don't show up in ThuyLTT's image**, not just to diff two numbers.

## Usage

| Command | What it does |
|---------|-------------|
| `/me:monday-effort-verify-with-thuyltt` | Verify **last week** (Mon-Sun) — default, matches normal Monday run |
| `/me:monday-effort-verify-with-thuyltt --week YYYY-MM-DD` | Verify the Mon-Sun week containing this date |

**Output:** Printed to chat only. No report file, no Trello update.

---

## Step 1 — Decrypt secrets

```bash
bash scripts/decrypt-secrets.sh
```
⚠️ If a token was refreshed very recently in this session, skip this — decrypting can revert a live token to the last committed `.enc` (this happened 2026-07-08; token-refresh scripts now auto re-encrypt via `scripts/lib/save-secret-config.js`, but always sanity-check `whoami` after decrypting if in doubt).

## Step 2 — Determine target week

Default: the most recently completed Mon-Sun week (i.e. "last week" relative to today). With `--week`, use the Mon-Sun week containing that date.

## Step 3 — Find ThuyLTT's confirmation message + image

```bash
node scripts/fetch-matrix-daily.js --room "!oofREYAXHsvPWEOJev:nustechnology.com" --since "{week_monday - 7d}T00:00:00+07:00"
```
If token expired, run `node scripts/matrix-token-refresh.js` (or `DISPLAY=:1 node scripts/matrix-token-refresh.js`), then **verify with `whoami` before proceeding** — never assume success from exit code alone.

In the output, find ThuyLTT's message matching: `T gửi danh sách tổng kết.*giờ làm.*tuần {DD-DD/MM}` where the date range matches the target week. It's usually immediately preceded or followed by an image (`image.png` or a `.jpg` filename). Note the event's approximate timestamp.

**Get the actual image (mxc:// URI, not just the filename):**
```bash
# Raw room messages around that timestamp, to get content.url (mxc://...)
curl -s -H "Authorization: Bearer $(node -e "console.log(require('./config/.matrix-config.json').access_token)")" \
  "$(node -e "console.log(require('./config/.matrix-config.json').homeserver)")/_matrix/client/v3/rooms/!oofREYAXHsvPWEOJev:nustechnology.com/messages?dir=b&limit=50" \
  | node -e "process.stdin.on('data',...)" # filter for m.image events near the target timestamp, sender=thuyltt
```
Extract `content.url` (mxc://server/mediaId) from the matching event.

**Download the image:**
```bash
curl -s -H "Authorization: Bearer {access_token}" \
  "{homeserver}/_matrix/client/v1/media/download/{server}/{mediaId}" -o /tmp/thuyltt-hours-{week}.png
```
If that 404s (older media API), fall back to `{homeserver}/_matrix/media/v3/download/{server}/{mediaId}`.

## Step 4 — OCR the image

Use the `ai-multimodal` skill to read `/tmp/thuyltt-hours-{week}.png` and extract per-project hour lines for DuongDN (project name → hours). ThuyLTT's images list multiple people/projects — only keep rows relevant to DuongDN.

## Step 5 — Independently query Workstream for DuongDN, ALL projects

**Do not rely on a fixed subset.** Use the live project list (see `docs/memory/daily-report/sheets/reference_workstream.md` — this drifts, verify via `GET {api_base}/time/projects?date={week_monday}` first for a quick self-view cross-check).

For each project ID in the live list, call the **self-view endpoint** (works regardless of manager status):
```bash
GET {api_base}/time/projects/{projectId}/week?date={week_monday}
```
Filter response rows to `employeeName` matching DuongDN, sum `actual` hours for the week. Record project → hours (including 0h — absence of a project here means DuongDN genuinely didn't log there, which is a valid "no data" result, not a flag by itself).

Auth: `config/.workstream-config.json` (`access_token`). Re-login if expired: `DISPLAY=:1 node scripts/workstream-login.js`.

## Step 6 — Cross-check known personal Sheets sources

DuongDN has personal entries outside Workstream in a couple of sheets — check these too:
- **Bailey Paturevision** (`1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`) — DEV3/DuongDN rows, filter by Task ID (see `docs/memory/daily-report/upwork/feedback_upwork_filter_by_task_id_strict.md`). Usually inactive/0h — that's expected, not a flag.
- **Marcel/Equanimity sheet** (`1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI`) — Summary tab, DuongDN's column, for the target week.

**Speedventory (Bailey Joey) — confirmed 2026-07-08: DuongDN's hours there are NOT tracked in Workstream at all.** ThuyLTT's image shows a manually-authorized charge ("charge 1hr theo authorize") that has no corresponding Workstream task log. 0h in Workstream for Speedventory is therefore always expected — ignore it, don't flag it as a mismatch.

**Elena Klebanov / Celine Fierro (OhCleo) — not yet in the known Workstream project catalog** (not in `reference_workstream.md`, not returned by `/time/projects` self-membership). Celine Fierro/OhCleo first appeared in ThuyLTT's image for the week of 2026-06-29 — brand new, so being unable to independently verify it this run is expected/acceptable. If it's STILL unverifiable in a couple more weeks, that's worth digging up the project ID for; for now treat as informational only.

## Step 7 — Build the comparison

| Project | ThuyLTT's image | Workstream actual | Sheets actual | Status |
|---------|-----------------|--------------------|----------------|--------|
| James Diamond | Xh | Yh | — | ✅ / ⚠️ |
| ... | | | | |

**Flag rules:**
- 🔴 **Missing from image**: Workstream/Sheets shows > 0h for a project, but ThuyLTT's image has no line for it. **This has two distinct possible root causes — don't assume it's automatically DuongDN's mistake:**
  1. **DuongDN's own logging gap** — he genuinely hadn't logged the hours yet when ThuyLTT compiled her summary (the original LegalAtoms case: her summary was correct given the data available at the time). Check whether the Workstream entry looks like it was added *after* her image's send timestamp (task/project-member IDs are roughly chronologically ordered — a record created later than her message time supports this).
  2. **ThuyLTT's reporting gap** — the hours were ALREADY in Workstream before she compiled/sent the image, but her summary still missed the project (e.g. it was scrolled out of the screenshot, or the pull just missed it). This is on her/the process, not DuongDN.
  Since exact log timestamps aren't directly exposed by the API, don't guess silently — surface BOTH possibilities in the output and let DuongDN judge (he'll usually remember whether he'd logged it by then). Either way, flag it now rather than waiting for her to notice, and note the usual follow-up is to tell Delivery directly ("Dương báo Delivery nha" — she only books hours once Delivery reports them for project types like this).
- ⚠️ **Number mismatch**: both have a line for the project but hours differ.
- ✅ **Match**: hours agree (exact, or within normal rounding).

## Step 8 — Print result to chat

Concise summary + the table above. No file write, no Trello. If any 🔴/⚠️, call it out clearly, state which root cause (DuongDN's logging gap vs ThuyLTT's reporting gap) is more likely and why, and suggest DuongDN message ThuyLTT/Delivery directly (same pattern as the LegalAtoms case).

---

## Known gotchas

- ThuyLTT's summary is **Workstream-derived** — never treat it as ground truth to diff against; it's the thing being verified, not a data source.
- Workstream project list drifts (grew 5→10→17+ over 2026-06/07, and is STILL missing at least 2 known-active projects as of 2026-07-08: Elena Klebanov/SamGuard, Celine Fierro/OhCleo) — always live-check `GET {api_base}/time/projects?date={date}` rather than trusting any hardcoded list, including this file's reference above. Some projects a person has actually logged hours in (e.g. LegalAtoms) don't even appear in their own self `/time/projects` membership list — querying every known project ID **directly** is mandatory, the membership list alone is not enough.
- 🔴 **A missing project in ThuyLTT's image has two possible causes, not one** — DuongDN forgot to log it (her summary was accurate for the data that existed) OR she missed it despite the data already being there (her/process error). Don't default to blaming DuongDN — see Step 7.
- **Speedventory (Bailey Joey)** hours for DuongDN are never in Workstream (manually authorized charge instead) — 0h there is expected, not a gap. Confirmed 2026-07-08.
- Matrix media download API path varies (authenticated `/v1/media/download/` vs legacy `/media/v3/download/`) — the authenticated path worked on the first real test (2026-07-08).
- If Matrix token expired mid-run, after refreshing it **re-verify with `whoami`** before continuing — don't assume the refresh succeeded just because the script exited 0. Access tokens appear short-lived (expired twice within ~1h during testing) — expect to refresh more than once in a single run if it's slow.

## Unresolved questions

- Project IDs for "Elena Klebanov" (SamGuard?) and "Celine Fierro" (OhCleo) Workstream projects — not yet found; `/admin/projects` returns 403 for DuongDN's token, so no listing endpoint currently works to discover them. Revisit if OhCleo/Celine is still unverifiable after a few more weeks.
- Whether ThuyLTT's image format is consistent enough for reliable OCR every week (only 3 samples seen so far, and the image itself may be cropped/scrolled inconsistently) — watch for format drift.
