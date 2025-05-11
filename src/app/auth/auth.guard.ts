import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const requiredRole = route.data['role'];

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole && authService.getUserRole() !== requiredRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
