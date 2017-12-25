/**
 * @desc DAO，对数据库操作的封装
 */
var MongoClient = require("mongodb").MongoClient;
var settings = require("../settings.js");

function _connectDB(callback){
    //从配置文件中读取数据库地址
    var url = settings.dburl;
    MongoClient.connect(url,(err,db)=>{
        if(err){
            callback(err,null);
            return;
        }
        callback(err, db);
    })
}

//1、插入一条数据
exports.insertOne = function(collectionName , json , callback){
    _connectDB(function(err,db){
        db.collection(collectionName).insert(json).then(function(result){
            callback(err,result);
            //每次进行数据库操作的终了，都需要关闭数据库的链接
            db.close();
        })
    })
}

// 2、查找一条数据
exports.find = function(collectionName,json,C,D){
    //定义一个查找结果存放的容器
    var result = [];
    //如果没有传D参数
    if(arguments.length == 3){
        var callback = C;
        var skipnumber = 0;

        var limit = 0;
    }else if(arguments.length == 4){
        var callback = D;
        var args = C;
        var skipnumber = args.pageamount * args.page || 0;

        var limit = args.pageamount || 0;

        var sort = args.sort || {};
    }else{
        throw new Error("参数个数Error");
        return;
    }

    _connectDB(function(err,db){
        var cursor = db.collection(collectionName)
                        .find(json)
                        .skip(skipnumber)
                        .limit(limit)
                        .sort(sort);
        cursor.each(function(err,doc){
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            //判断遍历是否到了最后一位，不到最后一位就加入到result数组里；
            if(doc != null){
                result.push(doc);
            }else{
                callback(null,result);
                db.close();
            }
        })
    })
}

//删除
exports.deleteMany = function(collectionName,json,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).deleteMany(json,function(err,results){
            callback(err,results);
            db.close();
        })
    })
}

//修改
exports.updateMany = (collectionName,json1,json2,callback)=>{
    _connectDB((err,db)=>{
        db.collection(collectionName).updateMany(json1,json2,(err,results)=>{
            callback(err,results);
            db.close();
        })
    })
}

//获取所有数量
exports.getAllCount = (collectionName,callback)=>{
    _connectDB((err,db)=>{
        db.collection(collectionName).count({}).then((count)=>{
            callback(count);
            db.close();
        })
    })
}
