import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class CookieService {

	constructor() {}

	cookieDelete(name:string) {
		this.cookieSet(name,"",-9999);
	}

	cookieGet(name:string) {
		let ca:Array<string> = document.cookie.split(";");
		let caLen:number = ca.length;
		let cookieName:string = `${name}=`;
		let c:string;

		for ( let i:number = 0 ; i < caLen ; i += 1 ) {
			c = ca[i].replace(/^\s+/g,"");
			if ( c.indexOf(cookieName) == 0 ) {
				return c.substring( cookieName.length, c.length );
			}
		}

		return null;
	}

	cookieSet(name:string, value:string, expireDays:number=30, path:string="/") {
		let d:Date = new Date();
		d.setTime( d.getTime()+(expireDays*24*60*60*1000) );
		let expires:string = `expires=${d.toUTCString()}`;
		let cPath:string = path ? `; path=${path}` : "";
		document.cookie = `${name}=${value}; ${expires}${cPath}`;
	}

}