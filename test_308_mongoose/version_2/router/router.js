const User = require("../models/User.js");
const config = require("../config/config.js");
const formidable = require('formidable');

exports.userSignup = function(req,res){
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
      /**
       * [userLogin description] fields是request的body的内容
       */
      let tempUsername = fields.username;
      let tempPwd = fields.pwd;

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
      User.findOne({"username":tempUsername},function(err,result){
        if(result.length>0){
          res.send({
            status:6,
            content:"username already sign up"
          })
          return;
        }
        User.create({
          "username"  :   fields.username,
          "pwd"       :   tempPwd,
          "createTime":   new Date().getTime(),
          "userId"    :   config.idCreate.appleSignal(),
          "shopId"    :   config.idCreate.orangeSignal()
        },(err)=>{
          res.send({
            status:1,
            content:"success"
          })
        })
      })
    })
}
exports.userLogin = function(req,res){

}
