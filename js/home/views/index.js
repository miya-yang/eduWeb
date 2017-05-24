/**
 * Author: Miyang
 * Date: 2017-05-07
 * Description: 主页用JS
 */

$(function(){
	//carousel
    $("#carousel-figure").slideBox();
    $("#carousel-figure img").css("width", $(window).width());
    //isLogin
    common.isLogin();
    course.getIndexCourse();
});