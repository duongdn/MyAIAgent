const { openFacebookSession } = require('./lib/facebook-browser-session');
(async () => { const { browser, page } = await openFacebookSession();
  await page.goto(process.argv[2], { waitUntil: 'domcontentloaded' }); await new Promise(r => setTimeout(r, 8000));
  await page.evaluate(() => [...document.querySelectorAll('div[role=button]')].filter(b => /Xem thêm/.test(b.innerText)).forEach(b => b.click()));
  await new Promise(r => setTimeout(r, 2000));
  console.log(await page.evaluate(() => document.querySelector('[role=dialog]')?.innerText || document.querySelector('[role=main]')?.innerText || document.body.innerText));
  await browser.close(); })();
