#!/usr/bin/env node
/**
 * workstream-weekly-finalization-submit.js
 * Workstream "Weekly Report Finalization" (All Task Log > Project > "Submit weekly report").
 * DM confirms each project's Mon–Fri hours every Friday so finance can lock official charge.
 *
 * API (from frontend bundle):
 *   GET  /finalization/status?projectId=&weekStart=YYYY-MM-DD  → {status:{state:'finalized'|'not_finalized',...}}
 *   POST /finalization/submit {projectId, weekStart}           → 422 PENDING_REVIEW_BLOCKING if charged hours still Pending review
 *
 * Usage:
 *   node scripts/workstream-weekly-finalization-submit.js                 # dry-run, current week
 *   node scripts/workstream-weekly-finalization-submit.js --submit        # submit every not-finalized project
 *   node scripts/workstream-weekly-finalization-submit.js --week=2026-10-05 --project=maddy
 * Exit: 0 = all finalized after run, 1 = something still not finalized / errors.
 */

const { PROJECTS, ensureToken } = require('./workstream-fetch-project-week');

const args = process.argv.slice(2);
const arg = name => (args.find(a => a.startsWith(`--${name}=`)) || '').split('=')[1];
const SUBMIT = args.includes('--submit');

// Monday of the current week in UTC+7
function currentWeekStart() {
  const d = new Date(Date.now() + 7 * 3600000);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

async function api(config, method, path, body) {
  const res = await fetch(config.api_base + path, {
    method,
    headers: { Authorization: 'Bearer ' + config.access_token, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 200) }; }
  return { status: res.status, json };
}

// Blocker rows may be objects or strings depending on API version — print compactly
const fmtBlockers = j => JSON.stringify(j.blockers || j.details?.blockers || j).slice(0, 300);

async function main() {
  const weekStart = arg('week') || currentWeekStart();
  const only = arg('project');
  const config = await ensureToken();
  let notDone = 0;

  console.log(`## Weekly Report Finalization — week ${weekStart} (${SUBMIT ? 'SUBMIT' : 'dry-run'})`);
  for (const [key, p] of Object.entries(PROJECTS)) {
    if (only && key !== only) continue;
    const q = `projectId=${p.id}&weekStart=${weekStart}`;
    const st = await api(config, 'GET', `/finalization/status?${q}`);
    const s = st.json.status || {};
    if (s.state === 'finalized') {
      console.log(`✅ ${p.name} — finalized by ${s.finalizedBy}${s.autoFinalized ? ' (auto)' : ''} ${s.finalizedAt || ''}`);
      continue;
    }
    if (st.status !== 200) {
      console.log(`❌ ${p.name} — status HTTP ${st.status} ${JSON.stringify(st.json).slice(0, 150)}`);
      notDone++; continue;
    }
    if (!SUBMIT) { console.log(`⏳ ${p.name} — not finalized`); notDone++; continue; }

    const r = await api(config, 'POST', '/finalization/submit', { projectId: p.id, weekStart });
    if (r.status >= 200 && r.status < 300) {
      console.log(`✅ ${p.name} — submitted now (${r.json.status?.state || 'ok'})`);
    } else if (r.status === 422) {
      console.log(`🔴 ${p.name} — BLOCKED, pending review: ${fmtBlockers(r.json)}`);
      notDone++;
    } else {
      console.log(`❌ ${p.name} — submit HTTP ${r.status} ${JSON.stringify(r.json).slice(0, 200)}`);
      notDone++;
    }
  }
  console.log(`\nNot finalized: ${notDone}`);
  process.exit(notDone ? 1 : 0);
}

main().catch(e => { console.error('[finalization] Error: ' + e.message); process.exit(1); });
