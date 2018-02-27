const express = require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.static("./public"));

/**
 * @description  路由
 */
app.get("/",(req,res)=>{
  console.log("用户访问了主页");
  res.send("Welcome!");
})
app.get("/login",(req,res)=>{
  console.log("用户访问了登录页");
  res.render("login");
})
/**
 * @description  当请求无效时，返回提示请求出错。
 */
app.use(function(req,res){
  res.send("Request Error.");
})

/**
 * [description] 开启服务，监听端口请求
 */
app.listen(3000,function(err){
  if(err) {console.log("error");}
  console.log("正在监听端口请求...");
})