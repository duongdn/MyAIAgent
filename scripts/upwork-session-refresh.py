#!/usr/bin/env python3
"""Refresh Upwork session by navigating with UC browser and intercepting token refresh."""

import json, os, time, sys, re

import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'config', '.upwork-config.json')
PROFILE_DIR = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-carrick-uc2')
WORKROOM_ID = '38901192'
ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec'

with open(CONFIG_PATH) as f:
    config = json.load(f)
account = next(a for a in config['accounts'] if a['name'] == 'carrick')

os.makedirs(PROFILE_DIR, exist_ok=True)

def log(msg): print(msg, file=sys.stderr)

options = uc.ChromeOptions()
options.add_argument(f'--user-data-dir={PROFILE_DIR}')
options.add_argument('--window-size=1280,900')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

log('Launching UC Chrome...')
driver = uc.Chrome(options=options, headless=False, use_subprocess=True, version_main=140)

try:
    # First navigate to upwork.com to warm up
    driver.get('https://www.upwork.com/')
    time.sleep(6)
    log(f'Home: {driver.current_url}')

    # Navigate to login
    driver.get('https://www.upwork.com/ab/account-security/login')
    time.sleep(8)

    # Fill username via JS
    filled = driver.execute_script(f"""
        const inp = document.querySelector('input[type="text"], input[type="email"], input:not([type="hidden"])');
        if (inp && inp.offsetParent) {{
            inp.focus();
            inp.value = '{account["username"]}';
            inp.dispatchEvent(new Event('input', {{bubbles: true}}));
            inp.dispatchEvent(new Event('change', {{bubbles: true}}));
            return true;
        }}
        return false;
    """)
    log(f'Username filled via event: {filled}')
    time.sleep(1)

    # Click Continue
    driver.execute_script("""
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.trim() === 'Continue' && b.offsetParent);
        if (b) b.click();
    """)
    time.sleep(5)

    # Fill password via React synthetic events
    pw_filled = driver.execute_script(f"""
        const pw = document.querySelector('input[type="password"]');
        if (!pw) return false;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(pw, '{account["password"]}');
        pw.dispatchEvent(new Event('input', {{bubbles: true}}));
        pw.dispatchEvent(new Event('change', {{bubbles: true}}));
        return true;
    """)
    log(f'Password filled via React setter: {pw_filled}')
    time.sleep(25)  # Long wait for Turnstile to pass

    # Check Turnstile state
    ts = driver.execute_script("""
        const allInputs = [...document.querySelectorAll('input[type="hidden"]')];
        return allInputs.map(i => ({name: i.name, val: i.value.substring(0,30)}));
    """)
    log(f'Hidden inputs: {ts[:5]}')

    # Click Log in
    clicked = driver.execute_script("""
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find(b => b.textContent.trim().toLowerCase().startsWith('log') && b.offsetParent);
        if (b) { b.click(); return true; }
        return false;
    """)
    log(f'Log in clicked: {clicked}')
    time.sleep(8)

    driver.save_screenshot('/tmp/upwork-after-login2.png')
    log(f'After login URL: {driver.current_url}')

    # If still on login page, try direct API fetch
    if 'login' in driver.current_url or 'account-security' in driver.current_url:
        log('Login failed, trying direct messages fetch anyway...')

    # Navigate to workroom regardless
    driver.get(f'https://www.upwork.com/nx/wm/workroom/{WORKROOM_ID}/messages')
    time.sleep(8)
    driver.save_screenshot('/tmp/upwork-workroom2.png')
    log(f'Workroom URL: {driver.current_url}')

    # Fetch API via browser JS
    api_url = f'https://www.upwork.com/api/v3/rooms/rooms/{ROOM_UUID}/stories/simplified?limit=20'
    result = driver.execute_script(f"""
        return await fetch('{api_url}', {{
            credentials: 'include',
            headers: {{
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }}
        }}).then(r => r.text()).catch(e => 'ERR:' + e);
    """)
    log(f'API result: {str(result)[:300]}')
    if result and '{' in str(result) and 'Authentication' not in str(result):
        print(result)
    else:
        log('Could not get messages')
        sys.exit(2)

finally:
    driver.quit()
