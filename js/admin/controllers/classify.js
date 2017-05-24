/**
 * Author: Miyang
 * Date: 2017-05-21
 * Description: classify js
 */

var classify = {
    _url: "/eduWeb/API/index.php",

    getClassify: function() {
        $.ajax({
            url: this._url + "?m=course&c=Classify&a=getAllClassify",
            type: "get",
            data: {},
            dataType: "json",
            success: function (res) {
                for (var i = 0; i < res.len; i++) {
                    var text = '<tr><td>' + (i+1) + '</td><td>' + res.data[i].name + '</td><td><a href="javascript:;" class="edit" data-num="' + res.data[i].objectid + '">修改</a> | <a href="javascript:;" class="del" data-num="' + res.data[i].objectid + '">删除</a></td></tr>';
                    $(".classify-table").append(text);
                }
                $(".edit").on("click", function(){
                    classify.changeStatus($(this));
                });
                $(".del").on("click", function(){
                    classify.delClassify($(this));
                });
            },
            error: function () {
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    changeStatus: function(obj){
        var id = obj.attr("data-num");
        var value = obj.parent().prev().text();
        obj.parent().prev().empty();
        var text = '<input type="text" class="form-control edit-classify-input" value="' + value + '" data-num="' + id + '">';
        obj.parent().prev().append(text);
        $('.edit-classify-input').keydown(function(e){
            if(e.keyCode==13){
                classify.editClassify($(this));
            }else if(e.keyCode==27){
                history.go(0);
            }
        });
    },
    editClassify: function(obj){
        var name = $.trim(obj.val());
        var id = obj.attr("data-num");
        if(name === ""){
            dialog.tips('分类名称不得为空');
            return false;
        }
        $.ajax({
            url: this._url + "?m=admin&c=classify&a=editClassify",
            type: "get",
            data: {
                name: name,
                id: id
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                setTimeout(function(){
                    history.go(0);
                },500);
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    delClassify: function(obj){
        var value = obj.parent().prev().text();
        var id = obj.attr("data-num");
        dialog.msg("确定要删除" + value + "分类吗？", "删除", "取消", function(){
            $.ajax({
                url: classify._url + "?m=admin&c=classify&a=delClassify",
                type: "get",
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res){
                    dialog.tips(res.message);
                    setTimeout(function(){
                        history.go(0);
                    },2000);
                },
                error: function(){
                    dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                    return false;
                }
            });
        });
    },
    addBtn: function(){
        if($(".classify-table").children(":last-child").eq(0).text() != ""){
            var text = "<tr><td></td><td><input type='text' class='form-control addClassify'></td><td></td></tr>";
            $(".classify-table").append(text);
        }
        $('.addClassify').keydown(function(e){
            if(e.keyCode==13){
                classify.addClassify();
            }else if(e.keyCode==27){
                history.go(0);
            }
        });
    },
    addClassify: function(){
        var name = $.trim($(".addClassify").val());
        if(name === ""){
            dialog.tips("分类课程名称不得为空");
            return false;
        }
        $.ajax({
            url: this._url + "?m=admin&c=classify&a=addClassify",
            type: "get",
            data: {
                name: name
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                setTimeout(function(){
                    history.go(0);
                },2000);
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    }

};