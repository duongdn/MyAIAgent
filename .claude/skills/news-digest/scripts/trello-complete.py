#!/usr/bin/env python3
"""Mark Trello 'Check news' card as complete — finds by name each run (card is recreated daily)."""

import json
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

CONFIG_PATH = Path(__file__).parents[4] / "config" / ".trello-config.json"
CARD_NAME = "Check news"


def _get(url):
    with urllib.request.urlopen(urllib.request.Request(url), timeout=10) as r:
        return json.loads(r.read())


def main():
    try:
        with open(CONFIG_PATH) as f:
            cfg = json.load(f)
        key = cfg["api_key"]
        token = cfg["token"]
        board_id = cfg["board_id"]

        # Find card by name — recreated daily so ID changes
        cards = _get(f"https://api.trello.com/1/boards/{board_id}/cards?fields=id,name&key={key}&token={token}")
        card = next((c for c in cards if c["name"] == CARD_NAME), None)
        if not card:
            print(f"Card '{CARD_NAME}' not found on board", file=sys.stderr)
            sys.exit(1)

        now = datetime.now(timezone.utc).isoformat()
        data = urllib.parse.urlencode(
            {"key": key, "token": token, "due": now, "dueComplete": "true"}
        ).encode()
        req = urllib.request.Request(
            f"https://api.trello.com/1/cards/{card['id']}",
            data=data,
            method="PUT",
        )
        urllib.request.urlopen(req)
    except Exception as e:
        print(f"Trello complete failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
