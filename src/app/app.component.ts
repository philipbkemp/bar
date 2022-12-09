import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AppConfigService } from "@app/services/config.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(
		private title: Title,
		private config: AppConfigService
	) {}

	ngOnInit() {
		this.title.setTitle( this.config.appTitle );
	}

}