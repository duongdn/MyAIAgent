#!/usr/bin/env python3
"""Deep check for Kai daily report in Xtreme Slack."""
import requests
import json
from pathlib import Path

# Load token from config
config_path = Path(__file__).resolve().parent.parent / "config" / ".slack-accounts.json"
with open(config_path) as f:
    _accounts = json.load(f)["accounts"]
TOKEN = next(a["token"] for a in _accounts if a["workspace"] == "Xtreme Soft Solutions")
headers = {"Authorization": f"Bearer {TOKEN}"}

# First verify auth
resp = requests.post("https://slack.com/api/auth.test", headers=headers, timeout=15)
auth = resp.json()
print(f"Auth: ok={auth.get('ok')}, team={auth.get('team')}, user={auth.get('user')}")

# Try broader search - just any messages
for query in ["after:2026-04-07", "from:kai after:2026-04-07", "daily after:2026-04-07", "progress after:2026-04-07"]:
    resp = requests.post(
        "https://slack.com/api/search.messages",
        headers=headers,
        data={"query": query, "sort": "timestamp", "sort_dir": "desc", "count": 20},
        timeout=30,
    )
    data = resp.json()
    total = data.get("messages", {}).get("total", 0) if data.get("ok") else f"ERR: {data.get('error')}"
    print(f"Query '{query}': total={total}")
    if data.get("ok"):
        for m in data.get("messages", {}).get("matches", [])[:3]:
            user = m.get("username", "?")
            ts = m.get("ts", "0")
            txt = m.get("text", "")[:120]
            ch = m.get("channel", {}).get("name", "?") if isinstance(m.get("channel"), dict) else "?"
            print(f"  [{ch}] {user} (ts={ts}): {txt}")
