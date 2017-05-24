<?php
namespace Admin\Controller;
use Think\Controller;

Class AdminController extends Controller {
    public function sendCommand() {
        $c = I('post.command');
        if(empty($c)){
            return show(0, '管理员登录失败：缺少参数');
        }
        $res = D('Admin') -> sendCommand($c);
        if(empty($res)){
            return show(0, '管理员登录失败：口令有误');
        }else{
            session('admin', $res);
            return show(1, '管理员登录成功！');
        }
    }

    public function logOut() {
        session('admin', null);
        return show(1, '退出登录成功');
    }

    public function isLogin() {
        $flag = D('Admin') -> isLogin();
        if($flag){
            return show(1, '管理员已登录');
        }else{
            return show(0, '管理员未登录');
        }
    }
}