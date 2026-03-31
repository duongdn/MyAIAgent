#!/usr/bin/env python3
"""Check all Slack workspaces for new messages since cutoff."""

import json
import os
import time
import urllib.request
import urllib.parse
import urllib.error
import ssl

# Cutoff: 2026-03-30 08:35:00 +07:00 = 2026-03-30 01:35:00 UTC
CUTOFF_EPOCH = 1743299700
QUERY = "after:2026-03-29"

ssl_ctx = ssl.create_default_context()

# Load workspace tokens from config (not hardcoded)
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config", ".slack-accounts.json")

def load_workspaces():
    """Load workspace configs from .slack-accounts.json."""
    with open(CONFIG_PATH, "r") as f:
        data = json.load(f)

    workspaces = []
    for acct in data.get("accounts", []):
        ws = {
            "name": acct["workspace"],
            "token": acct["token"],
            "session": acct["token"].startswith("xoxc-"),
        }
        if acct.get("cookie"):
            ws["cookie"] = acct["cookie"]
        checks = acct.get("checks", {}).get("daily_report")
        if checks:
            ws["daily_check"] = {
                "person": checks.get("user", ""),
                "keywords": checks.get("search_terms", []),
            }
            if checks.get("channels"):
                ws["daily_check"]["channel"] = f"#{checks['channels'][0]}"
        if acct.get("filter_nick"):
            ws["filter_nick"] = True
        workspaces.append(ws)
    return workspaces


def slack_search(workspace):
    """Search messages in a Slack workspace."""
    name = workspace["name"]
    token = workspace["token"]
    is_session = workspace.get("session", False)
    cookie = workspace.get("cookie", "")

    all_messages = []
    page = 1
    total_pages = 1

    while page <= total_pages:
        params = urllib.parse.urlencode({
            "query": QUERY,
            "sort": "timestamp",
            "sort_dir": "desc",
            "count": 100,
            "page": page,
        })
        url = f"https://slack.com/api/search.messages?{params}"

        req = urllib.request.Request(url)
        req.add_header("Authorization", f"Bearer {token}")
        if is_session and cookie:
            req.add_header("Cookie", f"d={cookie}")

        try:
            resp = urllib.request.urlopen(req, timeout=30, context=ssl_ctx)
            data = json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            return {"name": name, "error": f"HTTP {e.code}", "messages": []}
        except Exception as e:
            return {"name": name, "error": str(e), "messages": []}

        if not data.get("ok"):
            err = data.get("error", "unknown")
            is_sess = " (session token - may need refresh)" if is_session else ""
            return {"name": name, "error": f"{err}{is_sess}", "messages": []}

        matches = data.get("messages", {}).get("matches", [])
        paging = data.get("messages", {}).get("paging", {})
        total_pages = paging.get("pages", 1)

        for m in matches:
            ts = float(m.get("ts", 0))
            if ts > CUTOFF_EPOCH:
                all_messages.append(m)
            else:
                # Messages sorted desc by timestamp, so once below cutoff, stop
                total_pages = 0  # break outer loop
                break

        page += 1
        if page <= total_pages:
            time.sleep(1.2)  # rate limit

    return {"name": name, "error": None, "messages": all_messages}


def format_result(result):
    """Format a workspace result."""
    name = result["name"]
    error = result["error"]
    messages = result["messages"]

    lines = [f"\n### {name}"]

    if error:
        lines.append(f"  **ERROR:** {error}")
        return "\n".join(lines)

    if not messages:
        lines.append(f"  No new messages since cutoff")
        return "\n".join(lines)

    # Channel breakdown
    channels = {}
    for m in messages:
        ch = m.get("channel", {})
        ch_name = ch.get("name", "unknown") if isinstance(ch, dict) else str(ch)
        channels.setdefault(ch_name, []).append(m)

    lines.append(f"  **{len(messages)} message(s)** across {len(channels)} channel(s)")

    for ch_name, ch_msgs in sorted(channels.items(), key=lambda x: -len(x[1])):
        lines.append(f"  - #{ch_name}: {len(ch_msgs)} msg(s)")
        # Show up to 3 preview lines
        for m in ch_msgs[:3]:
            user = m.get("username", m.get("user", "?"))
            text = m.get("text", "")[:120].replace("\n", " ")
            lines.append(f"    > [{user}] {text}")
        if len(ch_msgs) > 3:
            lines.append(f"    ... and {len(ch_msgs)-3} more")

    return "\n".join(lines)


def check_daily(result, workspace):
    """Check if a specific person posted their daily report."""
    dc = workspace.get("daily_check")
    if not dc:
        return None

    person = dc["person"]
    keywords = dc["keywords"]
    channel_filter = dc.get("channel", None)
    messages = result["messages"]

    found = False
    for m in messages:
        text = m.get("text", "").lower()
        user = m.get("username", m.get("user", "")).lower()
        ch = m.get("channel", {})
        ch_name = ch.get("name", "") if isinstance(ch, dict) else str(ch)

        if channel_filter and f"#{ch_name}" != channel_filter and ch_name != channel_filter.lstrip("#"):
            continue

        for kw in keywords:
            if kw.lower() in text:
                found = True
                break
        if found:
            break

    status = "FOUND" if found else "NOT FOUND"
    note = f"  **DAILY CHECK: {person}'s daily report — {status}**"
    if result.get("error"):
        note = f"  **DAILY CHECK: {person}'s daily report — UNABLE TO CHECK (auth error)**"
    return note


if __name__ == "__main__":
    print("=" * 60)
    print("SLACK MONITORING SCAN")
    print(f"Cutoff: 2026-03-30 08:35:00 +07:00 (epoch {CUTOFF_EPOCH})")
    print(f"Scan time: {time.strftime('%Y-%m-%d %H:%M:%S %Z')}")
    print("=" * 60)

    workspaces = load_workspaces()
    for ws in workspaces:
        result = slack_search(ws)
        print(format_result(result))

        daily_note = check_daily(result, ws)
        if daily_note:
            print(daily_note)

    print("\n" + "=" * 60)
    print("SCAN COMPLETE")
    print("=" * 60)
