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
exec('sar | tail -n 50', $arr, $res);

/*
 * Convert to Json and response to client.
 * Json形式に変換し、出力する。
 */
$jsonArray;
$cnt = 0;
foreach( $arr as $line ){
    $col = preg_split("/[\s]+/", $line);
    $arrayElem;
    if( count($col) == 8 && $col[1] != "CPU" && $col[0] != "Average:" ){
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
$callback = empty($_GET['callback']) ? $_POST['callback'] : $_GET['callback'];
print($callback . '('. json_encode($jsonArray) . ');');

