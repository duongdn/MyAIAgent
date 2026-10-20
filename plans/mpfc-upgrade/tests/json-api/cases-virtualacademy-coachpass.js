// virtualacademy + coachpass controllers.
// manager = team-manager role + Virtual Academy bundle (fixtures); team = no bundles; member = Coach Pass.
const path = require('path');
module.exports = async ({ call, check, err, ok, bad, any, fx, dir, fixturesMode }) => {
  const media = path.join(dir, 'media');
  const VA = (as, extra = {}) => ({ as, wpCookie: true, ...extra });   // ?cookie= + WP cookie (current_user_can)
  const auth = ['virtualacademy/uploadVideo', 'virtualacademy/getUserVideo', 'virtualacademy/deleteVideo', 'virtualacademy/getPublicVideo'];
  for (const ep of auth) {
    await check(`${ep} no cookie`, call(ep), err(/cookie/));
    await check(`${ep} bad cookie`, call(ep, { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  }
  for (const ep of ['virtualacademy/addVideoComment', 'virtualacademy/editVideoComment', 'virtualacademy/deleteVideoComment']) {
    await check(`${ep} bad cookie`, call(ep, { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  }

  // ---- getVideo
  await check('va/getVideo no type', call('virtualacademy/getVideo', { as: 'manager' }), bad(/must be in/));
  await check('va/getVideo bad type', call('virtualacademy/getVideo', { as: 'manager', q: { type: 'nope' } }), bad(/must be in/));
  await check('va/getVideo no VA bundle -> 403', call('virtualacademy/getVideo', { as: 'team', q: { type: 'classroom' } }), bad(/permission/));
  await check('va/getVideo VA user', call('virtualacademy/getVideo', { as: 'manager', q: { type: 'classroom' } }), ok());
  await check('va/getVideo deprecated type alias', call('virtualacademy/getVideo', { as: 'manager', q: { type: 'player-of-the-month' } }), ok());

  // ---- upload / list / delete user VA videos
  const up = (form, files) => call('virtualacademy/uploadVideo', { as: 'manager', form, files });
  await check('va/uploadVideo no title', up({ name: ' ', add_to_lib: '0' }), bad(/Title is empty/));
  await check('va/uploadVideo no video file', up({ name: 'x', add_to_lib: '0' }), bad(/Wrong or empty video/));
  await check('va/uploadVideo wrong video type', up({ name: 'x', add_to_lib: '0' }, { file: path.join(media, 't.jpg') }), bad(/Wrong or empty video/));
  await check('va/uploadVideo no image', up({ name: 'x', add_to_lib: '0' }, { file: path.join(media, 't.mp4') }), bad(/Wrong or empty image/));
  await check('va/getUserVideo none yet', call('virtualacademy/getUserVideo', { as: 'manager' }), ok((j) => /No videos/.test(j.msg || '')));
  await check('va/uploadVideo private ok', up({ name: 'NUSTEST va private', add_to_lib: '0' }, { file: path.join(media, 't.mp4'), image: path.join(media, 't.jpg') }), ok((j) => j.response === 'SUCCESS'));
  await check('va/uploadVideo public ok', up({ name: 'NUSTEST va public', add_to_lib: '1' }, { file: path.join(media, 't.mp4'), image: path.join(media, 't.jpg') }), ok((j) => j.response === 'SUCCESS'));
  const mine = await check('va/getUserVideo list', call('virtualacademy/getUserVideo', { as: 'manager' }), ok((j) => j.video && j.video.length >= 2));
  await check('va/getUserVideo limit', call('virtualacademy/getUserVideo', { as: 'manager', form: { limit: '1' } }), ok((j) => j.video.length === 1));
  const vids = ((mine.json && mine.json.video) || []).map((v) => v.post);
  if (vids[0]) await check('dashboard/likeVideo VA video (likes meta)', call('dashboard/likeVideo', { as: 'member', form: { postId: String(vids[0]) } }), ok());
  await check('va/getPublicVideo', call('virtualacademy/getPublicVideo', { as: 'member' }), ok((j) => j.status === 200));
  await check('va/getPublicVideo limit', call('virtualacademy/getPublicVideo', { as: 'manager', form: { limit: '1' } }), ok());
  await check('va/deleteVideo invalid id', call('virtualacademy/deleteVideo', { as: 'manager', form: { videoId: '0' } }), err(/Invalid video ID/));
  await check('va/deleteVideo not mine', call('virtualacademy/deleteVideo', { as: 'member', form: { videoId: String(vids[0] || 1) } }), err(/Video not found/));

  // ---- comments (manager only)
  const vid = vids[0] || 1;
  await check('va/getVideoComments no video', call('virtualacademy/getVideoComments', { as: 'manager' }), bad(/Video not found/));
  await check('va/getVideoComments bad cookie', call('virtualacademy/getVideoComments', { q: { video_id: vid, cookie: 'bad' } }), err(/Invalid authentication/));
  await check('va/getVideoComments no VA -> 403', call('virtualacademy/getVideoComments', { as: 'team', q: { video_id: vid } }), bad(/permission/));
  await check('va/addVideoComment not manager', call('virtualacademy/addVideoComment', VA('member', { q: { video_id: vid }, form: { content: 'x' } })), bad(/does not have permission/));
  await check('va/addVideoComment no video', call('virtualacademy/addVideoComment', VA('manager', { form: { content: 'x' } })), bad(/Video not found/));
  await check('va/addVideoComment no content', call('virtualacademy/addVideoComment', VA('manager', { q: { video_id: vid }, form: { content: '' } })), bad(/Content is required/));
  const text = `NUSTEST comment ${Date.now()}`;
  const added = await check('va/addVideoComment ok', call('virtualacademy/addVideoComment', VA('manager', { q: { video_id: vid }, form: { content: text } })), ok((j) => j.status === 'success'));
  await check('va/addVideoComment duplicate', call('virtualacademy/addVideoComment', VA('manager', { q: { video_id: vid }, form: { content: text } })), bad(/Duplicate comment/));
  await check('va/getVideoComments ok', call('virtualacademy/getVideoComments', { as: 'manager', q: { video_id: vid, page: '1' } }), ok((j) => j.status === 'success'));
  const cid = added.json && added.json.comment && added.json.comment.comment_ID;
  await check('va/editVideoComment no id', call('virtualacademy/editVideoComment', VA('manager', { form: { content: 'y' } })), bad(/Comment not found/));
  await check('va/editVideoComment not manager', call('virtualacademy/editVideoComment', VA('member', { q: { comment_id: cid || 1 }, form: { content: 'y' } })), bad(/permission/));
  await check('va/editVideoComment no content', call('virtualacademy/editVideoComment', VA('manager', { q: { comment_id: cid || 1 }, form: { content: '' } })), bad(/Content is required/));
  await check('va/editVideoComment ok', call('virtualacademy/editVideoComment', VA('manager', { q: { comment_id: cid || 1 }, form: { content: text + ' edited' } })), ok((j) => j.status === 'success'));
  await check('va/editVideoComment same content', call('virtualacademy/editVideoComment', VA('manager', { q: { comment_id: cid || 1 }, form: { content: text + ' edited' } })), ok((j) => j.status === 'success'));
  await check('va/deleteVideoComment no id', call('virtualacademy/deleteVideoComment', VA('manager')), bad(/Comment not found/));
  await check('va/deleteVideoComment not manager', call('virtualacademy/deleteVideoComment', VA('member', { q: { comment_id: cid || 1 } })), bad(/permission/));

  // bundle-missing branches: temporarily rename the V.A bundle short_name (fixtures va-bundle-off/on)
  fixturesMode('va-bundle-off');
  try {
    await check('va/getVideo bundle missing -> 500', call('virtualacademy/getVideo', { as: 'manager', q: { type: 'classroom' } }), bad(/Bundle not found/));
    await check('va/getVideoComments bundle missing', call('virtualacademy/getVideoComments', { as: 'manager', q: { video_id: vid } }), bad(/Bundle not found/));
    await check('va/addVideoComment bundle missing', call('virtualacademy/addVideoComment', VA('manager', { q: { video_id: vid }, form: { content: text + ' b' } })), bad(/Bundle not found/));
    await check('va/editVideoComment bundle missing', call('virtualacademy/editVideoComment', VA('manager', { q: { comment_id: cid || 1 }, form: { content: 'z' } })), bad(/Bundle not found/));
    await check('va/deleteVideoComment bundle missing', call('virtualacademy/deleteVideoComment', VA('manager', { q: { comment_id: cid || 1 } })), bad(/Bundle not found/));
  } finally { fixturesMode('va-bundle-on'); }
  // manager loses VA -> 403 branches of add/edit/delete comment
  fixturesMode('va-manager-off');
  try {
    await check('va/addVideoComment no VA -> 403', call('virtualacademy/addVideoComment', VA('manager', { q: { video_id: vid }, form: { content: text + ' c' } })), bad(/permission to access virtual academy/));
    await check('va/editVideoComment no VA -> 403', call('virtualacademy/editVideoComment', VA('manager', { q: { comment_id: cid || 1 }, form: { content: 'z' } })), bad(/permission to access virtual academy/));
    await check('va/deleteVideoComment no VA -> 403', call('virtualacademy/deleteVideoComment', VA('manager', { q: { comment_id: cid || 1 } })), bad(/permission to access virtual academy/));
  } finally { fixturesMode('va-manager-on'); }
  await check('va/deleteVideoComment ok', call('virtualacademy/deleteVideoComment', VA('manager', { q: { comment_id: cid || 1 } })), ok((j) => j.status === 'success'));
  await check('va/editVideoComment deleted comment', call('virtualacademy/editVideoComment', VA('manager', { q: { comment_id: cid || 1 }, form: { content: 'q' } })), bad());
  for (const v of vids) await check(`va/deleteVideo own ${v}`, call('virtualacademy/deleteVideo', { as: 'manager', form: { videoId: String(v) } }), ok((j) => j.response === 'SUCCESS'));

  // ---- coachpass
  for (const ep of ['coach_corner', 'collection', 'remove_video_from_collection']) {
    await check(`coachpass/${ep} bad cookie`, call(`coachpass/${ep}`, { q: { cookie: 'bad' } }), err(/Invalid authentication/));
  }
  await check('coachpass/coach_corner', call('coachpass/coach_corner', { as: 'member' }), ok((j) => Array.isArray(j[0] || j)));
  await check('coachpass/coach_corner includeLocalVideo', call('coachpass/coach_corner', { as: 'member', q: { includeLocalVideo: '1' } }), ok());
  await check('coachpass/collection (filled + empty collection)', call('coachpass/collection', { as: 'member' }), ok((j) => j.result.length >= 2));
  const col = fx.collections || [];
  await check('coachpass/remove_video no collection_id', call('coachpass/remove_video_from_collection', { as: 'member' }), err(/collection_id/));
  await check('coachpass/remove_video no video_id', call('coachpass/remove_video_from_collection', { as: 'member', q: { collection_id: col[0] } }), err(/video_id/));
  await check('coachpass/remove_video foreign collection', call('coachpass/remove_video_from_collection', { as: 'team', q: { collection_id: col[0], video_id: '1' } }), err(/Collection not found/));
  await check('coachpass/remove_video ok', call('coachpass/remove_video_from_collection', { as: 'member', q: { collection_id: col[0], video_id: String(fx.collection_videos && fx.collection_videos[0]) } }), ok((j) => j.result === true));
};
