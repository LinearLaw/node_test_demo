const mongoose = require("mongoose");

const dbURL = "mongodb://127.0.0.1:27017/users";
const dbOption = {
    server:{
        poolSize:10,
        // auto_reconnect:true,
    },
    keepAlive: 120
}
mongoose.connect(dbURL,dbOption);

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.once("open",(cb)=>{

});

db.once("error",(cb)=>{

});

db.once("disconnected",()=>{

})

module.exports = db;
