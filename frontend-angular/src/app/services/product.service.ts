import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  code: string;
  description: string;
  stock: number;
}

@Injectable({providedIn: 'root'})
export class ProductService {
  base = 'http://localhost:8081';
  constructor(private http: HttpClient) {}
  list(): Observable<Product[]> { return this.http.get<Product[]>(`${this.base}/products`); }
  create(p: Product) { return this.http.post<Product>(`${this.base}/products`, p); }
}
