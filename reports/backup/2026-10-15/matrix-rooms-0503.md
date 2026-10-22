# Matrix: since 2026-10-14 08:45 (+07:00), summarized

**Active rooms: 21 / 151 | Messages: 391**

## Lyf Support (!6gAjd1Xp…, 80)
- LongVV/minhtv fixed the duplicate jeff@ admin user and the password-reset flow. minhtv asked for full E2E testing; LongVV sent the PR to the customer for merge.
- LSA-1524 (deploy task): duongdn confirmed 14:02 that it was done and merged to live ✅.
- New ask: the customer's other app has broken PHP APIs that need porting to C#. LongVV estimated 16h, minhtv buffered it to 20h plus a tester. LongVV posted a backend P0 work summary. The "For You" page is WordPress (lyfsupport.app), and the customer will be asked to share access.

## Elena - Optimization (171)
- Release day 10-14. QC re-verified bugs. Branching confusion: the internal vs external `feature/optimization` branches have the same name but different code, and PR #351 conflicted. Resolved via Precognize PRs #5508/#5511 (FE released 16:13) and #5512 (BE).
- vytth told the customer the release was done at 17:02 ✅. From 10-15, log tasks with the Optimization + OP-M2 tags.
- Open discussion: whether to split internal/external test environments. Not decided.

## NUS - Bailey - Paturevision 2026 (45)
- Urgent console 500s (Redmine #81430): heavy bulk quick_modify_update is not in background jobs, and the weaker split servers fall over. duongdn: fix it free and move all heavy APIs to background jobs. VuTQ is on the console fix. Grazing Desktop fixes went live 15:11.
- TuanNT left early (clinic). datnc asked for the French translation-string change Joey requested. It wasn't done before he left.

## Kunal - Fountain (29)
- V2 goes live **10-15**. DatNT deployed V2 + the Staff app to Staging/Beta (heavy conflict resolution, so possible lost code).
- ThinhT found a price bug when adding many gift items to pro/send. It reproduces on test.fountaingifts.com, and "how do we tell the customer?" is unanswered.

## Other
- TuanNT DM: replied that he had logged the 10-13 hours (the reminder was a false positive). Left early 10-14 to see a doctor and asked to move the make-up dev hours to next week. duongdn OK'd it.
- Andrew Taraba: customer AI script broken since Monday. The customer asked to "jailbreak" the POS plugin. duongdn: build an add-on plugin, investigate ~1h first.
- namtv DM: unknown Zhenke Xu contact on Brad's site is likely Brad's friend (duongdn). The Bizurk contact email bounces, so find Brad's email.
- Arthur: customer ran the gate on prod. PhucVT replied (Ignore List).
- Resource Arrangement: ThienVN sick morning 10-14. HiepNT off 16/10 (LuHX covers Cameron). HauTT off 16/10.
- OhCleo: HungPN tests the new design tomorrow. AI training session 1 (chientx) held 11:00.
- duongdn left 16:45, making up the time tonight.
