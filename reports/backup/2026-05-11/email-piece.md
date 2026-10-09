## Email — 08:22 (+07:00)
| Account | Count | Summary |
|---|---|---|
| duongdn | 7 | NUS HR/leave: HungPN leave 11/5, TrinhMTT leave 8/5, Hang Internship Mtg LeQuangLam, Finance Apr part-time job info, ThinhLD birthday note. No New Relic alerts. |
| carrick | 2 | Rollbar [Socalautowraps] PROD #35 "jQuery is missing" (10 occ/5min, 11/5 01:12 UTC); Socalautowraps daily summary 10/5. No Redmine bugs from Generator/Elliott. |
| nick | 25 | Azure DevOps PRs on CNA.Operations.App by Emir LLaneza (#1492-1497: time-spent report, daily task completions feedback, surveyors boundaries, booking-confirm fix); CandaSurveyors daily task completions (8/5); Stripe acct-setup nags; ClickUp invoice task. **No mail from John Yi.** |
| rick | 60 | Heavy Rollbar/BugSnag stream. PROD: [FirstProject] React minified errors #418/#423/#425 (recurring), ChunkLoadError #882, RangeError stack-overflow #1007/#1008, TypeError null gift_main #1006; [InfinityRoses] PROD NoMethodError nil gift/price #419/#421, FacebookAds Invalid Contents #417/#418, ReadTimeout #413; [FountainStaging] BugSnag NoMethodError/NameError/PG::UndefinedTable in search#search (staging→INFO). No Kunal email. |
| kai | 13 | Madhuraka/Jira: Bitbucket PR #481 LIFM2-409 feedback, PR #489 missing-vars merge; Jira tix LIFM2-260 (Shopify image S3), LIFM2-259 (S3 bulk upload), LIFM2-435 (Listed-Buy total), LIFM2-438 (Listed-Con tab), LIFM2-434 (Quote Tool AI MVP), Anoma mentions on LIFM2-409/434. |
| ken | 254 | NewsLetter folder. Precognize GH PRs (25 msgs, 5 unique): #4885 SR-7279 filter part monitor (7 msgs, active), #4868 DP-177 duplicate canvas, #4884 SR-7300 remove tags raw plugin, #4886 SR-7255 disable confirm btn, #4887 sr-7252 fix Time-shift cancel. Bulk = mimaizumi/amocc-material + welligence/WellStack PR noise. |

**Alerts:**
- [FirstProject] PROD (rick) — recurring React minified #418/#423/#425 (10 occ/5min latest 11/5 01:10 UTC), TypeError #878 amount, RangeError stack-overflow #1007/#1008, ChunkLoadError #882, TypeError null gift_main #1006.
- [InfinityRoses] PROD (rick) — NoMethodError nil price #421 + nil gift #419 (10th occ), ReadTimeout #413 (10th occ), FacebookAds Invalid Contents #417/#418.
- [Socalautowraps] PROD (carrick) — Rollbar #35 jQuery missing, 10 occ/5min, 11/5 01:12 UTC.

**Action items:**
- Rick: triage InfinityRoses NoMethodError on `gift_variant.gift&.item_sku` and `object.price || object.gift.price` — both nil-safe gaps surfacing repeatedly.
- Rick: FirstProject React minified errors #418/#423/#425 still firing post-deploy — needs sourcemap lookup.
- Carrick: Socalautowraps jQuery-missing #35 — confirm asset pipeline / CDN regression.
- Duongdn: HungPN leave today (11/5) — note for capacity.
- Nick: no John Yi communication in window — confirm if expected.
