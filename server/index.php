<?php

/* 
 * Returned in JSON format of the 'sar' command. 
 * The server must sar command can be used.
 * Limited access to care!
 *
 * サーバのsarコマンドをJSON形式で返す。
 * サーバでsarコマンドが使えることが必要です。
 * アクセス制限に注意!!
 * 
 *  Written by Kenji KUMABUCHI , 2012/10/22 
*/


/*
 * Write Access restriction here. Access only server administrator.
 * アクセス制限をここに記述。サーバ管理者のみアクセス可能に。
*/




/*
 * for PHP version under 5.2.0 .
 * This program uses function 'json_encode'.
 * PHPのバージョンが5.2.0以下の場合、json_encodeを読み込む。
*/
if(!function_exists("json_encode")) {
	function json_encode($object) {
		require_once("JSON.php");
		$json = new Services_JSON();
		return $json->encode($object); 
	}
} 


/*
 * Execute command 'sar'.
 * sarコマンドを実行。
*/
exec('sar', $arr, $res);

/*
 * Convert to Json and response to client.
 * Json形式に変換し、出力する。
*/
$jsonArray;
$cnt = 0;
foreach( $arr as $line ){
	$col = preg_split("/[\s]+/", $line);
	$arrayElem;
	if( count($col) == 8 && $col[1] != "CPU" ){
		//$arrayElem["time"] = preg_replace("(時|分|秒)","/",$col[0]);
		$arrayElem["time"] = $col[0]; 
		$arrayElem["cpu"] = $col[1];
		$arrayElem["user"] = $col[2];
		$arrayElem["nice"] = $col[3];
		$arrayElem["system"] = $col[4];
		$arrayElem["iowait"] = $col[5];
		$arrayElem["steal"] = $col[6];
		$arrayElem["idle"] = $col[7];
		$jsonArray[$cnt] = $arrayElem;
		++$cnt;
	}
}
print(json_encode($jsonArray));

