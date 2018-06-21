const express = require("express");
const app = express();

const bodyParser = require("body-parser");


const config = require("./config/config.js");
const router = require("./router/router.js");

global.config = config;

app.use(express.static("./public"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//挂载路由
app.use("/",router);

 //当请求无效时，返回提示请求出错。
app.use(function(req,res){
  res.send("Request Error.");
})

app.listen(config.port,()=>{
    console.log("服务已就绪，端口号"+config.port);
});
