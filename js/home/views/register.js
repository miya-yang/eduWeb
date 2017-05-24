/**
 * Author: Miyang
 * Date: 2017-05-07
 * Description: register.html JS
 */

$("#username").on("blur",function(){
    register.inputVerify("username",register._usernameRes);
});
$("#password").on("blur",function(){
    register.inputVerify("password",register._passwordRes);
});
$("#reenter-password").on("blur",function(){
    register.reenterVerify("password");
});
$("#agreement").on("click",function(){
    register.isReadAgreement("agreement");
});
$("#btn-submit").on("click",function(){
    register.submitVerify();
});
$("#agreement-show").on("click",function(){
    var message = "<ul><li>使用该网站时遵守国家相关法律</li><li>不发布任何色情、暴力、恐吓等不良信息</li><li>网站管理员拥有对网站的最高解释权</li></ul>";
    dialog.text(message,"用户协议");
});

$(function(){
    if(login.isLogin()) {
        location.href = "../index.html";
    }
});