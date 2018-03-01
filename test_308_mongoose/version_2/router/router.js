const User = require("../models/User.js");
const config = require("../config/config.js");
const formidable = require('formidable');
const md5 = require("../models/md5.js");

function verifyData(tempUsername,tempPwd,res,callback){
  if(!tempUsername){
    res.send({
      status:2,
      content:"username should not empty"
    });
    return;
  }
  if(!tempPwd){
    res.send({
      status:3,
      content:"password should not empty"
    })
    return;
  }
  if(!config.regConfig.username.test(tempUsername)){
    res.send({
      status:4,
      content:"invalid username"
    })
    return;
  }
  if(!config.regConfig.pwd.test(tempPwd)){
    res.send({
      status:5,
      content:"invalid password"
    })
    return;
  }
  callback();
}
exports.userSignup = function(req,res){
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
      /**
       * [userLogin description] fields是request的body的内容
       */
      let tempUsername = fields.username;
      let tempPwd = fields.pwd;

      verifyData(tempUsername,tempPwd,res,function(){
        User.find({"username":tempUsername},function(err,result){
          if(result.length>0){
            res.send({
              status:6,
              content:"username already sign up"
            })
            return;
          }
          //加密规则
          tempPwd = md5(md5(tempPwd).substr(4,7) + md5(tempPwd));
          let reqObj = {
              "username"  :   tempUsername,
              "pwd"       :   tempPwd
          }
          reqObj["createTime"] = new Date().getTime()
          reqObj["userId"]    =   config.idCreate.appleSignal()
          reqObj["shopId"]    =   config.idCreate.orangeSignal()
          let newUser = new User(reqObj);
          newUser.save(function(err){
              res.send({
                  status:1,
                  content:"success"
              })
          })
        })
      });
    })
}
exports.userLogin = function(req,res){
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
      /**
       * [userLogin description] fields是request的body的内容
       */
      let tempUsername = fields.username;
      let tempPwd = fields.pwd;
      verifyData(tempUsername,tempPwd,res,function(){
        User.findOne({"username":tempUsername},function(err,result){
            if(!result){
              res.send({
                status:6,
                content:"user not exist"
              })
              return;
            }
            //加密
            tempPwd = md5(md5(tempPwd).substr(4,7) + md5(tempPwd));
            if(result&&result.username==tempUsername&&result.pwd==tempPwd){

              res.send({
                status:1,
                content:"login success"
              })
              return;
            }else{
              //token生成
              let token = md5(tempPwd + new Date().getTime() + config.idCreate.orangeSignal())
              res.session.SID = token;
              res.session.username = tempUsername;
              res.send({
                status:7,
                content:"username or pwd error"
              })
              return;
            }
          })
        })
      })    
}   
