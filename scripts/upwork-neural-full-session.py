#!/usr/bin/env python3
"""
Full session: login -> switch to agency/client context via 'Clients' nav button
-> fetch Neural Contract messages. All in one continuous driver instance.
"""

import json, os, time, sys
import undetected_chromedriver as uc

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'config', '.upwork-config.json')
PROFILE_DIR = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-full-session')
WORKROOM_ID = '38901192'
ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec'

with open(CONFIG_PATH) as f:
    config = json.load(f)
account = next(a for a in config['accounts'] if a['name'] == 'carrick')

os.makedirs(PROFILE_DIR, exist_ok=True)

def log(msg): print(msg, file=sys.stderr)

for lock in ['SingletonLock', 'SingletonCookie', 'SingletonSocket']:
    lf = os.path.join(PROFILE_DIR, lock)
    if os.path.exists(lf):
        os.unlink(lf)

options = uc.ChromeOptions()
options.add_argument(f'--user-data-dir={PROFILE_DIR}')
options.add_argument('--window-size=1280,900')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

log('Launching UC Chrome (headless=False)...')
driver = uc.Chrome(options=options, headless=False, use_subprocess=True, version_main=140)

def fetch_messages():
    return driver.execute_script(f"""
        return (async () => {{
            const xsrf = document.cookie.split(';').find(c=>c.trim().startsWith('XSRF-TOKEN='))?.split('=')[1]||'';
            const r = await fetch('/api/v3/rooms/rooms/{ROOM_UUID}/stories/simplified?limit=20', {{
                credentials: 'include',
                headers: {{
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': decodeURIComponent(xsrf)
                }}
            }});
            return {{status: r.status, body: (await r.text()).substring(0, 5000)}};
        }})();
    """)

