import { TestBed } from '@angular/core/testing';
import { SignalrService } from './signalr.service';

describe('SignalrService', () => {
  let service: SignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize connection as null by default', () => {
    expect((service as any).hubConnection).toBeNull(); 
  });

  it('should expose all product/category/supplier observables', () => {
    expect(service.productAdded$).toBeDefined();
    expect(service.productUpdated$).toBeDefined();
    expect(service.productDeleted$).toBeDefined();

    expect(service.categoryAdded$).toBeDefined();
    expect(service.categoryUpdated$).toBeDefined();
    expect(service.categoryDeleted$).toBeDefined();

    expect(service.supplierAdded$).toBeDefined();
    expect(service.supplierUpdated$).toBeDefined();
    expect(service.supplierDeleted$).toBeDefined();
  });

  it('should have a startConnection method', () => {
    expect(typeof service.startConnection).toBe('function');
  });
});
