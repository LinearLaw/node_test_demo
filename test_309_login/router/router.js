const formidable = require("formidable");
const db = require("../models/db.js");

exports.showRegist = (req,res,next)=>{
    if(req.session.login == "1"){
        var username = req.session.username;
        var login = true;
    }else{
        var username = "";
        var login = false;
    }

    db.find("users",{username:username},function(err,result){
        var form = new formidable.IncomingForm();
        form.parse(req,(err,fields,files)=>{
            var username = fields.username;
            var password = fields.password;
        })
        db.find("users",{"username":username},(err,result)=>{
            if(err){
                res.send("-3");
                return;
            }
            if(result.length != 0){
                res.send("-1");
                return;
            }
            db.insertOne("users",{
                "username":username,
                "password":password,
                "avatar":"moren.jpg"
            },(err,result)=>{
                if(err){
                    res.send("-3");
                    return;
                }
                req.session.login = "1";
                req,session.username = username;

                res.send("1");
            })
        })
    })
}

exports.doLogin = (req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,fils)=>{
        var username = fields.username;
        var password = fields.password;
        
        db.find("users",{"username":username},(err,result)=>{
            if(err){
                res.send("-5");
                return;
            }
            if(result.length == 0){
                res.send("-1");
                return;
            }
            if(password == result[0].password){
                res.session.login = "1";
                req.session.username = username;
                res.send("1");
                return;
            }else{
                res.send("-2");
                return;
            }
        })
    })
}