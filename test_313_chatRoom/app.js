const express = require("express");
const app = express();
const http = require("http").Server(app);
global.io = require("socket.io")(http);

app.use(express.static(__dirname + '/public'));

//推送
let apiSocket = require("./api/apiSocket.js");

io.on("connection",function(socket){
    apiSocket.apiSocket(socket);
});


http.listen(9000,()=>{
    console.log("端口号9000，服务已就绪。")
})
