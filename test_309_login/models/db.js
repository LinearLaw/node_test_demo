var MongoClient = require("mongodb").MongoClient;

/**
 * 注意，在这里，mongodb的url前缀不是http协议，而是mongodb协议
 */
var url = "mongodb://127.0.0.1:27017";

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
        _connectDB((err,db)=>{
            if(err){
                console.log("db error:" + err);
                return;
            }
            /**
             * @desc connect传递过来的db是一整个的db，
             *         需要指定db的数据库名称，再选择collections的名称
             */
            db.db("linear").collection("users").createIndex(
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
        db.db("linear").collection(collectionName).insertOne(json,(err,result)=>{
            callback(err,result);
            db.close();
        })
    })
}

/**
 * @desc 查找一条数据
 */
exports.find = function(collectionName,json,C,D){
    var result = [];
    var callback = null;
    var skipnumber = 0;
    var sort = null;
    var limit = 0;
    if(arguments.length == 3){
        calllback = C;
        skipnumber = 0;
        limit = 0;
    }else if(arguments.length == 4){
        callback = D;
        var args = C;
        skipnumber = args.pageamount * args.page || 0;
        limit = args.pageamount || 0;
        sort = args.sort || {};
    }else{
        throw new Error("find函数的参数个数必须为三个或者四个");
        return;
    }
    
    _connectDB((err,db)=>{
        var cursor = db.db("linear").collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each((err,doc)=>{
            
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            if(doc != null){
                result.push(doc);
            }else{
                console.log(calllback);
                callback(null,result);
                db.close();
            }
        })
    })
}
