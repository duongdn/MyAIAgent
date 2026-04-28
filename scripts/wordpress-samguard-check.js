#!/usr/bin/env node
/**
 * WordPress SamGuard health check.
 * Loads https://www.samguard.co/ with Puppeteer, captures JS console errors
 * and CSP violations, prints results.
 */

const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2] || 'https://www.samguard.co/';
  const errors = [];
  const cspViolations = [];
  const pageErrors = [];
  const failedRequests = [];

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
    );

    page.on('console', (msg) => {
      const type = msg.type();
      if (type === 'error') {
        const text = msg.text();
        if (
          /Content Security Policy|CSP|violated directive|Refused to (load|execute|connect|frame|apply)/i.test(text)
        ) {
          cspViolations.push(text);
        } else {
          errors.push(text);
        }
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err.message || String(err));
    });

    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.method()} ${req.url()} — ${req.failure() && req.failure().errorText}`);
    });

    // CSP report event (Chromium emits SecurityViolation through console)
    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Give page extra time to fire any deferred CSP reports
    await new Promise((r) => setTimeout(r, 5000));

    const status = response ? response.status() : 'no-response';
    const result = {
      url,
      status,
      jsErrors: errors,
      pageErrors,
      cspViolations,
      failedRequests,
    };
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.log(
      JSON.stringify(
        {
          url,
          fatalError: String(e && e.message ? e.message : e),
          jsErrors: errors,
          pageErrors,
          cspViolations,
          failedRequests,
        },
        null,
        2
      )
    );
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
