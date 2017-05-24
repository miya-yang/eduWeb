<?php
namespace Common\Model;
use Think\Model;

Class BbsModel extends Model {
    private $_db = '';

    public function __construct() {
        $this -> _db = M('bbs');
    }

    public function getBbsInfoByBbsId($i) {
        $res = $this -> _db -> where('bbsId='.$i) -> find();
        return $res;
    }

    public function getAllBbs() {
        $res = M() -> table('db_user  as  a') -> join('db_bbs  as  b  on  b.userId = a.objectId') -> field('a.username as username, b.bbsId as bbsId, b.title as title, b.content as content, b.createAt as createAt') -> select();
        return $res;
    }

    public function sendBbs($u, $t, $c) {
        if(empty($u) || empty($t) || empty($c)){
            return false;
        }
        $data['userId'] = $u;
        $data['title'] = $t;
        $data['content'] = $c;
        $this -> _db -> add($data);
        return true;
    }
}

?>