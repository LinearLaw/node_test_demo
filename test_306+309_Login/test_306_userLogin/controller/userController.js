const User = require("../model/User.js");

exports.doRegist = (req,res)=>{
    //{ username:"" , pwd:"" , userAccount:"" }
    let acc = req.body.userAccount;
    let pwd = config.md5Create.pwdCreate(req.body.pwd);
    let name = req.body.username;
    if(!acc || !pwd || !name){
        res.send({
            code:4,
            msg:"please fill all input"
        });
        return;
    }
    if(!config.reg.test(acc) || !config.reg.test(pwd)){
        res.send({
            code:3,
            msg:"Account or password error"
        })
        return;
    }
    User.find({username:name},(err,result)=>{
        try{
            if(result.length>0){
                res.send({
                    code:2,
                    msg:"Account already exist"
                })
            }else{
                let userId = config.idCreate.appleSignal();
                let createTime = new Date().getTime();
                let userObj = {
                    "username"  :   name,
                    "userId" :userId,
                    "userAccount" :acc,
                    "userPwd":pwd,
                    "createTime":createTime
                }
                let newUser = new User(userObj);
                newUser.save((err)=>{
                    res.send({
                        code:1,
                        msg:"success",

                    })
                });
            }
        }catch(err){
            console.log(err);
            res.send({
                code:-1,
                msg:"Interval Server Error",
                data:err
            })
        }
    })

}

exports.doLogin = (req,res)=>{
    //{ userAccount:"" , pwd:"" }
    let acc = req.body.userAccount;
    let pwd = config.md5Create.pwdCreate(req.body.pwd);
    if(!acc || !pwd ){
        res.send({
            code:4,
            msg:"please fill all input"
        });
        return;
    }
    if(!config.reg.test(acc) || !config.reg.test(pwd)){
        res.send({
            code:3,
            msg:"Account or password error"
        })
        return;
    }
    User.find({userAccount:acc},(err,result)=>{
        try{
            if(result.length>0){
                if(result[0].userPwd == pwd){
                    let userId = result[0].userId;
                    let token = config.md5Create.tokenCreate(userId);

                    req.session.UID = userId;
                    req.session.TID = token;
                    res.send({
                        code:1,
                        msg:"login success",
                        data:{
                            username:result[0].username,
                            userId:result[0].userId,
                            createTime:result[0].createTime
                        }
                    })
                }else{
                    res.send({
                        code:3,
                        msg:"Account or password error"
                    })
                }
            }else{
                res.send({
                    code:2,
                    msg:"Account not exist"
                })
            }
        }catch(err){
            console.log(err);
            res.send({
                code:-1,
                msg:"Interval Server Error",
                data:err
            })
        }
    })
}

//验证登录状态，
//策略是：前端收到 -1 未授权时，表明当前没有登陆，强制跳登录页。
exports.getAuth = (req,res)=>{
    if(!req.session.UID || !req.session.TID){
        res.send({
            code:-1,
            msg:"login status lose efficacy"
        })
    }else{
        res.send({
            code:1,
            msg:"auth pass"
        })
    }
}
