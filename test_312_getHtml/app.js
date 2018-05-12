const express =require("express");
const app = express();
const request = require("request");

//cheerio，用来进行DOM操作
const cheerio = require("cheerio");

//转码工具，目标网站为gb2312
var iconv = require('iconv-lite');
var fs = require("fs");

function getHtml(i){
    let url = "http://it.dgzx.net/xszp/4cmgames-own/web/gz/g26ld/dhxch/"+i+".htm"
    request.get({
        encoding: null,
        url: url
    },(err,res,body)=>{
        //res.body即为所获得的html页面
        // console.log(res.body);
        body = iconv.decode(body,'gb2312');
        var $ = cheerio.load(body);

        var title = $(".f3").text();
        var content = $(".f2").text();
        var result = title + "/n  " + content; 
        fs.writeFile('./computer_'+i+'.txt',result,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
            if(err){
                console.log("文件写入失败")
            }else{
                console.log("第"+i+"号文件写入成功");
            }
        })
    });
}
for(var i=1;i<=70;i++){
    getHtml(i);
}
app.listen(8888,()=>{
    console.log("服务已就绪，端口号8888");
})