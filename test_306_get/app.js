const express = require("express");

const app = express();

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get("/",(req,res)=>{
    res.send({
        "text":"哇哇啦啦啦啦啦啦啦啦啦啦哦哦哦耶耶耶",
        "url":"http://i2.bvimg.com/620675/a90cf570c5573453.png"
    })
})
app.listen(80);

