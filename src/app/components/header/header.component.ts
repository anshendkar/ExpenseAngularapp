import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService , private router: Router , private snackbarService : SnackbarService) {}

  ngOnInit(): void {
    // Subscribe to the authentication state
    this.authService.getAuthState().subscribe((state: boolean) => {
      this.isAuthenticated = state;
    });

    // Set the initial state
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  navigateToAddExpense(): void {
    this.router.navigate(['/add-expense']);
  }
  navigateTolandingPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/landing-page']);
    });
  }

  navigateTodashboardPage(){
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.snackbarService.showError('User logout Successfully...');
  }

}
