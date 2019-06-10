const crypto = require("crypto");

module.exports = (password)=>{
    const md5 = crypto.createHash("md5");
    const pwd = md5.update(password).digest("base64");
    return pwd;
}