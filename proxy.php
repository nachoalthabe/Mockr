<?php
session_start();
if(strpos($_SERVER['SERVER_SOFTWARE'],'pache')!=false){
	echo $_SERVER['REDIRECT_QUERY_STRING'];
	parse_str($_SERVER['REDIRECT_QUERY_STRING'],$get);
	if(isset($get['u'])){
  	$_SESSION['u'] = $get['u'];
  	echo file_get_contents($_SESSION['u']);
		exit();
	}
	echo file_get_contents($_SESSION['u'].$_SERVER['REQUEST_URI']);
}else{
	if(isset($_GET['u'])){
  	$_SESSION['u'] = $_GET['u'];
  	echo file_get_contents($_SESSION['u']);
	}
	echo file_get_contents($_SESSION['u'].$_SERVER['REQUEST_URI']);
}

