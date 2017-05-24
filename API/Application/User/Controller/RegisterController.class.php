<?php
namespace User\Controller;
use Think\Controller;

class RegisterController extends Controller {

	public function doRegister() {
		$username = I('post.username');
		$password = I('post.password');
		//missing parameter
		if(!isset($username) || !isset($password)){
			return show(0, '注册失败：缺少参数');
		}

		$checkUser = D('User') -> getUserByUsername($username);
		if($checkUser) {
			return show(0, '注册失败：用户名已存在');
		}
		$doRegister = D('User') -> doRegister($username, $password);
		if($doRegister) {
            $res = D('User') -> getUserByUsername($username);
            session('user', $res);
			return show(1, '注册成功');
		}else{
			return show(0, '注册失败：请重新注册');
		}
	}
}