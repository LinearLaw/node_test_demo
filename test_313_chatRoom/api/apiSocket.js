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

    //新用户链接，进行推送
   socket.on('join', function (info) {
       //当前链接数
       let count = io.eio.clientsCount;

       /*单房间，通知房间内人员 */
       io.emit('userConnect', {
           userCount:count,
           info:"用户 " + info.userName + " 加入了房间"
       });
    });

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
        io.emit("userExit",{
            userName:userName
        })
    })
};
