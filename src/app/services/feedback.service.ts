import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IFeedback{
  name:string;
  email:string;
  mobile:number;
  productQuality:number;
  productPrice:number;
  orderProcess:number;
  deliveryService:number;
  suggestion:string;

}
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl=`${API_BASE_URL}/feedback`;
  constructor(private http:HttpClient) { }

  submit(feedback:IFeedback):Observable<IFeedback>{
    return this.http.post<IFeedback>(this.apiUrl,feedback);
  }

  

}
