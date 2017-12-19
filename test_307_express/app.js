var express = require("express");
var app = express();
//1、formidable用于解析post请求的参数
var formidable = require("formidable");
//2、db链接db数据库
var db = require("./model/db.js");

//3、md5用于加密数据
var md5 = require("./model/md5.js");

//4、配置模板引擎，使用ejs
app.set("view engine","ejs");

//5、呈递静态资源，public文件夹
app.use(express.static("./public"));

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
app.get("/doregist",(req,res,next)=>{
    var userName = req.qurey.userName;
    var pwd = req.query.pwd;

    //（1）、数据加密规则，可以自己定义，md5加密不可回退
    pwd = md5(md5(pwd).substr(4,7) + md5(pwd));
    //（2）、将用户名和密码存入数据库，调用DAO方法，访问数据库的操作都集成在DAO进行
    db.insertOne("users",{
        "userName":userName,
        "pwd":pwd
    },(err,result)=>{
        if(err){
            res.send("-1");
            return;
        }
        res.send("1");
    })
})
//  7.2、登录接口
app.post("/dologin",(req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        var userName = fields.userName;
        var pwd = fields.pwd;
        pwd = md5(md5(pwd).substr(4,7) + md5(pwd));

        db.find("users",{"userName":userName},(err,result)=>{
            if(result.length == 0){
                res.send("-2");
                return;
            }
            var findPwd = result[0].pwd;

            if(pwd == findPwd){
                res.send("1");
            }else{
                res.send("-1");
            }
        })
    })
})
app.listen(3000);