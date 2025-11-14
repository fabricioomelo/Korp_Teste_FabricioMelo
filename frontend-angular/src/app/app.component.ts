import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: false,
  template: `
  <mat-toolbar color="primary">
    <span>Korp - Sistema de Notas Fiscais</span>
  </mat-toolbar>
  <div class="container">
    <h1>Dashboard</h1>
    <app-product-form></app-product-form>
    <app-product-list></app-product-list>
    <hr/>
    <app-invoice-form></app-invoice-form>
    <app-invoice-list></app-invoice-list>
  </div>
  `
})
export class AppComponent {}
