SimpleServerMonitor
===================

This program visualizes the command 'sar'. Server response JSONP format file.  
  
サーバのsarコマンドの出力をJSONPファイルとして受け取り、可視化します。  
monitorディレクトリをhttpアクセスのできるサーバにアップロードし、viewerのjs/simple-server-monitor.jsにURLを記述。viewerのindex.htmlをブラウザで開くと表示されます。  
  
サーバにアップロードするconfig.phpにアクセス制限を設定することが可能です。  
OSによってsarコマンドの出力が微妙に違うので、表示できない場合があります。  
(CentOS 5.8でのみ動作確認)  
  
