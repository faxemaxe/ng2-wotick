import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Customer} from "../types/customer.type";
import {CustomerService} from "../customer.service";

@Component({
	selector: 'app-customer-plate',
	templateUrl: './customer-plate.component.html',
	styleUrls: ['./customer-plate.component.css']
})
export class CustomerPlateComponent implements OnInit {
	editable: boolean;
	_customer: any;
	dialogIsOpen: boolean;

	constructor(private customerService: CustomerService) {
		this.editable = false;
		this.dialogIsOpen = false;
		this._customer = {};
	}

	@Input() customer: Customer;
	@Input() createMode: boolean;
	@Output() created = new EventEmitter();

	ngOnInit() {
		if(this.createMode) {
			this.customer = <Customer> {};
			this.editable = true;
		}
	}

	startEdit() {
		Object.assign(this._customer, this.customer);
		this.editable = true;
	}

	saveEdit() {
		if(this.createMode) {
			this.customerService.create(this.customer);
			this.created.emit()
		} else {
			this.customerService.update(this.customer);
			this.editable = false;
		}
	}

	cancelEdit() {
		if(this.createMode) {
			this.created.emit()
		} else {
			Object.assign(this.customer, this._customer);
			this.editable = false;
		}
	}

	deleteCustomer() {
		this.customerService.remove(this.customer.customerUUID);
		this.editable = false;
	}
}
