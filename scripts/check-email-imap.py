#!/usr/bin/env python3
"""Check email accounts via IMAP SSL and Gmail API. Loads credentials from config/.email-accounts.json."""

import imaplib
import email
import json
import os
from email.header import decode_header
from datetime import datetime, timezone, timedelta
import sys

TZ_ICT = timezone(timedelta(hours=7))

# Load credentials
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config", ".email-accounts.json")
TIMELINES_PATH = os.path.join(os.path.dirname(__file__), "..", "config", ".monitoring-timelines.json")

with open(CONFIG_PATH) as f:
    _cfg = json.load(f)

# Cutoff: read from timelines config, fall back to yesterday 08:00 +07
try:
    with open(TIMELINES_PATH) as f:
        _tl = json.load(f)
    _last = _tl.get("daily_report", {}).get("last_run", "")
    if _last:
        CUTOFF = datetime.fromisoformat(_last)
        if CUTOFF.tzinfo is None:
            CUTOFF = CUTOFF.replace(tzinfo=TZ_ICT)
    else:
        raise ValueError("no last_run")
except Exception:
    yesterday = datetime.now(TZ_ICT) - timedelta(days=1)
    CUTOFF = yesterday.replace(hour=8, minute=0, second=0, microsecond=0)

# IMAP SINCE date string (one day before cutoff for server-side pre-filter)
IMAP_SINCE = (CUTOFF - timedelta(days=1)).strftime("%d-%b-%Y")

# Map account name → config entry
_account_map = {}
for acc in _cfg.get("accounts", []):
    user = acc.get("email", "")
    name = user.split("@")[0] if "@" in user else user
    _account_map[name] = acc

ACCOUNT_META = {
    "duongdn": {"look_for": "Leave requests, New Relic alerts"},
    "carrick": {"look_for": "Redmine bug notifications (Generator/Elliott). IGNORE SoCal/Socalautowraps Rollbar emails"},
    "nick":    {"look_for": "Anything from John Yi"},
    "rick":    {"look_for": "Rollbar/BugSnag PRODUCTION alerts for Fountain, InfinityRoses"},
    "kai":     {"look_for": "Jira/Madhuraka mentions"},
    "ken":     {"look_for": "Precognize GitHub PR activity (folder: NewsLetter)"},
    "vuongtrancr": {"look_for": "Leave requests, personal notifications for Carrick (vuong)"},
    "dnduongus":   {"look_for": "Leave requests, personal notifications for Duong"},
    "freelancer":  {"look_for": "MPFC freelancer portal emails, production alerts"},
}

ACCOUNTS = []
for name, meta in ACCOUNT_META.items():
    cfg_acc = _account_map.get(name, {})
    ACCOUNTS.append({
        "name": name,
        "user": cfg_acc.get("email", f"{name}@nustechnology.com"),
        "cred": cfg_acc.get("app_password", ""),
        "imap_server": cfg_acc.get("imap_server", "imap.zoho.com"),
        "gmail_api": cfg_acc.get("gmail_api", False),
        "look_for": meta["look_for"],
    })


def decode_str(s):
    if s is None:
        return ""
    parts = decode_header(s)
    result = []
    for part, enc in parts:
        if isinstance(part, bytes):
            try:
                result.append(part.decode(enc or "utf-8", errors="replace"))
            except Exception:
                result.append(part.decode("utf-8", errors="replace"))
        else:
            result.append(str(part))
    return "".join(result)


def parse_date(date_str):
    if not date_str:
        return None
    try:
        from email.utils import parsedate_to_datetime
        dt = parsedate_to_datetime(date_str)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except Exception:
        return None


