<?php
namespace Upload\Controller;
use Think\Controller;

Class UploadController extends Controller {

    public function uploadPortrait() {
        header("content-type:text/html;charset=utf-8");
        $upload = new \Think\Upload(C('PortraitUpload'));
        // 上传文件
        $info   =   $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        }else{  // 上传成功 获取上传文件信息
            foreach($info as $file){
                $saveInfo =  $file['savepath'].$file['savename'];
                $id = I('post.id');
                D('User') -> uploadPortrait($id, $saveInfo);
            }
            echo "<script>alert('头像上传成功！');history.go(-1);</script>";
        }
    }
}