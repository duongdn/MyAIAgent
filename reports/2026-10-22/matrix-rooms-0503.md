# Matrix — since 2026-10-21 05:16 +07:00 (summarized 05:30)

**Active rooms: 21 / 151 | Messages: 505**

## Security (Laravel + PHP CVEs)
- duongdn 10:15–10:17: Laravel TokenGuard auth bypass (GHSA-f9x3-7vq9-cph6, CVSS 9.2). Asked every team to review projects and report.
- longvv: auctionwarehouse + definitive-guide affected, fixed both repos 10:57. khanhhh: Baamboozle affected, fixed and told the customer 11:36. RDC has no Laravel. lenh/tuannt: no Laravel projects. Colin-ETZ: duongdn says the project is done, skip.
- PHP CVE (10-21): phucvt/longvv joked about it 22:27. duongdn 04:26: first step is to message each customer that we know about the issue and are handling it.

## PHP Projects — Marcel / XiD
- chientx 21:25: Marcel emailed Jack + Carrick about security issues in XiD, also pinged on WhatsApp. namtv: Dương plans to handle it tomorrow together with the Laravel issue. duongdn 04:19: sent Marcel a holding message.

## Bailey (NUS - Bailey - Paturevision 2026 + BA/QC)
- Pre-live plan debated (tuannt/datnc/havs/vutq): build pre-live Console on live DB, smoke-test, swap domain. duongdn told devs to sort it out face to face.
- vutq pulled to Kunal go-live 13:53. duongdn unhappy no one flagged the clash. Pre-live Console up 16:13, SSL failed. tuannt fixed config + SSL on `prelive2.console.paturevision.fr` 20:16, testing Thu.
- BA/QC: Joey asked why split work was done before the upgrade (on Rails 5). duongdn: if it was our call, we absorb the migration cost.

## Fountain (Kunal - Fountain)
- Release Oct 20 (BE #761 + FE #927) deployed to LIVE 14:04 (Rick on Trello). Team Remove on BETA for QC.
- QC found an engraving-fee bug on the new site. Rick created bug card for #3155 (set password / team invitation).
- datnc joined to improve the QC process (QA repo created, asked for Redmine access).
- Note: test-account passwords and env var names were pasted in-room (not copied here).

## Maddy
- duongdn 08:32: Madhuraka says we built LIFM2-470 wrong, "rất nghiêm trọng". tuantt/longvv: the ticket didn't describe the rule, Anoma tested OK, closer to a CR. duongdn: explain politely, accept, ask for clearer specs. Kai replied to Madhuraka along those lines 09:08.

## OhCleo
- minhtv assigned LuHX (hide Claire/Trent, app-store text, smart search) and LongVV (top-down Trello tasks). LongVV fixed the subscribe-page copy, HungPN asked to ship it. minhtv chased LongVV for idle time 15:59.

## Elena - Optimization
- M2 work: TienND2 on Model List, TriNM ready for QC. AA bug tickets (AA-122..125) as hourly tasks, SamHT est ~2h for 124. duongdn added TuanNT to help FE while idle. TuanNT went to Bailey pre-live instead 15:43.

## Other
- Arthur: duongdn told namtv that Chris paid. namtv warned to push code (laptop/disk losses). phucvt "để e push lên liền" 08:52 and replied to Chris.
- AirAgri finance (halt): payment received from James Le Chevalier 13:34.
- DefinitiveGuide: Sept bill paid. Upgrade done, preparing live. TuanNT asking for tasks (idle).
- Brad Ballantine: customer replied after leave, duongdn handed it to LongVV.
- Resource Arrangement: ThienVN AM 10-21 off, DatNT PM 10-23 off (idle/internal).
- AI Training session held, materials on SVN + GitHub team.
- Recruitment: interview follow-ups.
