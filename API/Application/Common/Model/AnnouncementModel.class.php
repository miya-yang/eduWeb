<?php
namespace Common\Model;
use Think\Model;

Class AnnouncementModel extends Model {
    private $_db = '';

    public function __construct() {
        $this -> $_db = M('announcement');
    }

    public function set($c) {
        $data['content'] = $c;
        $res = $this -> $_db -> where('newsId=1') -> save($data);
        return $res;
    }

    public function get() {
        $res = $this -> $_db -> find();
        return $res;
    }
}