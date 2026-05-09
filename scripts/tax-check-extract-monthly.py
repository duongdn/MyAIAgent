#!/usr/bin/env python3
"""Decrypt every payslip for a given tax year and reconcile against annual sheet.

Reads `tmp/tax-check-data.json` (produced by tax-check-fetch.py), decrypts each
2025 payslip .ods, extracts per-month figures via the Personal-Deduction (11M)
landmark, and outputs a single reconciliation JSON.

Year handling rules (Vietnam cash basis):
  - 13th-month bonus paid in following year (subject "[HR] Payslip - 13/YYYY")
    belongs to the FOLLOWING year's tax (excluded from year YYYY settlement).
  - Combined emails ("[HR] Payslip - 12/YYYY-1 & 01/YYYY") are tagged to the
    LATER month — Mo 01/YYYY contains both 12/YYYY-1 13th-month bonus and
    01/YYYY monthly salary, so taxable income for that month is unusually high
    and may push withholding into a higher monthly bracket (refunded at year
    end via annual quick-deduction).

Usage: python3 tax-check-extract-monthly.py [year]   (default: 2025)
"""
import importlib.util
import json
import os
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JSON = os.path.join(ROOT, "tmp", "tax-check-data.json")
NS_T = "urn:oasis:names:tc:opendocument:xmlns:table:1.0"
NS_O = "urn:oasis:names:tc:opendocument:xmlns:office:1.0"

# Reuse decryptor module
_spec = importlib.util.spec_from_file_location(
    "_dec", os.path.join(ROOT, "scripts", "tax-check-decrypt-payslip.py")
)
_dec = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(_dec)


def find_data_row(xml):
    """Return dict {logical_col: {text, value}} of the row whose first cell is 'DuongDN'."""
    root = ET.fromstring(xml)
    tbl = next(root.iter(f"{{{NS_T}}}table"))
    for row in list(tbl):
        if not row.tag.endswith("}table-row"):
            continue
        cells = {}
        col = 0
        for c in list(row):
            if c.tag.endswith("}covered-table-cell"):
                col += int(c.get(f"{{{NS_T}}}number-columns-repeated") or 1)
                continue
            if not c.tag.endswith("}table-cell"):
                continue
            rep = int(c.get(f"{{{NS_T}}}number-columns-repeated") or 1)
            v = c.get(f"{{{NS_O}}}value")
            tx = "".join(c.itertext()).strip()
            for _ in range(rep):
                cells[col] = {"text": tx, "value": float(v) if v else None}
                col += 1
        if (cells.get(0, {}).get("text") or "").strip().startswith("DuongDN"):
            return cells
    return None


def extract_month(cells):
    """Anchor on Personal Deduction = 11,000,000 (DETAILS section).
    Layout (DETAILS row, in order of numeric cells):
      [..., gross_for_pit, gross_for_ins, PERSONAL_DED=11M, n_dep,
       dep_ded, bhxh, bhyt, bhtn, occ, total_ins, taxable, pit, net]
    Anchor lets us survive cell-merge variations across months.
    """
    if not cells:
        return {}
    val_cols = [c for c in sorted(cells) if cells[c].get("value") is not None]
    pd_col = None
    for c in val_cols:
        if cells[c]["value"] == 11_000_000:
            nx = next((cc for cc in val_cols if cc > c), None)
            if nx and 0 <= cells[nx]["value"] <= 10:
                pd_col = c
                break
    if pd_col is None:
        return {"layout": "special"}  # year-end summary (Mo 13) layout differs

    idx = val_cols.index(pd_col)
    keys = ["n_dep", "dep_ded", "bhxh", "bhyt", "bhtn", "occ",
            "total_ins", "taxable", "pit", "net"]
    after = val_cols[idx + 1: idx + 11]
    out = {k: cells[c]["value"] for k, c in zip(keys, after)}
    out["personal_ded"] = 11_000_000
    out["gross_for_ins"] = cells[val_cols[idx - 1]]["value"] if idx >= 1 else None
    out["gross_for_pit"] = cells[val_cols[idx - 2]]["value"] if idx >= 2 else None
    out["gross_orig"] = cells[val_cols[0]]["value"]
    out["layout"] = "monthly"
    return out


