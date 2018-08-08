const express = require("express");
const app = express();
const path = require("path");

const fs = require("fs");

const formidable = require("formidable");

app.use(express.static("./public"));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*"); //必须重新设置，把origin的域加上去
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'x-custom');
   res.header('Access-Control-Allow-Credentials', 'true');//和客户端对应，必须设置以后，才能接收cookie.
   next();
})


app.post("/upload",(req,res)=>{
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
      console.log(files.name);
      const dataBuffer = files;

      const dir = path.resolve(__dirname) +'/public/'+files.name;
      fs.writeFile(dir,dataBuffer, (err)=>{
          let imgPath = files.originalFilename
          res.send({
              code:1,
              data:imgPath
          })
      })

  })


})

app.listen(1234,function(){
  console.log("就绪，端口号1234")
})