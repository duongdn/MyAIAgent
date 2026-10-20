#!/usr/bin/env python3
"""
Running stats + milestones from Strava (no paid API — uses the web's own JSON endpoint
/athlete/training_activities with DuongDN's session cookies from Chrome Profile 9).

Usage: python3 scripts/strava-running-stats.py [--refresh-cookies]
Prints JSON: latest run, week/month/year totals, records, milestones hit by the latest run.
"""
import json
import subprocess
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COOKIES = ROOT / 'tmp' / 'strava-cookies.json'
VN = timezone(timedelta(hours=7))
MAX_PAGES = 30  # 20 activities/page


def load_cookie_header():
    if '--refresh-cookies' in sys.argv or not COOKIES.exists():
        subprocess.run([sys.executable, str(ROOT / 'scripts' / 'get-duongdn-strava-cookies.py')], check=True)
    return '; '.join(f"{c['name']}={c['value']}" for c in json.loads(COOKIES.read_text()))


def fetch_page(cookie, page):
    req = urllib.request.Request(
        f'https://www.strava.com/athlete/training_activities?page={page}&per_page=20',
        headers={'Cookie': cookie, 'User-Agent': 'Mozilla/5.0', 'X-Requested-With': 'XMLHttpRequest',
                 'Accept': 'application/json, text/javascript'})
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read().decode()
    if body.lstrip().startswith('<'):
        raise RuntimeError('not_logged_in — log into strava.com in Chrome Profile 9, then --refresh-cookies')
    return json.loads(body).get('models', [])


def fetch_runs():
    cookie = load_cookie_header()
    runs = []
    for page in range(1, MAX_PAGES + 1):
        models = fetch_page(cookie, page)
        if not models:
            break
        runs += [{
            'id': m['id'],
            'name': m['name'],
            'date': datetime.fromtimestamp(m['start_date_local_raw'], timezone.utc).replace(tzinfo=VN),
            'km': m['distance_raw'] / 1000,
            'sec': m['moving_time_raw'],
        } for m in models if m.get('sport_type') in ('Run', 'TrailRun', 'VirtualRun')]
    return sorted(runs, key=lambda r: r['date'])


def pace(sec, km):
    s = round(sec / km) if km else 0
    return f'{s // 60}:{s % 60:02d}/km'


def summarize(runs):
    if not runs:
        return {'ok': True, 'runs': 0}
    latest, before = runs[-1], runs[:-1]
    d = latest['date']
    total = lambda rs: round(sum(r['km'] for r in rs), 1)
    week = [r for r in runs if r['date'].date() >= (d - timedelta(days=d.weekday())).date()]
    month = [r for r in runs if (r['date'].year, r['date'].month) == (d.year, d.month)]
    year = [r for r in runs if r['date'].year == d.year]

    milestones = []
    if before and latest['km'] > max(r['km'] for r in before):
        milestones.append(f"Chạy dài nhất từ trước tới nay: {latest['km']:.2f} km")
    for dist in (5, 10, 21.1, 42.2):
        fast_before = [r['sec'] / r['km'] for r in before if r['km'] >= dist]
        if latest['km'] >= dist:
            if not fast_before:
                milestones.append(f'Lần đầu chạy ≥ {dist:g} km')
            elif latest['sec'] / latest['km'] < min(fast_before):
                milestones.append(f'Pace nhanh nhất cho cự ly ≥ {dist:g} km: {pace(latest["sec"], latest["km"])}')
    for label, rs, steps in (('tháng', month, (50, 100, 150, 200)), ('năm', year, (100, 250, 500, 1000, 1500, 2000))):
        prev = total(rs[:-1])
        crossed = [s for s in steps if prev < s <= total(rs)]
        if crossed:
            milestones.append(f'Cán mốc {crossed[-1]} km trong {label}')
    if len(runs) % 50 == 0:
        milestones.append(f'Buổi chạy thứ {len(runs)}')

    return {
        'ok': True,
        'runs': len(runs),
        'latest': {'name': latest['name'], 'date': d.strftime('%Y-%m-%d'), 'km': round(latest['km'], 2),
                   'time_min': round(latest['sec'] / 60), 'pace': pace(latest['sec'], latest['km']),
                   'url': f"https://www.strava.com/activities/{latest['id']}"},
        'week_km': total(week), 'month_km': total(month), 'year_km': total(year), 'all_km': total(runs),
        'longest_km': round(max(r['km'] for r in runs), 2),
        'milestones': milestones,
    }


if __name__ == '__main__':
    try:
        print(json.dumps(summarize(fetch_runs()), ensure_ascii=False))
    except Exception as e:
        print(json.dumps({'ok': False, 'error': str(e)}, ensure_ascii=False))
        sys.exit(1)
