import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private creds: any = {};
	private error: string = "";
	private idle: boolean = false;
	private failed: boolean = false;
	private form: FormGroup;

	constructor(private authService: AuthService,
				private router: Router,
				private fb: FormBuilder) {
		this.authService.getLoginStatusStream().subscribe(data => {
			if(data) this.router.navigate(['/main']);
		});
		this.form = this.fb.group({
			user: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	ngOnInit() {
	}

	performLogin() {
		this.idle = true;
		this.failed = false;
		this.error = "";
		this.authService.loginUser(this.form.value)
			.subscribe(
				(data) => {
					this.idle = false;
					if (data) {
						this.router.navigate(['/main'])
					} else {
						this.error = "login failed"
					}
				},
				err => {
					this.failed = true;
					this.idle = false;
					this.error = err.msg
				}
			)
	}
}
