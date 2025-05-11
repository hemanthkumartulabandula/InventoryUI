import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
     MatButtonModule, 
     RouterModule
    ],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent {
  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['supplierId', 'name', 'email', 'phone'];

  constructor(private supplierService: SupplierService, public authService: AuthService, private signalrService: SignalrService) {}

  ngOnInit(): void {
    
    if (this.authService.getUserRole() === 'Admin') {
      this.displayedColumns.push('actions');
    }
    this.loadSuppliers();

    this.signalrService.supplierAdded$.subscribe(() => this.loadSuppliers());
    this.signalrService.supplierUpdated$.subscribe(() => this.loadSuppliers());
    this.signalrService.supplierDeleted$.subscribe(() => this.loadSuppliers());

  }

  loadSuppliers(): void {
    this.supplierService.getAll().subscribe(data => this.suppliers = data);
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.delete(id).subscribe(() => this.loadSuppliers());
    }
  }
}
