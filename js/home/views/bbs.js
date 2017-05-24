/**
 * Author: Miyang
 * Date: 2017-05-16
 * Description: bbs.html JS
 */

$(function(){
    //isLogin
    common.isLogin();
    //get BBS
    bbs.getAllBbs();
});

$("#question-close-btn").on("click", function(){
    bbs.editBtnClose();
});

$("#open-edit-btn").on("click", function(){
//检查用户是否登录
    if(login.isLogin()){
        bbs.editBtnOpen();
        return true;
    }else{
        dialog.tips('您需要登录才能发布问题');
        $("#login-btn").click();
        return false;
    }
});

$("#submit-question").on("click", function(){
    bbs.send();
});