try:
    # Step 1: Warm up
    log('Warming up...')
    driver.get('https://www.upwork.com/')
    time.sleep(5)

    if 'login' in driver.current_url or 'account-security' in driver.current_url:
        pass  # need to login
    else:
        log(f'Session alive: {driver.current_url}')
        # Check if we're in a logged-in state
        page = driver.page_source
        if 'logout' in page.lower() or 'find-work' in driver.current_url or 'reports' in driver.current_url:
            log('Already logged in, skipping login')
            driver.get('https://www.upwork.com/nx/find-work/')
            time.sleep(3)
            goto_login = False
        else:
            goto_login = True

    # Step 2: Login
    driver.get('https://www.upwork.com/ab/account-security/login')
    time.sleep(8)
    log(f'Login URL: {driver.current_url}')

    if 'login' in driver.current_url or 'account-security' in driver.current_url:
        # Fill username
        filled = driver.execute_script(f"""
            const inp = document.querySelector('input[type="text"], input[type="email"]');
            if (inp && inp.offsetParent !== null) {{
                const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                setter.call(inp, '{account["username"]}');
                inp.dispatchEvent(new Event('input', {{bubbles:true}}));
                inp.dispatchEvent(new Event('change', {{bubbles:true}}));
                return true;
            }}
            return false;
        """)
        log(f'Username filled: {filled}')
        time.sleep(1)

        # Click Continue
        driver.execute_script("""
            const btns = [...document.querySelectorAll('button')];
            const b = btns.find(b => b.textContent.trim() === 'Continue' && b.offsetParent);
            if (b) b.click();
        """)
        time.sleep(5)

        # Fill password
        pw = account['password'].replace("'", "\\'")
        driver.execute_script(f"""
            const pw = document.querySelector('input[type="password"]');
            if (pw) {{
                const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                setter.call(pw, '{pw}');
                pw.dispatchEvent(new Event('input', {{bubbles:true}}));
                pw.dispatchEvent(new Event('change', {{bubbles:true}}));
            }}
        """)
        log('Password filled')

        # Wait for Turnstile
        log('Waiting up to 60s for Turnstile...')
        for i in range(12):
            time.sleep(5)
            ts = driver.execute_script("""
                const el = document.querySelector('[name="cf-turnstile-response"]');
                return el ? el.value : '';
            """)
            if ts:
                log(f'Turnstile ready after {(i+1)*5}s')
                break
            log(f'  Turnstile wait {(i+1)*5}s...')

        # Click Log in
        clicked = driver.execute_script("""
            const btns = [...document.querySelectorAll('button')];
            const b = btns.find(b => /log.?in/i.test(b.textContent.trim()) && b.offsetParent);
            if (b) { b.click(); return b.textContent.trim(); }
            return null;
        """)
        log(f'Login clicked: {clicked}')
        time.sleep(10)
        log(f'Post-login URL: {driver.current_url}')

        if 'login' in driver.current_url or 'account-security' in driver.current_url:
            log('Login failed')
            driver.save_screenshot('/tmp/upwork-login-fail.png')
            sys.exit(2)

    log(f'Logged in: {driver.current_url}')

    # Step 3: Click "Clients" nav button to switch to agency/client context
    # Nav shows button text "Clients Clients" (icon + text)
    log('Clicking Clients nav button to switch to agency context...')

    clicked_clients = driver.execute_script("""
        const all = [...document.querySelectorAll('button')].filter(el => el.offsetParent);
        const found = all.find(el => el.textContent.trim().toLowerCase().startsWith('clients'));
        if (found) { found.click(); return found.textContent.trim(); }
        return null;
    """)
    log(f'Clients button clicked: {clicked_clients}')
    time.sleep(5)
    log(f'After Clients click URL: {driver.current_url}')

    # Step 4: Try direct workroom API call
    log('Navigating to workroom...')
    driver.get(f'https://www.upwork.com/nx/wm/workroom/{WORKROOM_ID}/messages')
    time.sleep(8)
    log(f'Workroom URL: {driver.current_url}')

    result = fetch_messages()
    log(f'API status: {result.get("status")}')
    log(f'API body: {str(result.get("body",""))[:400]}')

    if result.get('status') == 200 and 'Authentication' not in str(result.get('body', '')):
        log('SUCCESS!')
        print(result['body'])
        sys.exit(0)

    # Step 5: If still 401, check what context we're in and try navigating within client context
    log('Still 401. Checking current context...')
    current_page = driver.page_source
    log(f'Page title: {driver.title}')

    # Check current org cookie
    org_info = driver.execute_script("""
        const org = document.cookie.split(';').find(c=>c.trim().startsWith('current_organization_uid='));
        const user = document.cookie.split(';').find(c=>c.trim().startsWith('user_uid='));
        return {org: org||'none', user: user||'none'};
    """)
    log(f'Org cookies: {org_info}')

    # Navigate to main clients page to trigger context switch
    log('Navigating to /nx/find-talent/ to trigger client context...')
    driver.get('https://www.upwork.com/nx/find-talent/')
    time.sleep(5)
    log(f'Find talent URL: {driver.current_url}')

    driver.get(f'https://www.upwork.com/nx/wm/workroom/{WORKROOM_ID}/messages')
    time.sleep(8)
    result = fetch_messages()
    log(f'API status (attempt 2): {result.get("status")}')
    log(f'API body: {str(result.get("body",""))[:400]}')

    if result.get('status') == 200 and 'Authentication' not in str(result.get('body', '')):
        log('SUCCESS (attempt 2)!')
        print(result['body'])
        sys.exit(0)

    # Step 6: Try fetching via the workroom iframe URL directly
    log('Trying widget URL directly...')
    driver.get(f'https://www.upwork.com/ab/messages/rooms/{ROOM_UUID}/widget/?source=workroom')
    time.sleep(8)
    log(f'Widget URL: {driver.current_url}')

    result = fetch_messages()
    log(f'API status (widget context): {result.get("status")}')
    log(f'API body: {str(result.get("body",""))[:400]}')

    if result.get('status') == 200 and 'Authentication' not in str(result.get('body', '')):
        log('SUCCESS (widget context)!')
        print(result['body'])
        sys.exit(0)

    log('All attempts failed.')
    driver.save_screenshot('/tmp/upwork-debug-final.png')
    sys.exit(2)

finally:
    driver.quit()
