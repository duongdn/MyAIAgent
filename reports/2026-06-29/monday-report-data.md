# Monday Report — Week 2026-06-22 → 2026-06-28

Generated: 2026-06-29 (Mon) | Reporting Mon→Sun

## Submission Table

| Project | Internal | External | Dev Hours | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 4 | 1 | 16.00 | 4 UI bugs (action tag, lock cells, tooltip, double popup); madhuraka: Shopify image ordering issue |
| Aysar Khalid - Baamboozle | 0 | 3 | 0.00 | skjamie25: error msgs bug, site down Vietnam, responsive grid issue |
| James Diamond - Portfolio | 0 | 3 | 12.00 | bellatric02: Withcott user issue, File Manager share bug, Assets attachment bug |
| Bailey Joey - Speedventory | 12 | 0 | 84.60 | UI sprint — 3 new, 9 on staging (Prestashop Grazing Software Desktop) |
| Marcel Fuessinger - Tokenlite | 0 | 0 | 0.00 | No activity |
| Neural Contract - Neural Contract - Test Job | 0 | 0 | 0.00 | No activity |
| Raymond Huang - LegalAtoms | 0 | 0 | 0.00 | Hotfix deployed (Florida API email validation); dev-internal only, no direct client bug report |
| Andrew Taraba - Portfolio | 0 | 0 | 0.00 | No Bizurk activity this week |

---

## Detail by Project

### 1. Maddy - Xtreme Soft Solutions
- **Internal (Redmine `maddy-extreme-soft-solutions` tracker_id=1):** 4
  - [New] Action tag but name not change
  - [New] Nên chặn việc tick vào các ô đã bị lock
  - [New] tooltip vẫn hiển thị khi action button
  - [New] Double Pop-up when action button update price
- **External (Slack `Xtreme Soft Solutions` from madhuraka/anomawasala):** 1
  - @madhuraka: "I have sent you an email related to image ordering when uploaded to Shopify"
- **Dev hours (Summary W12 col D):** 16.00h

### 2. Aysar Khalid - Baamboozle
- **Internal:** 0
- **External (Slack `Baamboozle` from skjamie25/client):** 3
  - @skjamie25 #testing: bugs with error messages on Change Team Owner feature
  - @skjamie25: site not working on production for user in Vietnam
  - @skjamie25: responsive layout issue found during testing video for Ronan
- **Dev hours (Summary W30 col D):** 0.00h

### 3. James Diamond - Portfolio
- **Internal (Redmine `james-bonsey-jaden` tracker_id=1):** 0
- **External (Discord nusvinn — AirAgri #airagri_webapp only; HOMIEAPP excluded):** 3
  - bellatric02: Damien Gibbons (Withcott) reported issue needing investigation
  - bellatric02: File Manager — Users cannot share files/SDS to another user
  - bellatric02: Assets module — attachment accessible after successful upload (unexpected behavior)
- **Dev hours (Summary W31 col D):** 12.00h

### 4. Bailey Joey - Speedventory
- **Internal (Redmine `bailey-paturevision` tracker_id=1):** 12
  - [New] [Prestashop] Snapshot modal position too high
  - [New] [Prestashop] Weird blue borderline on add more button
  - [New] [Prestashop] Dropdown color scheme issue on Notes & To Dos
  - [Deployed on Staging] Selected herd not highlighted; Inconsistent Number Format; Weird animation farm selector; Missing nav icons; UI fertilizer page; Short height map; Overall width issue; Misalign UI; + 1 Feedback item
- **External:** 0 — no external-prefix Redmine bugs; Xtreme Soft Solutions Slack has no Bailey-related client messages
- **Dev hours (Summary W33 col D):** 84.60h

### 5. Marcel Fuessinger - Tokenlite
- **Internal:** 0 | **External:** 0
- **Dev hours (Summary W15 col D):** 0.00h

### 6. Neural Contract - Test Job
- **Internal:** 0 | **External:** 0
- **Dev hours (Summary W26 col D):** 0.00h

### 7. Raymond Huang - LegalAtoms
- **Internal:** 0
- **External (Slack `LegalAtoms`):** 0
  - Hotfix activity (hotfix-06222026) for Florida API email validation — dev-internal discussion between raymond and armaghaniqbal only; no direct external bug report from Nick or client side
- **Dev hours (Summary W31 col D):** 0.00h

### 8. Andrew Taraba - Portfolio
- **Internal:** 0 | **External:** 0
- **Dev hours (Summary W26 col D):** 0.00h — no Bizurk channel activity this week

---

## Methodology

- **Hours:** Read `Summary!A1:D200`, found row where col B contained "June 22, 2026", returned col D (grand total Actual).
- **Redmine:** `GET /issues.json?project_id={proj}&tracker_id=1&created_on=><2026-06-22|2026-06-28&key={api_key}`
- **Slack:** `search.messages` with `after:2026-06-21 before:2026-06-29`, filtered by client usernames + bug keywords.
- **Discord:** Fetched channels for AirAgri (nusvinn) + Bizurk (nuscarrick), messages with snowflake range Jun 22–28 UTC+7. HOMIEAPP excluded per memory.

## Unresolved Questions

1. **Baamboozle skjamie25:** Counted as client QA — confirm if correct.
2. **LegalAtoms:** raymond's "should fix this asap" excluded as internal dev discussion — confirm if should count as 1 external bug.
3. **Baamboozle hours 0.00:** Sheet shows 0 for W30 (Jun 22–28). Confirm KhanhHH was not working this week?
