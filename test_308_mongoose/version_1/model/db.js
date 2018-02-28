/**
 * @desc mongoose提供了一整套的访问数据库的方式，
 *      和数据库的连接、增删操作已经集成到了mongoose中
 */

const settings = require("../../../test_307_express/settings.js")
const mongoose = require("mongoose");

//链接数据库
mongoose.connect(settings.dburl);

mongoose.connection.on("connected",()=>{
    console.log("DB数据库已经连接: " + settings.dburl);
})

mongoose.connection.on("error",(err)=>{
    console.log("DB数据库连接失败: " + err);
})

mongoose.connection.on("disconnected",()=>{
    console.log("数据库断开连接。")
})

module.exports = mongoose;