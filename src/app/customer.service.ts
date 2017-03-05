import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import {BehaviorSubject, Observable} from "rxjs";
import {Customer} from "./types/customer.type";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";

@Injectable()
export class CustomerService {
	private baseUrl: string;

	private customerStream: Observable<Customer[]>;
	private _customers: BehaviorSubject<Customer[]>;
	private dataStorage: {
		customers: Customer[]
	};

	constructor(private http: Http, private authService: AuthService, private authGuard: AuthGuardService) {
		this.baseUrl = "https://wotick-backend.herokuapp.com/api";
		//this.baseUrl = "http://localhost:3000/api";
		this.dataStorage = {customers: []};
		this._customers = <BehaviorSubject<Customer[]>> new BehaviorSubject([]);
		this.customerStream = this._customers.asObservable();
	}

	get dataStream() {
		return this.customerStream;
	}

	create(customer: any) {
		console.log("got called");
		this.http.post(`${this.baseUrl}/customer/`, customer, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(
				data => {
					this.dataStorage.customers.push(data);
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			)
	}

	loadAll() {
		this.http.get(`${this.baseUrl}/customers/`, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(
				data => {
					this.dataStorage.customers = data;
					this.updateStream()
				},
				err => this.authGuard.handleError(err)
			)
	}

	load(customerId) {
		this.http.get(`${this.baseUrl}/customer/?customerUUID=${customerId}`)
			.map(this.extractData)
			.subscribe(
				data => {
					let notFound = true;

					this.dataStorage.customers.forEach((item, index) => {
						if (item.customerUUID === data.costumerUUID) {
							this.dataStorage.customers[index] = data;
							notFound = false;
						}
					});

					if (notFound) this.dataStorage.customers.push(data);
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			)
	}

	update(customer: Customer) {
		this.http.put(`${this.baseUrl}/customer/?customerUUID=${customer.customerUUID}`, customer, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(
				data => {
					this.dataStorage.customers.forEach((item, index) => {
						if (item.customerUUID === data.costumerUUID) {
							this.dataStorage.customers[index] = data;
						}
					});
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			)
	}

	remove(customerId: string) {
		this.http.delete(`${this.baseUrl}/customer/?customerUUID=${customerId}`, this.authService.getAuthHeader())
			.map(this.extractData)
			.subscribe(() => {
					this.dataStorage.customers.forEach((item, index) => {
						if (item.customerUUID === customerId) this.dataStorage.customers.splice(index, 1);
					});
					this.updateStream();
				},
				err => this.authGuard.handleError(err)
			)
	}


	//helper
	private updateStream() {
		this._customers.next(Object.assign({}, this.dataStorage).customers)
	}

	private extractData(response: Response) {
		return response.json().data;
	}
}
