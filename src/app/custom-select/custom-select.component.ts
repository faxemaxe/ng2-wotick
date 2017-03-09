import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	selector: 'app-custom-select',
	templateUrl: './custom-select.component.html',
	styleUrls: ['./custom-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CustomSelectComponent),
			multi: true
		}
	]
})
export class CustomSelectComponent implements ControlValueAccessor {
	@Input('value') _value = "";
	@Input() list: any = [];
	@Input() fields: any = [];
	onChange: any = () => {
	};
	onTouched: any = () => {
	};

	isOpen: boolean = false;
	selectText: string = "";

	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;
		this.onChange(val);
		this.onTouched();
	}

	constructor() {
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value) {
		if (value) this._value = value;
	}

	select(value) {
		this.isOpen = false;
		this.selectText = value['name'];
		this.value = value['customerUUID'];
	}
}
