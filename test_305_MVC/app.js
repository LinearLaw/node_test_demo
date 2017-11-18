/**
 * @desc app.js作为程序的主入口，进行配置MVC
 */
var express = require("express");
var app = express();

//1、路由写进controller里面,controller用一个package.json暴露其主程序入口
var router = require("./controller");

// 2、定义模板引擎，当前模板引擎为ejs
app.set("view engine", "ejs");

//3、定义中间件，在这里使用express自带的中间件进行呈递静态资源，
//3.0、静态资源的文件夹为public文件夹
app.use(express.static("./public"));
//3.1、可以定义多个静态资源文件夹
app.use(express.static("./uploads"));

//4、配置路由规则， 路由规则处理映射到相应的router方法中
app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);

//5、使用自定义的中间件，当上述所有的路由规则都无法进行匹配的时候，呈递默认页面
//例如，呈递404页面
app.use(function(req,res){
    res.render("err");
})

app.listen(3000);