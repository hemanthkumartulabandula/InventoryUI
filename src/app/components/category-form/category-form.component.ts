import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryId: [0],
      name: ['', Validators.required]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.categoryService.getById(id).subscribe(category => this.form.patchValue(category));
    }
  }

  onSubmit(): void {
    const category: Category = this.form.value;

    if (this.isEditMode) {
      this.categoryService.update(category.categoryId, category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    } else {
      this.categoryService.create(category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
