---
description: CDF reviewer monitor — check assigned evaluation forms, audit unreviewed evidence, compare with examples
---

# CDF Monitor

Checks https://cdf.nustechnology.com/ for forms where you are assigned as Reviewer.
For each form: finds non-passing slots at target level, audits pending evidence (Waiting for verification only), fetches indicator examples, compares evidence vs example, writes assessment report.

**Output:** `./reports/{YYYY-MM-DD}/{HHMM}-cdf-monitor.md`

---

## Run Command

```bash
SCRIPT="$HOME/.claude/skills/chrome-devtools/scripts/cdf-monitor.js"
node "$SCRIPT"             # Full run — all assigned forms
node "$SCRIPT" 537         # Single form by ID
```

The script:
1. Launches headed Chrome with persistent SSO profile at `tmp/cdf-browser-profile/`
2. Prompts user to log in if session expired (polls `page.url()` every 2s, up to 10 min)
3. Scrapes all 8 forms and writes:
   - `tmp/cdf-last-run.json` — full structured data
   - `reports/{date}/{time}-cdf-data.md` — draft markdown with evidence + example side by side

---

## Flow

### Step 1 — Run Script

```bash
node "$HOME/.claude/skills/chrome-devtools/scripts/cdf-monitor.js"
```

Watch stderr for login prompt. If SSO needed, a headed Chrome window appears — user logs in manually.
Script exits when done, printing paths to the JSON and draft markdown files.

### Step 2 — Read Draft + Write Assessment Report

Read `tmp/cdf-last-run.json` (or the draft markdown). For each slot with status `WAITING`:

- **Compare** evidence text against example text:
  - Does it demonstrate the required competency?
  - Is it specific enough (project name, outcome, metric)?
  - Does it satisfy the stated criteria in the example?
- **Verdict**: `APPROVE` / `NEEDS MORE` / `REJECT` with one-sentence reasoning.

Skip slots with status `VALIDATED` (already validated — old evidence excluded via `.old-evidence-list`).
Skip slots with status `MISSING`.

### Step 3 — Write Final Report

Save to `./reports/{YYYY-MM-DD}/{HHMM}-cdf-monitor.md`:

```markdown
# CDF Reviewer Monitor — {date} {time} (+07:00)

## Summary
- Forms reviewed: N | Missing slots: N | Waiting for review: N
- Forms needing action: **Name1, Name2**

---

## {Employee} — Form #{id}
**{current} → {target}**

### Slots Waiting for Review

| Slot | Assessment |
|------|------------|
| **Architecture** | **APPROVE** — evidence shows ... matches example requirement for ... |
| **Estimation** | **REJECT** — only 160h evidence, example requires ≥400h total. |
| **Knowledge acquisition** | **NEEDS MORE** — evidence covers bug fixes only, example also requires knowledge distribution to team. |

**Missing slots**: Deployment/Distribution, Meeting, Processes.

---
```

---

## Key Rules

- **Only `WAITING` evidence needs review** — icon `fa-arrows-rotate` = "Waiting for verification". `fa-check.valid` = already validated, skip.
- **Exclude `.old-evidence-list`** — evidence inside `.old-evidence-list` div is old/archived; already filtered out by the script.
- **SSO**: headed Chrome, persistent profile at `tmp/cdf-browser-profile/`. Session reused across runs.
- **Indicator example**: fetched via Rails UJS XHR (`Accept: text/javascript`) from `/indicators/{id}`. Already done by the script.
- **Evidence status per row icon**, not per indicator toolbar — icon class on `<svg>` inside `table.evidence tr.evidence td`.

---

## DOM Selectors (confirmed from live DOM)

| Target | Selector |
|--------|----------|
| Level buttons | `button.btn-secondary[data-level]` (current = `+.btn-success`) |
| Result grid row | `table.result tbody tr[data-slot-id]` |
| Level cell | `td.slot-level-result[data-level-number="N"]` |
| N/A badge | `span.badge-warning` |
| Slot card | `div.card[data-slot="N"]` |
| Level section | `li.level` → `.level-number` = "Level N" |
| Already passed | `.review-toolbar .review-status .text-success` = "Already PASSED" |
| Evidence table | `table.evidence[data-evidence-id]` (exclude `.old-evidence-list`) |
| Evidence icon | `tr.evidence td svg` — class contains `arrows-rotate` / `fa-check valid` / `circle-exclamation` |

---

## Usage

```
/cdf-monitor           # Full run — all assigned forms
/cdf-monitor 537       # Single form by ID
```
