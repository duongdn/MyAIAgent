// Deterministic structure checks for reports/{date}/daily-report.md.
// Each check encodes a MANDATORY rule from CLAUDE.md or docs/memory (rule id in `source`).
// check(md, ctx) → true (pass) | string (failure detail).

const section = (md, re) => {
  const lines = md.split('\n');
  const start = lines.findIndex(l => /^## /.test(l) && re.test(l));
  if (start < 0) return null;
  const end = lines.findIndex((l, i) => i > start && /^## /.test(l));
  return lines.slice(start, end < 0 ? undefined : end).join('\n');
};

const REQUIRED_SECTIONS = [
  ['ALERTS SUMMARY', /ALERTS SUMMARY/i],
  ['Email', /^## Email/i],
  ['Slack', /^## Slack/i],
  ['Discord', /^## Discord/i],
  ['Sheets / Workstream', /Workstream/i],
  ['Fountain', /^## Fountain/i],
  ['Trello', /^## Trello/i],
  ['Matrix', /^## Matrix/i],
  ['Upwork', /Upwork/i],
  ['Unresolved Questions', /Unresolved Questions/i],
];

const checks = [
  {
    id: 'header-date',
    source: 'report convention',
    check: (md, ctx) => new RegExp(`^# Daily Report — ${ctx.date}`).test(md) || 'title missing or wrong date',
  },
  ...REQUIRED_SECTIONS.map(([name, re]) => ({
    id: `section:${name}`,
    source: 'daily-report.md piece list',
    check: md => (md.split('\n').some(l => /^## /.test(l) && re.test(l)) ? true : `missing "## ${name}"`),
  })),
  {
    id: 'fountain-5-parts',
    source: 'CLAUDE.md Fountain 5-part check',
    check: md => {
      const s = section(md, /^## Fountain/i);
      if (!s) return 'no Fountain section';
      const missing = [1, 2, 3, 4, 5].filter(n => !new RegExp(`Part ${n}\\b`, 'i').test(s));
      if (!/Trello/i.test(s)) missing.push('Trello board');
      return missing.length ? `missing Part ${missing.join(', ')}` : true;
    },
  },
  {
    id: 'workstream-dev-reviewer-status',
    source: 'feedback_workstream_report_needs_dev_reviewer_hours_and_status',
    check: md => {
      const s = section(md, /Workstream/i) || '';
      const need = [/Dev hours/i, /Reviewer/i, /Review status|need_review/i].filter(re => !re.test(s));
      return need.length ? `review table lacks: ${need.map(String).join(' ')}` : true;
    },
  },
  {
    id: 'discord-scope',
    source: 'feedback_discord_only_airagri_bizurk',
    check: md => {
      const s = section(md, /^## Discord/i) || '';
      return /HOMIE/i.test(s) ? 'HOMIEAPP must not be monitored' : true;
    },
  },
  {
    id: 'alerts-have-links',
    source: 'feedback_always_include_links',
    check: md => {
      const s = section(md, /ALERTS SUMMARY/i) || '';
      const rows = s.split('\n').filter(l => /^\| *\d+ *\|/.test(l));
      // Only conversation sources need a link to the message; Workstream/Performance/Email are internal
      const conv = rows.filter(r => /^\|[^|]*\|[^|]*(Slack|Discord|Trello|Matrix|Fountain)/i.test(r) && !/Resolved/i.test(r));
      const noLink = conv.filter(r => !/\]\(https?:\/\/|<https?:\/\//.test(r));
      return !noLink.length || `${noLink.length}/${conv.length} conversation alerts without link: ` +
        noLink.map(r => r.split('|')[2].trim()).join('; ');
    },
  },
  {
    id: 'timeline-updated',
    source: 'CLAUDE.md timeline update',
    onlyLatest: true,
    check: (md, ctx) => {
      const last = ctx.timelines?.daily_report?.last_run || '';
      return last.startsWith(ctx.date) || `daily_report.last_run=${last}, expected ${ctx.date}`;
    },
  },
];

module.exports = { checks, section };
