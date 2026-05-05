## Slack — 09:11 (+07:00)

Window: 2026-05-04 08:30 +07 → 2026-05-05 09:11 +07 (24h, post-holiday Tue catch-up).
All 14 tokens valid (verified via `slack-verify-tokens.js`). No refresh needed.

| Workspace | Msgs | Channels (msgs) | Key content |
|-----------|------|-----------------|-------------|
| Baamboozle | 40 | #testing(8), #engineering(2), DM-Jamie(24), #cancellation-responses(2), #customer-success(1), DM-Ronan(2), #random(1) | Carrick + Jamie deep-dived Stripe team-subscription proration math (May 4 — Jamie wants invoice line text clarified for customers; ongoing, not a bug). Carrick + Ronan + Aysar coordinating Issue 533: dependency on #540 cleared, Aysar to post requirements for Carrick. Carrick tested Baamboozle classic on Android per Jamie. Holiday return: Carrick back from VN holidays. |
| RDC - FM Monitoring | 12 | #all-rdc-fm-monitoring(4), #rpi-reboot-logs(5), #user-access-logs(3) | Carrick deployed scanner prototype to staging (old) + test tuner. dmetiner asked: deploy to master device + need İzmir update for new scanner plugin. Plan to freeze plugin versions once complete. Auto reboot/access logs routine. |
| Swift Studio | 6 | #bxr__app(4), DM-Rory(2) | Jeff confirmed trainer filter still working on live (Apr 30 follow-up). **Rory flagged SMS verification problem on app + website May 4** — client received ~40 recharge emails; Twilio account may be compromised/hacked. Jeff "we will check". |
| Xtreme Soft Solutions | 1 | DM-Kai(1) | **Kai posted progress May 4**: LIFM2-434 Quote Tool AI MVP Done; LIFM2-437 Date-based filtering Done. (Kai 16h/wk; daily-report-in-Xtreme not required.) |
| SAM GUARD - Mobile | 16 | #mql-leads(15), #process-digital-plant(1) | Lena pinged Michelle for status on #process-digital-plant. 15 HubSpot auto-MQL notifications May 4. No Elena/DP-NUS escalations. samguard.co console: 0 errors, 0 CSP violations (verified via Puppeteer). |
| GLOBAL GRAZING SERVICES | 26 | #maintenance(15), DM-Joey(2), #change-requests(7), #barcode-stock-and-picking-location(2) | Amy: invoice/Prestashop config issue resolved (May 4). **Nick posted daily report May 4** in #maintenance: GLS module + service list API testing on staging-sg, multi-admin email config in Q&A. Nick provided 2-week mobile dev estimate to Joey. Joey lined up new CRs, asking Amy for prices. Joey + Amy resolved DL invoice download bug (Prestashop config). |
| Amazing Meds | 10 | #web-dev-with-nick(10) | John Yi posted Authorize.net merchant overview + asked Nick to build checkout page for care plan + add user to authorize.net. **Nick confirmed FB 403 fix done.** Payment processor integration — Nick has it set up locally, blockers identified. John wants payment in free-consultation questionnaire. |
| Generator | 9 | #triage(5), #business-analysts(3), #generator-x-nus(1) | Carrick PR fixed mobile API for Bookables services + space + task 292; Rudi will review Tue (AU public hol Mon). Rudi reminder: merge any prod-bound changes. Violet acknowledged historical bug fix referenced. **Violet posted daily update May 4** in #generator-x-nus (Carrick: 809 Project & Demographics Report continuing). |
| LegalAtoms | 16 | #general(15), #tyler-journal(1) | **Production incident May 4: "Alpha is down" — Kafayat/Charsalan/Umair reported.** Armaghan patched, Talha redeployed, Umair confirmed working. API still slow afterward. Sobia flagged GitHub issue 19558 to Tariq + Armaghan. Mira proposed in-channel hours sharing (with @channel). talha.naeem posted Maryland court certification on tyler-journal. (Their team incident, not ours.) |
| MyPersonalFootballCoach | 0 | — | Silent (typical, low-activity workspace). |
| William Bills | 7 | DM-Oliver(7) | Lucas deployed attach-stripe-product, upgraded WP plugins + checked WP security. Oliver: don't update Wordfence (latest crashes WP backend). QuanLee did fix on weekend, downgraded. |
| Equanimity | 34 | #xid-technologies(33), DM-Marcel(1) | **Production-ish: Mani reported nakanostedc.xidtech.com tenant down May 4 + user-mgmt update broken.** Carrick reproduced via video from Mani — confirmed the user-detail page broken on **Safari only** (Chrome OK). Carrick fixed it within ~4h. Then Carrick + Komal long discussion on person_employer_company / client_company / main_contractor_company validation rules (SGBuildEx). Carrick to Marcel: please arrange CloudWatch monitoring access. |
| SoCal Auto Wraps | 0 | — | Silent (typical). |
| Aigile Dev | 2 | #braiking-news(1), #attio-alerts(1) | Make.com auto blog draft + Attio alert. No human activity. |

