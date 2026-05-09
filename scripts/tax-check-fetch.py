#!/usr/bin/env python3
"""Fetch Vietnam tax data sources for /tax-check skill.

Outputs a single JSON to stdout with two top-level keys:
  - "sheet": rows from the user's tax-summary spreadsheet (XLSX in Drive)
  - "payslips": payslip emails found in duongdn@nustechnology.com inbox

The slash-command prompt consumes this JSON and produces the YTD report.
"""
import io
import json
import os
import re
import ssl
import sys
import imaplib
import email
from email.header import decode_header

from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from google.oauth2 import service_account
import openpyxl
import xlrd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVC_KEY = os.path.join(ROOT, "config", "daily-agent-490610-7eb7985b33e3.json")
EMAIL_CFG = os.path.join(ROOT, "config", ".email-accounts.json")
TMP_DIR = os.path.join(ROOT, "tmp")
SHEET_FILE_ID = "1_9jB6hLIpTUfaZ0hImRCbRxLlXKEYgY7"
EMAIL_USER = "duongdn@nustechnology.com"
PAYSLIP_QUERY = "payslip"


def fetch_sheet():
    """Download tax XLSX from Drive (Office file, not native Sheet) and return rows."""
    creds = service_account.Credentials.from_service_account_file(
        SVC_KEY, scopes=["https://www.googleapis.com/auth/drive.readonly"]
    )
    drv = build("drive", "v3", credentials=creds)
    try:
        meta = drv.files().get(fileId=SHEET_FILE_ID, fields="id,name,mimeType,size").execute()
    except Exception as e:
        return {
            "error": "drive_access_failed",
            "detail": str(e)[:500],
            "hint": (
                "Share the sheet with daily-agent@daily-agent-490610.iam.gserviceaccount.com "
                "as Viewer, then re-run."
            ),
        }

    os.makedirs(TMP_DIR, exist_ok=True)
    out_path = os.path.join(TMP_DIR, "tax-summary.xlsx")
    req = drv.files().get_media(fileId=SHEET_FILE_ID)
    buf = io.FileIO(out_path, "wb")
    dl = MediaIoBaseDownload(buf, req)
    done = False
    while not done:
        _, done = dl.next_chunk()
    buf.close()

    sheets = _read_workbook(out_path)
    return {"meta": meta, "saved_to": out_path, "sheets": sheets}


def _read_workbook(path):
    """Read .xlsx (openpyxl) or legacy .xls (xlrd) — Drive may serve either."""
    with open(path, "rb") as f:
        head = f.read(8)
    if head[:4] == b"PK\x03\x04":
        wb = openpyxl.load_workbook(path, data_only=True)
        return [
            {
                "name": ws.title,
                "rows": [
                    [(c.isoformat() if hasattr(c, "isoformat") else c) for c in r]
                    for r in ws.iter_rows(values_only=True)
                    if any(c is not None and str(c).strip() != "" for c in r)
                ][:300],
            }
            for ws in wb.worksheets
        ]
    if head[:8] == b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1":
        book = xlrd.open_workbook(path)
        out = []
        for ws in book.sheets():
            rows = []
            for ri in range(ws.nrows):
                r = [ws.cell_value(ri, ci) for ci in range(ws.ncols)]
                if any(v not in (None, "") for v in r):
                    rows.append(r)
            out.append({"name": ws.name, "rows": rows[:300]})
        return out
    return [{"error": "unknown_workbook_format", "head": head.hex()}]


def _decode(s):
    if not s:
        return ""
    parts = decode_header(s)
    out = []
    for txt, enc in parts:
        if isinstance(txt, bytes):
            try:
                out.append(txt.decode(enc or "utf-8", errors="replace"))
            except Exception:
                out.append(txt.decode("utf-8", errors="replace"))
        else:
            out.append(txt)
    return "".join(out).strip()


def _body_text(msg):
    if msg.is_multipart():
        for part in msg.walk():
            ctype = part.get_content_type()
            disp = str(part.get("Content-Disposition") or "")
            if ctype == "text/plain" and "attachment" not in disp:
                payload = part.get_payload(decode=True) or b""
                return payload.decode(part.get_content_charset() or "utf-8", errors="replace")
        for part in msg.walk():
            if part.get_content_type() == "text/html":
                payload = part.get_payload(decode=True) or b""
                html = payload.decode(part.get_content_charset() or "utf-8", errors="replace")
                return re.sub(r"<[^>]+>", " ", html)
    else:
        payload = msg.get_payload(decode=True) or b""
        return payload.decode(msg.get_content_charset() or "utf-8", errors="replace")
    return ""


SKIP_FOLDERS = {"Drafts", "Templates", "Snoozed", "Sent", "Spam", "Trash",
                "Junk", "Notes", "Sent Messages"}


def _list_folders(M):
    """Return list of selectable folder names, skipping system/junk folders."""
    typ, lines = M.list()
    out = []
    for line in lines or []:
        s = line.decode() if isinstance(line, bytes) else line
        m = re.search(r'"([^"]+)"\s*$', s)
        if not m:
            continue
        name = m.group(1)
        if name in SKIP_FOLDERS:
            continue
        out.append(name)
    return out


def fetch_payslips():
    with open(EMAIL_CFG) as f:
        cfg = json.load(f)
    acct = next((a for a in cfg["accounts"] if a["email"] == EMAIL_USER), None)
    if not acct:
        return {"error": "duongdn account not in config"}

    ctx = ssl.create_default_context()
    M = imaplib.IMAP4_SSL(acct["imap_server"], 993, ssl_context=ctx)
    try:
        M.login(acct["email"], acct["app_password"])
    except imaplib.IMAP4.error as e:
        return {"error": "auth_fail", "detail": str(e)[:200]}

    msgs = []
    folder_counts = {}
    for fname in _list_folders(M):
        typ, _ = M.select(f'"{fname}"', readonly=True)
        if typ != "OK":
            continue
        typ, data = M.search(None, "SUBJECT", f'"{PAYSLIP_QUERY}"')
        ids = data[0].split() if data and data[0] else []
        if not ids:
            continue
        folder_counts[fname] = len(ids)
        for mid in ids:
            typ, raw = M.fetch(mid, "(RFC822)")
            if typ != "OK" or not raw or not raw[0]:
                continue
            m = email.message_from_bytes(raw[0][1])
            body = _body_text(m)
            msgs.append({
                "folder": fname,
                "uid": mid.decode(),
                "subject": _decode(m.get("Subject")),
                "from": _decode(m.get("From")),
                "date": m.get("Date"),
                "attachments": [
                    _decode(p.get_filename())
                    for p in (m.walk() if m.is_multipart() else [])
                    if p.get_filename()
                ],
                "body_excerpt": (body or "")[:4000],
            })
    M.logout()
    msgs.sort(key=lambda x: x.get("date") or "", reverse=True)
    return {
        "account": EMAIL_USER,
        "query": PAYSLIP_QUERY,
        "count": len(msgs),
        "folder_counts": folder_counts,
        "messages": msgs,
    }


def main():
    out = {"sheet": fetch_sheet(), "payslips": fetch_payslips()}
    json.dump(out, sys.stdout, ensure_ascii=False, indent=2, default=str)


if __name__ == "__main__":
    main()
