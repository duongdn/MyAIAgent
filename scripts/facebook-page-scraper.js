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

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

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

// Chrome must run headful (see launch() below), which needs a live X server.
// Cron/scheduled invocations don't reliably inherit a DISPLAY with a running
// Xvfb behind it (depends on whatever wrapper script called this), so rather
// than trust an inherited DISPLAY, start our own fallback Xvfb on :90 when
// the current DISPLAY has no socket to back it. Returns the Xvfb child
// process to kill on exit, or null if an existing display was reused.
async function ensureDisplay() {
  const current = process.env.DISPLAY;
  if (current && fs.existsSync(`/tmp/.X11-unix/X${current.replace(/^:/, '').split('.')[0]}`)) {
    return null; // inherited DISPLAY already has a live server behind it
  }

  const FALLBACK_DISPLAY = ':90';
  if (fs.existsSync('/tmp/.X11-unix/X90')) {
    process.env.DISPLAY = FALLBACK_DISPLAY;
    return null; // reuse an Xvfb left running from a previous invocation
  }

  console.error(`[facebook] no live X server on DISPLAY=${current || '(unset)'}, starting Xvfb ${FALLBACK_DISPLAY}`);
  const xvfb = spawn('Xvfb', [FALLBACK_DISPLAY, '-screen', '0', '1280x900x24', '-ac'], {
    stdio: 'ignore',
    detached: true,
  });
  xvfb.unref();
  process.env.DISPLAY = FALLBACK_DISPLAY;

  for (let i = 0; i < 20; i++) {
    if (fs.existsSync('/tmp/.X11-unix/X90')) break;
    await new Promise(r => setTimeout(r, 150));
  }
  return xvfb;
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

  await new Promise(r => setTimeout(r, 1500));

  // Screenshot for debugging
  if (process.env.FB_DEBUG_SCREENSHOT) {
    await page.screenshot({ path: process.env.FB_DEBUG_SCREENSHOT });
    console.error('[facebook] screenshot saved:', process.env.FB_DEBUG_SCREENSHOT);
  }

  // Wait for posts to appear (try multiple selectors)
  try { await page.waitForSelector('[role="feed"], a[href*="/posts/"]', { timeout: 8000 }); } catch {}

  // IMPORTANT: Facebook virtualizes the feed DOM — posts get unmounted once scrolled
  // past, so a single "scroll a lot, then extract once" pass only ever sees whatever
  // is on-screen at that final moment (usually just 1 post). Extract at EVERY scroll
  // checkpoint instead (including before scrolling at all) and merge by canonical link
  // in Node, so posts that later get virtualized away are still captured.
  const merged = new Map();
  const seenText = new Set();
  const collect = async () => {
    const found = await page.evaluate(extractPostsFromDom, limit);
    for (const post of found) {
      if (merged.has(post.link)) continue;
      // Different comment-anchor links can resolve to the same underlying post — also
      // dedup on a text fingerprint since link alone isn't always enough.
      const fingerprint = post.content.slice(0, 80);
      if (seenText.has(fingerprint)) continue;
      seenText.add(fingerprint);
      merged.set(post.link, post);
    }
  };

  await collect();
  for (let i = 0; i < 8 && merged.size < limit; i++) {
    await page.evaluate(() => window.scrollBy(0, 600));
    await new Promise(r => setTimeout(r, 1200));
    await collect();
  }

  return { articles: Array.from(merged.values()).slice(0, limit) };
}

// Runs inside page.evaluate() — must be a pure, self-contained function (no closures
// over outer scope) since Puppeteer serializes it into the page context.
function extractPostsFromDom(limit) {
    // Find all post-related links. On a fully authenticated session, EVERY /posts/ anchor
    // on a wall page carries a comment_id/reply_comment_id (they're comment-thread permalinks,
    // not a separate "clean" top-level link) — excluding them outright yields zero matches.
    // Instead strip those params below so multiple comment-anchors for the same post collapse
    // into one canonical post link via the dedup Set.
    const postLinks = Array.from(document.querySelectorAll('a[href*="/posts/"]'))
      .filter(a => {
        const url = a.href || '';
        if (url.includes('/messages/') || url.includes('/chat/')) return false;
        // Links from the notifications flyout/toast (always present in the DOM on any
        // logged-in FB page, regardless of which URL was navigated to) carry notif_id —
        // exclude them so a fast-rendering notification widget can't get scraped in place
        // of the actual wall/group feed content, which loads slower.
        if (url.includes('notif_id=') || url.includes('ref=notif')) return false;
        return url.includes('/posts/');
      });

    const seen = new Set();
    const posts = [];

    for (const linkEl of postLinks) {
      if (posts.length >= limit) break;

      let link = linkEl.href;
      try {
        const u = new URL(link);
        ['__cft__', '__tn__', '_rdr', '_nc_x', 'comment_id', 'reply_comment_id'].forEach(p => u.searchParams.delete(p));
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
      // Timestamp forms seen: "2h"/"5m" (relative), "Hôm qua lúc 12:05" / "Yesterday at 12:05"
      // (yesterday, absolute time). No length cap on the leading junk — the container walk-up
      // can prepend an arbitrarily long "online status" sidebar blob ahead of the real header.
      const headerRe = /[^\n·•]*?(\d+[hmd]|(Hôm qua lúc|Yesterday at)\s*\d{1,2}:\d{2})\s+(Shared with Public|Shared with Friends|Công khai|Bạn bè|Friends|Đã chia sẻ với Công khai)/g;
      let headerMatch, lastHeaderMatch = null;
      while ((headerMatch = headerRe.exec(rawText)) !== null) { lastHeaderMatch = headerMatch; }
      if (lastHeaderMatch) {
        rawText = rawText.substring(lastHeaderMatch.index + lastHeaderMatch[0].length).trim();
      } else {
        // Fallback: no header pattern matched — strip leading noise only
        rawText = rawText.replace(/^(Posts|Bài viết)?\s*(Filters|Bộ lọc)?\s*/, '');
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

  const ownXvfb = LOGIN_MODE ? null : await ensureDisplay();

  const browser = await puppeteer.launch({
    executablePath: fs.existsSync('/opt/google/chrome/chrome') ? '/opt/google/chrome/chrome' : '/usr/bin/google-chrome',
    headless: false, // xvfb provides the virtual display; Chrome must stay headless:false
    args: [
      `--user-data-dir=${FB_PROFILE_DIR}`,
      '--window-size=1280,900',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
    env: { ...process.env },
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
    if (ownXvfb) {
      try { process.kill(-ownXvfb.pid); } catch { try { ownXvfb.kill(); } catch {} }
    }
  }
}

run().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
