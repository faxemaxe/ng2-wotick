import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../types/user.type";

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
	private logStatus;

	constructor(private authService: AuthService) {
		this.authService.getLoginStatusStream().subscribe(data => this.logStatus = data)
	}

	ngOnInit() {

	}

	getUsername() {
		return this.authService.getUser();
	}

	performLogout() {
		this.authService.logoutUser();
	}

}
