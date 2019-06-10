
exports.connectDB = (mongoose) => { 

   let db = mongoose.connect("mongodb://localhost:27017",(err)=>{
      if(err){
        console.log("数据库连接失败！");
      }else{
         console.log("数据库连接成功！");
      }
   });

};

