<?php
namespace Common\Model;
use Think\Model;

Class ClassifyModel extends Model {
    private $_db = '';

    public function __construct() {
        $this -> _db = M('courseclassify');
    }

    public function getAllClassify() {
        $res = $this -> _db -> select();
        return $res;
    }

    public function getClassifyById($i) {
        $res = $this -> _db -> where('objectId='.$i) -> find();
        return $res;
    }

    public function editClassify($i, $n) {
        $data['name'] = $n;
        $res = $this -> _db -> where('objectId='.$i) -> save($data);
        return $res;
    }

    public function delClassify($i) {
        $res = $this -> _db -> delete($i);
        return $res;
    }

    public function addClassify($n) {
        $data['name'] = $n;
        $res = $this -> _db -> add($data);
        if($res){
            return true;
        }
        return false;
    }
}

?>