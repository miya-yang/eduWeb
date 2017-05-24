<?php
namespace User\Controller;
use Think\Controller;

Class UserController extends Controller {
    public function getUserInfo() {
        //判断用户是否登录
        $flag = D('User') -> isLogin();
        $userId = I('post.userid');
        $password = I('post.password');
        if(!$flag) {
            return show(0, '个人信息获取失败：用户没有登录');
        }else{
            //判断该用户是否合法
            $isReal = D('User') -> checkUserByUserId($userId, $password);
            if($isReal) {
                //用户存在
                $data = D('User') -> getUserById($userId);
                if ($data) {
                    return show(1, '个人信息获取成功', $data);
                } else {
                    return show(0, '个人信息获取失败：传输数据有误');
                }
            }else{
                return show(0, '个人信息获取失败：用户信息有误,请刷新后再试');
            }
        }
    }

    public function updateInfo() {
        //判断用户是否登录
        $flag = D('User') -> isLogin();
        $userId = I('post.userid');
        $password = I('post.password');
        $email = I('post.email');
        $nickname = I('post.nickname');
        $sex = I('post.sex');
        $intro = I('post.intro');
        if(!$flag) {
            return show(0, '个人信息修改失败：用户没有登录');
        }else{
            if(empty($userId) || empty($email) || empty($nickname) || empty($sex)){
                return show(0, '个人信息修改失败：缺少参数');
            }
            //判断该用户是否合法
            $isReal = D('User') -> checkUserByUserId($userId, $password);
            if($isReal) {
                //用户存在
                $data = D('User') -> updateUserInfo($userId, $email, $nickname, $sex, $intro);
                return show(1, '个人信息修改成功', $data);
            }else{
                return show(0, '个人信息修改失败：用户信息有误,请刷新后再试');
            }
        }
    }

    public function updatePhone() {
        //判断用户是否登录
        $flag = D('User') -> isLogin();
        $userId = I('post.userid');
        $password = getMd5Password(I('post.password'));
        $phone = I('post.phone');
        if(!$flag) {
            return show(0, '手机号码修改失败：用户没有登录');
        }else{
            if(empty($phone)){
                return show(0, '手机号码修改失败：缺少参数');
            }
            //判断该用户是否合法
            $isReal = D('User') -> checkUserByUserId($userId, $password);
            if($isReal) {
                //用户存在
                $data = D('User') -> updatePhone($userId, $phone);
                return show(1, '手机号码修改成功', $data);
            }else{
                return show(0, '手机号码修改失败：密码错误,请刷新后再试');
            }
        }
    }

    public function updatePassword() {
        //判断用户是否登录
        $flag = D('User') -> isLogin();
        $userId = I('post.userid');
        $password = getMd5Password(I('post.password'));
        $newPassword = getMd5Password(I('post.newPassword'));
        if(!$flag) {
            return show(0, '密码修改失败：用户没有登录');
        }else{
            if(empty($newPassword)){
                return show(0, '密码修改失败：缺少参数');
            }
            //判断该用户是否合法
            $isReal = D('User') -> checkUserByUserId($userId, $password);
            if($isReal) {
                //用户存在
                $data = D('User') -> updatePassword($userId, $newPassword);
                session('user', null);
                return show(1, '密码修改成功，请重新登陆账号', $data);
            }else{
                return show(0, '密码修改失败：密码错误,请刷新后再试');
            }
        }
    }
}