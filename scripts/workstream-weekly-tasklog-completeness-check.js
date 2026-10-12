/**
 * workstream-weekly-tasklog-completeness-check.js
 * Decide if a project's week is ready for Weekly Report Finalization.
 * Ready = (1) every ACTIVE dev (Developer/Tech Lead who logged on this project this week or last week —
 *         roster alone is unreliable, many members are not allocated) has at least one task-log entry on each
 *         working day Mon..min(Fri, today), except full-day leave. Hours are NOT checked (devs split across
 *         projects we don't manage, so a 40h sum is impossible here). AND
 *         (2) no task-log row is still reviewStatus 'Pending' (projects requiring review).
 * Returns { ready, issues: [string], info: [string] } — issues are human-readable block reasons.
 */

const MUST_LOG_ROLES = ['Developer', 'Tech Lead'];

const parseHours = s => { if (!s) return 0; const [h, m] = String(s).split(':').map(Number); return h + (m || 0) / 60; };

function workingDays(weekStart, todayStr) {
  const days = [];
  const d = new Date(weekStart + 'T00:00:00Z');
  for (let i = 0; i < 5; i++) {
    const s = d.toISOString().slice(0, 10);
    if (s <= todayStr) days.push(s);
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return days;
}

function checkWeekCompleteness(week, prevWeek, weekStart, todayStr) {
  const issues = [];
  const info = [];
  const rows = week.rows || [];
  const days = workingDays(weekStart, todayStr);
  const fullOff = new Set((week.leaveEntries || [])
    .filter(l => l.type === 'full_day_off').map(l => `${l.employeeName}|${l.date}`));

  const halfOff = new Set((week.leaveEntries || [])
    .filter(l => l.type !== 'full_day_off').map(l => `${l.employeeName}|${l.date}`));

  // Per-employee per-day: has any task-log entry (hours irrelevant)
  const logged = {};
  for (const r of rows) {
    const k = `${r.employeeName}|${r.date}`;
    logged[k] = (logged[k] || 0) + parseHours(r.actual);
  }

  const active = new Set([...rows, ...((prevWeek && prevWeek.rows) || [])].map(r => r.employeeName));
  const devs = (week.roster || []).filter(m =>
    active.has(m.employeeName) && (m.roles || []).some(r => MUST_LOG_ROLES.includes(r)));
  for (const m of devs) {
    const n = m.employeeName;
    const missing = days.filter(d => !fullOff.has(`${n}|${d}`) && !(`${n}|${d}` in logged));
    if (missing.length) issues.push(`${n} thiếu task log: ${missing.map(d => d.slice(5)).join(', ')}`);
    const off = days.filter(d => fullOff.has(`${n}|${d}`) || halfOff.has(`${n}|${d}`));
    info.push(`${n} ${days.filter(d => `${n}|${d}` in logged).length}/${days.length} ngày`
      + (off.length ? ` (nghỉ ${off.map(d => d.slice(5) + (fullOff.has(`${n}|${d}`) ? '' : ' ½')).join(', ')})` : ''));
  }

  const pending = rows.filter(r => r.reviewStatus === 'Pending');
  if (pending.length) {
    const who = [...new Set(pending.map(r => `${r.employeeName} ${r.date.slice(5)}`))];
    issues.push(`${pending.length} dòng charge chưa review (${who.slice(0, 6).join('; ')}${who.length > 6 ? '…' : ''})`);
  }

  if (!devs.length) info.push('không có dev active');
  if (!rows.length) info.push('0 log tuần này');
  return { ready: issues.length === 0, issues, info };
}

module.exports = { checkWeekCompleteness };
