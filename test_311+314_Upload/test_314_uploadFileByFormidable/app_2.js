const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

app.use(express.static("./public_2"));

// test iframe cross domain
app.post("/iframe-cross",(req,res)=>{
    res.send({
        data:"success",
        data:{
            time:new Date().getTime(),
            random:Math.random()
        }
    })
})

const PORT = 5433;
app.listen(PORT, function() {
    console.log(`就绪，端口号${PORT}`);
})
