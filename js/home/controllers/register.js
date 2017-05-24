/**
 * Author: Miyang
 * Date: 2017-05-06
 * Description: 注册验证类
 */
var register = {
    _usernameRes: /^[0-9A-Za-z]{6,15}$/,
    _passwordRes: /^[0-9A-Za-z]{6,18}$/,
    _url: "/eduWeb/API/index.php",

    inputVerify: function(i,r){
        var input = $("#" + i).val();
        if(r.test(input)){
            $("#" + i + "-tips").css("opacity","0");
            $("#" + i + "-group").removeClass("has-error");
            $("#" + i + "-group").addClass("has-success");
            return true;
        }else {
            $("#" + i + "-tips").css("opacity", "1");
            $("#" + i + "-group").removeClass("has-success");
            $("#" + i + "-group").addClass("has-error");
            return false;
        }
    },
    reenterVerify: function(i){
        var input = $("#" + i).val();
        var reinput = $("#reenter-" + i).val();
        if(input === reinput){
            $("#reenter-" + i + "-tips").css("opacity","0");
            $("#reenter-" + i + "-group").removeClass("has-error");
            $("#reenter-" + i + "-group").addClass("has-success");
            return true;
        }else{
            $("#reenter-" + i + "-tips").css("opacity", "1");
            $("#reenter-" + i + "-group").removeClass("has-success");
            $("#reenter-" + i + "-group").addClass("has-error");
            return false;
        }
    },
    isReadAgreement: function(i){
        var status = $("#" + i).get(0).checked;
        if(status){
            $("#btn-submit").attr("disabled",false);
            return true;
        }else{
            $("#btn-submit").attr("disabled",true);
            return false;
        }
    },
    submitVerify: function(){
        var a = register.inputVerify("username",register._usernameRes);
        var b = register.inputVerify("password",register._passwordRes);
        var c = register.reenterVerify("password");
        var d = register.isReadAgreement("agreement");
        if(a && b && c){
            var u = $.trim($("#username").val());
            var p = $("#password").val();
            register.doRegister(u, p);
            setTimeout(function(){
                location.href = "../index.html";
            }, 1500);
            return true;
        }else{
            return false;
        }
    },
    doRegister: function(u, p){
        $.ajax({
            url: this._url + "?m=user&c=register&a=doRegister",
            type: "post",
            data: {
                username: u,
                password: p
            },
            dataType: "JSON",
            success: function(res){
                dialog.tips('注册成功！');
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    }
};