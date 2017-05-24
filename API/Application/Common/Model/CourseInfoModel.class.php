<?php
namespace Common\Model;
use Think\Model;

Class CourseInfoModel extends Model {
    private $_db = '';

    public function __construct() {
        $this -> _db = M('course');
    }

    public function getCoursesByClassifyId($i) {
        $res = $this -> _db -> where('classifyId='.$i) -> select();
        return $res;
    }

    public function getAllCourse() {
        $res = $this -> _db -> select();
        return $res;
    }

    public function getCourseInfoById($i) {
        //$res = $this -> _db -> where('courseId='.$i) -> find();
        $res = M() -> table('db_user as a') -> join('db_course as b on b.authorId = a.objectId') -> field('a.nickname as nickname, a.username as username, b.courseId as courseId, b.name as name, b.description as description, b.courseNumber as courseNumber, b.classifyId as classifyId, B.authorId as authorId, b.content as content, b.createAt as createAt, b.updateAt as updateAt') -> find();
        return $res;
    }

    public function getCourseContentById($i) {
        $res = $this -> _db -> where('courseId='.$i) -> select();
        return $res;
    }

    public function sendCourse($i, $t, $d, $c, $class) {
        $data['name'] = $t;
        $data['description'] = $d;
        $data['authorId'] = $i;
        $data['content'] = $c;
        $data['classifyId'] = $class;
        $res = $this -> _db -> add($data);
        return $res;
    }

    public function getCourseList($id) {
        $res = $this -> _db -> where('authorId='.$id) -> select();
        return $res;
    }

    public function delCourse($id) {
        $res = $this -> _db -> where('courseId='.$id) -> delete();
        return $res;
    }

    public function editCourse($id) {
        $res = $this -> _db -> where('courseId='.$id) -> find();
        return $res;
    }

    public function addStudyNumber($id) {
        $res = $this -> _db -> where('courseId='.$id) -> setInc('courseNumber', 1);
        return $res;
    }
}
?>