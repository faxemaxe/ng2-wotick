import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private creds: any = {};
	private resp: string = "";
	private idle: boolean;

	constructor(private authService: AuthService,
				private router: Router) {
	}

	ngOnInit() {
		this.idle = false;
	}

	private performLogin() {
		this.idle = true;
		this.resp = "";
		this.authService.loginUser(this.creds)
			.subscribe(
				(data) => {
					this.idle = false;
					if (data) {
						this.router.navigate(['/main']);
					} else {
						this.resp = "login failed";
					}
				},
				(err) => {
					this.idle = false;
					this.resp = err.msg;
				}
			);
	}

}
