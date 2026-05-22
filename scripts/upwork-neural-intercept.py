#!/usr/bin/env python3
"""Monitor Upwork workroom page's network requests to capture messages API response."""

import json, os, time, sys, sqlite3, shutil, tempfile, threading
import undetected_chromedriver as uc
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'config', '.upwork-config.json')
OLD_PROFILE = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-carrick')
UC_PROFILE = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-carrick-intercept')
WORKROOM_ID = '38901192'
ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec'

os.makedirs(UC_PROFILE, exist_ok=True)

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
    pad = decrypted[-1]
    if 1 <= pad <= 16:
        decrypted = decrypted[:-pad]
    return decrypted[32:].decode('utf-8', errors='replace')

def load_old_cookies():
    db = os.path.join(OLD_PROFILE, 'Default', 'Cookies')
    if not os.path.exists(db):
        return {}
    tmp = tempfile.mktemp(suffix='.db')
    shutil.copy2(db, tmp)
    conn = sqlite3.connect(tmp)
    c = conn.cursor()
    c.execute("SELECT name, encrypted_value, host_key, path, is_secure FROM cookies WHERE host_key LIKE '%upwork.com%'")
    rows = c.fetchall()
    conn.close()
    os.unlink(tmp)
    result = {}
    for name, enc, host, path, secure in rows:
        val = decrypt_cookie(enc)
        if val:
            result[name] = {'value': val, 'domain': host.lstrip('.'), 'path': path or '/', 'secure': bool(secure)}
    return result

# Clean lock
for f in ['SingletonLock', 'SingletonCookie', 'SingletonSocket']:
    p = os.path.join(UC_PROFILE, f)
    if os.path.exists(p):
        os.unlink(p)

old_cookies = load_old_cookies()
log(f'Loaded {len(old_cookies)} old cookies')

options = uc.ChromeOptions()
options.add_argument(f'--user-data-dir={UC_PROFILE}')
options.add_argument('--window-size=1280,900')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

log('Launching UC Chrome with CDP intercept...')
driver = uc.Chrome(options=options, headless=True, use_subprocess=True, version_main=140)

captured_result = [None]

try:
    # Enable Network CDP
    driver.execute_cdp_cmd('Network.enable', {'maxTotalBufferSize': 10000000, 'maxResourceBufferSize': 5000000})

    # Warm up + CF clearance
    log('Warming up...')
    driver.get('https://www.upwork.com/')
    time.sleep(6)

    # Inject old cookies
    for name, info in old_cookies.items():
        try:
            driver.add_cookie({
                'name': name, 'value': info['value'],
                'domain': info['domain'], 'path': info['path'],
                'secure': info['secure'],
            })
        except:
            pass
    log('Cookies injected')

    # Refresh to apply
    driver.get('https://www.upwork.com/')
    time.sleep(3)

    # Navigate to workroom — let page JS do the API calls
    log('Loading workroom...')
    driver.get(f'https://www.upwork.com/nx/wm/workroom/{WORKROOM_ID}/messages')

    # Wait and poll for messages API response via JS
    deadline = time.time() + 30
    while time.time() < deadline and captured_result[0] is None:
        # Try fetching via JS (in case page auth refreshed)
        result = driver.execute_script(f"""
            try {{
                const r = await fetch('/api/v3/rooms/rooms/{ROOM_UUID}/stories/simplified?limit=20', {{
                    credentials: 'include',
                    headers: {{'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}}
                }});
                return await r.text();
            }} catch(e) {{ return 'ERR:' + e; }}
        """)
        if result and '{' in str(result) and 'Authentication' not in str(result):
            captured_result[0] = result
            break
        log(f'  Poll: {str(result)[:80]}')
        time.sleep(3)

    if captured_result[0] is None:
        # Take screenshot for debug
        driver.save_screenshot('/tmp/upwork-intercept.png')
        log(f'Final URL: {driver.current_url}')

        # Last attempt: check page source for embedded data
        src = driver.page_source
        if ROOM_UUID in src:
            log('Room UUID found in page source')
            idx = src.find(ROOM_UUID)
            log(f'Context: ...{src[max(0,idx-100):idx+200]}...')

        log('No messages captured')
        sys.exit(2)

    print(captured_result[0])

finally:
    driver.quit()
