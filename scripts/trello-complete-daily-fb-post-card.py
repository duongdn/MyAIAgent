#!/usr/bin/env python3
"""Mark today's Trello card "Đăng 1 bài trên zalo/facebook" complete after a FB post is submitted.

The card is re-created daily by the Card Repeater power-up (list "Daily"), so it is found by
name among OPEN cards — never by a stored id. Adds the post URL as a comment, sets dueComplete.

Usage: python3 scripts/trello-complete-daily-fb-post-card.py <post-url>
"""
import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

BOARD = "O83pAyqb"
CARD_NAME = "Đăng 1 bài trên zalo/facebook"
BASE = "https://api.trello.com/1"
CONFIG = Path(__file__).resolve().parent.parent / "config" / ".trello-config.json"


def call(method, path, **params):
    cfg = json.loads(CONFIG.read_text())
    params.update(key=cfg["api_key"], token=cfg["token"])
    url = f"{BASE}{path}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(urllib.request.Request(url, method=method)) as resp:
        return json.load(resp)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    post_url = sys.argv[1]
    cards = [c for c in call("GET", f"/boards/{BOARD}/cards", fields="name,dueComplete,dateLastActivity")
             if c["name"] == CARD_NAME]
    if not cards:
        print(json.dumps({"ok": False, "error": f"no open card '{CARD_NAME}' (repeater not fired yet?)"}, ensure_ascii=False))
        sys.exit(1)
    # Card ids are time-ordered — newest open card is today's
    card = max(cards, key=lambda c: c["id"])
    if not card["dueComplete"]:
        call("POST", f"/cards/{card['id']}/actions/comments", text=f"Đã đăng: {post_url}")
        card = call("PUT", f"/cards/{card['id']}", dueComplete="true")
    print(json.dumps({"ok": card["dueComplete"], "card": card["id"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
