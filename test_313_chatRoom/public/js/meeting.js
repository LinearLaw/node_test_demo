
var userName; // 用户名
var socket = io();

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
})

//按回车自动提交
$(document).keyup(function(event){
    switch(event.keyCode) {  
        case 13:  
            report();
            return;  
    }
})

/**
 * @desc 按钮点击发表评论 
 */
function report(e) {
    var nowTime = new Date().getTime();
    var inputVal = $(".form-comment input").val().trim();
    if (inputVal == "") {
        // toast('请输入发表内容');
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

}
//广播评论
socket.on("pinglun", function (msg) {
    var userName = msg.userName + "";
    var content = msg.inputVal;
    var time = msg.time;
    var nowTime = msg.nowTime;
    var userSingleWord = userName.slice(userName.length-1 , userName.length);
    
    var html = '<div class="comment-item" nowtime="' + nowTime + '">' +
                    '<a href="#" class="avatar noAvatar">' +
                        // '<img src="../img/audio03.png" alt="">' +
                        '<span>'+ userSingleWord +'</span>'+
                    '</a>' +
                    '<div class="content">' +
                        '<div class="from">' +
                            '<span class="name">' + userName + '</span>' +
                            '<span class="date">' + time + '</span>' +
                        '</div>' +
                        '<div class="message">' + content +
                            '<div class="sayContent">' +
                                '<span class="dianzan" onclick="dianzan(this)" nowtime="' + nowTime + '">' +
                                    '<img class="thumpBtn" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTI2NTI4Njk1Njk1IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NTIiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guNzc4MTA2OS4wLmkyIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTY5MS4yIDg3MC40SDQyMi45MTJjLTEwLjI0IDAtMTcuNDA4LTguMTkyLTE3LjQwOC0xNy40MDggMC0xMC4yNCA4LjE5Mi0xNy40MDggMTcuNDA4LTE3LjQwOGgyNjguMjg4YzE5LjQ1NiAwIDM1Ljg0LTkuMjE2IDQ2LjA4LTI1LjYgNy4xNjgtMTcuNDA4IDc5Ljg3Mi0yMDEuNzI4IDk0LjIwOC0yNTYgMTIuMjg4LTQ4LjEyOC0xNS4zNi05Ny4yOC02My40ODgtMTA5LjU2OC03LjE2OC0yLjA0OC0xNC4zMzYtMy4wNzItMjMuNTUyLTMuMDcySDYzNi45MjhjLTYuMTQ0IDAtMTEuMjY0LTMuMDcyLTE0LjMzNi04LjE5Mi0zLjA3Mi01LjEyLTQuMDk2LTExLjI2NC0yLjA0OC0xNi4zODQgMTAuMjQtMjcuNjQ4IDE2LjM4NC05Mi4xNiAxNi4zODQtMTczLjA1NiAwLTI5LjY5Ni0yNC41NzYtNTMuMjQ4LTUzLjI0OC01My4yNDgtMjkuNjk2IDAtNTMuMjQ4IDI0LjU3Ni01My4yNDggNTMuMjQ4djE3LjQwOGMwIDExOC43ODQtOTYuMjU2IDIxNS4wNC0yMTUuMDQgMjE1LjA0LTEwLjI0IDAtMTcuNDA4LTguMTkyLTE3LjQwOC0xNy40MDggMC0xMC4yNCA4LjE5Mi0xNy40MDggMTcuNDA4LTE3LjQwOCA5OC4zMDQgMCAxNzkuMi03OS44NzIgMTc5LjItMTc5LjJ2LTE3LjQwOGMwLTQ5LjE1MiAzOS45MzYtODkuMDg4IDg5LjA4OC04OS4wODggNDkuMTUyIDAgODkuMDg4IDM5LjkzNiA4OS4wODggODkuMDg4IDAgNDMuMDA4LTIuMDQ4IDExMy42NjQtMTIuMjg4IDE2MS43OTJoODMuOTY4YzEyLjI4OCAwIDIyLjUyOCAxLjAyNCAzMi43NjggNC4wOTYgNjYuNTYgMTcuNDA4IDEwNi40OTYgODcuMDQgODkuMDg4IDE1My42LTE1LjM2IDU3LjM0NC05My4xODQgMjUyLjkyOC05Ni4yNTYgMjYxLjEyIDAgMS4wMjQtMS4wMjQgMi4wNDgtMS4wMjQgMi4wNDgtMTUuMzYgMjYuNjI0LTQzLjAwOCA0My4wMDgtNzMuNzI4IDQ0LjAzMi0yLjA0OC0xLjAyNC0zLjA3Mi0xLjAyNC00LjA5Ni0xLjAyNHoiIGZpbGw9IiMzMzMzMzMiIHAtaWQ9IjE5NTMiPjwvcGF0aD48cGF0aCBkPSJNMzE1LjM5MiA4NzAuNEgyMjUuMjhjLTM5LjkzNiAwLTcxLjY4LTMxLjc0NC03MS42OC03MS42OFY1MTJjMC0zOS45MzYgMzEuNzQ0LTcxLjY4IDcxLjY4LTcxLjY4aDg5LjA4OGMxMC4yNCAwIDE3LjQwOCA4LjE5MiAxNy40MDggMTcuNDA4djM5NC4yNGMxLjAyNCAxMC4yNC03LjE2OCAxOC40MzItMTYuMzg0IDE4LjQzMnpNMjI1LjI4IDQ3Ni4xNmMtMTkuNDU2IDAtMzUuODQgMTYuMzg0LTM1Ljg0IDM1Ljg0djI4Ni43MmMwIDE5LjQ1NiAxNi4zODQgMzUuODQgMzUuODQgMzUuODRoNzEuNjh2LTM1OC40aC03MS42OHoiIGZpbGw9IiMzMzMzMzMiIHAtaWQ9IjE5NTQiPjwvcGF0aD48L3N2Zz4=">' +
                                    '<img class="alreadyThumps" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRDQzM1RUEzODNERTExRTc4NDEwODQ3OUVFNzM0QUE3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRDQzM1RUE0ODNERTExRTc4NDEwODQ3OUVFNzM0QUE3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NENDMzVFQTE4M0RFMTFFNzg0MTA4NDc5RUU3MzRBQTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NENDMzVFQTI4M0RFMTFFNzg0MTA4NDc5RUU3MzRBQTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7iFFECAAACS0lEQVR42uyYTUgVURTH35tMkwyR/Nho5heY+tCNKIIoFdpadOHOReKijbQKDBFaWIK4DRXcRQsXii0CDQpsUREJ7/m9CFITUXwGEZSW/i6cgVFm5vHeG6e78MCPM+/dOzN/7pwz554Jls8eBzywYngK9yANPkA/vI114vLd078ND8SUwUfogCisQSO8gbZ4L+aFoBG4Dg/hJoSgGf7Ac1kx3wSpm7XCZxFmPv93MAo50OCnoFxIgSWbsbD4G34KyhQftRnbFZ/lp6Ai8Zs2Yz/EX/NTUEj8is3YkfhLfgoy3yLvbcZSErlgMoIKJb3nYd9mPEP8gV+C+iAIYy4vTGtwn6ugO3AfVuGFw5xq8WvxXDiR51wPk/BXRB05zKuQOWoVa5wudmsusEM9205EkJr7AJ7BZeiW+HGyb1ArhdbVEKVqYQ/CFoJU+xwpjKku5+RBO5TCnqzMdIz7ZEMv5MeYp+pfE/xUq68EfXFbUoupbBmHoXgDNdb2gxXq4nACXilBx7J9GDwztw4ewbBk0jr8C3hs5n4IUapAh8wYUkE15XBORLLpvO0qHBoBDYzVSZX4XNJCkNIkNS+si6AqMzx0EVRhbup0EVQpflEnQVFeAd8NDTLsivR1Ya/aoGStXHREdBFUae1SDI0ybPFihVwEbZFhBzoISpcMi3j5sSHZ+DEsbfd/F9Qifl4HQbellVK7z9fmn2rHeIj/BV9tPiSo/e6GQyOYjKkmskSOOwnol9ZO4jEMWPqos1YgeGm/4RM8QcyMdeBEgAEAOHp5ikFW2IwAAAAASUVORK5CYII=" alt="">'+
                                    '<em>0</em>' +
                                '</span>' +
                                // '<span class="plContent" onclick="plContent(this)">' +
                                //     '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTI3OTA1OTUxNTA0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY3NDciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTQ5LjUwNCAyMTUuMDR2NTQ4Ljg2NEgzNDguMTZsOTYuMjU2IDEyOS4wMjQgOTQuMjA4LTEyOS4wMjRoMzcwLjY4OFYyMTUuMDRIMTQ5LjUwNHogbTcxNi44IDUwNy45MDRINTM2LjU3NmMtMTIuMjg4IDAtMjQuNTc2IDYuMTQ0LTMyLjc2OCAxNi4zODRsLTYxLjQ0IDgzLjk2OC02MS40NC04My45NjhjLTguMTkyLTEwLjI0LTIwLjQ4LTE2LjM4NC0zMi43NjgtMTYuMzg0SDE5MC40NjRWMjU2aDY3NS44NHY0NjYuOTQ0eiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iNjc0OCI+PC9wYXRoPjxwYXRoIGQ9Ik0yNzYuNDggNDMwLjA4aDQ2OC45OTJjMTIuMjg4IDAgMjAuNDgtOC4xOTIgMjAuNDgtMjAuNDhzLTguMTkyLTIwLjQ4LTIwLjQ4LTIwLjQ4SDI3Ni40OGMtMTIuMjg4IDAtMjAuNDggOC4xOTItMjAuNDggMjAuNDhzMTAuMjQgMjAuNDggMjAuNDggMjAuNDh6TTI3Ni40OCA2MDIuMTEyaDI5Mi44NjRjMTIuMjg4IDAgMjAuNDgtOC4xOTIgMjAuNDgtMjAuNDhzLTguMTkyLTIwLjQ4LTIwLjQ4LTIwLjQ4SDI3Ni40OGMtMTIuMjg4IDAtMjAuNDggOC4xOTItMjAuNDggMjAuNDhzMTAuMjQgMjAuNDggMjAuNDggMjAuNDh6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSI2NzQ5Ij48L3BhdGg+PC9zdmc+">' +
                                //     '<em>评论</em>' +
                                // '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    var count = $(".comment-area").children(".comment-item").length;
    //释放内存
    if(count>100){
        $(".comment-area").children(".comment-item").eq(0).remove();
    }
    $(".comment-area").append(html);
    $(".comment-area").scrollTop($(".comment-area")[0].scrollHeight);
});


//发出点赞socket
function dianzan(this_) {
    var nowtime = $(this_).attr("nowtime"); 
    socket.emit("dianzan", {
        "nowtime": nowtime,
        "dianzan": parseInt($(this_).find("em").text()),
    });
};

var dianzanLimit = 100000000;
//接收点赞推送
socket.on("dianzanTotal", function (msg) {
    var nowtime = msg.nowtime;
    var dianzan = msg.dianzan;
    if(parseInt(dianzan) >= dianzanLimit){
        $(".comment-item[nowtime=" + nowtime + "]").find(".dianzan em").text(dianzanLimit - 1 + " +");
    }else{
        $(".comment-item[nowtime=" + nowtime + "]").find(".dianzan em").text(dianzan);
    }
});

//退出聊天室
socket.on("deleteHourse",function(msg){
    //msg = { userName }

})

//获取当前连接数
socket.on("userConnect",function(msg){
    var count = msg.userCount;
    var html = '<div class="comment-item">'+
                '<div class="exitChatBox">'+
                    '<span class="exitChat">'+
                        '<span>当前用户 </span>'+
                        '<span class="exitName">'+count+'</span>'+
                        '<span> 人</span>'+                    
                    '</span>'+
                '</div>'+
            '</div>'
    $(".comment-area").append(html);
    $(".comment-area").scrollTop($(".comment-area")[0].scrollHeight);
})


