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

app.post("/regist",router.showRegist);
app.post("/login",router.doLogin);

app.listen(8090);