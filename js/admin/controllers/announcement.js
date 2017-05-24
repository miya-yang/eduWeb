/**
 * Author: Miyang
 * Date: 2017-05-21
 * Description: announcement js
 */

var an = {
    _url: "/eduWeb/API/index.php",

    set: function(){
        var c = $.trim($("#an-content").val());
        if(c === ""){
            dialog.tips('内容不得为空');
            return false;
        }
        $.ajax({
            url: this._url + "?m=Admin&c=Announcement&a=edit",
            type: "get",
            data: {
                content: c
            },
            dataType: "json",
            success: function(res){
                dialog.tips(res.message);
                if(res.status){
                    setTimeout(function(){
                        history.go(0);
                    },500);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    },
    get: function(){
        $.ajax({
            url: this._url + "?m=Admin&c=Announcement&a=get",
            type: "get",
            data: {
            },
            dataType: "json",
            success: function(res){
                $("#an-content").val(res.data.content);
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    }
};