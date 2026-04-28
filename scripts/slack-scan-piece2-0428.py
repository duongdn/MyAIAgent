#!/usr/bin/env python3
"""Piece 2 scan for 2026-04-28 daily report.
Window: 2026-04-22 08:40 +07 -> now.
"""
import json
import os
import time
import urllib.request
import urllib.parse
import urllib.error
import ssl
import sys

CUTOFF_EPOCH = 1776822000  # 2026-04-22 08:40:00 +07:00
QUERY = "after:2026-04-21"  # slack `after:` excludes named date

ssl_ctx = ssl.create_default_context()
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config", ".slack-accounts.json")


def load_workspaces():
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
        workspaces.append(ws)
    return workspaces


def slack_search(workspace):
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
            ck = cookie if "d=" in cookie else f"d={cookie}"
            req.add_header("Cookie", ck)
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
        stop = False
        for m in matches:
            ts = float(m.get("ts", 0))
            if ts >= CUTOFF_EPOCH:
                all_messages.append(m)
            else:
                stop = True
                break
        if stop:
            break
        page += 1
        if page <= total_pages:
            time.sleep(1.0)
    return {"name": name, "error": None, "messages": all_messages}


def summarize(result):
    name = result["name"]
    if result["error"]:
        return f"\n### {name}\n  ERROR: {result['error']}\n"
    msgs = result["messages"]
    lines = [f"\n### {name} — {len(msgs)} msg(s)"]
    if not msgs:
        lines.append("  (no new messages)")
        return "\n".join(lines) + "\n"
    channels = {}
    for m in msgs:
        ch = m.get("channel", {})
        ch_name = ch.get("name", "unknown") if isinstance(ch, dict) else str(ch)
        channels.setdefault(ch_name, []).append(m)
    for ch_name, ch_msgs in sorted(channels.items(), key=lambda x: -len(x[1])):
        lines.append(f"- **#{ch_name}** ({len(ch_msgs)} msgs)")
        for m in ch_msgs[:8]:
            user = m.get("username", m.get("user", "?"))
            text = m.get("text", "").replace("\n", " ")[:220]
            ts = float(m.get("ts", 0))
            tstr = time.strftime("%m-%d %H:%M", time.localtime(ts))
            lines.append(f"  - [{tstr} {user}] {text}")
        if len(ch_msgs) > 8:
            lines.append(f"  - ... and {len(ch_msgs)-8} more")
    return "\n".join(lines) + "\n"


if __name__ == "__main__":
    print(f"# Slack Piece 2 Scan — {time.strftime('%Y-%m-%d %H:%M:%S %Z')}")
    print(f"Cutoff: 2026-04-22 08:40:00 +07 (epoch {CUTOFF_EPOCH})")
    print(f"Query: {QUERY}")
    print()
    workspaces = load_workspaces()
    out_json = {}
    for ws in workspaces:
        result = slack_search(ws)
        print(summarize(result))
        out_json[result["name"]] = {
            "error": result.get("error"),
            "count": len(result.get("messages") or []),
        }
        sys.stdout.flush()
    print("\n---\nSUMMARY COUNTS:", json.dumps(out_json))
