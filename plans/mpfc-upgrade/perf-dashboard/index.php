<?php
/**
 * MPFC perf dashboard — New Relic-like request stats from apache_logs (no agent overhead).
 * Served at https://admin.mypersonalfootballcoach.com/perf/ (basic auth of the admin vhost).
 * DB credentials: /etc/mpfc-perf/config.php (not in git).
 */
require __DIR__ . '/perf-data.php';
$cfg = require '/etc/mpfc-perf/config.php';
header( 'Cache-Control: no-store' );

$ranges = [ '1h' => [ 3600, 60 ], '6h' => [ 21600, 300 ], '24h' => [ 86400, 900 ], '3d' => [ 259200, 3600 ], '7d' => [ 604800, 10800 ] ];
$range  = isset( $ranges[ $_GET['r'] ?? '' ] ) ? $_GET['r'] : '24h';
$kinds_all = [ 'page', 'api', 'ajax', 'rest', 'admin', 'xmlrpc', 'static', '404' ];
$kinds  = array_values( array_intersect( (array) ( $_GET['k'] ?? [ 'page', 'api', 'ajax', 'rest', 'admin' ] ), $kinds_all ) );
$slow   = max( 0.5, (float) ( $_GET['slow'] ?? 3 ) );
$excl   = array_filter( array_map( 'trim', explode( ',', $_GET['x'] ?? implode( ',', $cfg['exclude_ips'] ) ) ) );

$t0   = microtime( true );
$rows = perf_fetch_rows( perf_db( $cfg ), time() - $ranges[ $range ][0] );
$a    = perf_aggregate( $rows, [ 'bucket' => $ranges[ $range ][1], 'kinds' => $kinds, 'slow' => $slow, 'exclude_ips' => $excl ] );
$s    = $a['sum'];

