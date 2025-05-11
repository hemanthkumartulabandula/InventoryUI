import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public authService: AuthService, private snackBar: MatSnackBar) {}
logout(): void {
    this.authService.logout();
    this.snackBar.open(
      '🔐 You’ve been logged out successfully. Thanks for visiting!',
      'Close',
      {
        duration: 4000,
        panelClass: ['logout-snackbar']
      }
    );
  }
}
