<?php
namespace Admin\Controller;
use Think\Controller;

Class AnnouncementController extends Controller {

    public function edit() {
        $c = I('get.content');
        if(empty($c)) {
            return show(0, '公告更新失败：内容不得为空');
        }
        $data = D('Announcement') -> set($c);
        if($data === 0){
            return show(0, '公告更新失败：数据错误');
        }
        return show(1, '公告更新成功', $data);
    }

    public function get() {
        $data = D('Announcement') -> get();
        return show(1, '公告获取成功', $data);
    }
}