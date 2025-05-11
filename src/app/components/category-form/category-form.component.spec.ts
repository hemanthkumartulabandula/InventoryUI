import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CategoryFormComponent } from './category-form.component';
import { CategoryService } from '../../services/category.service';

class MockCategoryService {
  getById(id: number) {
    return of({ categoryId: id, name: 'Test Category' });
  }

  create() {
    return of(null);
  }

  update() {
    return of(null);
  }
}

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFormComponent, ReactiveFormsModule, RouterTestingModule], 
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
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
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load category in edit mode', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.form.value.name).toBe('Test Category');
  });
});
