#!/usr/bin/env python3
"""Fetch Neural Contract Upwork messages using undetected-chromedriver to bypass Cloudflare."""

import json, os, time, sys

import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'config', '.upwork-config.json')
PROFILE_DIR = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'upwork-profile-carrick-uc')
WORKROOM_ID = '38901192'
ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec'

with open(CONFIG_PATH) as f:
    config = json.load(f)
account = next(a for a in config['accounts'] if a['name'] == 'carrick')

os.makedirs(PROFILE_DIR, exist_ok=True)

options = uc.ChromeOptions()
options.add_argument(f'--user-data-dir={PROFILE_DIR}')
options.add_argument('--window-size=1280,900')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

captured = []

def log(msg):
    print(msg, file=sys.stderr)

log('Launching undetected Chrome...')
driver = uc.Chrome(options=options, headless=True, use_subprocess=True, version_main=140)

try:
    # Navigate to Upwork home to warm up
    log('Navigating to upwork.com...')
    driver.get('https://www.upwork.com/')
    time.sleep(8)

    log(f'Home URL: {driver.current_url}')
    driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-home.png'))

    # Check if logged in
    page_src = driver.page_source
    is_logged_in = 'logout' in page_src.lower() or 'my-jobs' in page_src.lower()
    log(f'Logged in: {is_logged_in}')

    # Enable CDP network capture to intercept login requests
    driver.execute_cdp_cmd('Network.enable', {})
    login_requests = []

    def capture_request(params):
        url = params.get('request', {}).get('url', '')
        if 'api' in url.lower() and ('login' in url.lower() or 'auth' in url.lower() or 'signin' in url.lower()):
            login_requests.append({'url': url, 'method': params.get('request', {}).get('method'), 'headers': params.get('request', {}).get('headers', {}), 'post': params.get('request', {}).get('postData', '')})

    # Note: CDP event listeners through selenium aren't straightforward, log via JS
    if not is_logged_in:
        log('Navigating to login...')
        driver.get('https://www.upwork.com/ab/account-security/login')
        time.sleep(10)
        driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-login.png'))
        log(f'Login URL: {driver.current_url}')

        # Fill username — try multiple selectors
        try:
            username_field = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR,
                    '#login_username, input[placeholder*="Username"], input[placeholder*="Email"], input[type="text"], input[type="email"]'))
            )
            username_field.click()
            username_field.clear()
            username_field.send_keys(account['username'])
            time.sleep(0.8)
            log('Username filled')

            # Dismiss cookie popup if present
            try:
                driver.execute_script("""
                    document.querySelectorAll('[data-testid="cookie-banner"], .cookie-consent, .ot-sdk-container').forEach(e => e.remove());
                """)
            except Exception:
                pass

            # Click Continue via JS (bypasses overlay issues)
            try:
                clicked = driver.execute_script("""
                    const btns = [...document.querySelectorAll('button')];
                    const cont = btns.find(b => b.textContent.trim() === 'Continue' && b.offsetParent !== null);
                    if (cont) { cont.click(); return true; }
                    return false;
                """)
                log(f'JS Continue click: {clicked}')
                time.sleep(4)
            except Exception as e:
                log(f'Continue btn error: {e}')
        except Exception as e:
            log(f'Username step error: {e}')
            driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-no-username.png'))

        driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-after-username.png'))

        # Fill password
        try:
            pw_field = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'input[type="password"]'))
            )
            pw_field.click()
            pw_field.clear()
            pw_field.send_keys(account['password'])
            time.sleep(0.8)

            # Wait for Turnstile to auto-verify (managed mode runs silently 5-30s)
            log('Waiting 20s for Turnstile to complete...')
            time.sleep(20)

            # Check Turnstile token state
            ts_info = driver.execute_script("""
                const tsInput = document.querySelector('[name="cf-turnstile-response"], [name="g-recaptcha-response"], input[name*="turnstile"]');
                const widgets = [...document.querySelectorAll('iframe[src*="cloudflare"], iframe[src*="turnstile"]')];
                return {
                    token: tsInput?.value?.substring(0, 40) || 'not found',
                    iframes: widgets.map(f => f.src.substring(0, 80))
                };
            """)
            log(f'Turnstile state: {ts_info}')

            # "Log in" button (case-insensitive match)
            clicked2 = driver.execute_script("""
                const btns = [...document.querySelectorAll('button')];
                const b = btns.find(b => b.textContent.trim().toLowerCase().startsWith('log') && b.offsetParent !== null);
                if (b) { b.click(); return b.textContent.trim(); }
                return false;
            """)
            log(f'JS login click: {clicked2}')
            time.sleep(6)
        except Exception as e:
            log(f'Password step error: {e}')

        driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-after-password.png'))

        driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-after-password.png'))

        # Secret answer
        try:
            sa_field = driver.find_element(By.ID, 'login_answer')
            sa_field.send_keys(account['secret_answer'])
            driver.find_element(By.CSS_SELECTOR, '#login_control_continue, button[type="submit"]').click()
            log('Secret answer submitted')
            time.sleep(4)
        except Exception:
            pass

        driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-after-login.png'))
        log(f'After login URL: {driver.current_url}')

    # Check if we actually got logged in after the login attempt
    current_url = driver.current_url
    log(f'URL after all login steps: {current_url}')

    # Wait a bit more in case redirecting
    if 'account-security' in current_url or 'login' in current_url:
        time.sleep(4)
        current_url = driver.current_url
        log(f'URL after extra wait: {current_url}')

    # Inject network intercept via CDP to capture API response
    driver.execute_cdp_cmd('Network.enable', {})

    messages_url = f'https://www.upwork.com/nx/wm/workroom/{WORKROOM_ID}/messages'
    log(f'Navigating to {messages_url}...')
    driver.get(messages_url)
    time.sleep(8)

    driver.save_screenshot(os.path.join(os.path.dirname(__file__), '..', 'tmp', 'uc-workroom.png'))
    log(f'Workroom URL: {driver.current_url}')

    # Try to fetch the API directly using JavaScript (with browser cookies)
    api_url = f'https://www.upwork.com/api/v3/rooms/rooms/{ROOM_UUID}/stories/simplified?limit=20'
    log(f'Fetching API: {api_url}')

    result = driver.execute_script(f"""
        return await fetch('{api_url}', {{
            credentials: 'include',
            headers: {{
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }}
        }}).then(r => r.text()).catch(e => 'ERROR: ' + e.toString());
    """)
    log(f'API result (first 200): {str(result)[:200]}')

    if result and not result.startswith('ERROR') and '{' in result:
        print(result)
    else:
        # Try getting XSRF token and retry
        xsrf = driver.execute_script("return document.cookie.split(';').find(c => c.trim().startsWith('XSRF-TOKEN='))?.split('=')[1] || ''")
        log(f'XSRF: {xsrf[:20] if xsrf else "none"}')

        result2 = driver.execute_script(f"""
            const xsrf = document.cookie.split(';').find(c => c.trim().startsWith('XSRF-TOKEN='))?.split('=')[1] || '';
            return await fetch('{api_url}', {{
                credentials: 'include',
                headers: {{
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(xsrf)
                }}
            }}).then(r => r.text()).catch(e => 'ERROR: ' + e);
        """)
        log(f'API result2 (first 200): {str(result2)[:200]}')
        if result2 and not result2.startswith('ERROR') and '{' in result2:
            print(result2)
        else:
            log('Could not capture messages')
            sys.exit(2)

finally:
    driver.quit()
