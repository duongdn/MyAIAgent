# CDF Reviewer Monitor — 2026-05-28 10:03 (+07:00)

## Summary
- Forms reviewed: **8** | Slots with waiting evidence: **33** | Missing (no evidence): many
- Forms needing action: **PhucVT, TamHVH, TuanNT, VietPH, ViTHT, VuTQ**
- No waiting evidence: **HaVS** (#537), **SangNV** (#546)

---

## HaVS — Form #537
**Software Engineer → Senior Software Engineer**

No slots have waiting evidence. All non-passing slots (Knowledge acquisition, Deployment/Distribution, Documentation, Meeting, Processes) are **MISSING**.

---

## PhucVT — Form #563
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Architecture** | **APPROVE** — evidence shows proposing and implementing Strategy/Abstract Factory architecture for Sensor module in production handling 6+ suppliers; "suggest necessary changes to design to make app more stable" with concrete production results and guided team member Jonty to build on it. |
| **Knowledge acquisition** | **NEEDS MORE** — CI/CD evidence partially meets option 3 (studied new tech, guided team) but lacks client-facing root cause communication; MySQL Workbench help is too minor. Need either training/tech-talks/blog posts, or more substantial client-responding-with-root-cause evidence. |
| **Technical Requirement** | **APPROVE** — comprehensive evidence: acts as Senior Lead/Architect (final decision authority), reviewed code for 4+ team members (architecture, DB, security, performance), raised PHP 7.4→8.0 package feasibility issues directly with customer. Hits all three sub-criteria. |
| **Direction** | **APPROVE** — explicit Senior Lead/Architect role: assigns tasks, reviews code, supports Royden/Jonty/Leon/Jon on technical matters. Matches "acts as team lead" example exactly. |

**Missing slots**: Deployment/Distribution, Meeting, Processes.

---

## SangNV — Form #546
**Software Engineer → Senior Software Engineer**

No slots have waiting evidence. All 13 non-passing slots are **MISSING**.

---

## TamHVH — Form #533
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Work quality** | **NEEDS MORE** — evidence shows Repository Pattern knowledge only. Criteria requires the three specific patterns (Singleton, Decorator, Factory) AND at least 2 code review sessions. Neither requirement is met by this evidence. |
| **Architecture** | **NEEDS MORE** — "suggest using sqlalchemy ORM for stability/performance" is a single brief tool suggestion. No evidence it was implemented, went to production, or involved broader architectural design. Thin for Level 3. |
| **Knowledge acquisition** | **NEEDS MORE** — self-studied Riak DB and found root cause of corrupted data in production. Covers the "study difficult problem/new tech" part of option 3, but missing the "help team to resolve from technical viewpoint AND answer/respond to clients with root cause and actions." |
| **Estimation** | **APPROVE** — "Break tasks and estimated a scope for phase 2, ~180 hours" exactly matches the Level 3 example ("about 180 hours"). |
| **Non-functional requirements** | **NEEDS MORE** — setup Sentry/logfire for monitoring is good evidence for bug tracking/performance monitoring, but covers only one of the required dimensions. Missing: testing (unit tests), security best practices, caching, or compatibility evidence. |
| **Decision Making** | **APPROVE** — decided to use sqlalchemy ORM + async DB connection over Supabase client API, implementing Repository Pattern for FastAPI project. Clear technical decision about data layer strategy. |
| **Insight** | **APPROVE** — directly met with customer and their CTO to explain technical problem (Riak/custom library) and suggest solutions. Matches "Worked directly with customer without BA, also worked as PM role." |
| **Meeting** | **APPROVE** — organized meeting with customers to explain Riak DB issues and proposed solutions. Evidence text is nearly verbatim match to the Level 3 example. |
| **Technical Requirement** | **APPROVE** — decided tech stack (sqlalchemy + alembic), reviewed/approved DB designs from TienND2 across multiple projects (Zarihoun + Gowabi). Directly matches example "Reviewed/approved design database from devs (tables, associations)." |

**Missing slots**: Technology, Deployment/Distribution, Role, Direction.

---

## TuanNT — Form #534
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Work quality** | **APPROVE** — demonstrates all three required patterns with specific code file evidence: Factory (SensorServiceFactory/SensorProcessorFactory), Singleton (DynamoSensorService with `static $instance`), Decorator (Drupal service extension); plus 2+ documented code review sessions (Weather Map review + Split Mob review) with detailed review criteria. |
| **Knowledge acquisition** | **NEEDS MORE** — one detailed Zustand techtalk is good but insufficient alone: option 1 needs 1 training + 2 tech-talks + 2 blog posts; option 2 needs multiple projects; option 3 needs client-facing communication. Techtalk alone doesn't fully satisfy any path. |
| **Estimation** | **APPROVE** — multiple customer-approved estimates across 6 projects totaling ~568h (Rebecca 90h + optimumpet 110h + Airagri 146h + techwarn 40h + networkguard 80h + Amazing Meds 102h). Exceeds ≥400h threshold with detailed breakdowns. |
| **Non-functional requirements** | **APPROVE** — comprehensive coverage across all required dimensions: performance (WP PageSpeed 60→94), security (2FA enforcement, login URL change), maintainability (FCM Strategy/Factory refactor), and full NFR audit for AirAgri covering caching, SQL optimization, testing (Codeception + Jest), security (JWT, property_id scoping). |
| **Insight** | **APPROVE** — direct customer/partner communication without BA on Amazing Meds and Airagri; daily progress reports; serves as main technical reviewer for team; guided AirAgri dev on Sensor architecture with specific commit-level evidence. Hits multiple sub-criteria. |
| **Documentation** | **APPROVE** — detailed System Architecture document for Optimumpet (4-section: system architecture, config management, data governance, performance/scalability) plus AirAgri docs (system-architecture.md, TECHNICAL_GUIDELINES.md, Adding_New_Suppliers.md). Clearly meets "Software Architecture Document, System Documentation" criteria. |
| **Technical Requirement** | **APPROVE** — authored Strategy/Factory architecture for Sensor module, designed SensorDataServiceFactory/SensorProcessorFactory, reviewed Sensor cache design (with commit evidence), reviewed DB migrations for best practices. Covers all three sub-criteria. |
| **Direction** | **APPROVE** — guided AirAgri dev on Sensor module architecture, code review (4 specific commits), performance optimization guidance (cache, fallback, N+1). Specific, verifiable evidence with commit hashes. |

**Missing slots**: Deployment/Distribution, Meeting, Processes.

---

## VietPH — Form #549
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Technology** | **APPROVE** — deep PrestaShop 9/PHP 8/Doctrine analysis: proved Doctrine 2/3 incompatibility at framework level, preventing months of misdirected work; re-engineered legacy DB schema to meet PrestaShop 9 schema standards; made platform bootable on legacy DB enabling the whole team to unblock migration. Matches "debug difficult bugs by looking into source code of framework/library." |

**Missing slots**: Work quality, Architecture, Knowledge acquisition, Estimation, Deployment/Distribution, Non-functional requirements, Decision Making, Insight, Documentation, Meeting, Technical Requirement, Processes, Role.

---

## ViTHT — Form #536
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Architecture** | **NEEDS MORE** — proposing migration from Fairsign to BoldSign and integrating Fairsign are third-party service integrations, not architectural design of a project. Doesn't clearly demonstrate "propose/implement initial architecture" or "suggest structural changes to make app more stable/better performance." Needs evidence of broader system design or architectural decision-making. |
| **Knowledge acquisition** | **APPROVE** — investigated PayPal button undefined issue and Pro Cart removal bug: studied rendering flow and PayPal component integration, found root causes, presented findings and preventive solutions to clients to improve confidence. Clearly matches option 3: study difficult problem, resolve from technical viewpoint, respond to clients with root cause and actions. |
| **Decision Making** | **NEEDS MORE** — evidence shows staging deployment coordination and merge conflict management (process management), not "deciding appropriate architectures/frameworks/tech stack" or "deciding strategies to improve the app." Doesn't meet Level 3 criterion for technical decision-making. |
| **Technical Requirement** | **APPROVE** — raised ShipStation policy change impact (store name → storage-based mapping) with recommendations to prevent synchronization issues; analyzed Pro Cart auto-clear proposal with detailed UX impact analysis and safer alternatives. Covers "raise issues if technical point unfeasible" and "review designs done by others, give useful advice." |
| **Domain Knowledge** | **APPROVE** — 5 projects across 5 distinct domains: e-commerce (Lemon Bar), apartment booking (Rentle), sports/fitness (Alissa - Physlate), financial (Sandro - Altacred), workforce management (Vonovia). Exceeds minimum of 3 domains. |
| **Role** | **APPROVE** — assisted BA team by analyzing technical issues, identifying root causes, providing solutions for client communication. Matches "play an important role where BA can ask for advice, solution or answers." |
| **Direction** | **APPROVE** — reviewed code and guided new team member Đạt with detailed task completion criteria; provided workflow guidance and best practices; mentored on requirement analysis before coding; implemented complex accessibility work and explained to team what needs checking and follow-up. |

**Missing slots**: Deployment/Distribution, Documentation, Meeting, Processes.

---

## VuTQ — Form #554
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Technology** | **APPROVE** — recognized as main contact for Next.js issues (image optimization, client-side fetch flickering, FCP/LCP) and Rails issues (caching, Panko, multi-database); implemented ActiveRecord PostgreSQL adapter monkey patch by digging into source code to unblock Rails 4→7 upgrade; investigated Ruby 2.7+Rails 5.1 → newer migration at deep dependency level. Exceptional evidence of all three sub-criteria. |
| **Work quality** | **APPROVE** — multiple PR reviews for old and new devs; all three required patterns with specific code references: Decorator (UserDecorator < Draper, BasePresenter < SimpleDelegator), Singleton-like (ShipStation, MailgunService class methods), Factory-like (ShipStation::BuildParamsServices#items, StripePaymentFacade source-type branching) across Fountain, Servicey, and Console. |
| **Knowledge acquisition** | **APPROVE** — multiple paths satisfied: option 2 (led Panko serialization adoption across Servicey + Sloth; led Backbone.js → Next.js migration; led Elasticsearch upgrade) and option 3 (PM2/Tailwind/Stripe/Mailgun/Junip client-facing root cause responses). Strong, diverse evidence. |
| **Estimation** | **NEEDS MORE** — single scope estimate of 160h for GiftDrop redemption flow. Criteria requires ≥400h total (single project or cumulative). 160h is below threshold. Needs additional project estimates to reach ≥400h total. |

**Missing slots**: Deployment/Distribution, Meeting, Processes.

---

## Quick Action Summary

| Form | APPROVE | NEEDS MORE | Missing |
|------|---------|------------|---------|
| HaVS #537 | — | — | 5 slots |
| PhucVT #563 | Architecture, Tech Req, Direction | Knowledge acquisition | 3 slots |
| SangNV #546 | — | — | 13 slots |
| TamHVH #533 | Estimation, Decision Making, Insight, Meeting, Tech Req | Work quality, Architecture, Knowledge acquisition, NFR | 4 slots |
| TuanNT #534 | Work quality, Estimation, NFR, Insight, Documentation, Tech Req, Direction | Knowledge acquisition | 3 slots |
| VietPH #549 | Technology | — | 13 slots |
| ViTHT #536 | Knowledge acquisition, Tech Req, Domain Knowledge, Role, Direction | Architecture, Decision Making | 4 slots |
| VuTQ #554 | Technology, Work quality, Knowledge acquisition | Estimation | 3 slots |
