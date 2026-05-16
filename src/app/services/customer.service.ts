import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
// import { API_BASE_URL } from './api.config';

export interface ICustomer{
  id?:number;
  usertype:string;
  name:string;
  email:string;
  contact:number;
  address:string;
  city:string;
  password:string;
}
export interface ILogin{
  email: string;
  password:string;
}
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl=`${API_BASE_URL}/customers`;

  constructor(private http:HttpClient) { }

  register(customer:ICustomer):Observable<ICustomer>{
    return this.http.post<ICustomer>(`${this.apiUrl}/register`,customer);
  }
   login(request:ILogin):Observable<ICustomer>{
    return this.http.post<ICustomer>(`${this.apiUrl}/login`,request)
  }

  sendOtp(email:string){
    return this.http.post(`${this.apiUrl}/send-otp?email=${email}`,{});
  }

  verifyOtp(email:string,otp:string){
     return this.http.post(`${this.apiUrl}/verify-otp?email=${email}&otp=${otp}`,{});
  }

  resetPassword(email:string,password:string){
    return this.http.post(`${this.apiUrl}/reset-password?email=${email}&password=${password}`,{});
  }

}
