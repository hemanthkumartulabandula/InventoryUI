import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplierService } from './supplier.service';
import { Supplier } from '../models/supplier'; 

describe('SupplierService', () => {
  let service: SupplierService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5070/api/suppliers';

  const mockSupplier: Supplier = {
  supplierId: 1,
  name: 'Test Supplier',
  contactEmail: 'supplier@example.com',
  phone: '123-456-7890'
};


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplierService]
    });

    service = TestBed.inject(SupplierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all suppliers', () => {
    service.getAll().subscribe(suppliers => {
      expect(suppliers.length).toBe(1);
      expect(suppliers[0].name).toBe('Test Supplier');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockSupplier]);
  });

  it('should fetch a supplier by ID', () => {
    service.getById(1).subscribe(supplier => {
      expect(supplier).toEqual(mockSupplier);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSupplier);
  });

  it('should create a supplier', () => {
    service.create(mockSupplier).subscribe(response => {
      expect(response).toEqual(mockSupplier);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockSupplier);
  });

  it('should update a supplier', () => {
    service.update(1, mockSupplier).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('should delete a supplier', () => {
    service.delete(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
