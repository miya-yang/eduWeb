<?php

function show($status, $message, $data=array()){
	$result = array(
		'status' => $status,
		'len' => count($data),
		'message' => $message,
		'data' => $data,
	);
	exit(json_encode($result));
}

function getMd5Password($password) {
	return md5($password. C('MD5_PRE'));
}

function getAdminCommand($command) {
    return md5($command. C('MD5_COM'));
}
?>