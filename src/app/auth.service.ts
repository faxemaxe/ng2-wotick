import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "./types/user.type";
import {JwtHelper} from "angular2-jwt";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class AuthService {
	private baseUrl: string = "https://wotick-backend.herokuapp.com/api";
	private currentUser: User;
	private token: any;
	private jwtHelper = new JwtHelper();
	private loginStatusStream: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(private http: Http,
				private lsService: LocalStorageService)
	{
		this.token = this.lsService.get("token");
		if (this.token) this.setUser();
	}

	registerUser(newUser: Object) {
		return this.http
			.post(this.baseUrl + '/register/', newUser)
			.map(this.extractData)
			.catch(this.handleError);
	}

	loginUser(creds: Object): Observable<any> {
		return this.http
			.post(this.baseUrl + '/login/', creds)
			.map((resp) => {
				let token = this.extractData(resp).token;

				if (token) {
					this.token = token;
					this.loginStatusStream.next(this.isLoggedIn());
					this.setUser();
					this.lsService.set("token", token);
					return true;
				} else {
					return false;
				}
			})
			.catch(this.handleError);
	}

	getLoginStatusStream() {
		return this.loginStatusStream.asObservable();
	}

	getUser(): User {
		return this.currentUser;
	}

	logoutUser() {
		this.token = null;
		this.currentUser = null;
		this.lsService.remove("token");
		this.loginStatusStream.next(this.isLoggedIn());
	}

	// Helper
	isLoggedIn() {
		return (!!this.token && !this.jwtHelper.isTokenExpired(this.token));
	}

	private extractData(resp: Response) {
		return resp.json();
	}

	private handleError(error: Response | any) {
		return Observable.throw(error.json());
	}

	private setUser() {
		if(this.token) this.currentUser = new User(this.jwtHelper.decodeToken(this.token).user);
		this.loginStatusStream.next(this.isLoggedIn());
		console.log(this.currentUser);
	}
}
