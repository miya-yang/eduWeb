<?php
namespace Bbs\Controller;
use Think\Controller;

Class BbsController extends Controller {

    public function getOneBbs() {
        $id = I('get.id');
        $action = I('get.action');
        if(empty($id) || empty($action)) {
            return show(0, '查找错误：缺少参数');
        }
        $data = D('Bbs') -> getBbsInfoByBbsId($id);
        return show(1, '查找论坛文章成功', $data);
    }

    public function getAllBbs() {
        $data = D('Bbs') -> getAllBbs();
        return show(1, '查找论坛所有文章成功', $data);
    }

    public function sendBbs() {
        //判断用户是否登录
        $flag = D('User') -> isLogin();
        $title = I('post.title');
        $content = I('post.content');
        $userId = I('post.userid');
        $password = I('post.password');
        if(!$flag) {
            return show(0, '问题发布失败：用户没有登录');
        }else{
            //判断该用户是否合法
            $isReal = D('User') -> checkUserByUserId($userId, $password);
            if($isReal) {
                //用户存在
                $data = D('Bbs') -> sendBbs($userId, $title, $content);
                if ($data) {
                    return show(1, '问题发布成功', $data);
                } else {
                    return show(0, '问题发布失败：传输数据有误');
                }
            }else{
                return show(0, '问题发布失败：用户信息有误,请刷新后再试');
            }
        }
    }

}