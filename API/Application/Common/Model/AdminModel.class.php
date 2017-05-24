<?php
namespace Common\Model;
use Think\Model;

Class AdminModel extends Model {
    public function sendCommand($c) {
        $p = getAdminCommand($c);
        $data = M('admin') -> where('command="'.$p.'"') -> find();
        return $data;
    }

    public function isLogin() {
        if(!empty($_SESSION['admin'])) {
            return true;
        }else{
            return false;
        }
    }
}