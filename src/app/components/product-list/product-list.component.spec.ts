import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../auth/auth.service';
import { SignalrService } from '../../services/signalr.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockProductService {
  getAll() {
    return of([
      {
        productId: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        quantity: 10,
        categoryId: 1,
        supplierId: 1,
        categoryName: 'Electronics',
        supplierName: 'Supplier A'
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
  startConnection() {}
  productAdded$ = of(null);
  productUpdated$ = of(null);
  productDeleted$ = of(null);
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, RouterTestingModule], 
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: SignalrService, useClass: MockSignalrService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product list on init', () => {
    expect(component.products.length).toBe(1);
    expect(component.products[0].name).toBe('Test Product');
  });

  it('should detect admin role for showing actions column', () => {
    expect(component.isAdmin).toBeTrue();
    expect(component.displayedColumns.includes('actions')).toBeTrue();
  });
});
