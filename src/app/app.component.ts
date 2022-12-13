import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { AppConfigService } from "@app/services/config.service";

import { ApiService } from "@app/services/api.service";
import { Subscription } from "rxjs";
import { BarResponse } from "@app/interfaces/barResponse.interface";

import packageJson from "../../package.json";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	sub_barStatus!:Subscription;
	sub_versionNumber!:Subscription;

	isOpen: boolean = true;
	isLoading: boolean = true;
	isLoadingError: boolean = false;

	constructor(
		private title: Title,
		private config: AppConfigService,
		private api: ApiService
	) {}

	ngOnInit() {
		this.title.setTitle( this.config.appTitle );

		if ( this.sub_versionNumber ) { this.sub_versionNumber.unsubscribe(); }
		this.sub_versionNumber = this.api.getVersion().subscribe((r:BarResponse)=>{
			console.log({api:r.payload,app:packageJson.version});
		});

		if ( this.sub_barStatus ) { this.sub_barStatus.unsubscribe(); }
		this.sub_barStatus = this.api.getBarStatus().subscribe((r:BarResponse)=>{
			if ( r.success ) {
				if ( r.err ) {
					this.isOpen = false;
				} else {
					this.isOpen = true;
				}
			} else {
				this.isOpen = false;
			}
			console.log(this.isOpen);
			this.isLoading = false;
		},(error:any)=>{
			this.isLoadingError = true;
			this.isLoading = false;
		});
	}

	ngOnDestroy() {
		if ( this.sub_barStatus ) { this.sub_barStatus.unsubscribe(); }
		if ( this.sub_versionNumber ) { this.sub_versionNumber.unsubscribe(); }
	}

}