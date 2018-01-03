/**
 * 定义mongo的schema
 */

const mongoose = require("./db.js");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username:{type:String},
    age:{type:String},
    pwd:{type:String},
    link:{type:String},
})

module.exports = mongoose.model("User",UserSchema);