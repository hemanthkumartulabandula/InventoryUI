import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/category'; 

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5070/api/categories';

  const mockCategory: Category = {
    categoryId: 1,
    name: 'Electronics'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all categories', () => {
    service.getAll().subscribe((categories) => {
      expect(categories.length).toBe(1);
      expect(categories[0].name).toBe('Electronics');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockCategory]);
  });

  it('should fetch a category by ID', () => {
    service.getById(1).subscribe((category) => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);
  });

  it('should create a category', () => {
    service.create(mockCategory).subscribe((response) => {
      expect(response).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockCategory);
  });

  it('should update a category', () => {
    service.update(1, mockCategory).subscribe((response) => {
      expect(response).toBeNull(); // .flush(null)
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('should delete a category', () => {
    service.delete(1).subscribe((response) => {
      expect(response).toBeNull(); // .flush(null)
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
