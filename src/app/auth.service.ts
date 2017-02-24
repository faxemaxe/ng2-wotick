import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "./types/user.type";
import {JwtHelper} from "angular2-jwt";
import {LocalStorageService} from "angular-2-local-storage";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
	private baseUrl: string;
	private currentUser: User;
	private _token: any;
	private jwtHelper = new JwtHelper();
	private loginStatusStream: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(private http: Http,
				private lsService: LocalStorageService,
				private router: Router)
	{
		this.baseUrl = "https://wotick-backend.herokuapp.com/api";
		//this.baseUrl = "http://localhost:3000/api";
		this._token = this.lsService.get("token");
		if (this._token) this.setUser();
	}

	registerUser(newUser: Object) {
		console.log(newUser);
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
					this._token = token;
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
		this._token = null;
		this.currentUser = null;
		this.lsService.remove("token");
		this.loginStatusStream.next(this.isLoggedIn());
		this.router.navigate(['/login']);
	}


	// Helper
	isLoggedIn() {
		return (!!this._token && !this.jwtHelper.isTokenExpired(this._token));
	}

	getAuthHeader() {
		let authHeader = new Headers({ 'Authorization': this._token });
		return new RequestOptions({headers: authHeader});
	}

	private extractData(resp: Response) {
		return resp.json();
	}

	private handleError(error: Response | any) {
		return Observable.throw(error.json());
	}

	private setUser() {
		if(this._token) this.currentUser = new User(this.jwtHelper.decodeToken(this._token).user);
		this.loginStatusStream.next(this.isLoggedIn());
		console.log(this.currentUser);
	}
}
