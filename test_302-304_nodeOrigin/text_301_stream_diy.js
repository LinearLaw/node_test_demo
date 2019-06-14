/**
 * @desc 在可写流和可读流以及转换流中，添加自定义的内容
 */

var stream = require('stream');
var util = require('util');
//可读流
function ReadStream(){
    stream.Readable.call(this);
}
util.inherits(ReadStream,stream.Readable);//让ReadStream继承可读流的原型
ReadStream.prototype._read = function(){
    this.push('I ');
    this.push('and ');
    this.push('you');
    this.push(null);
}
//可写流
function WriteStream(){
    stream.Writable.call(this);
    this._cached = new Buffer('')
}

util.inherits(WritStream,stream,Writable);//让WriteStream继承可写流的原型

// 重写可写流的read方法
WritStream.prototype._write = function(chunk,encode,cb){
    console.log(chunk.toString());
    cb();
}
//转换流
function TransformStream(){
    stream.Transform.call(this);
}

util.inherits(TransformStream,stream.Transform)

TransformStream.prototype._transform = function(){
    this.push(chunk)
    cb();
}
//转换流会多一个flush方法
TransformStream.prototype._flush = function(cb){
    this.push('flush run');
    cb();
}

//定制作用：自己加一些后缀、专有名称等

var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);