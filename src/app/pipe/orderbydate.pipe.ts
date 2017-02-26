import {Pipe} from "@angular/core";

@Pipe({
	name: "orderByDate",
	pure: false //makes pipe used at change
})
export class OrderByDatePipe {
	transform(arr: Array<any>, fieldname, order?) {
		arr.sort((a, b) => {
			if(new Date(a[fieldname]) < new Date(b[fieldname])) {
				return (order && order === "ASC") ? -1 : 1;
			}
			if(new Date(a[fieldname]) > new Date(b[fieldname])) {
				return (order && order === "ASC") ? 1 : -1;
			}
			return 0;
		});
		return arr;
	}
}