<?php
	function requireParam($scope,$key,$type="string") {
		if ( isset($scope[$key]) ) {
			if ( $type === "string" && trim($scope[$key]) === "" ) {
				return false;
			} else if ( $type === "numeric" && !is_numeric($scope[$key]) ) {
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, POST');
	header("Content-type: application/json; charset=utf-8");

	include "../factory/Bar.php";

	$db = /* connect to database with mysqli */

	$data = new BarResponse();
	$data->isFailure("ACTION_UNKNOWN");

	$POST = (array) json_decode(file_get_contents("php://input"));

	if ( isset($_GET["method"]) ) {
		switch ( $_GET["method"] ) {
			case "status":
				$data = Bar::getStatus($db);
				break;
			case "version":
				$data->isSuccess("0.1");
				break;
		}
	} else if ( isset($POST["method"]) ) {
		switch ( $POST["method"] ) {
			case "connect":
				if ( requireParam($POST,"name","string") ) {
					$data = Bar::createPatron($db,$POST["name"]);
				} else {
					$data->isFailure("INVALID_PARAMS");
				}
				break;
		}
	}

	$db->close();

	echo json_encode($data);
?>