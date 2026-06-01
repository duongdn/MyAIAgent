const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const WORKROOM_ID = '38901192';
const ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec';
const WORKROOM_URL = `https://www.upwork.com/nx/wm/workroom/${WORKROOM_ID}/messages`;
const API_URL = `https://www.upwork.com/api/v3/rooms/rooms/${ROOM_UUID}/stories/simplified`;
const PROFILE_DIR = path.join(process.cwd(), 'tmp', 'upwork-profile-xvfb');
const EMAIL = 'carrick@nustechnology.com';
const PASSWORD = 'sCRQ@miWW15gI!8M';
const CF_CLEARANCE = 'h7Y6ajHUNeOkWrBQ2ROKkrF71Kl9nlxruNPUg7V3HSeg-1779769646-1.2.1.1-Wz6D7OTrmJ0FyuLbdfvpGDBIbX1ibjYy9UvSy8j9KocLcgR31eDLfgqQnnksjpkbH5.62YWchqWphHnPb.ZJ4ppF84xlMMFPT0kdNgxsg_YJghBNotYjkGIoG3n1xffZpOVVrAzYgkvPbLezws_YQ8yPQxCjXGtVKwegvB1RvFDsN1ktffF8TH7R4UGc_AwC6q6mYKkOiiQLATJ7LdKIG97I6b44JhaIE9CxZWSL0rEvxgWCik1GY4DxP6ovbtMUIS27nf1GrfFszARhQ.bzfZd81ds0RpLPkGnw1DG1FjcOsBmU2rWRfJQ8tVDRiid0sxJfcV3jCjsh_K_qqbrD4g';

const wait = ms => new Promise(r => setTimeout(r, ms));
let messages = null;

(async () => {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  ['SingletonLock','SingletonCookie','SingletonSocket'].forEach(f => {
    try { fs.unlinkSync(path.join(PROFILE_DIR, f)); } catch {}
  });

  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome',
    headless: false,
    args: [
      `--user-data-dir=${PROFILE_DIR}`,
      '--window-size=1280,900',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
    env: { ...process.env, DISPLAY: ':99' },
    ignoreDefaultArgs: ['--enable-automation'],
    defaultViewport: { width: 1280, height: 900 },
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36');
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  page.on('response', async resp => {
    const url = resp.url();
    if (url.includes('/stories/simplified') && url.includes(ROOM_UUID)) {
      try {
        messages = await resp.json();
        // Write full response to file for parsing
        require('fs').writeFileSync('/tmp/upwork-neural-full.json', JSON.stringify(messages, null, 2));
        console.log('API captured! stories count:', (messages.stories || []).length);
        // Print all messages
        for (const s of (messages.stories || [])) {
          if (!s.message || s.deleted) continue;
          const dt = new Date(s.created).toISOString().replace('T',' ').substring(0,16);
          const sender = s.userId === '676959530284130304' ? 'Carrick' : `Michael(${s.userId})`;
          console.log(`\n[${dt} UTC] ${sender}:\n${s.message}`);
        }
      } catch(e) { console.log('Parse err:', e.message); }
    }
  });

  await page.setCookie({ name: 'cf_clearance', value: CF_CLEARANCE, domain: '.upwork.com', path: '/', secure: true });

  console.log('Loading login page...');
  await page.goto('https://www.upwork.com/ab/account-security/login', { waitUntil: 'networkidle2', timeout: 35000 });
  await wait(2000);
  await page.screenshot({ path: '/tmp/upwork-s1-login.png' });

  // Type email
  console.log('Entering email...');
  await page.waitForSelector('#login_username', { visible: true, timeout: 10000 });
  await page.click('#login_username');
  await page.type('#login_username', EMAIL, { delay: 70 });
  await wait(500);

  // Click Continue
  await page.evaluate(() => {
    document.querySelector('button[type="submit"]')?.click();
  });
  await wait(4000);
  await page.screenshot({ path: '/tmp/upwork-s2-after-email.png' });
  console.log('URL after email:', page.url().substring(0, 120));

  // Wait for password field
  console.log('Waiting for password field...');
  try {
    await page.waitForSelector('#login_password', { visible: true, timeout: 10000 });
  } catch(e) {
    console.log('Password field timeout - checking state');
    const content = await page.content();
    console.log('Page has pw field:', content.includes('type="password"'));
    console.log('Page has error:', content.includes('technical difficulties') || content.includes('error'));
    await page.screenshot({ path: '/tmp/upwork-s2b-debug.png' });
  }

  // Type password using JS setter (more natural for React forms)
  const pwVisible = await page.$('#login_password');
  if (pwVisible) {
    console.log('Entering password...');
    await page.evaluate(pwd => {
      const el = document.querySelector('#login_password');
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(el, pwd);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, PASSWORD);
    await wait(600);
    await page.screenshot({ path: '/tmp/upwork-s3-pwd-filled.png' });

    // Click the Login button
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]') ||
                  document.querySelector('button.air3-btn-primary');
      if (btn) btn.click();
    });
    console.log('Login button clicked');
    await wait(8000);
  } else {
    console.log('No password field found - may already be logged in or error');
  }

  await page.screenshot({ path: '/tmp/upwork-s4-after-login.png' });
  console.log('After login URL:', page.url().substring(0, 120));

  // Check for security verification
  const postContent = await page.content();
  if (postContent.includes('secret_answer') || postContent.includes('Security Question')) {
    console.log('Security question - answering...');
    await page.evaluate(() => {
      const el = document.querySelector('input[name="secret_answer"]');
      if (el) {
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(el, 'Manchester United');
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await wait(500);
    await page.evaluate(() => document.querySelector('button[type="submit"]')?.click());
    await wait(6000);
    await page.screenshot({ path: '/tmp/upwork-s5-security.png' });
  }

  // Go to workroom
  console.log('Navigating to Neural Contract workroom...');
  try {
    await page.goto(WORKROOM_URL, { waitUntil: 'networkidle2', timeout: 50000 });
  } catch(e) {
    console.log('Goto warning:', e.message.substring(0, 60));
  }
  await wait(7000);
  await page.screenshot({ path: '/tmp/upwork-s6-workroom.png' });
  console.log('Workroom URL:', page.url().substring(0, 120));

  // Print fresh cookies
  const cookies = await page.cookies('https://www.upwork.com');
  const key = ['master_access_token','oauth2_global_js_token','user_uid','XSRF-TOKEN'];
  const fresh = cookies.filter(c => key.includes(c.name));
  if (fresh.length) {
    console.log('\n=== Fresh session cookies ===');
    fresh.forEach(c => console.log(`${c.name}: ${c.value.substring(0, 80)}`));
  }

  // In-page API fetch fallback
  if (!messages) {
    messages = await page.evaluate(async url => {
      try {
        const r = await fetch(`${url}?limit=15&paging=0%3B15`, {
          credentials: 'include',
          headers: { Accept: 'application/json' }
        });
        return r.json();
      } catch(e) { return { error: e.message }; }
    }, API_URL);
    console.log('In-page fetch:', JSON.stringify(messages).substring(0, 500));
  }

  await browser.close();
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
