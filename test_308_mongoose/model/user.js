/**
 * 定义mongo的schema
 */

const mongoose = require("./db.js");
let Schema = mongoose.Schema;

//给Schema建立索引   index
//给Schema建立默认值 default
let UserSchema = new Schema({
    username:{type:String ,index:true},
    age:{type:String},
    pwd:{type:String},
    link:{type:String,default:Date.now},
})

module.exports = mongoose.model("User",UserSchema);