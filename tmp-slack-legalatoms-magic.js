const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Imap = require('imap');
const { simpleParser } = require('mailparser');
puppeteer.use(StealthPlugin());

async function waitForMagicCode() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: 'nick@nustechnology.com',
      password: 'iHWa82WJ3q5Q',
      host: 'imap.zoho.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });
    
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, box) => {
        if (err) return reject(err);
        
        // Search for recent Slack emails
        const since = new Date(Date.now() - 5 * 60 * 1000); // last 5 min
        imap.search(['UNSEEN', ['FROM', 'slack'], ['SINCE', since]], (err, results) => {
          if (err || !results.length) {
            console.log('No magic code email yet, results:', results ? results.length : 'err');
            imap.end();
            resolve(null);
            return;
          }
          
          const fetch = imap.fetch(results, { bodies: '' });
          fetch.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) return;
                const text = parsed.text || '';
                const html = parsed.html || '';
                const content = text + html;
                // Look for 6-digit code
                const codeMatch = content.match(/\b(\d{6})\b/);
                if (codeMatch) {
                  console.log('Found magic code:', codeMatch[1]);
                  resolve(codeMatch[1]);
                }
              });
            });
          });
          fetch.once('end', () => {
            imap.end();
            setTimeout(() => resolve(null), 2000);
          });
        });
      });
    });
    
    imap.once('error', reject);
    imap.connect();
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Track token from API responses
  let foundToken = null;
  let foundCookie = null;
  
  page.on('response', async (response) => {
    const url = response.url();
    if (!url.includes('.js') && !url.includes('.css') && !url.includes('analytics') && !url.includes('pixel')) {
      try {
        const text = await response.text();
        const tokenMatch = text.match(/"token":"(xox[pcd]-[^"]{20,})"/);
        if (tokenMatch && !foundToken) {
          foundToken = tokenMatch[1];
          console.log('Found token in response:', foundToken.substring(0, 40) + '...');
        }
      } catch(e) {}
    }
  });
  
  // Step 1: Go to login page and request magic link
  await page.goto('https://legalatoms.slack.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 20000
  });
  await new Promise(r => setTimeout(r, 2000));
  
  // Enter email to get magic code
  const emailInput = await page.$('input[type="email"]');
  if (emailInput) {
    await emailInput.type('nick@nustechnology.com');
    console.log('Typed email');
    
    // Click Sign In With Email button
    const buttons = await page.$$('button, [type="submit"]');
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent.trim());
      if (text.toLowerCase().includes('sign in') || text.toLowerCase().includes('email')) {
        await btn.click();
        console.log('Clicked:', text);
        break;
      }
    }
    
    await new Promise(r => setTimeout(r, 3000));
    
    const url = page.url();
    const body = await page.evaluate(() => document.body.innerText.substring(0, 400));
    console.log('URL after email submit:', url);
    console.log('Body:', body);
  }
  
  await browser.close();
})();
