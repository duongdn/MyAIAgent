#!/usr/bin/env python3
"""Mark Trello 'Check news' card as complete after news digest runs."""

import json
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

CONFIG_PATH = Path(__file__).parents[4] / "config" / ".trello-config.json"
CARD_ID = "6a1e2b27d1558923ff5eb915"  # "Check news" card in Daily list


def main():
    try:
        with open(CONFIG_PATH) as f:
            cfg = json.load(f)
        key = cfg["api_key"]
        token = cfg["token"]
        now = datetime.now(timezone.utc).isoformat()
        data = urllib.parse.urlencode(
            {"key": key, "token": token, "due": now, "dueComplete": "true"}
        ).encode()
        req = urllib.request.Request(
            f"https://api.trello.com/1/cards/{CARD_ID}",
            data=data,
            method="PUT",
        )
        urllib.request.urlopen(req)
    except Exception as e:
        print(f"Trello complete failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
