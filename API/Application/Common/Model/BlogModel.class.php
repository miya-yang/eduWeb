<?php
namespace Common\Model;
use Think\Model;

Class BlogModel extends Model {
    private $_db = '';

    public function __construct() {
        $this -> _db = M('blog');
    }

    public function sendBlog($i, $t, $c) {
        $data['title'] = $t;
        $data['objectId'] = $i;
        $data['content'] = $c;
        $res = $this -> _db -> add($data);
        return $res;
    }

    public function getBlogList($i) {
        $res = $this -> _db -> where('objectId='.$i) -> select();
        return $res;
    }

    public function getBlogById($i) {
        $res = $this -> _db -> where('articleId='.$i) -> find();
        return $res;
    }

    public function delBlog($i) {
        $res = $this -> _db -> where('articleId='.$i) -> delete();
        return $res;
    }
}