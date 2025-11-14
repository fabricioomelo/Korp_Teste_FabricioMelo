import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  template: `
  <h2>Produtos</h2>
  <table mat-table [dataSource]="products" class="mat-elevation-z8" style="width:100%">
    <ng-container matColumnDef="code">
      <th mat-header-cell *matHeaderCellDef> Código </th>
      <td mat-cell *matCellDef="let element"> {{element.code}} </td>
    </ng-container>
    <ng-container matColumnDef="description">
      <th mat-header-cell *matHeaderCellDef> Descrição </th>
      <td mat-cell *matCellDef="let element"> {{element.description}} </td>
    </ng-container>
    <ng-container matColumnDef="stock">
      <th mat-header-cell *matHeaderCellDef> Saldo </th>
      <td mat-cell *matCellDef="let element"> {{element.stock}} </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="['code','description','stock']"></tr>
    <tr mat-row *matRowDef="let row; columns: ['code','description','stock'];"></tr>
  </table>
  `
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  constructor(private ps: ProductService){ }
  ngOnInit(){ this.load(); }
  load(){ this.ps.list().subscribe(x=> this.products = x); }
}
