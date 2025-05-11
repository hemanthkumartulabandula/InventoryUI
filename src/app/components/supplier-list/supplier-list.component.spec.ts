import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { SupplierListComponent } from './supplier-list.component';
import { SupplierService } from '../../services/supplier.service';
import { AuthService } from '../../auth/auth.service';
import { SignalrService } from '../../services/signalr.service';

class MockSupplierService {
  getAll() {
    return of([
      {
        supplierId: 1,
        name: 'Supplier A',
        contactEmail: 'a@example.com',
        phone: '1234567890'
      },
      {
        supplierId: 2,
        name: 'Supplier B',
        contactEmail: 'b@example.com',
        phone: '9876543210'
      }
    ]);
  }

  delete(id: number) {
    return of(null);
  }
}

class MockAuthService {
  getUserRole() {
    return 'Admin';
  }
}

class MockSignalrService {
  supplierAdded$ = of(null);
  supplierUpdated$ = of(null);
  supplierDeleted$ = of(null);
}

describe('SupplierListComponent', () => {
  let component: SupplierListComponent;
  let fixture: ComponentFixture<SupplierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [
        SupplierListComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SupplierService, useClass: MockSupplierService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: SignalrService, useClass: MockSignalrService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load supplier list on init', () => {
    expect(component.suppliers.length).toBe(2);
    expect(component.suppliers[0].name).toBe('Supplier A');
  });
});
