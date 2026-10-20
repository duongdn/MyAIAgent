<?php
/**
 * Test fixtures for the json-api endpoint tests — TEST server DB only (wp_mpfc_upgrade).
 * Run: wp eval-file fixtures.php setup|teardown   (as www-data in the site root)
 * setup prints JSON: extra users (id + auth cookie) and fixture ids the cases need.
 * Everything created is tagged "NUSTEST" / nus_jsonapi_* so teardown removes exactly that.
 */
if (strpos(DB_NAME, 'upgrade') === false) { fwrite(STDERR, "refusing: not the upgrade test DB\n"); exit(1); }
global $wpdb;
$mode = $args[0] ?? 'setup';
$id = fn($login) => (int) $wpdb->get_var($wpdb->prepare("SELECT ID FROM {$wpdb->users} WHERE user_login = %s", $login));
$member = $id('nus_upgrade_member'); $team = $id('nus_upgrade_team'); $manager = $id('nus_upgrade_manager'); $admin = $id('nus_upgrade_admin');
$extra = ['nus_jsonapi_lvl1' => 1, 'nus_jsonapi_lvl2' => 2, 'nus_jsonapi_nomm' => null];

function nus_teardown($ids, $extra) {
    global $wpdb;
    require_once ABSPATH . 'wp-admin/includes/user.php';
    foreach (array_keys($extra) as $login) {
        $u = get_user_by('login', $login);
        if (!$u) continue;
        foreach (['wp_wpcw_user_progress' => 'user_id', 'wp_wpcw_user_courses' => 'user_id', 'wp_wpcw_units_time' => 'user_id',
                  'mm_app_usage' => 'wp_user_id', 'mm_app_usage_logs' => 'wp_user_id', 'mm_app_log_events' => 'wp_user_id', 'mm_user_data' => 'wp_user_id'] as $t => $col) {
            $wpdb->delete($t, [$col => $u->ID]);
        }
        wp_delete_user($u->ID);
    }
    $wpdb->query("DELETE FROM {$wpdb->prefix}mpfc_leagues WHERE name LIKE 'NUSTEST%'");
    $wpdb->query("DELETE FROM mm_applied_bundles WHERE bundle_id = 999999");
    foreach ($wpdb->get_col("SELECT ID FROM {$wpdb->posts} WHERE post_title LIKE 'NUSTEST%' AND post_type = 'post'") as $p) wp_delete_post($p, true);
    $orig = get_option('nus_test_page247_backup');
    if ($orig !== false) { $wpdb->update($wpdb->posts, ['post_content' => $orig], ['ID' => 247]); delete_option('nus_test_page247_backup'); clean_post_cache(247); }
    foreach ($wpdb->get_col("SELECT ID FROM {$wpdb->users} WHERE user_login LIKE 'nus.jsonapi.%@example.com'") as $uid) {
        $wpdb->delete('mm_user_data', ['wp_user_id' => $uid]); wp_delete_user($uid);
    }
    $in = implode(',', array_map('intval', $ids));
    $wpdb->query("DELETE FROM mm_notifications WHERE wp_user_id IN ($in)");
    $wpdb->query("DELETE FROM wp_wpcw_units_plan WHERE user_id IN ($in)");
    $wpdb->query("DELETE FROM mm_app_usage WHERE wp_user_id IN ($in)");
    $wpdb->query("DELETE FROM user_favourite_video WHERE user_id IN ($in)");
    $wpdb->query("DELETE FROM {$wpdb->prefix}mpfc_player_xp_log WHERE player_id IN ($in)");
    $wpdb->query("DELETE FROM wp_wpcw_units_time WHERE user_id IN ($in)");
    $wpdb->query("UPDATE {$wpdb->users} SET achievements = NULL WHERE ID IN ($in)");
    $wpdb->query("DELETE FROM mm_applied_bundles WHERE access_type='user' AND access_type_id = " . (int) $ids['manager'] . " AND bundle_id = 23");
    delete_user_meta($ids['team'], 'mpfc_hidden_from_tables');
    $wpdb->query("DELETE FROM wp_idp_targets WHERE player_id IN ($in) AND assigned_by IS NULL");
    foreach (['mpfc_age_band', 'mpfc_position'] as $k) delete_user_meta($ids['member'], $k);
    delete_option('mpfc_idp_flags'); delete_option('mpfc_lt_flags');
    $wpdb->query("UPDATE mm_bundles SET short_name = 'V.A' WHERE id = 23");
    foreach (get_posts(['post_type' => 'collections', 'author' => $ids['member'], 'post_status' => 'any', 'numberposts' => -1, 'fields' => 'ids']) as $c) wp_delete_post($c, true);
}

