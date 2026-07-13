#!/usr/bin/env node
// Fetch APM performance metrics (response time, error rate, throughput, apdex, top errors)
// from New Relic NerdGraph for a configured project.
//
// Usage: node scripts/newrelic-fetch-performance.js --project=ohcleo [--since=ISO8601] [--env=prod|staging]

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_CONFIGS = {
  ohcleo: 'config/.newrelic-ohcleo-config.json',
  mpfc: 'config/.newrelic-config.json',
  fountain: 'config/.newrelic-fountain-config.json',
};

function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    const m = arg.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

function loadConfig(project) {
  const rel = PROJECT_CONFIGS[project];
  if (!rel) {
    throw new Error(`Unknown project "${project}". Known: ${Object.keys(PROJECT_CONFIGS).join(', ')}`);
  }
  const configPath = path.join(__dirname, '..', rel);
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config not found: ${configPath}`);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function nerdgraphQuery(apiKey, query) {
  const body = JSON.stringify({ query });
  const options = {
    hostname: 'api.newrelic.com',
    path: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': apiKey,
      'Content-Length': Buffer.byteLength(body),
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse NerdGraph response: ${data.slice(0, 500)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function nrql(accountId, query) {
  const escaped = query.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `{ actor { account(id: ${accountId}) { nrql(query: "${escaped}") { results } } } }`;
}

async function fetchAppMetrics({ apiKey, accountId, appName, sinceMinutesAgo }) {
  const win = `SINCE ${sinceMinutesAgo} MINUTES AGO`;

  const summaryQuery = nrql(
    accountId,
    `SELECT average(duration)*1000 as avgResponseMs, count(*) as requestCount, ` +
      `filter(count(*), WHERE error IS true) as errorCount, ` +
      `rate(count(*), 1 minute) as throughputPerMin ` +
      `FROM Transaction WHERE appName = '${appName}' ${win}`
  );

  const apdexQuery = nrql(
    accountId,
    `SELECT apdex(duration, t: 0.5) as apdex FROM Transaction WHERE appName = '${appName}' ${win}`
  );

  const topErrorsQuery = nrql(
    accountId,
    `SELECT count(*) FROM TransactionError WHERE appName = '${appName}' ${win} ` +
      `FACET error.class, error.message LIMIT 10`
  );

  const slowestQuery = nrql(
    accountId,
    `SELECT average(duration)*1000 as avgMs, count(*) as calls ` +
      `FROM Transaction WHERE appName = '${appName}' ${win} ` +
      `FACET name LIMIT 5`
  );

  const [summaryRes, apdexRes, errorsRes, slowestRes] = await Promise.all([
    nerdgraphQuery(apiKey, summaryQuery),
    nerdgraphQuery(apiKey, apdexQuery),
    nerdgraphQuery(apiKey, topErrorsQuery),
    nerdgraphQuery(apiKey, slowestQuery),
  ]);

  const extract = (res) => res?.data?.actor?.account?.nrql?.results ?? null;
  const errs = (res) => res?.errors ?? null;

  return {
    appName,
    summary: extract(summaryRes)?.[0] ?? null,
    apdex: extract(apdexRes)?.[0] ?? null,
    topErrors: extract(errorsRes) ?? [],
    slowestTransactions: extract(slowestRes) ?? [],
    graphqlErrors: [errs(summaryRes), errs(apdexRes), errs(errorsRes), errs(slowestRes)].filter(Boolean).flat(),
  };
}

async function main() {
  const args = parseArgs();
  const project = args.project;
  if (!project) {
    console.error('Usage: node scripts/newrelic-fetch-performance.js --project=<name> [--since=ISO8601] [--env=prod|staging]');
    process.exit(1);
  }

  const config = loadConfig(project);
  const apiKey = config.user_api_key;
  const accountId = config.account_id;
  const env = args.env === 'staging' ? 'staging' : 'prod';
  const appName = env === 'staging' && config.app_name_staging ? config.app_name_staging : config.app_name;

  let sinceMinutesAgo = 60;
  if (args.since) {
    const sinceMs = Date.now() - new Date(args.since).getTime();
    sinceMinutesAgo = Math.max(1, Math.round(sinceMs / 60000));
  }

  const result = await fetchAppMetrics({ apiKey, accountId, appName, sinceMinutesAgo });
  console.log(JSON.stringify({ project, env, sinceMinutesAgo, ...result }, null, 2));
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