def check_imap_account(account):
    name = account["name"]
    user = account["user"]
    password = account["cred"]
    imap_host = account["imap_server"]

    results = {"name": name, "count": 0, "messages": [], "error": None}

    try:
        mail = imaplib.IMAP4_SSL(imap_host, 993)
        mail.login(user, password)

        folders_to_search = ["INBOX"]
        if name == "ken":
            _, folder_list = mail.list()
            for f in folder_list:
                if f:
                    f_str = f.decode() if isinstance(f, bytes) else str(f)
                    if any(x in f_str for x in ("Newsletter", "NewsLetter", "newsletter")):
                        parts = f_str.split('"')
                        if len(parts) >= 2:
                            folder_name = parts[-2]
                            if folder_name not in folders_to_search:
                                folders_to_search.append(folder_name)

        all_messages = []
        for folder in folders_to_search:
            try:
                status, _ = mail.select(folder, readonly=True)
                if status != "OK":
                    continue
                status, msg_ids = mail.search(None, "SINCE", IMAP_SINCE)
                if status != "OK" or not msg_ids[0]:
                    continue
                ids = msg_ids[0].split()
                for msg_id in ids:
                    try:
                        status, msg_data = mail.fetch(msg_id, "(RFC822.HEADER)")
                        if status != "OK":
                            continue
                        raw = msg_data[0][1]
                        msg = email.message_from_bytes(raw)
                        dt = parse_date(msg.get("Date", ""))
                        if dt is None or dt < CUTOFF:
                            continue
                        subject = decode_str(msg.get("Subject", "(no subject)"))
                        from_addr = decode_str(msg.get("From", ""))
                        date_display = dt.astimezone(TZ_ICT).strftime("%m-%d %H:%M")
                        all_messages.append({"subject": subject, "from": from_addr, "date": date_display, "folder": folder})
                    except Exception:
                        pass
            except Exception:
                pass

        mail.logout()

        filtered = []
        for m in all_messages:
            if name == "carrick":
                sl, fl = m["subject"].lower(), m["from"].lower()
                if "socalautowraps" in sl or "socalautowraps" in fl:
                    continue
                if "socal" in sl and "rollbar" in fl:
                    continue
            filtered.append(m)

        results["count"] = len(filtered)
        results["messages"] = filtered

    except Exception as e:
        results["error"] = str(e)

    return results


def check_gmail_api_account(account):
    name = account["name"]
    user = account["user"]
    results = {"name": name, "count": 0, "messages": [], "error": None}

    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        key_path = os.path.join(os.path.dirname(__file__), "..", "config", ".gmail-service-account.json")
        if not os.path.exists(key_path):
            results["error"] = "no_gmail_sa_key"
            return results

        creds = service_account.Credentials.from_service_account_file(
            key_path,
            scopes=["https://www.googleapis.com/auth/gmail.readonly"],
            subject=user,
        )
        service = build("gmail", "v1", credentials=creds, cache_discovery=False)
        after_ts = int(CUTOFF.timestamp())
        list_res = service.users().messages().list(userId="me", q=f"after:{after_ts}", maxResults=50).execute()
        messages = list_res.get("messages", [])

        for msg in messages[:20]:
            try:
                detail = service.users().messages().get(
                    userId="me", id=msg["id"], format="metadata",
                    metadataHeaders=["Subject", "From", "Date"]
                ).execute()
                hdrs = detail.get("payload", {}).get("headers", [])
                get_hdr = lambda n: next((h["value"] for h in hdrs if h["name"] == n), "")
                subject = get_hdr("Subject")
                from_addr = get_hdr("From")
                date_str = get_hdr("Date")
                dt = parse_date(date_str)
                if dt and dt >= CUTOFF:
                    date_display = dt.astimezone(TZ_ICT).strftime("%m-%d %H:%M")
                    all_messages = results["messages"]
                    all_messages.append({"subject": subject, "from": from_addr, "date": date_display, "folder": "INBOX"})
            except Exception:
                pass

        results["count"] = len(messages)
        results["messages"] = results["messages"]

    except Exception as e:
        results["error"] = str(e)

    return results


