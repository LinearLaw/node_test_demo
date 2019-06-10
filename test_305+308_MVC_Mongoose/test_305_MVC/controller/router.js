/**
 * @desc router.js用于对app.js里面的路由进行统一处理
 *      router仍然不进行具体逻辑操作，只作为导向，具体的逻辑操作交给models来解决
 */
// 0、引入相应的包，我们在models里面的file写入相应的file 操作的具体逻辑
//      formidable用于处理ajax请求的参数，进行序列化
//      path模块用来处理ajax请求的path参数
//      fs模块用来进行file的读写
var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");

// 1、主页处理，render index模板，前提是要先进行file的读写操作
exports.showIndex = function(req,res,next){
    // 读写操作是异步的，因此需要在读写操作完成之后再进行render模板的操作，
    // render模板的时候需要加入内部的名称
    // 将render的操作作为回调函数传入到读写操作之中，然后在读写操作的完成后调用这个回调函数
    file.getAllAlbums((err,allAlbums)=>{
        if(err){
            next();
            return;
        }
        res.render("index",{
            "albums":allAlbums
        });
    })
}

//2、相册页的处理
exports.showAlbum = (req,res,next)=>{
    // 相册的名字从req请求的参数中读取，req.params中存有该参数
    var albumName = req.params.albumName;
    //  先进行读取albumname的操作，获取相应文件夹中的所有filename，
    //  然后render其album模板，render的时候向其传入参数
    file.getAllImagesByAlbumName(albumName,(err,imagesArray)=>{
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumname":albumName,
            "images":imagesArray
        });
    });
}



