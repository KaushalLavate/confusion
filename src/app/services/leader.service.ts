import { Injectable } from '@angular/core';
import { Leaders } from "../shared/leaders";
import { LEADERS } from "../shared/leader";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Leaders[]{
    return LEADERS;
  }

  getLeader(id: string): Leaders {
    return LEADERS.filter((promo) => (promo.id == id))[0];
  }

  getFeaturedLEADERS(): Leaders{
    return LEADERS.filter((promo) => (promo.featured))[0];
  }
}