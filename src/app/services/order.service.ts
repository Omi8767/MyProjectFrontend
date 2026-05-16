import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api.config';
import { ICustomer } from './customer.service';
import { HttpClient } from '@angular/common/http';
import { ICart } from './cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl=`${API_BASE_URL}/order`;
  customer!:ICustomer;

  constructor(private http:HttpClient) { }

  placeOrder(
    cartItems:ICart[],
    shipping:{
      name: string,
      address: string,
      city: string,
      pincode: string,
      contact: string
    },
    gstPercent=0,
    discountPercent=0
    
  ):Observable<any>{

    const items=cartItems.map(i=>({
      productId:i.product.id,
      quantity:i.quantity
    }));

    const store = localStorage.getItem('customer');
    this.customer = store ? JSON.parse(store) : null;

    const orderRequest={
      customerId:this.customer.id,
      shipping,
      items,
      gstPercent,
      discountPercent
    }

    return this.http.post(`${this.apiUrl}`,orderRequest);

  }

  getOrderByCustomerId(customerId:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/${customerId}/customer`);
  }

  getOrderBySellerId(sellerId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${sellerId}/seller`)
  }

  cancleOrder(orderId:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${orderId}/cancel`,{});
  }

  getAllOrders():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  updateOrderStatus(id:number,status:string):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}/status?status=${status}`,{});
  }

  getDashboard(){
   return this.http.get<any[]>(`${this.apiUrl}/dashboard`)
  }
}
