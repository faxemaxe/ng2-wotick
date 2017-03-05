import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	links: any[];

	constructor(private router: Router) {
		this.links = [
			{
				title: 'customers',
				path: '/main'
			},
			{
				title: 'projects',
				path: 'projects'
			}
		]
	}

	@Output() toggleMenu = new EventEmitter();

	ngOnInit() {
	}

	goToRoute(link) {
		this.toggleMenu.emit();
		this.router.navigate([link]);
	}

}
