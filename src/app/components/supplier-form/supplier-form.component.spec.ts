import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SupplierFormComponent } from './supplier-form.component';
import { SupplierService } from '../../services/supplier.service';

class MockSupplierService {
  getById(id: number) {
    return of({
      supplierId: id,
      name: 'Test Supplier',
      contactEmail: 'test@example.com',
      phone: '1234567890'
    });
  }

  create() {
    return of(null);
  }

  update() {
    return of(null);
  }
}

describe('SupplierFormComponent', () => {
  let component: SupplierFormComponent;
  let fixture: ComponentFixture<SupplierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SupplierFormComponent, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
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
    fixture = TestBed.createComponent(SupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load supplier in edit mode', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.form.value.name).toBe('Test Supplier');
    expect(component.form.value.contactEmail).toBe('test@example.com');
  });
});