// endpoint result caches: cleared so the first call takes the "build" path (the next call hits the cache)
function nus_clear_caches() {
    foreach (['1v1-skill-library_v2', 'featured_practice', 'Ask_the_coach', 'arsenal-skill-library', 'arsenal-featured-practice',
              'arsenal-ask-the-coach', 'player_of_the_week_cache', 'player_of_the_week_cache_v2_9', 'coach-pass-videos-cache'] as $opt) {
        delete_option($opt);
    }
}
if ($mode === 'clear-caches') { nus_clear_caches(); echo "caches cleared\n"; return; }

// toggles used mid-run by the cases (bundle-missing / bundle-lost branches)
$toggles = [
    'va-bundle-off'  => "UPDATE mm_bundles SET short_name = 'V.A-NUSOFF' WHERE id = 23",
    'va-bundle-on'   => "UPDATE mm_bundles SET short_name = 'V.A' WHERE id = 23",
    'va-manager-off' => "UPDATE mm_applied_bundles SET status = 0 WHERE access_type = 'user' AND access_type_id = $manager AND bundle_id = 23",
    'va-manager-on'  => "UPDATE mm_applied_bundles SET status = 1 WHERE access_type = 'user' AND access_type_id = $manager AND bundle_id = 23",
];
// a registered throwaway user gets a bundle MM cannot cancel -> user/delete must refuse (keeps the account)
if ($mode === 'bogus-bundle') {
    $wpdb->insert('mm_applied_bundles', ['bundle_id' => 999999, 'access_type' => 'user', 'access_type_id' => (int) $args[1], 'status' => 1, 'apply_date' => current_time('mysql')]);
    echo "bogus bundle added\n"; return;
}
// member achievements back to the fixture state (otherpages/store_web_usage overwrites them)
if ($mode === 'member-achievements') {
    $wpdb->update($wpdb->users, ['achievements' => json_encode(['first_training' => 1, '20_m_training' => true, 'x_day_in_row' => 3,
        'x_day_training' => 5, 'uploaded_video' => true, 'player_of_week' => true, 'training_count' => 4])], ['ID' => $member]);
    echo "achievements reset\n"; return;
}
// fresh auth cookie for a user (after setPassword invalidates the old one)
if ($mode === 'cookie') {
    $u = get_user_by('login', $args[1]);
    echo json_encode(['cookie' => wp_generate_auth_cookie($u->ID, time() + 7200, 'logged_in')]), "\n"; return;
}
if (isset($toggles[$mode])) { $wpdb->query($toggles[$mode]); echo "$mode done\n"; return; }

if ($mode === 'teardown') { nus_teardown(compact('member', 'team', 'manager', 'admin'), $extra); echo "teardown done\n"; return; }

nus_teardown(compact('member', 'team', 'manager', 'admin'), $extra);   // start clean every run
$now = current_time('mysql');

// flags: IDP + League Tables on for club 9 (MPFC Demo) and 1; club 2 left off for the 403 paths
update_option('mpfc_idp_flags', ['all' => false, 'clubs' => [9]]);
update_option('mpfc_lt_flags', ['all' => false, 'clubs' => [9, 1]]);

// extra users: level 1 (LT fallback club-wide), level 2 (LT/IDP disabled club), no MM row
$out = ['users' => []];
foreach ($extra as $login => $level) {
    $uid = wp_create_user($login, wp_generate_password(24), "$login@example.com");
    if ($level !== null) {
        $wpdb->insert('mm_user_data', ['wp_user_id' => $uid, 'membership_level_id' => $level, 'status' => 1, 'first_name' => 'Nus', 'last_name' => 'Test']);
    }
    $out['users'][$login] = ['id' => $uid, 'cookie' => wp_generate_auth_cookie($uid, time() + 7200, 'logged_in')];
}
foreach (['admin' => $admin, 'member' => $member, 'team' => $team, 'manager' => $manager] as $k => $uid) {
    $out['users'][$k] = ['id' => $uid, 'cookie' => wp_generate_auth_cookie($uid, time() + 7200, 'logged_in')];
}

// manager gets Virtual Academy (bundle 23) so the VA comment endpoints pass the bundle gate
$wpdb->insert('mm_applied_bundles', ['bundle_id' => 23, 'access_type' => 'user', 'access_type_id' => $manager, 'status' => 1, 'apply_date' => $now]);

