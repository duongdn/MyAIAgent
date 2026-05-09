#!/usr/bin/env python3
"""Decrypt one ODF (.ods) file with a password and dump cell values as JSON.

ODF 1.2 §4.5 encryption: PBKDF2 → AES-256-CBC (or Blowfish-CFB) → raw deflate.
Used by /tax-check to read each monthly payslip's gross / insurance / tax cells.

Usage: python3 tax-check-decrypt-payslip.py <file.ods> <password>
"""
import base64
import io
import json
import re
import sys
import xml.etree.ElementTree as ET
import zipfile
import zlib
from hashlib import sha1, sha256

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

NS = {
    "manifest": "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
    "office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
}


def _b64(s):
    return base64.b64decode(s) if s else b""


def parse_manifest(zf):
    """Return dict {entry_path: encryption_params or None}."""
    xml = zf.read("META-INF/manifest.xml")
    root = ET.fromstring(xml)
    out = {}
    for fe in root.findall("manifest:file-entry", NS):
        path = fe.get(f"{{{NS['manifest']}}}full-path")
        ed = fe.find("manifest:encryption-data", NS)
        if ed is None:
            out[path] = None
            continue
        algo = ed.find("manifest:algorithm", NS)
        kd = ed.find("manifest:key-derivation", NS)
        sk = ed.find("manifest:start-key-generation", NS)
        out[path] = {
            "checksum_type": ed.get(f"{{{NS['manifest']}}}checksum-type"),
            "checksum": _b64(ed.get(f"{{{NS['manifest']}}}checksum")),
            "algo": algo.get(f"{{{NS['manifest']}}}algorithm-name") if algo is not None else None,
            "iv": _b64(algo.get(f"{{{NS['manifest']}}}initialisation-vector") if algo is not None else None),
            "kd_name": kd.get(f"{{{NS['manifest']}}}key-derivation-name") if kd is not None else None,
            "salt": _b64(kd.get(f"{{{NS['manifest']}}}salt") if kd is not None else None),
            "iter": int(kd.get(f"{{{NS['manifest']}}}iteration-count") or 1024) if kd is not None else 1024,
            "key_size": int(kd.get(f"{{{NS['manifest']}}}key-size") or 16) if kd is not None else 16,
            "sk_name": sk.get(f"{{{NS['manifest']}}}start-key-generation-name") if sk is not None else None,
            "sk_size": int(sk.get(f"{{{NS['manifest']}}}key-size") or 20) if sk is not None else 20,
        }
    return out


def derive_key(password, params):
    """ODF: start_key = digest(password); derived_key = PBKDF2(start_key, salt, iter, size)."""
    sk_name = (params.get("sk_name") or "").lower()
    if "sha256" in sk_name:
        start_key = sha256(password.encode("utf-8")).digest()
    else:
        start_key = sha1(password.encode("utf-8")).digest()
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA1(),
        length=params["key_size"],
        salt=params["salt"],
        iterations=params["iter"],
    )
    return kdf.derive(start_key)


def decrypt_entry(blob, key, params):
    algo = (params.get("algo") or "").lower()
    if "aes256-cbc" in algo or "aes" in algo:
        cipher = Cipher(algorithms.AES(key), modes.CBC(params["iv"]))
        plain = cipher.decryptor().update(blob) + cipher.decryptor().finalize()
    elif "blowfish" in algo:
        cipher = Cipher(algorithms.Blowfish(key), modes.CFB(params["iv"]))
        plain = cipher.decryptor().update(blob) + cipher.decryptor().finalize()
    else:
        raise ValueError(f"Unsupported algo: {algo}")
    return zlib.decompress(plain, -15)  # raw deflate


def extract_content_xml(path, password):
    with zipfile.ZipFile(path) as zf:
        manifest = parse_manifest(zf)
        params = manifest.get("content.xml")
        blob = zf.read("content.xml")
    if not params:
        return blob.decode("utf-8", errors="replace")
    key = derive_key(password, params)
    return decrypt_entry(blob, key, params).decode("utf-8", errors="replace")


def parse_cells(content_xml):
    """Return list of sheets, each {name, rows: [[cell_strings...]]}."""
    root = ET.fromstring(content_xml)
    sheets = []
    for tbl in root.iter(f"{{{NS['table']}}}table"):
        name = tbl.get(f"{{{NS['table']}}}name")
        rows = []
        for row in tbl.findall(f"{{{NS['table']}}}table-row"):
            rep_row = int(row.get(f"{{{NS['table']}}}number-rows-repeated") or 1)
            cells = []
            for cell in row.findall(f"{{{NS['table']}}}table-cell"):
                rep = int(cell.get(f"{{{NS['table']}}}number-columns-repeated") or 1)
                vt = cell.get(f"{{{NS['office']}}}value-type")
                val = cell.get(f"{{{NS['office']}}}value")
                if val is None:
                    text = "".join(cell.itertext()).strip()
                    val = text or None
                cells.extend([val] * rep)
            if any(c not in (None, "") for c in cells):
                for _ in range(min(rep_row, 3)):
                    rows.append(cells)
        sheets.append({"name": name, "rows": rows})
    return sheets


def main():
    path, pwd = sys.argv[1], sys.argv[2]
    xml = extract_content_xml(path, pwd)
    sheets = parse_cells(xml)
    json.dump({"file": path, "sheets": sheets}, sys.stdout, ensure_ascii=False, default=str)


if __name__ == "__main__":
    main()
