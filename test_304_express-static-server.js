/**
 * @desc 利用express搭建静态服务器，并可以返回静态页面
 *      假设dist内部为静态资源，当输入127.0.0.1:3000的时候会返回index.html
 */

var express = require("express");
var app = express();
 
app.use(express.static("./dist"));

app.listen(3000);