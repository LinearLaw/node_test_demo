(function(window){
    var reg = {
        a:/^[A-Za-z0-9]{6,16}$/,
        p:/^[A-Za-z0-9]{6,16}$/
    };


    //登录按钮
    $(".submit-btn").click(function(){
        var a = $("#login_field").val();
        var p = $("#password").val();
        if(!a || !p){
            $("#js-flash-container").show();
            return;
        }
        if(!reg.a.test(a)||!reg.p.test(p)){
            $("#js-flash-container").show();
            return;
        }
        var s = {
            userAccount:a,
            pwd:p
        }
        $.ajax({
            url:"/doLogin",
            method:"POST",
            data:s,
            success:function(res){
                console.log("success",res);
            },
            error:function(err){
                console.log(err)
            }
        })
    })

    //关闭登录的错误提示框
    $(".close-msg").click(function(){
        $("#js-flash-container").hide();
    })
    //关闭注册弹框
    $(".close-signup").click(function(){
        $(".signUpBox").css("opacity",0);
        setTimeout(function(){
            $(".signUpBox").hide();
            $(".signUpBox").css({
                "opacity":1
            });
        },300)
    })
    //关闭注册的错误提示框
    $(".signup-msg").click(function(){
        $("#js-flash-container_2").hide();
    })

    //弹出注册框
    $(".sign-up-pop").click(function(){
        $(".signUpBox").show();
        $(".signUpBox").css({
            "animation":"action_skew 0.3s linear",
        })
    })

    //注册按钮
    $(".signup-btn").click(function(){
        var n = $("#signup_field").val();
        var a = $("#signup_a").val();
        var p = $("#signup_p").val();
        var rp = $("#signup_pr").val();
        if(!a || !p || !n || !rp){
            $("#js-flash-container_2").show();
            return;
        }
        if(!reg.a.test(a)||!reg.p.test(p) || !reg.p.test(rp)){
            $("#js-flash-container_2").show();
            return;
        }
        if(rp!=p){
            $("#js-flash-container_2").show();
            return;
        }
        var s = {
            username:n,
            userAccount:a,
            pwd:p
        }
        $.ajax({
            url:"/doRegist",
            method:"POST",
            data:s,
            success:function(res){
                $(".signUpBox").hide();
                alert("success!");
                console.log("success",res);
            },
            error:function(err){
                console.log(err);
            }
        })
    })

})(window);
