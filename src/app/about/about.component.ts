import { Component, OnInit, Inject } from '@angular/core';
import { Leaders } from '../shared/leaders';
import { LEADERS } from "../shared/leader";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  leaders: Leaders[]=LEADERS;
  errMess:string;

  constructor(private leaderServices: LeaderService,
    @Inject('BaseURL')private BaseURL) { }

  ngOnInit() {
    this.leaderServices.getLeaders()
      .subscribe((leaders) => this.leaders = leaders,
      errMess => this.errMess = <any>errMess);
  } 

}
