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
const FB_COOKIES_FILE = path.join(__dirname, '..', 'tmp', 'fb-cookies.json');
const LOGIN_MODE = process.argv.includes('--login');
const PAGE_IDS = process.argv.slice(2).filter(a => !a.startsWith('--'));
const LIMIT_ARG = process.argv.find(a => a.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split('=')[1]) : 15;
const USE_COOKIES_FILE = !LOGIN_MODE && fs.existsSync(FB_COOKIES_FILE);

function cleanSingletons() {
  ['SingletonLock', 'SingletonCookie', 'SingletonSocket'].forEach(f => {
    try { fs.unlinkSync(path.join(FB_PROFILE_DIR, f)); } catch {}
  });
}

async function scrapePage(page, pageId, limit) {
  // Use www.facebook.com directly (mbasic redirects here anyway)
  // ?sk=wall forces the posts timeline tab
  const url = `https://www.facebook.com/${pageId}?sk=wall`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  const currentUrl = page.url();
  if (currentUrl.includes('/login') || currentUrl.includes('/checkpoint')) {
    return { error: 'not_logged_in — run: node scripts/facebook-page-scraper.js --login', articles: [] };
  }

  // Scroll progressively to trigger lazy loading — deep enough to get past any
  // pinned/"Featured" post at the top and reach real chronological feed items.
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => window.scrollBy(0, 600));
    await new Promise(r => setTimeout(r, 1000));
  }
  await new Promise(r => setTimeout(r, 2000));

  // Screenshot for debugging
  if (process.env.FB_DEBUG_SCREENSHOT) {
    await page.screenshot({ path: process.env.FB_DEBUG_SCREENSHOT });
    console.error('[facebook] screenshot saved:', process.env.FB_DEBUG_SCREENSHOT);
  }


  // Wait for posts to appear (try multiple selectors)
  try { await page.waitForSelector('[role="feed"], a[href*="/posts/"]', { timeout: 8000 }); } catch {}

  const articles = await page.evaluate((limit) => {
    // Find all clean post links (NOT comment links or reply links)
    const postLinks = Array.from(document.querySelectorAll('a[href*="/posts/"]'))
      .filter(a => {
        const url = a.href || '';
        // Exclude comment links and Messenger chat links
        if (url.includes('comment_id') || url.includes('reply_comment_id')) return false;
        if (url.includes('/messages/') || url.includes('/chat/')) return false;
        return url.includes('/posts/');
      });

    const seen = new Set();
    const posts = [];

    for (const linkEl of postLinks) {
      if (posts.length >= limit) break;

      let link = linkEl.href;
      try {
        const u = new URL(link);
        ['__cft__', '__tn__', '_rdr', '_nc_x'].forEach(p => u.searchParams.delete(p));
        link = u.toString();
      } catch {}

      if (seen.has(link)) continue;
      seen.add(link);

      // Walk up to find the post container (a div that's big enough to be a post)
      let container = linkEl.parentElement;
      while (container) {
        const rect = container.getBoundingClientRect();
        if (rect.width > 400 && rect.height > 100) break;
        container = container.parentElement;
      }
      if (!container) continue;

      // Keep walking up until we don't gain much more text (finds tightest post div)
      let best = container;
      let parent = container.parentElement;
      while (parent) {
        const pText = (parent.innerText || '').length;
        const cText = (best.innerText || '').length;
        // Stop if parent is >3x larger (it contains multiple posts)
        if (pText > cText * 3) break;
        const pRect = parent.getBoundingClientRect();
        if (pRect.width > window.innerWidth * 0.8) break; // full-width = layout container
        best = parent;
        parent = parent.parentElement;
      }

      // Extract clean text from container — strip UI noise
      const cloned = best.cloneNode(true);
      cloned.querySelectorAll('[aria-hidden="true"], [role="button"], nav').forEach(n => n.remove());
      const UI_NOISE = new Set([
        'Facebook','Xem thêm','Thích','Bình luận','Chia sẻ','Trả lời',
        'Posts','Bài viết','Filters','Bộ lọc','Shared with Public',
        'Shared with Friends','Công khai','Bạn bè','Like','Comment','Share','Reply',
        '...','· ·','·','Tác giả',
      ]);
      let rawText = (cloned.innerText || '').replace(/\s+/g, ' ').trim();
      // Find the LAST "<author><time> Shared with Public"-style header in the text and
      // keep only what follows it — the container walk-up can accidentally merge sidebar
      // content (profile Intro panel, etc.) ABOVE the real post header, so anchoring on
      // the first header (old `^...` approach) picked up sidebar junk instead of the post.
      const headerRe = /[^\n·•]{1,40}?\d+[hmd]\s+(Shared with Public|Shared with Friends|Công khai|Bạn bè|Friends)/g;
      let headerMatch, lastHeaderMatch = null;
      while ((headerMatch = headerRe.exec(rawText)) !== null) { lastHeaderMatch = headerMatch; }
      if (lastHeaderMatch) {
        rawText = rawText.substring(lastHeaderMatch.index + lastHeaderMatch[0].length).trim();
      } else {
        // Fallback: no header pattern matched (e.g. relative-date posts) — strip leading noise only
        rawText = rawText.replace(/^(Posts|Bài viết)?\s*(Filters|Bộ lọc)?\s*/, '');
        rawText = rawText.replace(/^[^\n·•]{3,40}?\s+(Hôm qua|Yesterday|Tháng|ngày)\s[^•]{0,30}(Shared with Public|Công khai|Bạn bè)\s*/, '');
      }
      // Strip reaction noise at end: "178 38 123" or "All reactions:" or "View X comments"
      rawText = rawText.replace(/\s*(All reactions:[^.]*|View \d+ comments?|Xem \d+ bình luận)[^.]*$/, '').trim();
      rawText = rawText.replace(/\s*(\d+\s+){2,}\d*\s*$/, '').trim();
      rawText = rawText.replace(/…\s*$/, '').trim();
      const UI_NOISE_INLINE = ['Xem thêm', 'See more'];
      UI_NOISE_INLINE.forEach(s => { rawText = rawText.replace(new RegExp(s + '$'), '').trim(); });
      const text = rawText;

      if (text.length < 20) continue;
      // Skip pinned/"Featured" posts (groups pin these to the top regardless of age) —
      // they are frequently stale (months/years old) and get mistaken for new content.
      if (/^(Featured|Đã ghim|Pinned)/.test(text)) continue;

      posts.push({
        title: text.substring(0, 150),
        content: text.substring(0, 600),
        link,
        pubDate: '',
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

    // If cookies file exists, inject cookies instead of relying on Chrome profile
    if (USE_COOKIES_FILE) {
      const cookies = JSON.parse(fs.readFileSync(FB_COOKIES_FILE, 'utf-8'));
      await page.setCookie(...cookies);
      console.error(`[facebook] Loaded ${cookies.length} cookies from ${FB_COOKIES_FILE}`);
    }

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
