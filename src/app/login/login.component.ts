import { Component } from '@angular/core';
import { TranslocoService } from "@ngneat/transloco";
import { Subscription } from "rxjs";
import { CookieService } from "@app/services/cookie.service";

@Component({
	selector: 'pbkbar-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	lang: string = "en";
	patronName: string = "";

	constructor(
		private translate: TranslocoService,
		private cookie: CookieService
	) {
		let existingCookie: string|null = this.cookie.cookieGet("pbkbar.lang");
		if ( existingCookie ) {
			this.lang = existingCookie;
			this.translate.setActiveLang(this.lang);
		} else {
			this.lang = this.translate.getActiveLang();
			this.cookie.cookieSet("pbkbar.lang",this.lang);
		}
	}

	goChangeLanguage(e:any) {
		this.lang = e.target.value;
		this.translate.setActiveLang(this.lang);
		this.cookie.cookieSet("pbkbar.lang",this.lang);
	}

	goPatron() {
		if ( this.patronName.trim() !== "" ) {
			alert("Hello " + this.patronName);
		}
	}

}
