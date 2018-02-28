/**
 * @desc    user-db.js用于连接user数据库
 */

const mongoose = require("mongoose");
const config = require("../config/config.js");
mongoose.connect(config.db_url);
const db = mongoose.connection;

mongoose.set("debug",true);
mongoose.Promise = global.Promise;

db.once("open",(callback)=>{
    console.log("Success:连接到user数据库成功");
})
db.once("error",(cb)=>{
    console.log("Error:连接到user数据库失败");
    mongoose.disconnect();
})
db.once("disconnected",()=>{
    console.log("数据库断开连接。")
})
module.exports = db;