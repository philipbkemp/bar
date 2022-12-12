<?php
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, POST');
	header("Content-type: application/json; charset=utf-8");

	include "Bar.php";

	// $db needs to be defined
	$db = null;

	$data = new BarResponse();
	$data->isFailure("ACTION_UNKNOWN");

	if ( isset($_GET["method"]) ) {
		switch ( $_GET["method"] ) {
			case "status":
				$data = Bar::getStatus($db);
				break;
			case "version":
				$data->isSuccess("0.1");
				break;
		}
	} else if ( isset($_POST["method"]) ) {
		switch ( $_POST["method"] ) {
			
		}
	}

	$db->close();

	echo json_encode($data);
?>