from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    'config/daily-agent-490610-7eb7985b33e3.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
)
svc = build('sheets', 'v4', credentials=creds)
sid = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o"

rows = svc.spreadsheets().values().get(spreadsheetId=sid, range="Est vs Charged!A1:M2000").execute().get('values', [])

EXCLUDE_NSIP = {"deployed on live", "cancelled", "has bug on live", "tested on live"}

def f(v):
    try:
        return float(str(v).replace(",", "."))
    except Exception:
        return 0.0

tasks = []
for row in rows[5:]:
    if not row or not row[0].strip():
        continue
    name = row[0].strip()
    status = row[6].strip().lower() if len(row) > 6 else ""
    dev = row[7].strip() if len(row) > 7 else ""
    est = f(row[8]) if len(row) > 8 else 0.0
    cr = f(row[9]) if len(row) > 9 else 0.0
    actual = f(row[10]) if len(row) > 10 else 0.0
    charged = f(row[11]) if len(row) > 11 else 0.0
    if est == 0 and actual == 0 and charged == 0 and not status:
        continue
    total_est = est + cr
    tasks.append({"name": name, "status": status, "dev": dev, "est": est, "cr": cr, "actual": actual, "charged": charged, "total_est": total_est})

print(f"Total qualifying tasks: {len(tasks)}")

NSIP_STATUSES = {"not started", "in-progress (>50%)", "in-progress (<50%)"}
nsip = [t for t in tasks if t["status"] in NSIP_STATUSES or (t["status"].startswith("in-progress"))]
nsip_remaining = sum(t["total_est"] - t["actual"] for t in nsip)
print(f"NS+IP (Not Started + In-progress variants only): {len(nsip)} tasks, remaining={nsip_remaining:.2f}h")

broader_exclude = EXCLUDE_NSIP
broader = [t for t in tasks if t["status"] not in broader_exclude]
broader_remaining = sum(t["total_est"] - t["actual"] for t in broader)
print(f"Broader (all non-excluded incl blank/pending): {len(broader)} tasks, remaining={broader_remaining:.2f}h")

print("\nStatus breakdown:")
from collections import Counter
c = Counter(t["status"] or "(blank)" for t in tasks)
for k, v in c.most_common():
    print(f"  {k}: {v}")

print("\nOver-estimate tasks (actual > total_est * 1.2, total_est>0):")
over = [t for t in tasks if t["total_est"] > 0 and t["actual"] > t["total_est"] * 1.2]
over.sort(key=lambda t: t["actual"] - t["total_est"], reverse=True)
for t in over[:20]:
    pct = (t["actual"] / t["total_est"] - 1) * 100 if t["total_est"] else 0
    print(f"  {t['name'][:50]:50s} est={t['est']:.1f} cr={t['cr']:.1f} total={t['total_est']:.1f} actual={t['actual']:.1f} over={pct:.0f}% status={t['status']}")

print("\n--- NS+IP task detail (sorted by remaining asc) ---")
nsip_sorted = sorted(nsip, key=lambda t: t["total_est"] - t["actual"])
for t in nsip_sorted[:15]:
    rem = t["total_est"] - t["actual"]
    print(f"  {t['name'][:45]:45s} status={t['status']:20s} est={t['est']:.1f} cr={t['cr']:.1f} actual={t['actual']:.1f} remaining={rem:.1f}")
