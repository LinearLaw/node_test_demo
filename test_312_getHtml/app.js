/**
 * @desc 利用cheerio和iconv，结合request模块，
 *      对网站内容进行爬取。
 */

const express =require("express");
const app = express();
const request = require("request");

const fs = require("fs");
//cheerio，用来进行DOM操作
const cheerio = require("cheerio");

//转码工具，目标网站编码格式为gb2312
const iconv = require('iconv-lite');

function getHtml(i){
    let url = "http://it.dgzx.net/xszp/4cmgames-own/web/gz/g26ld/dhxch/"+i+".htm"
    request.get({
        encoding: null,
        url: url
    },(err,res,body)=>{
        //res.body或body即为所获得的html页面
        // console.log(res.body);

        //1、使用iconv对body进行转码
        body = iconv.decode(body,'gb2312');

        // 2、cheerio读取页面DOM
        var $ = cheerio.load(body);

        //3、获取指定的文本内容
        var title = $(".f3").text().replace("<br>","\r\n");
        var content = "";
        $(".f2").map(function(index,item){
            var temp = $(item).text().replace("<br>","\r\n")
            content = content + temp + "\r\n " + "\r\n ";
        });

        var result = title + "\r\n  "+ "\r\n " + content; 
        fs.writeFile('./computer_'+i+'.txt',result,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
            if(err){
                console.log("文件写入失败");
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