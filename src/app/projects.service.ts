import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Project} from "./types/project.type";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";

@Injectable()
export class ProjectsService {
	private baseUrl: string;
	private _projects: BehaviorSubject<Project[]>;
	private dataStorage: {
		projects: Project[]
	};

	constructor(private http: Http,
				private authService: AuthService,
				private authGuard: AuthGuardService) {
		this.baseUrl = "https://wotick-backend.herokuapp.com/api";
		//this.baseUrl = "http://localhost:3000/api";

		this.dataStorage = { projects: [] };
		this._projects = <BehaviorSubject<Project[]>> new BehaviorSubject([]);
	}

	get projectStream() {
		return this._projects.asObservable();
	}

	create(project: any) {
		this.http.post(`${this.baseUrl}/project/`, project, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(
				data => {
					this.dataStorage.projects.push(data);
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			)
	}

	loadAll() {
		this.http.get(`${this.baseUrl}/projects/`, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(
				data => {
					this.dataStorage.projects = data;
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			)
	}

	update(project: Project) {
		this.http.post(`${this.baseUrl}/project/`, project, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(
				data => {
					this.dataStorage.projects.forEach((item, index) => {
						if(item.projectUUID === data.projectUUID) {
							this.dataStorage.projects[index] = data;
						}
					});
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			);
	}

	remove(projectId: string) {
		this.http.delete(`${this.baseUrl}/project/`, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(
				() => {
					this.dataStorage.projects.forEach((item, index) => {
						if(item.projectUUID === projectId) this.dataStorage.projects.splice(index, 1);
					});
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			);
	}



	//HELPER
	private updateStream() {
		this._projects.next(Object.assign({}, this.dataStorage).projects);
	}

	private extractData(response: Response) {
		return response.json().data;
	}

}
