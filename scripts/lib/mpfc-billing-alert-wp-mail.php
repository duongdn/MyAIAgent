<?php
// Run via: wp --path=<mpfc WP root> eval-file scripts/lib/mpfc-billing-alert-wp-mail.php < {"to","title","body"}
// Sends a billing-monitor alert through the live site's wp_mail (same mailer as the stuck-rebill fixer).
$m = json_decode(file_get_contents('php://stdin'), true);
$ok = wp_mail($m['to'], $m['title'], $m['body'], ['From: MPFC Billing Monitor <' . $m['to'] . '>']);
echo $ok ? 'MAIL_OK' : 'MAIL_FAIL';
