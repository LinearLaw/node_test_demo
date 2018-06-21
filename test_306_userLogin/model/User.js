const mongoose = require("mongoose");

const db = require("./db.js");

const userSchema = new mongoose.Schema({
    "username"  :   { type:String },
    "userId" :{ type:String },
    "userAccount" :{ type:String },
    "userPwd":{ type:String }
})

const User = mongoose.model("userModel",userSchema);
module.exports = User;
