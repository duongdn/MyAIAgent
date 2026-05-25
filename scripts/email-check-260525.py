#!/usr/bin/env python3
"""
Email check script for daily report - 2026-05-25
Checks all 6 email accounts via IMAP and summarizes new emails
Window: 2026-05-23 08:00 +07:00 -> 2026-05-25 08:38 +07:00
"""

import imaplib
import email
from email.header import decode_header
from datetime import datetime, timezone, timedelta
import sys
import re

# Window start: 2026-05-23 08:00 +07:00 = 2026-05-23 01:00 UTC
WINDOW_START = datetime(2026, 5, 23, 1, 0, 0, tzinfo=timezone.utc)

TZ_PLUS7 = timezone(timedelta(hours=7))

ACCOUNTS = [
    {
        "name": "duongdn",
        "email": "duongdn@nustechnology.com",
        "imap_server": "imap.zoho.com",
        "app_password": "rtYVkk1jmreE",
        "folder": "INBOX",
        "filters": [],
        "alerts": ["leave", "new relic", "alert", "outage", "down", "error"],
        "exclude": [],
    },
    {
        "name": "carrick",
        "email": "carrick@nustechnology.com",
        "imap_server": "imap.zoho.com",
        "app_password": "SNUp3Q3WAy76",
        "folder": "INBOX",
        "filters": [],
        "alerts": ["redmine", "bug", "issue", "error"],
        "exclude": ["SoCal", "Socalautowraps", "socal"],
    },
    {
        "name": "nick",
        "email": "nick@nustechnology.com",
        "imap_server": "imap.zoho.com",
        "app_password": "iHWa82WJ3q5Q",
        "folder": "INBOX",
        "filters": ["John Yi"],
        "alerts": [],
        "exclude": [],
    },
    {
        "name": "rick",
        "email": "rick@nustechnology.com",
        "imap_server": "imap.zoho.com",
        "app_password": "ij3s9L8AQz0Z",
        "folder": "INBOX",
        "filters": ["Kunal", "Fountain", "InfinityRose", "Rollbar", "BugSnag"],
        "alerts": ["production", "rollbar", "bugsnag", "error", "exception"],
        "exclude": [],
    },
    {
        "name": "kai",
        "email": "kai@nustechnology.com",
        "imap_server": "imap.zoho.com",
        "app_password": "JFDn4fsHiU0m",
        "folder": "INBOX",
        "filters": ["Madhuraka", "Jira"],
        "alerts": [],
        "exclude": [],
    },
    {
        "name": "ken",
        "email": "ken@nustechnology.com",
        "imap_server": "imap.zoho.com",
        "app_password": "WY60fEDrTfXM",
        "folder": "NewsLetter",
        "filters": ["Precognize", "development", "GitHub"],
        "alerts": [],
        "exclude": [],
    },
]


def decode_str(s):
    """Decode email header string."""
    if s is None:
        return ""
    parts = decode_header(s)
    result = []
    for part, enc in parts:
        if isinstance(part, bytes):
            try:
                result.append(part.decode(enc or "utf-8", errors="replace"))
            except Exception:
                result.append(part.decode("latin-1", errors="replace"))
        else:
            result.append(str(part))
    return " ".join(result)


def parse_date(date_str):
    """Parse email Date header to UTC datetime."""
    if not date_str:
        return None
    try:
        from email.utils import parsedate_to_datetime
        dt = parsedate_to_datetime(date_str)
        # Convert to UTC
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        else:
            dt = dt.astimezone(timezone.utc)
        return dt
    except Exception:
        return None


