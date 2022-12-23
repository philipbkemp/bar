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
	sub_patronLogout!:Subscription;
	sub_menu!:Subscription;

	isLoading: boolean = true;
	isLoadingError: boolean = false;
	emptyStock: boolean = false;

	patronName: string = "";
	patronId: number = -1;

	menu: any[] = [];
	openedMenu: string = "";
	menuDrinks: any[] = [];

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
			this.patronName = knownPatron.name;
			this.patronId = knownPatron.uid;
			if ( this.sub_patronStatus ) { this.sub_patronStatus.unsubscribe(); }
			this.sub_patronStatus = this.api.isPatronValid(knownPatron).subscribe((r:BarResponse)=>{
				if ( r.success && ! r.err ) {
					if ( ! r.payload ) {
						this.isLoading = false;
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
		if ( this.sub_patronLogout ) { this.sub_patronLogout.unsubscribe(); }
		if ( this.sub_menu ) { this.sub_menu.unsubscribe(); }
	}

	logoutPatron() {
		if ( this.sub_patronLogout ) { this.sub_patronLogout.unsubscribe(); }
		this.isLoading = true;
		this.isLoadingError = false;
		this.sub_patronLogout = this.api.logoutPatron(this.patronName,this.patronId).subscribe((r:BarResponse)=>{
			this.cookie.cookieDelete("patron");
			this.router.navigate(['/']);
		});
	}

	loadDrinks() {
		if ( this.sub_menu ) { this.sub_menu.unsubscribe(); }
		this.sub_menu = this.api.getMenu().subscribe((r:BarResponse)=>{
			if ( r.success && !r.err ) {
				this.menu = r.payload;
				this.isLoading = false;
			} else {
				this.emptyStock = true;
				this.isLoading = false;
			}
		});
	}

	showMenu(category:number) {
		let selectedMenu = this.menu.find((x:any)=>{return x.id === category})
		this.openedMenu = selectedMenu.name;
		this.menuDrinks = selectedMenu.drinks;
	}

	closeMenu() {
		this.openedMenu = "";
	}

}
