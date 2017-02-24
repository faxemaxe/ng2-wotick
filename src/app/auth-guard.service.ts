import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {
	private logStatus: boolean;

	constructor(private router: Router,
				private authService: AuthService) {
		this.authService.getLoginStatusStream().subscribe((data) => {
			this.logStatus = data;
		})
	}

	canActivate() {
		if (this.logStatus) {
			return true;
		} else {
			this.router.navigate(['/login']);
			console.error("throw-out");
			return false;
		}
	}

	handleError(err, text?) {
		if(err.status === 401) {
			this.authService.logoutUser();
		}
		//build error message
		let errMsg = text || err.json().msg;
		console.error("<---- ERROR ----->");
		console.error(errMsg);
		console.error(err.json());
		console.error("<---- END ----->");
	}
}
