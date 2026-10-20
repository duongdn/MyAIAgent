// json-api-auth: Auth controller (generate/validate/destroy cookie, current user info).
module.exports = async ({ call, check, err, ok, cfg, sessions, login }) => {
  const m = cfg.test_users.member;
  await check('auth/generate no username', call('auth/generate_auth_cookie', { form: { password: 'x' } }), err(/username/));
  await check('auth/generate no password', call('auth/generate_auth_cookie', { form: { username: m.user } }), err(/password/));
  await check('auth/generate wrong password', call('auth/generate_auth_cookie', { form: { username: m.user, password: 'wrong-pw' } }), err(/Invalid username/));
  await check('auth/generate unknown user', call('auth/generate_auth_cookie', { q: { username: 'no_such_user_nus_x', password: 'x' } }), err(/Invalid username/));
  const dev = 'nus-test-device-' + Date.now();
  await check('auth/generate + new device + seconds', call('auth/generate_auth_cookie',
    { form: { username: m.user, password: m.password, seconds: '3600' }, q: { device_token: dev, device_os: 'ios' } }),
    ok((j) => j.cookie && j.user && j.user.id && 'has_coach_pass' in j.user));
  const again = await check('auth/generate same device (update path)', call('auth/generate_auth_cookie',
    { form: { username: m.user, password: m.password }, q: { device_token: dev, device_os: 'ios' } }), ok((j) => !!j.cookie));

  await check('auth/generate inactive membership (admin) -> 403', call('auth/generate_auth_cookie', { form: { username: cfg.test_users.admin.user, password: cfg.test_users.admin.password } }), err(/membership/));
  await check('auth/validate no cookie', call('auth/validate_auth_cookie'), err(/cookie/));
  await check('auth/validate bad cookie', call('auth/validate_auth_cookie', { q: { cookie: 'bad|1|x|y' } }), ok((j) => j.valid === false));
  await check('auth/validate good cookie', call('auth/validate_auth_cookie', { as: 'member' }), ok((j) => j.valid === true));

  await check('auth/currentuserinfo no cookie', call('auth/get_currentuserinfo'), err(/cookie/));
  await check('auth/currentuserinfo bad cookie', call('auth/get_currentuserinfo', { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  await check('auth/currentuserinfo member', call('auth/get_currentuserinfo', { as: 'member' }), ok((j) => j.user.id == sessions.member.id));

  await check('auth/destroy no cookie', call('auth/destroy_auth_cookie'), err(/cookie/));
  await check('auth/destroy bad cookie', call('auth/destroy_auth_cookie', { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  // destroy with the extra cookie made above (keeps the shared member session usable): removes the device row
  const c2 = again.json && again.json.cookie;
  if (c2) {
    await check('auth/destroy last device -> logout date', call('auth/destroy_auth_cookie', { q: { cookie: c2, device_token: dev } }), ok((j) => j.status === 'success'));
  }
  const tm = cfg.test_users.team_member;
  const s = await login('team_scratch', tm.user, tm.password);
  await check('auth/destroy unknown device', call('auth/destroy_auth_cookie', { q: { cookie: s.cookie, device_token: 'not-registered' } }), ok());
};
