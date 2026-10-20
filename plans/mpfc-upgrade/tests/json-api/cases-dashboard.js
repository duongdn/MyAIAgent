// dashboard controller (largest): account/course lookups by ?id=, cached ESGrid video lists, member video library, favourites.
// Unauthenticated-by-design endpoints (id= param) are exercised only against throwaway users (see report: security).
const path = require('path');
module.exports = async ({ call, check, err, ok, bad, any, cfg, sessions, fixturesMode, dir }) => {
  const media = path.join(dir, 'media');
  const member = sessions.member.id;
  const lvl1 = sessions.nus_jsonapi_lvl1.id;
  const nomm = sessions.nus_jsonapi_nomm.id;

  // ---- id-based lookups
  for (const ep of ['get_MembershipInfo', 'get_dashboard_Image', 'fulfil_your_potential', 'getAccountSettings', 'getAccountInfo', 'getCourses']) {
    await check(`dashboard/${ep} member`, call(`dashboard/${ep}`, { q: { id: member } }), any());
  }
  await check('dashboard/getMembershipLevelInfo', call('dashboard/getMembershipLevelInfo'), any());
  for (const c of [1, 10, 13]) await check(`dashboard/get_Course_video course ${c}`, call('dashboard/get_Course_video', { q: { course_id: c } }), any());

  // ---- get_Login_Details
  const m = cfg.test_users.member;
  await check('dashboard/get_Login_Details wrong password', call('dashboard/get_Login_Details', { form: { username: m.user, password: 'wrong' } }), ok((j) => /Incorrect/.test(j.message)));
  await check('dashboard/get_Login_Details inactive membership (admin)', call('dashboard/get_Login_Details', { form: { username: cfg.test_users.admin.user, password: cfg.test_users.admin.password } }), ok((j) => /membership|not_active/.test(j.message)));
  await check('dashboard/get_Login_Details member', call('dashboard/get_Login_Details', { form: { username: m.user, password: m.password } }), ok((j) => j.ID == member && 'has_coach_pass' in j));

  // ---- get_Course_Details
  await check('dashboard/get_Course_Details no username', call('dashboard/get_Course_Details'), bad(/provide a username/));
  await check('dashboard/get_Course_Details unknown', call('dashboard/get_Course_Details', { q: { username: 'nobody_nus_x' } }), bad(/User not found/));
  await check('dashboard/get_Course_Details member', call('dashboard/get_Course_Details', { q: { username: m.user } }), ok((j) => Array.isArray(j.plans)));
  await check('dashboard/get_Course_Details lvl1 (courses from dbm cases)', call('dashboard/get_Course_Details', { q: { username: 'nus_jsonapi_lvl1' } }), ok());

  // ---- write endpoints with id= (only on the throwaway lvl1 user)
  await check('dashboard/changeAccountInfo lvl1', call('dashboard/changeAccountInfo', { q: { id: lvl1, first_name: 'Nus', last_name: 'Changed', phone: '1', email: 'nus_jsonapi_lvl1@example.com' } }), ok());
  await check('dashboard/setPassword lvl1', call('dashboard/setPassword', { q: { id: lvl1, password: `Pw-${Date.now()}-x` } }), ok());
  sessions.nus_jsonapi_lvl1.cookie = fixturesMode('cookie nus_jsonapi_lvl1').cookie;   // new password invalidates old cookies
  await check('dashboard/canselMembership lvl1', call('dashboard/canselMembership', { q: { id: lvl1, course_id: 999 } }), ok());

  // ---- cached ESGrid lists: build without access, build with app_version, build with access, then cached
  for (const ep of ['Featured_practices', 'Ask_the_coach', 'getArsenalSkillsLibraryVideos', 'Arsenal_Featured_practices', 'Arsenal_Ask_the_coach']) {
    fixturesMode('clear-caches');
    await check(`dashboard/${ep} build, no access`, call(`dashboard/${ep}`, { q: { id: nomm } }), any());
    fixturesMode('clear-caches');
    await check(`dashboard/${ep} build, app_version`, call(`dashboard/${ep}`, { q: { id: nomm, app_version: '5' } }), any());
    fixturesMode('clear-caches');
    await check(`dashboard/${ep} build, access`, call(`dashboard/${ep}`, { q: { id: member } }), any());
    await check(`dashboard/${ep} cached`, call(`dashboard/${ep}`, { q: { id: member } }), any());
  }
  fixturesMode('clear-caches');
  await check('dashboard/getSkillsLibraryVideos build', call('dashboard/getSkillsLibraryVideos'), any());
  await check('dashboard/getSkillsLibraryVideos cached + last_sync', call('dashboard/getSkillsLibraryVideos', { q: { last_sync: '2020-01-01T00:00:00Z' } }), any());
  await check('dashboard/getSkillsLibraryVideos bad last_sync', call('dashboard/getSkillsLibraryVideos', { q: { last_sync: 'garbage' } }), any());

  // ---- player of the week (+ old), CoachPass
  for (const ep of ['player_of_the_week', 'player_of_the_week_old', 'CoachPass']) {
    await check(`dashboard/${ep} bad cookie`, call(`dashboard/${ep}`, { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  }
  await check('dashboard/player_of_the_week build', call('dashboard/player_of_the_week', { as: 'member' }), any());
  await check('dashboard/player_of_the_week cached + last_sync', call('dashboard/player_of_the_week', { as: 'member', q: { last_sync: '2020-01-01T00:00:00Z' } }), any());
  await check('dashboard/player_of_the_week bad last_sync', call('dashboard/player_of_the_week', { as: 'member', q: { last_sync: 'garbage' } }), any());
  fixturesMode('clear-caches');
  await check('dashboard/player_of_the_week includeLocalVideo', call('dashboard/player_of_the_week', { as: 'member', q: { includeLocalVideo: '1' } }), any());
  await check('dashboard/player_of_the_week no membership', call('dashboard/player_of_the_week', { as: 'nus_jsonapi_nomm' }), bad());
  await check('dashboard/player_of_the_week_old build', call('dashboard/player_of_the_week_old', { as: 'member' }), any());
  await check('dashboard/player_of_the_week_old no membership', call('dashboard/player_of_the_week_old', { as: 'nus_jsonapi_nomm' }), any());
  await check('dashboard/CoachPass no coach pass -> 403', call('dashboard/CoachPass', { as: 'team' }), err(/Coach Pass/));
  await check('dashboard/CoachPass build', call('dashboard/CoachPass', { as: 'member' }), ok());
  await check('dashboard/CoachPass cached', call('dashboard/CoachPass', { as: 'member' }), ok());

  // ---- member video library
  const auth = ['UploadMemberVideo', 'DeleteMemberVideo', 'getAllPostVideoLinksByUser', 'GetAllTeamLibVideos', 'GetAllTeamLibVideos_old',
    'likeVideo', 'weekly_plan', 'add_favorite_video', 'remove_favorite_video', 'get_favorite_videos'];
  for (const ep of auth) {
    await check(`dashboard/${ep} no cookie`, call(`dashboard/${ep}`), err(/cookie/));
    await check(`dashboard/${ep} bad cookie`, call(`dashboard/${ep}`, { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  }
  const up = (form, files) => call('dashboard/UploadMemberVideo', { as: 'nus_jsonapi_lvl1', form, files });
  await check('dashboard/UploadMemberVideo no title', up({ name: '', add_to_lib: '0' }), bad(/Title is empty/));
  await check('dashboard/UploadMemberVideo no video', up({ name: 'x', add_to_lib: '0' }), bad(/Wrong or empty video/));
  await check('dashboard/UploadMemberVideo no image', up({ name: 'x', add_to_lib: '0' }, { file: path.join(media, 't.mp4') }), bad(/Wrong or empty image/));
  await check('dashboard/getAllPostVideoLinksByUser none', call('dashboard/getAllPostVideoLinksByUser', { as: 'nus_jsonapi_lvl1' }), ok((j) => /No videos/.test(j.msg || '')));
  await check('dashboard/UploadMemberVideo private', up({ name: 'NUSTEST private', add_to_lib: '0' }, { file: path.join(media, 't.mp4'), image: path.join(media, 't.jpg') }), ok((j) => j.response === 'SUCCESS'));
  await check('dashboard/UploadMemberVideo team library', up({ name: 'NUSTEST team', add_to_lib: '1' }, { file: path.join(media, 't.mp4'), image: path.join(media, 't.jpg') }), ok((j) => j.response === 'SUCCESS'));
  const mine = await check('dashboard/getAllPostVideoLinksByUser list', call('dashboard/getAllPostVideoLinksByUser', { as: 'nus_jsonapi_lvl1' }), ok((j) => j.video.length >= 2));
  await check('dashboard/getAllPostVideoLinksByUser limit + last_sync', call('dashboard/getAllPostVideoLinksByUser', { as: 'nus_jsonapi_lvl1', form: { limit: '1' }, q: { last_sync: '2020-01-01T00:00:00Z' } }), ok((j) => j.video.length === 1));
  await check('dashboard/getAllPostVideoLinksByUser bad last_sync', call('dashboard/getAllPostVideoLinksByUser', { as: 'nus_jsonapi_lvl1', q: { last_sync: 'garbage' } }), ok());
  const vids = ((mine.json && mine.json.video) || []).map((v) => v.post);

  await check('dashboard/GetAllTeamLibVideos lvl1 team', call('dashboard/GetAllTeamLibVideos', { as: 'nus_jsonapi_lvl1' }), ok());
  await check('dashboard/GetAllTeamLibVideos last_sync', call('dashboard/GetAllTeamLibVideos', { as: 'nus_jsonapi_lvl1', q: { last_sync: '2020-01-01T00:00:00Z' } }), ok());
  await check('dashboard/GetAllTeamLibVideos bad last_sync', call('dashboard/GetAllTeamLibVideos', { as: 'nus_jsonapi_lvl1', q: { last_sync: 'garbage' } }), ok());
  await check('dashboard/GetAllTeamLibVideos empty library', call('dashboard/GetAllTeamLibVideos', { as: 'nus_jsonapi_lvl2', q: { last_sync: '2100-01-01T00:00:00Z' } }), ok());
  await check('dashboard/GetAllTeamLibVideos_old', call('dashboard/GetAllTeamLibVideos_old', { as: 'nus_jsonapi_lvl1' }), ok());
  await check('dashboard/GetAllTeamLibVideos_old empty', call('dashboard/GetAllTeamLibVideos_old', { as: 'nus_jsonapi_lvl2' }), ok());
  if (vids[0]) {
    await check('dashboard/likeVideo like', call('dashboard/likeVideo', { as: 'member', form: { postId: String(vids[0]) } }), ok());
    await check('dashboard/likeVideo unlike', call('dashboard/likeVideo', { as: 'member', form: { postId: String(vids[0]) } }), ok());
  }
  await check('dashboard/DeleteMemberVideo invalid id', call('dashboard/DeleteMemberVideo', { as: 'nus_jsonapi_lvl1', form: { videoId: '0' } }), err(/Invalid video ID/));
  await check('dashboard/DeleteMemberVideo not mine', call('dashboard/DeleteMemberVideo', { as: 'member', form: { videoId: String(vids[0] || 1) } }), err(/Video not found/));
  for (const v of vids) await check(`dashboard/DeleteMemberVideo own ${v}`, call('dashboard/DeleteMemberVideo', { as: 'nus_jsonapi_lvl1', form: { videoId: String(v) } }), ok((j) => j.response === 'SUCCESS'));

  // ---- weekly plan, favourites
  await check('dashboard/weekly_plan member (fixture plans)', call('dashboard/weekly_plan', { as: 'member' }), ok((j) => j.data.length >= 1));
  await check('dashboard/weekly_plan none', call('dashboard/weekly_plan', { as: 'nus_jsonapi_lvl2' }), ok((j) => j.data.length === 0));
  await check('dashboard/add_favorite_video no post', call('dashboard/add_favorite_video', { as: 'member' }), err(/Invalid post id/));
  await check('dashboard/add_favorite_video ok', call('dashboard/add_favorite_video', { as: 'member', form: { postId: '123', data: '{"title":"NUSTEST fav"}' } }), ok());
  await check('dashboard/get_favorite_videos', call('dashboard/get_favorite_videos', { as: 'member' }), ok((j) => j.data.some((d) => d.post_id == 123)));
  await check('dashboard/get_favorite_videos last_sync', call('dashboard/get_favorite_videos', { as: 'member', q: { last_sync: '2020-01-01T00:00:00Z' } }), ok());
  await check('dashboard/get_favorite_videos bad last_sync', call('dashboard/get_favorite_videos', { as: 'member', q: { last_sync: 'garbage' } }), ok());
  await check('dashboard/remove_favorite_video no post', call('dashboard/remove_favorite_video', { as: 'member' }), err(/Invalid post id/));
  await check('dashboard/remove_favorite_video ok', call('dashboard/remove_favorite_video', { as: 'member', form: { postId: '123' } }), ok());
};
