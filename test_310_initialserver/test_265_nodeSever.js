/**
 * express实现简单服务器功能
 * 1、监听端口，返回静态页面
 * 2、监听端口的指定路径，返回其相应的数据
 * 3、监听get、post请求，返回相应数据
 */
// 1、引入服务模块
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

// 1、获取express服务器
const app = express();

// 2、设置自动地从用户请求的地址，在www目录下获取静态页面
app.use(express.static("./www"));

// 3、设置响应头
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// 4、接收指定地址的请求，响应回客户端
app.use("/getlist",(req , res)=>{
  fs.readFile("./data/status.json", (err,data)=>{
    res.end(data);
  })
})

app.use("/deletedata",(req,res)=>{
  fs.readFile("./data/status.json","utf-8",(err,data)=>{
    // 4.1、将获取的json字符串转化为对象
    const arr = JSON.parse(data);
    // 4.2、对该对象进行删除指定数据的操作
    const result = arr.filter((item)=>{
      if(item.id == req.body.id){
        return false;
      }
      return true;
    })
    // 4.3、json数据操作完成之后，将其重新保存到服务器
    fs.writeFile("./data/status.json",JSON.stringify(result),(err,data)=>{
      res.end("该数据已被删除。");
    })
  })
})
 // 5、可以设置get请求需要返回的数据
  app.get("/getdata",(req,res)=>{
    res.end("这里是get请求返回的数据")
  })
  // 6、可以设置post请求需要返回的数据
  app.post("/hehe",(req,res)=>{
    res.end(JSON.stringify(req.body))
  })
  app.listen(2000);
