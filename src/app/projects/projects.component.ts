import { Component, OnInit } from '@angular/core';
import {ProjectsService} from "../projects.service";
import {Project} from "../types/project.type";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../customer.service";
import {Customer} from "../types/customer.type";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private projects: Project[];
  private customers: Customer[];
  private form: FormGroup;

  constructor(private projectsService: ProjectsService,
              private fb: FormBuilder,
              private customerService: CustomerService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
      customerUUID: ['']
    })
  }

  ngOnInit() {
    this.projectsService.projectStream
        .subscribe(data => this.projects = data);
    this.projectsService.loadAll();

    this.customerService.dataStream
		.subscribe(data => this.customers = data);
    this.customerService.loadAll();
  }

  createProj() {
    this.projectsService.create(this.form.value);
  }

}
