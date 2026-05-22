#!/usr/bin/env python3
"""Inject session cookies into UC browser and fetch Neural Contract messages."""

import json, os, time, sys, sqlite3, shutil, tempfile
import undetected_chromedriver as uc
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'config', '.upwork-config.json')
OLD_PROFILE_DIR = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-carrick')
PROFILE_DIR = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-carrick-inject')
WORKROOM_ID = '38901192'
ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec'

os.makedirs(PROFILE_DIR, exist_ok=True)

def log(msg): print(msg, file=sys.stderr)

def decrypt_cookie(encrypted_value):
    if not encrypted_value or encrypted_value[:3] != b'v10':
        try:
            return encrypted_value.decode('utf-8', errors='replace')
        except:
            return ''
    payload = encrypted_value[3:]
    key = PBKDF2(b'peanuts', b'saltysalt', dkLen=16, count=1)
    iv = b' ' * 16
    cipher = AES.new(key, AES.MODE_CBC, IV=iv)
    decrypted = cipher.decrypt(payload)
    padding_len = decrypted[-1]
    if 1 <= padding_len <= 16:
        decrypted = decrypted[:-padding_len]
    return decrypted[32:].decode('utf-8', errors='replace')

def load_old_cookies():
    db = os.path.join(OLD_PROFILE_DIR, 'Default', 'Cookies')
    if not os.path.exists(db):
        return {}
    tmp = tempfile.mktemp(suffix='.db')
    shutil.copy2(db, tmp)
    conn = sqlite3.connect(tmp)
    c = conn.cursor()
    c.execute("SELECT name, encrypted_value, host_key, path, is_secure, expires_utc FROM cookies WHERE host_key LIKE '%upwork.com%'")
    rows = c.fetchall()
    conn.close()
    os.unlink(tmp)
    result = {}
    for name, enc, host, path, secure, expires in rows:
        val = decrypt_cookie(enc)
        if val:
            result[name] = {'value': val, 'domain': host, 'path': path, 'secure': bool(secure)}
    return result

log('Loading old session cookies...')
old_cookies = load_old_cookies()
log(f'Loaded {len(old_cookies)} cookies')
for k in ['master_access_token', 'oauth2_global_js_token', 'XSRF-TOKEN', 'user_uid']:
    log(f'  {k}: {old_cookies.get(k, {}).get("value", "MISSING")[:40]}')

# Clean up lock file
for lock in ['SingletonLock', 'SingletonCookie', 'SingletonSocket']:
    lf = os.path.join(PROFILE_DIR, lock)
    if os.path.exists(lf):
        os.unlink(lf)

options = uc.ChromeOptions()
options.add_argument(f'--user-data-dir={PROFILE_DIR}')
options.add_argument('--window-size=1280,900')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

log('Launching UC Chrome...')
driver = uc.Chrome(options=options, headless=True, use_subprocess=True, version_main=140)

try:
    # Step 1: Navigate to upwork.com first (warm up, get fresh cf_clearance)
    log('Warming up at upwork.com...')
    driver.get('https://www.upwork.com/')
    time.sleep(6)
    log(f'Home URL: {driver.current_url}')

    # Step 2: Inject old session cookies
    log('Injecting session cookies...')
    inject_cookies = [
        'master_access_token', 'master_refresh_token', 'oauth2_global_js_token',
        'XSRF-TOKEN', 'user_uid', 'console_user', 'recognized', 'spt',
        'current_organization_uid', 'company_last_accessed', 'workdiary_slave_token',
        'forterToken', 'device_view', 'country_code',
    ]
    injected = 0
    for name in inject_cookies:
        if name in old_cookies:
            info = old_cookies[name]
            domain = info['domain'].lstrip('.')
            try:
                driver.add_cookie({
                    'name': name,
                    'value': info['value'],
                    'domain': domain if domain else 'upwork.com',
                    'path': info['path'] or '/',
                    'secure': info['secure'],
                })
                injected += 1
            except Exception as e:
                log(f'  Cookie {name} inject error: {e}')
    log(f'Injected {injected} session cookies')

    # Step 3: Refresh to apply cookies
    driver.get('https://www.upwork.com/')
    time.sleep(5)
    log(f'After cookie inject URL: {driver.current_url}')

    page_src = driver.page_source
    is_logged_in = ('logout' in page_src.lower() or
                    'my-jobs' in page_src.lower() or
                    '"isLoggedIn":true' in page_src or
                    'data-ev-label="logout"' in page_src)
    log(f'Logged in check: {is_logged_in}')

    # Step 4: Navigate to workroom
    log(f'Navigating to workroom...')
    driver.get(f'https://www.upwork.com/nx/wm/workroom/{WORKROOM_ID}/messages')
    time.sleep(8)
    log(f'Workroom URL: {driver.current_url}')

    # Step 5: Fetch API
    api_url = f'https://www.upwork.com/api/v3/rooms/rooms/{ROOM_UUID}/stories/simplified?limit=20'
    result = driver.execute_script(f"""
        const xsrf = document.cookie.split(';').find(c => c.trim().startsWith('XSRF-TOKEN='))?.split('=')[1] || '';
        return await fetch('{api_url}', {{
            credentials: 'include',
            headers: {{
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': decodeURIComponent(xsrf)
            }}
        }}).then(r => r.text()).catch(e => 'ERR:' + e);
    """)
    log(f'API result: {str(result)[:300]}')

    if result and '{' in str(result) and 'Authentication' not in str(result):
        print(result)
    else:
        # Try re-login if we're not authenticated
        if 'login' in driver.current_url or 'account-security' in driver.current_url:
            log('Session not valid — workroom redirected to login')
        sys.exit(2)

finally:
    driver.quit()
