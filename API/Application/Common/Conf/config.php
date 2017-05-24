<?php
return array(
	//'配置项'=>'配置值'
	'LOAD_EXT_CONFIG' => 'db',
	'MD5_PRE' => 'eduWeb',
    'MD5_COM' => 'MiyangIsCool',
    'PortraitUpload' => array(
        'maxSize'    =>    3145728,
        'rootPath'   =>    './',
        'savePath'   =>    'Public/img/Portrait/',
        'saveName'   =>    array('uniqid',''),
        'exts'       =>    array('jpg', 'gif', 'png', 'jpeg'),
        'autoSub'    =>    true,
        'subName'    =>    array('date','Ymd'),
    )
);
