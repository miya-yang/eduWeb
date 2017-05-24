<?php
namespace User\Controller;
use Think\Controller;

class LoginController extends Controller {

	public function check() {
		$username = I('post.username');
		$password = I('post.password');
		//missing parameter
		if(!isset($username) || !isset($password)) {
			return show(0, '登录失败：缺少参数');
		}
		$res = D('User') -> getUserByUsername($username);
		if(!$res) {
			return show(0, '登录失败：用户名不存在');
		}
		if($res['password'] != getMd5Password($password)) {
			return show(0, '登录失败：密码错误');
		}

		session('user', $res);
		return show(1, '登录成功');
	}

	public function isLogin() {
		//user-session is not empty
		if(!empty($_SESSION['user'])) {
			return show(1, '用户已登录', $_SESSION['user']);
		}
		return show(0, '用户未登录');
	}

	public function logOut() {
		session('user', null);
		return show(1, '退出登录成功');
	}
}