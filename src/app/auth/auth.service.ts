import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}


  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

 
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getLoggedInUser(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<{ email: string }>(token);
      return decoded.email;
    } catch (error) {
      return null;
    }
  }

  getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<{ [key: string]: any }>(token);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
  } catch (error) {
    return null;
  }
  }

}
