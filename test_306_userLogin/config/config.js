const uuid = require("node-uuid");

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

  //6、接受的ip
  ipWithGet:"http://127.0.0.1:8090",

}
