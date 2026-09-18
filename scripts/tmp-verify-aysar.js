const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  const profileDir = 'tmp/upwork-profile-carrick';
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: profileDir,
    env: { ...process.env, DISPLAY: ':1' },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900'],
  });
  const page = await browser.newPage();

  let apiMemos = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (/workDiary|providerTimeReport|diaryEntry|timeActivity|memo/i.test(url)) {
      try { apiMemos.push({ url, body: await res.json() }); } catch (_) {}
    }
  });

  for (const date of ['2026-09-14','2026-09-17','2026-09-18']) {
    apiMemos = [];
    await page.goto(`https://www.upwork.com/nx/wm/workroom/35642393/timesheet?timesheetDate=${date}`, { waitUntil: 'networkidle2', timeout: 30000 }).catch(()=>{});
    await new Promise(r => setTimeout(r, 8000));
    console.log(`=== ${date} url=${page.url()} ===`);
    await page.screenshot({ path: `tmp/aysar-verify-${date}.png`, fullPage: true });
    fs.writeFileSync(`tmp/aysar-verify-${date}.json`, JSON.stringify(apiMemos, null, 2));
    console.log('api hits:', apiMemos.length);
  }
  await browser.close();
})();
