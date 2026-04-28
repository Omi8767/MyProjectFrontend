import { Injectable } from '@angular/core';
import { ICustomer } from './customer.service';
import { IProduct } from './product.service';
import { HttpClient } from '@angular/common/http';
import { EMPTY, map, Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface ICart{
  id?:number;
  customer:ICustomer;
  product:IProduct;
  quantity:number;
}
export interface ICartDTO{
  customerId:number,
  productid:number,
  quantity:number,
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl=`${API_BASE_URL}/cart`;
  
  constructor(private http:HttpClient) { }

  addToCart(cartdto:ICartDTO):Observable<ICart>{
    return this.http.post<ICart>(`${this.apiUrl}`,cartdto);
  }

  getCartByCustomerId(id:number):Observable<ICart[]>{
    return this.http.get<ICart[]>(`${this.apiUrl}/${id}`)
  }

  getTotal(items?:ICart[]):number{
    if(!items)return 0;
    return items.reduce((sum,itm)=>sum+(itm.product?.price ??0)*(itm.quantity ?? 0),0);
  }

   getCartWithTotal(id:number):Observable<{items:ICart[];total:number}>{
   return this.getCartByCustomerId(id).pipe(map(items=>({items,total:this.getTotal(items)})));
  }

  updateQuantity(id:number,cartdto:ICartDTO):Observable<ICart>{
    //  if(!cartdto.id) return EMPTY;
    return this.http.put<ICart>(`${this.apiUrl}/${id}`,{quantity:cartdto.quantity});
  }

  removeItem(id:number):void{
    return this.http.delete<void>(`${this.apiUrl}/${id}`,)
  }
}
