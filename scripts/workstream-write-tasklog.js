#!/usr/bin/env node
/**
 * Write a task log entry to a Workstream project (POST /time/task-logs).
 * Usage: node scripts/workstream-write-tasklog.js <projectKey> <YYYY-MM-DD> "<taskName>" <hours>
 * projectKey must exist in config/.workstream-config.json under `projects`.
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.workstream-config.json');

function toHoursMinutes(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

async function main() {
  const [projectKey, date, taskName, hoursArg] = process.argv.slice(2);
  if (!projectKey || !date || !taskName || !hoursArg) {
    console.error('Usage: workstream-write-tasklog.js <projectKey> <YYYY-MM-DD> "<taskName>" <hours>');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const project = config.projects && config.projects[projectKey];
  if (!project || !project.id || !project.projectMemberId) {
    console.error(`Project "${projectKey}" not found or missing id/projectMemberId in config/.workstream-config.json`);
    process.exit(1);
  }

  const { default: fetch } = await import('node-fetch').catch(() => ({ default: require('node-fetch') }));
  const hm = toHoursMinutes(parseFloat(hoursArg));

  const body = {
    projectMemberId: project.projectMemberId,
    date,
    projectId: project.id,
    tasks: [
      { taskName, actual: hm, charged: hm, isPt: false, note: '', additionalInfo: '', tagIds: [] },
    ],
  };

  const res = await fetch(config.api_base + '/time/task-logs', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + config.access_token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (res.status !== 200) {
    console.error(`Failed (${res.status}): ${text}`);
    process.exit(1);
  }
  console.log(`Task log written to Workstream (${projectKey}, ${date}, ${hm}h): ${text}`);
}

main();