// league tables: member in an active league + a below_minimum one; team hidden; archived club-wide for club 1
$league = fn($club, $name, $ids, $wide, $status) => $wpdb->insert("{$wpdb->prefix}mpfc_leagues",
    ['club_id' => $club, 'name' => $name, 'fill_type' => 'hand_picked', 'filters' => '{}', 'member_ids' => json_encode($ids), 'is_club_wide' => $wide, 'status' => $status]);
$league(9, 'NUSTEST active', [$member, $team], 0, 'active');
$league(9, 'NUSTEST team only', [$team], 0, 'active');
$league(9, 'NUSTEST below min', [$member], 0, 'below_minimum');
$league(1, 'NUSTEST club-wide archived', [], 1, 'archived');
update_user_meta($team, 'mpfc_hidden_from_tables', 1);
$wpdb->insert("{$wpdb->prefix}mpfc_player_xp_log", ['player_id' => $member, 'session_id' => 'nus-fixture', 'skill_tags' => '[]', 'xp_earned' => 30, 'completed_at' => gmdate('Y-m-d H:i:s')]);

// notifications of every type (+ ones pointing at missing terms/courses/posts for the empty-lookup branches)
$term = (int) $wpdb->get_var("SELECT term_id FROM {$wpdb->terms} LIMIT 1");
$post = (int) $wpdb->get_var("SELECT ID FROM {$wpdb->posts} WHERE post_type='page' AND post_status='publish' LIMIT 1");
$n = fn($type, $extraCols) => $wpdb->insert('mm_notifications', array_merge(['wp_user_id' => $member, 'notification_type' => $type, 'is_read' => 0, 'date_added' => $now], $extraCols)) ? $wpdb->insert_id : 0;
$out['notifications'] = [
    $n('new_video', ['category_id' => $term, 'video_id' => $post]),
    $n('new_video', ['category_id' => 999999999, 'video_id' => 1]),
    $n('new_course_plan', ['category_id' => '1', 'course_id' => 1, 'page_id' => $post, 'start_date' => date('Y-m-d')]),
    $n('new_course_plan', ['category_id' => '1', 'course_id' => 999999, 'page_id' => 999999999, 'start_date' => date('Y-m-d')]),
    $n('new_video_plan', ['category_id' => $term, 'video_id' => $post, 'start_date' => date('Y-m-d')]),
    $n('new_video_plan', ['category_id' => 999999999, 'video_id' => 999999999, 'start_date' => date('Y-m-d')]),
    $n('new_trophy', ['new_trophy' => 'first_training']),
    $n('other', []),
];

// weekly plan this week: each course branch + a term + a missing unit
$monday = date('l') === 'Monday' ? date('Y-m-d') : date('Y-m-d', strtotime('last Monday'));
$units = $wpdb->get_col("SELECT unit_id FROM wp_wpcw_units_meta WHERE parent_course_id IN (1,10,11,12) LIMIT 4");
foreach ([10, 11, 1, 12, 120] as $i => $course) {
    $wpdb->insert('wp_wpcw_units_plan', ['user_id' => $member, 'course' => $course, 'units' => ($units[$i % max(1, count($units))] ?? $post) . '-999999999', 'start' => $monday, 'click' => 0]);
}

// app usage rows (today + older) for the statistic / leaderboard loops
foreach ([0, 3, 20, 100, 400] as $daysAgo) {
    $wpdb->insert('mm_app_usage', ['wp_user_id' => $member, 'usage_date' => date('Y-m-d', strtotime("-$daysAgo days")), 'duration' => 600, 'membership_id' => 9, 'user_name' => 'nus', 'date_added' => $now]);
}

// trophies: member has achievements + training time today (leaderboard rank); team has none (else branches)
$wpdb->update($wpdb->users, ['achievements' => json_encode(['first_training' => 1, '20_m_training' => true, 'x_day_in_row' => 3,
    'x_day_training' => 5, 'uploaded_video' => true, 'player_of_week' => true, 'training_count' => 4])], ['ID' => $member]);
$unit0 = $units[0] ?? 0;
$wpdb->insert('wp_wpcw_units_time', ['user_id' => $member, 'unit_id' => $unit0, 'timer' => 99999, 'created' => time() - 60]);
$wpdb->insert('wp_wpcw_units_time', ['user_id' => $member, 'unit_id' => $unit0, 'timer' => 30, 'created' => strtotime('-2 days')]);

