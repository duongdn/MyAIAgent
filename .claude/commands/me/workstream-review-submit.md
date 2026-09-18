---
description: Check Upwork memo logs for a Workstream project and submit the "Check memo logs in Upwork Tracker" request report
---

# ⚠️ MANDATORY FIRST STEP — READ MEMORY

Before doing anything else, invoke `/util:read-memory workstream-review-submit`. Read Global + `## daily-report:sheets` (workstream) + `## daily-report:upwork` sections — this skill reuses both subsystems.

---

# Workstream Review Submit — Upwork Tracker Memo Check

Workstream's Company Requests (`https://workstream.nustechnology.com/requests`) include a recurring request **"Check memo logs in Upwork Tracker"** (id `cmu3wx8lx0xdoqg1v3pztgwh1`), assigned per-project to that project's DM. Description: *"Mỗi ngày các DM nhớ check memo của Upwork Tracker. Và vào mỗi thứ 6, trước khi ra về thì các DM submit report."* Deadline shown is `2026-12-25` (recurring placeholder, not a real one-time deadline — submit weekly, every Friday, regardless of the shown date).

🔴 **Corrected 2026-09-18 — this is NOT the per-project `needsReview`/`review-week` approve-reject flow** (that's daily-report Piece 4). `/requests` is a separate generic "Company Requests" feature — most other requests here are unrelated admin asks (e.g. "Hỏi KH nhờ feedback cho cty mình trên Clutch"). Only the "Check memo logs in Upwork Tracker" title is in scope for this skill.

**Confirmed projects with this request (live 2026-09-18):** Baamboozle, Tokenlite. Both `status: NotStarted`. More projects may be added later — always re-fetch, don't hardcode this pair.

**Usage:**
- `/me:workstream-review-submit` — evaluate the Upwork Tracker request for ALL projects that have it, **dry-run by default (no submit)**
- `/me:workstream-review-submit <project>` — evaluate one project only (e.g. `tokenlite`), dry-run
- `/me:workstream-review-submit --submit` — actually submit the response(s) to Workstream
- `/me:workstream-review-submit <project> --submit` — evaluate + submit one project only

🔴 **Default is dry-run.** Never submit/change state on `/requests` unless `--submit` is explicitly present in the invocation, or the user explicitly says "submit"/"nộp"/"gửi luôn" in this turn.

---

## Step 1 — Auth

```bash
DISPLAY=:1 node scripts/workstream-login.js   # only if token expired (401 "exp claim" on /api/me)
```
Token lives in `config/.workstream-config.json`. Browser SSO session cookie is in `tmp/workstream-browser-profile/` — reuse this `userDataDir` for any Puppeteer script touching `/requests` (a fresh profile has no session → redirects to `/login`).

## Step 2 — Fetch pending Upwork Tracker requests

```
GET {api_base}/requests
```
Returns `{ items: [...] }` — filter `title === 'Check memo logs in Upwork Tracker'`. Each item: `{ id, title, description, deadline, projectId, projectName, status, allowMultiple }`. `status: 'NotStarted'` = pending this run.

For the full field schema (needed before building the submit payload):
```
GET {api_base}/requests/{id}?projectId={projectId}
```
Returns the same item plus `fields[]` (id/label/fieldType/isRequired/options) and `submissions[]`/`latestSubmission`. Confirmed schema for the Upwork Tracker request:

| Field id | Label | Type | Required | Options |
|---|---|---|---|---|
| `cmu3x3yx00xecqg1vqz0ugi1t` | Account (ví dụ QC Emma, Dev Tom, Dev Ken) | text | no | — |
| `cmu3wx8lx0xdrqg1vhyoqw1c5` | DM đã check memo Upwork Tracker | checkbox | **yes** | `Đã check` / `Không check do tuần này không có task cần tracker` / `Vấn đề khác` |
| `cmu3wx8lx0xdsqg1vt1ptp1zb` | Note | textarea | no | — |

Submit POST endpoint/shape not yet captured live (no test submit performed — dry-run only so far). Before the first real `--submit`, capture the POST via the UI form (Puppeteer response listener on `/api/requests/*`) rather than guessing the shape.

## Step 3 — Check the actual Upwork memo

For the project's dev(s), determine if we hold Upwork workroom credentials:
```bash
grep -i "<project-or-dev>" config/.upwork-config.json
```
- **If a workroom exists** (see [[reference_upwork_workrooms]]): run
  ```bash
  node scripts/upwork-memo-check.js --date=<date> --workroom=<name>
  ```
  Classify per [[reference_upwork_memo_validation]] — action verb + specific object + relation to contracted work; single-word/feature-only = INVALID.
- **If no workroom exists in our config:** we have no direct access to that project's Upwork Tracker. Do not fabricate a check. Report as unresolved and ask the user: either (a) supply login/session for that Upwork account, or (b) confirm the DM check was done manually and just wants the report submitted with that answer.
- **Tokenlite/Marcel** (2026-09-18): now configured. Workroom `37635751` under a SECOND Upwork account `duongdn` (dnduong.us@gmail.com, agency-facing, Chrome Profile 9 — label `nus-davidb`) — separate from `carrick`'s freelancer-facing account. `upwork-memo-check.js` supports multiple live-cookie accounts via `LIVE_COOKIE_ACCOUNTS = ['carrick', 'duongdn']`; adding a new account = add its name to that array + a `scripts/get-{account}-upwork-cookies.py` (copy `get-duongdn-upwork-cookies.py`, point `COOKIE_FILE` at the right Chrome profile — check `account_info.email` in each profile's `Preferences` to find it).

