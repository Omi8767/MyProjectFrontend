import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface ICategory{
  id?:number;
  catname:string;
  imgurl:string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl=`${API_BASE_URL}/category`;

  constructor(private http:HttpClient) { }

  saveCategory(category:ICategory):Observable<ICategory>{
    return this.http.post<ICategory>(this.apiUrl,category);
  }
    getAllCategories():Observable<ICategory[]>{
    return this.http.get<ICategory[]>(this.apiUrl);
  }

  // save(category:ICategory):Observable<ICategory>{
  //   return this.http.post<ICategory>(this.apiurl,category);
  // }

  update(id:number,category:ICategory):Observable<ICategory>{
    return this.http.put<ICategory>(`${this.apiUrl}/${id}`,category);
  }

  delete(id:number):Observable<String>{
    return this.http.delete<String>(`${this.apiUrl}/${id}`);
  }
}
