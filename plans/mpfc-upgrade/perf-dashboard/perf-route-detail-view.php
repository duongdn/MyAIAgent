<?php
/**
 * Route detail page (included by index.php when ?route= is set): timings, histogram, status codes,
 * IPs / user agents / referers by server time, and the slowest requests with every apache_logs field.
 * Uses $rows, $range, $ranges, $excl, $h, $sec, $vn, $q, $t0 from index.php.
 */
$route = (string) $_GET['route'];
$d     = perf_route_detail( $rows, [ 'bucket' => $ranges[ $range ][1], 'exclude_ips' => $excl ], $route );
$s     = $d['sum'];
$chart = [
	'labels' => array_map( fn( $ts ) => gmdate( 'd/m H:i', $ts + 7 * 3600 ), array_keys( $d['series'] ) ),
	'avg'    => array_map( fn( $x ) => round( $x['avg'], 2 ), array_values( $d['series'] ) ),
	'p95'    => array_map( fn( $x ) => round( $x['p95'], 2 ), array_values( $d['series'] ) ),
	'n'      => array_map( fn( $x ) => $x['n'], array_values( $d['series'] ) ),
];
$table = function ( string $title, array $rows ) use ( $h, $sec ) { ?>
	<div class="card wrap"><h2><?= $h( $title ) ?></h2><table>
		<tr><th></th><th class="n">req</th><th class="n">time</th><th class="n">avg</th></tr>
		<?php foreach ( $rows as $k => $v ) : ?><tr><td class="route"><small><?= $h( $k ) ?></small></td><td class="n"><?= $v['n'] ?></td>
			<td class="n"><?= $sec( $v['t'] ) ?></td><td class="n"><?= $sec( $v['t'] / $v['n'] ) ?></td></tr><?php endforeach; ?>
	</table></div>
<?php };
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>MPFC Route Detail</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<link rel="stylesheet" href="perf-style.css"></head><body><main>
<p><a class="btn" href="<?= $h( $q( [] ) ) ?>">← back</a></p>
<h1 class="route"><?= $h( $route ) ?> <small>· last <?= $h( $range ) ?> · times in VN</small></h1>
<form method="get"><?php foreach ( $ranges as $k => $_ ) : ?><a class="<?= $k === $range ? 'on' : '' ?>" href="<?= $h( $q( [ 'r' => $k, 'route' => $route ] ) ) ?>"><?= $k ?></a><?php endforeach; ?></form>

<div class="kpis">
	<div class="card kpi"><span>Requests</span><b><?= number_format( $s['n'] ) ?></b></div>
	<div class="card kpi"><span>Avg</span><b><?= $sec( $s['avg'] ) ?></b></div>
	<div class="card kpi"><span>p50</span><b><?= $sec( $s['p50'] ) ?></b></div>
	<div class="card kpi"><span>p95</span><b><?= $sec( $s['p95'] ) ?></b></div>
	<div class="card kpi"><span>Max</span><b><?= $sec( $s['max'] ) ?></b></div>
	<div class="card kpi"><span>Status codes</span><b style="font-size:14px"><?php foreach ( $d['status'] as $k => $v ) echo $h( "$k: $v" ), '<br>'; ?></b></div>
</div>

<div class="grid">
	<div class="card"><h2>Response time over time</h2><canvas id="c" height="110"></canvas></div>
	<div class="card"><h2>Response time distribution</h2><canvas id="hist" height="160"></canvas></div>
</div>

<div class="grid3">
	<?php $table( 'IPs (by server time)', $d['ips'] ); $table( 'User agents', $d['uas'] ); $table( 'Referers', $d['refs'] ); ?>
</div>

<div class="card wrap"><h2>Slowest requests (top 100) <small>· click a row for all fields</small></h2><table>
	<tr><th>Time (VN)</th><th class="n">sec</th><th>status</th><th>Request</th><th>IP</th></tr>
	<?php foreach ( $d['samples'] as $r ) : ?>
	<tr><td class="n"><?= $vn( (int) $r['ts'] ) ?></td><td class="n <?= $r['sec'] >= 3 ? 'bad' : '' ?>"><?= $sec( $r['sec'] ) ?></td><td><?= (int) $r['s'] ?></td>
		<td class="route"><details><summary><?= $h( $r['u'] ) ?></summary><table class="kv">
			<?php foreach ( [ 'Content type' => $r['ct'], 'Bytes sent' => number_format( (int) $r['b'] ), 'Referer' => $r['ref'], 'Redirect to' => $r['rl'], 'User agent' => $r['ua'], 'Server time' => number_format( $r['us'] ) . ' µs' ] as $k => $v ) : ?>
			<tr><td><?= $h( $k ) ?></td><td class="route"><?= $h( $v ?: '-' ) ?></td></tr><?php endforeach; ?>
		</table></details></td><td><?= $h( $r['ip'] ) ?></td></tr>
	<?php endforeach; ?>
</table></div>
<p><small>Rendered in <?= round( microtime( true ) - $t0, 2 ) ?>s</small></p>
</main>
<script>
const d = <?= json_encode( $chart ) ?>, hist = <?= json_encode( $d['hist'] ) ?>;
new Chart(document.getElementById('c'), { data: { labels: d.labels, datasets: [
	{ type: 'line', label: 'avg (s)', data: d.avg, borderColor: '#2563eb', yAxisID: 'y', pointRadius: 0, tension: .2 },
	{ type: 'line', label: 'p95 (s)', data: d.p95, borderColor: '#dc2626', yAxisID: 'y', pointRadius: 0, tension: .2 },
	{ type: 'bar', label: 'requests', data: d.n, backgroundColor: 'rgba(100,116,139,.25)', yAxisID: 'y1' } ] },
	options: { interaction: { mode: 'index', intersect: false }, scales: { y: { beginAtZero: true, title: { display: true, text: 'seconds' } },
		y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false } } } } });
new Chart(document.getElementById('hist'), { type: 'bar', data: { labels: Object.keys(hist),
	datasets: [ { label: 'requests', data: Object.values(hist), backgroundColor: '#2563eb' } ] }, options: { plugins: { legend: { display: false } } } });
</script>
</body></html>
