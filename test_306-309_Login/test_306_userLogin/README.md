#   登录注册

    node + express + mongoose


#   Login

    url: /doLogin
    data:{
        userAccount:"" ,
        pwd:""
    }

#   Regist

    url:/doRegist
    data:{
        username:"" ,
        pwd:"" ,
        userAccount:""
    }
    Tips：保存到数据库中的密码信息经过了md5多层加密。

#   Additional verification

    策略：登录时后端给前端设置cookie，cookie中带有token和userId，
    其中，该cookie值为加密后的数据，前端js无法获取该值。
    在每一次的请求接口时，cookie都会被带过来。
    因此只需要验证带过来的cookie中有没有token和userId即可得到登录状态。

    url:/getAuth
    data:{}
