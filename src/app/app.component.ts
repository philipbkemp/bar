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

	sub_versionNumber!:Subscription;

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
	}

	ngOnDestroy() {
		if ( this.sub_versionNumber ) { this.sub_versionNumber.unsubscribe(); }
	}

}