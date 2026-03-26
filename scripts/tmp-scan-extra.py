#!/usr/bin/env python3
"""Scan Discord and Redmine using config files (no hardcoded secrets)."""
import urllib.request, json, ssl, urllib.parse, os

ctx = ssl.create_default_context()
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def api_get(url, headers, timeout=10):
    headers["User-Agent"] = UA
    req = urllib.request.Request(url, headers=headers)
    try:
        resp = urllib.request.urlopen(req, timeout=timeout, context=ctx)
        return json.loads(resp.read()), None
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        return None, f"HTTP {e.code}: {body[:100]}"
    except Exception as e:
        return None, str(e)[:200]

# Load Discord config
print("=== DISCORD ===")
discord_config_path = os.path.join(BASE_DIR, "config", ".discord-accounts.json")
with open(discord_config_path) as f:
    discord_config = json.load(f)

for acct in discord_config.get("accounts", []):
    data, err = api_get("https://discord.com/api/v10/users/@me", {"Authorization": acct["token"]})
    if err:
        print(f"[{acct['user']}] {err}")
    else:
        print(f"[{acct['user']}] Token valid: {data.get('username')}")

# Load Redmine config
print()
print("=== REDMINE ===")
redmine_config_path = os.path.join(BASE_DIR, "config", ".redmine-config.json")
with open(redmine_config_path) as f:
    redmine_config = json.load(f)

params = urllib.parse.urlencode({
    "updated_on": ">=2026-03-24T07:30:00Z",
    "sort": "updated_on:desc",
    "limit": "10"
})
data, err = api_get(
    f"{redmine_config['url']}/issues.json?{params}",
    {"X-Redmine-API-Key": redmine_config["api_key"]}
)
if err:
    print(f"ERROR: {err}")
else:
    issues = data.get("issues", [])
    print(f"OK - {len(issues)} issues updated")
    for i in issues:
        iid = i["id"]
        subj = i.get("subject", "")[:80]
        priority = i.get("priority", {}).get("name", "")
        status = i.get("status", {}).get("name", "")
        print(f"  #{iid} [{priority}] [{status}] {subj}")
