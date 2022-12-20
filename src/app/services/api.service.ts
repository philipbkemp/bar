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

	getBarStatus() {
		return this.http.get<any>(
			`${this.endPoint}?method=status`,
			{headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
		);
	}

	getVersion() {
		return this.http.get<any>(
			`${this.endPoint}?method=version`,
			{headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
		);
	}

	isPatronValid(pData:any) {
		pData.method = "patronValid"
		return this.http.post<any>(
			`${this.endPoint}`,
			pData,
			{headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
		);
	}

	welcomePatron(patronName:string) {
		return this.http.post<any>(
			`${this.endPoint}`,
			{
				"method": "connect",
				"name": patronName
			},
			{headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
		);
	}

}