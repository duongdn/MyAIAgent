# CDF Reviewer Monitor — 2026-05-27 09:15 (+07:00)

## Summary
- Forms reviewed: 8 | Missing slots: 54 | Waiting for review: 28
- **20 APPROVE** | **7 NEEDS MORE** | **0 REJECT**
- Forms needing action: **PhucVT, TamHVH, TuanNT, VietPH, ViTHT, VuTQ**
- Forms with no waiting evidence: **HaVS, SangNV** (all slots missing)

---

## HaVS — Form #537
**Software Engineer → Senior Software Engineer**

No evidence submitted. All 5 non-passing slots missing: Knowledge acquisition, Deployment/Distribution, Documentation, Meeting, Processes.

---

## PhucVT — Form #563
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Architecture** | **APPROVE** — designed Device module architecture + new Sensor module using Abstract Factory + Strategy patterns (SensorProcessorFactory, AbstractSensorDataProcessor, per-supplier processors). Running in production with 6+ suppliers; also coached Jonty to follow the architecture. Satisfies "propose and implement initial architecture running stably in production." |
| **Knowledge acquisition** | **APPROVE** — researched and implemented full CI/CD pipeline from scratch; guided team with documentation so "all team members successfully following the new workflow." Satisfies the distribution criterion via documentation + team-wide adoption. |
| **Technical Requirement** | **APPROVE** — 5 evidence pieces: (1) code reviews for Key/Jonty/Jon/Leon covering architecture/DB/workflow/security/performance; (2) provided technical instructions; (3) acting as Senior Lead/Architect for Airagri; (4) resolved PHP 7.4→8.0 upgrade issues; (5) raised PHP upgrade requirement with customer. Covers both authoring/deciding and reviewing/approving. |
| **Direction** | **APPROVE** — explicitly acting as Senior Lead/Architect for Airagri: designs architecture, assigns tasks, reviews code, guides Royden, Jonty, Leon, Jon. Second evidence: explains issues for Leon on notifications, incidents, sensors. Clear team lead role. |

**Missing slots**: Deployment/Distribution, Meeting, Processes.

---

## SangNV — Form #546
**Software Engineer → Senior Software Engineer**

No evidence submitted. All 13 non-passing slots missing.

---

## TamHVH — Form #533
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Non-functional requirements** | **APPROVE** — setup pydantic logfire + sentry for performance monitoring and bug tracking, then fixed issues discovered via those tools. Directly satisfies "install tools for tracking bugs/monitoring performance." |
| **Decision Making** | **APPROVE** — self-studied sqlalchemy ORM, decided to adopt it for FastAPI with Repository Pattern, migrated from Supabase client API to async DB connection. Demonstrates tech stack + architecture pattern decisions on a real project. |
| **Insight** | **APPROVE** — directly met with customer and their CTO to explain problem and propose solution. Satisfies "direct communication, making difficult issues easy to understand by non-technical people." Single but concrete example. |
| **Technical Requirement** | **NEEDS MORE** — evidence is one database tooling decision (sqlalchemy + alembic for ORM/migrations). Example requires authoring/reviewing comprehensive technical requirements: final decisions on tech stack, architecture, server, tools, frameworks. Single ORM choice is insufficient scope. |

**Missing slots**: Technology, Work quality, Architecture, Knowledge acquisition, Estimation, Deployment/Distribution, Meeting, Processes, Role, Direction.

---

## TuanNT — Form #534
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Work quality** | **APPROVE** — demonstrates (1) design pattern knowledge with real Drupal examples (Factory via PluginManager, Decorator via Service Container); (2) actual code reviews of Weather Map module (data mapping, loading/error states) and Split Mob feature (controller delegation, business logic, breed normalization, ActivityHistory). Satisfies 2 code reviews + pattern knowledge. |
| **Knowledge acquisition** | **NEEDS MORE** — evidence shows ONE tech-talk about Zustand. Example requires "1 training + 2 tech-talks + 2 blog posts" or an equivalent path (leader assigned to apply tech across multiple projects). One tech-talk alone does not satisfy any of the three criteria. |
| **Estimation** | **APPROVE** — multiple project estimates with breakdowns: Rebecca (~90h, itemized), Optimumpet (110h, customer-approved), Airagri (146h, 5 features broken down), Techwarn WP (40h), Networkguard WP (80h), Amazing Meds (~100h, 4 pages itemized). Total ~570h across projects, multiple approved estimates. |
| **Non-functional requirements** | **APPROVE** — four evidence pieces: (1) WP Engine Page Speed Boost for CSS/JS minification + image optimization (performance); (2) enforced 2FA + changed login URL (security); (3) FCM refactor separating notification logic from controllers for maintainability/testability; (4) AirAgri sensor caching for performance/scalability with implementation details. Covers performance, security, maintainability, testability, scalability. |
| **Insight** | **APPROVE** — direct client work without BA/manager, task coordination and milestone management; daily progress reports; technical support to team members as main reviewer. Satisfies timely reporting + direct communication + making issues understandable. |
| **Documentation** | **APPROVE** — two projects documented: (1) Optimumpet System Architecture doc (Drupal 10, Entity API, Decoupled-ready architecture); (2) AirAgri: docs/system-architecture.md (architecture, auth, cache, notification, deployment), docs/TECHNICAL_GUIDELINES.md (workflow, coding convention, migration, error handling, testing), Adding_New_Suppliers.md. Clearly satisfies "write complex documents including System Architecture Document, System Documentation." |
| **Technical Requirement** | **APPROVE** — comprehensive: (1) Amazing Meds tech recommendations (Elementor over Divi, Page Speed Boost); (2) AirAgri Sensor module architecture/data flow/DB design/service separation decisions; (3) approve cache/performance design for Sensor (SensorCacheService, specific commits reviewed); (4) DB migration reviews (indexes, safeDown, duplicate keys, rollback safety). Covers tech stack, architecture, and design approval across multiple projects. |
| **Direction** | **APPROVE** — guided AirAgri dev team in Sensor module (technical solutions, requirement analysis, code review, DB/performance optimization); created Adding_New_Suppliers.md documenting exactly how to extend the architecture; guided devs to use Strategy/Factory instead of hardcoding supplier logic. Demonstrates team guidance with documented outcomes. |

