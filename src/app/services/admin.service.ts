import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api.config';
import { Observable } from 'rxjs';
export interface IAdmin{
  username:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl=`${API_BASE_URL}/admin`;

  constructor(private http:HttpClient) { }

  login(admin:IAdmin):Observable<IAdmin>{
    return this.http.post<IAdmin>(`${this.apiUrl}/login`,admin);
  }
}
