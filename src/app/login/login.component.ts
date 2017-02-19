import { Component, OnInit } from '@angular/core';
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

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  private performLogin() {
    this.resp = "";
    this.authService.loginUser(this.creds)
        .subscribe(
            (data) => {
              if(data) {
                this.router.navigate(['/main'])
              } else {
                this.resp = "login failed"
              }
            },
            err => this.resp = err.msg
        )
  }

}
