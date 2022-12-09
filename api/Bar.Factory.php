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
		// name is unique
		// create
		// leave
	// barSettings
		// is bar open
		// login to admin
	// barStock
		// get all
		// get for category
		// add
		// edit
		// delete
		// mark as out of stock
}

?>