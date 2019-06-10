
var userName; // 用户名
var socket;

// 输入名字
$(".el-button--primary").click(function(){
    var inputVal = $(".userName").val().trim();
    if (inputVal == "") {
        toast('请输入发表内容');
        return;
    };
    $(".shadowBox").hide();
    userName = inputVal;
    $(".userInfo").show();
    $(".userInfoName").html("ID: "+userName);
    allFunc();
})

function allFunc(){
    socket = io();
    //按回车自动提交
    $(document).keyup(function(event){
        switch(event.keyCode) {
            case 13:
                report();
                return;
        }
    })
    //用户离开room
    $(window).bind('beforeunload', function(){
        socket.emit("exit",{
            userName:userName
        })
    })

    //发出消息，连接推送
    socket.on('connect', function () {
        socket.emit('join', {
            userName:userName,
        });
    });

    //发出消息，评论
    socket.on("pinglun", function (msg) {
        var userSingleWord = userName.slice(userName.length-1 , userName.length);
        var data = {
            userSingleWord:userSingleWord,
            userName:msg.userName + "",
            time:msg.time,
            content:msg.inputVal,
            nowTime:msg.nowTime
        }
        var html = template("cmtTpl",data);

        var count = $(".comment-area").children(".comment-item").length;
        //释放内存
        if(count>100){
            $(".comment-area").children(".comment-item").eq(0).remove();
        }
        $(".comment-area").append(html);
        $(".comment-area").scrollTop($(".comment-area")[0].scrollHeight);
    });


    var dianzanLimit = 100000000;
    //收到消息，点赞数据更新
    socket.on("dianzanTotal", function (msg) {
        var nowtime = msg.nowtime;
        var dianzan = msg.dianzan;

        if(parseInt(dianzan) >= dianzanLimit){
            $(".dianzan[nowtime=" + nowtime + "]").find("em").text(dianzanLimit - 1 + " +");
        }else{
            $(".dianzan[nowtime=" + nowtime + "]").find("em").text(dianzan);
        }
    });

    //收到消息，当前已连接
    socket.on("userConnect",function(msg){
        var obj = {
            infoTop:msg.info + "，当前用户 ",
            infoMiddle:msg.userCount,
            infoBottom:" 人"
        }
        var html = template("onePsnLink",obj);
        $(".comment-area").append(html);
        $(".comment-area").scrollTop($(".comment-area")[0].scrollHeight);
    })

    //收到消息，用户退出房间
    socket.on("userExit",function(msg){
        var obj = {
            infoTop:"用户 ",
            infoMiddle:msg.userName,
            infoBottom:" 退出了房间"
        }
        var html = template("onePsnLink",obj);
        $(".comment-area").append(html);
        $(".comment-area").scrollTop($(".comment-area")[0].scrollHeight);
    })
}

/**
 * @desc 按钮点击发表评论
 */
function report(e) {
    var nowTime = new Date().getTime();
    var inputVal = $(".form-comment input").val().trim();
    if (inputVal == "") {
        toast('请输入发表内容');
        return;
    };
    socket.emit("fabiao", {
        "userName": userName,
        "inputVal": inputVal,
        "nowTime": nowTime
    });
    $(".form-comment input").val("");
};

function plContent(){
    $(".form-btn input").focus();
}

//发出消息，点赞
function dianzan(this_) {
    var nowtime = $(this_).attr("nowtime");
    socket.emit("dianzan", {
        "nowtime": nowtime,
        "dianzan": parseInt($(this_).find("em").text()),
    });
};
