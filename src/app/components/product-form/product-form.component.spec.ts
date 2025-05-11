import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';

class MockProductService {
  getById(id: number) {
    return of({
      productId: id,
      name: 'Test Product',
      description: 'Desc',
      quantity: 10,
      price: 99.99,
      categoryId: 1,
      supplierId: 1
    });
  }
  create() {
    return of(null);
  }
  update() {
    return of(null);
  }
}

class MockCategoryService {
  getAll() {
    return of([
      { categoryId: 1, name: 'Category 1' }
    ]);
  }
}

class MockSupplierService {
  getAll() {
    return of([
      { supplierId: 1, name: 'Supplier A', contactEmail: 'a@example.com', phone: '1234567890' }
    ]);
  }
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductFormComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: SupplierService, useClass: MockSupplierService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'  
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data in edit mode', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.form.value.name).toBe('Test Product');
    expect(component.form.value.price).toBe(99.99);
  });
});
