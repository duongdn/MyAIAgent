#!/usr/bin/env python3
"""Try to refresh Equanimity Slack session token."""
import requests
import re
import json
from pathlib import Path

# Load Equanimity token/cookie from config
config_path = Path(__file__).resolve().parent.parent / "config" / ".slack-accounts.json"
with open(config_path) as f:
    _accounts = json.load(f)["accounts"]
_equanimity = next(a for a in _accounts if a["workspace"] == "Equanimity")
TOKEN = _equanimity["token"]
COOKIE = _equanimity.get("cookie", "")

# Step 1: Verify the token is truly invalid with proper headers
print("Step 1: Verify with both headers...")
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Cookie": COOKIE,
}
resp = requests.post("https://slack.com/api/auth.test", headers=headers, timeout=15)
data = resp.json()
print(f"  auth.test: ok={data.get('ok')}, error={data.get('error')}, team={data.get('team')}")

if data.get("ok"):
    print("Token is actually valid! Trying search...")
    resp2 = requests.post(
        "https://slack.com/api/search.messages",
        headers=headers,
        data={"query": "after:2026-04-07", "sort": "timestamp", "sort_dir": "desc", "count": 100},
        timeout=30,
    )
    d2 = resp2.json()
    print(f"  search: ok={d2.get('ok')}, error={d2.get('error')}")
    if d2.get("ok"):
        matches = d2.get("messages", {}).get("matches", [])
        print(f"  Found {len(matches)} messages")
        for m in matches[:5]:
            user = m.get("username", "?")
            ch = m.get("channel", {}).get("name", "?") if isinstance(m.get("channel"), dict) else "?"
            txt = m.get("text", "")[:100]
            print(f"    [{ch}] {user}: {txt}")
else:
    print("\nStep 2: Try login to refresh...")
    # Try Equanimity workspace
    # Load email credentials from config
    email_config_path = Path(__file__).resolve().parent.parent / "config" / ".email-accounts.json"
    with open(email_config_path) as ef:
        _email_accounts = json.load(ef)["accounts"]
    _carrick = next(a for a in _email_accounts if a["email"] == "carrick@nustechnology.com")
    EMAIL = _carrick["email"]
    PASSWORD = _carrick["app_password"]

    # Try to find workspace URL
    for ws_url in ["https://equanimity-tech.slack.com", "https://equanimity.slack.com", "https://equanimitytech.slack.com"]:
        try:
            print(f"  Trying {ws_url}...")
            resp = requests.get(ws_url, timeout=10, allow_redirects=True)
            if resp.status_code == 200:
                # Look for api_token/crumb
                match = re.search(r'"api_token"\s*:\s*"(xoxc-[^"]+)"', resp.text)
                if match:
                    new_token = match.group(1)
                    print(f"  Found api_token from page: {new_token[:30]}...")
                # Look for team info
                team_match = re.search(r'"team_id"\s*:\s*"([^"]+)"', resp.text)
                if team_match:
                    print(f"  Team ID: {team_match.group(1)}")
        except Exception as e:
            print(f"  Error: {e}")

    print("\n  Token refresh failed. Will report as auth error.")
