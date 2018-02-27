/**
 * @desc    user-db.js用于连接user数据库
 */

const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb://127.0.0.1:27017/test");

mongoose.set("debug",true);
mongoose.Promise = global.Promise;

db.once("open",(callback)=>{
    console.log("Success:连接到user数据库成功");
})
db.once("error",(cb)=>{
    console.log("Error:连接到user数据库失败");
})

module.exports = db;