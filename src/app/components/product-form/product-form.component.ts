import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';

import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  categories: Category[] = [];
  suppliers: Supplier[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      productId: [0],
      name: ['', Validators.required],
      description: [''],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      categoryId: [null, Validators.required],
      supplierId: [null, Validators.required]
    });

    this.loadCategories();
    this.loadSuppliers();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.productService.getById(id).subscribe(product => this.form.patchValue(product));
    }
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  loadSuppliers() {
    this.supplierService.getAll().subscribe(data => this.suppliers = data);
  }

  onSubmit() {
    const product: Product = this.form.value;

    if (this.isEditMode) {
      this.productService.update(product.productId, product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
