/**
 * Author: Miyang
 * Date: 2017-05-19
 * Description: comment.html js
 */

var comment = {
    _url: "/eduWeb/API/index.php",
    _root: "/eduWeb",

    getComment: function () {
        if(common.getUrlParam("action") === "bbs"){
            $.ajax({
                url: this._url + "?m=comment&c=comment&a=getComment",
                type: "get",
                data: {
                    action: common.getUrlParam("action"),
                    id: common.getUrlParam("id")
                },
                dataType: "json",
                success: function(res){
                    $(".comment-num").text(res.len);
                    for(var i = 0;i < res.len;i++){
                        var text = '<div class="comment-body"><div class="comment-floor">' + (i+1) + 'F</div><a href="' + comment._root + '/views/user/index.html?id=' + res.data[i].userid + '"><div class="comment-author color-aaa">' + res.data[i].nickname + '</div></a><div class="comment-article">' + res.data[i].content + '</div><div class="comment-date color-aaa">' + res.data[i].createat + '</div><hr></div>';
                        $(".comment-item").append(text);
                    }
                },
                error: function(){
                    dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                    return false;
                }
            });
        }else if(common.getUrlParam("action") === "course"){
            $.ajax({
                url: this._url + "?m=comment&c=comment&a=getComment",
                type: "get",
                data: {
                    action: common.getUrlParam("action"),
                    id: common.getUrlParam("id")
                },
                dataType: "json",
                success: function(res){
                    $(".comment-num").text(res.len);
                    for(var i = 0;i < res.len;i++){
                        var text = '<div class="comment-body"><div class="comment-floor">' + (i+1) + 'F</div><a href="' + comment._root + '/views/user/index.html?id=' + res.data[i].userid + '"><div class="comment-author color-aaa">' + res.data[i].nickname + '</div></a><div class="comment-article">' + res.data[i].content + '</div><div class="comment-date color-aaa">' + res.data[i].createat + '</div><hr></div>';
                        $(".comment-item").append(text);
                    }
                },
                error: function(){
                    dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                    return false;
                }
            });
        }

    },
    sendComment: function(){
        //判断输入是否合法
        var message = $.trim($("#comment-message").val());
        if(message === ""){
            dialog.tips('评论不得为空');
            return false;
        }else if(message.length >= 500){
            dialog.tips('评论字数超过限制');
            return false;
        }
        //发送数据
        $.ajax({
            url: this._url + "?m=Comment&c=comment&a=sendComment",
            type: "post",
            data: {
                content: message,
                id: common.getUrlParam("id"),
                userid: localStorage.getItem("userId"),
                password: localStorage.getItem("password"),
                action: common.getUrlParam("action")
            },
            dataType: "json",
            success: function(res){
                if(res.status){
                    dialog.tips('评论成功！');
                    setTimeout(function() {
                        history.go(0);
                    },1000);
                }else{
                    dialog.tips(res.message);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    }
};