const uuid = require("node-uuid");

/**
 * [idCreate description] uuid生成
 */
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
const regConfig = {
    username:/^[A-Za-z0-9]{6,16}$/,
    pwd:/^[A-Za-z0-9]{8,16}$/
  }
module.exports = {
  //1、端口号
  port : 3000,
  //2、db url
  db_url:"mongodb://127.0.0.1:27017/abcde",
  //3、session config
  session:{
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure:   false,
      maxAge:   365 * 24 * 60 * 60 * 1000,
    }
  },
  //4、id生成器
  idCreate:idCreate,

  //5、表单验证规则
  regConfig:regConfig
}