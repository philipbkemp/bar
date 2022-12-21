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
	selector: 'pbkbar-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	providers: [MessageService]
})
export class MenuComponent implements OnInit, OnDestroy {

	sub_patronStatus!:Subscription;

	isLoading: boolean = true;
	isLoadingError: boolean = false;

	constructor(
		private config: AppConfigService,
		private cookie: CookieService,
		private api: ApiService,
		private router: Router
	) {
	}

	ngOnInit() {
		let knownPatron:any = this.cookie.cookieGet("patron");
		if ( knownPatron ) {
			knownPatron = JSON.parse(knownPatron);
			if ( this.sub_patronStatus ) { this.sub_patronStatus.unsubscribe(); }
			this.sub_patronStatus = this.api.isPatronValid(knownPatron).subscribe((r:BarResponse)=>{
				if ( r.success && ! r.err ) {
					this.isLoading = false;
					if ( ! r.payload ) {
						this.router.navigate(['/']);
					} else {
						this.loadDrinks();
					}
				} else {
					this.isLoadingError = true;
					this.isLoading = false;
				}
			});
		} else {
			this.router.navigate(['/']);
		}
	}

	ngOnDestroy() {
		if ( this.sub_patronStatus ) { this.sub_patronStatus.unsubscribe(); }
	}

	loadDrinks() {
		console.log("LOADING DRINKS");
	}

}