def is_for_year(msg, year):
    """Match payslip subject 'MM/YYYY' (filter out 13th-month from prior year if cash-basis crosses)."""
    months = msg.get("months") or []
    return any(m.get("yy") == str(year) for m in months) and not all(m.get("mm") == "13" for m in months)


def main():
    year = sys.argv[1] if len(sys.argv) > 1 else "2025"
    data = json.load(open(DATA_JSON))
    payslips = [m for m in data["payslips"]["messages"] if is_for_year(m, year)]
    # Group by latest MM in subject (combined emails carry both 12/YYYY-1 and 01/YYYY → tag as 01/YYYY)
    by_mo = {}
    for m in payslips:
        ms = [x for x in m["months"] if x["yy"] == str(year)]
        if not ms:
            continue
        mo = sorted(ms, key=lambda x: x["mm"])[0]["mm"]  # earliest YYYY month claim
        by_mo.setdefault(mo, []).append(m)

    months_out = []
    sums = {k: 0 for k in ["gross_for_pit", "gross_for_ins", "total_ins",
                            "taxable", "pit", "net", "dep_ded"]}
    skipped = []
    for mo in sorted(by_mo):
        msg = sorted(by_mo[mo], key=lambda x: x.get("date") or "")[-1]
        att = next((a for a in msg["attachments"] if a.get("saved_to")), None)
        if not att or not msg.get("password"):
            skipped.append({"mo": mo, "reason": "missing attachment or password"})
            continue
        try:
            xml = _dec.extract_content_xml(att["saved_to"], msg["password"])
        except Exception as e:
            skipped.append({"mo": mo, "reason": f"decrypt failed: {e}"})
            continue
        info = extract_month(find_data_row(xml))
        if info.get("layout") == "monthly":
            for k in sums:
                sums[k] += info.get(k) or 0
        months_out.append({
            "mo": mo,
            "subject": msg["subject"],
            "folder": msg["folder"],
            "attachment": att["saved_to"],
            **info,
        })

    # Compare with sheet figures
    sheet = data.get("sheet", {})
    ban = next((s for s in sheet.get("sheets", []) if s.get("name") == "BANGLUONG"), None)
    sheet_vals = {}
    if ban:
        rows = ban["rows"]
        hdr = rows[0] if rows else []
        data_row = next((r for r in rows if any("Đoàn Nguyên Dương" in str(c) for c in r)), None)
        if data_row:
            def find(label):
                for i, h in enumerate(hdr):
                    if h and label in h:
                        try:
                            return float(str(data_row[i]).replace(",", ""))
                        except (ValueError, IndexError):
                            return None
                return None
            sheet_vals = {
                "gross_TNCT":   find("Tổng TNCT"),
                "personal_ded": find("Số tiền giảm trừ bản thân"),
                "n_dep":        find("Số người phụ thuộc"),
                "dep_ded":      find("Số tiền giảm trừ người phụ thuộc"),
                "ins":          find("Bảo hiểm bắt buộc"),
                "taxable":      find("Thu nhập tính thuế"),
                "withheld":     find("Số thuế đã khấu trừ"),
                "tax_due":      find("Tổng số thuế phải nộp"),
                "refund":       find("Số thuế còn lại"),
            }

    delta = {
        "gross":     (sheet_vals.get("gross_TNCT") or 0) - sums["gross_for_pit"],
        "insurance": (sheet_vals.get("ins") or 0)        - sums["total_ins"],
        "taxable":   (sheet_vals.get("taxable") or 0)    - sums["taxable"],
        "withheld":  (sheet_vals.get("withheld") or 0)   - sums["pit"],
        "dep_ded":   (sheet_vals.get("dep_ded") or 0)    - sums["dep_ded"],
    }

    json.dump({
        "year": year,
        "months": months_out,
        "sums": sums,
        "sheet": sheet_vals,
        "delta": delta,
        "skipped": skipped,
    }, sys.stdout, ensure_ascii=False, indent=2, default=str)


if __name__ == "__main__":
    main()
