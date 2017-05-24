/**
 * Author: Miyang
 * Date: 2017-05-16
 * Description: 共有类
 */

 var common = {
 	_url: "/eduWeb/API/index.php",
	_root: "/eduWeb",

 	isLogin: function(){
 		$.ajax({
 			url: this._url + "?m=user&c=login&a=isLogin",
 			type: "get",
 			data: {

 			},
 			dataType: "json",
 			success: function(res){
 				var html;
 				if(res.status){
 					$("#nav-setting").empty();
 					if(res.data.authority == 0){
                        html = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + res.data.username + '<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="' + common._root + '/views/article/setArticle.html">博客管理</a></li><li><a href="' + common._root + '/views/user/index.html?id=' + localStorage.getItem("userId") + '">我的主页</a></li><li role="separator" class="divider"></li><li><a href="' + common._root + '/views/user/setProfile.html">个人设置</a></li><li><a href="javascript:;" id="logout-btn">退出登录</a></li></ul></li></ul>';
                    }else if(res.data.authority == 1){
                        html = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + res.data.username + '<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="' + common._root + '/views/article/setArticle.html">博客管理</a></li><li><a href="' + common._root + '/views/user/index.html?id=' + localStorage.getItem("userId") + '">我的主页</a></li><li><a href="' + common._root + '/views/course/setCourse.html?id=' + res.data.objectid + '">课程管理</a></li><li role="separator" class="divider"></li><li><a href="' + common._root + '/views/user/setProfile.html">个人设置</a></li><li><a href="javascript:;" id="logout-btn">退出登录</a></li></ul></li></ul>';
                    }
 					$("#nav-setting").append(html);
 					localStorage.setItem("userId", res.data.objectid);
 					localStorage.setItem("password", res.data.password);
 				}
 				$("#logout-btn").on("click", function(){
 					login.logOut();
 				});
 			},
 			error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
 			}
 		});
 	},
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
	develop: function() {
 		dialog.tips("该功能正在紧张研发中...");
 		return false;
    }
};
