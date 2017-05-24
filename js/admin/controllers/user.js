/**
 * Author: Miyang
 * Date: 2017-05-21
 * Description: user js
 */

var user = {
    _url: "/eduWeb/API/index.php",

    getAllUser: function(){
        $.ajax({
            url: this._url + "?m=Admin&c=user&a=getAllUser",
            type: "get",
            data: {

            },
            dataType: "json",
            success: function(res){
                for(var i = 0;i < res.len;i++){
                    var authority = res.data[i].authority;
                    authority == 0 ? authority = "学生" : authority = "教师";
                    var text = '<tr><td>' + (i+1) + '</td><td>' + res.data[i].username + '</td><td>' + res.data[i].nickname + '</td><td>' + res.data[i].sex + '</td><td>' + authority + '</td><td>' + res.data[i].phone + '</td><td>' + res.data[i].email + '</td><td>' + res.data[i].createat + '</td></tr>';
                    $(".userInfo-table").append(text);
                }
            },
            error: function(){
                dialog.tips('数据读取失败，请咨询管理员或重新刷新该页面');
                return false;
            }
        });
    }
};