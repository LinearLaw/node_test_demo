const User = require("../model/User.js");

exports.doRegist = (req,res)=>{
    //{ username:"" , pwd:"" }
    let acc = req.body.userAccount;
    let pwd = config.md5Create.pwdCreate(req.body.pwd);
    let name = req.body.username;
    User.find({username:username},(err,result)=>{
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
            res.send({
                code:-1,
                msg:"Interval Server Error"
            })
        }
    })

}

exports.doLogin = (req,res)=>{
    //{ username:"" , pwd:"" }
    let acc = req.body.userAccount;
    let pwd = config.md5Create.pwdCreate(req.body.pwd);
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
            res.send({
                code:-1,
                msg:"Interval Server Error"
            })
        }
    })
}
