import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn} from "@angular/forms";

function passwordMatcher(c: AbstractControl) {
	if(!c.get('password').pristine && !c.get('repeatpassword').pristine ) {
		return c.get('password').value === c.get('repeatpassword').value
			? null : {'nomatch': true};
	}
	return null
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	private resp: string;
	private form: FormGroup;

	constructor(private authService: AuthService,
				private fb: FormBuilder) {
		this.form = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(5)]],
			email: ['', Validators.required],
			passwordcheck: this.fb.group({
				password: ['', [Validators.required, Validators.minLength(5)]],
				repeatpassword: ['', [Validators.required, Validators.minLength(5)]]
			}, {validator: passwordMatcher}),
		})
	}

	ngOnInit() {
	}


	private performRegister() {
		this.resp = "";
		this.authService.registerUser(this.form.value)
			.subscribe(
				data => console.log(data),
				err => {
					console.log(err)
				}
			);
	}

}
