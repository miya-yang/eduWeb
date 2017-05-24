<?php
namespace Blog\Controller;
use Think\Controller;

Class BlogController extends Controller {

    public function sendBlog() {
        //判断用户是否登录
        $flag = D('User') -> isLogin();
        $userId = I('post.userId');
        $password = I('post.password');
        $title = I('post.title');
        $content = I('post.content');
        if(!$flag) {
            return show(0, '博文发布失败：用户没有登录');
        }else{
            if(empty($title) || empty($content)){
                return show(0, '博文发布失败：缺少参数');
            }
            //判断该用户是否合法
            $isReal = D('User') -> checkUserByUserId($userId, $password);
            if($isReal) {
                //用户存在
                $data = D('Blog') -> sendBlog($userId, $title, $content);
                return show(1, '博文发布成功', $data);
            }else{
                return show(0, '博文发布失败：用户信息有误,请刷新后再试');
            }
        }
    }

    public function getUser() {
        $id = I('get.id');
        if(empty($id)) {
            return show(0, '获取用户信息失败：缺少参数');
        }
        $data = D('User') -> getUserById($id);
        return show(1, '用户信息获取成功', $data);
    }

    public function getBlogList() {
        $id = I('get.id');
        if(empty($id)) {
            return show(0, '获取博客列表失败：缺少参数');
        }
        $data = D('Blog') -> getBlogList($id);
        return show(1, '获取博客列表成功', $data);
    }

    public function getBlogById() {
        $id = I('get.id');
        if(empty($id)) {
            return show(0, '获取博客文章失败：缺少参数');
        }
        $data = D('Blog') -> getBlogById($id);
        return show(1, '获取博客文章成功', $data);
    }

    public function delBlog() {
        $id = I('get.id');
        if(empty($id)) {
            return show(0, '删除博客文章失败：缺少参数');
        }
        $data = D('Blog') -> delBlog($id);
        if($data != 0){
            return show(1, '删除博客文章成功', $data);
        }
        return show(0, '删除博客文章失败：数据错误');
    }

}