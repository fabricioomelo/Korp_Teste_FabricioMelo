import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  template: `
  <h2>Cadastro de Produto</h2>
  <form [formGroup]="form" (ngSubmit)="save()">
    <mat-form-field style="width:100%">
      <input matInput placeholder="Código" formControlName="code">
    </mat-form-field>
    <mat-form-field style="width:100%">
      <input matInput placeholder="Descrição" formControlName="description">
    </mat-form-field>
    <mat-form-field style="width:100%">
      <input matInput type="number" placeholder="Saldo" formControlName="stock">
    </mat-form-field>
    <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Salvar Produto</button>
  </form>
  `
})
export class ProductFormComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private ps: ProductService, private snack: MatSnackBar){
    this.form = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      stock: [0, [Validators.required]]
    });
  }
  save(){
    if(this.form.invalid) return;
    this.ps.create(this.form.value).subscribe({
      next: () => { this.snack.open('Produto criado', 'OK', {duration:2000}); this.form.reset({stock:0}); },
      error: (e) => { this.snack.open('Erro: '+ (e.message || e.statusText), 'OK', {duration:3000}); }
    });
  }
}
