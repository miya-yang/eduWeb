/**
 * Author: Miyang
 * Date: 2017-05-21
 * Description: admin js
 */

var admin = {
    _url: "/eduWeb/API/index.php",

    login: function(){
        var command = $("#command").val();
        $.ajax({
            url: this._url + "?m=admin&c=admin&a=sendCommand",
            type: "post",
            data: {
                command: command
            },
            dataType: "json",
            success: function(res){
                if(res.status){
                    dialog.tips('登录成功');
                    setTimeout(function(){
                        location.href = "welcome.html";
                    },500);
                }else{
                    dialog.tips(res.message);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    logout: function(){
        $.ajax({
            url: this._url + "?m=admin&c=admin&a=logout",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                setTimeout(function(){
                    location.href = "login.html";
                },500);
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    isLogin: function(){
        $.ajax({
            url: this._url + "?m=admin&c=admin&a=isLogin",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function(res){
                if(!res.status){
                    location.href = "login.html";
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }

        });
    }
};