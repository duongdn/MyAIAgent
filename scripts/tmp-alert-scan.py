#!/usr/bin/env python3
"""Temporary alert scan script - scans all monitoring sources."""
import json
import urllib.request
import urllib.parse
import ssl
import sys
import time

ctx = ssl.create_default_context()
CUTOFF_EPOCH = 1774337400
CUTOFF_MS = CUTOFF_EPOCH * 1000
CUTOFF_ISO_UTC = "2026-03-24T07:30:00Z"

alerts = []
source_status = []


def api_get(url, headers, timeout=10):
    req = urllib.request.Request(url, headers=headers)
    try:
        resp = urllib.request.urlopen(req, timeout=timeout, context=ctx)
        return json.loads(resp.read()), None
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        return None, f"HTTP {e.code}: {body}"
    except Exception as e:
        return None, str(e)[:200]


def scan_slack():
    with open("config/.slack-accounts.json") as f:
        accounts = json.load(f)["accounts"]

    total_active = 0
    total_alerts = 0

    for acct in accounts:
        ws = acct["workspace"]
        token = acct["token"]
        auth_type = acct.get("auth_type", "user")
        cookie = acct.get("cookie", "")

        headers = {"Authorization": f"Bearer {token}"}
        if auth_type == "session" and cookie:
            headers["Cookie"] = f"d={cookie}"

        params = urllib.parse.urlencode({
            "query": "after:2026-03-23",
            "sort": "timestamp",
            "count": "10"
        })
        data, err = api_get(f"https://slack.com/api/search.messages?{params}", headers)

        if err:
            print(f"[Slack/{ws}] EXCEPTION: {err}")
            alerts.append({"severity": "HIGH", "source": f"Slack/{ws}", "summary": f"API error: {err[:80]}", "link": ""})
            total_alerts += 1
            continue

        if not data.get("ok"):
            error = data.get("error", "unknown")
            if error in ("invalid_auth", "token_expired", "not_authed", "account_inactive"):
                print(f"[Slack/{ws}] AUTH ERROR: {error}")
                alerts.append({"severity": "HIGH", "source": f"Slack/{ws}", "summary": f"Auth failure: {error} (blind spot)", "link": acct.get("url", "")})
                total_alerts += 1
            else:
                print(f"[Slack/{ws}] ERROR: {error}")
            continue

        matches = data.get("messages", {}).get("matches", [])
        filtered = [m for m in matches if float(m.get("ts", "0")) >= CUTOFF_EPOCH]

        if filtered:
            total_active += len(filtered)
            print(f"[Slack/{ws}] OK - {len(filtered)} msgs in window")
            for m in filtered:
                ch = m.get("channel", {}).get("name", "?")
                user = m.get("username", "?")
                text = m.get("text", "")[:200].replace("\n", " ")
                print(f"  #{ch} @{user}: {text}")

                # Check for urgent keywords
                text_lower = text.lower()
                urgent_words = ["urgent", "emergency", "production down", "critical", "asap", "blocker", "outage", "security breach", "data loss"]
                for word in urgent_words:
                    if word in text_lower:
                        alerts.append({
                            "severity": "HIGH",
                            "source": f"Slack/{ws}",
                            "summary": f"Urgent keyword '{word}' in #{ch} by @{user}: {text[:100]}",
                            "link": ""
                        })
                        total_alerts += 1
                        break
        else:
            print(f"[Slack/{ws}] OK - 0 msgs in window")

    source_status.append({"source": f"Slack ({len(accounts)} ws)", "status": "OK", "items": f"{total_active} msgs, {total_alerts} alerts"})


def scan_discord():
    with open("config/.discord-accounts.json") as f:
        accounts = json.load(f)["accounts"]

    for acct in accounts:
        user = acct["user"]
        token = acct["token"]

        # Verify token
        data, err = api_get("https://discord.com/api/v10/users/@me", {"Authorization": token})
        if err:
            if "401" in str(err):
                # Verify before flagging
                print(f"[Discord/{user}] Token appears expired: {err}")
                alerts.append({"severity": "HIGH", "source": f"Discord/{user}", "summary": f"Token expired (blind spot): {err[:60]}", "link": ""})
            else:
                print(f"[Discord/{user}] Error: {err}")
            source_status.append({"source": f"Discord/{user}", "status": "ERROR", "items": err[:50]})
            continue

        username = data.get("username", "?")
        print(f"[Discord/{user}] Token valid - {username}")

        # Get guilds
        guilds_data, _ = api_get("https://discord.com/api/v10/users/@me/guilds", {"Authorization": token})
        guild_names = [g["name"] for g in guilds_data] if guilds_data and isinstance(guilds_data, list) else []
        print(f"  Guilds: {', '.join(guild_names)}")

        source_status.append({"source": f"Discord/{user}", "status": "OK (token valid)", "items": f"{len(guild_names)} guilds"})


