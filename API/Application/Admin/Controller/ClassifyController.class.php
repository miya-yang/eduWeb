<?php
namespace Admin\Controller;
use Think\Controller;

Class ClassifyController extends Controller {
    public function editClassify() {
        $i = I('get.id');
        $n = I('get.name');
        if(empty($i) || empty($n)) {
            return show(0, '课程分类更新失败：缺少参数');
        }
        $res = D('Classify') -> editClassify($i, $n);
        return show(1, '课程分类更新成功');
    }

    public function delClassify() {
        $i = I('get.id');
        if(empty($i)) {
            return show(0, '课程分类删除失败：缺少参数');
        }
        //判断该分类下是否有课程
        $flag = D('CourseInfo') -> getCoursesByClassifyId($i);
        if(!empty($flag)) {
            return show(0, '课程分类删除失败：该分类下存在课程');
        }
        $res = D('Classify') -> delClassify($i);
        if($res == 0){
            return show(0, '课程分类删除失败：数据错误');
        }else{
            return show(1, '课程分类删除成功');
        }
    }

    public function addClassify() {
        $n = I('get.name');
        if(empty($n)){
            return show(0, '课程分类添加失败：缺少参数');
        }
        $res = D('Classify') -> addClassify($n);
        if($res){
            return show(1, '课程分类添加成功');
        }else{
            return show(0, '课程分类添加失败');
        }
    }
}