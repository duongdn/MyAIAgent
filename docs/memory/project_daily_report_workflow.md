---
name: Daily Report Workflow - Full Checklist & Trello Mapping
description: Complete daily monitoring workflow with all data sources, Trello check progress mappings, completion rules, and API details
type: project
---

## Daily Report Workflow

Run every morning. Monitor yesterday's activity across all channels. Generate report to `reports/YYYY-MM-DD-daily-report.md`.
Full details in `docs/daily-report-workflow.md`.

### Checklist Items

1. **Monitor Email** — 6 accounts in `.email-accounts.json`
2. **Monitor Slack** — 13 workspaces in `.slack-accounts.json` (2 use session tokens: Amazing Meds, Equanimity)
3. **Monitor Discord** — 2 accounts in `.discord-accounts.json` (nusvinn: AirAgri/HOMIEAPP, nuscarrick: Bizurk)
4. **Monitor Web** — samguard.co JS console errors check
5. **Google Docs** — 5 spreadsheets (LongVV, PhucVT, TuanNT, Fountain, VietPH)
6. **Scrin.io** — company "john yi", employee 453601. Config in `.scrin-config.json`
7. **Daily Report Checks** — Kai, Nick, Jeff, Vinn
8. **Matrix/Element** — Fountain room: weekly plan vs task log. Config in `.matrix-config.json`
9. **GitHub PRs** — Elena-SamGuard (duongdn acct) + Precognize (nusken acct). Config in `.elena-pending-actions.json`
10. **Redmine** — Update ticket status after deploy. Config in `.redmine-config.json`

### Trello Mappings (see docs/daily-report-workflow.md for full details)

**Normal**: Maddy→XtremeSoft, Blake→SoCalAutoWraps, JohnYi→AmazingMeds+Scrin.io
**Should do**: JamesDiamond→AirAgri Discord+PhucVT sheet
**Closely monitor**: Franc→RDC, Rory→SwiftStudio, Aysar→Baamboozle, Elliott→Generator
**Work**: Raymond→LegalAtoms, Marcel→Equanimity, Colin→AigileDev, AndrewTaraba→Bizurk, Elena→SAMGuard+GitHub+Redmine, MPFC→MyPersonalFootballCoach, Bailey→GlobalGrazing+VietPH, Fountain→Matrix+TaskLog+Capacity, Rebecca→WilliamBills, NeuralContract→email search

### Config Files
`.slack-accounts.json`, `.discord-accounts.json`, `.email-accounts.json`, `.web-monitors.json`, `.google-docs.json`, `.scrin-config.json`, `.trello-config.json`, `.matrix-config.json`, `.redmine-config.json`, `.elena-pending-actions.json`, `daily-agent-490610-7eb7985b33e3.json`

### GitHub Account Mapping
- `nuscarrick` — default
- `duongdn` — Elena-SamGuard-Digital-Plant
- `nusken` — Precognize/development
