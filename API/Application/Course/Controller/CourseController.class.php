<?php
namespace Course\Controller;
use Think\Controller;

class CourseController extends Controller {

    public function getCourses() {
        $classifyId = I('get.classifyId');
        if(empty($classifyId)) {
            $data = D('CourseInfo') -> getAllCourse();
        }else{
            $data = D('CourseInfo') -> getCoursesByClassifyId($classifyId);
        }
        return show(1, '查询对应课程成功', $data);
    }

    public function getCourseInfo() {
        $id = I('get.id');
        if(empty($id)) {
            return show(0, '查询失败：缺少参数');
        }else{
            $data = D('CourseInfo') -> getCourseInfoById($id);
            return show(1, '查询课程信息成功', $data);
        }
    }

    public function getCourseContent() {
        $id = I('get.id');
        $action = I('get.action');
        if($action != 'course') {
            return show(0, '查询失败：参数有误');
        }
        if(empty($id)) {
            return show(0, '查询失败：缺少参数');
        }
        $data = D('CourseInfo') -> getCourseContentById($id);
        //增加学习人数
        $add = D('CourseInfo') -> addStudyNumber($id);
        return show(1, '查询课程内容成功', $data);
    }

    public function sendCourse()
    {
        //判断用户是否登录
        $flag = D('User')->isLogin();
        $userId = I('post.userId');
        $password = I('post.password');
        $title = I('post.title');
        $desc = I('post.desc');
        $content = I('post.content');
        $class = I('post.classify');
        if (!$flag) {
            return show(0, '课程发布失败：用户没有登录');
        } else {
            if (empty($title) || empty($desc) || empty($content)) {
                return show(0, '课程发布失败：缺少参数');
            }
            //判断该用户是否合法
            $isReal = D('User')->checkUserByUserId($userId, $password);
            if ($isReal) {
                //用户存在
                $data = D('CourseInfo')->sendCourse($userId, $title, $desc, $content, $class);
                return show(1, '课程发布成功', $data);
            } else {
                return show(0, '课程发布失败：用户信息有误,请刷新后再试');
            }
        }
    }
    public function getCourse() {
        $id = I('get.id');
        if(empty($id)){
            return show(0, '课程列表获取失败：缺少参数');
        }
        $data = D('CourseInfo') -> getCourseList($id);
        return show(0, '课程列表获取成功',$data);
    }

    public function delCourse() {
        $id = I('get.id');
        if(empty($id)){
            return show(0, '课程删除失败：缺少参数');
        }
        $data = D('CourseInfo') -> delCourse($id);
        if($data != 0) {
            return show(1, '课程删除成功',$data);
        }
        return show(0, '课程删除失败：数据错误',$data);
    }

    public function editCourse() {
        $id = I('get.id');
        $action = I('get.action');
        if(empty($id) || empty($action)){
            return show(0, '获取编辑课程信息失败：参数不得为空');
        }
        $data = D('CourseInfo') -> editCourse($id);
        if(empty($data)){
            return show(0, '获取编辑课程信息失败：没有找到课程信息');
        }
        return show(1, '获取编辑课程信息成功', $data);
    }
}