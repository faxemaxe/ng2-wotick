import {Component, OnInit, Input} from '@angular/core';
import {Project} from "../types/project.type";

@Component({
  selector: 'app-project-plate',
  templateUrl: './project-plate.component.html',
  styleUrls: ['./project-plate.component.scss']
})
export class ProjectPlateComponent implements OnInit {
  editable: boolean;
  dialogIsOpen: boolean;
  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