**Missing slots**: Deployment/Distribution, Meeting, Processes.

---

## VietPH — Form #549
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Technology** | **APPROVE** — conducted deep compatibility analysis of Doctrine ORM vs PHP 8 (framework source-level analysis), proving legacy core infeasible and justifying PrestaShop 9 transition. Then personally refactored legacy DB schema to meet PS9 standards, enabling platform bootability and unblocking entire team's migration. Satisfies "debug difficult bugs by looking into source code of framework/library" and "recognized as main contact for difficult issues." |

**Missing slots**: Work quality, Architecture, Knowledge acquisition, Estimation, Deployment/Distribution, Non-functional requirements, Decision Making, Insight, Documentation, Meeting, Technical Requirement, Processes, Role.

---

## ViTHT — Form #536
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Architecture** | **NEEDS MORE** — evidence covers migration proposal from Fairsign to BoldSign: integration impact analysis, workflow changes, compatibility requirements. This is integration architecture for one feature, not project-level architectural design. Example requires proposing/implementing initial architecture for a project running stably in production, or significant architectural changes to improve stability/performance. |
| **Knowledge acquisition** | **NEEDS MORE** — evidence shows bug investigation (Pro Cart removal, PayPal button undefined) and communicating root causes to clients. This is debugging + communication, not mastering new technology and distributing it. No training/tech-talks/blog posts mentioned; no multi-project tech leadership. |
| **Decision Making** | **NEEDS MORE** — evidence is task prioritization and deployment coordination to minimize merge conflicts. Example specifically requires decisions on architectures, frameworks, tech stack, or improvement strategies (caching, security, deployment strategy). Workflow coordination doesn't qualify. |
| **Technical Requirement** | **NEEDS MORE** — EV1: investigated ShipStation policy change and issued warnings (external service research, not technical requirement authorship). EV2: analyzed Pro Cart UX change proposal and provided impact analysis (UX review, not technical requirement approval). Neither demonstrates "final decision on tech stack/architecture" or formal technical requirement approval. |
| **Domain Knowledge** | **APPROVE** — explicitly names 3 different domains with project names: E-commerce (Lemon Bar), Apartment Booking (Rentle), Sports & Fitness (Alissa/Physlate). Satisfies "worked on at least 3 projects from different domains." |
| **Role** | **APPROVE** — assisted BA team by analyzing and explaining technical issues, identifying root causes, providing solutions/recommendations for client communication. Trello link provided as evidence. Satisfies "BA or other roles can ask for advice, solution or answers." |
| **Direction** | **APPROVE** — EV3 is strong: reviewed code for new team members on complex frontend tasks and edge cases; provided guidance on project workflows and task handling processes; mentored on how to analyze business requirements before implementation. Satisfies technical support + guidance criteria. |

**Missing slots**: Deployment/Distribution, Documentation, Meeting, Processes.

---

## VuTQ — Form #554
**Software Engineer → Senior Software Engineer**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Technology** | **APPROVE** — EV4 explicitly states recognized as main contact for difficult Next.js issues (image loading, client-side fetch, FCP/LCP). EV5: Rails 4→7 upgrade, found low-level PostgreSQL adapter incompatibility, investigated framework source code, implemented monkey patch in ActiveRecord. Directly satisfies "recognized as main contact for difficult issues" + "debug difficult bugs by looking into source code of framework/library." |
| **Work quality** | **APPROVE** — multiple PR reviews for old and new devs (EV3); comprehensive design pattern knowledge with real examples: Decorator via Draper (UserDecorator), Singleton-like (ShipStation/MailgunService), Factory-like (ShipStation::BuildParamsServices), Presenter/Decorator (BasePresenter/ContactPresenter), Trailblazer step-based rewrite. Satisfies 2+ code review sessions + pattern knowledge. |
| **Knowledge acquisition** | **APPROVE** — EV3+EV4: assigned as leader to study Panko serialization and apply across multiple projects (Ray-Servicey, Ray-Sloth, Fountain, Infinity). Also: Backbone.js→Next.js migration study; assigned to evaluate pg_search→Elasticsearch upgrade. Satisfies "assigned as a leader in a team to study new technology and apply it in multiple projects." |
| **Estimation** | **NEEDS MORE** — single estimate: 160h for Giftdrop new redemption flow (Trello link, no breakdown shown). Example requires estimate >= 400h for a project, or multiple scopes totaling >= 400h. 160h single-feature estimate is insufficient. |

**Missing slots**: Deployment/Distribution, Meeting, Processes.

---

## Action Summary

| Employee | APPROVE | NEEDS MORE | Key gaps |
|----------|---------|------------|----------|
| PhucVT | 4 | 0 | — |
| TamHVH | 3 | 1 | Technical Requirement (scope too narrow) |
| TuanNT | 7 | 1 | Knowledge acquisition (only 1 tech-talk) |
| VietPH | 1 | 0 | — |
| ViTHT | 3 | 4 | Architecture, Knowledge acquisition, Decision Making, Technical Requirement |
| VuTQ | 3 | 1 | Estimation (only 160h, need ≥400h) |