$h   = fn( $v ) => htmlspecialchars( (string) $v, ENT_QUOTES );
$sec = fn( $v ) => number_format( $v, 2 ) . 's';
$vn  = fn( $ts ) => gmdate( 'd/m H:i', $ts + 7 * 3600 ); // show Vietnam time
$q   = fn( $over ) => '?' . http_build_query( array_merge( [ 'r' => $range, 'k' => $kinds, 'slow' => $slow, 'x' => implode( ',', $excl ) ], $over ) );
$chart = [
	'labels' => array_map( $vn, array_keys( $a['series'] ) ),
	'avg'    => array_map( fn( $x ) => round( $x['avg'], 2 ), array_values( $a['series'] ) ),
	'p95'    => array_map( fn( $x ) => round( $x['p95'], 2 ), array_values( $a['series'] ) ),
	'rpm'    => array_map( fn( $x ) => round( $x['n'] / ( $ranges[ $range ][1] / 60 ), 1 ), array_values( $a['series'] ) ),
];
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>MPFC Performance</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
:root{--bg:#f6f7f9;--card:#fff;--ink:#1d2330;--mute:#6b7383;--line:#e3e6eb;--acc:#2563eb;--bad:#dc2626;--warn:#d97706}
body{margin:0;font:14px/1.45 system-ui,sans-serif;background:var(--bg);color:var(--ink)}
main{max-width:1280px;margin:0 auto;padding:16px}
h1{font-size:20px;margin:0 0 12px} h2{font-size:15px;margin:0 0 8px}
form{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:14px}
form a{padding:4px 10px;border:1px solid var(--line);border-radius:6px;text-decoration:none;color:var(--ink);background:var(--card)}
form a.on{background:var(--acc);color:#fff;border-color:var(--acc)}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:12px}
.kpi b{display:block;font-size:22px} .kpi span{color:var(--mute);font-size:12px}
.grid{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:14px} @media(max-width:900px){.grid{grid-template-columns:1fr}}
table{width:100%;border-collapse:collapse;font-size:13px} th,td{padding:5px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
th{color:var(--mute);font-weight:600} td.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.wrap{overflow-x:auto} .route{word-break:break-all} .bad{color:var(--bad);font-weight:600} .warn{color:var(--warn)}
.tag{font-size:11px;padding:1px 6px;border-radius:9px;background:#eef2ff;color:#3730a3} small{color:var(--mute)}
</style></head><body><main>
<h1>MPFC Performance <small>(origin requests, Cloudflare-cached hits not included · times in VN)</small></h1>
<form method="get">
	<?php foreach ( $ranges as $k => $_ ) : ?><a class="<?= $k === $range ? 'on' : '' ?>" href="<?= $h( $q( [ 'r' => $k ] ) ) ?>"><?= $k ?></a><?php endforeach; ?>
	<input type="hidden" name="r" value="<?= $h( $range ) ?>">
	<span><?php foreach ( $kinds_all as $k ) : ?><label><input type="checkbox" name="k[]" value="<?= $k ?>" <?= in_array( $k, $kinds, true ) ? 'checked' : '' ?>><?= $k ?></label> <?php endforeach; ?></span>
	<label>slow ≥ <input name="slow" value="<?= $h( $slow ) ?>" size="3">s</label>
	<label>exclude IPs <input name="x" value="<?= $h( implode( ',', $excl ) ) ?>" size="30"></label>
	<button>Apply</button>
</form>

<div class="kpis">
	<div class="card kpi"><span>Requests</span><b><?= number_format( $s['n'] ) ?></b></div>
	<div class="card kpi"><span>Avg</span><b><?= $sec( $s['avg'] ) ?></b></div>
	<div class="card kpi"><span>p50</span><b><?= $sec( $s['p50'] ) ?></b></div>
	<div class="card kpi"><span>p95</span><b><?= $sec( $s['p95'] ) ?></b></div>
	<div class="card kpi"><span>Slow (≥<?= $slow ?>s)</span><b class="<?= $s['slow_n'] ? 'warn' : '' ?>"><?= number_format( $s['slow_n'] ) ?> <small><?= $s['n'] ? round( 100 * $s['slow_n'] / $s['n'], 1 ) : 0 ?>%</small></b></div>
	<div class="card kpi"><span>Status</span><b style="font-size:14px"><?php foreach ( $a['status'] as $k => $v ) echo $h( "$k: $v" ), '<br>'; ?></b></div>
</div>

<div class="grid">
	<div class="card"><h2>Response time &amp; throughput</h2><canvas id="c" height="110"></canvas></div>
	<div class="card wrap"><h2>Top IPs by total server time</h2><table>
		<tr><th>IP</th><th class="n">time</th></tr>
		<?php foreach ( $a['ips'] as $ip => $t ) : ?><tr><td><?= $h( $ip ) ?></td><td class="n"><?= $sec( $t ) ?></td></tr><?php endforeach; ?>
	</table></div>
</div>

<div class="card wrap" style="margin-bottom:14px"><h2>Transactions (by total time — like New Relic "most time consuming")</h2><table>
	<tr><th>Route</th><th>type</th><th class="n">count</th><th class="n">% time</th><th class="n">avg</th><th class="n">p50</th><th class="n">p95</th><th class="n">max</th></tr>
	<?php foreach ( array_slice( $a['groups'], 0, 40, true ) as $route => $g ) : ?>
	<tr><td class="route"><?= $h( $route ) ?></td><td><span class="tag"><?= $h( $g['kind'] ) ?></span></td><td class="n"><?= $g['n'] ?></td>
		<td class="n"><?= $s['total'] ? round( 100 * $g['total'] / $s['total'], 1 ) : 0 ?>%</td><td class="n <?= $g['avg'] >= $slow ? 'bad' : '' ?>"><?= $sec( $g['avg'] ) ?></td>
		<td class="n"><?= $sec( $g['p50'] ) ?></td><td class="n"><?= $sec( $g['p95'] ) ?></td><td class="n"><?= $sec( $g['max'] ) ?></td></tr>
	<?php endforeach; ?>
</table></div>

<div class="card wrap"><h2>Slow requests (≥<?= $slow ?>s, slowest 100)</h2><table>
	<tr><th>Time</th><th class="n">sec</th><th>status</th><th>Request</th><th>IP</th><th>User agent</th></tr>
	<?php foreach ( $a['slow'] as $r ) : ?>
	<tr><td class="n"><?= $vn( (int) $r['ts'] ) ?></td><td class="n bad"><?= $sec( $r['sec'] ) ?></td><td><?= (int) $r['s'] ?></td>
		<td class="route"><?= $h( $r['u'] ) ?></td><td><?= $h( $r['ip'] ) ?></td><td><small><?= $h( mb_substr( (string) $r['ua'], 0, 60 ) ) ?></small></td></tr>
	<?php endforeach; ?>
</table></div>
<p><small><?= number_format( count( $rows ) ) ?> rows scanned in <?= round( microtime( true ) - $t0, 2 ) ?>s</small></p>
</main>
<script>
const d = <?= json_encode( $chart ) ?>;
new Chart(document.getElementById('c'), { data: { labels: d.labels, datasets: [
	{ type: 'line', label: 'avg (s)', data: d.avg, borderColor: '#2563eb', yAxisID: 'y', pointRadius: 0, tension: .2 },
	{ type: 'line', label: 'p95 (s)', data: d.p95, borderColor: '#dc2626', yAxisID: 'y', pointRadius: 0, tension: .2 },
	{ type: 'bar', label: 'req/min', data: d.rpm, backgroundColor: 'rgba(100,116,139,.25)', yAxisID: 'y1' } ] },
	options: { interaction: { mode: 'index', intersect: false }, scales: { y: { beginAtZero: true, title: { display: true, text: 'seconds' } },
		y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'req/min' } } } } });
</script>
</body></html>
