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

$out['post'] = $post;
$out['units'] = array_map('intval', $units);
echo json_encode($out), "\n";