// store_web_usage streak: lvl1 user trained yesterday on its dashboard page and has a 2-day streak
$lvl1 = $out['users']['nus_jsonapi_lvl1']['id'];
$page1 = (int) $wpdb->get_var("SELECT page_id FROM mm_core_pages WHERE ref_id = 1 LIMIT 1");
$wpdb->insert('wp_wpcw_units_time', ['user_id' => $lvl1, 'unit_id' => $page1, 'timer' => 10, 'created' => strtotime('yesterday') + 3600]);
$wpdb->update($wpdb->users, ['achievements' => json_encode(['x_day_in_row' => 2])], ['ID' => $lvl1]);

nus_clear_caches();

// coach pass collections owned by member: one with videos, one empty
$cv = get_posts(['post_type' => 'video', 'post_status' => 'publish', 'numberposts' => 2, 'fields' => 'ids']);
$out['collection_videos'] = array_map('intval', $cv);
$out['collections'] = [];
foreach (['NUSTEST collection' => implode(',', $cv), 'NUSTEST empty collection' => ''] as $title => $ids) {
    $c = wp_insert_post(['post_type' => 'collections', 'post_title' => $title, 'post_status' => 'publish', 'post_author' => $member]);
    update_post_meta($c, 'ph_collected_posts', $ids);
    $out['collections'][] = $c;
}

// legacy WPBakery layouts the old parsers expect (current pages are Elementor): synthetic posts + temporary page 247
$out['session_points_post'] = wp_insert_post(['post_type' => 'post', 'post_status' => 'draft', 'post_title' => 'NUSTEST session points',
    'post_content' => "title=\"Session\" title=\"Points\" <li>Point one</li><li>Point two</li> [x value=\"10\"] <ul>\n\t[y title=\"Warm up\"]\n<h2 style=\"text-align: center;\">Part 2</h2>"]);
$out['session_videos_post'] = wp_insert_post(['post_type' => 'post', 'post_status' => 'draft', 'post_title' => 'NUSTEST session videos',
    'post_content' => "intro\n<h2 style=\"text-align: center;\">Drill A</h2>[fvplayer src=\"https://vimeo.com/111\"]<h3>Suggested</h3><h3>Tips</h3><ul><li style=\"text-align: left;\">5 min<br>x</li></ul><ul><li>tip<br>y</li></ul>[vc_column_text]raw\ntext[/vc_column_text]"
        . "\n<h2 style=\"text-align: center;\">Drill B</h2>[other]<h3>S</h3><ul><li>a</li></ul><ul><li>b</li></ul>"]);
if (get_option('nus_test_page247_backup') === false) add_option('nus_test_page247_backup', $wpdb->get_var("SELECT post_content FROM {$wpdb->posts} WHERE ID = 247"), '', 'no');
$wpdb->update($wpdb->posts, ['post_content' =>
    "[vc_single_image image=\"11\"]\r\n<h3>Sub head</h3>\r\nDesc one\r\n\r\nDesc two\r\n\r\nDesc three[/vc_column_text][dt_gap height=\"10\"]"
    . "[vc_single_image image=\"12\"]"
    . "[vc_single_image image=\"13\"]<h3>Player One</h3><em>U12</em><blockquote>Great <a href=\"https://example.com\" target=\"_blank\">story</a>\r\n\r\n\r\nPlayer One Sr</blockquote>"
    . "[vc_single_image image=\"12\"]<h3>Player Two</h3><em>U14</em><blockquote>Plain story\r\n\r\n\r\nPlayer Two Sr</blockquote>"], ['ID' => 247]);
clean_post_cache(247);

// leaderboards: lvl2 user has only a last name (name fallback) and big totals; lvl1 has <60s app usage (skipped row)
$lvl2 = $out['users']['nus_jsonapi_lvl2']['id'];
$wpdb->update('mm_user_data', ['first_name' => '', 'last_name' => 'Lastonly'], ['wp_user_id' => $lvl2]);
$wpdb->insert('mm_app_usage', ['wp_user_id' => $lvl2, 'usage_date' => date('Y-m-d'), 'duration' => 99999, 'membership_id' => 2, 'user_name' => 'nus', 'date_added' => $now]);
$wpdb->insert('wp_wpcw_units_time', ['user_id' => $lvl2, 'unit_id' => 1, 'timer' => 99999, 'created' => time() - 60]);
$wpdb->insert('mm_app_usage', ['wp_user_id' => $lvl1, 'usage_date' => date('Y-m-d', strtotime('-3 days')), 'duration' => 30, 'membership_id' => 1, 'user_name' => 'nus', 'date_added' => $now]);

$out['post'] = $post;
$out['units'] = array_map('intval', $units);
echo json_encode($out), "\n";
