/**
 * facebook-page-scraper.js — Scrapes public Facebook pages/groups via mbasic.
 *
 * First-time setup (one-time manual login):
 *   node scripts/facebook-page-scraper.js --login
 *   → Opens Chrome visibly → log in → press Enter → session saved
 *
 * Subsequent headless runs (via xvfb, called by fetch-news.py):
 *   node scripts/facebook-page-scraper.js shinantori mrgoonie --limit=20
 *
 * For Facebook groups, prefix ID with "groups/":
 *   node scripts/facebook-page-scraper.js groups/123456789 --limit=20
 *
 * Output (stdout): JSON { "<pageId>": { articles: [{title, content, link, pubDate}] }, ... }
 * Errors/progress printed to stderr.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const FB_PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'facebook-profile');
const LOGIN_MODE = process.argv.includes('--login');
const PAGE_IDS = process.argv.slice(2).filter(a => !a.startsWith('--'));
const LIMIT_ARG = process.argv.find(a => a.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split('=')[1]) : 15;

function cleanSingletons() {
  ['SingletonLock', 'SingletonCookie', 'SingletonSocket'].forEach(f => {
    try { fs.unlinkSync(path.join(FB_PROFILE_DIR, f)); } catch {}
  });
}

async function scrapePage(page, pageId, limit) {
  const url = `https://mbasic.facebook.com/${pageId}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  const currentUrl = page.url();
  if (currentUrl.includes('/login') || currentUrl.includes('/checkpoint')) {
    return { error: 'not_logged_in — run: node scripts/facebook-page-scraper.js --login', articles: [] };
  }

  const articles = await page.evaluate((limit) => {
    const posts = [];
    const seen = new WeakSet();

    // mbasic renders posts as divs with .story_body_container or [data-ft]
    const candidates = [
      ...document.querySelectorAll('.story_body_container'),
      ...document.querySelectorAll('[data-ft]'),
    ].filter(el => {
      if (seen.has(el)) return false;
      seen.add(el);
      return true;
    });

    for (const el of candidates) {
      if (posts.length >= limit) break;

      // Collect paragraph text
      const paras = el.querySelectorAll('p, div > span');
      const text = Array.from(paras)
        .map(p => p.textContent.trim())
        .filter(t => t.length > 10)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!text || text.length < 20) continue;

      // Permalink — prefer story/permalink links
      const linkEl = el.querySelector(
        'a[href*="/story.php"], a[href*="/permalink/"], a[href*="story_fbid"], a[href*="/posts/"]'
      );
      let link = linkEl ? linkEl.href : '';
      link = link.replace('mbasic.facebook.com', 'www.facebook.com');
      // Strip mobile tracking params
      try { const u = new URL(link); u.searchParams.delete('_rdr'); link = u.toString(); } catch {}

      // Timestamp
      const timeEl = el.querySelector('abbr');
      const pubDate = timeEl
        ? (timeEl.getAttribute('data-store')
            ? (() => { try { return JSON.parse(timeEl.getAttribute('data-store')).time; } catch { return timeEl.textContent.trim(); } })()
            : timeEl.textContent.trim())
        : '';

      posts.push({
        title: text.substring(0, 150),
        content: text.substring(0, 600),
        link,
        pubDate: pubDate ? String(pubDate) : '',
      });
    }

    return posts;
  }, limit);

  return { articles };
}

async function run() {
  if (!LOGIN_MODE && PAGE_IDS.length === 0) {
    console.error('Usage:');
    console.error('  node scripts/facebook-page-scraper.js --login');
    console.error('  node scripts/facebook-page-scraper.js <pageId> [<pageId>...] [--limit=N]');
    process.exit(1);
  }

  fs.mkdirSync(FB_PROFILE_DIR, { recursive: true });
  cleanSingletons();

  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome',
    headless: false, // xvfb provides the virtual display; Chrome must stay headless:false
    args: [
      `--user-data-dir=${FB_PROFILE_DIR}`,
      '--window-size=1280,900',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
    env: {
      ...process.env,
      // For cron/headless runs, use xvfb display; login mode uses real display
      ...(LOGIN_MODE ? {} : { DISPLAY: process.env.DISPLAY || ':99' }),
    },
    ignoreDefaultArgs: ['--enable-automation'],
    defaultViewport: { width: 1280, height: 900 },
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
    );
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    if (LOGIN_MODE) {
      await page.goto('https://www.facebook.com/', { waitUntil: 'networkidle2' });
      console.error('');
      console.error('👉  Log in to Facebook in the Chrome window that just opened.');
      console.error('    After login is complete and your feed is visible, press Enter here.');
      console.error('');
      await new Promise(resolve => process.stdin.once('data', resolve));
      await browser.close();
      console.error('✅  Session saved to:', FB_PROFILE_DIR);
      console.error('    Next run (headless): node scripts/facebook-page-scraper.js shinantori mrgoonie');
      return;
    }

    const results = {};
    for (const pageId of PAGE_IDS) {
      console.error(`[facebook] scraping: ${pageId}`);
      try {
        results[pageId] = await scrapePage(page, pageId, LIMIT);
        console.error(`[facebook] ${pageId}: ${results[pageId].articles?.length ?? 0} posts`);
      } catch (err) {
        console.error(`[facebook] ${pageId} error: ${err.message}`);
        results[pageId] = { error: err.message, articles: [] };
      }
    }

    console.log(JSON.stringify(results));

  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
