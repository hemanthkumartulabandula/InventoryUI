import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { AuthService } from '../../auth/auth.service';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'productId',
    'name',
    'description',
    'price',
    'quantity',
    'categoryName',
    'supplierName'
  ];

  isAdmin = false; 

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private signalrService: SignalrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getUserRole() === 'Admin';
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }

    this.loadProducts();
    this.signalrService.startConnection();

    this.signalrService.productAdded$.subscribe(() => this.loadProducts());
    this.signalrService.productUpdated$.subscribe(() => this.loadProducts());
    this.signalrService.productDeleted$.subscribe(() => this.loadProducts());
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => this.loadProducts());
    }
  }
}
