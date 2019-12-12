import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionsService } from '../services/promotions.service';
import { Leaders } from "../shared/leaders";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leaders;

  constructor(private dishService: DishService,
    private promotionsService: PromotionsService,
    private leaderServices: LeaderService) { }

  ngOnInit() {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionsService.getFeaturedPROMOTIONS();
    this.leader = this.leaderServices.getFeaturedLEADERS();
  }

}
