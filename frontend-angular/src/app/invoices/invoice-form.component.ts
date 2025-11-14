import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { ProductService, Product } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-form',
  standalone: false,
  template: `
  <h2>Criar Nota Fiscal</h2>
  <div *ngIf="products.length">
    <div *ngFor="let p of products">
      <label>{{p.description}} (saldo: {{p.stock}})</label>
      <input type="number" min="0" (change)="onQtyChange(p.id, $event.target.value)" />
    </div>
    <button mat-raised-button color="accent" (click)="save()">Salvar Nota</button>
  </div>
  `
})
export class InvoiceFormComponent implements OnInit{
  products: Product[] = [];
  items: any[] = [];
  constructor(private ps: ProductService, private is: InvoiceService, private snack: MatSnackBar){}
  ngOnInit(){ this.ps.list().subscribe(x=> this.products = x); }
  onQtyChange(pid: number, qtyStr: any){
    const q = Number(qtyStr);
    const idx = this.items.findIndex(i=> i.productId === pid);
    if(q<=0){ if(idx>=0) this.items.splice(idx,1); return; }
    if(idx>=0) this.items[idx].quantity = q; else this.items.push({productId: pid, quantity: q});
  }
  save(){
    const inv = { items: this.items };
    this.is.create(inv).subscribe({
      next: ()=> this.snack.open('Nota criada', 'OK', {duration:2000}),
      error: (e)=> this.snack.open('Erro: '+ (e.message||e.statusText), 'OK', {duration:3000})
    });
  }
}
