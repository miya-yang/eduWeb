<?php
namespace Common\Model;
use Think\Model;

Class UserModel extends Model {
	private $_db = '';

	public function __construct() {
		$this -> _db = M('user');
	}

	public function getUserByUsername($u) {
		$res = $this -> _db -> where('username="'.$u.'"') -> find();
		return $res;
	}

    public function getUserById($i) {
        $res = $this -> _db -> where('objectId="'.$i.'"') -> find();
        return $res;
    }

	public function checkUserByUserId($u, $p) {
	    $res = $this -> _db -> where('objectId="'.$u.'" and password="'.$p.'"') -> find();
	    if(!empty($res)){
	        return true;
        }else{
	        return false;
        }
    }

	public function doRegister($u, $p) {
		$data['username'] = $u;
		$data['password'] = getMd5Password($p);
		$res = $this -> _db -> add($data);
		if($res){
			return true;
		}
		return false;
	}

	public function isLogin() {
        if(!empty($_SESSION['user'])) {
            return true;
        }else{
            return false;
        }
    }

    public function getAllUser() {
	    $res = $this -> _db -> select();
	    return $res;
    }

    public function updateUserInfo($id, $e, $n, $s, $i) {
	    $data['email'] = $e;
	    $data['nickname'] = $n;
	    $data['sex'] = $s;
	    $data['intro'] = $i;
        $res = $this -> _db -> where('objectId='.$id) -> save($data);
        return $res;
    }

    public function updatePhone($id, $p) {
        $data['phone'] = $p;
        $res = $this -> _db -> where('objectId='.$id) -> save($data);
        return $res;
    }

    public function updatePassword($id, $p) {
        $data['password'] = $p;
        $res = $this -> _db -> where('objectId='.$id) -> save($data);
        return $res;
    }

    public function uploadPortrait($id, $info) {
        $data['portrait'] = $info;
        $res = $this -> _db -> where('objectId='.$id) -> save($data);
        return $res;
    }
}
?>