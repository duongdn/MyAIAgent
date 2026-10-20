// otherpages controller: static content pages, app usage/leaderboards, log events, notifications.
module.exports = async ({ call, check, err, ok, any, fx, sessions }) => {
  for (const ep of ['individual_soccer_training_drills', 'individual_soccer_training_drills_video', 'Technical_challenges', 'Juggling_skills',
    'about_MPFC', 'The_philosophy', 'Success_stories', 'get_membership_lists']) {
    await check(`otherpages/${ep}`, call(`otherpages/${ep}`), any());
  }
  const authed = ['app_usage', 'app_usage_leaderboard', 'v1_app_usage_leaderboard', 'app_usage_statistic', 'v1_app_usage_statistic',
    'store_web_usage', 'get_timer_training_clock', 'get_timer_training_leaderboard', 'mark_notification_read',
    'get_unread_notification_count', 'get_notifications'];
  for (const ep of authed) {
    await check(`otherpages/${ep} no cookie`, call(`otherpages/${ep}`), err(/cookie/));
    await check(`otherpages/${ep} bad cookie`, call(`otherpages/${ep}`, { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  }

  // ---- app usage: short same-day, short across midnight (split), long (>11 min, dropped); 1st call inserts, 2nd updates
  const day = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const data = JSON.stringify([
    { start: `${day}T10:00:00.000Z`, end: `${day}T10:05:00.000Z` },
    { start: `${day}T23:58:00.000Z`, end: `${new Date().toISOString().slice(0, 10)}T00:03:00.000Z` },
    { start: `${day}T08:00:00.000Z`, end: `${day}T09:00:00.000Z` },
  ]);
  await check('otherpages/app_usage insert', call('otherpages/app_usage', { as: 'nus_jsonapi_lvl1', form: { data } }), ok((j) => j.status === 'success'));
  await check('otherpages/app_usage update existing day', call('otherpages/app_usage', { as: 'nus_jsonapi_lvl1', form: { data } }), ok((j) => j.status === 'success'));
  for (const ep of ['app_usage_leaderboard', 'v1_app_usage_leaderboard', 'get_timer_training_leaderboard']) {
    await check(`otherpages/${ep} own level`, call(`otherpages/${ep}`, { as: 'member' }), ok((j) => j.status === 'success'));
    await check(`otherpages/${ep} lvis`, call(`otherpages/${ep}`, { as: 'member', q: { lvis: '[1,9]' } }), ok((j) => j.status === 'success'));
  }
  for (const ep of ['app_usage_statistic', 'v1_app_usage_statistic', 'get_timer_training_clock']) {
    await check(`otherpages/${ep} member (rows)`, call(`otherpages/${ep}`, { as: 'member' }), ok((j) => j.status === 'success'));
    await check(`otherpages/${ep} no rows`, call(`otherpages/${ep}`, { as: 'nus_jsonapi_lvl2' }), ok((j) => j.status === 'success'));
  }

  // ---- store_app_log_events (no auth; user_id param)
  const uid = sessions.nus_jsonapi_lvl1.id;
  const ev = (q) => call('otherpages/store_app_log_events', { q: { user_id: uid, ...q } });
  await check('log_events no user_id', call('otherpages/store_app_log_events'), err(/user_id/));
  await check('log_events no activity_type', ev({}), err(/activity_type/));
  await check('log_events dashboard', ev({ activity_type: 'dashboard' }), ok());
  await check('log_events account_setting', ev({ activity_type: 'account_setting' }), ok());
  for (const type of ['course', 'programe', 'about']) {
    await check(`log_events ${type} no data`, ev({ activity_type: type }), err(/'data'/));
    await check(`log_events ${type} data missing key`, ev({ activity_type: type, data: '{"x":1}' }), err(/in 'data'/));
  }
  for (const c of [1, 2, 3, 9, 10, 11, 99]) await check(`log_events course ${c}`, ev({ activity_type: 'course', data: JSON.stringify({ course_id: c }) }), ok());
  await check('log_events programe', ev({ activity_type: 'programe', data: '{"page_id":2254}' }), ok());
  for (const a of ['about_mpfc', 'the_philosophy', 'success_stories', 'other']) await check(`log_events about ${a}`, ev({ activity_type: 'about', data: JSON.stringify({ about_page: a }) }), ok());
  await check('log_events unknown type (no insert)', ev({ activity_type: 'unknown' }), ok());

  // ---- store_web_usage: lvl1 user has yesterday's row + x_day_in_row (fixtures) -> streak +1; then same-day update
  await check('store_web_usage new day (streak continues)', call('otherpages/store_web_usage', { as: 'nus_jsonapi_lvl1', q: { data: '{"timer":25}' } }), ok((j) => j.status === 'success'));
  await check('store_web_usage same day (update)', call('otherpages/store_web_usage', { as: 'nus_jsonapi_lvl1', q: { data: '{"timer":5}' } }), ok());
  await check('store_web_usage first ever (no achievements)', call('otherpages/store_web_usage', { as: 'nus_jsonapi_lvl2', q: { data: '{"timer":3}' } }), ok());
  await check('store_web_usage streak broken', call('otherpages/store_web_usage', { as: 'member', q: { data: '{"timer":3}' } }), ok());

  // ---- notifications (fixtures: one of each type + missing lookups)
  const nid = (fx.notifications || [])[0];
  await check('notifications unread count', call('otherpages/get_unread_notification_count', { as: 'member' }), ok((j) => j.data.unread_count >= 7));
  await check('notifications list default (v0 hides trophies)', call('otherpages/get_notifications', { as: 'member' }), ok((j) => j.data.notifications.every((n) => n.data.type !== 'new_trophy')));
  await check('notifications list v1 + limit/offset', call('otherpages/get_notifications', { as: 'member', q: { version: '1', limit: '20', offset: '0' } }), ok((j) => j.data.notifications.some((n) => n.data.type === 'new_trophy')));
  await check('notifications offset', call('otherpages/get_notifications', { as: 'member', q: { offset: '2' } }), ok());
  await check('notifications last_sync', call('otherpages/get_notifications', { as: 'member', q: { last_sync: '2020-01-01T00:00:00Z' } }), ok());
  await check('notifications bad last_sync', call('otherpages/get_notifications', { as: 'member', q: { last_sync: 'garbage' } }), ok());
  await check('mark_notification_read no id', call('otherpages/mark_notification_read', { as: 'member' }), err(/Invalid notification id/));
  await check('mark_notification_read unknown id', call('otherpages/mark_notification_read', { as: 'member', q: { notification_id: '999999999' } }), (r) => [r.json && r.json.error_code === 'notification_deleted', 'notification_deleted']);
  await check('mark_notification_read ok', call('otherpages/mark_notification_read', { as: 'member', q: { notification_id: String(nid) } }), ok((j) => j.data.accessible === true));
};
