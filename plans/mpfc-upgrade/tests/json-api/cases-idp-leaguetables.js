// idp + leaguetables controllers: both read the user from the WP logged_in cookie (wpCookie), not ?cookie=.
// Fixtures: IDP on for club 9; League Tables on for clubs 9 and 1; lvl2 user = club with both features off.
module.exports = async ({ call, check, ok, bad }) => {
  const W = (as, extra = {}) => ({ as, wpCookie: true, noCookieParam: true, ...extra });
  const body = (o) => ({ body: JSON.stringify(o) });

  // ---- IDP
  for (const ep of ['get_idp_data', 'session_complete', 'set_target_hidden', 'sync_targets']) {
    await check(`idp/${ep} not authenticated`, call(`idp/${ep}`, { body: '{}' }), bad(/Not authenticated/));
    await check(`idp/${ep} club without IDP`, call(`idp/${ep}`, W('nus_jsonapi_lvl2', body({}))), bad(/IDP not enabled/));
  }
  await check('idp/sync_targets no targets', call('idp/sync_targets', W('member', body({ x: 1 }))), bad(/targets array/));
  await check('idp/sync_targets ok (+ skipped invalid row)', call('idp/sync_targets', W('member', body({ targets: [
    { area_key: 'technical', target_key: 'nus_test_target', status: 'achieved', sessions_count: 2, last_trained_at: '2026-10-01T10:00:00Z' },
    { area_key: 'technical', target_key: 'nus_test_target_2' },
    { area_key: '' },
  ] }))), ok((j) => j.success === true));
  const data = await check('idp/get_idp_data member', call('idp/get_idp_data', W('member')), ok((j) => Array.isArray(j.targets) && j.skill_library));
  const target = ((data.json && data.json.targets) || []).find((t) => t.target_key === 'nus_test_target');

  await check('idp/session_complete empty body', call('idp/session_complete', W('member', { body: '' })), bad(/Invalid body/));
  await check('idp/session_complete missing fields', call('idp/session_complete', W('member', body({ session_id: 's1' }))), bad(/required/));
  await check('idp/session_complete bad date', call('idp/session_complete', W('member', body({ session_id: 's1', focus_area: 'technical', completed_at: 'not-a-date' }))), bad(/Invalid completed_at/));
  await check('idp/session_complete ok', call('idp/session_complete', W('member', body({ session_id: `nus-${Date.now()}`, focus_area: 'technical', skill_tags: ['dribbling'], xp_awarded: 20, completed_at: '2026-10-20T08:00:00Z' }))), ok((j) => j.success === true));
  await check('idp/session_complete form-encoded body', call('idp/session_complete', W('member', { form: { session_id: `nus-f-${Date.now()}`, focus_area: 'technical', completed_at: '2026-10-20T08:00:00Z' } })), ok((j) => j.success === true));

  await check('idp/set_target_hidden empty body', call('idp/set_target_hidden', W('member', { body: '' })), bad(/Invalid body/));
  await check('idp/set_target_hidden missing fields', call('idp/set_target_hidden', W('member', body({ target_id: 0 }))), bad(/required/));
  await check('idp/set_target_hidden own target', call('idp/set_target_hidden', W('member', body({ target_id: target ? target.id : 1, hidden: true }))), ok((j) => j.success === true));
  // NOTE: setHidden() reports ok for 0 updated rows, so a foreign/missing target also returns success (see report)
  await check('idp/set_target_hidden foreign target (returns success: known bug)', call('idp/set_target_hidden', W('member', body({ target_id: 999999999, hidden: false }))), ok());

  // ---- League tables
  for (const ep of ['get_player_leagues', 'log_completion', 'set_player_profile']) {
    await check(`leaguetables/${ep} not authenticated`, call(`leaguetables/${ep}`, { body: '{}' }), bad(/Not authenticated/));
    await check(`leaguetables/${ep} club disabled`, call(`leaguetables/${ep}`, W('nus_jsonapi_lvl2', body({}))), bad(/not enabled/));
  }
  await check('leaguetables/get_player_leagues no club (no MM row)', call('leaguetables/get_player_leagues', W('nus_jsonapi_nomm')), bad(/No club found|membership/));
  await check('leaguetables/log_completion no club', call('leaguetables/log_completion', W('nus_jsonapi_nomm', body({}))), bad(/not enabled|membership/));
  await check('leaguetables/get_player_leagues member (in/skip/below-min/club-wide)', call('leaguetables/get_player_leagues', W('member')), ok((j) => j.leagues.some((l) => l.league_name === 'NUSTEST active')));
  await check('leaguetables/get_player_leagues hidden player sees own rank', call('leaguetables/get_player_leagues', W('team')), ok((j) => Array.isArray(j.leagues)));
  await check('leaguetables/get_player_leagues fallback club-wide (club 1)', call('leaguetables/get_player_leagues', W('nus_jsonapi_lvl1')), ok((j) => j.leagues.length === 1));

  await check('leaguetables/log_completion empty body', call('leaguetables/log_completion', W('member', { body: '' })), bad(/Invalid body/));
  await check('leaguetables/log_completion no session_id', call('leaguetables/log_completion', W('member', body({ xp_awarded: 5 }))), bad(/session_id required/));
  await check('leaguetables/log_completion bad date', call('leaguetables/log_completion', W('member', body({ session_id: 'x', completed_at: 'nope' }))), bad(/Invalid completed_at/));
  const sid = `nus-lt-${Date.now()}`;
  await check('leaguetables/log_completion ok', call('leaguetables/log_completion', W('member', body({ session_id: sid, xp_awarded: 15, skill_tags: ['a'], completed_at: '2026-10-20T08:00:00Z' }))), ok((j) => j.success && j.duplicate === false));
  await check('leaguetables/log_completion duplicate', call('leaguetables/log_completion', W('member', body({ session_id: sid, xp_awarded: 15, completed_at: '2026-10-20T08:00:00Z' }))), ok((j) => j.duplicate === true));

  await check('leaguetables/set_player_profile bad age_band', call('leaguetables/set_player_profile', W('member', body({ age_band: '99' }))), bad(/Invalid age_band/));
  await check('leaguetables/set_player_profile bad position', call('leaguetables/set_player_profile', W('member', body({ position: 'Keeper' }))), bad(/Invalid position/));
  await check('leaguetables/set_player_profile ok', call('leaguetables/set_player_profile', W('member', body({ age_band: '12-16', position: 'Striker' }))), ok((j) => j.age_band === '12-16' && j.position === 'Striker'));
  await check('leaguetables/set_player_profile clear (empty values)', call('leaguetables/set_player_profile', W('member', body({ age_band: '', position: '' }))), ok((j) => j.age_band === null));
  await check('leaguetables/set_player_profile no fields', call('leaguetables/set_player_profile', W('member', { body: '' })), ok());
};
