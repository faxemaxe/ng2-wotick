import { Component, OnInit } from '@angular/core';
import {User} from "../types/user.type";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private newUser: any = {};
  private repeatPassword: string;
  private resp: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  private performRegister() {
    this.resp = "";

    switch (true) {
      case(!this.newUser.password):
        this.resp = "no pws set";
            break;
      case(this.newUser.password != this.repeatPassword):
        this.resp = "pws do not match";
            break;
      case(this.newUser.password.length < 3):
        this.resp = "pw too short";
        break;
      default:
        this.authService.registerUser(this.newUser)
            .subscribe(
                data => console.log(data),
                err => console.log(err)
            );
    }
  }

}
