import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  constructor(private router: Router , private authService : AuthService) {}

  navigateToPage(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/add-expense']); // Redirect to Add Expense page
    } else {
      this.router.navigate(['/login']); // Redirect to Login page
    }
  }


}
