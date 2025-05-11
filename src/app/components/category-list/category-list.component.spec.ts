import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { CategoryListComponent } from './category-list.component';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../auth/auth.service';
import { SignalrService } from '../../services/signalr.service';

class MockCategoryService {
  getAll() {
    return of([
      { categoryId: 1, name: 'Electronics' },
      { categoryId: 2, name: 'Books' }
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
  categoryAdded$ = of(null);
  categoryUpdated$ = of(null);
  categoryDeleted$ = of(null);
}

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoryListComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: SignalrService, useClass: MockSignalrService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(component.categories.length).toBe(2);
    expect(component.categories[0].name).toBe('Electronics');
  });
});
