const express = require("express");
const app = express();

const path = require('path');
const fs = require("fs");
const uuid = require("node-uuid");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

const utils = {
    //基于时间戳生成唯一标识 uuid
    appleSignal:function(){
      return uuid.v1();
    },
    //获取当前IP地址
    getIp:function(){
        var interfaces = require('os').networkInterfaces();
        for(var devName in interfaces){
            var iface = interfaces[devName];
            for(var i=0;i<iface.length;i++){
                var alias = iface[i];
                if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                    return alias.address;
                }
            }
        }
    }
}

//IP地址
const localIp = utils.getIp();
//端口号
const port = 5422;

app.post("/uploadPics",(req,res)=>{
    try{
        let signal = utils.appleSignal();
        let base64Data = req.body.titleImgSrc;
        let pos = base64Data.indexOf("4")+2;

        //去掉Base64:开头的标识字符
        let base64 = base64Data.substring(pos, base64Data.length - pos);
        if(base64Data){
            const dataBuffer = new Buffer(base64,'base64');
            const dir = path.resolve(__dirname) +'/public/base64Data/'+signal;
            fs.writeFile(dir + ".jpg",dataBuffer, (err)=>{
                let imgPath = "http://"+localIp+":"+port+"/base64Data/"+signal + ".jpg"
                res.send({
                    code:1,
                    data:imgPath
                })
            })
        }else{
            res.send({
                code:2,
                msg:"No such files"
            })
        }
    }catch(err){
        res.send({
            code:-1,
            msg:"Internal Server Error"
            data:err
        })
    }


})

app.listen(port,()=>{
    console.log("服务已就绪，端口号" + port);
})
