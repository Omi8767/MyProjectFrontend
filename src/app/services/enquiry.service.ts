import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api.config';
import { Observable } from 'rxjs';

export interface Enquiry {
  name: string;
  email: string;
  contact: number;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private apiUrl = `${API_BASE_URL}/enquiry`;
  constructor(private http: HttpClient) { }

  submitEnquiry(enquiry: Enquiry): Observable<Enquiry> {
    return this.http.post<Enquiry>(this.apiUrl, enquiry);
  }
}



