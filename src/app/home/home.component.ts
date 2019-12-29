import { Component, OnInit, Inject } from '@angular/core';
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
  dishErrMess: string;
  promotion: Promotion;
  promoErrMess: string;
  leader: Leaders;
  leaderErrMess: string;

  constructor(private dishService: DishService,
    private promotionsService: PromotionsService,
    private leaderServices: LeaderService,
    @Inject('BaseURL')private BaseURL){ }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess );

    this.promotionsService.getFeaturedPROMOTIONS()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promoErrMess =<any>errmess );
      
    this.leaderServices.getFeaturedLEADERS()
      .subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess =<any>errmess );
  }
}
