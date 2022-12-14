import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from "@app/services/api.service";
import { Subscription } from "rxjs";
import { BarResponse } from "@app/interfaces/barResponse.interface";

@Component({
	selector: 'pbkbar-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

	sub_welcomePatron!:Subscription;

	lang: string = "en";
	patronName: string = "";

	constructor(
		private api: ApiService
	) {
	}

	ngOnInit() {		
	}

	ngOnDestroy() {
		if ( this.sub_welcomePatron ) { this.sub_welcomePatron.unsubscribe(); }
	}

	goPatron() {
		if ( this.patronName.trim() !== "" ) {
			if ( this.sub_welcomePatron ) { this.sub_welcomePatron.unsubscribe(); }
			this.sub_welcomePatron = this.api.welcomePatron(this.patronName).subscribe((r:BarResponse)=>{
				if ( r.success ) {
					if ( r.err ) {
						if ( r.payload === "PATRON_EXISTS" ) {
							alert("todo: alert user that patron already exists, chose another name");
						} else {
							alert("todo: something else went wrong");
						}
					} else {
						alert("todo: You are user number "+r.payload);
					}
				} else {
					alert("todo: something else went wrong");
				}
			});
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
