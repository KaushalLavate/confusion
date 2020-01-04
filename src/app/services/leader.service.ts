import { Injectable } from '@angular/core';
import { Leaders } from "../shared/leaders";
//import { LEADERS } from "../shared/leader";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { Observable,of } from 'rxjs';
import { map,catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders():Observable<Leaders[]> {
    return this.http.get<Leaders[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

  /*getLeader(id: string): Observable<Leaders> {
    return this.http.get<Leaders>(baseURL + 'leader/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }*/

  getFeaturedLEADERS(): Observable<Leaders> {
    return this.http.get<Leaders[]>(baseURL + 'leadership?featured=true').pipe(map(Leaders => Leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}