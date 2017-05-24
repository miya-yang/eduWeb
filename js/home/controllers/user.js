/**
 * Author: Miyang
 * Date: 2017-05-21
 * Description: 用户类
 */

var user = {
    _url: "/eduWeb/API/index.php",

    getAn: function(){
        $.ajax({
            url: this._url + "?m=Admin&c=Announcement&a=get",
            type: "get",
            data: {
            },
            dataType: "json",
            success: function(res){
                $("#an-content").text(res.data.content);
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getUserInfo: function(){
        $.ajax({
            url: this._url + "?m=User&c=User&a=getUserInfo",
            type: "post",
            data: {
                userid: localStorage.getItem("userId"),
                password: localStorage.getItem("password")
            },
            dataType: "json",
            success: function(res){
                if(!res.status){
                    location.href = "../../index.html";
                }else{
                    $("#info-username").text(res.data.username);
                    $("#info-email").val(res.data.email);
                    $("#info-nickname").val(res.data.nickname);
                    $("#info-phone").text(res.data.phone);
                    if(res.data.portrait !== ""){
                        $("#portrait").attr("src","/eduWeb/API/" + res.data.portrait);
                    }
                    var sex = res.data.sex;
                    if(sex == "男"){
                        $("input[name=sex]").eq(0).attr("checked","true");
                    }else{
                        $("input[name=sex]").eq(1).attr("checked","true");
                    }
                    $("#info-intro").val(res.data.intro);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    updateInfo: function(){
        var email = $.trim($("#info-email").val());
        var nickname = $.trim($("#info-nickname").val());
        var intro = $.trim($("#info-intro").val());
        var sex = $("input[name=sex]:checked").val();
        if(email === "" || nickname === "" || sex === ""){
            dialog.tips('个人信息不得为空');
            return false;
        }
        $.ajax({
            url: this._url + "?m=user&c=user&a=updateInfo",
            type: "post",
            data: {
                userid: localStorage.getItem("userId"),
                password: localStorage.getItem("password"),
                nickname: nickname,
                email: email,
                intro: intro,
                sex: sex
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                if(res.status){
                    setTimeout(function(){
                        history.go(0);
                    },1000);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    updatePhone: function(){
        var password = $("#phone-password").val();
        var phone = $.trim($("#phone-phone").val());
        if(password === "" || phone === ""){
            dialog.tips('安全信息不得为空');
            return false;
        }
        $.ajax({
            url: this._url + "?m=user&c=user&a=updatePhone",
            type: "post",
            data: {
                userid: localStorage.getItem("userId"),
                password: password,
                phone: phone
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                if(res.status){
                    setTimeout(function(){
                        history.go(0);
                    },1000);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    updatePassword: function(){
        var password = $("#password-old").val();
        var newPassword = $("#password-new").val();
        var newPassword2 = $("#password-new2").val();
        if(newPassword != newPassword2){
            dialog.tips('两次密码不一致');
            return false;
        }
        $.ajax({
            url: this._url + "?m=user&c=user&a=updatePassword",
            type: "post",
            data: {
                userid: localStorage.getItem("userId"),
                password: password,
                newPassword: newPassword
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                localStorage.removeItem("userId");
                localStorage.removeItem("password");
                if(res.status){
                    setTimeout(function(){
                        history.go(0);
                    },1000);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    }
};