exports.apiSocket = (socket)=> {

    //获取当前时间
    function getTimeNow(){
        let nowTime = new Date();
        let hours = nowTime.getHours();
        let minute = nowTime.getMinutes();
        let second = nowTime.getSeconds();
        let h = hours<10?"0"+hours:hours;
        let min = minute<10?"0"+minute:minute;
        let s = second<10?"0"+second:second;
        return h + ":" + min + ":" + s;
    }

    socket.on("fabiao",function(msg){
       let time = getTimeNow();
       let nowTime = msg.nowTime;
       let inputVal = msg.inputVal;
       let userName = msg.userName;
       
       io.emit("pinglun",{
          inputVal:inputVal,
          userName:userName,
          time:time,
          nowTime:nowTime
       });
    });
   
   //点赞
    socket.on("dianzan",function(msg){
        let nowtime = msg.nowtime;
        let dianzan = msg.dianzan;

        dianzan ++ ;//点赞
        io.emit("dianzanTotal",{
           nowtime:nowtime,
           dianzan:dianzan
       });
    });

    //退出会议
    socket.on("exit",function(msg){
        var userName = msg.userName;
        io.emit("deleteHourse",{
            userName:userName
        })
    })
};

