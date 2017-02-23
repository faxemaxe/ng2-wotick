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
	private resp: string = "";
	private idle: boolean = false;
	private failed: boolean = false;
	private form: FormGroup;

	constructor(private authService: AuthService,
				private router: Router,
				protected fb: FormBuilder) {
		this.form = this.fb.group({
			user: ['test', Validators.required],
			password: ['test', Validators.required]
		})
	}

	ngOnInit() {
	}

	private performLogin() {
		this.idle = true;
		this.failed = false;
		this.resp = "";
		this.authService.loginUser(this.form.value)
			.subscribe(
				(data) => {
					this.idle = false;
					if (data) {
						this.router.navigate(['/main'])
					} else {
						this.resp = "login failed"
					}
				},
				err => {
					this.failed = true;
					this.idle = false;
					this.resp = err.msg
				}
			)
	}
}
