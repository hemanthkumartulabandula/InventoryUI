import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

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
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required],
      supplierId: [null, Validators.required]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;

      // Step 1: Fetch product
      this.productService.getById(id).subscribe(product => {
        // Step 2: Fetch categories and suppliers
        forkJoin({
          categories: this.categoryService.getAll(),
          suppliers: this.supplierService.getAll()
        }).subscribe(({ categories, suppliers }) => {
          this.categories = categories;
          this.suppliers = suppliers;

          // Step 3: Find matching IDs by name
          const matchedCategory = categories.find(c => c.name === product.categoryName);
          const matchedSupplier = suppliers.find(s => s.name === product.supplierName);

          // Step 4: Patch form with resolved IDs
          this.form.patchValue({
            productId: product.productId,
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            price: product.price,
            categoryId: matchedCategory?.categoryId ?? null,
            supplierId: matchedSupplier?.supplierId ?? null
          });
        });
      });

    } else {
      this.loadCategories();
      this.loadSuppliers();
    }
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  loadSuppliers() {
    this.supplierService.getAll().subscribe(data => {
      this.suppliers = data;
    });
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
