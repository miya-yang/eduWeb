/**
 * Author: Miyang
 * Date: 2017-05-21
 * Description: blog.html js
 */

var blog = {
    _url: "/eduWeb/API/index.php",


    sendBlog: function(){
        var title = $.trim($("#title").val());
        var content = $("#preview-column").html();
        if(title === "" || content === ""){
            dialog.tips('博文信息不得为空');
            return false;
        }
        $.ajax({
            url: this._url + "?m=blog&c=blog&a=sendBlog",
            type: "post",
            data: {
                userId: localStorage.getItem("userId"),
                password: localStorage.getItem("password"),
                title: title,
                content: content
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                if(res.status){
                    setTimeout(function(){
                        history.go(-1);
                    },1000);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getIndex: function(){
        $.ajax({
            url: this._url + "?m=blog&c=blog&a=getUser",
            type: "get",
            data: {
                id: common.getUrlParam("id")
            },
            dataType: "json",
            success: function(res){
                var authority = res.data.authority;
                authority == 0 ? authority = "学生" : authority = "教师";
                $(".user-info h2").text(res.data.nickname);
                $(".user-info h5").text(authority);
                $(".user-info p").text(res.data.email);
                if(res.data.portrait !== ""){
                    $("#portrait").attr("src","/eduWeb/API/" + res.data.portrait);
                }

            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getBlogList: function(){
        $.ajax({
            url: this._url + "?m=blog&c=blog&a=getBlogList",
            type: "get",
            data: {
                id: common.getUrlParam("id")
            },
            dataType: "json",
            success: function(res){
                for(var i = 0;i < res.len;i++){
                    var text = '<div class="article-item"><h2><a href="article.html?id=' + res.data[i].articleid + '">' + res.data[i].title + '</a></h2><span>发布于 <span class="date">' + res.data[i].createat + '</span></span><hr></div>';
                    $(".blog-article").append(text);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getBlog: function(){
        $.ajax({
            url: this._url + "?m=blog&c=blog&a=getBlogById",
            type: "get",
            data: {
                id: common.getUrlParam("id")
            },
            dataType: "json",
            success: function(res){
                $(".article h1").text(res.data.title);
                $(".article-date").text(res.data.createat);
                var content = res.data.content;
                content = article.HTMLDecode(content);
                $("#preview-column").html(content);
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getBlogOperation: function(){
        $.ajax({
            url: this._url + "?m=blog&c=blog&a=getBlogList",
            type: "get",
            data: {
                id: localStorage.getItem("userId")
            },
            dataType: "json",
            success: function(res){
                for(var i = 0;i < res.len;i++){
                    var text = '<tr><td>' + (i+1) + '</td><td><a href="../user/article.html?id=' + res.data[i].articleid + '">' + res.data[i].title + '</a></td><td><button type="button" class="btn btn-warning" data-num="' + res.data[i].articleid + '" onclick="common.develop()">编辑</button><button type="button" class="btn btn-danger btn-del" data-num="' + res.data[i].articleid + '">删除</button></td></tr>';
                    $(".setArticle-table").append(text);
                }
                $(".btn-del").on("click", function(){
                    if(confirm("真的要删除吗？")){
                        blog.delBlog($(this).attr("data-num"));
                    }
                });
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }

        });
    },
    delBlog: function(i){
        $.ajax({
            url: this._url + "?m=blog&c=blog&a=delBlog",
            type: "get",
            data: {
                id: i
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                if(res.status === 1){
                    setTimeout(function(){
                        history.go(0);
                    },1500);
                }

            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }

        });
    }
};