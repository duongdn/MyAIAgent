<?php
/**
 * MPFC perf dashboard — data layer. Reads Apache request logs that Apache pipes into the
 * `apache_logs` DB (today: apache_logs, earlier days: apache_logs_clone_YYYYMMDD made at 00:00 UTC)
 * and aggregates them in PHP (row counts are small: ~10-25k/day).
 * time_in_milisecond actually holds Apache %D = microseconds.
 */

function perf_db(array $cfg): PDO {
	return new PDO( "mysql:host={$cfg['host']};port={$cfg['port']};dbname=apache_logs;charset=utf8mb4",
		$cfg['user'], $cfg['pass'], [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false ] );
}

/** Unbuffered row stream (UTC) newer than $since from the live table + any daily clone that may overlap. */
function perf_fetch_rows(PDO $db, int $since): PDOStatement {
	$tables = [ 'apache_logs' ];
	foreach ( $db->query( "SHOW TABLES LIKE 'apache_logs_clone_%'" )->fetchAll( PDO::FETCH_COLUMN ) as $t ) {
		// clone_YYYYMMDD is created at 00:00 UTC that day and holds the previous day's rows
		$d = strtotime( substr( $t, -8 ) . ' 00:00:00 UTC' );
		if ( $d !== false && $d > $since ) $tables[] = $t;
	}
	$from = gmdate( 'Y-m-d H:i:s', $since );
	$sql  = implode( ' UNION ALL ', array_map( fn( $t ) =>
		"SELECT UNIX_TIMESTAMP(datetime) ts, ip, url_requested u, status s, time_in_milisecond us, user_agent ua
		 FROM `$t` WHERE datetime >= '$from'", $tables ) );
	$db->exec( "SET time_zone = '+00:00'" ); // datetime column is UTC
	// stream rows: 3d/7d ranges are 100k-500k rows, too big to buffer under the 128M web memory_limit
	$db->setAttribute( PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false );
	return $db->query( $sql, PDO::FETCH_ASSOC );
}

/** "GET /a/123/?x=1 HTTP/1.1" -> [method, normalized route, kind] */
function perf_route(string $raw, int $status): array {
	$p      = explode( ' ', $raw );
	$method = $p[0] ?? '?';
	$url    = $p[1] ?? $raw;
	$path   = parse_url( $url, PHP_URL_PATH ) ?: '/';
	parse_str( (string) parse_url( $url, PHP_URL_QUERY ), $q );
	if ( isset( $q['json'] ) ) return [ $method, '/?json=' . $q['json'], 'api' ];
	if ( str_contains( $path, 'admin-ajax.php' ) ) return [ $method, $path . ( isset( $q['action'] ) ? '?action=' . $q['action'] : '' ), 'ajax' ];
	$route = preg_replace( [ '#/\d+(?=/|$)#', '#/[0-9a-f]{12,}(?=/|$)#i' ], [ '/{n}', '/{id}' ], $path );
	$kind  = match ( true ) {
		$status === 404                              => '404',
		str_starts_with( $path, '/wp-json/' )        => 'rest',
		str_starts_with( $path, '/wp-admin/' )       => 'admin',
		str_contains( $path, 'xmlrpc.php' )          => 'xmlrpc',
		(bool) preg_match( '#\.(js|css|png|jpe?g|gif|webp|svg|woff2?|ico|map|mp4)$#i', $path ) => 'static',
		default                                      => 'page',
	};
	return [ $method, $route, $kind ];
}

function perf_pct(array $sorted, float $p): float {
	if ( ! $sorted ) return 0;
	return $sorted[ min( count( $sorted ) - 1, (int) floor( $p * count( $sorted ) ) ) ];
}

function perf_summary(array $secs): array {
	sort( $secs );
	$n = count( $secs );
	return [ 'n' => $n, 'avg' => $n ? array_sum( $secs ) / $n : 0, 'p50' => perf_pct( $secs, .5 ),
		'p95' => perf_pct( $secs, .95 ), 'max' => $n ? end( $secs ) : 0, 'total' => array_sum( $secs ) ];
}

/** Filter + aggregate everything the page shows. */
function perf_aggregate(iterable $rows, array $opt): array {
	$bucket = $opt['bucket'];
	$all = $series = $groups = $ips = $slow = $status = [];
	$scanned = 0;
	foreach ( $rows as $r ) {
		$scanned++;
		if ( in_array( $r['ip'], $opt['exclude_ips'], true ) ) continue;
		[ $m, $route, $kind ] = perf_route( (string) $r['u'], (int) $r['s'] );
		if ( $opt['kinds'] && ! in_array( $kind, $opt['kinds'], true ) ) continue;
		$sec = $r['us'] / 1e6;
		$all[] = $sec;
		$b = intdiv( (int) $r['ts'], $bucket ) * $bucket;
		$series[ $b ][] = $sec;
		$groups["$m $route"]['t'][] = $sec;
		$groups["$m $route"]['kind'] = $kind;
		$ips[ $r['ip'] ] = ( $ips[ $r['ip'] ] ?? 0 ) + $sec;
		$status[ intdiv( (int) $r['s'], 100 ) . 'xx' ] = ( $status[ intdiv( (int) $r['s'], 100 ) . 'xx' ] ?? 0 ) + 1;
		if ( $sec >= $opt['slow'] ) {
			$slow[] = $r + [ 'sec' => $sec, 'kind' => $kind ];
			if ( count( $slow ) > 2000 ) { // keep memory bounded: retain only the slowest
				usort( $slow, fn( $a, $b ) => $b['sec'] <=> $a['sec'] );
				$slow = array_slice( $slow, 0, 100 );
			}
		}
	}
	ksort( $series );
	$series = array_map( 'perf_summary', $series );
	$groups = array_map( fn( $g ) => perf_summary( $g['t'] ) + [ 'kind' => $g['kind'] ], $groups );
	uasort( $groups, fn( $a, $b ) => $b['total'] <=> $a['total'] );
	usort( $slow, fn( $a, $b ) => $b['sec'] <=> $a['sec'] );
	arsort( $ips );
	ksort( $status );
	$sum = perf_summary( $all );
	$sum['slow_n'] = count( array_filter( $all, fn( $s ) => $s >= $opt['slow'] ) );
	return compact( 'sum', 'series', 'groups', 'status', 'scanned' ) + [ 'slow' => array_slice( $slow, 0, 100 ), 'ips' => array_slice( $ips, 0, 15, true ) ];
}