def check_account(account):
    """Check a single email account and return summary."""
    name = account["name"]
    server = account["imap_server"]
    user = account["email"]
    password = account["app_password"]
    folder = account.get("folder", "INBOX")
    filters = account.get("filters", [])
    alerts_keywords = account.get("alerts", [])
    exclude = account.get("exclude", [])

    print(f"\n--- Checking {name} ({user}) ---", flush=True)

    try:
        mail = imaplib.IMAP4_SSL(server, 993)
        mail.login(user, password)
        print(f"  Login OK", flush=True)

        # Select folder
        status, msgs = mail.select(folder, readonly=True)
        if status != "OK":
            # Try to list folders
            status2, folder_list = mail.list()
            available = []
            if status2 == "OK":
                for f in folder_list:
                    if f:
                        available.append(f.decode() if isinstance(f, bytes) else str(f))
            mail.logout()
            return {
                "name": name,
                "count": 0,
                "summary": f"Folder '{folder}' not found. Available: {available[:5]}",
                "alerts": [],
                "emails": [],
            }

        # Search SINCE 22-May-2026
        status, message_ids = mail.search(None, "SINCE", "22-May-2026")
        if status != "OK":
            mail.logout()
            return {"name": name, "count": 0, "summary": "Search failed", "alerts": [], "emails": []}

        ids = message_ids[0].split()
        print(f"  Found {len(ids)} messages since 22-May-2026", flush=True)

        emails = []
        for msg_id in ids:
            try:
                status, msg_data = mail.fetch(msg_id, "(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE TO CC)])")
                if status != "OK":
                    continue
                raw = msg_data[0][1]
                if isinstance(raw, bytes):
                    msg = email.message_from_bytes(raw)
                else:
                    msg = email.message_from_string(raw)

                date_str = msg.get("Date", "")
                dt = parse_date(date_str)

                # Filter by window start
                if dt is None or dt < WINDOW_START:
                    continue

                subject = decode_str(msg.get("Subject", "(no subject)"))
                from_addr = decode_str(msg.get("From", ""))
                to_addr = decode_str(msg.get("To", ""))

                # Check exclude
                skip = False
                for exc in exclude:
                    if exc.lower() in subject.lower() or exc.lower() in from_addr.lower():
                        skip = True
                        break
                if skip:
                    continue

                # For filter accounts: only include matching emails (but also include all if no filters for alerts)
                # nick, rick, kai, ken have filters - only show relevant ones
                # duongdn, carrick show all but highlight alerts
                dt_local = dt.astimezone(TZ_PLUS7)
                email_info = {
                    "subject": subject,
                    "from": from_addr,
                    "date": dt_local.strftime("%m-%d %H:%M"),
                    "is_alert": False,
                }

                # Check alert keywords
                for kw in alerts_keywords:
                    if kw.lower() in subject.lower() or kw.lower() in from_addr.lower():
                        email_info["is_alert"] = True
                        break

                emails.append(email_info)
            except Exception as e:
                print(f"  Error fetching msg {msg_id}: {e}", flush=True)

        mail.logout()

        # Filter by account-specific filters for display
        if filters:
            filtered_emails = [
                e for e in emails
                if any(f.lower() in e["subject"].lower() or f.lower() in e["from"].lower()
                       for f in filters)
            ]
        else:
            filtered_emails = emails

        alert_emails = [e for e in emails if e["is_alert"]]

        print(f"  Total in window (excl excluded): {len(emails)}, Filtered matches: {len(filtered_emails)}, Alerts: {len(alert_emails)}", flush=True)

        return {
            "name": name,
            "total_count": len(emails),
            "filtered_count": len(filtered_emails),
            "summary_emails": filtered_emails if filters else emails,
            "alert_emails": alert_emails,
            "filters": filters,
        }

    except Exception as e:
        print(f"  ERROR: {e}", flush=True)
        return {
            "name": name,
            "total_count": 0,
            "filtered_count": 0,
            "summary_emails": [],
            "alert_emails": [],
            "error": str(e),
        }


def format_email_list(emails, max_items=10):
    """Format a list of emails for display."""
    if not emails:
        return "None"
    items = []
    for e in emails[:max_items]:
        alert_marker = " [ALERT]" if e.get("is_alert") else ""
        items.append(f"  - [{e['date']}] {e['subject'][:80]} | From: {e['from'][:50]}{alert_marker}")
    if len(emails) > max_items:
        items.append(f"  ... and {len(emails) - max_items} more")
    return "\n".join(items)


def main():
    print("=" * 60)
    print(f"Email Check — 2026-05-25 08:38 (+07:00)")
    print(f"Window: 2026-05-23 08:00 +07:00 → 2026-05-25 08:38 +07:00")
    print("=" * 60)

    results = []
    for account in ACCOUNTS:
        result = check_account(account)
        results.append(result)

    print("\n\n" + "=" * 60)
    print("## Email all — 08:38 (+07:00)")
    print("=" * 60)

    table_rows = []
    all_alerts = []

    for r in results:
        name = r["name"]
        if "error" in r:
            table_rows.append((name, "ERR", f"Connection error: {r['error'][:80]}"))
            continue

        summary_emails = r.get("summary_emails", [])
        total = r.get("total_count", 0)
        filtered = r.get("filtered_count", 0)
        filters = r.get("filters", [])

        if filters:
            count_display = filtered
        else:
            count_display = total

        if not summary_emails:
            summary = "No significant emails"
        else:
            # Build summary
            subjects = [e["subject"][:60] for e in summary_emails[:5]]
            summary = "; ".join(subjects)
            if len(summary_emails) > 5:
                summary += f" (+{len(summary_emails)-5} more)"

        table_rows.append((name, count_display, summary))

        # Collect alerts
        for e in r.get("alert_emails", []):
            all_alerts.append(f"{name}: [{e['date']}] {e['subject'][:80]} | {e['from'][:50]}")

    # Print table
    print(f"\n| Account | Count | Summary |")
    print(f"|---------|-------|---------|")
    for name, count, summary in table_rows:
        print(f"| {name} | {count} | {summary} |")

    print(f"\nALERTS: {', '.join(all_alerts) if all_alerts else 'None'}")

    # Print detailed breakdown
    print("\n\n## Detailed Breakdown")
    for r in results:
        name = r["name"]
        print(f"\n### {name}")
        if "error" in r:
            print(f"  ERROR: {r['error']}")
            continue

        filters = r.get("filters", [])
        total = r.get("total_count", 0)
        filtered = r.get("filtered_count", 0)
        print(f"  Total emails in window: {total}")
        if filters:
            print(f"  Matching filters ({filters}): {filtered}")

        summary_emails = r.get("summary_emails", [])
        if summary_emails:
            print(f"  Emails:")
            print(format_email_list(summary_emails, max_items=15))

        alert_emails = r.get("alert_emails", [])
        if alert_emails:
            print(f"  ALERTS:")
            print(format_email_list(alert_emails, max_items=10))


if __name__ == "__main__":
    main()
