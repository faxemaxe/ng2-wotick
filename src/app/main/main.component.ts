import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router, Data} from "@angular/router";
import {User} from "../types/user.type";
import {CustomerService} from "../customer.service";
import {Customer} from "../types/customer.type";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private customers: Customer[];
  private form: FormGroup;
  createNew: boolean;

  constructor(private router: Router,
              private customerService: CustomerService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

  }

  ngOnInit() {
    this.customerService.dataStream.subscribe(
        data => this.customers = data
    );
    this.customerService.loadAll();
  }

  createdCallback() {
    this.createNew = false;
  }

}