def check_account(account):
    if account.get("gmail_api"):
        return check_gmail_api_account(account)
    return check_imap_account(account)


def main():
    print(f"Checking emails since {CUTOFF.isoformat()}\n", file=sys.stderr)

    all_results = []
    for account in ACCOUNTS:
        print(f"Checking {account['name']}...", file=sys.stderr)
        result = check_account(account)
        all_results.append(result)
        if result["error"]:
            print(f"  ERROR: {result['error']}", file=sys.stderr)
        else:
            print(f"  Found {result['count']} messages", file=sys.stderr)

    now = datetime.now(TZ_ICT)
    print(f"\n## Email — {now.strftime('%H:%M')} (+07:00)")
    print("| Account | Count | Summary |")
    print("|---------|-------|---------|")

    alerts = []
    for r in all_results:
        if r["error"]:
            summary = f"ERROR: {r['error'][:60]}"
            count_str = "ERR"
        elif r["count"] == 0:
            summary = "—"
            count_str = "0"
        else:
            count_str = str(r["count"])
            msgs = r["messages"]
            items = []
            for m in msgs[:5]:
                subj = m["subject"][:60] if len(m["subject"]) > 60 else m["subject"]
                items.append(f"{m['date']}: {subj}")
            summary = "; ".join(items)
            if len(msgs) > 5:
                summary += f" (+{len(msgs)-5} more)"

        print(f"| {r['name']} | {count_str} | {summary} |")

        if r["count"] > 0 and not r["error"]:
            for m in r["messages"]:
                subj_lower = m["subject"].lower()
                from_lower = m["from"].lower()
                is_alert = False
                alert_reason = ""

                if r["name"] in ("duongdn", "dnduongus"):
                    if "leave" in subj_lower or "new relic" in from_lower or "alert" in subj_lower:
                        is_alert = True
                        alert_reason = f"DuongDn/Personal: {m['subject'][:80]}"
                elif r["name"] == "carrick":
                    if "redmine" in from_lower or "bug" in subj_lower:
                        is_alert = True
                        alert_reason = f"Carrick Redmine: {m['subject'][:80]}"
                elif r["name"] == "vuongtrancr":
                    if any(k in subj_lower or k in from_lower for k in ("rollbar", "bugsnag", "production", "error", "alert", "crash", "redmine")):
                        is_alert = True
                        alert_reason = f"Carrick Personal alert: {m['subject'][:80]}"
                elif r["name"] == "nick":
                    if "john yi" in from_lower or "johnyi" in from_lower:
                        is_alert = True
                        alert_reason = f"Nick (John Yi): {m['subject'][:80]}"
                elif r["name"] in ("rick", "freelancer"):
                    if "rollbar" in from_lower or "bugsnag" in from_lower or "production" in subj_lower or "error" in subj_lower:
                        is_alert = True
                        alert_reason = f"Rick/MPFC PROD alert: {m['subject'][:80]}"
                elif r["name"] == "kai":
                    if "jira" in from_lower or "madhuraka" in from_lower:
                        is_alert = True
                        alert_reason = f"Kai Jira: {m['subject'][:80]}"
                elif r["name"] == "ken":
                    if "precognize" in from_lower or "github" in from_lower:
                        is_alert = True
                        alert_reason = f"Ken PR: {m['subject'][:80]}"

                if is_alert and alert_reason not in alerts:
                    alerts.append(alert_reason)

    print()
    if alerts:
        print("**Alerts:**")
        for a in alerts:
            print(f"- {a}")
    else:
        print("**Alerts:** None")

    print("\n### Details")
    for r in all_results:
        if r["count"] > 0 and not r["error"]:
            print(f"\n**{r['name']}** ({r['count']} messages):")
            for m in r["messages"]:
                print(f"  - [{m['date']}] From: {m['from'][:50]} | Subject: {m['subject'][:80]}")


if __name__ == "__main__":
    main()
