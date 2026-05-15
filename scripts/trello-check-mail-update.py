#!/usr/bin/env python3
"""Update Trello Check mail card checklist items"""

import json
import urllib.request
import urllib.parse
import sys

with open("config/.trello-config.json") as f:
    config = json.load(f)

API_KEY = config["api_key"]
TOKEN = config["token"]
BOARD_ID = config["board_id"]

BASE = "https://api.trello.com/1"


def trello_get(path, params=None):
    p = {"key": API_KEY, "token": TOKEN}
    if params:
        p.update(params)
    url = f"{BASE}{path}?{urllib.parse.urlencode(p)}"
    with urllib.request.urlopen(url) as r:
        return json.loads(r.read())


def trello_put(path, params=None):
    p = {"key": API_KEY, "token": TOKEN}
    if params:
        p.update(params)
    url = f"{BASE}{path}?{urllib.parse.urlencode(p)}"
    req = urllib.request.Request(url, method="PUT")
    req.add_header("Content-Length", "0")
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def trello_post(path, params=None):
    p = {"key": API_KEY, "token": TOKEN}
    if params:
        p.update(params)
    data = urllib.parse.urlencode(p).encode()
    url = f"{BASE}{path}"
    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


# Find "Check mail" card on board
print("Finding 'Check mail' card...")
cards = trello_get(f"/boards/{BOARD_ID}/cards", {"fields": "id,name,idList"})
check_mail_card = None
for card in cards:
    if card["name"].lower() == "check mail":
        check_mail_card = card
        break

if not check_mail_card:
    print("ERROR: Could not find 'Check mail' card")
    sys.exit(1)

card_id = check_mail_card["id"]
print(f"Found card: {check_mail_card['name']} (id: {card_id})")

# Get checklists on the card
checklists = trello_get(f"/cards/{card_id}/checklists")
print(f"Found {len(checklists)} checklists")

if not checklists:
    print("No checklists found on card")
    sys.exit(1)

# The 6 accounts to mark complete
ACCOUNTS = ["DuongDn", "Carrick", "Nick", "Rick", "Kai", "Ken"]

total_updated = 0

for checklist in checklists:
    print(f"\nChecklist: {checklist['name']}")
    items = checklist.get("checkItems", [])
    print(f"  Items ({len(items)}):")
    for item in items:
        print(f"    - {item['name']} [{item['state']}]")
        # Check if this item matches one of our 6 accounts
        item_name = item["name"].strip()
        should_complete = False
        for account in ACCOUNTS:
            if account.lower() in item_name.lower():
                should_complete = True
                break

        if should_complete and item["state"] != "complete":
            print(f"      -> Marking complete: {item_name}")
            result = trello_put(
                f"/cards/{card_id}/checkItem/{item['id']}",
                {"state": "complete"}
            )
            print(f"      -> Done: {result.get('state', 'unknown')}")
            total_updated += 1
        elif should_complete and item["state"] == "complete":
            print(f"      -> Already complete: {item_name}")
            total_updated += 1

print(f"\nTotal items handled: {total_updated}")
print("Trello update complete!")
