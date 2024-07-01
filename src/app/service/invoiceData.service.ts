import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  private readonly apiUrl = 'https://localhost:7204/api'; // Base API URL

  constructor(private http: HttpClient) { }

  getInvoiceById(invoiceID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetInvoiceById?InvoiceID=${invoiceID}`);
  }
}
