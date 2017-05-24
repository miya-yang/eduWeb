/**
 * Author: Miyang
 * Date: 2017-05-07
 * Description: 页面公用JS
 */

//登录框
$("#login-close-btn").on("click",function(){
    login.close();
});
$("#login-btn").on("click",function(){
    login.open();
});
$("#login-username").on("blur",function(){
    login.inputVerify("login-username", login._usernameRes, "请输入6-15位用户名，由数字或字母组成！");
});
$("#login-password").on("blur",function(){
    login.inputVerify("login-password", login._passwordRes, "请输入6-18位密码，由数字或字母组成！");
});
$("#login-in").on("click",function(){
    login.submitVerify();
});

$(function(){
    //个人按钮
    $('.dropdown-toggle').dropdown();
});