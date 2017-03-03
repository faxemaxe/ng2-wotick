import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {LocalStorageModule} from "angular-2-local-storage";
import {RoutingModule} from "./app.routes";

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {AuthGuardService} from "./auth-guard.service";
import {AuthService} from "./auth.service";
import { TopbarComponent } from './topbar/topbar.component';
import {CustomerService} from "./customer.service";
import { CustomerPlateComponent } from './customer-plate/customer-plate.component';
import {OrderByDatePipe} from "./pipe/orderbydate.pipe";
import { MenuComponent } from './menu/menu.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		LoginComponent,
		RegisterComponent,
		TopbarComponent,
		CustomerPlateComponent,
		OrderByDatePipe,
		MenuComponent,
		ProjectsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
      	ReactiveFormsModule,
		HttpModule,
		RoutingModule,
		LocalStorageModule.withConfig({
			prefix: 'my-app',
			storageType: 'localStorage'
		})
	],
	providers: [
		AuthService,
		AuthGuardService,
		CustomerService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
