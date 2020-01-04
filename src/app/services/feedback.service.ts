import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { baseURL } from "../shared/baseurl";
import { Observable } from 'rxjs';
import { map,catchError } from "rxjs/operators";
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    postFeedback(feedback: Feedback): Observable<Feedback>{
      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json'
        })
      };
 
      return this.http.post<Feedback>(baseURL + 'feedback/',feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
