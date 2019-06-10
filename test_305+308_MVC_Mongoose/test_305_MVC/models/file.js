/**
 * @desc models里面写入具体的逻辑操作，
 *      controller指引到modle中，然后由model进行数据处理
 *      这里，定义file.js用来统一操作file
 */
var fs = require("fs");

/**
 * @desc fs API
 *          fs.readdir("路径名称",(err,files)=>{
 *              读取路径操作，输入一个路径，可以得到该路径下的所有文件名
 *              files为读取到的该路径下的所有文件的文件名组成的数组
 *          })
 *          fs.stat(path,function(err,stats){
 *              //stat接受一个文件的路径，返回的是stats，stats里面有这个文件的详细信息
 *              //stats可以调用isDirectory方法进行判断该文件是否是文件夹。true为文件夹，false为文件
 *              //stats.isDirectory 判断当前路径的文件是否是一个文件夹
 *              //stats.isFile      判断当前路径的文件是否是一个文件
 *          })
 */
//1、读取指定文件夹中的所有文件夹
exports.getAllAlbums = (callback)=>{
    fs.readdir("./uploads",(err,files)=>{
        if(err){
            callback("Uploads not found",null);
            return;
        }
        //这时候，files是当前uploads里面的所有文件的文件名组成的数组，循环判断该文件是否是一个文件夹
        //读取文件是一个异步操作，在循环里面写入异步操作，其中一个方法是定义一个迭代器
        var allAlbums = [];
        (function iterator(i){
            //迭代器终止条件，i已经读取到files的末尾
            if(i == files.length){
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i],(err,stats)=>{
                if(err){
                    callback("files not found",null);
                    return;
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);//自执行迭代
    })
}

//2、读取指定文件夹中的所有文件，假定类型为图片
exports.getAllImagesByAlbumName = (albumName,callback)=>{
    fs.readdir("./uploads/" + albumName,(err,files)=>{
        if(err){
            callback("Uploads file not found",null);
            return;
        }
        //操作和上面的差不多，上一个方法为读文件夹，这个方法来读取文件
        var allImages = [];
        (function iterator(i){
            //迭代器终止条件，i已经读取到files的末尾
            if(i == files.length){
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName + "/" + files[i],(err,stats)=>{
                if(err){
                    callback("files not found",null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);//自执行迭代
    })
}