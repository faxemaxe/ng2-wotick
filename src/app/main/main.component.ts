import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {User} from "../types/user.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private loggedUser: User;
  private uuid: string;

  constructor(private authService: AuthService,
              private router: Router) {
    this.loggedUser = this.authService.getUser()
  }

  ngOnInit() {
  }

  performLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

}
