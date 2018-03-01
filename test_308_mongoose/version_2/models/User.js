/**
 * @desc User.js用于创建user类和定义user静态方法
 */
const mongoose = require("mongoose");
const db = require("./db.js");

const userSchema = new mongoose.Schema({
    "username"  :   {   "type"  :   String  },
    "pwd"       :   {   "type"  :   String  },
    "createTime":   {   "type"  :   Number  },
    "userId"    :   {   "type"  :   String  },
    "shopId"    :   {   "type"  :   String  }
})

/**
 * [findUser description] Schema 可以添加static下的function，这个function可以由model直接调用
 *                               也可以添加methods下的function，这个function应该由model的实例才能进行调用
 */
userSchema.methods.findUser = function(name,callback){
    this.model("Adminuser").find({"username":name},callback)
}
userSchema.methods.addUser = function(body,callback){
    
}
const User = mongoose.model("Adminuser",userSchema)

module.exports = User;