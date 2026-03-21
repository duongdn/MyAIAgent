# My AI Agent — Daily Monitoring Assistant

Automated monitoring agent that checks Slack, Discord, Email, Matrix, GitHub, Google Sheets, Trello, Scrin.io, Redmine, and web health across 10+ client projects. Runs via [Claude Code](https://claude.ai/code) slash commands.

## Setup on a New PC

### Prerequisites

- Node.js 18+ (for Google Sheets API)
- `openssl` (for secret decryption)
- [Claude Code CLI](https://claude.ai/code) installed
- IMAP-enabled email accounts
- API tokens for: Slack, Discord, Trello, GitHub, Redmine, Scrin.io, Matrix, JIRA

### 1. Clone & Install

```bash
git clone <repo-url>
cd My-AI-Agent
npm install
```

### 2. Decrypt Secrets

Create `.env` with the encryption key (ask the project owner for the key):

```bash
echo "SECRETS_KEY=<ask-owner-for-key>" > .env
```

Then decrypt all config files:

```bash
bash scripts/decrypt-secrets.sh
```

This generates 13 config files in `config/` (`.email-accounts.json`, `.slack-accounts.json`, etc.) from their encrypted `.enc` counterparts.

### 3. Verify

```bash
# Check configs exist
ls config/.email-accounts.json config/.slack-accounts.json config/.trello-config.json

# Run a quick test
claude "/daily-report-refresh slack"
```

## Usage

### Daily Report (morning ~8AM)

```bash
claude "/daily-report"
```

Generates `reports/YYYY-MM-DD-daily-report.md` — full previous-day summary across all monitoring sources.

### On-Demand Refresh (anytime)

```bash
claude "/daily-report-refresh"
```

Generates `reports/YYYY-MM-DD-HHMM-update.md` — new activity since last check. Separate file, never overwrites daily report.

Filter by source:

```bash
claude "/daily-report-refresh slack"      # Slack only
claude "/daily-report-refresh fountain"   # Matrix + Sheets + Trello
claude "/daily-report-refresh elena"      # GitHub + Redmine
```

## Monitoring Sources

| Source | Config File | What It Checks |
|--------|------------|----------------|
| Email (6 accounts) | `config/.email-accounts.json` | IMAP fetch, filtered highlights |
| Slack (13 workspaces) | `config/.slack-accounts.json` | `search.messages` API, thread replies |
| Discord (2 accounts) | `config/.discord-accounts.json` | AirAgri, Bizurk servers |
| Matrix/Element | `config/.matrix-config.json` | Fountain room — weekly plan updates |
| GitHub PRs | SSH keys in `~/.ssh/` | Elena-SamGuard (duongdn), Precognize (nusken) |
| Google Sheets | `config/.google-docs.json` | Employee task log hours (10 sheets) |
| Scrin.io | `config/.scrin-config.json` | Time tracking cross-reference (John Yi only) |
| Trello | `config/.trello-config.json` | Check Progress/Mail cards, Fountain board |
| Redmine | `config/.redmine-config.json` | Ticket status updates |
| Web | `config/.web-monitors.json` | samguard.co health + JS errors |
| JIRA | `config/.jira-config.json` | Xtreme Soft worklogs |

## Project Structure

```
.
├── .claude/commands/          # Project-local slash commands
│   ├── daily-report.md
│   └── daily-report-refresh.md
├── config/                    # All config files
│   ├── *.json.enc             # Encrypted configs (in git)
│   ├── .google-docs.json      # Decrypted at runtime (NOT in git)
│   ├── .matrix-config.json
│   ├── .jira-config.json
│   ├── daily-agent-*.json     # Google service account key
│   └── ...
├── docs/
│   ├── daily-report-workflow.md   # Full workflow reference
│   ├── weekly-monitor-workflow.md
│   └── memory/                # Agent operational notes
├── reports/                   # Generated reports (committed)
├── scripts/
│   ├── encrypt-secrets.sh     # Encrypt configs before commit
│   ├── decrypt-secrets.sh     # Decrypt configs after clone
│   └── discord-token-refresh.js
├── .env                       # SECRETS_KEY (NOT in git)
└── .gitignore
```

## After Editing Configs

If you change any config file (tokens, accounts, etc.), re-encrypt before committing:

```bash
bash scripts/encrypt-secrets.sh
git add config/*.enc config/.*.enc
git commit -m "Update encrypted configs"
```

## Two-Timeline System

The agent tracks two independent monitoring timelines in `.monitoring-timelines.json`:

- **`daily_report`** — updated when daily report runs (~8AM). Start time for next daily report.
- **`refresh`** — updated when refresh runs. Start time for next refresh.

Each only updates its own timeline. If a refresh only checks some sources, unchecked sources fall back to the daily_report timeline on next run.

## Key Rules

- Slack: must use `search.messages` (not `conversations.history`) to capture thread replies
- IMAP: search `SINCE {previous_day}`, filter by Date header (timezone handling)
- Slack `after:YYYY-MM-DD` excludes that date — use day-before + epoch filter
- Scrin.io cross-reference: compare John Yi task log only, not TuanNT total
- Alert found = do NOT complete Trello checklist item
- Unfilled hours show "—", not "0h"
