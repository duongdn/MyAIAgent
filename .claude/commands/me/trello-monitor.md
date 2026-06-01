---
description: Trello board monitor — priority cards (red), recent activity check, oldest stale cards
---

# Trello Monitor

Review personal Trello board `O83pAyqb` for priority items, activity gaps, and stale cards.

**Output:** `reports/{YYYY-MM-DD}/{HHMM}-trello-monitor.md`

---

## Config

- Board: `O83pAyqb`
- Config: `config/.trello-config.json` (keys: `api_key`, `token`)
- Red label ID: `600f703586c6bc9cc5f0cd67`
- DONE list ID: `600f704f2a43ff1e0f65f446` — exclude from stale check

**Lists (active):**
| ID | Name |
|----|------|
| `686b1f67e6b82c615ce4762c` | Daily |
| `6a067a9b64355fd79cf6cea6` | Todo |
| `600f70812379e54868c59fa0` | PLAN |
| `6883540624176fb323191b2e` | Carrier plan |
| `600f70462854c2500b2eace7` | BACKLOG |
| `600f704994743580688f8305` | DOING |
| `600f78b13e59936cc4e7dcaa` | TODAY-URGENT |
| `605aa935b78b421076b0e367` | Working |
| `601005548a8fb5730a738756` | Misc |
| `68b79a5e27f1ff8721fa1616` | Maintenance |

---

## What to run

### 1. Priority cards (red label)

Fetch all open cards with the red label. For each:
- Show card name, list name, age (days since `dateLastActivity`), due date if set
- Flag cards with no activity in 7+ days as **stale priority** ⚠️
- Flag cards with activity in last 2 days as **active** ✓

```
GET /1/boards/O83pAyqb/cards?filter=open&fields=name,id,labels,idList,dateLastActivity,due,url
```

Filter: `labels[].id == '600f703586c6bc9cc5f0cd67'`

### 2. Recent activity on priority cards

For each red-label card, check last action:
```
GET /1/cards/{id}/actions?limit=1&filter=commentCard,updateCard,createCard
```

Report: last action type, who did it, when.

### 3. Cards with due dates (sorted by due date asc)

Fetch all open cards with a `due` field set, excluding DONE list. Sort by due date ascending.
Flag overdue cards (due < now) as ⚠️ overdue.
Show: name, list, due date, overdue status.

### 4. 10 oldest stale active cards

Sort all open cards (excluding DONE list) by `dateLastActivity` ascending. Take top 10.
Show: name, list, age in days, URL.
These are candidates for archiving, acting on, or deleting.

---

## Output format

File: `reports/{YYYY-MM-DD}/{HHMM}-trello-monitor.md`

```markdown
# Trello Monitor — {YYYY-MM-DD} {HH:MM}

## Summary

| Section | Count | Notes |
|---------|-------|-------|
| Priority (red) | N | X active, Y stale |
| Stale priority (>7d) | N | need review |
| Total active cards | N | excl. DONE |

---

## Priority Cards (Red Label) — N cards

| Card | List | Age | Status |
|------|------|-----|--------|
| [name](url) | DOING | 0d | ✓ active |
| [name](url) | BACKLOG | 95d | ⚠️ stale |

---

## Cards by Due Date

| Card | List | Due | Status |
|------|------|-----|--------|
| [name](url) | DOING | 2026-05-30 | ⚠️ overdue |
| [name](url) | Todo | 2026-06-05 | upcoming |

---

## 10 Oldest Active Cards

| Card | List | Age |
|------|------|-----|
| [name](url) | BACKLOG | 1946d |

**Suggested actions:** archive abandoned cards, move completed to DONE, add due date to resurface.
```

---

## After run — complete the trigger card

After saving the report, mark card `6a191d49449e5180c81fa629` ("Trello monitor") as complete **in place** (do NOT move to DONE list):

```
PUT /1/cards/6a191d49449e5180c81fa629?dueComplete=true&key=...&token=...
```

---

## Key rules

- Exclude DONE list from stale check (completed cards are OK to be old)
- "Active" = `dateLastActivity` within last 2 days
- "Stale priority" = red label + no activity in 7+ days → flag ⚠️
- Age = days since `dateLastActivity` (not card creation)
- Always include clickable card URLs
- Do not auto-archive or modify any cards — report only, user decides action
- DO complete the trigger card (`6a191d49449e5180c81fa629`) after every run
