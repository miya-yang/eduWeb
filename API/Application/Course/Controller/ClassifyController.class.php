<?php
namespace Course\Controller;
use Think\Controller;

class ClassifyController extends Controller {

    public function getAllClassify() {
        $data = D('Classify') -> getAllClassify();
        return show(1, '查询课程分类成功', $data);
    }

    public function getClassifyById() {
        $i = I('get.classifyId');
        if(empty($i)){
            return show(0, '查找失败：参数错误');
        }
        $data = D('Classify') -> getClassifyById($i);
        return show(1, '查询分类名称成功', $data);
    }
}