/*
 * SimpleServerMonitor
 * This program visualizes the command 'sar'. Server response Json format file.
 *
 * Written by Kenji Kumabuchi
 */


/*
 * Write server's URL here.
 */
var URL = "http://hermes.cs.scitec.kobe-u.ac.jp/monitor/";


$.getJSONP = function(url,callback,param) {
    return $.ajax({
           url:url,
           dataType:"jsonp",
           success:callback
    });
}

function refresh(){
    $("#CPU").empty();
    $("#LAVG").empty();
    $("#MEM").empty();
    $("#MEMUSED").empty();
    $("#INFO").empty();
    $("#memc").empty();
    $("#cpuc").empty();
    $("#top").fadeOut(0);
    $("#cpup").fadeOut(0);
    $("#memp").fadeOut(0);
}

function initTop(){
    refresh();
    $("#top").fadeIn();
    loadSar();
    loadSarQ();
    loadSarR();
}

function initMem(){
    refresh();
    $("#memp").fadeIn();
    loadSarRLog();
}

function initCpu(){
    refresh();
    $("#cpup").fadeIn();
    loadSarLog();
}

$(".btn-success").click(function(){
    initCpu();
});

$(".btn-danger").click(function(){
    initMem();
});

$(".btn-info").click(function(){
    initTop();
});

function loadSar(){
    $.getJSONP(URL+"sar.php", function(data, status){
        $("#CPU").append("<img src=\"http://chart.apis.google.com/chart?cht=p3&chd=t:"+data[0].user+","+data[0].nice+","+data[0].system+","+data[0].iowait+","+data[0].steal+","+data[0].idle+"&chs=500x250&chl=user|nice|system|iowait|steal|idle&chco=FF0000|00FF00|FFFF10|FF0000|FFA500|0000FF\">");
        if( data.length == 2 ){
            $("#INFO").append("<table class=\"table table-striped\"><thead><tr><th>CPU AVERAGE  </th><th>%user</th><th>%system</th><th>%iowait</th><th>%idle</th></tr></thead><tbody><tr><td>today\'s avg</td><td>"+data[1].user+"</td><td>"+data[1].system+"</td><td>"+data[1].iowait+"</td><td>"+data[1].idle+"</td></tr></tbody></table>");
        }
    });
}

function loadSarQ(){
    $.getJSONP(URL+"sarQ.php", function(data, status){
        var lavg1="", lavg5="", lavg15="", time="";
        for(var i=0; i<data.length-1; i++){
            if( i !== 0 ){
                lavg1 += ",";
                lavg5 += ",";
                lavg15 += ",";
                time += "|";
            }
            lavg1 += data[i].ldavg_1*100; 
            lavg5 += data[i].ldavg_5*100;
            lavg15 += data[i].ldavg_15*100;
            time += data[i].time;
        }
        $("#LAVG").append("<img src=\"https://chart.googleapis.com/chart?cht=lc&chco=FF0000,00FF00,0000FF&chs=500x260&chd=t:"+lavg1+"|"+lavg5+"|"+lavg15+"&chxt=x,y&chxl=0:|"+time+"|1:|0|0.5|1.0&chdl=lavg-1|lavg-5|lavg-15\">");
        $("#INFO").append("<table class=\"table table-striped\"><thead><tr><th>LOAD AVERAGE</th><th>lavg1</th><th>lavg5</th><th>lavg15</th><th>runq-sz</th></tr></thead><tbody><tr><td>now data</td><td>"+data[data.length-1].ldavg_1+"</td><td>"+data[data.length-1].ldavg_5+"</td><td>"+data[data.length-1].ldavg_15+"</td><td>"+data[data.length-1].runq_sz+"</td></tr></tbody></table>");
    });
}

function loadSarR(){
    $.getJSONP(URL+"sarR.php", function(data, status){
        $("#MEMUSED").append(data[0].memused+"% of memory is being used.");
        $("#MEM").append("<img src=\"http://chart.apis.google.com/chart?cht=p3&chd=t:"+data[0].kbbuffers+","+data[0].kbcached+"&chs=500x250&chl=kbbuffers|kbcached&chco=00FF00|FFFF10\">");
    });
}


function loadSarLog(){
    $.getJSONP(URL+"sarLog.php", function(data, status){
        var html = "<div class=\"span12\"><table class=\"table table-striped\"><thead><tr><th>CPU LOG</th><th>%user</th><th>%nice</th><th>%system</th><th>%iowait</th><th>%steal</th><th>%idle</th></tr></thead><tbody>";
        for( var i in data ){
            html += "<tr><td>"+data[i].time+"</td><td>"+data[i].user+"</td><td>"+data[i].nice+"</td><td>"+data[i].system+"</td><td>"+data[i].iowait+"</td><td>"+data[i].steal+"</td><td>"+data[i].idle+"</td></tr>";
        }
        html += "</tbody></table></div>";
        $("#cpuc").append(html);
    });
}

function loadSarRLog(){
    $.getJSONP(URL+"sarRLog.php", function(data, status){
        var html = "<div class=\"span12\"><table class=\"table table-striped\"><thead><tr><th>MEMORY LOG</th><th>kbmemfree</th><th>kbmemused</th><th>%memused</th><th>kbbuffers</th><th>kbcached</th><th>%swpused</th></tr></thead><tbody>";
        for( var i in data ){
            html += "<tr><td>"+data[i].time+"</td><td>"+data[i].kbmemfree+"</td><td>"+data[i].kbmemused+"</td><td>"+data[i].memused+"</td><td>"+data[i].kbbuffers+"</td><td>"+data[i].kbcached+"</td><td>"+data[i].swpused+"</td></tr>";
        }
        html += "</tbody></table></div>";
        $("#memc").append(html);
    });

}

setInterval("initTop()",600000); //10分ごとに自動更新


