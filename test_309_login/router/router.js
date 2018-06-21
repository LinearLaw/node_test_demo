const express = require("express");
const router = express.Router();

const formidable = require("formidable");
const db = require("../models/db.js");

const doRegist = (req,res,next)=>{
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
            db.find("users",{"username":username},(err,result)=>{
                if(err){
                    res.send({
                        code:-5,
                        msg:"Internal Server Error"
                    });
                    return;
                }
                if(result.length != 0){
                    res.send({
                        code:-1,
                        msg:"Already regist"
                    });
                    return;
                }
                db.insertOne("users",{
                    "username":username,
                    "password":password,
                    "avatar":"moren.jpg"
                },(err,result)=>{
                    if(err){
                        res.send({
                            code:-5,
                            msg:"Internal Server Error"
                        });
                        return;
                    }
                    req.session.login = "1";
                    req.session.username = username;
                    res.send({
                        code:1,
                        msg:"success"
                    });
                })
            })
        })
    })
}

const doLogin = (req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,fils)=>{
        var username = fields.username;
        var password = fields.password;

        db.find("users",{"username":username},function(err,result){
            if(err){
                res.send({
                    code:-5,
                    msg:"Internal Server Error"
                });
                return;
            }
            if(result.length == 0){
                res.send({
                    code:-1,
                    msg:"No such user"
                });
                return;
            }
            if(password == result[0].password){
                req.session.login = "1";
                req.session.username = username;
                res.send({
                    code:1,
                    msg:"success"
                });
                return;
            }else{
                res.send({
                    code:-2,
                    msg:"Username or password error"
                });
                return;
            }
        })
    })
}

router.post("/doRegist" , doRegist);
router.post("/doLogin" , doLogin);

module.exports = router;
