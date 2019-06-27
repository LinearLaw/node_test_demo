const express = require("express");
const app = express();

/**
 * @desc For console.log api infos 
 */

app.get("/console",(req,res)=>{
    console.log(req.query);
    res.send("success");
})

const PORT = 5555;
app.listen(PORT,()=>{
    console.log(`server listen to ${PORT}`)
})