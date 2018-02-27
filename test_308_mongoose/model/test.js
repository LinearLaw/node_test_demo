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
                console.log("初始化插入数据成功")
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
        let id = "_id";
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
    removeSth(){
        let findObj = {"username":"admin"};
        User.remove(findObj,(err,res)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Res: ' + res);
                //res => {"ok":1,"n":1}
            }
        })
    },
    /**
     * 5、查询
     *      范围查询：findObj = { "age":{ $gte:21,$lte:30 } } 从21到30的区间
     */
    findByConditions(findObj1,findObj2){
        let findObj = {"username":"admin"};
        if(!findObj2){
            //纯粹查询，只需要输入条件，输出所有查询到的内容
            User.find(findObj,(err,res)=>{
                if(err){
                    console.log('err');
                }else{
                    console.log('Res: ' + res);
                }
            })
        }else{
            //限制查询，指定查询到的内容，1表示输出该内容，0表示不输出
            let findObjLimit = {"username":1,"_id":0}
            User.find(findObj,findObjLimit,(err,res)=>{

            })
        }

    },
    /**
     * 6、数量查询
     */
    findCount(){
        let findObj = {};
        User.count(findObj,(err,res)=>{
            if(err){
                console.log('Err: ' + err);
            }else{
                console.log('res: ' + res);
            }
        })
    },
    /**
     * 7、根据id查询
     */
    findById(){
        let findId = "_id";
        User.findById(findId,(err,res)=>{
            if(err){
                console.log('err: ' + err);
            }else{
                console.log('res',res);
            }
        })
    },
    /**
     * 8、模糊查询
     */
    findByRegx(){
        let findReg = {"username":{$regex:/m/i}};//所有username里有m的都会被查询
        User.find(findReg,(err,res)=>{
            err?console.log('err',err):console.log('res',res);
        })
    },
    /**
     * 9、按页码查询
     */
    findByPage(){
        let pageSize = 5;
        let currentPage = 1;
        let sort = {"logindata":-1};
        let condition = {};
        let skipNum = (currentPage - 1) * pageSize;

        User.find(condition).skip(skipNum).limit(pageSize).sort(sort).exec((err,res)=>{
            err?console.log('err',err):console.log('res',res);
        })
    }
}

// initUser.insert();
module.exports = initUser;