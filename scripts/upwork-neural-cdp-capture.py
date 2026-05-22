#!/usr/bin/env python3
"""
Login -> navigate to widget URL -> capture messages via CDP network interception.
The widget iframe makes authenticated XHR calls; we capture the response body.
"""

import json, os, time, sys, threading
import undetected_chromedriver as uc

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'config', '.upwork-config.json')
PROFILE_DIR = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-cdp')
WORKROOM_ID = '38901192'
ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec'

with open(CONFIG_PATH) as f:
    config = json.load(f)
account = next(a for a in config['accounts'] if a['name'] == 'carrick')

os.makedirs(PROFILE_DIR, exist_ok=True)

def log(msg): print(msg, file=sys.stderr, flush=True)

for lock in ['SingletonLock', 'SingletonCookie', 'SingletonSocket']:
    lf = os.path.join(PROFILE_DIR, lock)
    if os.path.exists(lf):
        os.unlink(lf)

options = uc.ChromeOptions()
options.add_argument(f'--user-data-dir={PROFILE_DIR}')
options.add_argument('--window-size=1280,900')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.set_capability('goog:loggingPrefs', {'performance': 'ALL'})

log('Launching UC Chrome (headless=False)...')
driver = uc.Chrome(options=options, headless=False, use_subprocess=True, version_main=140)

captured = {'result': None}

try:
    # Enable CDP Network monitoring
    driver.execute_cdp_cmd('Network.enable', {
        'maxTotalBufferSize': 50000000,
        'maxResourceBufferSize': 10000000,
        'maxPostDataSize': 5000000,
    })
    log('CDP Network enabled')

    # Step 1: Warm up
    log('Warming up...')
    driver.get('https://www.upwork.com/')
    time.sleep(5)

    # Step 2: Login
    driver.get('https://www.upwork.com/ab/account-security/login')
    time.sleep(8)
    log(f'Login URL: {driver.current_url}')

    if 'login' in driver.current_url or 'account-security' in driver.current_url:
        # Fill username
        driver.execute_script(f"""
            const inp = document.querySelector('input[type="text"], input[type="email"]');
            if (inp) {{
                const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                setter.call(inp, '{account["username"]}');
                inp.dispatchEvent(new Event('input', {{bubbles:true}}));
                inp.dispatchEvent(new Event('change', {{bubbles:true}}));
            }}
        """)
        time.sleep(1)

        driver.execute_script("""
            const b = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Continue' && b.offsetParent);
            if (b) b.click();
        """)
        time.sleep(5)

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
        log('Waiting for Turnstile (up to 60s)...')
        for i in range(12):
            time.sleep(5)
            ts = driver.execute_script("""
                const el = document.querySelector('[name="cf-turnstile-response"]');
                return el ? el.value : '';
            """)
            if ts:
                log(f'Turnstile ready at {(i+1)*5}s')
                break
            log(f'  Turnstile wait {(i+1)*5}s...')

        driver.execute_script("""
            const b = [...document.querySelectorAll('button')].find(b => /log.?in/i.test(b.textContent.trim()) && b.offsetParent);
            if (b) b.click();
        """)
        time.sleep(10)
        log(f'Post-login URL: {driver.current_url}')

        if 'login' in driver.current_url or 'account-security' in driver.current_url:
            log('Login failed')
            driver.save_screenshot('/tmp/upwork-cdp-login-fail.png')
            sys.exit(2)

    log(f'Logged in: {driver.current_url}')

    # Step 3: Navigate directly to the widget URL (the iframe src)
    # This page makes authenticated XHR calls to the messages API
    widget_url = f'https://www.upwork.com/ab/messages/rooms/{ROOM_UUID}/widget/?source=workroom'
    log(f'Navigating to widget URL: {widget_url}')
    driver.get(widget_url)
    time.sleep(10)
    log(f'Widget URL after load: {driver.current_url}')

    # Step 4: Capture network requests using CDP
    # Poll for responses to the stories API
    log('Polling CDP for stories API response...')
    deadline = time.time() + 30

    while time.time() < deadline and captured['result'] is None:
        # Get all log entries
        try:
            logs = driver.get_log('performance')
            for entry in logs:
                msg = json.loads(entry.get('message', '{}'))
                method = msg.get('message', {}).get('method', '')
                params = msg.get('message', {}).get('params', {})

                if method == 'Network.responseReceived':
                    url = params.get('response', {}).get('url', '')
                    if 'stories' in url and ROOM_UUID in url:
                        req_id = params.get('requestId')
                        log(f'Found stories response! URL: {url}, requestId: {req_id}')
                        try:
                            body = driver.execute_cdp_cmd('Network.getResponseBody', {'requestId': req_id})
                            if body.get('body'):
                                captured['result'] = body['body']
                                log(f'Body captured: {body["body"][:200]}')
                        except Exception as e:
                            log(f'Error getting body: {e}')
        except Exception as e:
            log(f'Log poll error: {e}')

        if captured['result']:
            break

        time.sleep(2)

    if captured['result']:
        print(captured['result'])
        sys.exit(0)

    # Step 5: Also try direct fetch from widget context
    log('Trying direct fetch from widget context...')
    result = driver.execute_script(f"""
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
    log(f'Widget fetch status: {result.get("status")}')
    log(f'Widget fetch body: {str(result.get("body",""))[:400]}')

    if result.get('status') == 200 and 'Authentication' not in str(result.get('body', '')):
        print(result['body'])
        sys.exit(0)

    # Step 6: Try navigating to workroom + enable performance logging to capture
    log('Navigating to workroom with CDP capture...')
    driver.get(f'https://www.upwork.com/nx/wm/workroom/{WORKROOM_ID}/messages')

    deadline2 = time.time() + 30
    while time.time() < deadline2 and captured['result'] is None:
        try:
            logs = driver.get_log('performance')
            for entry in logs:
                msg = json.loads(entry.get('message', '{}'))
                method = msg.get('message', {}).get('method', '')
                params = msg.get('message', {}).get('params', {})

                if method == 'Network.responseReceived':
                    url = params.get('response', {}).get('url', '')
                    if ('stories' in url or 'rooms' in url) and ROOM_UUID in url:
                        req_id = params.get('requestId')
                        log(f'Found room response: {url}')
                        try:
                            body = driver.execute_cdp_cmd('Network.getResponseBody', {'requestId': req_id})
                            if body.get('body') and 'Authentication' not in body['body']:
                                captured['result'] = body['body']
                        except Exception as e:
                            log(f'Body error: {e}')
        except Exception as e:
            pass

        if captured['result']:
            break
        time.sleep(2)

    if captured['result']:
        print(captured['result'])
        sys.exit(0)

    log('All attempts failed')
    driver.save_screenshot('/tmp/upwork-cdp-debug.png')

    # Show page source snippet
    src = driver.page_source
    log(f'Page source len: {len(src)}')
    if ROOM_UUID in src:
        idx = src.find(ROOM_UUID)
        log(f'UUID context: ...{src[max(0,idx-200):idx+300]}...')

    sys.exit(2)

finally:
    driver.quit()
