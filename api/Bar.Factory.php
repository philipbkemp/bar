<?php

class BarResponse {
	public $success;
	public $err;
	public $payload;
	function __construct() {
		$this->success = false;
		$this->err = false;
		$this->payload = null;
	}
	function isSuccess($data) {
		$this->success = true;
		$this->err = false;
		$this->payload = $data;
	}
	function isFailure($data) {
		$this->success = true;
		$this->err = true;
		$this->payload = $data;
	}
}

class BarResponseFailure extends BarResponse {
	function __construct($data) {
		$this->isFailure($data);
	}
}

class BarResponseSuccess extends BarResponse {
	function __construct($data) {
		$this->isSuccess($data);
	}
}

class Bar {
	// barCategories
		// get
		// add
		// edit
		// delete
		// move up
		// move down
	// barOrders
		// get
		// create
		// mark as served
		// delete
	// barPatrons
		// leave
	// barSettings
		// login to admin
	// barStock
		// get all
		// get for category
		// add
		// edit
		// delete
		// mark as out of stock

	public static function createPatron($dbconn,$patron) {
		$lPatron = strtolower($patron);
		$get = $dbconn->prepare("SELECT * FROM barPatrons WHERE LOWER(name) = ? AND active = 1");
		$get->bind_param("s",$lPatron);
		$get->execute();
		$res = $get->get_result();
		if ( $res->num_rows !== 0 ) {
			return new BarResponseFailure("PATRON_EXISTS");
		}

		$add = $dbconn->prepare("INSERT INTO barPatrons(name,active) VALUES (?,1)");
		$add->bind_param("s",$patron);
		$add->execute();

		if ( $add->affected_rows === 1 ) {
			return new BarResponseSuccess($add->insert_id);
		} else {
			return new BarResponseFailure("FAILED_TO_ADD");
		}
	}

	public static function getStatus($dbconn) {
		$get = $dbconn->prepare("SELECT val FROM barSettings WHERE setting = 'open' AND val = 1");
		$get->execute();
		$res = $get->get_result();
		if ( $res->num_rows === 0 ) {
			return new BarResponseFailure("CLOSED");
		}
		return new BarResponseSuccess("OPEN");
	}

	public static function isPatronActive($dbconn,$name,$id) {
		$get = $dbconn->prepare("SELECT * FROM barPatrons WHERE name = ? AND id = ? AND active = 1");
		$get->bind_param("si",$name,$id);
		$get->execute();
		$res = $get->get_result();
		if ( $res->num_rows === 1 ) {
			return new BarResponseSuccess(true);
		}
		return new BarResponseSuccess(false);
	}

}

?>