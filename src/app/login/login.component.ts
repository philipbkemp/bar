import { Component } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
	selector: 'pbkbar-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	lang: string = "en";
	patronName: string = "";

	constructor(
	) {
	}

	goPatron() {
		if ( this.patronName.trim() !== "" ) {
			alert("Hello " + this.patronName);
		}
	}

	alphaNumericTest(e:any) {
		var inputChar = String.fromCharCode(e.keyCode);
		if ( /[a-zA-Z0-9\ ]/.test(inputChar) ) {
			return true;
		} else {
			e.preventDefault();
			return false;
		}
	}

}
