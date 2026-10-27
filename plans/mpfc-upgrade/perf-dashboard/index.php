<?php
/**
 * MPFC perf dashboard — New Relic-like request stats from apache_logs (no agent overhead).
 * Served at https://admin.mypersonalfootballcoach.com/perf/ (basic auth of the admin vhost).
 * DB credentials: /etc/mpfc-perf/config.php (not in git).
 */
require __DIR__ . '/perf-data.php';
$cfg = require '/etc/mpfc-perf/config.php';
header( 'Cache-Control: no-store' );
ini_set( 'memory_limit', '512M' ); // 7d keeps ~400k float timings in memory for percentiles
set_time_limit( 120 );

$ranges = [ '1h' => [ 3600, 60 ], '6h' => [ 21600, 300 ], '24h' => [ 86400, 900 ], '3d' => [ 259200, 3600 ], '7d' => [ 604800, 10800 ] ];
$range  = isset( $ranges[ $_GET['r'] ?? '' ] ) ? $_GET['r'] : '24h';
$kinds_all = [ 'page', 'api', 'ajax', 'rest', 'admin', 'xmlrpc', 'static', '404' ];
$kinds  = array_values( array_intersect( (array) ( $_GET['k'] ?? [ 'page', 'api', 'ajax', 'rest', 'admin' ] ), $kinds_all ) );
$slow   = max( 0.5, (float) ( $_GET['slow'] ?? 3 ) );
$excl   = array_filter( array_map( 'trim', explode( ',', $_GET['x'] ?? implode( ',', $cfg['exclude_ips'] ) ) ) );

$t0   = microtime( true );
$rows = perf_fetch_rows( perf_db( $cfg ), time() - $ranges[ $range ][0] );
$h   = fn( $v ) => htmlspecialchars( (string) $v, ENT_QUOTES );
$sec = fn( $v ) => number_format( $v, 2 ) . 's';
$vn  = fn( $ts ) => gmdate( 'd/m H:i:s', $ts + 7 * 3600 ); // show Vietnam time
$q   = fn( $over ) => '?' . http_build_query( array_merge( [ 'r' => $range, 'k' => $kinds, 'slow' => $slow, 'x' => implode( ',', $excl ) ], $over ) );
$detail = fn( $route ) => $q( [ 'route' => $route ] );
if ( isset( $_GET['route'] ) ) { require __DIR__ . '/perf-route-detail-view.php'; exit; }
$a    = perf_aggregate( $rows, [ 'bucket' => $ranges[ $range ][1], 'kinds' => $kinds, 'slow' => $slow, 'exclude_ips' => $excl ] );
$s    = $a['sum'];

$chart = [
	'labels' => array_map( fn( $ts ) => gmdate( 'd/m H:i', $ts + 7 * 3600 ), array_keys( $a['series'] ) ),
	'avg'    => array_map( fn( $x ) => round( $x['avg'], 2 ), array_values( $a['series'] ) ),
	'p95'    => array_map( fn( $x ) => round( $x['p95'], 2 ), array_values( $a['series'] ) ),
	'rpm'    => array_map( fn( $x ) => round( $x['n'] / ( $ranges[ $range ][1] / 60 ), 1 ), array_values( $a['series'] ) ),
];
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>MPFC Performance</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<link rel="stylesheet" href="perf-style.css"></head><body><main>
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

<div class="card wrap" style="margin-bottom:14px"><h2>Transactions (by total time — like New Relic "most time consuming") <small>· click a route for details</small></h2><table>
	<tr><th>Route</th><th>type</th><th class="n">count</th><th class="n">% time</th><th class="n">avg</th><th class="n">p50</th><th class="n">p95</th><th class="n">max</th></tr>
	<?php foreach ( array_slice( $a['groups'], 0, 40, true ) as $route => $g ) : ?>
	<tr><td class="route"><a href="<?= $h( $detail( $route ) ) ?>"><?= $h( $route ) ?></a></td><td><span class="tag"><?= $h( $g['kind'] ) ?></span></td><td class="n"><?= $g['n'] ?></td>
		<td class="n"><?= $s['total'] ? round( 100 * $g['total'] / $s['total'], 1 ) : 0 ?>%</td><td class="n <?= $g['avg'] >= $slow ? 'bad' : '' ?>"><?= $sec( $g['avg'] ) ?></td>
		<td class="n"><?= $sec( $g['p50'] ) ?></td><td class="n"><?= $sec( $g['p95'] ) ?></td><td class="n"><?= $sec( $g['max'] ) ?></td></tr>
	<?php endforeach; ?>
</table></div>

<div class="card wrap"><h2>Slow requests (≥<?= $slow ?>s, slowest 100)</h2><table>
	<tr><th>Time</th><th class="n">sec</th><th>status</th><th>Request</th><th>IP</th><th>User agent</th></tr>
	<?php foreach ( $a['slow'] as $r ) : ?>
	<tr><td class="n"><?= $vn( (int) $r['ts'] ) ?></td><td class="n bad"><?= $sec( $r['sec'] ) ?></td><td><?= (int) $r['s'] ?></td>
		<td class="route"><?php [ $rm, $rr ] = perf_route( (string) $r['u'], (int) $r['s'] ); ?><a href="<?= $h( $detail( "$rm $rr" ) ) ?>"><?= $h( $r['u'] ) ?></a><?php if ( $r['ref'] ) : ?><br><small>ref: <?= $h( $r['ref'] ) ?></small><?php endif; ?></td><td><?= $h( $r['ip'] ) ?></td><td><small><?= $h( mb_substr( (string) $r['ua'], 0, 60 ) ) ?></small></td></tr>
	<?php endforeach; ?>
</table></div>
<p><small><?= number_format( $a['scanned'] ) ?> rows scanned in <?= round( microtime( true ) - $t0, 2 ) ?>s</small></p>
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
