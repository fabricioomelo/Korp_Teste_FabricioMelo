import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  standalone: false,
  template: `
  <h2>Notas Fiscais</h2>
  <div *ngFor="let inv of invoices">
    <div>Num: {{inv.number || inv.id}} - Status: {{inv.status}}</div>
    <button mat-button (click)="print(inv)" [disabled]="inv.status !== 'Aberta'">Imprimir</button>
  </div>
  `
})
export class InvoiceListComponent implements OnInit{
  invoices: any[] = [];
  constructor(private is: InvoiceService){}
  ngOnInit(){ this.load(); }
  load(){ this.is.list().subscribe(x=> this.invoices = x); }
  print(inv: any){
    inv.printing = true;
    this.is.print(inv.id).subscribe({
      next: ()=> { alert('Impressão OK'); this.load(); },
      error: (e)=> { alert('Erro: '+ (e.error?.message || e.message || e.statusText)); this.load(); }
    });
  }
}
