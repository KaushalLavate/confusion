import { Injectable } from '@angular/core';
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { Observable,of } from 'rxjs';
import { map,catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  getPromotions():Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPROMOTIONS(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(Promotions => Promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
