<?php
// UPGRADE-TEST ONLY: force payment gateways to test/sandbox mode and wipe live keys in the test DB copy.
global $wpdb;
$s = get_option("gravityformsaddon_gravityformsstripe_settings");
$s["api_mode"] = "test"; $s["live_secret_key"] = ""; $s["live_publishable_key"] = ""; unset($s["live_auth_token"]);
update_option("gravityformsaddon_gravityformsstripe_settings", $s);
foreach (["STRIPE" => ["testMode" => true, "liveAPIKey" => "", "livePublishableKey" => ""], "PAYPAL" => ["useSandbox" => true, "apiPassword" => "", "apiSignature" => "", "pdtIdentityToken" => ""]] as $tok => $patch) {
  $row = $wpdb->get_var($wpdb->prepare("select settings from mm_payment_services where token=%s", $tok));
  $cur = unserialize($row); foreach ($patch as $k => $v) $cur[$k] = $v;
  $wpdb->update("mm_payment_services", ["settings" => serialize($cur)], ["token" => $tok]);
}
$g = get_option("gravityformsaddon_gravityformsstripe_settings");
echo "GF api_mode=", $g["api_mode"], " live_key_empty=", ($g["live_secret_key"]==="" ? "yes":"no"), "\n";
foreach (["STRIPE","PAYPAL"] as $t) { $c = unserialize($wpdb->get_var("select settings from mm_payment_services where token=\"$t\"")); echo "$t testMode=", var_export($c["testMode"] ?? null, true), " sandbox=", var_export($c["useSandbox"] ?? null, true), " live_empty=", (empty($c["liveAPIKey"] ?? "x") || empty($c["apiPassword"] ?? "x") ? "yes":"no"), "\n"; }
