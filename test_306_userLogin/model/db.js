const mongoose = require("mongoose");
const config = require("../config/config.js");

const dbURL = config.db_url;
const dbOption = config.db_options;

mongoose.connect(dbURL,dbOption);

const db = mongoose.connection;
mongoose.Promise = global.Promise;

// DB三连 ——EX
db.once("open",(cb)=>{
    console.log("数据库连接成功")
});
db.once("error",(cb)=>{
    console.log("数据库连接失败")
});
db.once("disconnected",()=>{
    console.log("数据库连接断开")
})

module.exports = db;
