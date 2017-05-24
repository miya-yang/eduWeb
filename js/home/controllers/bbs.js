/**
 * Author: Miyang
 * Date: 2017-05-19
 * Description: bbs.html js
 */

var bbs = {
    _url: "/eduWeb/API/index.php",

    getAllBbs: function(){
        $.ajax({
            url: this._url + "?m=bbs&c=bbs&a=getAllBbs",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function(res){
                for(var i = 0;i < res.len;i++){
                    var text = '<div class="container bbs-item"><a href="../article/article.html?id=' + res.data[i].bbsid + '&action=bbs"><h4>' + res.data[i].title + '</h4></a><div class="color-aaa"><p>' + res.data[i].content + '</p><div class="question-tips"><span>' + res.data[i].username + '</span><span>' + res.data[i].createat + '</span></div></div><hr></div>';
                    $(".bbs-items").append(text);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    editBtnClose: function(){
        $(".shade").css("display","none");
        $(".edit-question").css("display","none");
    },
    editBtnOpen: function(){
        $(".shade").css("display","block");
        $(".edit-question").css("display","block");
    },
    send: function(){
        //判断内容是否有效
        var title = $.trim($("#question-title").val());
        var desc = $.trim($("#question-content").val());
        if(title === ""){
            dialog.tips('标题不得为空');
            return false;
        }else if(title.length > 30){
            dialog.tips('标题字数超过限制');
            return false;
        }
        if(desc === ""){
            dialog.tips('问题描述不得为空');
            return false;
        }else if(desc.length > 5000){
            dialog.tips('问题描述字数超过限制');
            return false;
        }
        $.ajax({
            url: this._url + "?m=bbs&c=bbs&a=sendBbs",
            type: "post",
            data: {
                content: desc,
                userid: localStorage.getItem("userId"),
                password: localStorage.getItem("password"),
                title: title
            },
            dataType: "json",
            async: false,
            success: function(res){
                if(res.status){
                    dialog.tips('问题发布成功！');
                    setTimeout(function(){
                        history.go(0);
                    },500);
                }else{
                    dialog.tips(res.message);
                    return false;
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    }
};