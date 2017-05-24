<?php
namespace Comment\Controller;
use Think\Controller;

Class CommentController extends Controller {

    public function getComment() {
        $i = I('get.id');
        $a = I('get.action');
        if(empty($i) || empty($a)) {
            return show(0, '查找错误，缺少参数');
        }
        if($a == 'bbs') {
            $data = D('Comment') -> getCommentByArticleId($i);
        }else if($a == 'course') {
            $data = D('Comment') -> getCommentByCourseId($i);
        }
        return show(1, '获取评论成功', $data);
    }

    public function sendComment() {
        //判断用户是否登录
        $flag = D('User') -> isLogin();
        $content = I('post.content');
        $id = I('post.id');
        $userId = I('post.userid');
        $password = I('post.password');
        $action = I('post.action');
        if(!$flag) {
            return show(0, '评论发送失败：用户没有登录');
        }else{
            //判断该用户是否合法
            $isReal = D('User') -> checkUserByUserId($userId, $password);
            if($isReal){
                //用户存在
                if($action == 'bbs') {
                    $data = D('Comment') -> sendBbsComment($userId, $id, $content);
                    if($data){
                        return show(1, '评论发送成功', $data);
                    }else{
                        return show(0, '评论发送失败：传输数据有误');
                    }
                }else if($action == 'course') {
                    $data = D('Comment') -> sendCourseComment($userId, $id, $content);
                    if($data){
                        return show(1, '评论发送成功', $data);
                    }else{
                        return show(0, '评论发送失败：传输数据有误');
                    }
                }
            }else{
                return show(0, '评论发送失败：用户信息有误，请刷新后再试');
            }

        }
    }

}