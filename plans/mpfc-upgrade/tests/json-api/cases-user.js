// registration/create + user controller (add_plan, remove_plan, get_plans, delete, trophies).
// Throwaway users are registered here and deleted through user/delete (which also cancels their plans).
module.exports = async ({ call, check, err, ok, any, cfg }) => {
  const ts = Date.now();
  const reg = (extra) => ({ q: { firstname: 'Nus', lastname: 'Api', user_email: `nus.jsonapi.${ts}.${Math.floor(Math.random() * 1e6)}@example.com`, password: `Tmp-${ts}-Aa9!x`, phone: '0123', ...extra } });

  // --- registration/create
  await check('registration no firstname', call('registration/create', { q: { lastname: 'x' } }), err(/first name/));
  await check('registration no lastname', call('registration/create', { q: { firstname: 'x' } }), err(/last name/));
  await check('registration no email', call('registration/create', { q: { firstname: 'x', lastname: 'y' } }), err(/email/));
  await check('registration no password', call('registration/create', { q: { firstname: 'x', lastname: 'y', user_email: 'a@example.com' } }), err(/password/));
  await check('registration existing email', call('registration/create', { q: { firstname: 'x', lastname: 'y', user_email: cfg.test_users.member.user, password: 'x' } }), err());
  const dev = `nus-reg-device-${ts}`;
  const a = await check('registration ok (no device)', call('registration/create', reg()), ok((j) => j.status === 'success' && j.cookie));
  const b = await check('registration ok + new device', call('registration/create', reg({ device_token: dev, device_os: 'android' })), ok((j) => !!j.cookie));
  const c = await check('registration ok + same device (update)', call('registration/create', reg({ device_token: dev, device_os: 'android' })), ok((j) => !!j.cookie));
  const ck = (r) => r.json && r.json.cookie;

  // --- user/get_plans, remove_plan
  for (const ep of ['user/get_plans', 'user/remove_plan', 'user/delete', 'user/add_plan', 'user/trophies']) {
    await check(`${ep} no cookie`, call(ep), err(/cookie/));
    await check(`${ep} bad cookie`, call(ep, { q: { cookie: 'bad|1|x|y' } }), err(/Invalid authentication|cookie|purchase/));
  }
  await check('user/get_plans new user (player pass)', call('user/get_plans', { q: { cookie: ck(a) } }), ok());
  await check('user/remove_plan no ids', call('user/remove_plan', { q: { cookie: ck(a) } }), err(/product_id/));
  await check('user/remove_plan by product_id', call('user/remove_plan', { q: { cookie: ck(a), product_id: 'com.onbit.footballcoach.player_pass' } }), any());
  await check('user/remove_plan by bundle_id', call('user/remove_plan', { q: { cookie: ck(b), bundle_id: '19' } }), any());

  // --- user/add_plan (validation chain, then PlanService with a fake receipt -> store rejects it)
  const ap = (q) => call('user/add_plan', { q: { cookie: ck(a), ...q } });
  await check('user/add_plan no type', ap({}), err(/purchase type/));
  await check('user/add_plan bad type', ap({ type: 'web' }), err(/Invalid purchase type/));
  await check('user/add_plan no receipt', ap({ type: 'ios' }), err(/receipt/));
  await check('user/add_plan no product', ap({ type: 'ios', receipt: 'fake' }), err(/product/));
  await check('user/add_plan ios fake receipt', ap({ type: 'ios', receipt: 'fake-receipt', product_id: 'com.onbit.footballcoach.coach_pass' }), any());
  await check('user/add_plan signed_transaction', ap({ type: 'ios', signed_transaction: 'x.y.z', transaction_id: '1', receipt_format: 'jws', product_id: 'com.onbit.footballcoach.coach_pass' }), any());
  await check('user/add_plan android fake token', ap({ type: 'android', receipt: '{"purchaseToken":"fake"}', product_id: 'com.onbit.footballcoach.coach_pass' }), any());

  // --- trophies: member has achievements + leaderboard time (fixtures), new user has none
  await check('user/trophies member (achievements, leaderboard)', call('user/trophies', { as: 'member' }), ok((j) => j.trophies && j.training_count === 4));
  await check('user/trophies new user (empty)', call('user/trophies', { q: { cookie: ck(c) } }), ok((j) => j.status === 'success'));

  // --- user/delete (cancels plans first) for all throwaway users; afterwards login must fail
  for (const [n, r] of [['a', a], ['b', b], ['c', c]]) {
    if (ck(r)) await check(`user/delete throwaway ${n}`, call('user/delete', { q: { cookie: ck(r) } }), ok((j) => j.status === 'success'));
  }
  await check('user/get_plans after delete -> invalid cookie', call('user/get_plans', { q: { cookie: ck(a) } }), err(/Invalid authentication/));
};
