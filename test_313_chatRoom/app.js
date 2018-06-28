const express = require("express");
const app = express();
const http = require("http").Server(app);
global.io = require("socket.io")(http);

const mongoose = require("mongoose");
const bodyParser = require('body-parser');

global.session = require('express-session');
const cookieParser = require('cookie-parser');
global.request = require('request');
global.fs = require('fs');
global.path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));


//推送
let apiSocket = require("./api/apiSocket.js");

io.on("connection",function(socket){
    apiSocket.apiSocket(socket);
});


http.listen(9000,()=>{
    console.log("端口号9000，服务已就绪。")
})