**Total messages in window: 179**

### GitHub — Baamboozle open issues

- baamboozle/baamboozle-web-app: 4 open (#600 Profanity filter usernames/email, #599 Admin tool game cover images, #596 Tech-stack LTS upgrade, #559 Discount % during team subscription creation).
- baamboozle/bbzl-web-client: 0 open issues.

### Alerts

| Severity | Source | Why |
|----------|--------|-----|
| MEDIUM (resolved) | Equanimity / xidtech | nakanostedc.xidtech.com user-detail broken on Safari — fixed by Carrick May 4 ~16:00 +07. |
| MEDIUM (client-side, ours to investigate) | Swift Studio / bxr__app | SMS verification issue on app + website + ~40 recharge emails to client → Twilio may be compromised. Jeff acknowledged ("we will check"). Watch. |
| INFO | LegalAtoms / Alpha | Their team patched + redeployed; not our incident. |

No blocking alerts. Equanimity outage already resolved in-window. Swift Twilio/SMS issue is real but Jeff is the responder; flag for follow-up tomorrow.

### Per-workspace Trello recommendation (Card "Check progress" — https://trello.com/c/nkHlSA2R)

| Workspace | Trello item | Recommendation | Reason |
|-----------|-------------|----------------|--------|
| Baamboozle | Aysar (closely monitor) | complete | Aysar engaged on Issue 533 dependency, GitHub clean (4 open, all backlog) |
| RDC | Franc (closely monitor) | complete | dmetiner thanked + iterating on prototype |
| Swift Studio | Rory (closely monitor) | skip — watch | SMS/Twilio issue active, client impact, Jeff investigating |
| Xtreme | Maddy - Carrick/Kai/Luis (Normal) | complete | Kai posted progress May 4 (16h/wk exempt) |
| SamGuard | Elena - SamGuard + Elena - WordPress SamGuard | complete | No escalations; samguard.co clean (0 errors, 0 CSP) |
| GGS | Bailey | complete | Nick posted daily report May 4 in #maintenance |
| Amazing Meds | John Yi - Amazing Meds (Normal) | complete | Active dev, FB 403 fixed, payment integration in progress |
| Generator | Elliott - GreenFort Capital (closely monitor) | complete | Carrick PR up + Violet daily update posted |
| LegalAtoms | Raymond - LegalAtoms (Work) | complete | Their team handled Alpha-down; no NUS-side issue |
| MPFC | MPFC (Work) | complete | Adhoc, 0 msgs normal |
| William Bills | Rebecca - William Will (Work) | complete | Lucas deployed + WP upgrades; Wordfence flagged |
| Equanimity | Marcel (Work) | complete | Carrick fixed Safari bug; Marcel reminder for CloudWatch open |
| SoCal | Blake (Normal) | complete | Low-activity workspace, 0 msgs normal |
| Aigile | Colin (Work) | complete | Automated content pipeline running |

**IMPORTANT:** Final checklist completion still depends on Sheets + Discord + other pieces — these are recommendations from Slack-only viewpoint.
