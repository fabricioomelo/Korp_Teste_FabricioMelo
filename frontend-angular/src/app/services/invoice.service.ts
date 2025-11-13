import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice { id?: number; number?: number; status?: string; items?: any[]; }

@Injectable({providedIn: 'root'})
export class InvoiceService {
  base = 'http://localhost:8082';
  constructor(private http: HttpClient) {}
  list(): Observable<Invoice[]> { return this.http.get<Invoice[]>(`${this.base}/invoices`); }
  create(inv: Partial<Invoice>) { return this.http.post<Invoice>(`${this.base}/invoices`, inv); }
  print(id: number) { return this.http.post(`${this.base}/invoices/${id}/print`, {}); }
}
