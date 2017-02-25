import {Component, OnInit, Input} from '@angular/core';
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

  constructor(private customerService: CustomerService) {
    this.editable = false;
    this._customer = {}
  }

  @Input() customer: Customer;

  ngOnInit() {
  }

  startEdit() {
    Object.assign(this._customer, this.customer);
    this.editable = true;
  }

  saveEdit() {
    this.customerService.update(this.customer);
    this.editable = false;
  }

  cancelEdit() {
    Object.assign(this.customer, this._customer);
    this.editable = false;
  }

  deleteCustomer() {
    this.customerService.remove(this.customer.customerUUID);
    this.editable = false;
  }
}
