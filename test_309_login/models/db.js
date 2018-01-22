var MongoClient = require("mongodb").MongoClient;
var url = "http://127.0.0.1:27107";

/**
 * @desc 连接数据库
 */
    function _connectDB(callback){
        MongoClient.connect(url,(err,db)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(err,db);
        });
    }
/**
 * @desc 数据库初始化
 */
    init();
    function init(){
        _connectDb((err,db)=>{
            if(err){
                console.log("db error");
                return;
            }
            db.collection("users").createIndex(
                {"username":1},
                null,
                (err,results)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log("索引建立成功！");
                }
            )
        })
    }

/**
 * @desc 插入一条数据
 */
exports.insertOne = (collectionName,json,callback)=>{
    _connectDB((err,db)=>{
        db.collection(collectionName).insertOne(json,(err,result)=>{
            callback(err,result);
            db.close();
        })
    })
}

/**
 * @desc 查找一条数据
 */
exports.find = (collectionName,json,C,D)=>{
    if(arguments.length == 3){
        var calllback = C;
        var skipnumber = 0;
        var limit = 0;
    }else if(arguments.length == 4){
        var callback = D;
        var args = C;
        var skipnumber = args.pageamount * args.page || 0;
        var limit = args.pageamount || 0;
        var sort = args.sort || {};
    }else{
        throw new Error("find函数的参数个数必须为三个或者四个");
        return;
    }
    _connectDB((err,db)=>{
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each((err,doc)=>{
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            if(doc != null){
                result.push(doc);
            }else{
                callback(null,result);
                db.close();
            }
        })
    })
}
