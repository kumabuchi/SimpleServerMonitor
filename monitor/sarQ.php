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
 *  Written by Kenji KUMABUCHI
 */

require_once("config.php");

if( !isAdmin() ){
    exit();
} 

/*
 * Execute command 'sar'.
 * sarコマンドを実行。
 */
exec('sar -q | tail -n 11', $arr, $res);

/*
 * Convert to Json and response to client.
 * Json形式に変換し、出力する。
 */
$jsonArray;
$cnt = 0;
foreach( $arr as $line ){
    $col = preg_split("/[\s]+/", $line);
    $arrayElem;
    if( count($col) >= 6 && $col[1] != "runq-sz" ){
        $arrayElem["time"] = $col[0]; 
        $arrayElem["runq_sz"] = $col[1];
        $arrayElem["plist_sz"] = $col[2];
	$arrayElem["ldavg_1"] = $col[3];
        $arrayElem["ldavg_5"] = $col[4];
        $arrayElem["ldavg_15"] = $col[5];
        $jsonArray[$cnt] = $arrayElem;
        ++$cnt;
    }
}
$callback = empty($_GET['callback']) ? $_POST['callback'] : $_GET['callback'];
print($callback . '('. json_encode($jsonArray) . ');');

