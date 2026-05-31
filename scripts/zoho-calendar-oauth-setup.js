#!/usr/bin/env node
// Interactive OAuth2 setup for Zoho Calendar — run once per account
// Usage: node scripts/zoho-calendar-oauth-setup.js [email]
// Prereq: fill client_id + client_secret in config/.zoho-calendar-config.json
//
// Steps:
// 1. Visit the auth URL printed below
// 2. Authorize the app for the target account
// 3. Paste the `code` from the redirect URL
// 4. Tokens are saved to config/.zoho-calendar-config.json

const https = require("https");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.resolve(__dirname, "../config/.zoho-calendar-config.json");

function post(hostname, pathname, body) {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams(body).toString();
    const req = https.request(
      { hostname, path: pathname, method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(data) } },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => {
          try { resolve(JSON.parse(raw)); } catch { resolve({ error: raw }); }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const { client_id, client_secret, region = "com" } = config;

  if (!client_id || !client_secret) {
    console.error("ERROR: Fill client_id + client_secret in config/.zoho-calendar-config.json first.");
    console.error("Get them from https://api-console.zoho.com/ → Server-based Application");
    process.exit(1);
  }

  const targetEmail = process.argv[2];
  const accounts = targetEmail
    ? config.accounts.filter((a) => a.email.startsWith(targetEmail))
    : config.accounts;

  if (accounts.length === 0) {
    console.error(`No account found matching: ${targetEmail}`);
    process.exit(1);
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  const authBase = `https://accounts.zoho.${region}`;
  const scope = "ZohoCalendar.calendar.READ";
  const redirectUri = "https://localhost";

  for (const acct of accounts) {
    console.log(`\n=== Setting up: ${acct.email} ===`);
    console.log("\n1. Open this URL in a browser and log in as this account:");
    const authUrl =
      `${authBase}/oauth/v2/auth?response_type=code&client_id=${encodeURIComponent(client_id)}` +
      `&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;
    console.log(`\n${authUrl}\n`);

    console.log("2. After authorizing, you'll be redirected to localhost (page will error — that's OK).");
    console.log("   Copy the full redirect URL or just the `code=` parameter value.\n");

    const input = await ask("Paste the code (or full redirect URL): ");
    const code = input.includes("code=")
      ? new URL(input).searchParams.get("code") || input.split("code=")[1].split("&")[0]
      : input.trim();

    console.log(`\nExchanging code for tokens...`);
    const tokenHostname = `accounts.zoho.${region}`;
    const resp = await post(tokenHostname, "/oauth/v2/token", {
      grant_type: "authorization_code",
      client_id,
      client_secret,
      redirect_uri: redirectUri,
      code,
    });

    if (resp.error || !resp.refresh_token) {
      console.error("Token exchange failed:", JSON.stringify(resp));
      continue;
    }

    acct.refresh_token = resp.refresh_token;
    acct.access_token = resp.access_token;
    acct.access_token_expiry = Date.now() + (resp.expires_in || 3600) * 1000;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    console.log(`✓ Tokens saved for ${acct.email}`);
  }

  rl.close();
  console.log("\nDone. Run: node scripts/fetch-zoho-calendar.js to verify.");
}

main().catch((e) => { console.error(e); process.exit(1); });
