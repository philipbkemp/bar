import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from "@ngneat/transloco";
import { Router } from "@angular/router";

import { ApiService } from "@app/services/api.service";
import { CookieService } from "@app/services/cookie.service";
import { AppConfigService } from "@app/services/config.service";
import { Subscription } from "rxjs";
import { BarResponse } from "@app/interfaces/barResponse.interface";

import { MessageService } from "primeng/api";

@Component({
	selector: 'pbkbar-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {

	sub_welcomePatron!:Subscription;

	lang: string = "en";
	patronName: string = "";

	constructor(
		private api: ApiService,
		private msg: MessageService,
		private translate: TranslocoService,
		private cookie: CookieService,
		private config: AppConfigService,
		private router: Router
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
							this.msg.clear();
							this.msg.add({
								severity: "error",
								summary: this.translate.translate("patron.exists"),
								closable: false,
								icon: "error",
								sticky: true
							});
						} else {
							this.msg.clear();
							this.msg.add({
								severity: "error",
								summary: this.translate.translate("error.connection"),
								closable: false,
								icon: "error",
								sticky: true
							});
						}
					} else {
						this.cookie.cookieSet("patron", JSON.stringify({
							name: this.patronName,
							uid: r.payload
						}) );
						this.router.navigate(['/menu']);
					}
				} else {
					this.msg.clear();
					this.msg.add({
						severity: "error",
						summary: this.translate.translate("error.connection"),
						closable: false,
						icon: "error",
						sticky: true
					});
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
