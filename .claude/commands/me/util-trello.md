---
description: "UTIL — Trello API operations: find card by name, complete checklist items"
---

# Util: Trello

## Config

```bash
# Load from config
KEY=$(cat config/.trello-config.json | python3 -c "import json,sys; c=json.load(sys.stdin); print(c['api_key'])")
TOKEN=$(cat config/.trello-config.json | python3 -c "import json,sys; c=json.load(sys.stdin); print(c['token'])")
BOARD="O83pAyqb"
BASE="https://api.trello.com/1"
```

## Find Card by Name

**NEVER hardcode card IDs** — cards are recurring and get new IDs each cycle. Always find by name.

```bash
# Get all cards on board, find by name
CARDS=$(curl -s "$BASE/boards/$BOARD/cards?key=$KEY&token=$TOKEN")
CARD_ID=$(echo "$CARDS" | python3 -c "
import json,sys
cards = json.load(sys.stdin)
name = 'Check Progress'  # or 'Check Mail', 'Check server status', 'Report project status'
card = next((c for c in cards if c['name'] == name), None)
print(card['id'] if card else '')
")
```

## Get All Checklists (iterate ALL — never assume one)

```bash
CHECKLISTS=$(curl -s "$BASE/cards/$CARD_ID/checklists?key=$KEY&token=$TOKEN")
```

## Complete a Checklist Item

```bash
curl -s -X PUT "$BASE/cards/$CARD_ID/checkItem/$ITEM_ID?key=$KEY&token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"state":"complete"}'
```

HTTP 200 = success.

## Find Item by Name Across All Checklists

```python
import json
checklists = json.loads(...)  # from GET /cards/{id}/checklists
item_name = "Bailey"  # checklist item text to find
for cl in checklists:
    for item in cl.get("checkItems", []):
        if item_name.lower() in item["name"].lower():
            print(item["id"], item["state"])
```

## Completion Rule

- **No alert** from monitoring source → complete the item
- **Alert found** → leave incomplete, note in report
- **Single source** → complete only that item
- **All sources** → complete all applicable items
