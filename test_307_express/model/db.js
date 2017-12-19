/**
 * @desc DAO，对数据库操作的封装
 */
var MongoClient = require("mongodb").MongoClient;
var settings = require("../settings.js");

function _connectDB(calllback){
    //从配置文件中读取数据库地址
    var url = settings.dburl;

    MongoClient.connect(url,(err,db)=>{
        if(err){
            callback(err,null);
            return;
        }
        callback(err,db);
    })
}

//插入一条数据
exports.insertOne = function(collectionName , json , callback){
    _connectDB(function(err,db){
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            //每次进行数据库操作的终了，都需要关闭数据库的链接
            db.close();
        })
    })
}

