import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { AuthLoginComponent } from './auth-login.component';
import { AuthService } from '../auth.service';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        AuthLoginComponent, 
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email and password controls', () => {
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('should submit form and call login()', () => {
    authServiceSpy.login.and.returnValue(of({ token: 'fake-jwt' }));

    component.form.setValue({
      email: 'user@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('user@example.com', 'password123');
  });

  it('should set error message on failed login', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Invalid login')));

    component.form.setValue({
      email: 'user@example.com',
      password: 'wrongpass'
    });

    component.onSubmit();

    expect(component.error).toBe('Invalid email or password');
  });
});
