const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });
    await page.setViewport({width: 1280, height: 800});

    console.log('1. Going to Slack sign-in page...');
    await page.goto('https://equanimity-talk.slack.com/sign_in_with_password', {
        waitUntil: 'networkidle2', timeout: 30000
    });

    // Wait for React to render the login form
    console.log('   Waiting for login form to render...');
    try {
        await page.waitForSelector('input[data-qa="login_email"]', {timeout: 15000});
        console.log('   Login form found!');
    } catch(e) {
        // Fallback: wait for any email input
        try {
            await page.waitForSelector('input[type="email"]', {timeout: 5000});
        } catch(e2) {
            console.log('   Trying to wait more...');
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    await page.screenshot({path: '/tmp/slack-login-1.png'});

    // List all inputs
    const inputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input')).map(i => ({
            type: i.type, name: i.name, id: i.id,
            qa: i.getAttribute('data-qa'), visible: i.offsetParent !== null
        }));
    });
    console.log('   Inputs:', JSON.stringify(inputs.filter(i => i.visible || i.type === 'email' || i.type === 'password')));

    // Type credentials
    let emailSel = await page.$('input[data-qa="login_email"]');
    if (!emailSel) emailSel = await page.$('input[type="email"]');
    if (!emailSel) emailSel = await page.$('input#email');

    let passSel = await page.$('input[data-qa="login_password"]');
    if (!passSel) passSel = await page.$('input[type="password"]');
    if (!passSel) passSel = await page.$('input#password');

    if (emailSel && passSel) {
        console.log('2. Typing credentials...');
        await emailSel.type('carrick@nustechnology.com', {delay: 40});
        await passSel.type('qv2PyonkIIKRM@!#', {delay: 40});
        await page.screenshot({path: '/tmp/slack-login-2.png'});

        // Submit
        let submitBtn = await page.$('button[data-qa="signin_btn"]');
        if (!submitBtn) submitBtn = await page.$('button[type="submit"]');
        if (submitBtn) {
            console.log('3. Clicking Sign In...');
            await submitBtn.click();
        }

        // Wait for redirect
        await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 30000}).catch(() => {});
        console.log('   URL after submit:', page.url());
        await page.screenshot({path: '/tmp/slack-login-3.png'});

        // If redirected to /ssb/redirect, wait for the app
        if (page.url().includes('/ssb/') || page.url().includes('/client/')) {
            console.log('   Waiting for app redirect...');
            await new Promise(r => setTimeout(r, 5000));
        }

        // Extract tokens from cookies
        const allCookies = await browser.cookies();
        const dCookie = allCookies.find(c => c.name === 'd' && c.value.includes('xoxd'));
        console.log('\n4. Token extraction:');
        if (dCookie) {
            console.log('   xoxd FOUND:', dCookie.value.substring(0, 80));
        } else {
            const dAny = allCookies.find(c => c.name === 'd');
            if (dAny) console.log('   d cookie (not xoxd):', dAny.value.substring(0, 40));
            else console.log('   d cookie: NOT FOUND');
        }

        // Try to get xoxc from the page
        const xoxc = await page.evaluate(() => {
            try { if (window.boot_data) return window.boot_data.api_token; } catch(e) {}
            try {
                const m = document.documentElement.innerHTML.match(/"token":"(xoxc-[^"]+)"/);
                if (m) return m[1];
            } catch(e) {}
            const m = document.documentElement.innerHTML.match(/xoxc-[a-zA-Z0-9-]+/);
            return m ? m[0] : null;
        });
        if (xoxc) {
            console.log('   xoxc FOUND:', xoxc.substring(0, 80));
        } else {
            console.log('   xoxc: NOT found on this page');
            // Navigate to the workspace to trigger boot_data
            console.log('   Navigating to workspace...');
            await page.goto('https://app.slack.com/client/T03A9FRA09H', {
                waitUntil: 'networkidle2', timeout: 30000
            }).catch(() => {});
            await new Promise(r => setTimeout(r, 5000));

            const xoxc2 = await page.evaluate(() => {
                try { if (window.boot_data) return window.boot_data.api_token; } catch(e) {}
                const m = document.documentElement.innerHTML.match(/xoxc-[a-zA-Z0-9-]+/);
                return m ? m[0] : null;
            });
            if (xoxc2) console.log('   xoxc FOUND (from app):', xoxc2.substring(0, 80));
            else console.log('   xoxc still not found');

            // Also re-check cookies
            const cookies2 = await browser.cookies();
            const d2 = cookies2.find(c => c.name === 'd' && c.value.includes('xoxd'));
            if (d2) console.log('   xoxd (updated):', d2.value.substring(0, 80));
        }

        await page.screenshot({path: '/tmp/slack-login-final.png'});
    } else {
        console.log('   Login form not rendered. Email:', !!emailSel, 'Pass:', !!passSel);
    }

    await browser.close();
})();
