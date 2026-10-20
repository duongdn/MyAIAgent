#!/bin/bash
# Merge pcov dumps written by mu-plugin zz-upgrade-test-pcov.php on the TEST server and print json-api coverage.
# Usage: coverage.sh            -> % per file
#        coverage.sh lines      -> also list uncovered lines (file:line  code)
#        coverage.sh reset      -> delete collected dumps (start a clean run)
TEST_SSH="ssh -i $HOME/.ssh/carrick/id_rsa root@144.126.236.208"
case "${1:-}" in
  reset) $TEST_SSH 'rm -f /var/www/jsonapi-cov/*.json'; echo "coverage reset"; exit ;;
esac
$TEST_SSH "php -d memory_limit=1G -r '
\$m = [];
foreach (glob(\"/var/www/jsonapi-cov/*.json\") as \$f) {
  foreach (json_decode(file_get_contents(\$f), true) as \$file => \$lines)
    foreach (\$lines as \$l => \$hit) \$m[\$file][\$l] = max(\$m[\$file][\$l] ?? -1, \$hit);
}
ksort(\$m); \$T = \$H = 0; \$miss = [];
foreach (\$m as \$file => \$lines) {
  if (strpos(\$file, \"/controllers/\") === false) continue;   // target = endpoint code; library singletons/models reported apart
  \$t = count(\$lines); \$h = count(array_filter(\$lines, fn(\$v) => \$v > 0)); \$T += \$t; \$H += \$h;
  printf(\"%-48s %4d/%4d  %5.1f%%\n\", preg_replace(\"#.*/plugins/#\", \"\", \$file), \$h, \$t, 100 * \$h / max(1, \$t));
  \$src = file(\$file);
  foreach (\$lines as \$l => \$v) if (\$v <= 0) \$miss[] = sprintf(\"%s:%d  %s\", basename(\$file), \$l, trim(\$src[\$l - 1] ?? \"\"));
}
printf(\"TOTAL controllers %d/%d  %.1f%%\n\", \$H, \$T, 100 * \$H / max(1, \$T));
if (\"${1:-}\" === \"lines\") echo implode(PHP_EOL, \$miss), PHP_EOL;
'"
