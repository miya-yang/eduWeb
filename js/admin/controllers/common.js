/**
 * Author: Miyang
 * Date: 2017-05-21
 * Description: common js
 */

$(function(){
    //判断用户是否登录
    admin.isLogin();
    var height = $(window).height();
    $(".admin-left").css("height", height);
    $(".admin-right").css("height", height);
    $(".jumbotron").css("height", height);

});

$(window).resize(function(){
    var height = $(window).height();
    $(".admin-left").css("height", height);
    $(".admin-right").css("height", height);
    $(".jumbotron").css("height", height);
})

$(".is-develop").on("click", function(){
    other.testBtn();
});