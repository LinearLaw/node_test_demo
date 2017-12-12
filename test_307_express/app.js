var express = require("express");
var app = express();
var formidable = require("formidable");
var db = require("./model/db.js");

var md5 = require("./model/md5.js");

app.set("view engine","ejs");

app.use(express.static("./public"));

app.get("/regist",(req,res,next)=>{
    
})