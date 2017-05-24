<?php
namespace Common\Model;
use Think\Model;

Class CommentModel extends Model {
    private $_db = '';

    public function __construct() {
        $this -> _db = M('bbscomment');
    }

    public function getCommentByArticleId($i) {
        $res = M() -> table('db_user as a') -> join('db_bbscomment as b on b.objectId = a.objectId') -> where('b.articleId='.$i) -> field('a.objectId as userid, a.nickname as nickname, b.commentId as commentId, b.content as content, b.createAt as createAt') -> select();
        return $res;
    }

    public function getCommentByCourseId($i) {
        $res = M() -> table('db_user as a') -> join('db_coursecomment as b on b.objectId = a.objectId') -> where('b.articleId='.$i) -> field('a.objectId as userid, a.nickname as nickname, b.commentId as commentId, b.content as content, b.createAt as createAt') -> select();
        return $res;
    }

    public function sendBbsComment($u, $i, $c) {
        if(empty($u) || empty($i) || empty($c)){
            return false;
        }else{
            $data['objectId'] = $u;
            $data['articleId'] = $i;
            $data['content'] = $c;
            $this -> _db -> add($data);
            return true;
        }
    }

    public function sendCourseComment($u, $i, $c) {
        if(empty($u) || empty($i) || empty($c)){
            return false;
        }else{
            $data['objectId'] = $u;
            $data['articleId'] = $i;
            $data['content'] = $c;
            M('coursecomment') -> add($data);
            return true;
        }
    }
}

?>