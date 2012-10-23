<?php

/*
 * Write Access restriction here. Access only server administrator.
 * アクセス制限をここに記述。サーバ管理者のみアクセス可能に。
 */
function isAdmin(){
    /* if (the access is not from administrator ...)
     *      return false;
     * else
     */
    return true;
}

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




