/**
 * Author: Miyang
 * Date: 2017-05-06
 * Description: 弹出层提示类
 */

var dialog = {
    error: function(m,t){
        if(arguments.length === 1){
            t = "错误信息";
        }
        layer.open({
            icon: 2,
            title: t,
            content: m
        });
    },
    success: function(m,t,u){
        if(arguments.length === 1){
            t = "成功信息";
        }
        layer.open({
            icon: 1,
            title: t,
            content: m,
            yes: function(){
                location.href = u;
            }
        });
    },
    text: function(m,t){
        if(arguments.length === 1){
            t = "信息";
        }
        layer.open({
            type: 1,
            skin: 'layui-layer-rim',
            area: ['420px', '240px'],
            content: m,
            title: t
        });
    },
    tips: function(m){
        layer.msg(m);
    },
    msg: function(m, t, f, fn1, fn2){
        layer.confirm(m, {
            btn: [t, f]
        }, fn1, fn2);
    }

};