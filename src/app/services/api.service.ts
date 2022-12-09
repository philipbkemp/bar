import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AppConfigService } from "@app/services/config.service";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	
	endPoint:string = "";

	constructor(
		private http: HttpClient,
		private config: AppConfigService
	) {
		this.endPoint = this.config.apiEndPoint;
	}

	getVersion() {
		return this.http.get<any>(
			`${this.endPoint}?method=version`,
			{headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
		);
	}

}