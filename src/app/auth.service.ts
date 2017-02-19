import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {User} from "./types/user.type";
import {JwtHelper} from "angular2-jwt";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class AuthService {
    private baseUrl: string = "https://wotick-backend.herokuapp.com/api";
    private currentUser: User;
    private token: any;
    private jwtHelper = new JwtHelper();

    constructor(
        private http: Http,
        private lsService: LocalStorageService
    ) {
        this.token = this.lsService.get("token");
        if(this.token) this.setUser(this.token);
    }

    registerUser(newUser: Object) {
        return this.http
            .post(this.baseUrl + '/register/', newUser)
            .map(this.extractData)
            .catch(this.handleError);
    }

    loginUser(creds: Object) {
        return this.http
            .post(this.baseUrl + '/login/', creds)
            .map((resp) => {
                let token = this.extractData(resp).token;

                if (token) {
                    this.setUser(token);
                    this.lsService.set("token", token);
                    return true;
                } else {
                    return false;
                }

            })
            .catch(this.handleError);
    }

    isLoggedIn() {
        return this.token && !this.jwtHelper.isTokenExpired(this.token);
    }

    logoutUser() {
        this.token = null;
        this.currentUser = null;
        this.lsService.remove("token");
    }

    // Helper
    private extractData(resp: Response) {
        return resp.json();
    }

    private handleError(error: Response | any) {
        return Observable.throw(error.json());
    }

    private setUser(token) {
        this.currentUser = new User(this.jwtHelper.decodeToken(token).user);
        console.log(this.currentUser);
    }
}
