import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {LocalStorageModule} from "angular-2-local-storage";
import {RoutingModule} from "./app.routes";

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {AuthGuardService} from "./auth-guard.service";
import {AuthService} from "./auth.service";
import {MaterialModule} from "@angular/material";

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RoutingModule,
		LocalStorageModule.withConfig({
			prefix: 'my-app',
			storageType: 'localStorage'
		}),
		MaterialModule
	],
	providers: [
		AuthGuardService,
		AuthService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
