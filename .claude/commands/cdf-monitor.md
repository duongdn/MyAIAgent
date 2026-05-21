---
description: CDF reviewer monitor — check assigned evaluation forms, identify unreviewed evidence gaps
---

# CDF Monitor

Browser-based check of https://cdf.nustechnology.com/ for forms where you are assigned as Reviewer.
For each form: identify non-passing categories at the target level, then audit unreviewed evidence slots.

**Output:** `./reports/{YYYY-MM-DD}/{HHMM}-cdf-monitor.md`

---

## Flow

### Step 1 — Login (SSO)

Use Puppeteer in **headed mode** (visible browser) with a persistent profile so the user only logs in once:

```bash
PROFILE_DIR="$HOME/projects/My-AI-Agent/tmp/cdf-browser-profile"
node "$SKILL_DIR/navigate.js" \
  --url "https://cdf.nustechnology.com/" \
  --profile "$PROFILE_DIR" \
  --headless false
```

1. Launch browser with `userDataDir` set to `tmp/cdf-browser-profile/` (persists cookies/session).
2. Navigate to `https://cdf.nustechnology.com/`.
3. If a login / SSO redirect appears → **pause and notify the user**: `"Please complete login in the browser window. Press Enter when done."`
4. Wait for user to finish SSO login.
5. Once the dashboard is loaded (URL is back on `cdf.nustechnology.com/`), continue.
6. On subsequent runs the saved profile will skip login automatically.

### Step 2 — Collect Reviewer Assignments

On the dashboard, find the section **"You are assigned as Reviewer of the followings"**.
Extract all evaluation form links listed there (e.g. `https://cdf.nustechnology.com/evaluation_forms/537`).

If no links are found, report "No pending reviewer assignments" and stop.

### Step 3 — Process Each Form

For each form link collected in Step 2, run this sub-flow:

#### 3a — Check Current Level (Result Page)

Navigate to `{form_url}/result`.

- Read the employee's **current level** (displayed on the result page).
- Click on the **target/next level** button (e.g. "Senior Software Engineer") to highlight the categories required for promotion.
- Collect all categories shown as **not yet passing** (typically shown with a different color, icon, or label vs. passing ones).

Record:
- Employee name
- Current level
- Target level
- List of non-passing categories

#### 3b — Check Evidence on the Form

Navigate back to `{form_url}`.

For each non-passing category identified in Step 3a:
1. Find the corresponding slot/row on the form.
2. Check if the employee has filled in **evidence text** for that slot.

**If evidence is empty / not filled:**
- Mark as: `MISSING EVIDENCE`

**If evidence is filled AND the slot is not yet reviewed:**
- Click the slot to open the example/reference popup.
- Read the example content shown.
- Compare the employee's evidence against the example:
  - Does the evidence match the type of evidence the slot expects?
  - Is it specific enough (project name, outcome, measurable result)?
  - Does it demonstrate the required competency?
- Mark as: `EVIDENCE PRESENT — needs review` with your assessment.

**If evidence is filled AND already reviewed (reviewed flag/icon is visible):**
- Skip — do not re-review.

### Step 4 — Generate Report

Write report to `./reports/{YYYY-MM-DD}/{HHMM}-cdf-monitor.md`:

```markdown
# CDF Reviewer Monitor — {YYYY-MM-DD} {HH:MM} (+07:00)

## Summary
- Forms reviewed: {N}
- Forms with missing evidence: {N}
- Forms with unreviewed evidence: {N}

---

## {Employee Name} — Form #{id}

**Current level:** {level}
**Target level:** {level}

### Non-passing Categories

| Category | Evidence | Assessment |
|----------|----------|------------|
| {category} | MISSING | — |
| {category} | PRESENT (unreviewed) | {your assessment vs example} |
| {category} | PRESENT (already reviewed) | skipped |

---
```

Repeat a section per form.

---

## Key Rules

- **Only check unreviewed evidence** — skip slots already marked as reviewed.
- **SSO login** — headed browser with persistent profile at `tmp/cdf-browser-profile/`; user logs in once, session is reused.
- **One Puppeteer session** — reuse the same authenticated session across all forms to avoid repeated logins.
- **Click the slot to get the example** — do not guess what the example says; always click and read it.
- **Concise assessment** — one sentence per slot: what the employee wrote vs. what the example expects.
- If the CDF site uses session cookies, save and reuse them across navigations.
- If login fails or session expires mid-run, re-authenticate and retry the current form.

---

## Usage

```
/cdf-monitor           # Full run — all assigned forms
/cdf-monitor 537       # Single form by ID
```
