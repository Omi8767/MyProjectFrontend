import { Injectable } from '@angular/core';
import { ICategory } from './category.service';
import { API_BASE_URL } from './api.config';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from './customer.service';
import { Observable } from 'rxjs';
import { ProductComponent } from '../components/Seller/product/product.component';

export interface ISpecificationDTO {
  name: string;
  value: string;
}
export interface IProductDTO {
  name: string;
  price: number;
  unit:string;
  stock: number;
  available: boolean;
  sellerId: number;
  categoryId: number;
  imageurls: string[];
  specifications: ISpecificationDTO[];
}

export interface IProductImages {
  imageUrl: string;
  isPrimary: boolean;
}

export interface IProduct {
  id?: number;
  category: ICategory;
  name: string;
  price: number;
  unit:string;
  stock: number;
  available: boolean;
  seller: ICustomer;
  images: IProductImages[];
  specifications: ISpecificationDTO[];

}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${API_BASE_URL}/products`;
  constructor(private http: HttpClient) { }

  addProduct(product: IProductDTO): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }
  getBySellerId(id:number):Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.apiUrl}/seller/${id}`);
  }

  getByCategoryId(id:number):Observable<IProduct[]>{
   return this.http.get<IProduct[]>(`${this.apiUrl}/category/${id}`);
  }

  update(id: number, product: IProductDTO): Observable<IProduct> {
    debugger;
    return this.http.put<IProduct>(`${this.apiUrl}/${id}`, product);
  }

  // delete(id:number):Observable<IProduct>{
  //   return this.http.delete<IProduct>(`${this.apiUrl}/${id}`);
  // }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
