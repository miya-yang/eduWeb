/**
 * Author: Miyang
 * Date: 2017-05-19
 * Description: article.html js
 */

var article = {
    _url: "/eduWeb/API/index.php",

    getArticle: function(){
        var i = common.getUrlParam("id");
        var a = common.getUrlParam("action");
        if(a === "bbs"){
            $.ajax({
                url: this._url + "?m=bbs&c=bbs&a=getOneBbs",
                type: "get",
                data: {
                    id: i,
                    action: a
                },
                dataType: "json",
                success: function(res){
                    $(".article h1").text(res.data.title);
                    $(".article-date").text(res.data.createat);
                    $(".article p").text(res.data.content);
                },
                error: function(){
                    dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                    return false;
                }
            });
        }else if(a === "course"){
            //修改导航状态
            var li = $(".nav li");
            li.eq(2).removeClass("active");
            li.eq(1).addClass("active");
            $.ajax({
                url: this._url + "?m=course&c=course&a=getCourseContent",
                type: "get",
                data: {
                    id: i,
                    action: a
                },
                dataType: "json",
                success: function(res){
                    var content = res.data[0].content;
                    content = article.HTMLDecode(content);
                    $(".article h1").text(res.data[0].name);
                    $(".article-date").text(res.data[0].createat);
                    $("#preview-column").html(content);
                },
                error: function(){
                    dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                    return false;
                }
            });
        }

    },
    HTMLDecode: function(text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
};