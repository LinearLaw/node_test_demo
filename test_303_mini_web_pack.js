var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require('path');

http.createServer(function(req,res){
    console.log("Server Start...");
    //获取用户请求的路径，req.url并处理
    var pathname = url.parse(req.url).pathname;
    
    //默认的首页
    if(pathname == "/"){
        pathname = "index.html";
    }

    //获取扩展名
    var extname = path.extname(pathname);

    fs.readFile("./static/" + pathname,function(err,data){
        if(err){
            fs.readFile("./static/404.html",function(err,data){
                res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                res.end(data);
            })
            return;
        }

        res.writeHead(200,{"Content-type":"text/html"});
        res.end(data);
    })
}).listen(3000,"127.0.0.1");