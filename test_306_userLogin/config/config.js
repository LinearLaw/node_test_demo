const uuid = require("node-uuid");
const crypto = require("crypto");

function md5(password){
    const md5 = crypto.createHash("md5");
    const pwd = md5.update(password).digest("base64");
    return pwd;
}

const idCreate = {
  //1、基于时间戳
  appleSignal:function(){
    return uuid.v1();
  },
  //2、基于随机数
  orangeSignal:function(){
    return uuid.v4();
  }
}

const md5Create = {
    pwdCreate:function(pwd){
        return md5(md5(pwd).substr(4,7) + md5(pwd));
    },
    tokenCreate:function(userId){
        let timenow = new Date().getTime();
        return md5(userId + timenow + idCreate.orangeSignal());
    }
}
const reg = /^[A-Za-z0-9]{6,16}$/;
module.exports = {
  //1、端口号
  port : 3003,
  //2、db url
  db_url:"mongodb://127.0.0.1:27017/userdb",
  db_options:{
    server:{
      auto_reconnect:true,
      poolSize:10
    },
    keepAlive: 120
  },
  //3、session config
  session:{
    name: 'SID',
    secret: 'keyboard cat',
    cookie: {
      httpOnly: true,
      secure:   false,
      maxAge:   7 * 24 * 60 * 60 * 1000,
    }
  },
  //4、id生成器
  idCreate:idCreate,
  md5Create:md5Create,

  //6、接受的ip
  ipWithGet:"http://127.0.0.1:8090",

  reg:reg

}
