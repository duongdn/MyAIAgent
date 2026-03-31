#!/usr/bin/env python3
"""Check all 6 IMAP email accounts for new emails since monitoring window."""

import imaplib
import email
from email.header import decode_header
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone, timedelta
import ssl
import re

TZ_SAIGON = timezone(timedelta(hours=7))
SINCE_DATE = "29-Mar-2026"
CUTOFF = datetime(2026, 3, 30, 8, 35, 0, tzinfo=TZ_SAIGON)

ACCOUNTS = [
    {
        "email": "duongdn@nustechnology.com",
        "password": "rtYVkk1jmreE",
        "folder": "INBOX",
        "filters": None,
    },
    {
        "email": "carrick@nustechnology.com",
        "password": "SNUp3Q3WAy76",
        "folder": "INBOX",
        "filters": None,
    },
    {
        "email": "nick@nustechnology.com",
        "password": "iHWa82WJ3q5Q",
        "folder": "INBOX",
        "filters": ["John Yi"],
    },
    {
        "email": "rick@nustechnology.com",
        "password": "ij3s9L8AQz0Z",
        "folder": "INBOX",
        "filters": ["Kunal", "Fountain", "InfinityRose"],
    },
    {
        "email": "kai@nustechnology.com",
        "password": "JFDn4fsHiU0m",
        "folder": "INBOX",
        "filters": ["Madhuraka"],
    },
    {
        "email": "ken@nustechnology.com",
        "password": "WY60fEDrTfXM",
        "folder": "NewsLetter",
        "filters": ["Precognize/development"],
    },
]


def decode_mime_header(raw):
    """Decode MIME encoded header to string."""
    if raw is None:
        return "(none)"
    parts = decode_header(raw)
    decoded = []
    for part, charset in parts:
        if isinstance(part, bytes):
            decoded.append(part.decode(charset or "utf-8", errors="replace"))
        else:
            decoded.append(part)
    return " ".join(decoded)


def matches_filter(subject, from_addr, filters):
    """Check if email matches any filter keyword (case-insensitive)."""
    if filters is None:
        return True
    text = (subject + " " + from_addr).lower()
    return any(f.lower() in text for f in filters)


def check_account(acct):
    """Check a single IMAP account and return results."""
    results = {
        "email": acct["email"],
        "status": "ok",
        "emails": [],
        "error": None,
    }

    try:
        ctx = ssl.create_default_context()
        conn = imaplib.IMAP4_SSL("imap.zoho.com", 993, ssl_context=ctx)
        conn.login(acct["email"], acct["password"])

        # Select folder
        folder = acct["folder"]
        status, data = conn.select(folder, readonly=True)
        if status != "OK":
            results["status"] = "error"
            results["error"] = f"Cannot select folder '{folder}': {data}"
            conn.logout()
            return results

        # Search since date
        status, msg_ids = conn.search(None, f'(SINCE {SINCE_DATE})')
        if status != "OK" or not msg_ids[0]:
            conn.logout()
            return results

        ids = msg_ids[0].split()

        # Fetch headers for all matching messages
        for mid in ids:
            try:
                status, msg_data = conn.fetch(mid, "(RFC822.HEADER)")
                if status != "OK":
                    continue

                raw_header = msg_data[0][1]
                msg = email.message_from_bytes(raw_header)

                # Parse date
                date_str = msg.get("Date", "")
                try:
                    dt = parsedate_to_datetime(date_str)
                    if dt.tzinfo is None:
                        dt = dt.replace(tzinfo=timezone.utc)
                    dt_saigon = dt.astimezone(TZ_SAIGON)
                except Exception:
                    continue

                # Filter by cutoff
                if dt_saigon < CUTOFF:
                    continue

                subject = decode_mime_header(msg.get("Subject"))
                from_addr = decode_mime_header(msg.get("From"))

                # Apply keyword filters
                if not matches_filter(subject, from_addr, acct["filters"]):
                    continue

                results["emails"].append({
                    "from": from_addr,
                    "subject": subject,
                    "date": dt_saigon.strftime("%Y-%m-%d %H:%M %Z"),
                })
            except Exception as e:
                continue

        conn.logout()

    except imaplib.IMAP4.error as e:
        results["status"] = "auth_error"
        results["error"] = str(e)
    except Exception as e:
        results["status"] = "error"
        results["error"] = str(e)

    return results


def main():
    print("=" * 70)
    print("EMAIL MONITORING REPORT")
    print(f"Window: 2026-03-30 08:35 → 2026-03-31 ~08:08 (Asia/Saigon)")
    print(f"IMAP SINCE: {SINCE_DATE}")
    print("=" * 70)

    all_results = []
    for acct in ACCOUNTS:
        print(f"\n--- Checking {acct['email']} (folder: {acct['folder']}) ---")
        r = check_account(acct)
        all_results.append(r)

        if r["status"] != "ok":
            print(f"  !! STATUS: {r['status']} — {r['error']}")
            continue

        count = len(r["emails"])
        filter_note = f" [filter: {', '.join(acct['filters'])}]" if acct["filters"] else ""
        print(f"  New emails: {count}{filter_note}")

        for e in r["emails"]:
            print(f"    From: {e['from']}")
            print(f"    Subject: {e['subject']}")
            print(f"    Date: {e['date']}")
            print()

    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    urgent_keywords = ["urgent", "critical", "alert", "down", "outage", "emergency", "asap", "blocked", "failure", "error"]

    for r in all_results:
        count = len(r["emails"])
        status_tag = "" if r["status"] == "ok" else f" [!! {r['status'].upper()}: {r['error']}]"
        print(f"  {r['email']}: {count} email(s){status_tag}")

        # Flag urgent
        for e in r["emails"]:
            subj_lower = (e["subject"] or "").lower()
            if any(kw in subj_lower for kw in urgent_keywords):
                print(f"    ⚠ URGENT: {e['subject']}")

    # Auth failures = high severity
    auth_failures = [r for r in all_results if r["status"] == "auth_error"]
    if auth_failures:
        print("\n!! AUTH FAILURES (HIGH SEVERITY - blind spot):")
        for r in auth_failures:
            print(f"   {r['email']}: {r['error']}")

    print()


if __name__ == "__main__":
    main()
