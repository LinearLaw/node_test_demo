const express = require("express");
const app = express();
const initUser = require("./model/test.js");

app.get("/",function(){
  initUser.insert();
  
})
app.listen(3000)