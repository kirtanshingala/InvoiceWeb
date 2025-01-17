import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  get apiUrl(): string {
    return 'https://localhost:7204/api'
  }

  get serverFilePath(): string {
    return   'https://localhost:7204/'
    ;
  }

  constructor(private http: HttpClient) { }

  get(endpoint: string, options: any = {}): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, options);
  }

  download(endpoint: string, options: any = {}): Observable<any> {
    return this.http.get(`${this.serverFilePath}${endpoint}`, options);
  }

  post(endpoint: string, data: any, options: any = {}): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, options);
  }

  put(endpoint: string, data: any, options: any = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, options);
  }

  delete(endpoint: string, options: any = {}): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options);
  }
}