def scan_matrix():
    with open("config/.matrix-config.json") as f:
        cfg = json.load(f)

    token = cfg["access_token"]
    room = cfg["rooms"][0]
    room_id = room["room_id"]
    homeserver = cfg["homeserver"]
    encoded_room = urllib.parse.quote(room_id)

    url = f"{homeserver}/_matrix/client/v3/rooms/{encoded_room}/messages?dir=b&limit=10"
    data, err = api_get(url, {"Authorization": f"Bearer {token}"})

    if err:
        print(f"[Matrix/Fountain] ERROR: {err}")
        alerts.append({"severity": "HIGH", "source": "Matrix/Fountain", "summary": f"API error: {err[:60]}", "link": ""})
        source_status.append({"source": "Matrix/Fountain", "status": "ERROR", "items": err[:50]})
        return

    if "errcode" in data:
        errcode = data["errcode"]
        print(f"[Matrix/Fountain] ERROR: {errcode} - {data.get('error','')}")
        if errcode in ("M_UNKNOWN_TOKEN", "M_MISSING_TOKEN"):
            alerts.append({"severity": "HIGH", "source": "Matrix/Fountain", "summary": f"Token expired: {errcode}", "link": ""})
        source_status.append({"source": "Matrix/Fountain", "status": "ERROR", "items": errcode})
        return

    chunks = data.get("chunk", [])
    filtered = [c for c in chunks if c.get("origin_server_ts", 0) >= CUTOFF_MS and c.get("type") == "m.room.message"]
    print(f"[Matrix/Fountain] OK - {len(filtered)} msgs in window")
    for m in filtered:
        sender = m.get("sender", "?")
        body = m.get("content", {}).get("body", "")[:150]
        print(f"  {sender}: {body}")

        # Check for blocker keywords
        body_lower = body.lower()
        if any(w in body_lower for w in ["blocker", "block", "urgent", "critical"]):
            alerts.append({"severity": "HIGH", "source": "Matrix/Fountain", "summary": f"Blocker keyword by {sender}: {body[:100]}", "link": ""})

    source_status.append({"source": "Matrix/Fountain", "status": "OK", "items": f"{len(filtered)} msgs"})


def scan_redmine():
    with open("config/.redmine-config.json") as f:
        cfg = json.load(f)

    params = urllib.parse.urlencode({
        "updated_on": f">={CUTOFF_ISO_UTC}",
        "sort": "updated_on:desc",
        "limit": "10"
    })
    url = f"{cfg['url']}/issues.json?{params}"
    data, err = api_get(url, {"X-Redmine-API-Key": cfg["api_key"]})

    if err:
        print(f"[Redmine] ERROR: {err}")
        source_status.append({"source": "Redmine", "status": "ERROR", "items": err[:50]})
        return

    issues = data.get("issues", [])
    print(f"[Redmine] OK - {len(issues)} issues updated since cutoff")
    for i in issues:
        iid = i["id"]
        subj = i.get("subject", "")[:80]
        status = i.get("status", {}).get("name", "")
        priority = i.get("priority", {}).get("name", "")
        assigned = i.get("assigned_to", {}).get("name", "unassigned")
        print(f"  #{iid} [{priority}] [{status}] {subj} -> {assigned}")

        # Flag high/urgent priority issues
        if priority in ("Urgent", "Immediate"):
            alerts.append({
                "severity": "HIGH",
                "source": "Redmine",
                "summary": f"#{iid} [{priority}] {subj}",
                "link": f"{cfg['url']}/issues/{iid}"
            })

    source_status.append({"source": "Redmine", "status": "OK", "items": f"{len(issues)} updated"})


if __name__ == "__main__":
    print("Starting alert scan...")
    print(f"Window: 2026-03-24T14:30:00+07:00 -> now")
    print()

    scan_slack()
    print()
    scan_discord()
    print()
    scan_matrix()
    print()
    scan_redmine()
    print()

    # Output summary
    print("=== SUMMARY ===")
    print(json.dumps({"alerts": alerts, "sources": source_status}, indent=2))
