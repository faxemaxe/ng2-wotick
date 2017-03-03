import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  links: any[];

  constructor() {
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

  ngOnInit() {
  }

}
