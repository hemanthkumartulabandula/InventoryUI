
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      productId: 1,
      name: 'Test Product 1',
      description: 'Description 1',
      price: 100,
      quantity: 10,
      categoryId: 1,
      categoryName: 'Category 1',
      supplierId: 1,
      supplierName: 'Supplier 1'
    },
    {
      productId: 2,
      name: 'Test Product 2',
      description: 'Description 2',
      price: 200,
      quantity: 20,
      categoryId: 2,
      categoryName: 'Category 2',
      supplierId: 2,
      supplierName: 'Supplier 2'
    }
  ];

  const mockProduct: Product = {
    productId: 3,
    name: 'Test Product 3',
    description: 'Description 3',
    price: 300,
    quantity: 30,
    categoryId: 3,
    categoryName: 'Category 3',
    supplierId: 3,
    supplierName: 'Supplier 3'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    service.getAll().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:5070/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch a product by ID', () => {
    service.getById(3).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:5070/api/products/3');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should create a product', () => {
    service.create(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:5070/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    service.update(3, mockProduct).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:5070/api/products/3');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(null);
  });

  it('should delete a product', () => {
    service.delete(3).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:5070/api/products/3');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
