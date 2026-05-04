#!/usr/bin/env python3
"""Daily-report Trello updater — completes checklist items for today's run.

Usage: python3 trello-daily-update.py <plan>
  plan = JSON list of "card_keyword:item_keyword" pairs
        or use built-in via --apply-2026-05-04

Looks up cards by name on board O83pAyqb (My Task), iterates ALL checklists,
matches items by case-insensitive substring, calls
PUT /1/cards/{cardId}/checkItem/{itemId}?state=complete.
"""
import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

CONFIG = Path(__file__).resolve().parent.parent / "config" / ".trello-config.json"


def load_cfg():
    return json.loads(CONFIG.read_text())


def http_get(url):
    with urllib.request.urlopen(url) as r:
        return json.loads(r.read())


def http_put(url):
    req = urllib.request.Request(url, method="PUT")
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def find_card(cfg, board_id, card_name_keyword):
    url = f"https://api.trello.com/1/boards/{board_id}/cards?fields=id,name&key={cfg['api_key']}&token={cfg['token']}"
    cards = http_get(url)
    for c in cards:
        if card_name_keyword.lower() in c["name"].lower():
            return c
    raise SystemExit(f"Card containing '{card_name_keyword}' not found on board {board_id}")


def get_checklists(cfg, card_id):
    url = f"https://api.trello.com/1/cards/{card_id}/checklists?key={cfg['api_key']}&token={cfg['token']}"
    return http_get(url)


def complete_item(cfg, card_id, item_id):
    url = (
        f"https://api.trello.com/1/cards/{card_id}/checkItem/{item_id}"
        f"?state=complete&key={cfg['api_key']}&token={cfg['token']}"
    )
    return http_put(url)


def reset_item(cfg, card_id, item_id):
    url = (
        f"https://api.trello.com/1/cards/{card_id}/checkItem/{item_id}"
        f"?state=incomplete&key={cfg['api_key']}&token={cfg['token']}"
    )
    return http_put(url)


def apply_plan(cfg, board_id, plan):
    """plan = list of (card_kw, item_kw, action)
    action: 'complete' or 'incomplete'
    Returns list of result dicts.
    """
    results = []
    cache = {}
    for card_kw, item_kw, action in plan:
        if card_kw not in cache:
            card = find_card(cfg, board_id, card_kw)
            checklists = get_checklists(cfg, card["id"])
            cache[card_kw] = {"card": card, "checklists": checklists}
        card = cache[card_kw]["card"]
        checklists = cache[card_kw]["checklists"]
        # find item in any checklist
        match = None
        for cl in checklists:
            for item in cl.get("checkItems", []):
                if item_kw.lower() in item["name"].lower():
                    match = (cl, item)
                    break
            if match:
                break
        if not match:
            results.append({"card": card_kw, "item_kw": item_kw, "status": "NOT_FOUND"})
            continue
        cl, item = match
        try:
            if action == "complete":
                complete_item(cfg, card["id"], item["id"])
                state = "completed"
            else:
                reset_item(cfg, card["id"], item["id"])
                state = "reset_incomplete"
            results.append(
                {
                    "card": card_kw,
                    "checklist": cl["name"],
                    "item": item["name"],
                    "status": state,
                }
            )
        except urllib.error.HTTPError as e:
            results.append(
                {
                    "card": card_kw,
                    "item": item["name"],
                    "status": f"HTTP_{e.code}",
                    "error": str(e),
                }
            )
    return results


if __name__ == "__main__":
    cfg = load_cfg()
    board_id = cfg["board_id"]
    plan_arg = sys.argv[1] if len(sys.argv) > 1 else "[]"
    plan = json.loads(plan_arg)
    plan = [(p[0], p[1], p[2] if len(p) > 2 else "complete") for p in plan]
    out = apply_plan(cfg, board_id, plan)
    print(json.dumps(out, indent=2, ensure_ascii=False))
