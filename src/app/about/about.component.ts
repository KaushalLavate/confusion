import { Component, OnInit } from '@angular/core';
import { Leaders } from '../shared/leaders';
import { LEADERS } from "../shared/leader";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  leaders: Leaders[]=LEADERS;

  constructor() { }

  ngOnInit() {
  }

}
