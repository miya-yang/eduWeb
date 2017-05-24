/**
 * Author: Miyang
 * Date: 2017-05-07
 * Description: user/*.html JS
 */

$(function(){
    user.getAn();
    user.getUserInfo();
    $("#upload-userid").val(localStorage.getItem("userId"));
});

$("#update-info").on("click", function(){
    user.updateInfo();
});

$("#edit-phone-btn").on("click", function(){
    user.updatePhone();
});

$("#edit-password-btn").on("click", function(){
    user.updatePassword();
});