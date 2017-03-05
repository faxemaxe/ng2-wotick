import {Routes, RouterModule} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuardService} from "./auth-guard.service";
import {ProjectsComponent} from "./projects/projects.component";

const appRoutes: Routes = [

	{
		path: 'main',
		component: MainComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'projects',
		component: ProjectsComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: '',
		redirectTo: '/main',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '/main'
	}

];

export const RoutingModule = RouterModule.forRoot(appRoutes);