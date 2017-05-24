/**
 * Author: Miyang
 * Date: 2017-05-07
 * Description: 登录类
 */

var login = {
    _input: ["login-username","login-password"],
    _usernameRes: /^[0-9A-Za-z]{6,15}$/,
    _passwordRes: /^[0-9A-Za-z]{6,18}$/,
    _url: "/eduWeb/API/index.php",

    close: function(){
        $(".shade").css("display","none");
        $(".login-box").css("display","none");
    },
    open: function(){
        $(".shade").css("display","block");
        $(".login-box").css("display","block");
    },
    inputVerify: function(i, r, m){
        if(arguments.length < 3){
            m = "用户名或密码不符合规则！";
        }
        var input = $("#" + i).val();
        if(!r.test(input)){
            $("#login-tips").html(m);
            $("#login-tips").css("opacity",1);
            return false;
        }else{
            $("#login-tips").html("&nbsp;");
            $("#login-tips").css("opacity",0);
            return true;
        }
    },
    submitVerify: function(){
        var b = login.inputVerify("login-username", login._usernameRes);
        var c = login.inputVerify("login-password", login._passwordRes);
        if(b && c){
            var u = $.trim($("#login-username").val());
            var p = $("#login-password").val();
            login.doLogin(u, p);
            return true;
        }else{
            return false;
        }
    },
    doLogin: function(u, p){
        $.ajax({
            url: this._url + "?m=user&c=login&a=check",
            type: "post",
            data: {
                username: u,
                password: p
            },
            dataType: "JSON",
            async: false,
            success: function(res){
                if(res.status){
                    //判断用户是否登录
                    var str = window.location.href;
                    str=str.substring(str.lastIndexOf("/") + 1);
                    if(str === "register.html"){
                        location.href = "../index.html";
                    }else{
                        history.go(0);
                    }
                }else{
                    $("#login-tips").html(res.message);
                    $("#login-tips").css("opacity",1);
                }
            },
            error: function(){
                $btn.button('reset');
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    logOut: function(){
        $.ajax({
            url: this._url + "?m=user&c=login&a=logOut",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function(res){
                localStorage.removeItem("userId");
                localStorage.removeItem("password");
                history.go(0);
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    isLogin: function(){
        var flag = false;
        $.ajax({
            url: this._url + "?m=user&c=login&a=isLogin",
            type: "get",
            data: {

            },
            dataType: "json",
            async: false,
            success: function(res){
                if(res.status){
                    flag = true;
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
        return flag;
    }
};