<?php
namespace Admin\Controller;
use Think\Controller;

Class UserController extends Controller {

    public function getAllUser() {
        $data = D('User') -> getAllUser();
        return show(1, '获取所有用户信息成功', $data);
    }

}