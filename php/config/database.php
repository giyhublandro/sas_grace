<?php

	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Credentials: true');
	header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header("Content-Type: application/json; charset=UTF-8");

	//$db_host = 'http://get.ebarcles.com/';
	//
	$db_host = 'localhost';
	
	$online = false;
	
	if ($online) {
		$db_host = '91.216.107.185';
		$db_username = 'hotel2196195';
		$db_password = 'gmv7ziwqdz';
		$db_name = 'hotel2196195_1zygvi';
	}else{
		$db_username = 'root';
		$db_password = '';
		$db_name = 'coup_de_balai';
	}
	
	$con = new mysqli($db_host, $db_username, $db_password,$db_name);

	if ($con->connect_error) {
		die('Error : ('. $con->connect_errno .') '. $con->connect_error);
	}

	//$db_username = 'ebarc1553974_2znyh';
	//	$db_password = 'Klg16051990@';
	//	$db_name = 'ebarc1553974_2znyh';
	//$db_host = '91.216.107.183';

?>