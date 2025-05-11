import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      supplierId: [0],
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z\s]+$/) 
      ]],
      contactEmail: ['', [
    Validators.required,
    Validators.email  
  ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/) 
      ]]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.supplierService.getById(id).subscribe(supplier => this.form.patchValue(supplier));
    }
  }

  onSubmit(): void {
    const supplier: Supplier = this.form.value;

    if (this.isEditMode) {
      this.supplierService.update(supplier.supplierId, supplier).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    } else {
      this.supplierService.create(supplier).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    }
  }
}
