import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockAuthService {
  logout = jasmine.createSpy('logout');

  getLoggedInUser(): string {
    return 'admin@example.com';
  }

  isLoggedIn(): boolean {
    return true;
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    authService = new MockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent, 
        RouterTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule 
      ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show logged-in user email', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('admin@example.com');
  });

  it('should call logout() on logout button click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('button.logout-button') as HTMLButtonElement;

    if (logoutButton) {
      logoutButton.click();
      expect(authService.logout).toHaveBeenCalled();
    }
  });
});
