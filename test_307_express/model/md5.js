var crypto = require("crypto");
modult.exports = (pwd)=>{
    var md5 = crypto.createHash("md5");
    var pwd = md5.update(pwd).digest("base64");
    return pwd;
}