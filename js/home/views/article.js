/**
 * Author: Miyang
 * Date: 2017-05-16
 * Description: article .html JS
 */

$(function(){
    //isLogin
    common.isLogin();
    //get article
    article.getArticle();
    //get comment
    comment.getComment();
});

$("#sendComment").on("click", function(){
    comment.sendComment();
});