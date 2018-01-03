var User = require("./user.js");


let initUser = {
    /**
     * 1、插入一条数据
     */
    insert(){
        let user = new User({
            username:"admin",
            age:"17",
            pwd:"admin",
            link:"www.baidu.com"
        })
        user.save((err,res)=>{
            if(err){console.log("Error:" + err)}
            else{
                console.log("Res: ",res);
            }
        })
    },
    /**
     * 2、更改数据
     */
    update(){
        let findJSON = {"username":"admin"};
        let updateJSON = {"username":"zzz"};
        User.update(findJSON,updateJSON,(err,res)=>{
            if(err){console.log(err)}
            else{
                console.log("Res: ",res)
            }
        })
    },
    /**
     * 3、find by id and update，和update类似，但是它以id作为查询条件
     */
    updateById(){
        let id = "id";
        let updateJSON = {"username":"xxx"};
        User.findByIdAndUpdate(id,updateJSON,(err,res)=>{
            if(err){console.log("Error: " + err)}
            else{
                console.log("Res: " + res);
            }
        })
    },
    /**
     * 4、删除
     */

}



initUser.insert();