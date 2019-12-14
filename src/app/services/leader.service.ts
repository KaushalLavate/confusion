import { Injectable } from '@angular/core';
import { Leaders } from "../shared/leaders";
import { LEADERS } from "../shared/leader";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<Leaders[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Promise<Leaders> {
    return Promise.resolve(LEADERS.filter((promo) => (promo.id == id))[0]);
  }

  getFeaturedLEADERS(): Promise<Leaders> {
    return Promise.resolve(LEADERS.filter((promo) => (promo.featured))[0]);
  }
}