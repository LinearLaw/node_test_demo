var express = require("express");
var app = express();
var router = require("./router/router.js");
var session = require("express-session");

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true
}));

app.use(express.static("./public"));

//挂载路由
app.use("/",router);

app.listen(8090);