## Step 4 — Decide the checkbox answer

| Situation | Answer |
|---|---|
| Memos verified, all valid, dev had tracked hours this week | `Đã check` |
| No Upwork hours logged this week for the project (confirmed via Workstream task-log/hours = 0) | `Không check do tuần này không có task cần tracker` |
| Memo invalid, or hours don't match, or anything needing escalation | `Vấn đề khác` + explain in Note |
| Can't access the Upwork account at all (no credentials) | **Do not answer automatically** — this is Step 3's unresolved case, surface to user |

**Never auto-pick "Đã check" without having actually verified memos or confirmed 0h.**

## Step 5 — Submit (ONLY if `--submit` is present)

Without `--submit`: stop here, report the evaluated answer as dry-run, do not POST anything.

With `--submit`: submit via the request's form. Confirm status flips to `Submitted` (re-fetch `GET /requests/{id}?projectId=...`) before reporting success.

🔴 Even with `--submit`: if the answer is `Vấn đề khác` (an issue/flag), surface it to the user and get explicit confirmation before submitting.

## Step 6 — Report

Write to `reports/{YYYY-MM-DD}/{HHMM}-workstream-review-submit.md`:
```
## Workstream Review Submit — Upwork Tracker — {HH:MM} (+07:00)
| Project | Account/Dev | Memo check | Answer | Note | Submitted |
|---------|------------|-----------|--------|------|-----------|
| Tokenlite | Marcel | no Upwork workroom access — unresolved | — | — | dry-run, not submitted |
| Baamboozle | LeNH (Rory/Aysar workrooms) | N valid / M invalid | Đã check / Vấn đề khác | ... | ✓/dry-run |
```

Update `config/.monitoring-timelines.json` (`workstream_review_submit.last_run`) at the end of every run.

---

## Unresolved questions
- Submit POST request shape not yet captured (no live submit attempted — dry-run only). Capture it on first `--submit` run via network listener, don't guess the payload.
- Whether "Multiple responses: Yes" means this request can/should be submitted every Friday indefinitely (recurring) vs. the `Dec 25, 2026` deadline being a real one-time date — treat as recurring weekly per the description text, re-verify if the UI ever shows it as closed/expired.
