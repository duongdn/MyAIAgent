const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const sleep = ms => new Promise(r => setTimeout(r, ms));

const WORKSPACE_HOST = 'solid-code-team.slack.com';
const PROFILE_DIR = '/home/nus/projects/My-AI-Agent/tmp/slack-profiles/solid-code-team-headed';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    args: ['--no-sandbox','--disable-setuid-sandbox','--window-size=1280,900'],
    defaultViewport: null,
  });
  const page = (await browser.pages())[0] || await browser.newPage();
  await page.goto(`https://${WORKSPACE_HOST}/`, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e=>console.log('nav',e.message));
  await sleep(2000);

  // type email
  const emailInput = await page.$('input[type="email"], input[placeholder*="work-email"], input[name="email"]');
  if (emailInput) {
    await emailInput.click();
    await emailInput.type('davidztv19@gmail.com', {delay: 30});
    console.log('typed email');
  } else {
    console.log('no email input found');
  }
  await sleep(500);

  // click "Sign In With Email"
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const txt = await page.evaluate(el=>el.innerText, b);
    if (txt && txt.trim().toLowerCase().includes('sign in with email')) {
      await b.click();
      console.log('clicked Sign In With Email');
      break;
    }
  }
  await sleep(4000);
  console.log('URL after submit:', page.url());
  await page.screenshot({path:'/tmp/email-signin-step1.png', fullPage:true}).catch(()=>{});
  await browser.disconnect(); // leave browser open for next step
  console.log('BROWSER_WS:', browser.wsEndpoint());
})();
