// dynamicballmastery controller: course content parsers (switch on course id) + completed sessions.
// Every switch case is hit (incl. COURSE_TO_PAGE_MAP default and an unknown id); unit pages come from Training_Programe.
module.exports = async ({ call, check, ok, any, sessions, fx }) => {
  const ids = [1, 2, 3, 9, 10, 11, 12, 13, 14, 29, 32, 35, 39, 15, 999];
  for (const id of ids) {
    await check(`dbm/The_Aim course ${id}`, call('dynamicballmastery/The_Aim', { q: { course_id: id } }), any());
    await check(`dbm/The_Outcomes ${id}`, call('dynamicballmastery/The_Outcomes', { q: { id } }), any());
    await check(`dbm/The_Process ${id}`, call('dynamicballmastery/The_Process', { q: { id } }), any());
    await check(`dbm/Best_practices ${id}`, call('dynamicballmastery/Best_practices', { q: { id } }), any());
  }
  const units = {};
  for (const id of ids) {
    const r = await check(`dbm/Training_Programe ${id}`, call('dynamicballmastery/Training_Programe', { q: { id } }), any());
    units[id] = ((r.json && r.json.cour) || []).map((u) => u.page_id);
  }

  // session pages: a few units of each course style (old fvplayer layout, link= layout, VA layout)
  const sample = [...new Set([1, 2, 10, 11, 12, 13, 14, 15].flatMap((c) => (units[c] || []).slice(0, 2)))];
  for (const u of sample) {
    await check(`dbm/Get_Sessionse_Points unit ${u}`, call('dynamicballmastery/Get_Sessionse_Points', { q: { id: u } }), any());
    await check(`dbm/Get_Sessionse_videos unit ${u}`, call('dynamicballmastery/Get_Sessionse_videos', { q: { id: u, type: 'dbm' } }), any());
  }

  // synthetic legacy WPBakery layouts (fixtures) for the branches current pages no longer use
  await check('dbm/Get_Sessionse_Points legacy <ul>\\n\\t layout', call('dynamicballmastery/Get_Sessionse_Points', { q: { id: fx.session_points_post } }), ok((j) => j.timeDesc.length === 1));
  await check('dbm/Get_Sessionse_videos legacy fvplayer sections', call('dynamicballmastery/Get_Sessionse_videos', { q: { id: fx.session_videos_post } }), ok((j) => j.video.length === 2));

  // completed sessions — written for the throwaway lvl1 user only (fixtures teardown removes the rows)
  const uid = sessions.nus_jsonapi_lvl1.id;
  const smallest = Object.entries(units).filter(([, l]) => l.length).sort((a, b) => a[1].length - b[1].length)[0];
  await check('dbm/Get_Completed_Sessions none', call('dynamicballmastery/Get_Completed_Sessions', { q: { user_id: uid } }), ok((j) => Array.isArray(j) || j.status === 'ok'));
  if (smallest) {
    const [course, list] = smallest;
    await check(`dbm/Insert_Completed_Sessions first unit (course ${course}, new user_courses row)`, call('dynamicballmastery/Insert_Completed_Sessions', { q: { user_id: uid, unit_id: list[0] } }), any());
    for (const u of list.slice(1)) {
      await check(`dbm/Insert_Completed_Sessions unit ${u} (update progress)`, call('dynamicballmastery/Insert_Completed_Sessions', { q: { user_id: uid, unit_id: u } }), any());
    }
  }
  await check('dbm/Get_Completed_Sessions all', call('dynamicballmastery/Get_Completed_Sessions', { q: { user_id: uid } }), any());
  await check('dbm/Get_Completed_Sessions last_sync', call('dynamicballmastery/Get_Completed_Sessions', { q: { user_id: uid, last_sync: '2020-01-01T00:00:00Z' } }), any());
  await check('dbm/Get_Completed_Sessions bad last_sync', call('dynamicballmastery/Get_Completed_Sessions', { q: { user_id: uid, last_sync: 'garbage' } }), any());
};
