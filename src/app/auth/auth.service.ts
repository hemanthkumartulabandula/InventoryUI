import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5070/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Login and store token
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  //Logout and redirect
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // 🔑 Get the stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ogin status
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

}
