/**
 * Author: Miyang
 * Date: 2017-05-17
 * Description: 获取课程
 */

var course = {
    _url: "/eduWeb/API/index.php",

    getClassify: function(){
        $.ajax({
            url: this._url + "?m=course&c=Classify&a=getAllClassify",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function(res){
                $("#classify-list").empty();
                $("#classify-list").append('<li><a href="javascript:;" class="btn btn-default active btn-classify" data-id="0" id="get-allCourse">全部</a></li>');
                for(var i = 0;i < res.len;i++){
                    var text = '<li><a href="javascript:;" class="btn btn-default btn-classify" data-id="' + res.data[i].objectid + '">' + res.data[i].name + '</a></li>';
                    $("#classify-list").append(text);
                }
                $(".btn-classify").on("click", function(){
                    course.clickClassifyBtn($(this));
                });
                //显示分类名称
                course.getClassifyName();
                //默认获取所有课程
                course.getCourse($("#get-allCourse"));
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getClassifyName: function(){
        var len = $("#classify-list li").length;
        for(var i = 0;i < len;i++){
            if($("#classify-list a").eq(i).hasClass('active')){
                $(".group-block h3").text($("#classify-list a").eq(i).text());
            }
        }
    },
    clickClassifyBtn: function(obj){
        //移除按钮样式
        var len = $("#classify-list li").length;
        for(var i = 0;i < len;i++){
            $("#classify-list a").removeClass("active");
        }
        obj.addClass("active");
        //获取课程
        course.getCourse(obj);
        //修改课程标题
        course.getClassifyName();
    },
    getCourse: function(obj){
        var i = obj.attr("data-id");
        if(i === 0){
            i = "";
        }
        $.ajax({
            url: this._url + "?m=course&c=course&a=getcourses",
            type: "get",
            data: {
                classifyId: i
            },
            dataType: "json",
            success: function(res){
                //移除页面课程信息
                $("#course-group").empty();
                //添加新的课程信息
                for(var i = 0;i < res.len;i++){
                    var des = res.data[i].description;
                    if(des.length > 55){
                        des = des.substring(0,55) + '......';
                    }
                    var text = '<div class="col-md-3"><div class="panel panel-success course-group"><div class="panel-heading text-center">' + res.data[i].name + '</div><div class="panel-body"><p class="text-center">免费课程</p><p class="text-center text-decoration course-detail">' + des + '</p><a href="courseDetail.html?id=' + res.data[i].courseid + '" class="btn btn-warning btn-block btn-detail">查看详情</a></div></div></div>';
                    $("#course-group").append(text);
                }

            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getCourseInfo: function(){
        var id = common.getUrlParam('id');
        if(id == null){
            location.href = "courseList.html";
        }
        $.ajax({
            url: this._url + "?m=course&c=course&a=getCourseInfo",
            type: "get",
            data: {
                id: id
            },
            dataType: "json",
            async: false,
            success: function(res){
                $(".detail-header h1").text(res.data.name);
                $("#course-author").text(res.data.nickname);
                $("#course-date").text(res.data.createat);
                $("#course-study-num").text(res.data.coursenumber);
                $("#course-detail").text(res.data.description);
                $("#do-study").on("click",function(){
                    location.href = "../article/article.html?action=course&id=" + id;
                });
                var classifyId = res.data.classifyid;
                $.ajax({
                    url: course._url + "?m=course&c=classify&a=getClassifyById",
                    type: "get",
                    data: {
                        classifyId: classifyId
                    },
                    dataType: "json",
                    async: true,
                    success: function(res){
                        $("#classifyName").text(res.data.name);
                    },
                    error: function(){
                        dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                        return false;
                    }
                });
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    sendCourse: function(){
        var title = $.trim($("#title").val());
        var desc = $.trim($("#desc").val());
        var content = $("#preview-column").html();
        var classify = $("option:selected").attr("data-num");
        if(title === "" || desc === "" || content === "" || classify === ""){
            dialog.tips('课程信息不得为空');
            return false;
        }
        $.ajax({
            url: this._url + "?m=course&c=course&a=sendCourse",
            type: "post",
            data: {
                userId: localStorage.getItem("userId"),
                password: localStorage.getItem("password"),
                title: title,
                desc: desc,
                content: content,
                classify: classify
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
    getEditClassify: function(){
        $.ajax({
            url: this._url + "?m=course&c=Classify&a=getAllClassify",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function(res){
                for(var i = 0;i < res.len;i++){
                    var text = '<option data-num="' + res.data[i].objectid + '">' + res.data[i].name + '</option>';
                    $("#classify").append(text);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    getCourseList: function(){
        var id = localStorage.getItem("userId");
        $.ajax({
            url: this._url + "?m=course&c=course&a=getCourse",
            type: "get",
            data: {
                id: id
            },
            dataType: "json",
            success: function(res){
                for(var i = 0;i < res.len;i++){
                    var text = '<tr><td>' + (i+1) + '</td><td><a href="courseDetail.html?id=' + res.data[i].courseid + '">' + res.data[i].name + '</a></td><td>' + res.data[i].coursenumber + '</td><td><button type="button" class="btn btn-warning btn-edit" data-num="' + res.data[i].courseid + '" onclick="common.develop()">编辑</button><button type="button" class="btn btn-danger btn-del" data-num="' + res.data[i].courseid + '">删除</button></td></tr>';
                    $(".courseList-table").append(text);
                }
                $(".btn-del").on("click", function(){
                    if(confirm("确定要删除课程吗？")){
                        course.delCourse($(this).attr("data-num"));
                    }
                });
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    delCourse: function(i){
        $.ajax({
            url: this._url + "?m=course&c=course&a=delCourse",
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
    },
    editCourse: function(){
        //这个方法已经死了
    },
    getIndexCourse: function(){
        $.ajax({
            url: this._url + "?m=course&c=course&a=getcourses",
            type: "get",
            data: {
                classifyId: 0
            },
            dataType: "json",
            success: function(res){
                //移除页面课程信息
                $("#course-group").empty();
                //添加新的课程信息
                for(var i = 0;i < 8;i++){
                    var des = res.data[i].description;
                    if(des.length > 55){
                        des = des.substring(0,55) + '......';
                    }
                    var text = '<div class="col-md-3"><div class="panel panel-success course-group"><div class="panel-heading text-center">' + res.data[i].name + '</div><div class="panel-body"><p class="text-center">免费课程</p><p class="text-center text-decoration course-detail">' + des + '</p><a href="views/course/courseDetail.html?id=' + res.data[i].courseid + '" class="btn btn-warning btn-block btn-detail">查看详情</a></div></div></div>';
                    $("#course-group").append(text);
                }

            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },

};