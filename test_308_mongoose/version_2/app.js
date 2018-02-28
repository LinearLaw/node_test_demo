const express = require("express");
const app = express();
const config = require("./config/config.js");
const router = require("./router/router.js")

app.set("view engine","ejs");
app.use(express.static("./public"));

app.all("*",function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/**
 * @description  路由
 */
app.get("/",(req,res)=>{
  console.log("用户访问了主页");
  res.send("Welcome!");
})
app.get("/login"  , (req,res)=>{    res.render("login");    })
app.get("/signup" , (req,res)=>{    res.render("signup");   })

app.post("/dosignup",router.userSignup)


/**
 * @description  当请求无效时，返回提示请求出错。
 */
app.use(function(req,res){
  res.send("Request Error.");
})

/**
 * [description] 开启服务，监听端口请求
 */
app.listen(config.port,function(err){
  if(err) {
    console.log("error");
    return;
  }
  console.log("正在监听端口请求...");
})