import { Component } from '@angular/core';

import { TranslocoService } from "@ngneat/transloco";
import { CookieService } from "@app/services/cookie.service";
import { AppConfigService } from "@app/services/config.service";

@Component({
	selector: 'pbkbar-language',
	templateUrl: './language.component.html',
	styleUrls: ['./language.component.scss']
})
export class LanguageSelectorComponent {

	lang: string = "en";

	constructor(
		private translate: TranslocoService,
		private cookie: CookieService,
		private config: AppConfigService
	) {
		let existingCookie: string|null = this.cookie.cookieGet("lang");
		if ( existingCookie ) {
			this.lang = existingCookie;
			this.translate.setActiveLang(this.lang);
		} else {
			this.lang = this.translate.getActiveLang();
			this.cookie.cookieSet("lang",this.lang);
		}
	}

	goChangeLanguage(e:any) {
		this.lang = e.target.value;
		this.translate.setActiveLang(this.lang);
		this.cookie.cookieSet("lang",this.lang);
	}

}
