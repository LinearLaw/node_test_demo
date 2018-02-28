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
const User = mongoose.model("Adminuser",userSchema)

// userSchema.methods.findShop = (shopid,callback)=>{
//     this.model("User").find({
//         "shopId":this.shopId
//     },callback())
// }
// userSchema.methods.addShop = (userId,callback)=>{
//     //shopId的生成算法需要重写
//     let shopId = new Date().getTime();
//     this.model("Shop").create({"userId":userId,"shopId":"shopId生成"},(err)=>{
//         console.log("shop插入shop表成功");
//     })
//     this.model("User").update({"userId":this.userId},{$set:{"shopId":"shopId生成"}},(err)=>{
//         console.log("shop插入user表成功");
//     })
// }

module.exports = User;