/**
 * @desc 文件读取流和写入流  
 */

var fs = require('fs');//引入fs模块
var readStream = fs.createReadStream('1.mp4');//引入fs模块的文件读取方法，创建流，读取文件1.mp4
var writeStream = fs.createWriteStream('1-stream.mp4');//引入fs模块的文件写入方法，创建流，写入1-stream.mp4

readStream.on('data',function(){//读取数据时候的文件以buffer格式传输，传输过程时触发data事件
    if(writeStream.write(chunk) === false){//判断当前次数的写入流是否已经完成，完成了为true
        console.log('still cached');
        readStream.pause();   //当前写入流未完成，让读取流暂停，避免文件过大而导致内存泄漏
    }
})

readStream.on('end',function(){
    writeStream.end();//数据传输结束时，触发end事件
})
writeStream.on('drain',function(){//读取的文件chunk多余内容会存入缓存区（buffer），
    console.log('data drains');//当buffer全部被读取完成的时候，触发drain事件，
    readStream.resume();//当drain触发时，代表了当前写入流已经完成，重启读取流
})
