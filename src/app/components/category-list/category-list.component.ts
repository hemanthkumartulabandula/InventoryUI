import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    RouterModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: Category[] = [];
  displayedColumns: string[] = ['categoryId', 'name'];

  constructor(private categoryService: CategoryService, public authService: AuthService, private signalrService: SignalrService) {}

  ngOnInit(): void {

    if (this.authService.getUserRole() === 'Admin') {
      this.displayedColumns.push('actions');
    }
    this.loadCategories();

    this.signalrService.categoryAdded$.subscribe(() => this.loadCategories());
    this.signalrService.categoryUpdated$.subscribe(() => this.loadCategories());
    this.signalrService.categoryDeleted$.subscribe(() => this.loadCategories());

  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe(() => this.loadCategories());
    }
  }
}
