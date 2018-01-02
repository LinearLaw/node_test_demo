var express = require("express");
var app = express();
//1、formidable用于解析post请求的参数
var formidable = require("formidable");
//2、db链接db数据库
var db = require("./model/db.js");

//3、md5用于加密数据
// var md5 = require("./model/md5.js");

//4、配置模板引擎，使用ejs
app.set("view engine","ejs");

//5、呈递静态资源，public文件夹
app.use(express.static("./public"));
app.all("*",function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//6、静态呈递
//  6.1、注册
app.get("/regist",(req,res,next)=>{
    res.render("regist");
})

//  6.2、登录
app.get("/login",(req,res,next)=>{
    res.render("login");
})

//7、接口
//  7.1、注册接口
app.post("/doregist",(req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        var userName = fields.userName;
        var pwd = fields.pwd;
        //（1）、数据加密规则，可以自己定义，md5加密不可回退======>暂时不加密
        // pwd = md5(md5(pwd).substr(4,7) + md5(pwd));
        //（2）、将用户名和密码存入数据库，调用DAO方法，访问数据库的操作都集成在DAO进行
        db.insertOne("users",{"username":userName,"pwd":pwd},function(err,data){
            console.log(err,data);
            res.send(data);
        })
    })


})
//  7.2、登录接口
app.post("/dologin",(req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        var userName = fields.userName;
        var pwd = fields.pwd;
        //加密查询数据======>暂时不加密
        /**
         * @desc 一般地，为了安全性起见，存储在数据库中的密码都是密文存储
         *          明文存储有一定风险性
         */
        // pwd = md5(md5(pwd).substr(4,7) + md5(pwd));
        db.find("users",{"username":userName},(err,result)=>{
            if(result.length == 0){
                res.send({code:"-2",data:result});
                return;
            }
            var findPwd = result[0].pwd;

            if(pwd == findPwd){
                req.session.lg_id = new Date().getTime() + Math.random().toString(36).substr(2);
                req.session.username = username;
                res.send({code:"1",data:result});
            }else{
                res.send({code:"-1",data:result});
            }
        })
    })
})
app.listen(3000);