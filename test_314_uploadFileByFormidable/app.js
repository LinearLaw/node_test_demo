const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

//md5验证文件
const crypto = require("crypto");

function getmd5(data) {
    const md5 = crypto.createHash("md5");
    return md5.update(data).digest("base64");
}

app.use(express.static("./public"));
app.use(express.static("./dist"));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*"); //必须重新设置，把origin的域加上去
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-custom');
    res.header('Access-Control-Allow-Credentials', 'true'); //和客户端对应，必须设置以后，才能接收cookie.
    next();
})


app.post("/upload", (req, res) => {
    console.log("接收到了文件，时间：" + new Date());
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        fs.readFile(files["file"].path, function(err, data) {
            if (err) res.send("读文件操作失败");
            else {
                let name = getmd5(data);
                let arrName = files["file"].name.split(".");
                let extensionName = arrName[arrName.length - 1] || "jpg";
                let dir = "/" + name + "." + extensionName;
                fs.writeFile('./public' + dir, data, (err) => {
                    let imgPath = files["file"].name
                    res.send({
                        code: 1,
                        md: name,
                        filepath: dir
                    })
                })
            }
        });
    })
})

app.get("/wsxd-crm/crmUser/list",(req,res)=>{
    console.log(req);
    res.send({
        data:"success",
        use:req.url
    })
})

app.listen(1234, function() {
    console.log("就绪，端口号1234")
})
